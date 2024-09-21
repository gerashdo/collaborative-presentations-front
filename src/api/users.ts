import axios from "axios"
import { BASE_URL } from "../constants/api"
import { RegisterUserResponse } from "../interfaces/users"


export const registerUser = async (nickname: string) => {
  const url = `${BASE_URL}/users`
  return axios.post<RegisterUserResponse>(url, { nickname })
}
