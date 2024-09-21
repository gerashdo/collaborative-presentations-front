import { createContext, useState } from "react"
import { LocalStorageUser } from "../interfaces/users"
import { getLocalStorageUser, removeLocalStorageUser, setLocalStorageUser } from "../helpers/localStorageUser"

interface AuthContextType {
  user: LocalStorageUser | null
  isLoading: boolean
  loginAction: (user: LocalStorageUser) => void
  logoutAction: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  loginAction: () => {},
  logoutAction: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const localStorageUser = getLocalStorageUser()
  const [user, setUser] = useState<LocalStorageUser | null>(localStorageUser)

  const loginAction = (user: LocalStorageUser) => {
    setUser(user)
    setLocalStorageUser(user)
  }

  const logoutAction = () => {
    setUser(null)
    removeLocalStorageUser()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading: false, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  )
}
