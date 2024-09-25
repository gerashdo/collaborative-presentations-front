import { useSetRecoilState } from "recoil"
import { actualPresentationState } from "../state/actualPresentation"
import { SlideElementData, UserRoleData } from "../interfaces/api"
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

  const updateSlideElements = (slideId: string, elements: SlideElementData[]) => {
    setActualPresentation((oldData) => {
      if (!oldData) return null
      return {
        ...oldData,
        slides: oldData.slides.map((slide) => {
          if (slide._id === slideId) {
            return {
              ...slide,
              elements
            }
          }
          return slide
        })
      }
    })
  }

  const updateSlideElement = (slideId: string, elementId: string, element: SlideElementData) => {
    setActualPresentation((oldData) => {
      if (!oldData) return null
      return {
        ...oldData,
        slides: oldData.slides.map((slide) => {
          if (slide._id === slideId) {
            return {
              ...slide,
              elements: slide.elements.map((el) => {
                if (el._id === elementId) {
                  return element
                }
                return el
              })
            }
          }
          return slide
        })
      }
    })
  }

  return {
    updateUsersList,
    updateSlidesList,
    updateSlideElements,
    updateSlideElement,
  }
}
