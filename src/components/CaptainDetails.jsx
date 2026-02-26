import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  
    const { captain } = useContext(CaptainDataContext) 

    if (!captain) {
        return <div>Loading...</div>;
    }
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-4' >
                <img className='h-14 w-14 rounded-full object-cover' src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsX29mZmljZV8zMF9waG90b19vZl9hbl9pbmRpYW5fbWFuX3NtaWxpbmdfaXNvbGF0ZWRfb25fd182YWYzNjI5ZS1hMjNmLTRjZjgtOWUzYS1jNGQ4NWQ2MmI4NzctbTR0anVpNnoucG5n.png' alt='captain' />
                <h4 className='text-lg font-medium capitalize'>{(captain.fullname?.firstname || '') + " " + (captain.fullname?.lastname || '')}</h4>
            </div>
            <div className=''>
                <h4 className='text-xl font-semibold'>₹295.20</h4>
                <p className='text-sm text-gray-600'>Earned</p>
            </div>
        </div>

        <div className='flex p-5 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-s3ar mb-2t'>
            <div className='text-center'>
                  <i className='text-3xl mb-2 font-thin ri-timer-2-line' />
                  <h5 className='text-lg font-medium'>10.2</h5>
                  <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
                  <i className='text-3xl mb-2 font-thin ri-speed-up-line' />
                  <h5 className='text-lg font-medium'>15</h5>
                  <p className='text-sm text-gray-600'>Km</p>
            </div>
            <div className='text-center'>
                  <i className='text-3xl mb-2 font-thin ri-booklet-line' />
                  <h5 className='text-lg font-medium'>10.2</h5>
                  <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
        </div>
    </div>
  )
}

export default CaptainDetails