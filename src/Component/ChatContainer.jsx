import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import InputContainer from "./InputContainer";
import Axios from "../Uitils/Axios"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs";
import {v4 as uuidv4} from "uuid"
import Logoff from "./Logoff";

function ChatContainer({ currentselectedchat, contactlist,currentuser ,socket  }) {
  const scrollRef = useRef()
  const [msgList,setMsgList]=useState([]);
  const [arraivalMsg,setArraivalMsg]=useState(null)
  const handlemsg = async (msg) => {
    const {data} = await Axios.post("/message/addmsg",{
      from:currentuser._id,
      to:currentselectedchat._id,
      message:msg
    })
    socket.current.emit("send-msg",{
      to:currentselectedchat._id,
      from:currentuser._id,
      message:msg
    });

    const addmsg = [...msgList];
    addmsg.push({me:true,message:msg});
    setMsgList(addmsg);
  };
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-reciever",(msg)=>{
        setArraivalMsg({me:false,message:msg})
      })
    }
  },[])
  useEffect(()=>{
    arraivalMsg && setMsgList(pre=>[...pre,arraivalMsg])
  },[arraivalMsg]);
  useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  } )
  const [showEmoji,setShowEmoji]=useState(false)
  const [msg,setMsg]=useState("");
  const handleEmoji= (emoji,event)=>{
      let message = msg;
      console.log(emoji)
      message+=emoji.emoji;
      setMsg(message);

  }
  const handleSubmit=()=>{
          if(msg.length>0){
              handlemsg(msg);
              setMsg(""); 
          }
  }
  const getall = async()=>{
    const {data} = await Axios.post("message/getmsg",{
       from:currentuser._id,
      to:currentselectedchat._id,
    })
    setMsgList(data)
  }
  useEffect(()=>{
if(currentselectedchat){
  getall()
}
  },[currentselectedchat])

  return (
    <>
      {currentselectedchat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avater">
                <img
                  src={`data:image/svg+xml;base64,${currentselectedchat.avaterImg}`}
                  alt="avater"
                />
              </div>
              <div className="username">
                <h2>{currentselectedchat.username}</h2>
              </div>
            </div>
            <Logoff/>
          </div>
          <div className="chat-view">
          {
        msgList.map((msg,i)=>{
          return(
            <div ref={scrollRef} key={uuidv4()}>
              <div  className={`message ${msg.me ? "Self":"other"}`} >
                <div className='container' >
                  <p>{msg.message}</p>
                  </div>
                   
              </div>
            </div>
          )
        })
      }
          </div>
          <div className="chat-input">
          <div className="button-emoji">
            <div className="emoji">
                <BsEmojiSmileFill onClick={()=>{setShowEmoji(!showEmoji)}} />
                {
                    showEmoji && (
                         <Picker onEmojiClick={handleEmoji}/>
                    )
                }
            </div>
        </div>
        <div className="input-container">
         <input type="text" placeholder='Start Messaging Here ' value={msg} onChange={(e)=>{setMsg(e.target.value  )}} />
            <button className="send-emoji" onClick={handleSubmit}>
                <IoMdSend/>
            </button>
        </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 390px) and (max-width: 480px) {
      grid-template-row: 15% 68% 17%;
    }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
      grid-template-row: 15% 68% 17%;
    }
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 3px 0px;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avater {
        img {
          height: 3rem;
        }
      }
      .username {
        h2 {
          color: #d23a3a;
        }
      }
    }
  }
  .chat-input{
   display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color:  #f8e8ee;
  padding: 0 2rem;
  padding-bottom: 1rem;
  .button-emoji{
    display: flex;
    align-items: center;
    color: #0b5973;
    gap:1rem;
   
    .emoji{
        position: relative;
        svg{
            font-size: 1.9rem;
            color: #0c536b;
            cursor: pointer;
        }
        .EmojiPickerReact{
            position:absolute;
            top: -470px;
        }
    }
  }
  .input-container{
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 2rem;
    background-color: lightgrey;
    gap :2rem;
    input{
        width: 90%;
        height: 80%;
        background-color: transparent;
        color: #121212;
        font-size: 1.2rem;
        padding-left:1rem ;
        border: none;
        &::selection{
            background-color: #f796a5;
        }
        &:focus{
            outline: none;
        }
    }
    .send-emoji{
        padding: 0.6rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:red;
        border: none;
        svg{
            font-size: 1.2rem;
            color: white;
        }
    }
  }
  }
  .chat-view{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  
    .message {
      display: flex;
      align-items: center;
      .container {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        display: flex;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .Self {
      justify-content: flex-end;
      .container {
        background-color: #f383b1;
      }
    }
    .other {
      justify-content: flex-start;
      .container {
        background-color: #b799ff;
      }
    }
  }
`;
export default ChatContainer;
