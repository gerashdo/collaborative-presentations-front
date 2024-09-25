import { marked } from "marked"
import { Slide, SlideElementData, SlideElementRequest } from "../interfaces/api";
import { DROWING_TOOLS, SHAPE_COLORS, SlideElementTypes } from "../constants/presetation";


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

export const createShapeElement = (tool: DROWING_TOOLS): SlideElementRequest | null => {
  switch (tool) {
    case DROWING_TOOLS.RECTANGLE:
      return { type: SlideElementTypes.RECT, x: 100, y: 100, draggable: true, color: SHAPE_COLORS.RED }
    case DROWING_TOOLS.CIRCLE:
      return { type: SlideElementTypes.CIRCLE, x: 150, y: 150, draggable: true, color: SHAPE_COLORS.BLUE }
    case DROWING_TOOLS.ARROW:
      return { type: SlideElementTypes.ARROW, x: 200, y: 200, draggable: true, color: SHAPE_COLORS.GREEN }
    default:
      return null
  }
}
