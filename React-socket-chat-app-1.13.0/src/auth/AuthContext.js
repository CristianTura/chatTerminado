import React, { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const [chat, setChat] = useState(true)

    const login = async (email, password) => {
        const resp = await fetchSinToken("login", { email, password }, "POST");

        if (resp.ok) {
            localStorage.setItem("token", resp.token);
            const { user } = resp;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }

        return resp.ok;
    };

    const register = async (name, email,password, typeUser) => {
        const resp = await fetchSinToken(
            "login/new",
            { name, email,password, typeUser },
            "POST"
        );

        if (resp.ok) {
            localStorage.setItem("token", resp.token);
            const { user } = resp;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
                typeUser:user.typeUser
            });

            return true;
        }

        return resp.msg;
    };

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem("token");
        // Si token no existe
        if (!token) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
                typeUser:null
            });

            return false;
        }

        const resp = await fetchConToken("login/renew");
        if (resp.ok) {
            localStorage.setItem("token", resp.token);
            const { user } = resp;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
                typeUser: user.typeUser
            });

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
                typeUser: null,
            });

            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({
            checking: false,
            logged: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                register,
                verificaToken,
                logout,
                chat,
                setChat,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
