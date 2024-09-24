import { useState } from "react"
import { Button } from "../shared/Button"

interface MarkdownTextInputProps {
  onSubmitText: (text: string) => void;
}

export const MarkdownTextInput = ({onSubmitText}: MarkdownTextInputProps) => {
  const [newText, setNewText] = useState<string>('')

  const handleOnInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    // Reset the height to 'auto' to shrink it if necessary
    target.style.height = 'auto'
    // Set the height based on the scroll height (content height)
    target.style.height = `${target.scrollHeight}px`
  }

  const handleSaveText = () => {
    if (!newText) return
    onSubmitText(newText)
    setNewText('')
  }

  return (
    <div className="absolute top-0 left-0 bg-transparent p-4 z-10 w-full">
      <textarea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        onInput={handleOnInput}
        className="block border-2 p-2 mb-2 border-dotted rounded-sm resize-x overflow-hidden"
        placeholder="Enter markdown text..."
      />
      <Button
        onClick={handleSaveText}
        level='secondary'
        type='button'
      >
        Save
      </Button>
    </div>
  )
}
