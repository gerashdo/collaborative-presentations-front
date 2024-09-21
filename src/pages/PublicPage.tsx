import { useContext } from "react"
import { Redirect } from "wouter"
import { ROUTES } from "../constants/routes"
import { AuthContext } from "../context/authContext"


interface PublicPageProps {
  children: React.ReactNode
}

export const PublicPage = ({ children }: PublicPageProps) => {
  const {user} = useContext(AuthContext)

  if (user) {
    return <Redirect to={ROUTES.PRESENTATION_LIST} />
  }

  return <>{children}</>
}
