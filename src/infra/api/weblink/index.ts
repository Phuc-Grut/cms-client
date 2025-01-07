import { IFSort } from '@src/domain/interfaces/ISort'
import requester from '../requester'
import { WEBLINK } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFListboxWebLinkApi, IFDataWebLink, IFPagingWebLinkApi } from '@src/domain/models/IWebLink'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const weblinkApi = {
  getPagingApi: (params: IFPagingWebLinkApi) => requester.get(WEBLINK.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxWebLinkApi) => requester.get(WEBLINK.URL_API.GET_LISTBOX_API, params, config),
  getCbxApi: (params: IFListboxWebLinkApi) => requester.get(WEBLINK.URL_API.GET_CBX_API, params, config),
  addApi: (params: IFDataWebLink) => requester.post(WEBLINK.URL_API.ADD_API, params, config),
  editApi: (params: IFDataWebLink) => requester.put(WEBLINK.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${WEBLINK.URL_API.DELETE_API}/${id}`, {}, config),
  getApi: (id: string) => requester.get(`${WEBLINK.URL_API.GET_WEBLINK_API}/${id}`, {}, config),
  sortApi: (params: IFSort) => requester.put(WEBLINK.URL_API.SORT_API, params, config),
  getParentApi: (id: string) => requester.get(`${WEBLINK.URL_API.GET_PARENT_API}/${id}`, {}, config)
}

export default { weblinkApi }
