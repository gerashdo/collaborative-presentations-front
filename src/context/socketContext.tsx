import { createContext, useEffect, useRef } from "react"
import { Socket } from "socket.io-client"
import { useActualPresentationStateManager } from '../hooks/useActualPresentationStateManager'
import { socket } from "../helpers/socket"
import { UserJoinedPayload, UserLeftPayload } from "../interfaces/events"
import { SOCKET_EVENTS } from "../constants/events"


type SocketContextType = {
  socket: Socket | null
  connectSocket: () => void
  disconnectSocket: () => void
  joinPresentation: (presentationId: string, userId: string) => void
  leavePresentation: (presentationId: string, userId: string) => void
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  disconnectSocket: () => {},
  connectSocket: () => {},
  joinPresentation: () => {},
  leavePresentation: () => {}
})

type SocketProviderProps = {
  children: React.ReactNode | React.ReactNode[]
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket>(socket)
  const {updateUsersList} = useActualPresentationStateManager()

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.connect()
    return () => {
      socketValue.disconnect()
    }
  }, [])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.USER_JOINED, (data: UserJoinedPayload) => {
      updateUsersList(data.presentation.users)
    })
    return () => {
      socketValue.off('user_joiner')
    }
  }, [updateUsersList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.USER_LEFT, (data: UserLeftPayload) => {
      updateUsersList(data.presentation.users)
    })
    return () => {
      socketValue.off('user_left')
    }
  }, [updateUsersList])

  const connectSocket = () => {
    if (socketRef.current.connected) return
    socketRef.current.connect()
  }

  const disconnectSocket = () => {
    if (!socketRef.current.connected) return
    socketRef.current.disconnect()
  }

  const joinPresentation = (presentationId: string, userId: string) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.JOIN_PRESENTATION, { presentationId, userId })
  }

  const leavePresentation = (presentationId: string, userId: string) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.LEAVE_PRESENTATION, { presentationId, userId })
  }

  return (
    <SocketContext.Provider value={{
      socket: socketRef.current,
      connectSocket,
      disconnectSocket,
      joinPresentation,
      leavePresentation
    }}>
      {children}
    </SocketContext.Provider>
  )
}
