import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import image from '../assets/image.jpg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setfinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function() {
    if(finishRidePanel)
    {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative flex flex-col justify-end'>
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
          <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <i className='ri-logout-box-r-line font-medium text-lg' />
          </Link>
        </div>
        
        <div onClick={() => {
            setfinishRidePanel(true)
        }} className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative'>
          
          <h5 onClick={() => {
          
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-600 ri-arrow-up-wide-line' /></h5>

          <h4 className='text-xl font-semibold'>4 Km Away</h4>
          <button className='flex justify-center bg-green-600 text-white font-semibold px-10 p-4  rounded-lg'>Complete Ride</button>
        </div>

        <div ref={finishRidePanelRef}  className='fixed h-screen w-full z-[500] bg-white translate-y-full bottom-0 px-4 py-6 pt-12'>
          <FinishRide ride={rideData} setfinishRidePanel={setfinishRidePanel} />
        </div>

        <div className='h-screen fixed w-screen top-0 z-[-1]'>
            <LiveTracking />
        </div>

    </div>
  )
}

export default CaptainRiding