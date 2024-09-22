import { Icon } from "@iconify/react/dist/iconify.js"


interface SmallButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  onClick: () => void
}

export const SmallButtonIcon = ({icon, onClick, ...props}: SmallButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-500 hover:text-gray-700 transition duration-200"
      {...props}
    >
      <Icon icon={icon} />
    </button>
  )
}
