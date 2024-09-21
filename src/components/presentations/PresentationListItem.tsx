import { Presentation } from "../../interfaces/presentation"
import { Button } from "../shared/Button"


interface PresentationListItemProps {
  presentation: Presentation,
  onJoinPresentation: (id: number) => void
}

export const PresentationListItem = ({
  presentation,
  onJoinPresentation
}: PresentationListItemProps) => {
  return (
    <li key={presentation.id} className="py-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{presentation.title}</h3>
          <p className="text-sm text-gray-500">
            Created by {presentation.creator} on {new Date(presentation.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button
          onClick={() => onJoinPresentation(presentation.id)}
          level='outline'
          type='button'
        >
          Join
        </Button>
      </div>
    </li>
  )
}
