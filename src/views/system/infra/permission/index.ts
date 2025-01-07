// import requester from '../requester'
import {PERMISSION} from "@src/views/system/domain/constants"
import requester from "@src/infra/api/requester"
import { AxiosRequestConfig } from 'axios'
import {getToken} from "@src/infra/api/auth"
import {IFDataGetPagingIdentityToAddApi, IFDataGetPermissionGroupUserApi, IFDataGetPermissionInfoApi, IFDataGetPermissionUserApi, IFDataPermissionGroupUserApi, IFDataPermissionUserApi} from "@src/views/system/domain/models/IPermissions"


const { URL_API } = PERMISSION

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const permissionApi = {
  getTreePermissionApi: () => requester.get(`${URL_API.GET_TREE_PERMISSION_API}`, { }, config),
  getTreeResourcePermissionApi: (params: IFDataGetPermissionInfoApi) => requester.get(`${URL_API.GET_TREE_RESOURCE_PERMISSION_API}/${params.type}`, { }, config),
  getPermissionGroupUserApi: (params: IFDataGetPermissionGroupUserApi) => requester.get(`${URL_API.GET_PERMISSION_GROUP_USER_API}`, params, config),
  getPagingGroupUserByResourceApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_GROUP_USERS_FOR_ADD_API}`, params, config),
  getPagingUserByResourceApi: (params: IFDataGetPagingIdentityToAddApi) => requester.get(`${URL_API.GET_PAGING_USERS_FOR_ADD_API}`, params, config),
  getPermissionFunctionApi: (functionId: string) => requester.get(`${URL_API.GET_PERMISSION_FUNCTION_API}/${functionId}`, {}, config),
  getPermissionUserApi: (params: IFDataGetPermissionUserApi) => requester.get(`${URL_API.GET_PERMISSION_USER_API}`, params, config),
  addPermissonGroupUserApi: (params: IFDataPermissionGroupUserApi) => requester.post(URL_API.ADD_PERMISSION_GROUP_USER_API, params, config),
  deletePermissonGroupUserApi: (id: string) => requester.delete(`${URL_API.DELETE_PERMISSION_GROUP_USER_API}/${id}`, {}, config),
  addPermissonUserApi: (params: IFDataPermissionUserApi) => requester.post(URL_API.ADD_PERMISSION_USER_API, params, config),
  deletePermissonUserApi: (id: string) => requester.delete(`${URL_API.DELETE_PERMISSION_USER_API}/${id}`, {}, config)
}
export default {permissionApi}
