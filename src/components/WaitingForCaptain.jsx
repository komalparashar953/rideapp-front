import React, { useEffect } from 'react'

const WaitingForCaptain = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);
  return (
    <div>
      <h5 onClick={() => {
          props.setwaitingForCaptain(false)
          }} className='p-2 text-center absolute top-0 w-[90%]'><i className='text-3xl text-gray-400 ri-arrow-down-wide-line' /></h5>
      
      <div className='flex items-center justify-between'>
        <img className='h-14' src={props.vehicleImage} alt='WaitingCaptaincar'  />
        <div className='text-right'>
            <h2 className='text-lg font-medium'>{(props.data?.captain?.fullname.firstname) + " " + (props.data?.captain?.fullname.lastname)} </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.data?.captain?.vehicle?.plate}</h4>
            {/* <p className='text-sm text-gray-600'>{props.data?.captain?.vehicle?.vehicleType}</p> */}
            <h5 className='text-lg font-semibold'>{props.data?.otp}</h5>
        </div>
      </div>

      <div className='flex flex-col justify-between gap-2 items-center'>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-user-fill text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.data?.pickup}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2 '>
            <i className='ri-map-pin-2-fill text-lg' />
            <div>
              <h3 className='text-lg font-medium'>{props.data?.destination}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-2'>
            <i className='ri-currency-line text-lg' />
            <div>
              <h3 className='text-lg font-medium'>₹{props.data?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Money</p>
            </div>
          </div>
        </div> 
        
      </div>



    </div>
  )
}

export default WaitingForCaptain