import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { UserType } from 'models/auth'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UpdateUserFields } from 'hooks/react-hook-form/useUpdateUser'
import { UpdateUserPassword } from 'hooks/react-hook-form/useUpdatePassword'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const getUser = async (id: string) =>
  apiRequest<undefined, UserType>('get', `${apiRoutes.USERS_PREFIX}/${id}`)

export const currentUser = async () =>
  apiRequest<undefined, UserType>('get', `${apiRoutes.FETCH_USER}`)

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const singup = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, UserType>('post', apiRoutes.SIGNUP, data)

export const singin = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

export const updateUser = async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `${apiRoutes.USERS_PREFIX}/${id}`,
    data,
  )

export const upadtePassword = async (data: UpdateUserPassword, id: string) =>
  apiRequest<UpdateUserPassword, void>(
    'patch',
    `${apiRoutes.USERS_PREFIX}/password/${id}`,
    data,
  )


export const deleteUser = async (id: string) =>
  apiRequest<string, UserType>('delete', `${apiRoutes.USERS_PREFIX}/${id}`)