import requester from '../requester'
import { GROUPWEBLINK } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFListboxGroupWebLinkApi, IFDataGroupWebLink, IFPagingGroupWebLinkApi, GroupWebLinkSort } from '@src/domain/models/IGroupWebLink'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const groupWebLinkApi = {
  getPagingApi: (params: IFPagingGroupWebLinkApi) => requester.get(GROUPWEBLINK.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxGroupWebLinkApi) => requester.get(GROUPWEBLINK.URL_API.GET_LISTBOX_API, params, config),
  getGroupWebLinkAllApi: () => requester.get(`${GROUPWEBLINK.URL_API.GET_ALL_GROUPWEBLINK}`, {}, config),
  addApi: (params: IFDataGroupWebLink) => requester.post(GROUPWEBLINK.URL_API.ADD_API, params, config),
  editApi: (params: IFDataGroupWebLink) => requester.put(GROUPWEBLINK.URL_API.EDIT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${GROUPWEBLINK.URL_API.DELETE_API}/${id}`, {}, config),
  editGroupWebLinkSortApi: (params: GroupWebLinkSort) => requester.put(`${GROUPWEBLINK.URL_API.GROUPWEBLINK_SORT}`, params, config)
}

export default { groupWebLinkApi }
