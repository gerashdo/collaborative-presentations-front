import { getEnvVariables } from "../helpers/getEnvVariables";

export const BASE_URL = getEnvVariables().VITE_API_URL

export const SOCKET_URL = getEnvVariables().VITE_SOCKET_URL
