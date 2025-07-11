import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  //const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status == 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('user_token', data.token);
      navigate('/home');

    }
    
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    
  }

  return (
    <div className='pl-10 pt-8 flex flex-col items-center justify-between h-screen'>
      <img className='w-20 mb-8 mt-8' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
      
        <div>
          <form onSubmit={(e) => submitHandler(e)}>
        
            <h3 className='text-lg mb-4 font-medium'>Enter Username</h3>
            <div className='flex gap-2 mb-7'>
              <input 
                required 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className=' bg-gray-100 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                type='firstname' 
                placeholder='First Name' 
              />
              <input 
                required 
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className=' bg-gray-100 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                type='lastname' 
                placeholder='Last Name' 
              />
            </div>

            <h3 className='text-lg mb-4 font-medium'>Enter Email</h3>
            
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
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-100 rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
              type='password' 
              placeholder='********' 
            />
            
            <button
              className='bg-black text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg'
            >Register</button>
        
          </form>
          <div className='flex items-center justify-between'>
            <p className='text-sm'>Already have an account ? <a href='/signin' className='pl-1 text-blue-500 font-semibold'>Sign In</a></p>
            
            {/*<p className='text-sm text-gray-400'>Forgot Password?</p>*/}
          </div>
        </div>

        {/* <div className='mt-12'>
          <Link to='/captain-signin' className='bg-green-400 font-semibold w-full rounded px-4 py-2 text-lg'>Sign in as Captain</Link>
        </div> */}

        <p className='pb-4 text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span> </p>

    </div>
  )
}

export default UserSignup