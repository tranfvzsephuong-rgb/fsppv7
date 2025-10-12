/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';

const NumberInput = ({ showValid, showError, value, onChange, placeholder }: any) => {
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      onChange(inputValue)
    }
  }

  return (
    <input
      disabled={showValid && !showError}
      value={value}
      onChange={handleInputChange}
      className='disabled:bg-gray-200 disabled:text-gray-400 px-[12px] transition-all focus:ring-1 focus:ring focus:border-blue-300 pb-[7px] w-[220px] border rounded-md h-[50px] border-[#ccc]'
      type='text'
      name='otp2FA'
      id=''
      placeholder={placeholder}
    />
  )
}

export default NumberInput
