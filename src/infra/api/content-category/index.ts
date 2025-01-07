import requester from '../requester'
import { CONTENTCATEGORY } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'
import { IFListboxContentCategoryApi, IFDataContentCategory, IFPagingContentCategoryApi } from '@src/domain/models/IContentCategory'
import { IFSort } from '@src/domain/interfaces/ISort'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const contentCategoryApi = {
  getPagingApi: (params: IFPagingContentCategoryApi) => requester.get(CONTENTCATEGORY.URL_API.GET_DATA_API, params, config),
  getListBoxApi: (params: IFListboxContentCategoryApi) => requester.get(CONTENTCATEGORY.URL_API.GET_LISTBOX_API, params, config),
  addApi: (params: IFDataContentCategory) => requester.post(CONTENTCATEGORY.URL_API.ADD_API, params, config),
  editApi: (params: IFDataContentCategory) => requester.put(CONTENTCATEGORY.URL_API.EDIT_API, params, config),
  sortApi: (params: IFSort) => requester.put(CONTENTCATEGORY.URL_API.SORT_API, params, config),
  deleteApi: (id: string) => requester.delete(`${CONTENTCATEGORY.URL_API.DELETE_API}/${id}`, {}, config),
  getApi: (id: string) => requester.get(`${CONTENTCATEGORY.URL_API.GET_CONTENTCATEGORY_API}/${id}`, {}, config),
  getParentApi: (id: string) => requester.get(`${CONTENTCATEGORY.URL_API.GET_PARENT_API}/${id}`, {}, config)

}

export default { contentCategoryApi }
