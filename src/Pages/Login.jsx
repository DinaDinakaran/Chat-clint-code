import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import brandLogo from "../assiest/brand.png";
import { Notification, validation } from "../Uitils/Uitils";
import Axios from "../Uitils/Axios";
function Login() {
  const navigate = useNavigate()
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem("User-details")){
      navigate("/")
    }
  },[])
  const handlechange = (event) => {
    setFormvalue({ ...formvalue, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = validation("login", formvalue);
    if (valid) {
      return;
    }
    const { username, password } = formvalue;
    try {
      const { data } = await Axios.post("/auth/login", {
        username,
        password,
      });

      if(data.status===false)
        Notification("error",data.msg);
      if(data.status===true){
        localStorage.setItem("User-details",JSON.stringify(data.user))
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formcontanier>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={brandLogo} alt="logo" />
          <h2>login </h2>
        </div>
        <input
          type="text"
          name="username"
          value={formvalue.username}
          onChange={(e) => {
            handlechange(e);
          }}
          placeholder="Enter UserName"
        />
        <input
          type="password"
          name="password"
          value={formvalue.password}
          onChange={(e) => {
            handlechange(e);
          }}
          placeholder="Enter Your Password"
        />
        <button className="btn" type="submit">
          Submit
        </button>
        <span>
          you don't have account ? <Link to="/register">Click Here</Link>
        </span>
        <span>
          <Link to="/forget" >Forget Password</Link>
        </span>
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
      color: gray;
      Link {
        color: #ff90bb;
        text-transform: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
