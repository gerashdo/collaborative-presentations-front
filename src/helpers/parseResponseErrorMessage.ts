import { ErrorCode } from "../interfaces/request"


const SignUpCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check your data',
  409: 'Email already in use',
  500: 'There was an error processing your request. Please try again later',
}

const CreatePresentationCodeMessages: Partial<Record<ErrorCode, string>> = {
  400: 'Invalid request, please check your data',
  404: 'Creator not found',
  500: 'There was an error processing your request. Please try again later',
}

export const getRegisterError = (errorCode: number): string => {
  return SignUpCodeMessages[errorCode as ErrorCode] || 'An error occurred, please try again later';
}

export const getCreatePresentationError = (errorCode: number): string => {
  return CreatePresentationCodeMessages[errorCode as ErrorCode] || 'An error occurred, please try again later';
}
