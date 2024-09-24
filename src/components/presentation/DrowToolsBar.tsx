import { Icon } from "@iconify/react/dist/iconify.js"
import { DROWING_TOOLS } from '../../constants/presetation'


interface DrowToolsBarProps {
  onSelectTool: (tool: DROWING_TOOLS | null) => void
  toolValue: DROWING_TOOLS | null
}

export const DrowToolsBar = ({onSelectTool, toolValue}: DrowToolsBarProps) => {
  // const [selectedColor, setSelectedColor] = useState("#000000")
  const handleSelectTool = (tool: DROWING_TOOLS) => {
    onSelectTool(toolValue === tool ? null : tool)
  }

  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.TEXT)}
        className={`p-2 rounded ${toolValue === DROWING_TOOLS.TEXT ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="iconamoon:type" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.RECTANGLE)}
        className={`p-2 rounded ${toolValue === DROWING_TOOLS.RECTANGLE ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:square-outline" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.CIRCLE)}
        className={`p-2 rounded ${toolValue === DROWING_TOOLS.CIRCLE ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:circle-outline" />
      </button>
      <button
        onClick={() => handleSelectTool(DROWING_TOOLS.ARROW)}
        className={`p-2 rounded ${toolValue === DROWING_TOOLS.ARROW ? 'bg-indigo-500 text-white' : 'bg-white'}`}
      >
        <Icon icon="mdi:arrow-top-right" />
      </button>
    </div>
  )
}
