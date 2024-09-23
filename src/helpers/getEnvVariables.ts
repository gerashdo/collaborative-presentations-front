
export const getEnvVariables = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_BACKEND_URL,
    VITE_SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
  }
}
