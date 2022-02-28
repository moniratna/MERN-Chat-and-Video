import { Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import Chat from './Chat';
import Header from './Header';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { UIStore } from '../store';

const socket = io.connect("http://localhost:5000");


function Home() {
    // const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    

    const token = UIStore.useState(s=> s.token);
    const userName = jwt_decode(token);
    const username = userName.user.name;
    console.log("username", userName.user.name);


    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
    // const [authstatus, setAuthstatus] = useState(null);
    const authstatus = localStorage.getItem('auth');
    console.log(authstatus);
    if(!authstatus) {
        window.location.href = '/';
    }
  return (
      
    <div>
      <Header />
        {authstatus ?
        <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            {/* <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            /> */}
            <h2>{userName && userName.user.name}</h2>
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
            <Link href='/video'><button>Instant Video Call</button></Link> 
          </div>
        ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
          <Link href='/video'><Button variant='contained' color='primary'>Instant Video Call</Button></Link>
        </> 
        )}
      </div>
      : <h1>Please sign in</h1>}
    </div>
  )
}

export default Home