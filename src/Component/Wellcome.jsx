import React from 'react'
import styled from 'styled-components';
import hello from "../assiest/hello.png"

function Wellcome({currentuser}) {
  return (
    <>
    <Container>
    <img src={hello} alt="" />
    <h1>Wellcome <span>{currentuser.username} !</span></h1>
    <h3>Please Select a chat to start message </h3>
    </Container>
    </>
  )
}
const Container = styled.div`
width: 100wh;
height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img{
    height: 20rem;
    margin-bottom: 10rem;
  }
  span{
    color: #e26f6f;
  }
`;
export default Wellcome
