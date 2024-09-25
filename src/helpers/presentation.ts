import { marked } from "marked"
import { Slide, SlideElementData, SlideElementRequest } from "../interfaces/api";
import { SlideElementTypes } from "../constants/presetation";


export const convertMarkdownToHTML = async (markdown: string): Promise<string> => {
  return await marked(markdown)
}

export const editExistingElement = (slide: Slide, elementId: string, text: string, html: string): SlideElementData | null => {
  const elementBeingEdited = slide.elements.find((el) => el._id === elementId)
  if (!elementBeingEdited) return null
  return {
    ...elementBeingEdited,
    content: html,
    originalText: text,
  }
}

export const createNewTextElement = (text: string, html: string): SlideElementRequest => {
  return {
    type: SlideElementTypes.TEXT,
    originalText: text,
    content: html,
    x: 50,
    y: 50,
    draggable: true,
  }
}
