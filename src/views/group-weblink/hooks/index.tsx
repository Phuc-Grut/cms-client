import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as groupWebLinkStore from '../store'

import {
  IFListboxGroupWebLinkApi,
  IFDataGroupWebLink,
  GroupWebLinkSort
} from '@src/domain/models/IGroupWebLink'
import { IFPagingWebLinkApi } from '@src/domain/models/IWebLink'

export const useGroupWebLink = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.groupWebLink)

  const getGroupWebLinkPagingApi = (params: IFPagingWebLinkApi) => {
    return dispatch(groupWebLinkStore.getPagingApi(params))
  }

  // const getGroupWebLinkByIdApi = (id: string) => {
  //   return dispatch(groupWebLinkStore.getByIdApi(id))
  // }

  const getListGroupWebLinkApi = (params: IFListboxGroupWebLinkApi) => {
    return dispatch(groupWebLinkStore.getListBoxApi(params))
  }

  const addGroupWebLinkApi = (params: IFDataGroupWebLink) => {
    return dispatch(groupWebLinkStore.addApi(params))
  }

  const editGroupWebLinkApi = (params: IFDataGroupWebLink) => {
    return dispatch(groupWebLinkStore.editApi(params))
  }

  const deleteGroupWebLinkApi = (id: string) => {
    return dispatch(groupWebLinkStore.deleteApi(id))
  }
  const updateDataSortApi = (params: GroupWebLinkSort) => {
    return dispatch(groupWebLinkStore.update_sort(params))
  }
  const getAllApi = () => {
    return dispatch(groupWebLinkStore.get_all())
  }
  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getGroupWebLinkPagingApi,
    getAllApi,
    getListGroupWebLinkApi,
    addGroupWebLinkApi,
    editGroupWebLinkApi,
    deleteGroupWebLinkApi,
    updateDataSortApi
  }
}
