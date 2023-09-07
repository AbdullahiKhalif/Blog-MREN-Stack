import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import Signup from '../Components/Signup';

const SingupPage = () => {
  const navigate = useNavigate();
const {currentUser} = useAuth();

useEffect(() => {
  if(currentUser) return navigate('/')
},[])
  return <Signup/>
}

export default SingupPage