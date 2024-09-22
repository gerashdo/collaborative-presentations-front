import { Icon } from "@iconify/react/dist/iconify.js"
import { UserRole } from "../../interfaces/users"
import { useEffect, useRef, useState } from "react"
import { toTitleCase } from "../../helpers/strings"
import { SmallButtonIcon } from "../shared/SmallButtonIcon"


interface ConnectedUsersSidebarProps {
  users: any[]
  isCurrentUserCreator: boolean
  onRoleChanged: (userId: number, role: UserRole) => void
}

export const ConnectedUsersSidebar = ({
  users,
  isCurrentUserCreator,
  onRoleChanged,
}: ConnectedUsersSidebarProps) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
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

  const handleSetRole = (userId: number, role: UserRole) => {
    onRoleChanged(userId, role)
    setSelectedUser(null)
  }

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
      <h3 className="font-bold mb-4 flex gap-2 items-center justify-center">
        <Icon icon="zmdi:accounts" />
        Connected Users
      </h3>
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-2 relative">
          <span>{user.name}</span>
          {isCurrentUserCreator && user.role !== "Creator" && (
            <SmallButtonIcon
              onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
              icon={user.role === UserRole.EDITOR ? "mdi:rename" : "mdi:eye"}
            />
          )}
          {selectedUser === user.id && (
            <div ref={popupRef} className="absolute right-0 bottom-0 translate-y-full mt-2 bg-white shadow-lg rounded-md p-2 z-10">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => handleSetRole(user.id, role)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                >
                  {toTitleCase(role)}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
