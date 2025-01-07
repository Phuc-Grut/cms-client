import requester from '../requester'
import { NEWS } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import * as NewsModel from '@src/domain/models/INews'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const newsApi = {
  getPagingApi: (params: NewsModel.IPagingQuery) => requester.get(NEWS.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: NewsModel.IListBoxQuery) => requester.get(NEWS.URL_API.GET_LIST_API, params, config),
  getCategoryList: (params: any) => requester.get(NEWS.URL_API.GET_CATE, params, config),
  addApi: (params: NewsModel.IModel) => requester.post(NEWS.URL_API.ADD_API, params, config),
  editApi: (params: NewsModel.IModel) => requester.put(NEWS.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${NEWS.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${NEWS.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: NewsModel.IDuplicateQuery) => requester.post(NEWS.URL_API.DUPLICATE_API, params, config)

}

export default { newsApi }
