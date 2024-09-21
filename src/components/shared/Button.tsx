type ButtonLevel = 'primary' | 'secondary' | 'danger' | 'outline'

type ButtonType = 'button' | 'submit'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
  level?: ButtonLevel
  type?: ButtonType
  onClick: () => void
}

export const Button = ({
  level = 'primary',
  type = 'button',
  children,
  onClick,
  ...props
}: ButtonProps) => {

  const classProperties = {
    withAnimation: 'rounded-lg font-semibold px-6 py-3 transform hover:-translate-y-1 hover:shadow-lg',
    simple: 'rounded-md font-normal px-4 py-2',
    primary: 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 ',
    secondary: 'bg-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-300',
    danger: 'text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700',
    outline: 'bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white'
  }

  const gerClassProperties = () => {
    switch (level) {
      case 'primary':
        return `${classProperties.primary} ${classProperties.withAnimation}`
      case 'secondary':
        return `${classProperties.simple} ${classProperties.secondary}`
      case 'danger':
        return `${classProperties.simple} ${classProperties.danger}`
      case 'outline':
        return `${classProperties.outline} ${classProperties.simple}`
      default:
        return classProperties.simple
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-1 focus:outline-none transition duration-300 ease-in-out ${gerClassProperties()}`}
      {...props}
    >
      {children}
    </button>
  )
}
