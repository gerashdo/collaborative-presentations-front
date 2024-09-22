import { useState } from 'react'
import { useLocation } from 'wouter'
import { PresentationNavbar } from '../components/presentation/PresentationNavbar'
import { ConnectedUsersSidebar } from '../components/presentation/ConnectedUsersSidebar'
import { SlidesSidebar } from '../components/presentation/SlidesSidebar'
import { DrowToolsBar } from '../components/presentation/DrowToolsBar'
import { ROUTES } from '../constants/routes'
import { UserRole } from '../interfaces/users'


const mockSlides = [
  { id: 1, content: "# Slide 1\n\nThis is the first slide." },
  { id: 2, content: "# Slide 2\n\nThis is the second slide." },
]

const mockUsers = [
  { id: 1, name: "Alice", role: UserRole.CREATOR },
  { id: 2, name: "Bob", role: UserRole.EDITOR },
  { id: 3, name: "Charlie", role: UserRole.VIEWER },
]

export const PresentationPage = () => {
  const [, setLocation] = useLocation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState(mockSlides)
  const [users, setUsers] = useState(mockUsers)
  const [isCreator] = useState(true) // Mock creator status
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const handleBack = () => {
    setLocation(ROUTES.PRESENTATION_LIST)
  }

  const handleAddSlide = () => {
    setSlides([...slides, { id: slides.length + 1, content: "# New Slide" }])
  }

  const handleDeleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index)
    setSlides(newSlides)
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1)
    }
  }

  const handleEditSlide = (index: number, content: string) => {
    const newSlides = [...slides]
    newSlides[index].content = content
    setSlides(newSlides)
  }

  const handleChangeUserRole = (userId: number, newRole: UserRole) => {
    const newUsers = users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    )
    setUsers(newUsers)
  }

  const handleSelectTool = (tool: string) => {
    setSelectedTool(tool === selectedTool ? null : tool)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <PresentationNavbar
        isCreator={isCreator}
        handleBack={handleBack}
        handleAddSlide={handleAddSlide}
      />

      <div className="flex flex-1 overflow-hidden">
        <SlidesSidebar
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isCreator={isCreator}
          handleDeleteSlide={handleDeleteSlide}
        />

        <main className="flex-1 p-4 overflow-auto">
          <DrowToolsBar onSelectTool={handleSelectTool} />
          <div className="bg-white aspect-video shadow-lg p-8">
            {slides[currentSlide] && (
              <textarea
                value={slides[currentSlide].content}
                onChange={(e) => handleEditSlide(currentSlide, e.target.value)}
                className="w-full h-full resize-none border-none focus:outline-none focus:ring-0"
                placeholder="Enter your slide content here..."
              />
            )}
          </div>
        </main>

        <ConnectedUsersSidebar
          users={users}
          isCurrentUserCreator={isCreator}
          onRoleChanged={handleChangeUserRole}
        />
      </div>
    </div>
  )
}
