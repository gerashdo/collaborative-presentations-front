import * as yup from 'yup'

export interface RegisterUserResponse {
  data: Data;
}

export interface Data {
  nickname:  string;
  _id:       string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  nickname:  string;
  _id:       string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalStorageUser {
  _id: string
  nickname: string
}

export enum UserRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  CREATOR = 'creator',
}

export const registerUserValidationSchema = yup.object().shape({
  nickname: yup.string().required().min(4, 'Nickname must be at least 4 characters')
})

export type RegisterFormType = yup.InferType<typeof registerUserValidationSchema>
