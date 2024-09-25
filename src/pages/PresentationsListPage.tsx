import { useContext } from 'react'
import { useLocation } from 'wouter'
import { Icon } from '@iconify/react'
import { Button } from '../components/shared/Button'
import { Pagination } from '../components/shared/Pagination'
import { PresentationsNavbar } from '../components/presentations/PresentationsNavbar'
import { PresentationListItem } from '../components/presentations/PresentationListItem'
import { Modal } from '../components/shared/Modal'
import { NewPresentationForm } from '../components/presentations/NewPresentationForm'
import { SmallButtonIcon } from '../components/shared/SmallButtonIcon'
import { AuthContext } from '../context/authContext'
import { useGetPresentations } from '../hooks/useGetPresentations'
import { useModal } from '../hooks/useModal'
import { useCreatePresentation } from '../hooks/useCreatePresentation'
import { getPresentationRoute } from '../helpers/getRoutes'
import { useUiPresentationsState } from '../hooks/useUiPresentationsState'


export const PresentationsListPage = () => {
  const {user, logoutAction} = useContext(AuthContext)
  const [, setLocation] = useLocation()
  const {currentPage, setCurrentPage} = useUiPresentationsState()
  const {isModalOpen, openModal, closeModal} = useModal()
  const {createPresentation} = useCreatePresentation()
  const itemsPerPage = 10
  const {data, isError, isLoading} = useGetPresentations(Number(currentPage), itemsPerPage)
  const totalPages = data?.meta.totalPages || 1

  const handleCreatePresentation = () => {
    openModal()
  }

  const handleSubmitNewPresentation = async (presentationName: string) => {
    await createPresentation({title: presentationName, creatorId: user?._id || ''})
    closeModal()
  }

  const handleJoinPresentation = (id: string) => {
    const presentationRoute = getPresentationRoute(id)
    setLocation(presentationRoute)
  }

  const onNextPage = () => {
    setCurrentPage((Number(currentPage) + 1, totalPages).toString())
  }

  const onPreviousPage = () => {
    setCurrentPage((Math.max(Number(currentPage) - 1, 1)).toString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PresentationsNavbar user={user || undefined} onLogout={logoutAction} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-row-reverse items-center mb-6">
            <Button
              onClick={handleCreatePresentation}
              level='primary'
              type='button'
            >
              <Icon icon="mdi:plus" />
              Create New
            </Button>
          </div>
          {
            !isLoading && !isError && data && (
              <>
                <ul className="divide-y divide-gray-200">
                  {data.data
                    .map(presentation => (
                      <PresentationListItem
                        key={presentation._id}
                        presentation={presentation}
                        onJoinPresentation={handleJoinPresentation}
                      />
                    ))}
                </ul>
                <Pagination
                  currentPage={Number(currentPage)}
                  totalPages={totalPages}
                  onNextPage={onNextPage}
                  onPreviousPage={onPreviousPage}
                />
              </>
            )
          }
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Create new presentation</h3>
            <SmallButtonIcon onClick={closeModal} icon="mdi:close" />
          </div>
          <NewPresentationForm onSubmit={handleSubmitNewPresentation} />
        </Modal>
      )}
    </div>
  )
}
