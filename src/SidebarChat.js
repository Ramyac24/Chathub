import React, { useEffect, useState } from 'react'
import "./SidebarChat.css";
import { Avatar} from '@material-ui/core'
import database from './firebase';
import { Link } from 'react-router-dom'
function SidebarChat({id , name , addNewChat}) {
    const [seed,setSeed]=useState('');
    const [text,setTexts]=useState('');
    useEffect(()=>{
        if(id){
            database.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot=>(
                setTexts(snapshot.docs.map((doc=>
                    doc.data())))
            ))
        }

    },[id])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
        
    }, []);
    const createChat=()=>{
        const roomName=prompt("Please enter the user name for chat");
        if(roomName){
           database.collection('rooms').add({
               name:roomName,
           })
        }
    };

    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{text[0]?.text}</p>
            </div>
        </div>
        </Link>
        
    ):(
        <div onClick={createChat}
        className="sidebarChat">
            <h3>Add New Chat</h3>
        </div>
    );

}

export default SidebarChat
