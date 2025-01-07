import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as contentCategoryStore from '../store'

import {
  IFListboxContentCategoryApi,
  IFDataContentCategory,
  IFPagingContentCategoryApi
} from '@src/domain/models/IContentCategory'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useContentCategory = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.contentCategory)

  const getContentCategoryPagingApi = (params: IFPagingContentCategoryApi) => {
    return dispatch(contentCategoryStore.getPagingApi(params))
  }

  const getListContentCategoryApi = (params: IFListboxContentCategoryApi) => {
    return dispatch(contentCategoryStore.getListBoxApi(params))
  }

  const addContentCategoryApi = (params: IFDataContentCategory) => {
    return dispatch(contentCategoryStore.addApi(params))
  }

  const editContentCategoryApi = (params: IFDataContentCategory) => {
    return dispatch(contentCategoryStore.editApi(params))
  }

  const sortContentCategoryApi = (params: IFSort) => {
    return dispatch(contentCategoryStore.sortApi(params))
  }

  const deleteContentCategoryApi = (id: string) => {
    return dispatch(contentCategoryStore.deleteApi(id))
  }
  const getByIdApi = (params: string) => {
    return dispatch(contentCategoryStore.get(params))
  }
  const getParentByIdApi = (params: string) => {
    return dispatch(contentCategoryStore.getParent(params))
  }
  const getListComboBoxContentCategoryApi = () => {
    return dispatch(contentCategoryStore.getListComboboxApi())
  } 

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getContentCategoryPagingApi,
    getListContentCategoryApi,
    addContentCategoryApi,
    editContentCategoryApi,
    sortContentCategoryApi,
    deleteContentCategoryApi,
    getByIdApi,
    getParentByIdApi,
    getListComboBoxContentCategoryApi
  }
}
