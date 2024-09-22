import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "../shared/Button"
import { Input } from "../shared/Input"
import { RegisterFormType, registerUserValidationSchema } from "../../interfaces/users"


interface RegisterFormProps {
  onSubmit: (nickname: string) => void
}

export const RegisterForm = ({onSubmit}: RegisterFormProps) => {
  const {register, handleSubmit, formState: {errors}, reset } = useForm<RegisterFormType>({
    resolver: yupResolver(registerUserValidationSchema)
  })

  const onSubmitHandler = (data: RegisterFormType) => {
    onSubmit(data.nickname)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-800">
        Let's get started
      </h2>
      <Input
        type="text"
        id="nickname"
        {...register('nickname')}
        error={errors.nickname?.message}
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
  )
}
