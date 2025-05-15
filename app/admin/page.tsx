'use client'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { getAllAppointments } from '@/lib/actions/appointment.action'
import { updateAppointmentStatus } from '@/lib/actions/appointment.action'
type Patient = {
  patientName: string;
  schedule: string;
  primaryPhysician: string;
  status: string;
  id: string;
};


const admin = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const scheduledCount = patients.filter(p => p.status === 'scheduled').length;
const pendingCount = patients.filter(p => p.status === 'pending').length;
const cancelledCount = patients.filter(p => p.status === 'cancelled').length;
const fetchPatients = async () => {
  const allAppointments = await getAllAppointments();
  const patients: Patient[] = allAppointments.map((appointment) => ({
    id: appointment.$id,
    patientName: appointment.patientName,
    schedule: new Date(appointment.schedule).toLocaleDateString(),
    primaryPhysician: appointment.primaryPhysician,
    status: appointment.status,
  }));
  setPatients(patients);

};
  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <div className='bg-gray-400 '>
      <div className='flex  px-2  h-screen flex-col bg-white z-5 rounded-lg'>
      <div className='flex justify-between px-2'>
      
      <Image
        src="/assets/icons/logo-full2.png"
        height={1000}
        width={1000}
        className='h-10 mt-4 w-auto object-contain'
        alt="logo"
      />
      <h1 className='mt-5'>Admin</h1>
      </div>
      <section className='flex  px-4  h-screen flex-col bg-white gap-2'>
        <div className='my-4'>
          <h1 className='text-2xl text-[#004080] font-bold'>Welcome, Admin</h1>
          <p className='text-gray-600'>Start day with managing new appointments.</p>
        </div>
        <div className='flex gap-5'>
        <div className='flex flex-col gap-2 w-1/3 bg-emerald-400 rounded-lg p-4'>
          <div className='flex  gap-1 w-1/3'>
              <Image
                src="/assets/icons/calendar-check-02.png"
                height={1000}
                width={1000}
                className='h-12 mt-2 w-auto object-contain'
                alt="logo"
              />
           <h1 className='mt-4 text-white text-3xl'>{scheduledCount}</h1>
          </div>
          <h1 className='text-sm text-white '>Total No. of scheduled appointments</h1>
          </div>
        <div className='flex flex-col gap-5 w-1/3 bg-blue-600 rounded-lg p-4'>
          <div className='flex items-center gap-1 w-1/3'>
              <Image
                src="/assets/icons/pending.svg"
                height={1000}
                width={1000}
                className='h-8 mt-4 w-auto object-contain'
                alt="logo"
              />
           <h1 className='mt-4 text-white text-3xl'>{pendingCount}</h1>
          </div>
          <h1 className='text-sm text-white'>Total No. of pending appointments</h1>
          </div>
        <div className='flex flex-col gap-5 w-1/3 bg-red-400 rounded-lg p-4'>
          <div className='flex items-center gap-2 w-1/3'>
              <Image
                src="/assets/icons/cancelled.svg"
                height={1000}
                width={1000}
                className='h-8 mt-4 w-auto object-contain'
                alt="logo"
              />
           <h1 className='mt-4 text-white text-3xl'>{cancelledCount}</h1>
          </div>
          <h1 className='text-sm text-white'>Total No. of cancelled appointments</h1>
          </div>
        </div>
        <div className='mt-4 flex '>
<table className="min-w-full bg-white shadow-md border border-gray-300 rounded-lg overflow-hidden ">
  <thead className="bg-gray-200">
    <tr>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Date</th>
      <th className="p-3 text-left">Status</th>
      <th className="p-3 text-left">Doctor</th>
      <th className="p-3 text-left w-20">Action</th>
    </tr>
  </thead>
  <tbody>
    {patients.map((patient, index) => (
      <tr
        key={index}
        className={`border-t border-gray-300 ${
          index === patients.length - 1 ? 'last:rounded-b-lg' : ''
        }`}
      >
        <td
          className={`p-3 ${
            index === patients.length - 1 ? 'rounded-bl-lg' : ''
          }`}
        >
          {patient.patientName}
        </td>
        <td className="p-3">{patient.schedule}</td>
        <td className="p-3">
  <div className={`flex items-center w-30 gap-2 px-2 py-1 rounded-full text-white text-xs font-semibold
    ${
      patient.status === 'scheduled' ? 'bg-green-400' :
      patient.status === 'pending' ? 'bg-blue-400' :
      patient.status === 'cancelled' ? 'bg-red-400' :
      'bg-gray-400'
    }
  `}>
    <Image
      src={
        patient.status === 'scheduled'
          ? '/assets/icons/check.svg'
          : patient.status === 'pending'
          ? '/assets/icons/pending.svg'
          : patient.status === 'cancelled'
          ? '/assets/icons/cancelled.svg'
          : '/assets/icons/default.svg'
      }
      alt="status-icon"
      width={16}
      height={16}
      className="object-contain"
    />
    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
  </div>
</td>
        <td
          className={`p-3 ${
            index === patients.length - 1 ? 'rounded-br-lg' : ''
          }`}
        >
      
          {patient.primaryPhysician}
        </td>
        <td
  className={`p-3 flex gap-2 ${
    index === patients.length - 1 ? 'rounded-br-lg' : ''
  }`}
>
  <button  onClick={async () => {
    await updateAppointmentStatus(patient.id, 'scheduled');
    await fetchPatients();
  }} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded cursor-pointer">
    Schedule
  </button>
  <button   onClick={async () => {
    await updateAppointmentStatus(patient.id, 'cancelled');
    await fetchPatients();
  }} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded cursor-pointer">
    Cancel
  </button>
</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </section>
      </div>
    </div>
  )
}

export default admin