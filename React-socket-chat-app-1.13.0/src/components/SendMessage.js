import React, { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';
import '../css/SendMessage.css'
export const SendMessage = () => {

    const [ mensaje, setMensaje ] = useState('');

    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );


    const onChange = ({ target }) => {
        setMensaje( target.value );
    }


    const onSubmit = (ev) => {
        ev.preventDefault();

        if ( mensaje.length === 0 ){ return; }
        setMensaje('');

        // TODO: Emitir un evento de sockets para enviar el mensaje
        // {
        //     de: // UID del usuario enviando el mensaje
        //     para: // UID del usuario que recibe el mensaje
        //     mensaje: // lo que quiero enviar
        // }
        socket.emit( 'mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        });

        // TODO: hacer el dispatch de el mensaje... 

    }

    return (
        <form onSubmit={ onSubmit }>
            <div className="type_msg">
                <div className="input_msg_write">
                    <input
                        type="text"
                        placeholder="Mensaje..."
                        value={ mensaje }
                        onChange={ onChange }
                    />
                    <button className="msg_send_btn" type="submit">
                        enviar
                    </button>
                </div>
               
                </div>
        
        </form>
    )
}
