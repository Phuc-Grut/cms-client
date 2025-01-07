import requester from "@src/infra/api/requester"
import {USER} from "@src/views/system/domain/constants"

import { AxiosRequestConfig } from 'axios'
import {getToken} from "@src/infra/api/auth"
import {
  IFDataProductUser,
  IFPagingProductUserApi
} from "@src/views/system/domain/models/IUsers"


const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const systemUserApi = {
  getPagingApi: (params: IFPagingProductUserApi) => requester.get(USER.URL_API.GET_PAGING_API, params, config),
  getPagingUserApi: (params: IFPagingProductUserApi) => requester.get(USER.URL_API.GET_USERS_API, params, config),
  addApi: (params: IFDataProductUser) => requester.post(USER.URL_API.ADD_API, params, config),
  editApi: (params: IFDataProductUser) => requester.put(USER.URL_API.UPDATE_API, params, config),
  deleteApi: (id: string) => requester.delete(`${USER.URL_API.DELETE_API}/${id}`, {}, config)
}

export default { systemUserApi }