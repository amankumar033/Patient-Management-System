"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const success = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const userid = params?.userid ?? '';

  useEffect(() => {

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
      <div className='flex flex-col items-center mt-30 h-screen '>
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
      <div className='flex  items-center mt-10 gap-5'>
      <button  onClick={() => router.push(`/patients/${userid}/new-appointment/`)}  className='bg-green-500 text-white px-4 py-2 rounded mt-10 hover:bg-green-600 transition duration-300'>
        New Appointment
      </button>
      <button className='bg-green-500 text-white px-4 py-2 rounded mt-10 hover:bg-green-600 transition duration-300'>
        Go to Dashboard
      </button>
      </div></div>
        </div>
  )
}

export default success