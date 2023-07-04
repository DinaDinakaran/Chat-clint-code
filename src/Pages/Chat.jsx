import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../Component/Contacts";
import Axios, { url } from "../Uitils/Axios";
import Wellcome from "../Component/Wellcome";
import ChatContainer from "../Component/ChatContainer";
import{io} from "socket.io-client"
function Chat() {
  const socket = useRef()
  const navigate = useNavigate();
  const [contactlist, setContactlist] = useState([]);
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentselectedchat, setCurrentselectedchat] = useState(undefined);
  const [Isloaded, setIsloaded] = useState(false);
  const validate = async () => {
    let user = await JSON.parse(localStorage.getItem("User-details"));
    // console.log(user)
    if (!localStorage.getItem("User-details")) {
      navigate("/login");
    } else {
      setCurrentuser(user);
      setIsloaded(true);
    }
  };
  useEffect(()=>{
    if(currentuser){
      socket.current = io(url);
      socket.current.emit("add-user",currentuser._id )
    }
  },[currentuser])
  useEffect(() => {
    validate();
  }, []);
  const validate2 = async () => {
    //console.log("crr",currentuser)
    if (currentuser) {
      if (currentuser.IsAvaterSet) {
        const { data } = await Axios.get(
          "/auth/getcontacts/" + currentuser._id
        );
        if (data["list"].length > 0) {
          setContactlist(data["list"]);
        }
        //console.log(data)
      } else {
        navigate("/SetAvater");
      }
    }
  };
  useEffect(() => {
    validate2();
  }, [currentuser]);

  const handlechagechat = (chat) => {
    setCurrentselectedchat(chat);
  };
  return (
    <>
      {currentuser && contactlist && (
        <Container>
          <div className="container">
            <Contacts
              currentuser={currentuser}
              contactlist={contactlist}
              changehandle={handlechagechat}
            />
            <div className="chat">
              {Isloaded && currentselectedchat === undefined ? (
                <Wellcome currentuser={currentuser} />
              ) : (
                <ChatContainer
                currentselectedchat={currentselectedchat}
                  contactlist={contactlist} currentuser={currentuser} socket={socket}
                />
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100wh;
  background-color: #f9f5f6;
  gap: 2rem;
  
  //border-radius: 15rem;
  .container {
    height: 85%;
    width: 85%;
    display: grid;
    grid-template-columns: 20% 80%;
    background-color: #f8e8ee;
    @media screen and (min-width: 390px) and (max-width: 480px) {
      grid-template-columns: 40% 60%;
    }
  }
  .chat {
    border: 2px solid lightpink;
    border-radius: 12px;
    overflow-y:hidden;
  }
`;

export default Chat;
