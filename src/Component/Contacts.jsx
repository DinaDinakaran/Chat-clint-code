import React, { useEffect, useState } from "react";
import styled from "styled-components";
import brandLogo from "../assiest/brand.png";

function Contacts({ currentuser, contactlist,changehandle }) {
  //console.log(contactlist)
  //console.log(currentuser)
  const [currentusername,setcurrentusername] = useState(undefined);
  const [currentuserImg,setcurrentuserImg] = useState(undefined);
  const [selected,setSelected]=useState(undefined);

  useEffect(()=>{
      setcurrentuserImg(currentuser.avaterImg);
      setcurrentusername(currentuser.username)
  },[])
  const handlechane = (index,contact)=>{
    setSelected(index);
    changehandle(contact);
  }
  return (
    <>
      <Contaier>
        <div className="brand">
          <img src={brandLogo} alt="LOGO" />
          <h2>Chat</h2>
        </div>
        <div className="contacts">
          {contactlist.map((item, index) => {
            return (
              <div key={item._id} className={`contact ${index===selected ? "selected":""}` } onClick={()=>handlechane(index,item)} >
               <div className="avater">
               <img
                  src={`data:image/svg+xml;base64,${item.avaterImg}`}
                  alt="avater"
                />
               </div>
                <div className="username">
                <h2>{item.username}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="user-details">
          <div className="avater">
          <img
                  src={`data:image/svg+xml;base64,${currentuserImg}`}
                  alt="avater"
                />
          </div>
          <div className="crnt-username">
            <h2>{currentusername}</h2>
          </div>
        </div>
        
      </Contaier>
    </>
  );
}
const Contaier = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 11%;
  gap: 1rem;
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 3rem;
    }
    h2{
      text-transform: uppercase;
    }
  }
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        border-radius:1rem;
        width: 0.1rem;
        background-color:#e26f6f;
      }
    }
    .contact{
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; 
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border: 0.2rem;
      padding: 0.4rem;
      border-radius: 2rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition:0.5rem ease-in-out;

      .avater{
        img{
          height: 3rem;
        }
      }
      
    }
    .selected{
      background-color: #cfc0fb;
      }
      
  }
  .user-details{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: #f6dfe5 ;
    .avater{
      img{
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .crnt-username{
      h2{
        color: #e26f6f;
        text-transform: uppercase ;
      }
    }
  }
`;
export default Contacts;
