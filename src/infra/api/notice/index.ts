import requester from '../requester'
import { NOTICE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import * as NoticeModel from '@src/domain/models/INotice'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const noticeApi = {
  getPagingApi: (params: NoticeModel.IPagingQuery) => requester.get(NOTICE.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: NoticeModel.IListBoxQuery) => requester.get(NOTICE.URL_API.GET_LIST_API, params, config),
  getCategoryList: (params: any) => requester.get(NOTICE.URL_API.GET_CATE, params, config),
  addApi: (params: NoticeModel.IModel) => requester.post(NOTICE.URL_API.ADD_API, params, config),
  editApi: (params: NoticeModel.IModel) => requester.put(NOTICE.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${NOTICE.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${NOTICE.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: NoticeModel.IDuplicateQuery) => requester.post(NOTICE.URL_API.DUPLICATE_API, params, config)

}

export default { noticeApi }
