import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"


interface DrowToolsBarProps {
  onSelectTool: (tool: string) => void
}

export const DrowToolsBar = ({onSelectTool}: DrowToolsBarProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  // const [selectedColor, setSelectedColor] = useState("#000000")

  const handleSelectTool = (tool: string) => {
    setSelectedTool(tool)
    onSelectTool(tool)
  }

  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => handleSelectTool('text')}
        className={`p-2 rounded ${selectedTool === 'text' ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="iconamoon:type" />
      </button>
      <button
        onClick={() => handleSelectTool('rectangle')}
        className={`p-2 rounded ${selectedTool === 'rectangle' ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:square-outline" />
      </button>
      <button
        onClick={() => handleSelectTool('circle')}
        className={`p-2 rounded ${selectedTool === 'circle' ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:circle-outline" />
      </button>
      <button
        onClick={() => handleSelectTool('arrow')}
        className={`p-2 rounded ${selectedTool === 'arrow' ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:arrow-top-right" />
      </button>
    </div>
  )
}