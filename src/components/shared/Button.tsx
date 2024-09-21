type ButtonLevel = 'primary' | 'secondary'

type ButtonType = 'button' | 'submit'

interface ButtonProps {
  children: React.ReactNode
  level?: ButtonLevel
  type?: ButtonType
  onClick: () => void
}

export const Button = ({
  level = 'primary',
  type = 'button',
  children,
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
        level === 'primary'
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
          : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
      }`}
    >
      {children}
    </button>
  )
}
