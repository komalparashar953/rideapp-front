import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import ConfirmNewRidePopUp from '../components/ConfirmNewRidePopUp'
import image from '../assets/image.jpg'
import NewRidePopUp from '../components/NewRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
  const [ridePopUpPanel, setridePopUpPanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)
  const [confirmRidePopUpPanel, setconfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null);
  const [ ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 20000)
    updateLocation();

    //return () => clearInterval(locationInterval)
    
  }, [])

  useEffect(() => {
  socket.on('new-ride', (data) => {
    console.log('Received new-ride event:', data);
    setRide(data);
    setridePopUpPanel(true);
  });
  return () => {
    socket.off('new-ride');
  };
}, [socket]);

  const handleCaptainLogout = () => {
      // Clear user data / tokens
      localStorage.removeItem("captain_token");
      // Redirect to login
      navigate( "/captain-signin");
    };

  async function confirmRide() {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('captain_token')}`
      }
    });

    setridePopUpPanel(false);
    setconfirmRidePopUpPanel(true);

    return true; // success
  } catch (error) {
    console.error('Ride confirmation failed:', error);
    return false; // failure
  }
}


  useGSAP(function() {
    if(ridePopUpPanel)
    {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function() {
    if(confirmRidePopUpPanel)
    {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])


  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
          <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <i className='ri-logout-box-r-line font-medium text-lg' />
          </Link>
        </div>
        <div className='h-3/5'>
            <LiveTracking />
        </div>
        
        <div className='h-2/5 p-6'>
          <div className="absolute top-4 right-4">
            <button
              onClick={handleCaptainLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              <i className="ri-logout-box-r-line text-base"></i>
                Logout
            </button>
          </div>
          <CaptainDetails />
        </div> 

        <div ref={ridePopUpPanelRef}  className='fixed w-full z-10 bg-white translate-y-full bottom-0 px-4 py-6 pt-12'>
          <NewRidePopUp 
            ride={ride}
            setconfirmRidePopUpPanel={setconfirmRidePopUpPanel} 
            setridePopUpPanel={setridePopUpPanel} 
            
          />
        </div>

        <div ref={confirmRidePopUpPanelRef}  className='fixed h-screen w-full z-10 bg-white translate-y-full bottom-0 px-4 py-6 pt-12'>
          <ConfirmNewRidePopUp 
            ride = {ride}
            setconfirmRidePopUpPanel={setconfirmRidePopUpPanel}  
            setridePopUpPanel={setridePopUpPanel} 
            confirmRide={confirmRide}
          />
        </div>

    </div>
  )
}

export default CaptainHome
