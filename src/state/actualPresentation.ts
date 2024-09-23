import { atom } from "recoil"
import { GetPresentationData } from "../interfaces/api"


export const actualPresentationState = atom<GetPresentationData | null>({
  key: 'socketState',
  default: null,
})
