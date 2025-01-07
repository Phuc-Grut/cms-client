import requester from '../requester'
import { CONTENT } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFResponseListContentApi, IFDataContent, IFPagingApiParams, IFDuplicateContentApi } from '@src/domain/models/IContent'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const contentApi = {
  getPagingApi: (params: IFPagingApiParams) => requester.get(CONTENT.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: IFResponseListContentApi) => requester.get(CONTENT.URL_API.GET_LIST_API, params, config),
  addApi: (params: IFDataContent) => requester.post(CONTENT.URL_API.ADD_API, params, config),
  editApi: (params: IFDataContent) => requester.put(CONTENT.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${CONTENT.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${CONTENT.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: IFDuplicateContentApi) => requester.post(CONTENT.URL_API.DUPLICATE_API, params, config)

}

export default { contentApi }
