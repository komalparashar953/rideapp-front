import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setotp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('captain_token')}`
      }
    });

    if(response.status === 200)
    {
      props.setconfirmRidePopUpPanel(false)
      props.setridePopUpPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride }})
    }
  }


  return (
    <div>
      <h5 onClick={() => {
          props.setconfirmRidePopUpPanel(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
      
      <h3 className='text-2xl font-semibold mb-5'>Confirm this Ride to Start!</h3>
      <div className='flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-5'>
        <div className='flex items-center gap-4'>
          <img className='h-14 w-14 rounded-full object-cover' src='https://cdn.prod.website-files.com/623b163a2a1b92742f32cea1/68b9190cede417cbc273961d_aliyah.png' alt='userWaiting' />
          <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 Km</h5>
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-user-fill text-lg' />
            <div> 
              <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
              <p className='text-sm -mt-1 text-gray-600'>sheriyans coding school bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-2-fill text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
              <p className='text-sm -mt-1 text-gray-600'>citymall noida</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2'>
            <i className='ri-currency-line text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Money</p>
            </div>
          </div>
        </div> 
        <div className='mt-6 w-full'>

          <form onSubmit={submitHandler}>
            
            
            <input value={otp}
             onChange={(e) => {setotp(e.target.value)}}
             className='bg-gray-200 px-6 py-4 font-mono rounded-lg w-full mt-3' type='text' placeholder='Enter OTP' />
            
            
            <button className='w-full mt-2 bg-green-600 text-white text-lg font-semibold p-2 rounded-lg'>Confirm</button>
        
            <button onClick={() => { 
              props.setconfirmRidePopUpPanel(false)
              props.setridePopUpPanel(false)
              }} 
              className='w-full mt-2 bg-black text-white text-lg font-semibold p-2 rounded-lg'>Cancel</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp