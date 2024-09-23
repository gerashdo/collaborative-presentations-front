import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { actualPresentationState } from "../state/actualPresentation"
import { GetPresentationData, Slide } from "../interfaces/api"
import { LocalStorageUser } from "../interfaces/users"
import { isUserEditor } from "../helpers/users"


export const useActualPresentationState = (
  presentation: GetPresentationData | null,
  currentUser: LocalStorageUser | null
) => {
  const [actualPresentation, setActualPresentation] = useRecoilState(actualPresentationState)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    if (presentation) {
      setActualPresentation(presentation)
    }
  },[presentation, setActualPresentation])

  useEffect(() => {
    if (!actualPresentation) return
    if (actualPresentation.slides.length === 0) return
    setCurrentSlide(actualPresentation.slides[0])
  }, [actualPresentation])

  useEffect(() => {
    if (!actualPresentation) return
    if (!currentUser) return
    if (actualPresentation.creator._id === currentUser._id) setIsCreator(true)
  }, [actualPresentation, currentUser])

  useEffect(() => {
    if (!actualPresentation) return
    if (!currentUser) return
    if (isCreator) return setIsEditor(true)
    const isEditor = isUserEditor(actualPresentation, currentUser)
    setIsEditor(isEditor || false)
  }, [actualPresentation, currentUser, isCreator])

  const handleSetCurrentSlide = (id: string) => {
    if (!actualPresentation) return
    const slide = actualPresentation.slides.find(slide => slide._id === id)
    if (slide) {
      setCurrentSlide(slide)
    }
  }

  return {
    actualPresentation,
    currentSlide,
    isCreator,
    isEditor,
    handleSetCurrentSlide,
  }
}
