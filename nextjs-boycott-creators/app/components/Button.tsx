import React from 'react';

interface ButtonProps {
  label: string;
  active: boolean;
  uppercase?: boolean;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, active, uppercase = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 border-2 rounded-lg font-semibold transition-all cursor-pointer ${
        active
          ? 'bg-purple-500 text-white border-purple-500'
          : 'bg-white text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white'
      } ${uppercase ? 'uppercase' : ''}`}
      
    >
      {label}
    </button>
  );
};