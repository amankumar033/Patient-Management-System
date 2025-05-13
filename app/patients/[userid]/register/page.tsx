'use client';
import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { registerPatient } from "@/lib/actions/patient.actions";

import { useParams, useRouter } from 'next/navigation';

const providers = [
  { name: 'DR Green', value: 'dr-green', icon: '/assets/images/dr-green.png' },
  { name: 'DR Remirez', value: 'dr-remirez', icon: '/assets/images/dr-remirez.png' },
  { name: 'DR Powell', value: 'dr-powell', icon: '/assets/images/dr-powell.png' },
  { name: 'DR Lee', value: 'dr-lee', icon: '/assets/images/dr-lee.png' },
  { name: 'DR Livingstone', value: 'dr-livingstone', icon: '/assets/images/dr-livingstone.png' },
];



type FormValues = {
  fullname: string;
  email: string;
  phone: number;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedications: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationDocumentId: string | undefined;
  identificationDocument: FormData | undefined;
  document: File[];
  privacyConsent: boolean;
  privacyConsent1: boolean;
  privacyConsent2: boolean;
  privacyConsent3: boolean;

};

const Register = () => {
const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>();
const params = useParams();
const router = useRouter();
  const userid = params?.userid as string;


  const onSubmit: SubmitHandler<FormValues> = async data => {
    const userId = typeof userid === 'string' ? userid : '';
    
    if (!data.birthDate) {
      console.error("Birth date is required");
      return;
    }
    
  const {
    privacyConsent1,
    privacyConsent2,
    privacyConsent3,
    currentMedications,
    fullname,
    phone,
    gender,
    ...rest
  } = data;

  const privacyConsent = privacyConsent1 && privacyConsent2 && privacyConsent3;

    const patient = await registerPatient({
      ...data,
      userId: userId, 
      phone: data.phone.toString(),  
    });
if (patient) {
router.push(`/patients/${patient.$id}/new-appointment`);
}
    console.log(data);
    reset(); // Reset form after submission
  };

  return (
    <div className='overflow-y-clip px-30 bg-gray-200 h-full w-full overflow-x-hidden'>
        <section className='pl-15 py-5 bg-white rounded flex  h-full w-full '>
            <div className='flex flex-col gap-5 z-5'>
            <div className='flex flex-col gap-10'>
            <div className=''>
                <Image
                            src="/assets/icons/logo-full2.png"
                            height={1000}
                            width={1000}
                            alt="patient"
                            className=" mt-2 h-15 w-auto object-contain"
                          />
            </div>
   <div className='px-5'>
                <h1 className='text-2xl font-semibold text-[#004080]'>Welcome 👋</h1>
                <p className='text-sm'>let us know more about yourself</p>
            </div>
            </div>
  <div className='px-5 w-full'>
     <h1 className='text-2xl font-semibold text-[#004080]'>Personal Information</h1>
                 <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-2 max-w-lg  mt-2  w-full">
      {/* Full Name */}
      <div className="flex flex-col ">
        <label className="text-gray-700 text-sm font-medium">Full Name:</label>
        <input
          {...register("fullname", { required: "Full name is required",
             minLength: { value: 2, message: "Minimum 2 characters" }
           })}
          placeholder="John"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.fullname && (
            <span className=" text-red-500 text-sm ">{errors.fullname.message}</span>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      </div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Email:</label>
        <input
          {...register("email", { required: "email is required" ,
            pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address"
  }
          })}
          placeholder="email@example.com"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.email && (
            <span className=" text-red-500 text-sm ">{errors.email.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Phone No:</label>
        <input   type="text" inputMode="numeric"
          {...register("phone", { 
            required: "phone is required",
            minLength: { value: 10, message: "Minimum 10 characters" },
            maxLength: { value: 12, message: "Maximum 15 characters" },
          })}
          placeholder="123-456-7890"
            onInput={(e) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, "");
  }}
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.phone && (
            <span className=" text-red-500 text-sm ">{errors.phone.message}</span>
          )}
        </div>
      </div>
</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Date of birth:</label>
       <Controller
              name="birthDate"
              control={control}
              defaultValue={undefined}
              render={({ field }: { field: { value: Date | null; onChange: (date: Date | null) => void } }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                 placeholderText="Select your birth date"
        className="p-1  mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"

                />
              )}
              
            />
        <div className='mb-1'>
          {errors.birthDate && (
            <span className=" text-red-500 text-sm ">{errors.birthDate.message}</span>
          )}
        </div>
      </div>
    <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Gender:</label>
        <select
          {...register("gender", { required: "gender is required" })}
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <div className='mb-1'>
          {errors.gender && (
            <span className=" text-red-500 text-sm ">{errors.gender.message}</span>
          )}
        </div>
      </div>  

</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Address:</label>
        <input
          {...register("address", { required: "address is required" })}
          placeholder="123 Main St, City, State"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.address && (
            <span className=" text-red-500 text-sm ">{errors.address.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Occupation:</label>
        <input
          {...register("occupation", { required: "occupation is required" })}
          placeholder="Software Engineer"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.occupation && (
            <span className=" text-red-500 text-sm ">{errors.occupation.message}</span>
          )}
        </div>
      </div>
</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Emergency Contact Name:</label>
        <input
          {...register("emergencyContactName", { required: "emergencyContactName is required" })}
          placeholder="Guardian Name"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.emergencyContactName && (
            <span className=" text-red-500 text-sm ">{errors.emergencyContactName.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Emergency Contact Number:</label>
  <input
    {...register("emergencyContactNumber", { required: "emergencyContactNumber is required" })}
    placeholder="123-456-7890"
    onInput={(e) => {
      const input = e.target as HTMLInputElement;
      input.value = input.value.replace(/[^0-9]/g, "");
    }}
    className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  />
        <div className='mb-1'>
          {errors.emergencyContactNumber && (
            <span className=" text-red-500 text-sm ">{errors.emergencyContactNumber.message}</span>
          )}
        </div>
      </div>
</div>

<div>
 <h1 className='text-2xl font-semibold text-[#004080] mb-2 mt-3'>Medical Information</h1>
<div className='flex mb-2 gap-2'>

       <div className="flex flex-col relative w-full">
 <label className="text-gray-700 text-sm font-medium mb-2">Primary care Physician:</label>
        <Controller
        control={control}
        name="primaryPhysician"
        rules={{ required: 'Primary Physician is required' }}
        render={({ field }) => {
          const selected = providers.find(p => p.value === field.value) || providers[0];
          return (
            <Listbox value={selected.value} onChange={field.onChange}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
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
        </div>
      </div>
      
</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Insurance Provider:</label>
        <input
          {...register("insuranceProvider", { required: "insuranceProvider is required" })}
          placeholder="Insurance Provider"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.insuranceProvider && (
            <span className=" text-red-500 text-sm ">{errors.insuranceProvider.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Insurance Policy Number:</label>
        <input
          {...register("insurancePolicyNumber", { required: "insurancePolicyNumber is required" })}
          placeholder="123-456-7890"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.insurancePolicyNumber && (
            <span className=" text-red-500 text-sm ">{errors.insurancePolicyNumber.message}</span>
          )}
        </div>
      </div>
</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Allergies(if any):</label>
        <textarea
          {...register("allergies",)}
          placeholder="ex: Peanuts, Pollens"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.allergies && (
            <span className=" text-red-500 text-sm ">{errors.allergies.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Current Medications:</label>
        <textarea
          {...register("currentMedications", )}
          placeholder="ex: Lisinopril, Metformin"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.currentMedications && (
            <span className=" text-red-500 text-sm ">{errors.currentMedications.message}</span>
          )}
        </div>    
      </div>
</div>
<div className='flex mb-2 gap-2'>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Family Medical History(if relevant):</label>
        <textarea
          {...register("familyMedicalHistory",)}
          placeholder="ex: Heart disease, Diabetes"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.familyMedicalHistory && (
            <span className=" text-red-500 text-sm ">{errors.familyMedicalHistory.message}</span>
          )}
        </div>
      </div>
       <div className="flex flex-col relative w-1/2">
        <label className="text-gray-700 text-sm font-medium">Past Medical History:</label>
        <textarea
          {...register("pastMedicalHistory",)}
          placeholder="ex: Asthma, Diabetes"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.pastMedicalHistory && (
            <span className=" text-red-500 text-sm ">{errors.pastMedicalHistory.message}</span>
          )}
        </div>    
      </div>
</div>
</div>
<div>
  <h1 className='text-2xl font-semibold text-[#004080] mb-2 mt-3'>Identification and Information</h1>
<div className='flex mb-2 gap-2'>
  {/* Identification Type Dropdown */}
  <div className="flex flex-col relative w-full">
    <label className="text-gray-700 text-sm font-medium">Identification Type:</label>
    <select
      {...register("identificationType", { required: "Identification Type is required" })}
      className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    >
      <option value="">Select type</option>
      <option value="passport">Passport</option>
      <option value="driver_license">Driver's License</option>
      <option value="aadhaar">Aadhaar Card</option>
      <option value="voter_id">Voter ID</option>
    </select>
    {errors.identificationType && (
      <span className="text-red-500 text-sm mt-1">{errors.identificationType.message}</span>
    )}
  </div>

  {/* Identification Number Dropdown */}

</div>
 <div className="flex flex-col relative w-full">
        <label className="text-gray-700 text-sm font-medium">Identification Number:</label>
        <input
          {...register("identificationDocumentId", { required: "Identification Number is required" })}
          placeholder="ex: 123456789"
          className="mt-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <div className='mb-1'>
          {errors.identificationDocumentId && (
            <span className=" text-red-500 text-sm ">{errors.identificationDocumentId.message}</span>
          )}
        </div>
      </div>
  <div className="flex flex-col relative w-full mb-4">
  <label className="text-gray-700 text-sm font-medium mb-2 mt-1">Upload Document:</label>
  <Controller
        name="document"
        control={control}
        rules={{ required: "File is required" }}
        render={({ field, fieldState }) => {
          const { onChange, value } = field;
          const { error } = fieldState;

          const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { 'application/pdf': [], 'image/*': [] },
            multiple: false,
            onDrop: (acceptedFiles) => onChange(acceptedFiles),
          });

          return (
            <div >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-gray-600 text-sm">
                  {value?.[0]?.name || 'Drag and drop a file here, or click to select a file'}
                </p>
              </div>
             
            </div>
          );
        }}
      />

  {errors.document && (
    <span className="text-red-500 text-sm mt-1">{errors.document.message}</span>
  )}
</div>

</div>
<h1 className='text-2xl font-semibold text-[#004080] mb-2 '>Privacy Consent</h1>

<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="privacyConsent1"
    {...register("privacyConsent1", { required: "Privacy consent is required" })}
    className="form-checkbox"
  />
  <label htmlFor="privacyConsent1" className="text-gray-700 text-sm">
    I consent to receive medical treatment for my health conditions.
  </label>
  {errors.privacyConsent1 && (
    <p className="text-red-500 text-sm">{errors.privacyConsent1.message}</p>
  )}
</div>
<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="privacyConsent2"
    {...register("privacyConsent2", { required: "Privacy consent is required" })}
    className="form-checkbox"
  />
  <label htmlFor="privacyConsent2" className="text-gray-700 text-sm">
    I consent to receive medical information and updates via email and SMS.
  </label>
  {errors.privacyConsent2 && (
    <p className="text-red-500 text-sm">{errors.privacyConsent2.message}</p>
  )}
</div>
<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="privacyConsent3"
    {...register("privacyConsent3", { required: "Privacy consent is required" })}
    className="form-checkbox"
  />
  <label htmlFor="privacyConsent3" className="text-gray-700 text-sm">
    I acknowledge that I have read and understood the privacy policy.
  </label>
  {errors.privacyConsent3 && (
    <p className="text-red-500 text-sm">{errors.privacyConsent3.message}</p>
  )}
</div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 mt-5 mb-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
            

           </div></div>
 <Image
    src="/assets/images/doctor_information.jpg"
    height={1000}
    width={900}
    alt="patient"
    className="fixed top-[1px] h-[99%] w-[80%] object-contain right-[-140px] z-0"
  /> 


     </section>
    </div>
  )
}

export default Register;