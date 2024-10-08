import { useContext } from "react"
import { Redirect } from "wouter"
import { ROUTES } from "../constants/routes"
import { AuthContext } from "../context/authContext"

interface PrivatePageProps {
  children: React.ReactNode
}

export const PrivatePage = ({ children }: PrivatePageProps) => {
  const {user} = useContext(AuthContext)

  if (!user) {
    return <Redirect to={ROUTES.REGISTRATION} />
  }

  return <>{children}</>
}
