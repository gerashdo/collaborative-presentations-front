import { Route, Switch } from "wouter"
import { RegistrationPage } from "../pages/RegistrationPage"
import { PrivatePage } from "../pages/PrivatePage"
import { PresentationsListPage } from "../pages/PresentationsListPage"
import { PublicPage } from "../pages/PublicPage"
import { ROUTES } from "../constants/routes"
import { PresentationPage } from "../pages/PresentationPage"


export const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route
          path={ROUTES.REGISTRATION}
          component={() => <PublicPage><RegistrationPage/></PublicPage>}
        />
        <Route
          path={ROUTES.PRESENTATION}
          component={() => <PrivatePage><PresentationPage/></PrivatePage>}
        />
        <Route
          path={ROUTES.PRESENTATION_LIST}
          component={() => <PrivatePage><PresentationsListPage/></PrivatePage>}
        />
        <Route
          path="*"
          component={() => <PublicPage><RegistrationPage/></PublicPage>}
        />
      </Switch>
    </>
  )
}
