import requester from '../requester'
import { FAQ } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import * as FAQModel from '@src/domain/models/IFAQ'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const faqApi = {
  getPagingApi: (params: FAQModel.IPagingQuery) => requester.get(FAQ.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: FAQModel.IListBoxQuery) => requester.get(FAQ.URL_API.GET_LIST_API, params, config),
  getCategoryList: (params: any) => requester.get(FAQ.URL_API.GET_CATE, params, config),
  addApi: (params: FAQModel.IModel) => requester.post(FAQ.URL_API.ADD_API, params, config),
  editApi: (params: FAQModel.IModel) => requester.put(FAQ.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${FAQ.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${FAQ.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: FAQModel.IDuplicateQuery) => requester.post(FAQ.URL_API.DUPLICATE_API, params, config)

}

export default { faqApi }
