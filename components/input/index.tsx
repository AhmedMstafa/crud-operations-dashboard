import React, { forwardRef } from 'react';

interface InputProps {
  type: string;
  name: string;
  id: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, id, label, error, errorMessage, ...rest }, ref) => {
    return (
      <div className="relative flex flex-col gap-2.5 py-5">
        <label className="text-center" htmlFor={id}>
          {label || name}
        </label>
        <div className="relative pt-5">
          {error && (
            <p className="absolute top-0 left-0 px-2.5 text-red-500 text-[12px]">
              {errorMessage}
            </p>
          )}

          <input
            ref={ref}
            className={`border bg-white text-black p-1 w-full ${
              error ? 'border-red-500' : 'border-black'
            }`}
            id={id}
            name={name}
            type={type}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
