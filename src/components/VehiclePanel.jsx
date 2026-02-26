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
          <img className='h-12' src='https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/184379/amaze-right-front-three-quarter-3.jpeg?isig=0&q=80' alt='car'  />
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
          <img className='h-12' src='https://www.team-bhp.com/forum/attachments/indian-car-scene/2434144d1679980310-hyundai-locally-assemble-genesis-luxury-cars-india-gv80.jpg' alt='premiumcar'  />
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
          <img className='h-12' src='https://5.imimg.com/data5/SELLER/Default/2024/12/470323515/OO/TJ/RC/163666037/auto-in-ahmedabad.jpeg' alt='auto'  />
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
          <img className='h-12' src='https://5.imimg.com/data5/SELLER/Default/2022/1/LL/AB/GT/21369253/hero-splendor-plus-bs6-bike-500x500.jpg' alt='bike'  />
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