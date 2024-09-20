import { Redirect } from "wouter"
import { ROUTES } from "../constants/routes"

interface PrivatePageProps {
  children: React.ReactNode
}

export const PrivatePage = ({ children }: PrivatePageProps) => {
  const user = false

  if (!user) {
    return <Redirect to={ROUTES.REGISTRATION} />
  }

  return <>{children}</>
}
