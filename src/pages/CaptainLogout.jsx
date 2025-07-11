import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem('captain_token');
  const navigate = useNavigate();
  
  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
    headers: {
        Authorization: `bearer ${token}`
    }
  }).then((response) => {
    if(response.status == 200)
    {
        localStorage.removeItem('captain_token');
        navigate('/captain/signin');
    }
  })



  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout