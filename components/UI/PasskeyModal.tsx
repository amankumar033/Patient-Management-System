'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { verifyPasskey } from '@/lib/actions/verification.action';
import { useRouter } from "next/navigation";
type OtpInputProps = {
  length?: number;
  onChange: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  c
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange(newValues.join(''));

    if (value && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('Text').slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const pasteValues = paste.split('');
    const newValues = [...values];
    for (let i = 0; i < pasteValues.length; i++) {
      newValues[i] = pasteValues[i];
    }
    setValues(newValues);
    onChange(newValues.join(''));
    focusInput(Math.min(pasteValues.length, length - 1));
  };
  const router = useRouter();

async function submitHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    const otp = values.join('');
    if (otp.length !== length) {
      alert('Please enter the complete passkey.');
      return;
    }
    // Call verifyPasskey and handle result (async/await or .then)
    const admin = await verifyPasskey(otp);
    if (admin) {
     router.push('/admin');
    } else {
      alert('Invalid passkey. Please try again.');
    }
}

return (
  <div className='flex gap-2 flex-col bg-gray-800 absolute  px-5  rounded-lg justify-center items-center z-20 shadow-2xl border-1 border-gray-500'>
    <div>
      <Image
        src="/assets/icons/close.svg"
        height={1000}
        width={1000}
        alt="close"
        className=" h-8  mt-4 w-auto object-contain absolute right-4 cursor-pointer"
        onClick={() => {
          window.location.href = '/';
        }}
      />
    </div>
    <div>
      <h1 className='mt-3 text-xl mb-1 text-white'>Admin Access Verification</h1>
      <h6 className='text-sm text-gray-400'>To access the admin page please enter the passkey.</h6>
    </div>
    <div className='flex gap-2 mb-5 mt-4'>
      {values.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={(el) => { inputsRef.current[idx] = el; }}
          className='w-10 h-10 text-lg text-center border rounded focus:outline-none  border-gray-500 focus:border-blue-500 bg-white'
        />
      ))}
    </div>
    <button onClick={submitHandler} className='mb-7 bg-green-500 p-3 rounded-lg w-full text-white'>Verify</button>
  </div>
);
};

export default OtpInput;
