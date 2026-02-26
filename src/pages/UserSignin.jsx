import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';


const UserSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  //const [userData, setUserData] = useState({});

  const {user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status == 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('user_token', data.token);
      navigate('/home');
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
            <p className='text-sm'>New Here ? <a href='/signup' className='pl-1 text-blue-500 font-semibold'>Sign Up</a></p>
            <p className='text-sm text-gray-400'>Forgot Password?</p>
          </div>
        </div>

        <div className='mt-12'>
          <Link to='/captain-signin' className='bg-green-400 font-semibold w-full rounded px-4 py-2 text-lg'>Sign in as Captain</Link>
        </div>

    </div>
  )
}

export default UserSignin