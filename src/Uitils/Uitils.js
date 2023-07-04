import { Bounce, toast } from "react-toastify";

export const validation = (type, formvalue) => {
  var email_patten = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (type === "registration") {
    for (let i in formvalue) {
      if (formvalue[i] === "") {
        Notification("error", "please fill " + i);

        return true;
      } else if (i === "email") {
        if (!formvalue["email"].match(email_patten)) {
          Notification("error", "pleace enter valid email");

          return true;
        }
      } else if (i === "password") {
        if (formvalue["password"].length  <3)
          Notification("error", "make you sure password more then 3 Character");

        if (formvalue["password"] !== formvalue["conformpassword"]) {
          Notification(
            "error",
            "make you sure password and Confirm password is same"
          );

          return true;
        }
      }
    }
  } else if (type === "login") {
   // console.log(formvalue);
    if (formvalue["username"] === "" || formvalue["password"] === "") {
      Notification("error", "enter user valid username and password");
      return true;
    }
  }
};
const toastOptions = {
  position: "top-center",
  autoClose: 4000,
  pauseOnHover: true,
  theme: "light",
  TransitionEvent: Bounce,
};


export const Notification = (type, msg) => {
  if (type === "success") {
    toast.success(msg, toastOptions);
  } else if (type === "error") {
    toast.error(msg, toastOptions);
  }
};
