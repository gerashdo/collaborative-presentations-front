import { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Stage, Layer, Rect, Circle, Arrow, Image } from 'react-konva'
import { MarkdownTextInput } from './MarkdownTextInput'
import { useCanvasResize } from '../../hooks/useCanvasResize'
import { convertMarkdownToHTML, createNewTextElement, createShapeElement, editExistingElement } from '../../helpers/presentation'
import { Slide, SlideElementData, SlideElementRequest } from '../../interfaces/api'
import { DROWING_TOOLS, SlideElementTypes } from '../../constants/presetation'


interface PresentationEditorProps {
  currentSlide: Slide
  currentTool: DROWING_TOOLS | null
  isCurrentUserEditor: boolean
  onAddElement: (slideId: string, element: SlideElementRequest) => void
  onRemoveElement: (slideId: string, elementId: string) => void
  onEditSlideElement: (slideId: string, elementId: string, element: SlideElementData) => void
  onCancelText?: () => void
}

export const PresentationEditor = ({
  currentSlide,
  currentTool,
  isCurrentUserEditor,
  onAddElement,
  onRemoveElement,
  onEditSlideElement,
  onCancelText,
}: PresentationEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const {canvasSize, scale} = useCanvasResize(containerRef)
  const [isEditingText, setIsEditingText] = useState(false)
  const [text, setText] = useState<string>('')
  const [editingElementId, setEditingElementId] = useState<string | null>(null)

  const [images, setImages] = useState<Record<string, HTMLImageElement | null>>({}) // Store images for each text element
  const hiddenDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentTool !== DROWING_TOOLS.TEXT) {
      return setIsEditingText(false)
    }
    setIsEditingText(true)
  }, [currentTool])

  useEffect(() => {
    if (!currentTool || currentTool === DROWING_TOOLS.TEXT) return

    const newElement = createShapeElement(currentTool)
    if (!newElement) return

    console.log('Adding new element:', newElement, currentSlide._id)
    onAddElement(currentSlide._id, newElement)
  }, [currentTool, currentSlide, onAddElement])

  useEffect(() => {
    currentSlide.elements
      .filter((el) => el.type === SlideElementTypes.TEXT)
      .forEach(renderTextElementAsImage)
  }, [currentSlide.elements])

  const handleSaveText = async (text: string) => {
    const html = await convertMarkdownToHTML(text)

    if (isEditingText && editingElementId) {
      const updatedElement = editExistingElement(currentSlide, editingElementId, text, html)
      if (!updatedElement) return
      onEditSlideElement(currentSlide._id, editingElementId, updatedElement)
    } else {
      const newElement = createNewTextElement(text, html)
      onAddElement(currentSlide._id, newElement)
    }

    handleCancelText()
  }

  const handleCancelText = () => {
    setIsEditingText(false)
    setEditingElementId(null)
    setText('')
    if (onCancelText) onCancelText()
  }

  const handleDragEnd = (element: SlideElementData, x: number, y: number) => {
    console.log('Drag end:', element._id, x, y)
    const updatedElement = { ...element, x, y }
    onEditSlideElement(currentSlide._id, element._id, updatedElement)
  }

  const handleDeleteElement = (id: string) => {
    onRemoveElement(currentSlide._id, id)
    console.log('Delete element:', id)
    handleCancelText()
  }

  const handleTextClick = (el: SlideElementData) => {
    setText(el.originalText || '')
    setEditingElementId(el._id)
    setIsEditingText(true)
  }

  const renderTextElementAsImage = async (element: SlideElementData) => {
    if (hiddenDivRef.current) {
      hiddenDivRef.current.innerHTML = element.content || ''
      const canvas = await html2canvas(hiddenDivRef.current, {
        backgroundColor: 'rgba(0,0,0,0)',
      })
      const img = new window.Image()
      img.src = canvas.toDataURL()
      setImages((prevImages) => ({
        ...prevImages,
        [element._id]: img,
      }))
      hiddenDivRef.current.innerHTML = ''
    }
  }

  return (
    <div ref={containerRef} className="bg-white aspect-video shadow-lg relative overflow-hidden">
      {isEditingText && (
        <MarkdownTextInput onSubmitText={handleSaveText} initialText={text} onCancel={handleCancelText} />
      )}

      {/* Hidden div for html2canvas rendering */}
      <div
        ref={hiddenDivRef}
        className='prose p-4 text-xs'
        style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
      />

      <Stage width={canvasSize.width} height={canvasSize.height} scale={{ x: scale, y: scale }}>
        <Layer>
          {currentSlide.elements.map((el) => {
            if (el.type === SlideElementTypes.TEXT && images[el._id]) {
              return (
                <Image
                  key={el._id}
                  x={el.x}
                  y={el.y}
                  image={images[el._id] || undefined} // Render the generated image
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
