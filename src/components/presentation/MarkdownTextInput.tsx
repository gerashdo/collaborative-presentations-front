import { useState } from "react"
import { Button } from "../shared/Button"

interface MarkdownTextInputProps {
  onSubmitText: (text: string) => void
  initialText?: string
  onCancel?: () => void
}

export const MarkdownTextInput = ({onSubmitText, initialText, onCancel}: MarkdownTextInputProps) => {
  const [newText, setNewText] = useState<string>(initialText ||'')

  const handleOnInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
  }

  const handleSaveText = () => {
    if (!newText) return
    onSubmitText(newText)
    setNewText('')
  }

  const handleCancel = () => {
    setNewText('')
    if (onCancel) onCancel()
  }

  return (
    <div className="absolute top-0 left-0 bg-transparent p-4 overflow-hidden rounded-sm z-10 w-full">
      <textarea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onInput={handleOnInput}
        className="block w-full border-2 border-gray-100 p-2 rounded-t-md resize-y overflow-hidden"
        placeholder="Enter markdown text..."
      />
      <div className="flex gap-2 py-2 px-2 w-full bg-gray-100 rounded-b-md">
        <Button
          onClick={handleSaveText}
          level='outline'
          type='button'
          >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          level='secondary'
          type='button'
          >
          Cancel
        </Button>
      </div>
    </div>
  )
}
