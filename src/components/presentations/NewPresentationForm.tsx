import { useState } from "react"
import { Button } from "../shared/Button"
import { Input } from "../shared/Input"


interface NewPresentationFormProps {
  onSubmit: (name: string) => void
}

export const NewPresentationForm = ({onSubmit}: NewPresentationFormProps) => {
  const [newPresentationName, setNewPresentationName] = useState('')
  const handleSubmitNewPresentation = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newPresentationName)
  }

  return (
    <form onSubmit={handleSubmitNewPresentation}>
      <div className="mb-4">
        <Input
          type="text"
          id="presentationName"
          value={newPresentationName}
          onChange={(e) => setNewPresentationName(e.target.value)}
          placeholder="Enter name for the presentation"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          level="primary"
        >
          Create
        </Button>
      </div>
    </form>
  )
}
