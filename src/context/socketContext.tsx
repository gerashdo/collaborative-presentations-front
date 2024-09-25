import { createContext, useEffect, useRef } from "react"
import { Socket } from "socket.io-client"
import { useActualPresentationStateManager } from '../hooks/useActualPresentationStateManager'
import { SlideAddedPayload, SlideElementUpdatedPayload, SlideRemovedPayload, SlideUpdatedPayload, UpdateUserRolePayload, UserJoinedPayload, UserLeftPayload } from "../interfaces/events"
import { SOCKET_EVENTS } from "../constants/events"
import { UserRole } from "../interfaces/users"
import { socket } from "../helpers/socket"
import { SlideElementData, SlideElementRequest } from '../interfaces/api';


type SocketContextType = {
  socket: Socket | null
  connectSocket: () => void
  disconnectSocket: () => void
  joinPresentation: (presentationId: string, userId: string) => void
  leavePresentation: (presentationId: string, userId: string) => void
  updateUserRole: (presentationId: string, userId: string, newRole: UserRole) => void
  addNewSlide: (presentationId: string) => void
  removeSlideFromPresentation: (presentationId: string, slideId: string) => void
  addElementToSlide: (presentationId: string, slideId: string, element: SlideElementRequest) => void
  removeElementFromSlide: (presentationId: string, slideId: string, elementId: string) => void
  updateElementOnSlide: (presentationId: string, slideId: string, elementId: string, element: SlideElementData) => void
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  disconnectSocket: () => {},
  connectSocket: () => {},
  joinPresentation: () => {},
  leavePresentation: () => {},
  updateUserRole: () => {},
  addNewSlide: () => {},
  removeSlideFromPresentation: () => {},
  addElementToSlide: () => {},
  removeElementFromSlide: () => {},
  updateElementOnSlide: () => {},
})

type SocketProviderProps = {
  children: React.ReactNode | React.ReactNode[]
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket>(socket)
  const {
    updateUsersList,
    updateSlidesList,
    updateSlideElements,
    updateSlideElement,
  } = useActualPresentationStateManager()

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
      console.log('USER_JOINED', data)
      updateUsersList(data.presentation.users)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.USER_JOINED)
    }
  }, [updateUsersList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.USER_LEFT, (data: UserLeftPayload) => {
      updateUsersList(data.presentation.users)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.USER_LEFT)
    }
  }, [updateUsersList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.USER_ROLE_UPDATED, (data: UpdateUserRolePayload) => {
      updateUsersList(data.presentation.users)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.USER_ROLE_UPDATED)
    }
  }, [updateUsersList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.SLIDE_ADDED, (data: SlideAddedPayload) => {
      updateSlidesList(data.presentation.slides)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.SLIDE_ADDED)
    }
  }, [updateSlidesList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.SLIDE_REMOVED, (data: SlideRemovedPayload) => {
      updateSlidesList(data.presentation.slides)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.SLIDE_REMOVED)
    }
  }, [updateSlidesList])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.SLIDE_UPDATED, (data: SlideUpdatedPayload) => {
      console.log('SLIDE_UPDATED', data)
      updateSlideElements(data.slide._id, data.slide.elements)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.SLIDE_UPDATED)
    }
  }, [updateSlideElements])

  useEffect(() => {
    const socketValue = socketRef.current
    socketRef.current.on(SOCKET_EVENTS.SLIDE_ELEMENT_UPDATED, (data: SlideElementUpdatedPayload) => {
      updateSlideElement(data.slideId, data.element._id, data.element)
    })
    return () => {
      socketValue.off(SOCKET_EVENTS.SLIDE_ELEMENT_UPDATED)
    }
  }, [updateSlideElement])

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

  const updateUserRole = (presentationId: string, userId: string, role: UserRole) => {
    if (!socket) return
    console.log('updateUserRoleSocket', presentationId, userId, role)
    socket.emit(SOCKET_EVENTS.UPDATE_USER_ROLE, { presentationId, userId, role })
  }

  const addNewSlide = (presentationId: string) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.ADD_SLIDE, { presentationId })
  }

  const removeSlideFromPresentation = (presentationId: string, slideId: string) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.REMOVE_SLIDE, { presentationId, slideId })
  }

  const addElementToSlide = (presentationId: string, slideId: string, element: SlideElementRequest) => {
    if (!socket) return
    console.log('addElementToSlide', presentationId, slideId, element)
    socket.emit(SOCKET_EVENTS.ADD_ELEMENT_TO_SLIDE, { presentationId, slideId, element })
  }

  const removeElementFromSlide = (presentationId: string, slideId: string, elementId: string) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.REMOVE_ELEMENT_FROM_SLIDE, { presentationId, slideId, elementId })
  }

  const updateElementOnSlide = (presentationId: string, slideId: string, elementId: string, element: SlideElementData) => {
    if (!socket) return
    socket.emit(SOCKET_EVENTS.UPDATE_SLIDE_ELEMENT, { presentationId, slideId, elementId, element })
  }

  return (
    <SocketContext.Provider value={{
      socket: socketRef.current,
      connectSocket,
      disconnectSocket,
      joinPresentation,
      leavePresentation,
      updateUserRole,
      addNewSlide,
      removeSlideFromPresentation,
      addElementToSlide,
      removeElementFromSlide,
      updateElementOnSlide,
    }}>
      {children}
    </SocketContext.Provider>
  )
}
