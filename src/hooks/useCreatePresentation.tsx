import { useLocation } from "wouter"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useDisplayToastMessage } from "./useDisplayToast"
import { createPresentationRequest } from "../api/presentations"
import { PostPresentationRequest } from "../interfaces/api"
import { getPresentationRoute } from "../helpers/getRoutes"
import { getCreatePresentationError } from "../helpers/parseResponseErrorMessage"

//TODO: Get current page to invalid query cache

export const useCreatePresentation = () => {
  const [, setLocation ] = useLocation()
  const queryClient = useQueryClient()
  const {displayMessage} = useDisplayToastMessage()
  const mutation = useMutation({
    mutationFn: createPresentationRequest,
    onSuccess: (data) => {
      console.log('Presentation created successfully', data.data.data._id)
      queryClient.invalidateQueries({queryKey: ['presentations']})
      const route = getPresentationRoute(data.data.data._id)
      setLocation(route)
    },
    onError: (error: AxiosError) => {
      const errorMessage = getCreatePresentationError(error.response?.status || 500)
      displayMessage(errorMessage, 'error')
    }
  })

  const createPresentation = async (data: PostPresentationRequest) => {
    mutation.mutate(data)
  }

  return { createPresentation }
}
