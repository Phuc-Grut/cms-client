import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"

export interface IContext extends IUseContext{
    optionGrCategory?:any, 
    setOptionGrCategory?:any,
    setOpenModalDuplicate?: any,
    setOpenModalDetail?: any,
    dataItem?:any,
    setDataItem?:any,
    valueTag?: any,
    setValueTag?: any
}
export const FAQContext = createContext<IContext>({typeModal: '', setTypeModal: () => {}})