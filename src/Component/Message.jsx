import React from 'react'
import styled from 'styled-components';


function Message({msgList}) {
  return (
    <>
    <Contanier>
      {
        msgList.map((msg,i)=>{
          return(
            <div key={i}>
              <div  className={`message ${msg.me ? "Self":"other"}`} >
                    <div className='container'>
                        {msg.message}
                    </div>
              </div>
            </div>
          )
        })
      }
    </Contanier>
    </>
  )
}
const Contanier = styled.div`
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
        overflow-wrap:break-word;
        padding: 1rem;
        border-radius: 1rem;
        color: white;
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
`;
export default Message
