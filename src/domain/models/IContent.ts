export interface IFDataContent {
    id?: string
    code?: string
    name?: string | null
    linkInfo?: string
    status?: number | undefined
}
export interface IFPagingApiParams {
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
  }  

export interface IFModelContent extends IFDataContent {
    contentType?: string | undefined
    contentTypeId?: string | undefined
    shortDescription?: string
    fullDescription?: string
    categoryRootId?: string
    categoryRoot?: string
    categories?: string
    groupCategories?: string
    image?: string
    image1?: string | undefined
    image2?: string | undefined
    deleted: boolean | undefined
    deletedDate?: Date | undefined
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
    tags?: string | undefined
    isChangeAvata?: boolean
    isAuto?: number | undefined,
    moduleCode?: string | undefined
    idNumber?: number | undefined
    slug?: string | undefined
}

export interface IFResponseListContentApi {
    items: IFDataContent[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFDuplicateContentApi {
    id?: string
    name?: string
    code?: string | null
    status?: number | undefined
    isAuto?: number | undefined
    moduleCode?: string | undefined
}
