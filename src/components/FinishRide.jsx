import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('captain_token')}`
      }
    })

    if(response.status === 200)
    {
      
      navigate('/captain-home')
    }
  }
  return (
    <div>
        <div>
      <h5 onClick={() => {
          props.setfinishRidePanel(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
      
      <h3 className='text-2xl font-semibold mb-5'>Finish this Ride!</h3>
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-5'>
        <div className='flex items-center gap-4'>
          <img className='h-14 w-14 rounded-full object-cover' src='https://cdn.prod.website-files.com/623b163a2a1b92742f32cea1/68b9190cede417cbc273961d_aliyah.png' alt='userWaiting' />
          <h2 className='text-lg font-medium'>{(props.ride?.user.fullname.firstname) + " " + (props.ride?.user.fullname.lastname)}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 Km</h5>
      </div>
      <div className='flex flex-col justify-between gap-2 items-center'>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-user-fill text-lg' />
            <div> 
              <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-2-fill text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
              
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
        <div className='mt-10 w-full'>

            <button onClick={endRide} className='text-lg w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>

            <p className='text-black mt-10 text-sm'>Click on Finish Ride button if payment is Completed</p>
        
            
         

        </div>
      </div>
    </div>
    </div>
  )
}

export default FinishRide