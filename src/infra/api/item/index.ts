import requester from '../requester'
import { ITEM } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFDataItem, IFPagingItemApi } from '@src/domain/models/IItem'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const itemApi = {
  getPagingApi: (params: IFPagingItemApi) => requester.get(ITEM.URL_API.GET_DATA_API, params, config),
  getByIdApi: (id: string) => requester.get(`${ITEM.URL_API.GET_ITEM_ID_API}/${id}`, { }, config),
  addApi: (params: IFDataItem) => requester.post(ITEM.URL_API.ADD_ITEM_API, params, config),
  addFolderApi: (params: IFDataItem) => requester.post(ITEM.URL_API.ADD_FOLDER_API, params, config),
  editFolderApi: (params: IFDataItem) => requester.put(ITEM.URL_API.EDIT_FOLDER_API, params, config),
  editApi: (params: IFDataItem) => requester.put(ITEM.URL_API.EDIT_ITEM_API, params, config),
  deleteApi: (id: string) => requester.delete(`${ITEM.URL_API.DELETE_ITEM_API}/${id}`, {}, config),
  getParentApi: (id: string) => requester.get(`${ITEM.URL_API.GET_PARENT_API}/${id}`, {}, config)
}

export default { itemApi }
