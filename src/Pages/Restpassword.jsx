import React, {  useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import brandLogo from "../assiest/brand.png";
import { Notification } from "../Uitils/Uitils";
import Axios from "../Uitils/Axios";
function Restpassword() {
  const navigate = useNavigate();
  const params = useParams()
  const [formvalue, setFormvalue] = useState({
    password: "",
    conformpassword: "",
  });
  const handlechange = (event) => {
    setFormvalue({ ...formvalue, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formvalue.password !== formvalue.conformpassword) {
      Notification("error","make you sure password and confirm password is same")
      return;
    }
   const token = params.token
    const {  password } = formvalue;
      const { data } = await Axios.post("/auth/resetpassword", {
        password,
        token
      });
      if(data.status===false){
        Notification("error",data.msg)
      }else if(data.status===true){
        Notification("success",data.msg);
        navigate("/login")
      }
  };
  return (
    <Formcontanier>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={brandLogo} alt="logo" />
          <h2>Rest Password </h2>
        </div>
        <input
          type="text"
          name="password"
          value={formvalue.password}
          onChange={(e) => {
            handlechange(e);
          }}
          placeholder="Enter Your Password"
        />
        <input
          type="password"
          name="conformpassword"
          value={formvalue.conformpassword}
          onChange={(e) => {
            handlechange(e);
          }}
          placeholder="Conform Password"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Formcontanier>
  );
}

const Formcontanier = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #f9f5f6;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h2 {
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f8e8ee;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      width: 90%;
      background-color: transparent;
      border: 0.1rem solid #e1aeff;
      padding: 1rem;
      border-radius: 0.4rem;
      color: #918e8e;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #ff90bb;
        outline: none;
      }
    }
    .btn {
      padding: 1rem 2rem;
      background-color: #e4a5ff;
      border: none;
      border-radius: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #ff90bb;
      }
    }
    span {
      text-transform: uppercase;
      color: #656464;
      Link {
        color: #ff90bb;
        text-transform: none;
        font-weight: bold;
      }
    }
  }
`;

export default Restpassword
