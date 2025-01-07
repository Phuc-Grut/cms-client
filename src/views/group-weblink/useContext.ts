import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"
export interface IContext extends IUseContext{
  openModalOrder?: any
  handleModalOrder?: any,
  optionGroupWebLink?: any,
  setOptionGroupWebLink?: any
}


export const GroupWebLinkContext = createContext<IContext>({typeModal: '', setTypeModal: () => {}})