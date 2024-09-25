import { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Rect, Circle, Arrow } from 'react-konva'
import { MarkdownTextInput } from './MarkdownTextInput'
import { useCanvasResize } from '../../hooks/useCanvasResize'
import { convertMarkdownToHTML, createNewTextElement, createShapeElement, editExistingElement } from '../../helpers/presentation'
import { Slide, SlideElementData, SlideElementRequest } from '../../interfaces/api'
import { DROWING_TOOLS, SlideElementTypes } from '../../constants/presetation'


interface PresentationEditorProps {
  currentSlide: Slide | null
  currentTool: DROWING_TOOLS | null
  isCurrentUserEditor: boolean
  onAddElement: (slideId: string, element: SlideElementRequest) => void
  onRemoveElement: (slideId: string, elementId: string) => void
  onEditSlideElement: (slideId: string, elementId: string, element: SlideElementData) => void
}

export const PresentationEditor = ({
  currentSlide,
  currentTool,
  isCurrentUserEditor,
  onAddElement,
  onRemoveElement,
  onEditSlideElement,
}: PresentationEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const {canvasSize, scale} = useCanvasResize(containerRef)
  const [isEditingText, setIsEditingText] = useState(false)
  const [text, setText] = useState<string>('')
  const [editingElementId, setEditingElementId] = useState<string | null>(null)

  useEffect(() => {
    if (currentTool !== DROWING_TOOLS.TEXT) {
      return setIsEditingText(false)
    }
    setIsEditingText(true)
  }, [currentTool])

  useEffect(() => {
    if (!currentTool || !currentSlide || currentTool === DROWING_TOOLS.TEXT) return

    const newElement = createShapeElement(currentTool)
    if (!newElement) return

    console.log('Adding new element:', newElement, currentSlide._id)
    onAddElement(currentSlide._id, newElement)
  }, [currentTool, currentSlide, onAddElement])

  const handleSaveText = async (text: string) => {
    if (!currentSlide) return
    const html = await convertMarkdownToHTML(text)

    if (isEditingText && editingElementId) {
      const updatedElement = editExistingElement(currentSlide, editingElementId, text, html)
      if (!updatedElement) return
      onEditSlideElement(currentSlide._id, editingElementId, updatedElement)
    } else {
      const newElement = createNewTextElement(text, html)
      onAddElement(currentSlide._id, newElement)
    }

    setIsEditingText(false)
    setEditingElementId(null)
    setText('')
  }

  const handleDragEnd = (element: SlideElementData, x: number, y: number) => {
    console.log('Drag end:', element._id, x, y)
    if (!currentSlide) return
    const updatedElement = { ...element, x, y }
    onEditSlideElement(currentSlide._id, element._id, updatedElement)
  }

  const handleDeleteElement = (id: string) => {
    if (!currentSlide) return
    onRemoveElement(currentSlide._id, id)
    console.log('Delete element:', id)
    setIsEditingText(false)
    setEditingElementId(null)
    setText('')
  }

  const handleTextClick = (el: SlideElementData) => {
    setText(el.originalText || '')
    setEditingElementId(el._id)
    setIsEditingText(true)
  }

  return (
    <div ref={containerRef} className="bg-white aspect-video shadow-lg relative overflow-hidden">
      {isEditingText && (
        <MarkdownTextInput onSubmitText={handleSaveText} initialText={text} />
      )}
      <Stage width={canvasSize.width} height={canvasSize.height} scale={{ x: scale, y: scale }}>
        <Layer>
          {currentSlide?.elements.map((el) => {
            if (el.type === SlideElementTypes.TEXT) {
              return (
                <Text
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  text={el.content || ''}
                  draggable={isCurrentUserEditor ? el.draggable : false}
                  onDragEnd={(e) => handleDragEnd(el, e.target.x(), e.target.y())}
                  onClick={() => handleTextClick(el)}
                  onDblClick={() => handleDeleteElement(el._id)}
                />
              )
            } else if (el.type === SlideElementTypes.RECT) {
              return (
                <Rect
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  fill={el.color}
                  width={100}
                  height={100}
                  draggable={isCurrentUserEditor ? el.draggable : false}
                  onDragEnd={(e) => handleDragEnd(el, e.target.x(), e.target.y())}
                  onDblClick={() => handleDeleteElement(el._id)}
                />
              )
            } else if (el.type === SlideElementTypes.CIRCLE) {
              return (
                <Circle
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  fill={el.color}
                  radius={50}
                  draggable={isCurrentUserEditor ? el.draggable : false}
                  onDragEnd={(e) => handleDragEnd(el, e.target.x(), e.target.y())}
                  onDblClick={() => handleDeleteElement(el._id)}
                />
              )
            } else if (el.type === SlideElementTypes.ARROW) {
              return (
                <Arrow
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  points={[0, 0, 100, 100]}
                  fill={el.color}
                  stroke={el.color}
                  draggable={isCurrentUserEditor ? el.draggable : false}
                  onDragEnd={(e) => handleDragEnd(el, e.target.x(), e.target.y())}
                  onDblClick={() => handleDeleteElement(el._id)}
                />
              )
            }
            return null
          })}
        </Layer>
      </Stage>
    </div>
  )
}
