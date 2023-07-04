import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function Logoff() {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.clear();
        navigate("/login")
     }
  return (
    <div>
      <Button  onClick={handleLogout}>Logout</Button>
    </div>
  )
}
const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #000000;
  color: white;
  border-radius: 1rem;
  border: none;
`;
export default Logoff
