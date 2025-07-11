import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  //const [captainData, setCaptainData] = useState({});

  const {captain, setCaptain} = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    
    if(response.status === 200)
    {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('captain_token', data.token);
      navigate('/captain-home');


    }
    
    setEmail('');
    setpassword('');
  }

  return (
    <div className='pl-10 pt-14 flex flex-col items-center'>
      <img className='w-20 mb-8 mt-8' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
      
        <div>
          <form onSubmit={(e) => submitHandler(e)}>
        
            <h3 className='text-lg mb-4 font-medium'>What's your email</h3>
            
            <input 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-100 rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
              type='email' 
              placeholder='email@example.com' 
            />
            
            <h3 className='text-lg mb-4 font-medium'>Enter Password</h3>
            
            <input 
              required 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className='bg-gray-100 rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
              type='password' 
              placeholder='********' 
            />
            
            <button
              className='bg-black text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg'
            >Sign In</button>
        
          </form>
          <div className='flex items-center justify-between'>
            <p className='text-sm'>Drive the Future ?<a href='/captain-signup' className='pl-1 text-blue-500 font-semibold'>Register</a></p>
            <p className='text-sm text-gray-400'>Forgot Password?</p>
          </div>
        </div>

        <div className='mt-12'>
          <Link to='/signin' className='block bg-orange-300 font-semibold w-full rounded px-4 py-2 text-lg'>Sign in as User</Link>
        </div>

    </div>
  )
}

export default CaptainSignin