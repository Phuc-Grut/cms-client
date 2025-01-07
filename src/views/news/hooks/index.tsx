import {
  RootState,
  useAppDispatch,
  useAppSelector
} from "@store/configureStore"

import * as store from "../store"
import * as NewsModel from "@src/domain/models/INews"

export const useNews = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.news)

  const getNewsPagingApi = (params: NewsModel.IPagingQuery) => {
    return dispatch(store.getPagingApi(params))
  }
  const getCategoryList = (params: NewsModel.ICateListView) => {
    return dispatch(store.getCategoryList(params))
  }

  const addNewsApi = (params: NewsModel.IModel) => {
    return dispatch(store.addApi(params))
  }

  const editNewsApi = (params: NewsModel.IModel) => {
    return dispatch(store.editApi(params))
  }

  const deleteNewsApi = (id: string) => {
    return dispatch(store.deleteApi(id))
  }
  const getNewsByIdApi = (id: string) => {
    return dispatch(store.getByIdApi(id))
  }
  const duplicateNewsApi = (params: NewsModel.IDuplicateQuery) => {
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
    getNewsPagingApi,
    getCategoryList,
    addNewsApi,
    editNewsApi,
    deleteNewsApi,
    getNewsByIdApi,
    duplicateNewsApi
  }
}
