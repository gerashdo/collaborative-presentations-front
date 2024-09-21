import { useQuery } from "@tanstack/react-query"
import { getPresentations } from "../api/presentations"


export const useGetPresentations = (page: number, limit: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['presentations', page],
    queryFn: () => getPresentations(page, limit)
  })

  return { data: data?.data, isLoading, isError }
}
