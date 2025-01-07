import {
  RootState,
  useAppDispatch,
  useAppSelector
} from "@store/configureStore"

import * as store from "../store"

import * as FAQModel from "@src/domain/models/IFAQ"

export const useFaq = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.faq)

  const getFaqPagingApi = (params: FAQModel.IPagingQuery) => {
    return dispatch(store.getPagingApi(params))
  }
  const getCategoryList = (params: FAQModel.ICateListView) => {
    return dispatch(store.getCategoryList(params))
  }

  const addFaqApi = (params: FAQModel.IModel) => {
    return dispatch(store.addApi(params))
  }

  const editFaqApi = (params: FAQModel.IModel) => {
    return dispatch(store.editApi(params))
  }

  const deleteFaqApi = (id: string) => {
    return dispatch(store.deleteApi(id))
  }
  const getFaqByIdApi = (id: string) => {
    return dispatch(store.getByIdApi(id))
  }
  const duplicateFaqApi = (params: FAQModel.IDuplicateQuery) => {
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
    getFaqPagingApi,
    getCategoryList,
    addFaqApi,
    editFaqApi,
    deleteFaqApi,
    getFaqByIdApi,
    duplicateFaqApi
  }
}
