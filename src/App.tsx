import { MainRouter } from './routers/MainRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext'
import './App.css'
import { RecoilRoot } from 'recoil'


const queryClient = new QueryClient()

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
