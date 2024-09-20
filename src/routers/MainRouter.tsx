import { Route, Switch } from "wouter"
import { ROUTES } from "../constants/routes"
import { RegistrationPage } from "../pages/RegistrationPage"
import { PrivatePage } from "../pages/PrivatePage"
import { PresentationsListPage } from "../pages/PresentationsListPage"


export const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.REGISTRATION} component={RegistrationPage}/>
        <Route
          path={ROUTES.PRESENTATION_LIST}
          component={() => <PrivatePage><PresentationsListPage/></PrivatePage>}
        />
        <Route path="*" component={RegistrationPage} />
      </Switch>
    </>
  )
}
