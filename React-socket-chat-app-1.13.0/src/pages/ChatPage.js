import React, { useContext, useState } from 'react';
import Images from '../assest/Images';
import { AuthContext } from '../auth/AuthContext';
import { ChatSelect } from '../components/ChatSelect';
import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';


import '../css/chat.css';
import Profile from './ProfilePage';

export const ChatPage = () => {

    const { chatState } = useContext( ChatContext );
    const { logout} = useContext( AuthContext);
    const [activate, setActivate] = useState(false);
    const togle=()=>{
        setActivate(true);
    }
    const togle2=()=>{
        setActivate(false);
    }

    return (
        <div className="principal">
             <div className={activate ? "chat activeC": "chat"}>
             <InboxPeople />
            </div>
            <div className={activate ? "profile activeP": "profile "}>
                <Profile/>
            </div>


                {
                    ( chatState.chatActivo )
                        ? <Messages />
                        : <ChatSelect />
                }
                
            <div>
            <nav className="navegation">
            <ul>
                <li onClick={togle2}>
                    <img src={Images.chats} alt="chats" /> 
                    <p>Chats</p>
                </li>
                <li onClick={togle}>
                    <img src={Images.profile} alt="chats" /> 
                    <p>Perfil</p>
                </li>
                <li className="close_nulo" onClick={logout}>
                    <img src={Images.close} alt="chats" /> 
                    <p>cerrar</p>
                </li>
            </ul>
        </nav>
            </div>

        </div>
    )
}
