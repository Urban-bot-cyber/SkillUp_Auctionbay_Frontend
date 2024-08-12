import { UserType } from 'models/auth'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'


export const fetchUser = async () =>
    apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const signout = async () =>
    apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const singup = async (data: RegisterUserFields) =>
    apiRequest<RegisterUserFields, UserType>('post',apiRoutes.SIGNUP, data)

export const singin = async (data: LoginUserFields) =>
    apiRequest<LoginUserFields, UserType>('post',apiRoutes.LOGIN, data)

export const uploadAvatar = async (formData: FormData, id: string) =>
    apiRequest<FormData, void>(
      'post',
      `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
      formData,)