import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { PresentationNavbar } from '../components/presentation/PresentationNavbar'
import { ConnectedUsersSidebar } from '../components/presentation/ConnectedUsersSidebar'
import { SlidesSidebar } from '../components/presentation/SlidesSidebar'
import { DrowToolsBar } from '../components/presentation/DrowToolsBar'
import { Loader } from '../components/shared/Loader'
import { AuthContext } from '../context/authContext'
import { useGetPresentation } from '../hooks/useGetPresentation'
import { UserRole } from '../interfaces/users'
import { Slide } from '../interfaces/api'
import { ROUTES } from '../constants/routes'


export const PresentationPage = () => {
  const {user: currentUser} = useContext(AuthContext)
  const { id } = useParams()
  const [, setLocation] = useLocation()
  const {data, isError, isLoading} = useGetPresentation(id)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [isEditor, setIsEditor] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    if (data.data.slides.length === 0) return
    setCurrentSlide(data.data.slides[0])
  }, [data])

  useEffect(() => {
    if (!data) return
    if (!currentUser) return
    if (data.data.creator._id === currentUser._id) setIsCreator(true)
  }, [data, currentUser])

  useEffect(() => {
    if (!data) return
    if (!currentUser) return
    if (isCreator) return setIsEditor(true)
    const user = data.data.users.find(user => user._id === currentUser._id)
    if (user && user.role === UserRole.EDITOR) setIsEditor(true)
  }, [data, currentUser, isCreator])

  if (isLoading) {
    return <Loader/>
  }

  const handleBack = () => {
    setLocation(ROUTES.PRESENTATION_LIST)
  }

  const handleSetCurrentSlide = (id: string) => {
    const slide = data?.data.slides.find(slide => slide._id === id)
    if (slide) {
      setCurrentSlide(slide)
    }
  }

  const handleAddSlide = () => {
    console.log('Add slide')
  }

  const handleDeleteSlide = (id: string) => {
    console.log('Delete slide:', id)
  }

  const handleEditSlide = (id: string, content: string) => {
    console.log('edit slide', id, content)
  }

  const handleChangeUserRole = (userId: string, newRole: UserRole) => {
    console.log('Change user role:', userId, newRole)
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

      { !isLoading && !isError && data && (
        <div className="flex flex-1 overflow-hidden">
          <SlidesSidebar
            slides={data.data.slides}
            currentSlide={currentSlide}
            onSetCurrentSlide={handleSetCurrentSlide}
            isCreator={isCreator}
            onDeleteSlide={handleDeleteSlide}
          />

          <main className="flex-1 p-4 overflow-auto">
            {isEditor && (
              <DrowToolsBar onSelectTool={handleSelectTool} />
            )}
            <div className="bg-white aspect-video shadow-lg p-8">
              {currentSlide && (
                <textarea
                  value={currentSlide?.content}
                  onChange={(e) => handleEditSlide(currentSlide._id, e.target.value)}
                  className="w-full h-full resize-none border-none focus:outline-none focus:ring-0"
                  placeholder="Enter your slide content here..."
                />
              )}
            </div>
          </main>

          {isCreator && (
            <ConnectedUsersSidebar
              users={data.data.users}
              onRoleChanged={handleChangeUserRole}
            />
          )}
        </div>
      )}

    </div>
  )
}
