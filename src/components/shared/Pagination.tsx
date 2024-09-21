import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "./Button"


interface PaginationProps {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const Pagination = ({
  onNextPage,
  onPreviousPage,
  currentPage,
  totalPages
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        onClick={onPreviousPage}
        level='secondary'
        type='button'
        disabled={currentPage === 1}
      >
        <Icon icon="material-symbols:chevron-left" />
      </Button>
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={onNextPage}
        level='secondary'
        type='button'
        disabled={currentPage === totalPages}
      >
        <Icon icon="material-symbols:chevron-right" />
      </Button>
    </div>
  )
}
