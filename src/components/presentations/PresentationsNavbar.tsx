import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "../shared/Button"
import { LocalStorageUser } from "../../interfaces/users"


interface PresentationsNavbarProps {
  user?: LocalStorageUser
  onLogout: () => void
}

export const PresentationsNavbar = ({
  user,
  onLogout
}: PresentationsNavbarProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Presentations</h1>
      <div className="flex items-center">
        <p className="text-sm text-gray-600 mr-4">Welcome{user ? `, ${user.nickname}` : ''}</p>
        <Button
          level='secondary'
          type='button'
          onClick={onLogout}
        >
          <Icon icon="mdi:logout" />
          Logout
        </Button>
      </div>
    </div>
  )
}
