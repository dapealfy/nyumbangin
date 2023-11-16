import React from 'react';

const Button = ({text, onClick}) => {
  return (
    <button className="text-black font-semibold flex justify-center items-center gap-2 bg-[#69E07D] p-4 rounded-lg w-full hover:opacity-75" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;