import { Icon } from "@iconify/react/dist/iconify.js"


interface SmallButtonIconProps {
  icon: string
  onClick: () => void
}

export const SmallButtonIcon = ({icon, onClick}: SmallButtonIconProps) => {
  return (
    <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
      <Icon icon={icon} />
    </button>
  )
}
