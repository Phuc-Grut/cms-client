import {
  RootState,
  useAppDispatch,
  useAppSelector
} from "@store/configureStore"

import * as store from "../store"
import * as UpgradeModel from "@src/domain/models/IUpgrade"

export const useUpgrade = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.upgrade)

  const getUpgradePagingApi = (params: UpgradeModel.IPagingQuery) => {
    return dispatch(store.getPagingApi(params))
  }
  const getCategoryList = (params: UpgradeModel.ICateListView) => {
    return dispatch(store.getCategoryList(params))
  }

  const addUpgradeApi = (params: UpgradeModel.IModel) => {
    return dispatch(store.addApi(params))
  }

  const editUpgradeApi = (params: UpgradeModel.IModel) => {
    return dispatch(store.editApi(params))
  }

  const deleteUpgradeApi = (id: string) => {
    return dispatch(store.deleteApi(id))
  }
  const getUpgradeByIdApi = (id: string) => {
    return dispatch(store.getByIdApi(id))
  }
  const duplicateUpgradeApi = (params: UpgradeModel.IDuplicateQuery) => {
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
    getUpgradePagingApi,
    getCategoryList,
    addUpgradeApi,
    editUpgradeApi,
    deleteUpgradeApi,
    getUpgradeByIdApi,
    duplicateUpgradeApi
  }
}
