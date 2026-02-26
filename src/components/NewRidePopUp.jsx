import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const RidePopUp = (props) => {

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // Accept handler
  const handleAccept = () => {
    // Notify backend that captain accepted the ride
    socket.emit('captain-accepted-ride', {
      rideId: props.ride?._id,
      userSocketId: props.ride?.user?.socketId,
      captainId: captain._id
    });
    props.setconfirmRidePopUpPanel(true);
    props.setridePopUpPanel(false);
  };


  return (
    <div>
      <h5 onClick={() => {
          props.setridePopUpPanel(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
      
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
      <div className='flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-5'>
        <div className='flex items-center gap-4'>
          <img className='h-14 w-14 rounded-full object-cover' src='https://cdn.prod.website-files.com/623b163a2a1b92742f32cea1/68b9190cede417cbc273961d_aliyah.png' alt='userWaiting' />
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Money</p>
            </div>
          </div>
        </div> 
        <div className='flex items-center justify-between w-full mt-5'>
          
          <button onClick={() => { 
            props.setridePopUpPanel(false),
            props.confirmRide()
          
          }} 
            className='mt-1 bg-gray-200 text-gray-600 font-semibold px-10 p-4 rounded-lg'>Ignore</button>
          
          <button onClick={() => {
            handleAccept(),
            props.setconfirmRidePopUpPanel(true)
            props.setridePopUpPanel(false)
          }} 
          className='flex justify-center bg-green-600 text-white font-semibold px-10 p-4  rounded-lg'>Accept</button>
          
          
        </div>
      </div>

    </div>
  )
}

export default RidePopUp