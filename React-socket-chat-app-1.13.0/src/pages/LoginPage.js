import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Images from '../assest/Images';
import { AuthContext } from '../auth/AuthContext';
import '../css/Login.css'

export const LoginPage = () => {

    const { login } = useContext( AuthContext );
    
    const [ form, setForm ] = useState({
        email: '',
        password: '',
        rememberme: false
    });

    useEffect(() => {
        const email = localStorage.getItem('email');
        if ( email ) {
            setForm( (form) => ({
                ...form,
                email,
                rememberme: true,
            }));
        }

    }, [])


    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const toggleCheck = () => {
        console.log('??');
        setForm({
            ...form,
            rememberme: !form.rememberme
        });
    }

    const onSubmit = async(ev) => {
        ev.preventDefault();

        (form.rememberme) 
            ? localStorage.setItem('email', form.email )
            : localStorage.removeItem('email');
        
        const { email, password } = form;
        const ok = await login( email, password );

        if ( !ok ) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        }
    }

    const todoOk = () => {
        return ( form.email.length > 0 && form.password.length > 0 ) ? true : false;
    }


    return (
    <div className="login">
        <img src={Images.logo} alt="logo" />
        <form 
            className="login_background"
            onSubmit={ onSubmit }
        >
            <h1>
                Chat - Ingreso
            </h1>
            
            
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={ form.email }
                    onChange={ onChange }
                />
            
            
            
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password" 
                    value={ form.password }
                    onChange={ onChange }
                />

        
                <div 
                    className="col"
                    onClick={ ()=> toggleCheck() }
                >
                    <div className="check">

                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberme" 
                        checked={ form.rememberme }
                        readOnly
                        />
                    <label>
                        Recordarme
                    </label>
                
                        </div>

               
                    <Link to="/auth/register" >
                        Nueva cuenta?
                    </Link>
                
            </div>

           
                <button 
                    type="submit"
                    className="login100-form-btn"
                    disabled={ !todoOk() }
                    >
                    Ingresar
                </button>
            

        </form>
        <Link to="/">Volver a inicio</Link>
    </div>
    )
}
