import requester from '../requester'
import { UPGRADE } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import * as UpgradeModel from '@src/domain/models/IUpgrade'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const upgradeApi = {
  getPagingApi: (params: UpgradeModel.IPagingQuery) => requester.get(UPGRADE.URL_API.GET_PAGING_API, params, config),
  getListBoxApi: (params: UpgradeModel.IListBoxQuery) => requester.get(UPGRADE.URL_API.GET_LIST_API, params, config),
  getCategoryList: (params: any) => requester.get(UPGRADE.URL_API.GET_CATE, params, config),
  addApi: (params: UpgradeModel.IModel) => requester.post(UPGRADE.URL_API.ADD_API, params, config),
  editApi: (params: UpgradeModel.IModel) => requester.put(UPGRADE.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${UPGRADE.URL_API.DELETE_API}/${id}`, {}, config),
  getByIdApi: (id: string) => requester.get(`${UPGRADE.URL_API.GET_BY_ID_API}/${id}`, { }, config),
  duplicateApi: (params: UpgradeModel.IDuplicateQuery) => requester.post(UPGRADE.URL_API.DUPLICATE_API, params, config)

}

export default { upgradeApi }
