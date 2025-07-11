import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import CaptainHome from './CaptainHome';

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');
 

  const { captain, setCaptain } = useContext(CaptainDataContext);
  


  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity: capacity,
        vehicleType: type
      },
      
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if(response.status == 201)
    {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('captain_token', data.token);
      navigate('/captain-home');
    }

   
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setColor('');
    setPlate('');
    setCapacity('');
    setType('');
    
  }

  return (
    <div className='pl-10 pt-8 flex flex-col items-center justify-between h-screen'>
      <img className='w-20 mb-8 mt-8' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
      
        <div>
          <form onSubmit={(e) => submitHandler(e)}>
        
            <h3 className='text-lg mb-4 font-medium'>Enter our Captain's Username</h3>
            <div className='flex gap-2 mb-7'>
              <input 
                required 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='text-base bg-gray-100 rounded px-4 py-2 border w-1/2 placeholder:text-base'
                type='firstname' 
                placeholder='First Name' 
              />
              <input 
                required 
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='text-base bg-gray-100 rounded px-4 py-2 border w-1/2 placeholder:text-base'
                type='lastname' 
                placeholder='Last Name' 
              />
            </div>

            <h3 className='text-lg mb-4 font-medium'>Enter our Captain's Email</h3>
            
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

            <h3 className='text-lg mb-4 font-medium'>Enter Vehicle Details</h3>
            <div className='mb-7'>
              <input
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className='bg-gray-100 rounded mb-3 px-4 py-2 border w-full text-lg placeholder:text-base'
                type='text'
                placeholder='Vehicle Color (e.g. red, blue)'
              />
              <input
                required
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className='bg-gray-100 rounded mb-3 px-4 py-2 border w-full text-lg placeholder:text-base'
                type='text'
                placeholder='Number Plate (e.g. ABC-1234)'
              />
              <input
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className='bg-gray-100 rounded mb-3 px-4 py-2 border w-full text-lg placeholder:text-base'
                type='number'
                min='1'
                placeholder='Capacity (e.g. 4)'
              />
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='bg-gray-100 rounded px-4 py-2 border w-full text-lg'
              >
                <option value='' disabled>
                  Select Vehicle Type
                </option>
                <option value='car'>Car</option>
                <option value='auto'>Auto</option>
                <option value='bike'>Bike</option>
              </select>
            </div>
            
            <button
              className='bg-black text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg'
            >Register Captain</button>
        
          </form>
          <div className='flex items-center justify-between'>
            <p className='text-sm pb-14'>Already have an account ? <a href='/captain-signin' className='pl-1 text-blue-500 font-semibold'>Sign In</a></p>
            {/*<p className='text-sm text-gray-400'>Forgot Password?</p>*/}
          </div>
          
        </div>

        {/* <div className='mt-12'>
          <Link to='/captain-signin' className='bg-green-400 font-semibold w-full rounded px-4 py-2 text-lg'>Sign in as Captain</Link>
        </div> */}

        <p className='pb-4 mt-8 text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span> </p>

    </div>
  )
}

export default CaptainSignup