// ** Store Imports
import { handleFooterType } from '@store/layout'
import { useDispatch, useSelector } from 'react-redux'

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state: any) => state.layout)

  const setFooterType = (type: any) => {
    dispatch(handleFooterType(type))
  }

  return { setFooterType, footerType: store.footerType }
}
