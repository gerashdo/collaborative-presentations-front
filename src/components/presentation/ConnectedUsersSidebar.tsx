import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useRef, useState } from "react"
import { toTitleCase } from "../../helpers/strings"
import { SmallButtonIcon } from "../shared/SmallButtonIcon"
import { UserRole } from "../../interfaces/users"
import { UserRoleData } from "../../interfaces/api"


interface ConnectedUsersSidebarProps {
  users: UserRoleData[]
  onRoleChanged: (userId: string, role: UserRole) => void
}

export const ConnectedUsersSidebar = ({
  users,
  onRoleChanged,
}: ConnectedUsersSidebarProps) => {
  const [selectedUser, setSelectedUser] = useState<UserRoleData | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedUser(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSetRole = (userId: string, role: UserRole) => {
    onRoleChanged(userId, role)
    setSelectedUser(null)
  }

  const renderUsers = () => {
    return users.map((user) => {
      if (!user.isConnected) return null
      return (
        <div key={user._id} className="flex items-center justify-between mb-2 relative">
          <span className="text-gray-600">{user.user.nickname}</span>
          <SmallButtonIcon
            onClick={() => setSelectedUser(selectedUser?._id === user._id ? null : user)}
            icon={user.role === UserRole.EDITOR ? "mdi:rename" : "mdi:eye"}
          />
          {selectedUser?._id === user._id && (
            <div ref={popupRef} className="absolute right-0 bottom-0 translate-y-full mt-2 bg-white shadow-lg rounded-md p-2 z-10">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => handleSetRole(user.user._id, role)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                >
                  {toTitleCase(role)}
                </button>
              ))}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="w-60 p-4 overflow-y-auto">
      <h3 className="font-semibold text-gray-600 mb-4 flex gap-2 items-center justify-center">
        <Icon icon="zmdi:accounts" />
        Connected Users
      </h3>
      {renderUsers()}
    </div>
  )
}
