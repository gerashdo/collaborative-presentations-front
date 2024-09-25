import { useEffect, useState } from 'react'

export const useCanvasResize = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)

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
    setCanvasSize({ width: baseWidth * newScale, height: baseHeight * newScale })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [containerRef]) // eslint-disable-line

  return { canvasSize, scale }
}
