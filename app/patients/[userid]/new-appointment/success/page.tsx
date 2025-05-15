"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
const success = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load (or replace with real data fetching)
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <img src="/assets/gifs/success.gif" alt="Loading..." className="w-100 h-100" />
      </div>
    );
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
          <div className='mt-5'>
                        <Image
                                    src="/assets/icons/logo-full2.png"
                                    height={1000}
                                    width={1000}
                                    alt="patient"
                                    className=" mt-2 h-15 w-auto object-contain"
                                  />
                    </div>
      <div className='flex flex-col items-center mt-40 h-screen '>
        <Image
          src="/assets/check-circle.svg"
          height={1000}
          width={1000}
          alt="success"
          className=" mt-2 h-25 w-25 object-contain"
        />
       
      <h1 className='text-3xl text-gray-600 font-bold'>Your <span className='text-green-500'>appointment request</span>  has been</h1> 
      
       <p className='text-3xl text-gray-600 font-bold'>successfully submitted!</p>
      <p className='text-gray-500 mt-2 text-sm'>You will receive a confirmation email shortly.</p>
      </div>
        </div>
  )
}

export default success