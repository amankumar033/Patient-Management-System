"use client"
import React, { use } from 'react'
import Image from 'next/image'
import { Listbox } from '@headlessui/react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import {createAppointment} from '@/lib/actions/appointment.action'
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
const providers = [
  { name: 'DR Green', value: 'dr-green', icon: '/assets/images/dr-green.png' },
  { name: 'DR Remirez', value: 'dr-remirez', icon: '/assets/images/dr-remirez.png' },
  { name: 'DR Powell', value: 'dr-powell', icon: '/assets/images/dr-powell.png' },
  { name: 'DR Lee', value: 'dr-lee', icon: '/assets/images/dr-lee.png' },
  { name: 'DR Cruz', value: 'dr-cruz', icon: '/assets/images/dr-cruz.png' },
];

type FormValues = {
  schedule: Date;
  reason: string;
  additionalInfo: string;
  primaryPhysician: string;
  patientName: string;
  timeSlot: string;
};

const NewAppointment = () => {
   const [minDate, setMinDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const dd = String(today.getDate()+1).padStart(2, '0')
    setMinDate(`${yyyy}-${mm}-${dd}`)
  }, [])
  const params = useParams();
  const router = useRouter();
    const userid = params?.userid as string;
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const appointmentData = {
      ...data,
      schedule: new Date(data.schedule),
      timeSlot: data.timeSlot,
      userId: userid,
      status: "pending" as Status,

    };
   const appointment = await createAppointment(appointmentData);
   if(appointment) {
    reset();
    router.push(`/patients/${userid}/new-appointment/success`);
   }

  };
  return (
    <div className='bg-gray-200 h-screen w-screen px-10 py-8'>
      <section className=' bg-white rounded flex flex-col px-10 py-3 gap-15'>
        <div className=''>
          <Image
            src="/assets/icons/logo-full2.png"
            height={1000}
            width={1000}
            alt="patient"
            className="  h-15 w-auto object-contain"
          />
        </div>
        <div className='pl-2'>

          <h1 className='text-3xl font-bold text-[#004080] '>Hey there 👋</h1>
          <p className='text-sm text-gray-500 mt-1'>Request a new appointment in 10 seconds</p>
        </div>
        <div className="flex flex-col relative w-full">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
<div className='flex w-full gap-3'>
        <div className='mb-6 w-1/2'>
          <div >
          <label className='text-gray-700 font-medium'>Patient Name:</label>
          </div>
          <input
            type="text"
            {...register("patientName", { required: "Patient Name is required" })}
            placeholder='Enter patient name'
            className="mt-2 py-2 px-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className='mb-1'>
                  {errors.patientName && (
                    <span className=" text-red-500 text-sm ">{errors.patientName.message}</span>
                  )}
                </div>
        </div>
        <div className='w-1/2'>
                <label className="text-gray-700 font-medium ">Primary care Physician:</label>
                <Controller
                  control={control}
                  name="primaryPhysician"
                  rules={{ required: 'Primary Physician is required' }}
                  render={({ field }) => {
                    const selected = providers.find(p => p.value === field.value) || providers[0];
                    return (
                      <Listbox value={selected.value} onChange={field.onChange}>
                        <div className="relative">
                          <Listbox.Button className="relative  w-full cursor-default rounded-lg  mt-2 border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
                            <span className="flex items-center gap-2">
                              <Image src={selected.icon} alt={selected.name} width={20} height={20} />
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>

                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {providers.map((person) => (
                              <Listbox.Option
                                key={person.value}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                                }
                                value={person.value}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`flex items-center gap-2 ${selected ? 'font-medium' : 'font-normal'}`}>
                                      <Image src={person.icon} alt={person.name} width={20} height={20} />
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    );
                  }}
                />
                <div className='mb-1'>
                  {errors.primaryPhysician && (
                    <span className=" text-red-500 text-sm ">{errors.primaryPhysician.message}</span>
                  )}
                </div></div>
                </div>
<div className='flex gap-3'>
              
              <div className="flex flex-col mb-6 relative w-1/2">
                <label
                  className="text-gray-800 text-base font-semibold mb-2"
                >
                  Appointment Date:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <CalendarIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <input
                    id="appointment"
                    type="date"
                    {...register("schedule", { required: "Appointment date is required" })}
                    placeholder="Select date"
                    min={minDate}  
                    className="
        w-full
        pl-10
        pr-4
        py-2
        border
        border-gray-300
        rounded-lg
        text-sm
        text-gray-900
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent
        transition
        duration-200
        ease-in-out
        shadow-sm
      "
                  />
                </div>
                {errors.schedule && (
                  <p className="mt-1 text-red-600 text-sm animate-pulse">
                    {errors.schedule.message}
                  </p>
                )}
              </div>
              <div className='w-1/2'>
 <label htmlFor="timeSlot" className="block mb-2 font-medium text-gray-700">
        Preferred Time:
      </label>
      <select
        id="timeSlot"
        {...register('timeSlot', { required: 'Please select a time slot' })}
        className={`w-full border rounded-lg px-3 py-2 text-sm  text-gray-900 focus:outline-none  focus:ring-blue-500 ${
          errors.timeSlot ? 'border-red-500' : 'border-gray-300'
        }`}
        defaultValue=""
      >
        <option value="" disabled>
          -- Select Time Slot --
        </option>
       <option value="morning">Morning (9 AM - 12 PM)</option>
<option value="afternoon">Afternoon (12 PM - 5 PM)</option>
<option value="evening">Evening (5 PM - 9 PM)</option>

      </select>
      {errors.timeSlot && (
        <p className="text-red-500 mt-1 text-sm">{errors.timeSlot.message}</p>
      )}

              </div>
              </div>
<div className='flex mb-2 gap-3 '>
              <div className="flex flex-col relative w-1/2">
                <label className="text-gray-700  font-medium">Reason for appointment:</label>
                <textarea
                  {...register("reason", { required: "Reason for appointment is required" })}
                  placeholder="ex: Annual monthly checkup"
                  className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className='mb-1'>
                  {errors.reason && (
                    <span className=" text-red-500 text-sm ">{errors.reason.message}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col relative w-1/2">
                <label className="text-gray-700  font-medium">Additional comments/info:</label>
                <textarea
                  {...register("additionalInfo", { required: "Additional information is required" })}
                  placeholder="ex: Preferred time, health condition."
                  className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className='mb-1'>
                  {errors.additionalInfo && (
                    <span className=" text-red-500 text-sm ">{errors.additionalInfo.message}</span>
                  )}
                </div>
              </div>
            </div>


            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out mt-5 mb-6"
            >
              Schedule Appointment
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default NewAppointment;

