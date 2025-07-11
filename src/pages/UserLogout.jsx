import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const token = localStorage.getItem('user_token');
  const navigate = useNavigate();

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if(response.status == 200) {
      localStorage.removeItem('user_token');
      navigate('/signin');
    }
  })

  

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout