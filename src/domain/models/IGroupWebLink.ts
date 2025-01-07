
export interface IFDataGroupWebLink {
    id: string 
    name?: string | undefined
    code?: string | undefined
    title?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    image?: string | undefined
    image1?: string | undefined
    image2?: string | undefined
    url?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdByName: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedByName: string | undefined
    updatedDate: Date | undefined
}
export interface IFResponseListGroupWebLinkApi {
    items: IFDataGroupWebLink[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingGroupWebLinkApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
}
export interface IFListboxGroupWebLinkApi {
    $status?: number | undefined
    $keyword?: string | undefined
}
export interface IGroupWebLinkSort  {
    id: string
    sortOrder: number
  }
  
export interface GroupWebLinkSort {
    listGui: IGroupWebLinkSort[]
  }