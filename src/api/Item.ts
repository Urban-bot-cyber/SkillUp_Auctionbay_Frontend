import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { ItemType } from 'models/item'
import { CreateUpdateItemFields } from 'hooks/react-hook-form/useCreateUpdateItem'


export const fetchItems= async (pageNumber: number) =>
    apiRequest<undefined,ItemType[]>(
        'get',
        `${apiRoutes.ITEM_PREFIX}?page=${pageNumber}`
    )

export const allItems = async () =>
    apiRequest<undefined, ItemType[]>(
        'get',
        `${apiRoutes.ITEM_PREFIX}`
    )

export const createItem = async (data: CreateUpdateItemFields) =>
    apiRequest<CreateUpdateItemFields, ItemType>(
        'post',
        apiRoutes.ITEM_PREFIX,
        data
    )

export const uploadItemImage = async (formData: FormData, id: string) =>
    apiRequest<FormData, void>(
        'post',
        `${apiRoutes.UPLOAD_ITEM_IMAGE}/${id}`,
        formData
    )

export const deleteItem = async (id: string) =>
    apiRequest<string, ItemType>('delete', `${apiRoutes.ITEM_PREFIX}/${id}`)