"use client";
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
type FormValues = {
  fullname: string;
  email: string;
  phone: string;
};

const PatientForm = () => {

    const router = useRouter();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
  shouldFocusError: false 
});

const handleReactFormSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  handleSubmit(onSubmit)(event);
};
function isValidPhoneNumber(phone: string): boolean {
  const cleaned = `+${phone.replace(/[^\d]/g, '')}`;
  const phoneRegex = /^\+[1-9]\d{7,14}$/; // E.164 format
  return phoneRegex.test(cleaned);
}


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
     const formattedPhone = `+${data.phone.replace(/\D/g, '')}`;
      try {
      const user = {
        name: data.fullname,
        email: data.email,
        phone:  formattedPhone,
      };

      const newUser = await createUser(user);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
        reset();
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <form onSubmit={handleReactFormSubmit} className="max-w-lg mx-auto p-5 mt-13 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] space-y-4 w-auto">

      <h2 className="text-2xl font-semibold text-gray-700 text-center">Patient Form</h2>

      {/* Full Name */}
      <div className="flex flex-col relative">
        <label className="text-gray-700 font-medium">Full Name:</label>
        <input
          {...register("fullname", { required: "Full name is required" })}
          placeholder="John"
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className='mb-1'>
          {errors.fullname && <span className="absolute text-red-500 text-sm ">{errors.fullname.message}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format"
            }
          })}
          placeholder="example@example.com"
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className='mb-1'>
          {errors.email && <span className="absolute text-red-500 text-sm ">{errors.email.message}</span>}
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium w-full mb-2">Phone:</label>
      <Controller
  name="phone"
  control={control}
  rules={{
    required: "Phone number is required",
    validate: value => isValidPhoneNumber(value) || "Invalid phone number"
  }}
  render={({ field }) => (
    <PhoneInput
      {...field}
      country="in"
      inputProps={{
        name: 'phone',
        required: true
      }}
      onChange={(value) => field.onChange(value)}
      containerClass="!w-full"
      inputClass="!w-full p-6 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500"
    />
  )}
/>

        <div className='mb-1'>
          {errors.phone && <span className="absolute text-red-500 text-sm ">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default PatientForm;
