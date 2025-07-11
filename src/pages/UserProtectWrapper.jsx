import React, { useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {
  const token = localStorage.getItem('user_token');
  const {user, setUser} = React.useContext(UserDataContext);
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/signin')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status === 200) {
        setUser(response.data)
        setIsLoading(false)
      }
    }).catch((error) => {
      if(error.response.status === 401) {
        localStorage.removeItem('user_token')
        navigate('/signin')
        setIsLoading(false)
      }
    })
  }, [token, navigate, setUser])

  

  if(isLoading) {
    return (
        <div>Loading....</div>
    )
   }


  return (
    <>{children}</>
  )
} 

export default UserProtectWrapper