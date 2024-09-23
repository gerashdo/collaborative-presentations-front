import { useSetRecoilState } from "recoil"
import { actualPresentationState } from "../state/actualPresentation"
import { UserRoleData } from "../interfaces/api"


export const useActualPresentationStateManager = () => {
  const setActualPresentation = useSetRecoilState(actualPresentationState)

  const updateUsersList = (users: UserRoleData[]) => {
    setActualPresentation((oldData) => {
      if (!oldData) return null
      return {
        ...oldData,
        users
      }
    })
  }

  return {updateUsersList}
}
