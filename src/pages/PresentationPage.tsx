import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { PresentationNavbar } from '../components/presentation/PresentationNavbar'
import { ConnectedUsersSidebar } from '../components/presentation/ConnectedUsersSidebar'
import { SlidesSidebar } from '../components/presentation/SlidesSidebar'
import { DrowToolsBar } from '../components/presentation/DrowToolsBar'
import { Loader } from '../components/shared/Loader'
import { AuthContext } from '../context/authContext'
import { SocketContext } from '../context/socketContext'
import { useGetPresentation } from '../hooks/useGetPresentation'
import { useActualPresentationState } from '../hooks/useActualPresentationState'
import { useDisplayToastMessage } from '../hooks/useDisplayToast'
import { UserRole } from '../interfaces/users'
import { ROUTES } from '../constants/routes'


export const PresentationPage = () => {
  const { id } = useParams()
  const {user: currentUser} = useContext(AuthContext)
  const [, setLocation] = useLocation()
  const {data, isError, isLoading} = useGetPresentation(id)
  const {
    actualPresentation,
    isCreator,
    isEditor,
    currentSlide,
    handleSetCurrentSlide,
  } = useActualPresentationState(
    data ? data.data : null,
    currentUser,
  )
  const {
    joinPresentation,
    leavePresentation,
    updateUserRole
  } = useContext(SocketContext)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const {displayMessage} = useDisplayToastMessage()

  useEffect(() => {
    if (currentUser && id) {
      console.log('Joining presentation:', id)
      joinPresentation(id, currentUser._id)
    }
    return () => {
      if (currentUser && id) {
        console.log('Leaving presentation:', id)
        leavePresentation(id, currentUser._id)
      }
    }
  }, [])

  if (isLoading) {
    return <Loader/>
  }

  const handleBack = () => {
    setLocation(ROUTES.PRESENTATION_LIST)
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
    if (!actualPresentation) return
    if (actualPresentation.creator._id === userId){
      displayMessage('Cannot change the role of the presentation creator', 'error')
      return
    }
    updateUserRole(actualPresentation._id, userId, newRole)
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

      { !isLoading && !isError && actualPresentation && (
        <div className="flex flex-1 overflow-hidden">
          <SlidesSidebar
            slides={actualPresentation.slides}
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
              users={actualPresentation.users}
              onRoleChanged={handleChangeUserRole}
            />
          )}
        </div>
      )}

    </div>
  )
}
