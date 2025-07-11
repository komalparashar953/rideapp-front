import React, { useContext } from 'react'
import image from '../assets/image.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation();
    const ride = location.state?.ride || {}
    const vehicleImage = location.state?.vehicleImage || localStorage.getItem('selectedVehicleImage');
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })

    const handleCashPayment = () => {
        navigate('/home')
    }

  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='ri-home-5-line font-medium text-lg' />
        </Link>
        <div className='h-1/2'>
            <LiveTracking />
        </div>
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img className='h-14' src={vehicleImage} alt='confirmcar'  />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{(ride?.captain?.fullname.firstname) + " " + (ride?.captain?.fullname.lastname)}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                    {/*<p className='text-sm text-gray-600'>Maurti Suzuki Alto</p> */}
                </div>
            </div>

            <div className='flex flex-col justify-between gap-2 items-center'>
                
                <div className='w-full mt-5'>
                
                <div className='flex items-center gap-5 p-2 border-b-2 '>
                    <i className='ri-map-pin-2-fill text-lg' />
                    <div>
                    <h3 className='text-lg font-medium'>{ride?.destination}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>citymall noida</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-2'>
                    <i className='ri-currency-line text-lg' />
                    <div>
                    <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Money</p>
                    </div>
                </div>
                </div> 
                
            </div>

            <button onClick={handleCashPayment} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Pay via Cash</button>
        </div>
    </div>
  )
}

export default Riding