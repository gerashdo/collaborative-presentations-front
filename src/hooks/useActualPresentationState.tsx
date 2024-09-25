import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { actualPresentationState } from "../state/actualPresentation"
import { checkIfCreator, checkIfEditor, findCurrentSlide } from "../helpers/presentationState"
import { GetPresentationData, Slide } from "../interfaces/api"
import { LocalStorageUser } from "../interfaces/users"


export const useActualPresentationState = (
  presentation: GetPresentationData | null,
  currentUser: LocalStorageUser | null
) => {
  const [actualPresentation, setActualPresentation] = useRecoilState(actualPresentationState)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    if (presentation) setActualPresentation(presentation)
    return () => setActualPresentation(null)
  }, [presentation, setActualPresentation])

  useEffect(() => {
    if (actualPresentation) {
      const updatedSlide = findCurrentSlide(actualPresentation.slides, currentSlide)
      setCurrentSlide(updatedSlide)
    }
  }, [actualPresentation, currentSlide])

  useEffect(() => {
    const isUserCreator = checkIfCreator(actualPresentation, currentUser)
    setIsCreator(isUserCreator)
  }, [actualPresentation, currentUser])

  useEffect(() => {
    const isUserEditor = checkIfEditor(actualPresentation, currentUser, isCreator)
    setIsEditor(isUserEditor)
  }, [actualPresentation, currentUser, isCreator])

  const handleSetCurrentSlide = (id: string) => {
    const slide = actualPresentation?.slides.find(slide => slide._id === id)
    if (slide) setCurrentSlide(slide)
  }

  return {
    actualPresentation,
    currentSlide,
    isCreator,
    isEditor,
    handleSetCurrentSlide,
  }
}
