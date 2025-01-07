
export interface IFDataItem {
    id?: string
    name?: string 
    title?: string
    description?: string
    size?: number
    isFile?: boolean
    parentId?: string | undefined
    parentName?: string | undefined
    mimeType?: string
    hasChild?: boolean
    localPath?: string
    cdn?: string
    product?: string | undefined
    status?: number 
    workspace?: string
    content?: string
    tenant?: string
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
}
export interface IFResponseListItemApi {
    items: IFDataItem[]
    total: number
    pageSize: number
    pageIndex: number
    status: number
    detailErrors: any
}
export interface IFPagingItemApi {
    $inlinecount?: string | undefined
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
    $product?: string | undefined
    $isFile?: boolean | undefined
    $parentId?: string | undefined
}