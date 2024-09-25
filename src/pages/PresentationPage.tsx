import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { PresentationNavbar } from '../components/presentation/PresentationNavbar'
import { ConnectedUsersSidebar } from '../components/presentation/ConnectedUsersSidebar'
import { SlidesSidebar } from '../components/presentation/SlidesSidebar'
import { DrowToolsBar } from '../components/presentation/DrowToolsBar'
import { PresentationEditor } from '../components/presentation/PresentationEditor'
import { Loader } from '../components/shared/Loader'
import { AuthContext } from '../context/authContext'
import { SocketContext } from '../context/socketContext'
import { useGetPresentation } from '../hooks/useGetPresentation'
import { useActualPresentationState } from '../hooks/useActualPresentationState'
import { useDisplayToastMessage } from '../hooks/useDisplayToast'
import { UserRole } from '../interfaces/users'
import { SlideElementData, SlideElementRequest } from '../interfaces/api'
import { ROUTES } from '../constants/routes'
import { DROWING_TOOLS } from '../constants/presetation'


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
    updateUserRole,
    addNewSlide,
    removeSlideFromPresentation,
    addElementToSlide,
    removeElementFromSlide,
    updateElementOnSlide,
  } = useContext(SocketContext)
  const [selectedTool, setSelectedTool] = useState<DROWING_TOOLS | null>(null)
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
  }, []) // eslint-disable-line

  if (isLoading) {
    return <Loader/>
  }

  const handleBack = () => {
    setLocation(ROUTES.PRESENTATION_LIST)
  }

  const handleAddSlide = () => {
    if (!actualPresentation) return
    addNewSlide(actualPresentation._id)
  }

  const handleDeleteSlide = (id: string) => {
    if (!actualPresentation) return
    removeSlideFromPresentation(actualPresentation._id, id)
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

  const handleSelectTool = (tool: DROWING_TOOLS | null) => {
    setSelectedTool(tool)
  }

  const handleAddElementToSlide = (slideId: string, newElement: SlideElementRequest) => {
    if (!actualPresentation) return
    console.log('Submit change:', slideId, newElement)
    addElementToSlide(actualPresentation._id, slideId, newElement)
    setSelectedTool(null)
  }

  const handleRemoveElementFromSlide = (slideId: string, elementId: string) => {
    if (!actualPresentation) return
    removeElementFromSlide(actualPresentation._id, slideId, elementId)
  }

  const handleUpdateElementOnSlide = (slideId: string, elementId: string, newElement: SlideElementData) => {
    if (!actualPresentation) return
    updateElementOnSlide(actualPresentation._id, slideId, elementId, newElement)
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
              <DrowToolsBar onSelectTool={handleSelectTool} toolValue={selectedTool} />
            )}
            <PresentationEditor
              currentSlide={currentSlide}
              currentTool={selectedTool}
              onAddElement={handleAddElementToSlide}
              onRemoveElement={handleRemoveElementFromSlide}
              onEditSlideElement={handleUpdateElementOnSlide}
            />
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
