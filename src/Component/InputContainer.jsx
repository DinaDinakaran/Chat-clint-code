import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import styled from 'styled-components';



function InputContainer({handlemsg}) {
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
  return (
    <>
    <Container>
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
    </Container>
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color:  #f8e8ee;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-emoji{
    display: flex;
    align-items: center;
    color: #0b5973;
    gap:1rem;
   
    .emoji{
        position: relative;
        svg{
            font-size: 1.9rem;
            color: lightblue;
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
`;
export default InputContainer
