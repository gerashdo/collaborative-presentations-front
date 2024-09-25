import { Slide } from "../../interfaces/api"
import { SmallButtonIcon } from "../shared/SmallButtonIcon"


interface SlidesSidebarProps {
  slides: Slide[]
  currentSlide: Slide | null
  onSetCurrentSlide: (id: string) => void
  isCreator: boolean
  onDeleteSlide: (id: string) => void
}

export const SlidesSidebar = ({
  slides,
  currentSlide,
  onSetCurrentSlide,
  isCreator,
  onDeleteSlide,
}: SlidesSidebarProps) => {
  return (
    <section className="w-60 p-4 overflow-y-auto">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`p-2 mb-3 bg-white rounded cursor-pointer ${
            slide._id === currentSlide?._id ? 'ring-2 ring-indigo-500' : ''
          }`}
          onClick={() => onSetCurrentSlide(slide._id)}
        >
          <p className="font-semibold text-gray-600">Slide {index + 1}</p>
          {isCreator && (
            <div className="flex flex-row-reverse">
              <SmallButtonIcon
                type="button"
                onClick={() => {
                  onDeleteSlide(slide._id)
                }}
                icon="mdi:trash-can"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
