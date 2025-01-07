import { IFSort } from '@src/domain/interfaces/ISort'
import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as weblinkStore from '../store'

import {
  IFListboxWebLinkApi,
  IFDataWebLink,
  IFPagingWebLinkApi
} from '@src/domain/models/IWebLink'

export const useChannelList = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.weblink)

  const getWebLinkPagingApi = (params: IFPagingWebLinkApi) => {
    return dispatch(weblinkStore.getPagingApi(params))
  }

  const getListWebLinkApi = (params: IFListboxWebLinkApi) => {
    return dispatch(weblinkStore.getListBoxApi(params))
  }

  const getCbxWebLinkApi = (params: IFListboxWebLinkApi) => {
    return dispatch(weblinkStore.getCbxApi(params))
  }

  const addWebLinkApi = (params: IFDataWebLink) => {
    return dispatch(weblinkStore.addApi(params))
  }

  const editWebLinkApi = (params: IFDataWebLink) => {
    return dispatch(weblinkStore.editApi(params))
  }

  const deleteWebLinkApi = (id: string) => {
    return dispatch(weblinkStore.deleteApi(id))
  }
  const getByIdApi = (params: string) => {
    return dispatch(weblinkStore.get(params))
  }
  const getParentByIdApi = (params: string) => {
    return dispatch(weblinkStore.getParent(params))
  }
  const sortApi = (params: IFSort) => {
    return dispatch(weblinkStore.sortApi(params))
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getWebLinkPagingApi,
    getCbxWebLinkApi,
    getListWebLinkApi,
    addWebLinkApi,
    editWebLinkApi,
    deleteWebLinkApi,
    getByIdApi,
    sortApi, 
    getParentByIdApi
  }
}
