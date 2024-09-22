import { SmallButtonIcon } from "../shared/SmallButtonIcon"


interface SlidesSidebarProps {
  slides: any[]
  currentSlide: number
  setCurrentSlide: (index: number) => void
  isCreator: boolean
  handleDeleteSlide: (index: number) => void
}

export const SlidesSidebar = ({
  slides,
  currentSlide,
  setCurrentSlide,
  isCreator,
  handleDeleteSlide,
}: SlidesSidebarProps) => {
  return (
    <section className="w-64 bg-gray-200 p-4 overflow-y-auto">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`p-2 mb-2 bg-white rounded cursor-pointer ${
            index === currentSlide ? 'ring-2 ring-indigo-500' : ''
          }`}
          onClick={() => setCurrentSlide(index)}
        >
          <p className="font-bold">Slide {index + 1}</p>
          {isCreator && (
            <div className="flex flex-row-reverse">
              <SmallButtonIcon
                type="button"
                onClick={() => {
                  handleDeleteSlide(index)
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
