import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node'
import { v4 as uuidv4 } from 'uuid'
import { Slide } from '../../interfaces/api'
import html2canvas from 'html2canvas'
import { marked } from 'marked'
import { DROWING_TOOLS } from '../../constants/presetation'
import { MarkdownTextInput } from './MarkdownTextInput'


interface PresentationEditorProps {
  currentSlide: Slide | null
  currentTool: DROWING_TOOLS | null
  onSubmitChange: () => void
}

interface Element {
  id: string
  image: HTMLImageElement
  x: number
  y: number
  draggable: boolean
}

export const PresentationEditor: React.FC<PresentationEditorProps> = ({
  currentSlide,
  currentTool,
  onSubmitChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)
  const [elements, setElements] = useState<Element[]>([])
  const [isEditingText, setIsEditingText] = useState(false)

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    if (currentTool !== DROWING_TOOLS.TEXT) {
      return setIsEditingText(false)
    }
    setIsEditingText(true)
  }, [currentTool])

  const handleSaveText = async (text: string) => {
    const tempDiv = document.createElement("div")
    tempDiv.className = "prose p-4"
    const html = await marked(text)
    document.body.appendChild(tempDiv)
    tempDiv.innerHTML = html

    try {
      setTimeout(async () => {
        const canvas = await html2canvas(tempDiv, {
          backgroundColor: "rgba(0, 0, 0, 0)",
        })

        const imageElement = new window.Image()
        imageElement.src = canvas.toDataURL()
        const newElement = {
          id: uuidv4(),
          image: imageElement,
          x: 50,
          y: 50,
          draggable: true,
        }
        setElements([...elements, newElement])
        document.body.removeChild(tempDiv)
      }, 100)
    } catch (error) {
      console.log({ error })
    }
    setIsEditingText(false)
    onSubmitChange()
  }

  const handleDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>, id: string) => {
    const { x, y } = e.target.position()
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, x, y } : el
    )
    setElements(updatedElements)
  }

  return (
    <div ref={containerRef} className="bg-white aspect-video shadow-lg relative overflow-hidden">
      {isEditingText && <MarkdownTextInput onSubmitText={handleSaveText} />}
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          {elements.map((element) => (
            <Image
              key={element.id}
              x={element.x}
              y={element.y}
              image={element.image}
              draggable={element.draggable}
              onDragEnd={(e) => handleDragEnd(e, element.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
