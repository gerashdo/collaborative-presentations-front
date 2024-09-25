import { useRecoilState } from "recoil"
import { uiPresentationsState } from "../state/uiPresentations"


export const useUiPresentationsState = () => {
  const [estate, setState] = useRecoilState(uiPresentationsState)

  const setCurrentPage = (currentPage: string) => {
    setState((prev) => ({
      ...prev,
      currentPage
    }))
  }

  return {
    currentPage: estate.currentPage,
    setCurrentPage
  }
}
