import React, { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {
  const token = localStorage.getItem('captain_token');
  const {captain, setCaptain} = React.useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/captain-signin')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status === 200) {
        setCaptain(response.data.captain)
        setIsLoading(false)
      }
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem('captain_token')
        navigate('/captain-signin')
        setIsLoading(false)
      }
    })
  }, [token, navigate, setCaptain])

  

  if(isLoading) {
    return (
        <div>Loading....</div>
    )
   }


  return (
    <>{children}</>
  )
}  


export default CaptainProtectWrapper