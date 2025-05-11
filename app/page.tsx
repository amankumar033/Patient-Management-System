import Image from "next/image";
import Link from "next/link";

import PatientForm from "@/components/forms/PatientForm";

const Home = () => {
  return (
    <div className="flex h-screen py-12 px-30 overflow-hidden bg-gray-200">
      {/* Left Side: Form with margin */}
      <section className="flex w-1/2 px-2 justify-center   flex-col bg-white">
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
