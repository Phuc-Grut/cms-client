import requester from '../requester'
import { CONTENTTYPE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFListboxContentTypeApi, IFDataContentType, IFPagingContentTypeApi } from '@src/domain/models/IContentType'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const contentTypeApi = {
  getPagingApi: (params: IFPagingContentTypeApi) => requester.get(CONTENTTYPE.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxContentTypeApi) => requester.get(CONTENTTYPE.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataContentType) => requester.post(CONTENTTYPE.URL_API.ADD_API, params, config),
  editApi: (params: IFDataContentType) => requester.put(CONTENTTYPE.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(CONTENTTYPE.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${CONTENTTYPE.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { contentTypeApi }
