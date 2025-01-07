import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as contentStore from '../store'

import {
  IFDataContent,
  IFPagingApiParams,
  IFDuplicateContentApi
} from '@src/domain/models/IContent'

export const useContent = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.content)

  const getContentPagingApi = (params: IFPagingApiParams) => {
    return dispatch(contentStore.getPagingApi(params))
  }


  const addContentApi = (params: IFDataContent) => {
    return dispatch(contentStore.addApi(params))
  }

  const editContentApi = (params: IFDataContent) => {
    return dispatch(contentStore.editApi(params))
  }

  const deleteContentApi = (id: string) => {
    return dispatch(contentStore.deleteApi(id))
  }
  const getContentByIdApi = (id: string) => {
    return dispatch(contentStore.getByIdApi(id)) 
  }
  const duplicateContentApi = (params: IFDuplicateContentApi) => { 
    return dispatch(contentStore.duplicateApi(params)) 
  }


  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getContentPagingApi,
    addContentApi,
    editContentApi,
    deleteContentApi,
    getContentByIdApi,
    duplicateContentApi
  }
}
