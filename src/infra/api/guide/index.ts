import requester from '../requester'
import { GUIDE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import * as GuideModel from '@src/domain/models/IGuide'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const guideApi = {
  getPagingApi: (params: GuideModel.IPagingQuery) => requester.get(GUIDE.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: GuideModel.IListBoxQuery) => requester.get(GUIDE.URL_API.GET_LIST_API, params, config),
  getCategoryList: (params: any) => requester.get(GUIDE.URL_API.GET_CATE, params, config),
  addApi: (params: GuideModel.IModel) => requester.post(GUIDE.URL_API.ADD_API, params, config),
  editApi: (params: GuideModel.IModel) => requester.put(GUIDE.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${GUIDE.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${GUIDE.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: GuideModel.IDuplicateQuery) => requester.post(GUIDE.URL_API.DUPLICATE_API, params, config)

}

export default { guideApi }
