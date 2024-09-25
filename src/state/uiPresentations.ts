import { atom } from "recoil"

interface UIPresentations {
  currentPage: string
}

export const uiPresentationsState = atom<UIPresentations>({
  key: 'uiPresentations',
  default: {
    currentPage: '1'
  }
})
