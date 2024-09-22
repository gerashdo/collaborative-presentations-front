import { ROUTES } from "../constants/routes"


export const getPresentationRoute = (id: string) => {
  return ROUTES.PRESENTATION.replace(':id', id)
}
