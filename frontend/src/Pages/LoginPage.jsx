import React, { useEffect } from 'react'
import Login from '../Components/Login'
import { useNavigate } from 'react-router-dom'
import useAuth from '../Hook/useAuth';
// const navigate = useNavigate();
// const {currentUser} = useAuth();

// useEffect(() => {
//   if(currentUser) return navigate('/')
// },[])
const LoginPage = () => {
  return <Login/>
}

export default LoginPage