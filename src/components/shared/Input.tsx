import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          className={`block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-transparent'
          }`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 transition-all duration-300 ease-in-out">
            {error}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = 'Input'