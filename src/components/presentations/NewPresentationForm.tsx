import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "../shared/Button"
import { Input } from "../shared/Input"
import { PresentationForm, validationSchema } from "../../interfaces/presentation"


interface NewPresentationFormProps {
  onSubmit: (name: string) => void
}

export const NewPresentationForm = ({onSubmit}: NewPresentationFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PresentationForm>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmitHandler = (data: PresentationForm) => {
    onSubmit(data.title)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-4">
        <Input
          type="text"
          id="title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter name for the presentation"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          level="primary"
        >
          Create
        </Button>
      </div>
    </form>
  )
}
