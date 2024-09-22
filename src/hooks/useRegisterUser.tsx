import { useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useDisplayToastMessage } from "./useDisplayToast"
import { AuthContext } from "../context/authContext"
import { registerUser } from "../api/users"
import { getRegisterError } from "../helpers/parseResponseErrorMessage"


export const useRegisterUser = () => {
  const {loginAction} = useContext(AuthContext)
  const {displayMessage} = useDisplayToastMessage()
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      loginAction({nickname: data.data.data.nickname, _id: data.data.data._id})
    },
    onError: (error: AxiosError) => {
      const errorMessage = getRegisterError(error.response?.status || 500)
      displayMessage(errorMessage, 'error')
    }
  })

  const register = async (nickname: string) => {
    mutation.mutate(nickname)
  }

  return {register}
}
