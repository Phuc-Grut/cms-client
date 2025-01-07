import { createContext } from 'react'
import {IUseContext} from "@src/domain/models/IUseContext"

export interface IContext extends IUseContext{
    groupAssignedTo?: any,
    setGroupAssignedTo?: any,
    parentWebLink?: any,
    setParentWebLink?: any,
    parentWebLinkIdQuery?: any,
    setParentWebLinkIdQuery?: any,
    handleModalDetail?: any,
    openModalDetail?: any,
    setOpenModalDetail?: any,
    windowSize?: any,
    setWindowSize?: any,
    breadCrumb?:any, 
    setBreadCrumb?: any
}
export const WebLinkContext = createContext<IContext>({typeModal: '', setTypeModal: () => {}})