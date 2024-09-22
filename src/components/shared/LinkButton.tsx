
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
  onClick?: () => void
}

export const LinkButoon = ({
  children,
  onClick,
  ...props
}: ButtonProps) => {

  return (
    <button
      {...props}
      onClick={onClick}
      className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
    >
      {children}
    </button>
  )
}
