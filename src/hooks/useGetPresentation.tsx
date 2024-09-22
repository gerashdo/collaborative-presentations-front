import { useQuery } from "@tanstack/react-query"
import { getPresentation } from "../api/presentations"


export const useGetPresentation = (id?: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["presentation", id],
    queryFn: () => getPresentation(id || ""),
    enabled: !!id,
  })

  return { data: data?.data, isError, isLoading }
}
