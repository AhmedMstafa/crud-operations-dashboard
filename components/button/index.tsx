import React from 'react';

const Button: React.FC<{
  text: string;
  onClick?: () => void;
}> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 border text-white cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
