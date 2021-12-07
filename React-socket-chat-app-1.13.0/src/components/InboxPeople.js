import React, { useContext } from 'react';
// import { Searchbox } from './Searchbox';
import { Sidebar } from './Sidebar';
import '../css/InboxPeople.css'
import { AuthContext } from '../auth/AuthContext';
export const InboxPeople = () => {
    const {chat}= useContext (AuthContext);
   
    const activeI = chat ? "inbox_people": "inbox_people active_i"
    return (
        <div className={activeI}>

            {/* <Searchbox /> */}

            <Sidebar />

        </div>
    )
}
