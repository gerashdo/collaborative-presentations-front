import { useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "../context/authContext"
import { registerUser } from "../api/users"


export const useRegisterUser = () => {
  const {loginAction} = useContext(AuthContext)
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      loginAction({nickname: data.data.data.nickname, _id: data.data.data._id})
    },
    onError: (error) => {
      console.error('Error creating user')
      console.error(error)
    }
  })

  const register = async (nickname: string) => {
    mutation.mutate(nickname)
  }

  return {register}
}
