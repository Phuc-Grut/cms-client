import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as contentypeStore from '../store'

import {
  IFListboxContentTypeApi,
  IFDataContentType,
  IFPagingContentTypeApi
} from '@src/domain/models/IContentType'
import { IFSort } from '@src/domain/interfaces/ISort'

export const useContentType = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.contentType)

  const getContentTypePagingApi = (params: IFPagingContentTypeApi) => {
    return dispatch(contentypeStore.getPagingApi(params))
  }

  const getListContentTypeApi = (params: IFListboxContentTypeApi) => {
    return dispatch(contentypeStore.getListBoxApi(params))
  }

  const addContentTypeApi = (params: IFDataContentType) => {
    return dispatch(contentypeStore.addApi(params))
  }

  const editContentTypeApi = (params: IFDataContentType) => {
    return dispatch(contentypeStore.editApi(params))
  }

  const sortContentTypeApi = (params: IFSort) => {
    return dispatch(contentypeStore.sortApi(params))
  }

  const deleteContentTypeApi = (id: string) => {
    return dispatch(contentypeStore.deleteApi(id))
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getContentTypePagingApi,
    getListContentTypeApi,
    addContentTypeApi,
    editContentTypeApi,
    sortContentTypeApi,
    deleteContentTypeApi
  }
}
