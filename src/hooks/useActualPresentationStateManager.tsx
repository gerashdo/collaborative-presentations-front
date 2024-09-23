import { useSetRecoilState } from "recoil"
import { actualPresentationState } from "../state/actualPresentation"
import { UserRoleData } from "../interfaces/api"
import { Slide } from "../interfaces/events"


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

  const updateSlidesList = (slides: Slide[]) => {
    setActualPresentation((oldData) => {
      if (!oldData) return null
      return {
        ...oldData,
        slides
      }
    })
  }

  return {
    updateUsersList,
    updateSlidesList,
  }
}
