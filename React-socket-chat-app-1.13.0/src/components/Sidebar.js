import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SidebarChatItem } from './SidebarChatItem';
import '../css/Sidebar.css'
import Images from '../assest/Images';

export const Sidebar = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );
    const { uid } = auth;

    const [searchUser, setSearchUser] = useState("")

    const filterUsers = () =>{ 
        if (searchUser.length > 0) {
            const allUsers = chatState.usuarios.filter( user => user.uid !== uid );
            return allUsers.filter(item => item.name.toLowerCase().includes(searchUser))
        } else {
            return chatState.usuarios.filter( user => user.uid !== uid )
        }
    }
    
    return (
        <div className="inbox_chat">
            <div className="groups">
            <div className="search">
                <input type="search" placeholder="Search contacts…" onChange={(e) => setSearchUser(e.target.value.toLowerCase())} value={searchUser}/>
                <img src={Images.search} alt="Buscar" />
            </div>
            {/* <h1>Grupos de chat</h1>
            <div className="groups_items">
                <img src={Images.contacts} alt="contant" />
                <img src={Images.contacts} alt="contant" />
                <img src={Images.contacts} alt="contant" />
                <img src={Images.contacts} alt="contant" />
            </div> */}
            </div>
            {
                filterUsers()
                    .map( (usuario) => (
                    <SidebarChatItem 
                        key={ usuario.uid }
                        usuario={ usuario }
                    />
                ))
            }


            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>

    )
}
