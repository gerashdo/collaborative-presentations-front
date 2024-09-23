import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { DROWING_TOOLS } from '../../constants/presetation';


interface DrowToolsBarProps {
  onSelectTool: (tool: DROWING_TOOLS | null) => void
}

export const DrowToolsBar = ({onSelectTool}: DrowToolsBarProps) => {
  const [selectedTool, setSelectedTool] = useState<DROWING_TOOLS | null>(null)
  // const [selectedColor, setSelectedColor] = useState("#000000")

  const handleSelectTool = (tool: DROWING_TOOLS) => {
    setSelectedTool(selectedTool === tool ? null : tool)
    onSelectTool(selectedTool)
  }

  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.TEXT)}
        className={`p-2 rounded ${selectedTool === DROWING_TOOLS.TEXT ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="iconamoon:type" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.RECTANGLE)}
        className={`p-2 rounded ${selectedTool === DROWING_TOOLS.RECTANGLE ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:square-outline" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.CIRCLE)}
        className={`p-2 rounded ${selectedTool === DROWING_TOOLS.CIRCLE ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:circle-outline" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.ARROW)}
        className={`p-2 rounded ${selectedTool === DROWING_TOOLS.ARROW ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:arrow-top-right" />
      </button>
    </div>
  )
}
