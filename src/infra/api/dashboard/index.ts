import requester from '../requester'
import { DASHBOARD } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const dashboardApi = {
  getContentByType: () => requester.get(DASHBOARD.URL_API.GET_CONTENT_BY_TYPE_API, {}, config),
  getTopCategory: () => requester.get(DASHBOARD.URL_API.GET_TOP_CATEGORY_API, {}, config),
  getTopNewContent: () => requester.get(DASHBOARD.URL_API.GET_TOP_NEW_CONTENT_API, {}, config)
}

export default { dashboardApi }
