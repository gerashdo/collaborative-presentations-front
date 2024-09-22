import { useRegisterUser } from "../hooks/useRegisterUser"
import { RegisterForm } from "../components/register/RegisterForm"

export const RegistrationPage = () => {
  const {register} = useRegisterUser()

  const handleSubmit = (nickname: string) => {
    register(nickname)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-8 py-6">
        <RegisterForm onSubmit={handleSubmit} />
        {/* <p className="mt-8 text-center text-gray-500 text-sm">
          &copy;2023 CollabPresent. All rights reserved.
        </p> */}
      </div>
    </div>
  )
}

