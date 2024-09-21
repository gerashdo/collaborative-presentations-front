import { MainRouter } from './routers/MainRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext'
import './App.css'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
