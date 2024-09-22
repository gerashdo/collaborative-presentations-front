import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "../shared/Button"
import { LinkButoon } from "../shared/LinkButton"


interface PresentationNavbarProps {
  isCreator: boolean
  handleBack: () => void
  handleAddSlide: () => void
}

export const PresentationNavbar = ({
  isCreator,
  handleBack,
  handleAddSlide,
}: PresentationNavbarProps) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <LinkButoon
        onClick={handleBack}
      >
        <Icon icon="material-symbols:arrow-back" />
        <span>Back to Presentations</span>
      </LinkButoon>
      <div className="flex space-x-4">
        {isCreator && (
          <Button
            onClick={handleAddSlide}
            level="primary"
            type="button"
          >
            <Icon icon="mdi:plus" />
            Add Slide
          </Button>
        )}
        <Button
          level="secondary"
          type="button"
        >
          <Icon icon="material-symbols:download" />
          Export to PDF
        </Button>
      </div>
    </nav>
  )
}
