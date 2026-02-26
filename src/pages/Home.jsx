import React, { useRef, useState, useContext, useEffect } from 'react'
import image from '../assets/image.jpg'
import { useGSAP } from '@gsap/react' 
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide';
import LookingForCaptain from '../components/LookingForCaptain';
import WaitingForCaptain from '../components/WaitingForCaptain';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setpickup] = useState('');
  const [destination, setdestination] = useState('');
  const [panelopen, setpanelopen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclepanelOpen, setvehiclepanelOpen] = useState(false);
  const vehiclepanelRef = useRef(null);
  const [confirmedRidePanel, setconfirmedRidePanel] = useState(false);
  const confirmedRidePanelRef = useRef(null);
  const [vehicleFound, setvehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForCaptain, setwaitingForCaptain] = useState(false);
  const waitingForCaptainRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [fare, setFare] = useState({})
  const [confirmRideData, setConfirmRideData] = useState({})
  const [lookingData, setLookingData] = useState({});
  const [waitingRide, setWaitingRide] = useState({}); // State to hold the ride data when waiting for captain
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedVehicleImage, setSelectedVehicleImage] = useState('');

  const { socket} = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [ user ]);

  useEffect(() => {
    const handler = (ride) => {
      setvehicleFound(false); //  close LookingForCaptain
      setwaitingForCaptain(true);
      setWaitingRide(ride); // <-- update only this state
    };
    socket.on('waiting-for-captain', handler);
    return () => {
      socket.off('waiting-for-captain', handler);
    };
  }, [socket]);

  socket.on('ride-started', ride => {
    setWaitingRide(false),
    navigate('/riding', { state: { ride, vehicleImage: selectedVehicleImage }})
  })

  const handlePickupChange = async (e) => {
    const input = e.target.value;
    setpickup(input);
    setActiveField('pickup');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }
      });
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDestinationChange = async (e) => {
    const input = e.target.value;
    setdestination(input);
    setActiveField('destination');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }
      });
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestionSelect = (description) => {
    if (activeField === 'pickup') {
      setpickup(description);
      setPickupSuggestions([]);
    } else if (activeField === 'destination') {
      setdestination(description);
      setDestinationSuggestions([]);
    }
    setpanelopen(true);
    //setvehiclepanelOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setpanelopen(true);
  };

  const handleLogout = () => {
    // Clear user data / tokens
    localStorage.removeItem("user_token");
    // Redirect to login
    navigate( "/signin");
  };


  async function findTrip() {
    setvehiclepanelOpen(true);
    setpanelopen(false);  
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
      {
      params: {pickup, destination},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user_token')}`
      }
    })
    console.log(response.data)
    setFare(response.data)
  }


  async function createRide(vehicleType) {

    let imageUrl = '';
    if (vehicleType === 'RideGo') {
      imageUrl = 'https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/184379/amaze-right-front-three-quarter-3.jpeg?isig=0&q=80';
    } else if (vehicleType === 'RidePremium') {
      imageUrl = 'https://www.team-bhp.com/forum/attachments/indian-car-scene/2434144d1679980310-hyundai-locally-assemble-genesis-luxury-cars-india-gv80.jpg';
    } else if (vehicleType === 'RideAuto') {
      imageUrl = 'https://5.imimg.com/data5/SELLER/Default/2024/12/470323515/OO/TJ/RC/163666037/auto-in-ahmedabad.jpeg';
    } else if (vehicleType === 'RideMoto') {
      imageUrl = 'https://5.imimg.com/data5/SELLER/Default/2022/1/LL/AB/GT/21369253/hero-splendor-plus-bs6-bike-500x500.jpg';
    }
    setSelectedVehicleType(vehicleType);
    setSelectedVehicleImage(imageUrl);
    localStorage.setItem('selectedVehicleImage', imageUrl);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup, destination, vehicleType
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
    });
    setConfirmRideData(response.data);
    setconfirmedRidePanel(true);
    setvehiclepanelOpen(false);
  }

  async function handleConfirmRide() {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/request`, {
        rideId: confirmRideData._id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
      });
      setLookingData(confirmRideData);
      setvehicleFound(true);
      setconfirmedRidePanel(false);
    } catch (err) {
      console.error(err);
    }
  }

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelopen ? '70%' : '0%',
      padding: panelopen ? 24 : 0,
      duration: 0.3
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelopen ? 1 : 0,
      duration: 0.3
    });
  }, [panelopen]);

  useGSAP(() => {
    gsap.to(vehiclepanelRef.current, {
      transform: vehiclepanelOpen ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3
    });
  }, [vehiclepanelOpen]);

  useGSAP(() => {
    gsap.to(confirmedRidePanelRef.current, {
      transform: confirmedRidePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3
    });
  }, [confirmedRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForCaptainRef.current, {
      transform: waitingForCaptain ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3
    });
  }, [waitingForCaptain]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute ml-8' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />

      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>
      

      

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[39%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} onClick={() => setpanelopen(false)} className='absolute top-4 right-4 opacity-0 text-2xl cursor-pointer'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <div className="absolute top-4 right-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              <i className="ri-logout-box-r-line text-base"></i>
              Logout
            </button>
          </div>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-16 w-1 top-[32%] left-9 bg-gray-800 rounded-full'></div>
            <input 
              onClick={() => {
                setActiveField('pickup');
                setpanelopen(true);
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-gray-100 px-12 py-2 text-base rounded-lg w-full mb-4 mt-4' 
              type='text' 
              placeholder='Add a Pickup location' 
            />
            <input 
              onClick={() => {
                setActiveField('destination');
                setpanelopen(true);
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-gray-100 px-12 py-2 text-base rounded-lg w-full' 
              type='text' 
              placeholder='Enter your Destination' 
            />
          </form>
          <button onClick={() => {
            findTrip()
          }} className=' flex items-center justify-center bg-black text-white text-md rounded-lg px-2 py-2 mt-9 w-full'>Find Trip</button>
        </div>

        <div ref={panelRef} className='h-0 bg-white px-5 overflow-auto'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            onSelectSuggestion={handleSuggestionSelect}
            setpanelopen={setpanelopen}
            setvehiclepanelOpen={setvehiclepanelOpen}
          />
        </div>
      </div>

      <div ref={vehiclepanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-4 py-12 pt-12 '>
        <VehiclePanel 
          createRide={createRide} 
          fare={fare} 
          setconfirmedRidePanel={setconfirmedRidePanel} 
          setvehiclepanelOpen={setvehiclepanelOpen} 
        />
      </div>

      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-4 py-6 pt-12'>
        <ConfirmRide 
          confirmRideData={confirmRideData} 
          setvehiclepanelOpen={setvehiclepanelOpen} 
          setConfirmRidePanel={setconfirmedRidePanel} 
          onConfirm={handleConfirmRide}
          vehicleImage={selectedVehicleImage}
        />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full px-4 py-6 pt-12'>
        <LookingForCaptain setvehicleFound={setvehicleFound}  lookingData={lookingData} vehicleImage={selectedVehicleImage}/>
      </div>

      <div ref={waitingForCaptainRef} className='fixed w-full z-10 bg-white bottom-0 px-4 py-6 pt-12'>
        <WaitingForCaptain
          data={waitingRide}
          setVehicleFound={setvehicleFound}
          setwaitingForCaptain={setwaitingForCaptain}
          vehicleImage={selectedVehicleImage}
        />
      </div>
    </div>
  )
}

export default Home;
