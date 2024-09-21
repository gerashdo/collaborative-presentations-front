import { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import { AuthContext } from '../context/authContext'
import { Button } from '../components/shared/Button'
import { Pagination } from '../components/shared/Pagination'
import { PresentationsNavbar } from '../components/presentations/PresentationsNavbar'
import { PresentationListItem } from '../components/presentations/PresentationListItem'
import { Presentation } from '../interfaces/presentation'


// Mock data for presentations
const mockPresentations: Presentation[] = [
  { id: 1, title: "Introduction to React", creator: "Alice", createdAt: "2023-06-01" },
  { id: 2, title: "Advanced TypeScript", creator: "Bob", createdAt: "2023-06-02" },
  { id: 3, title: "UI/UX Best Practices", creator: "Charlie", createdAt: "2023-06-03" },
  { id: 4, title: "Node.js Fundamentals", creator: "David", createdAt: "2023-06-04" },
  { id: 5, title: "GraphQL vs REST", creator: "Eve", createdAt: "2023-06-05" },
]

export const PresentationsListPage = () => {
  const {user, logoutAction} = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockPresentations.length / itemsPerPage)

  const handleCreatePresentation = () => {
    // Implement create presentation logic here
    console.log("Creating new presentation")
  }

  const handleJoinPresentation = (id: number) => {
    // Implement join presentation logic here
    console.log(`Joining presentation ${id}`)
  }

  const onNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const onPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PresentationsNavbar user={user || undefined} onLogout={logoutAction} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">All Presentations</h2>
            <Button
              onClick={handleCreatePresentation}
              level='primary'
              type='button'
            >
              <Icon icon="mdi:plus" />
              Create New
            </Button>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />

          <ul className="divide-y divide-gray-200">
            {mockPresentations
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map(presentation => (
                <PresentationListItem
                  key={presentation.id}
                  presentation={presentation}
                  onJoinPresentation={handleJoinPresentation}
                />
              ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        </div>
      </div>
    </div>
  )
}
