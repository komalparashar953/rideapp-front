import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1622732742132-da448b09ef63?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen w-full pt-4 flex justify-between flex-col'>
        
        <img className='w-20 ml-16' src='https://upload.wikimedia.org/wikipedia/commons/b/b2/Ride_logo.png' alt='logo' />
        
        <div className='bg-gray-200 py-4 px-4 pb-6'>
          <h2 className='text-3xl font-bold '>Get Started With Ride</h2>
          <Link to='/signin' className='flex items-center justify-center w-full bg-black text-white py-4 mt-5 rounded'>Continue</Link>
        
        </div>
      </div>
    </div>
  )
}

export default Homepage