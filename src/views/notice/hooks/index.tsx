import {
  RootState,
  useAppDispatch,
  useAppSelector
} from "@store/configureStore"

import * as store from "../store"
import * as NoticeModel from "@src/domain/models/INotice"

export const useNotice = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.notice)

  const getNoticePagingApi = (params: NoticeModel.IPagingQuery) => {
    return dispatch(store.getPagingApi(params))
  }
  const getCategoryList = (params: NoticeModel.ICateListView) => {
    return dispatch(store.getCategoryList(params))
  }

  const addNoticeApi = (params: NoticeModel.IModel) => {
    return dispatch(store.addApi(params))
  }

  const editNoticeApi = (params: NoticeModel.IModel) => {
    return dispatch(store.editApi(params))
  }

  const deleteNoticeApi = (id: string) => {
    return dispatch(store.deleteApi(id))
  }
  const getNoticeByIdApi = (id: string) => {
    return dispatch(store.getByIdApi(id))
  }
  const duplicateNoticeApi = (params: NoticeModel.IDuplicateQuery) => {
    return dispatch(store.duplicateApi(params))
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getNoticePagingApi,
    getCategoryList,
    addNoticeApi,
    editNoticeApi,
    deleteNoticeApi,
    getNoticeByIdApi,
    duplicateNoticeApi
  }
}
