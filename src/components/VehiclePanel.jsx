import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => {
          props.setvehiclepanelOpen(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
        
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={() => {
          props.setconfirmedRidePanel(true)
          props.createRide('RideGo')
          }} className='flex w-full p-4 items-center mb-2 border-2 active:border-black  rounded-xl justify-between'>
          <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png' alt='car'  />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>RideGo <span><i className='ri-user-3-fill' />4</span></h4>
            <h5 className='font-medium text-base'>2 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.RideGo}</h2>
        </div>

        <div onClick={() => {
          props.setconfirmedRidePanel(true)
          props.createRide('RidePremium')
          }} className='flex w-full p-4 items-center mb-2 border-2 active:border-black rounded-xl justify-between'>
          <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png' alt='car'  />
          <div className='ml-8 w-1/2'>
            <h4 className='font-medium text-base'>RidePremium<span><i className='ri-user-3-fill' />9</span></h4>
            <h5 className='font-medium text-base'>4 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.RidePremium}</h2>
        </div>

        <div onClick={() => {
          props.setconfirmedRidePanel(true)
          props.createRide('RideAuto')
          }} className='flex w-full p-4 items-center mb-2 border-2 active:border-black rounded-xl justify-between'>
          <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt='car'  />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>RideAuto <span><i className='ri-user-3-fill' />4</span></h4>
            <h5 className='font-medium text-base'>10 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.RideAuto}</h2>
        </div>

        <div onClick={() => {
          props.setconfirmedRidePanel(true)
          props.createRide('RideMoto')
          }} className='flex w-full p-4 items-center mb-2 border-2 active:border-black rounded-xl justify-between'>
          <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png' alt='car'  />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>RideMoto <span><i className='ri-user-3-fill' />1</span></h4>
            <h5 className='font-medium text-base'>4 mins away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.RideMoto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel