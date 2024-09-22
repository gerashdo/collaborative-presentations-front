import { toast } from "sonner"

type MessageType = 'error' | 'success'

const DEFAULT_DURATION = 10000

export const useDisplayToastMessage = () => {
  const displayMessage = (message: string, type: MessageType, duration?: number) => {
    if (type === 'error') {
      toast.error(message, {
        duration: duration || DEFAULT_DURATION,
        closeButton: true,
      })
      return
    }
    toast.success(message, {
      duration: duration || DEFAULT_DURATION,
      closeButton: true,
    })
  }

  return {
    displayMessage,
  }
}
