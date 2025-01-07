import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore'

import * as store from '../store'

export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected
  } = useAppSelector((state: RootState) => state.dashboard)

  const getContentByType = () => {
    return dispatch(store.getContentByType())
  }
  const getTopCategory = () => {
    return dispatch(store.getTopCategory())
  }

  const getTopNewContent = () => {
    return dispatch(store.getTopNewContent())
  }

  return {
    successfully,
    checkInit,
    items,
    total,
    pageIndex,
    pageSize,
    selected,
    getTopCategory,
    getContentByType,
    getTopNewContent
  }
}
