import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Components/Header'
import useAuth from './Hook/useAuth';
import axios from 'axios';

const App = () => {
  const {setCurrentUser} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async()=>{
      try{

        const {data} = await axios.get('/api/v1/users/getUserProfile');
        setCurrentUser(data)

      }catch(err){
       // console.log('ERROR at get user profile', err)
        toast.error(err.response.data)

        if(err.response.status == 403){
          navigate('/')
          // toast.error(err.response.data.message)
        }
      }
    }

    fetchUserProfile()

  },[setCurrentUser])
  return (
    <div className="max-w-6xl m-auto mt-20">
      <ToastContainer autoClose={3000}/>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App