import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
  openModalOrder?: any
  handleModalOrder?: any,
  optionGroupCategory?: any,
  setOptionGroupCategory?: any
}

export const GroupCategoryContext = createContext<IContext>({typeModal: '', setTypeModal: () => {}})