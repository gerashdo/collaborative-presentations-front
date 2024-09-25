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

      const slideIndex = oldData.slides.findIndex((slide) => slide._id === slideId)
      if (slideIndex === -1) return oldData

      const elementIndex = oldData.slides[slideIndex].elements.findIndex((el) => el._id === elementId)
      if (elementIndex === -1) return oldData

      const updatedSlides = [...oldData.slides]
      const updatedElements = [...updatedSlides[slideIndex].elements]

      updatedElements[elementIndex] = element
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        elements: updatedElements,
      }

      return {
        ...oldData,
        slides: updatedSlides,
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
