import { Avatar,IconButton, setRef } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import axios from './axios';
import React, {useEffect, useState } from 'react'
import "./Chat.css";
import { useParams } from 'react-router-dom';
import database from './firebase';
import firebase from 'firebase'
import { useStateValue } from './StateProvider';
function Chat() {
    const [seed,setSeed]=useState('');
    const {roomId}=useParams();
    const [roomName,setRoomName] =useState("");
    const [{user},dispatch]=useStateValue();    
    useEffect(()=>{
        if(roomId)
        {
            database.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot=>
               ( setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
        
    }, []);

    const [input,setInput]=useState("");

    const sendMessage= async (e)=>{
        e.preventDefault();
        database.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    
        });
    setInput('');
    };
    const [texts,setTexts]=useState([])
    useEffect(()=>{
        if(roomId){
            database.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot)=>setRoomName
            (snapshot.data().name));
            database.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>(
                setTexts(snapshot.docs.map((doc)=>
                    doc.data()))
                ));
        }
    },[roomId])
    
    return (
        <div className="chat">
            <div className="chat__header">
                 <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {
                            new Date(
                                texts[texts.length-1]?.
                                timestamp?.toDate()
                                ).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {texts.map((texts)=>(
                <p
                    className={`chat__message ${texts.name===user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{texts.name}</span>
                    {texts.message};
                    <span className="chat__timestamp">
                        {new Date
                        (texts.timestamp?.
                        toDate()).
                        toUTCString
                        }
                    </span>

                </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                <input value={input} onChange={e => setInput(e.target.value)} 
                placeholder="Type a message" 
                type="text"/>
                <button onClick={sendMessage} type="submit"> Send a message</button>
            </form>
            <MicIcon />
        </div>
        </div>
    )
}

export default Chat
