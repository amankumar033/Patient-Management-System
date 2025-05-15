'use client';
import Image from "next/image";
import Link from "next/link";
import PasskeyModal from "@/components/UI/PasskeyModal";
import PatientForm from "@/components/forms/PatientForm";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
const Home = () => {
  const [otp, setOtp] = useState('');
const searchParams = useSearchParams();
  const isAdmin = searchParams!.get("admin") === "true";

  return (
    <div className="flex h-screen py-12 px-30 overflow-hidden bg-gray-200">
      <div className="top-[40%]  left-[40%] absolute ">
      {isAdmin && <PasskeyModal length={6} onChange={setOtp} />}
      </div>
      {/* Left Side: Form with margin */}
      <section className="flex w-1/2 px-2 justify-center   flex-col bg-white z-5">
      <div>
          <Image
            src="/assets/icons/logo-full2.png"
            height={1000}
            width={1000}
            alt="patient"
            className=" h-10  mt-4 w-auto object-contain"
          /></div>
        <div className=" w-full   h-full flex  flex-col ">

       <div className="justify-center items-center flex-grow ">
            <PatientForm />
          </div>

          <div className="text-14-regular mt-8 flex justify-between">
            <p className="xl:text-left text-sm font-light text-gray-400">© 2024 Care Pulse</p>
            <Link href="/?admin=true" className="text-green-500 font-extralight">
              Admin
            </Link>
          </div>
        </div>
      </section>
            
      {/* Right Side: Image */}
      <div className="w-1/2 h-full ">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="w-full h-full  object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
