import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPresentationRequest } from "../api/presentations"
import { PostPresentationRequest } from "../interfaces/api"
import { useLocation } from "wouter"
import { getPresentationRoute } from "../helpers/getRoutes"

//TODO: Get current page to invalid query cache

export const useCreatePresentation = () => {
  const [, setLocation ] = useLocation()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPresentationRequest,
    onSuccess: (data) => {
      console.log('Presentation created successfully', data.data.data._id)
      queryClient.invalidateQueries({queryKey: ['presentations']})
      const route = getPresentationRoute(data.data.data._id)
      setLocation(route)
    },
    onError: (error) => {
      console.error('Error creating presentation')
      console.error(error)
    }
  })

  const createPresentation = async (data: PostPresentationRequest) => {
    mutation.mutate(data)
  }

  return { createPresentation }
}
