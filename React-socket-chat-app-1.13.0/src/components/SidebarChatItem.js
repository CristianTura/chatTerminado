import React, { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import '../css/SidebarChatItem.css'
import { types } from '../types/types';
import { AuthContext } from '../auth/AuthContext';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { chatActivo } = chatState;

    const onClick = async() => {

        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        });

        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${ usuario.uid }`);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });

        scrollToBottom('mensajes');
    }
    const {chat, setChat}= useContext(AuthContext)
    const mes_active=()=>{
        setChat(!chat)
    }
    return (
        <div
            className={`chat_list ${ (usuario.uid === chatActivo) && 'active_chat' }`}
            onClick={ onClick }
        >
            {/* active_chat */}
            <div className="messages_contant" onClick={mes_active}>
                <div className="messages_photo"> 
                    <img src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="sunil" />
                </div>
                <div className="messages_data">
                    <h5> { usuario.name } </h5>
                    {
                        ( usuario.online )
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                   
                </div>
            </div>
        </div>
    )
}
