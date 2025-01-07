export interface IListView {
    id?: string
    code?: string
    name?: string | undefined
    title?: string | undefined
    image?: string | undefined
    slug?: string | undefined
    status?: number | undefined
    idNumber?: number | undefined
}
export interface ICateListView {
    id?: string
    code?: string
    name?: string | null
    title?: string | undefined
    image?: string | undefined
    slug?: string | undefined
    status?: number | undefined
}
export interface IModel extends IListView {
    contentType?: string | undefined
    contentTypeId?: string | undefined
    shortDescription?: string
    fullDescription?: string
    categoryRootId?: string
    categoryRoot?: string
    categories?: string
    idCategories?: string | undefined
    groupCategories?: string
    image?: string
    image1?: string | undefined
    image2?: string | undefined
    tags?: string | undefined
    deleted?: boolean | undefined
    deletedDate?: Date | undefined
    createdBy?: string | undefined
    createdDate?: Date | undefined
    updatedBy?: string | undefined
    updatedDate?: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
    isAuto?: boolean
}
export interface IPagingList {
    items: IListView[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IPagingQuery{
    Filter?: string,
    Order?: string,
    PageNumber: number,
    PageSize: number,
    Keyword?: string
}  
export interface IDuplicateQuery {
    id?: string
    name?: string
    isAuto?: number | undefined
    code?: string | null
    status?: number | undefined
}
export interface IListBoxQuery {
    $keyword?: string | undefined
    $status?: number | undefined
}
