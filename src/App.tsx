import { MainRouter } from './routers/MainRouter'
import { AuthProvider } from './context/authContext'
import './App.css'


function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  )
}

export default App
