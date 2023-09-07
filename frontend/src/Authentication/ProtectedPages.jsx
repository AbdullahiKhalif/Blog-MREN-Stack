import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../Hook/useAuth'

const ProtectedPages = ({children}) => {
    const navigate = useNavigate()
    const {currentUser} = useAuth();

    useEffect(() => {
        if(!currentUser) return navigate('/signin');
    },[currentUser])
  return (
    <div>{children}</div>
  )
}

export default ProtectedPages