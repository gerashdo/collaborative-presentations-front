import { GetPresentationData } from "../interfaces/api"
import { LocalStorageUser, UserRole } from "../interfaces/users"


export const isUserEditor = (presentation: GetPresentationData, user: LocalStorageUser) => {
  const userFound = presentation.users.find(u => u.user._id === user._id)
  return userFound && userFound.role === UserRole.EDITOR
}
