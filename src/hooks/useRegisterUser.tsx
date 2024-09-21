import { AxiosError } from "axios"
import { registerUser } from "../api/users"
import { useContext, useState } from "react"
import { getRegisterError } from "../helpers/parseResponseErrorMessage"
import { AuthContext } from "../context/authContext"


export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const {loginAction} = useContext(AuthContext)

  const register = async (nickname: string) => {
    setIsLoading(true)
    try {
      const { data } = await registerUser(nickname)
      console.log({data})
      loginAction({nickname: data.data.nickname, _id: data.data._id})
    } catch (error: unknown) {
      let message = 'An error occurred, please try again later'
      if (error instanceof AxiosError) {
        message = getRegisterError(error.response?.status || 500)
      }
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetError = () => setError(null)

  return { isLoading, error, register, resetError }
}
