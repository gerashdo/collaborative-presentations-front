import { LocalStorageUser } from "../interfaces/users"

export const getLocalStorageUser = (): LocalStorageUser | null => {
  const user = localStorage.getItem('user-presentations')
  return user ? JSON.parse(user) : null
}

export const setLocalStorageUser = (user: LocalStorageUser) => {
  localStorage.setItem('user-presentations', JSON.stringify(user))
}

export const removeLocalStorageUser = () => {
  localStorage.removeItem('user-presentations')
}
