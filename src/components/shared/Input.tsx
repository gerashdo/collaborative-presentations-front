
interface InputProps {
  value: string
  error?: string
  placeholder?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value,
  error,
  placeholder,
  required,
  onChange
}: InputProps) => {
  return(
    <>
      <input
        type="text"
        id="nickname"
        value={value}
        onChange={onChange}
        className={`block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-transparent'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 transition-all duration-300 ease-in-out">
          {error}
        </p>
      )}
    </>
  )
}
