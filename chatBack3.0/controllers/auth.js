const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usuario");
// const usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        // Check that email don't exists
        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya existe",
            });
        }

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user in BD
        await user.save();

        // Generate the JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if exists the email
        const userDb = await User.findOne({ email });
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado",
            });
        }

        // Check the password
        const validPassword = bcrypt.compareSync(password, userDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password no es correcto",
            });
        }

        // Generate JWT
        const token = await generarJWT(userDb.id);

        res.json({
            ok: true,
            user: userDb,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

// RenewToken
const renewToken = async (req, res) => {
    const uid = req.uid;

    // Generate a new JWT
    const token = await generarJWT(uid);

    // Get user by UID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token,
    });
};

module.exports = {
    createUser,
    login,
    renewToken,
};
