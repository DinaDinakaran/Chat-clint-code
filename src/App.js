import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import { ToastContainer } from "react-toastify";
import styled from 'styled-components';
import "react-toastify/dist/ReactToastify.css"
import SetAvater from "./Pages/SetAvater";
import Forget from "./Pages/Forget";
import Restpassword from "./Pages/Restpassword";


function App() {
  return (
    <>
    <Container>
      <ToastContainer/>
    </Container>
      <Router>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget" element={<Forget />} />
          <Route path="reset-password/:token" element={<Restpassword />} />
          <Route path="SetAvater" element={<SetAvater />} />
          <Route path="/" element={<Chat />} exact />
        </Routes>
      </Router>
    </>
  );
}
const Container = styled.div`
  /* display: flex;
  width: 100wh;
  align-items: center;
  justify-content: center; */
`;

export default App;
