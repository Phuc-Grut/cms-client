import requester from '../requester'
import { ITEMPRODUCT } from '@src/domain/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@src/infra/api/auth'

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const itemProductApi = {
  getItemProduct: () => requester.get(ITEMPRODUCT.URL_API.GET_ALL_ITEM_PRODUCT_API, {}, config)
}

export default { itemProductApi }
