import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';
import '../css/Messages.css';
import Images from '../assest/Images';
export const Messages = () => {

    const { chatState } = useContext( ChatContext );
    const { auth, setChat, chat } = useContext( AuthContext );
    const mes_active=()=>{
        setChat(true)
    }
    const active_chat = chat ? "mesgs desactive_chat" : "mesgs "
    return (
        <div className={active_chat}>
            <div className="menssage_close">
                <img src={Images.Back} alt="" onClick={mes_active}/>
                <p>{auth.name}</p>
                <img src={Images.settings} alt="" />
            </div>
            {/* <!-- Historia inicio --> */}
            <div 
                id="mensajes"
                className="msg_history"
            >

                {
                    chatState.mensajes.map( msg => (
                        ( msg.para === auth.uid )
                            ? <IncomingMessage key={ msg._id } msg={ msg } />
                            : <OutgoingMessage key={ msg._id } msg={ msg } />
                    ))
                }

                

            </div>
            {/* <!-- Historia Fin --> */}

           <SendMessage />

        </div>
    )
}
