import { isUserEditor } from "./users"
import { GetPresentationData, Slide } from "../interfaces/api"
import { LocalStorageUser } from "../interfaces/users"


export const checkIfCreator = (presentation: GetPresentationData | null, currentUser: LocalStorageUser | null): boolean => {
  if (!presentation || !currentUser) return false
  return presentation.creator._id === currentUser._id
}

export const checkIfEditor = (presentation: GetPresentationData | null, currentUser: LocalStorageUser | null, isCreator: boolean): boolean => {
  if (!presentation || !currentUser) return false
  if (isCreator) return true
  return isUserEditor(presentation, currentUser) || false
}

export const findCurrentSlide = (slides: Slide[], currentSlide: Slide | null): Slide | null => {
  if (!currentSlide || slides.length === 0) return slides[0] || null
  return slides.find(slide => slide._id === currentSlide._id) || slides[0]
}
