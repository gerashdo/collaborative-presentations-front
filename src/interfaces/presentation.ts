import * as yup from 'yup'


export enum AllowedPresentationOrderByFields {
  title = 'title',
  creator = 'creator',
  createdAt = 'createdAt'
}

export const validationSchema = yup.object().shape({
  title: yup.string().required().min(5, 'Title must be at least 5 characters')
})

export type PresentationForm = yup.InferType<typeof validationSchema>
