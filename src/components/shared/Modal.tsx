
interface ModalProps {
  children: React.ReactNode
}

export const Modal = ({children}: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        {children}
      </div>
    </div>
  )
}
