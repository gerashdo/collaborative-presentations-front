import { useEffect, useState } from "react"
import { Input } from "../components/shared/Input"
import { Button } from "../components/shared/Button"
import { useRegisterUser } from "../hooks/useRegisterUser"

export const RegistrationPage = () => {
  const {register, error: registerError, resetError} = useRegisterUser()
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (registerError) setError(registerError)
  }, [registerError, error])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname.trim().length < 3) {
      setError('Nickname must be at least 3 characters long')
    } else {
      setError('')
      register(nickname)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    if (error){
      setError('')
      resetError()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Let's get started
          </h2>
          <Input
            type="text"
            value={nickname}
            error={error}
            onChange={handleInputChange}
            placeholder="Enter your nickname"
            required
          />
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              onClick={() => {}}
            >
              Enter
            </Button>
          </div>
        </form>
        {/* <p className="mt-8 text-center text-gray-500 text-sm">
          &copy;2023 CollabPresent. All rights reserved.
        </p> */}
      </div>
    </div>
  )
}

