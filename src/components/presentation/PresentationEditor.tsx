import { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Text, Rect, Circle, Arrow } from 'react-konva'
import { marked } from 'marked'
import { MarkdownTextInput } from './MarkdownTextInput'
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
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)
  const [isEditingText, setIsEditingText] = useState(false)
  const [text, setText] = useState<string>('')
  const [editingElementId, setEditingElementId] = useState<string | null>(null)

  const handleResize = () => {
    const container = containerRef.current
    if (!container) return
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const baseWidth = 1280
    const baseHeight = 720
    const scaleWidth = containerWidth / baseWidth
    const scaleHeight = containerHeight / baseHeight
    const newScale = Math.min(scaleWidth, scaleHeight)
    setScale(newScale)
    setCanvasSize({
      width: baseWidth * newScale,
      height: baseHeight * newScale,
    })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (currentTool !== DROWING_TOOLS.TEXT) {
      return setIsEditingText(false)
    }
    setIsEditingText(true)
  }, [currentTool])

  useEffect(() => {
    const handleAddShape = () => {
      let newElement: SlideElementRequest | null = null
      switch (currentTool) {
        case DROWING_TOOLS.RECTANGLE:
          newElement = {type: SlideElementTypes.RECT, x: 100, y: 100, draggable: true, color: 'red'}
          break
        case DROWING_TOOLS.CIRCLE:
          newElement = {type: SlideElementTypes.CIRCLE, x: 150, y: 150, draggable: true, color: 'blue'}
          break
        case DROWING_TOOLS.ARROW:
          newElement = {type: SlideElementTypes.ARROW, x: 200, y: 200, draggable: true, color: 'green'}
          break
        default:
          break
      }
      if (!newElement) return
      if (!currentSlide) return
      console.log('Adding new element:', newElement, currentSlide._id)
      onAddElement(currentSlide._id || '', newElement)
    }

    if (!currentTool || currentTool == DROWING_TOOLS.TEXT) return
    handleAddShape()
  }, [currentTool, currentSlide, onAddElement])

  const handleSaveText = async (text: string) => {
    const html = await marked(text)
    // let newElement: SlideElementRequest
    // if (editingElementId) {
    //   newElement = {
    //     id: editingElementId,
    //     type: SlideElementTypes.TEXT,
    //     originalText: text,
    //     content: html,
    //     x: 50,
    //     y: 50,
    //     draggable: true,
    //   }
    //   setIsEditingText(false)
    //   setEditingElementId(null)
    //   return
    // }
      // Add a new text element
      const newElement = {
      type: SlideElementTypes.TEXT,
      originalText: text,
      content: html,
      x: 50,
      y: 50,
      draggable: true,
    }
    setText('')
    if (!currentSlide) return
    onAddElement(currentSlide._id, newElement)
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
            if (el.type === 'text') {
              return (
                <Text
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  text={el.content || ''}
                  draggable={isCurrentUserEditor ? el.draggable : false}
                  onDragEnd={(e) => handleDragEnd(el, e.target.x(), e.target.y())}
                  // onClick={() => handleTextClick(el)}
                  onDblClick={() => handleDeleteElement(el._id)}
                />
              )
            } else if (el.type === 'rect') {
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
            } else if (el.type === 'circle') {
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
            } else if (el.type === 'arrow') {
              return (
                <Arrow
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  points={[0, 0, 100, 100]} // just an example, customize it as needed
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
