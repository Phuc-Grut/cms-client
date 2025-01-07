import {
  RootState,
  useAppDispatch,
  useAppSelector
} from "@store/configureStore"

import * as store from "../store"
import * as GuideModel from "@src/domain/models/IGuide"

export const useGuide = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.guide)

  const getGuidePagingApi = (params: GuideModel.IPagingQuery) => {
    return dispatch(store.getPagingApi(params))
  }
  const getCategoryList = (params: GuideModel.ICateListView) => {
    return dispatch(store.getCategoryList(params))
  }

  const addGuideApi = (params: GuideModel.IModel) => {
    return dispatch(store.addApi(params))
  }

  const editGuideApi = (params: GuideModel.IModel) => {
    return dispatch(store.editApi(params))
  }

  const deleteGuideApi = (id: string) => {
    return dispatch(store.deleteApi(id))
  }
  const getGuideByIdApi = (id: string) => {
    return dispatch(store.getByIdApi(id))
  }
  const duplicateGuideApi = (params: GuideModel.IDuplicateQuery) => {
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
    getGuidePagingApi,
    getCategoryList,
    addGuideApi,
    editGuideApi,
    deleteGuideApi,
    getGuideByIdApi,
    duplicateGuideApi
  }
}
