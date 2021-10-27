import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Register.css'
import { AuthContext } from '../auth/AuthContext';
import Images from '../assest/Images';


export const RegisterPage = () => {

    const { register } = useContext( AuthContext );
    
    const [ form, setForm ] = useState({
        email: '',
        password: '',
        name: '',
        typeUser:''
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async(ev) => {
        ev.preventDefault();
        
        const { name,email,password, typeUser } = form;
        const msg = await register( name, email,password, typeUser );

        if ( msg !== true ) {
            Swal.fire('Error', msg, 'error');
        }
    }

    const todoOk = () => {
        return ( 
            form.email.length > 0 && 
            form.password.length > 0 &&
            form.name.length > 0 && 
            form.typeUser.length>0
        ) ? true : false;
    }


    return (
    <div className="register">
        <img src={Images.logo} alt="logo" />
        <h1>
                Chat - Registro
        </h1>
        <div className="register_card">

            <form 
                className="register_input"
                onSubmit={ onSubmit }
            >
                <label for="name">Nombre completo</label>
                <input
                    className="input100"
                    type="text"
                    name="name"
                    placeholder="Nombre" 
                    value={ form.name }
                    onChange={ onChange }
                />
                    
                <label for="user">Correo</label>
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email" 
                    value={ form.email }
                    onChange={ onChange }
                />
                <label for="passwordInput">Contraseña</label>
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password" 
                    value={ form.password }
                    onChange={ onChange }
                />
                <label for="typeSelect">Tipo de usuario</label>
                    <select name="typeUser"
                            value={form.typeUser}
                            onChange={onChange}
                    >
                        <option value="" selected>Elige una opción</option>
                        <option value="colaborador">Colaborador</option>
                        <option value="líder de área">Líder de área</option>
                        <option value="CEO">CEO</option>
                    </select>
                

                
                    <div className="col2">
                        <Link to="/auth/login">
                            Ya tienes cuenta?
                        </Link>
                    </div>
            
                    <button
                        type="submit"
                        className="login100-form-btn"
                        disabled={ !todoOk() }
                        >
                        Crear cuenta
                    </button>

            </form>
        </div>
            <Link to="/">Volver a inicio</Link>
    </div>
    )
}
