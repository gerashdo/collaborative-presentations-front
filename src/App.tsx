import { MainRouter } from './routers/MainRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/authContext'
import { SocketProvider } from './context/socketContext'
import './App.css'


const queryClient = new QueryClient()

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <MainRouter />
          </SocketProvider>
          <Toaster position='top-right' />
        </AuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
