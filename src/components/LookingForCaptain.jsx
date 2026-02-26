import React from 'react'

const LookingForCaptain = (props) => {

  
  return (
    <div>
      <h5 onClick={() => {
            props.setvehicleFound(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
      
      <h3 className='text-2xl font-semibold mb-5'>Looking for a Captain</h3>

      <div className='flex flex-col justify-between gap-2 items-center'>
        <img className='h-20' src={props.vehicleImage} alt='LookingCaptaincar'  />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-user-fill text-lg' />
            <div> 
              <h3 className='text-lg font-medium'>{props.lookingData.pickup}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-2-fill text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.lookingData.destination}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-2'>
            <i className='ri-currency-line text-lg' />
            <div>
              <h3 className='text-lg font-medium'>₹{props.lookingData.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Money</p>
            </div>
          </div>
        </div> 
        
      </div>



    </div>
  )
}

export default LookingForCaptain