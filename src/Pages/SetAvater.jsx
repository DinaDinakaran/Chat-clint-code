import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Buffer } from "buffer";
import { Notification} from "../Uitils/Uitils";
import Axios from "../Uitils/Axios";
import axios from "axios";
import Loader from "../Uitils/Loader";

function SetAvater() {
  let api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avater, SetAvater] = useState([]);
  const [selectedavter, Setselectedavter] = useState(undefined);
  const [loader, Setloader] = useState(true);
  const getAavater = async () => {
    try {
      let data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        let buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      SetAvater(data);
      Setloader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const setSelectedAvater = (index) => {
    Setselectedavter(index);
  };
  const handleSubmit = async () => {
    if (selectedavter === undefined) {
      Notification("error", "Please Select A Profile Picture");
      return;
    }
    let user = await JSON.parse(localStorage.getItem("User-details"));
    const { data } = await Axios.post("/auth/setAvatar/" + user._id, {
      image: avater[selectedavter],
    });
    if (!data.status) {
      Notification("error", data.msg);
    }
    if (data.status) {
      user.IsAvaterSet = data.isSet;
      user.avaterImg = data.image;
      console.log(user.avaterImg, data.image);
      localStorage.setItem("User-details", JSON.stringify(user));
      Notification("success", data.msg);
      navigate("/");
    }
  };
  useEffect(() => {
    let valid = JSON.parse(localStorage.getItem("User-details"));
    if (valid) {
      if (valid.IsAvaterSet === false) {
        getAavater();
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loader ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Pick Your Favourite Profile Emoji</h1>
          </div>
          <div className="avaters">
            {avater.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`avater ${
                    selectedavter === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${item}`}
                    alt="avater"
                    onClick={() => setSelectedAvater(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={() => handleSubmit()}>
            Set Profile Picture
          </button>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;
  background-color: #f1e4e7;
  height: 100vh;
  width: 100wh;

  .title {
    h1 {
      color: #131324;
    }
  }
  .avaters {
    display: flex;
    gap: 2rem;
    .avater {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5 s ease-in-out;
      img {
        height: 6rem;
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    padding: 1rem 2rem;
    background-color: #131324;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition: 0.4s ease-in-out;
    border-radius: 0.4rem;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default SetAvater;
