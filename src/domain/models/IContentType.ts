
export interface IFDataContentType {
    id: string 
    name?: string | undefined
    code?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
}
export interface IFResponseListContentTypeApi {
    items: IFDataContentType[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingContentTypeApi {
    $inlinecount?: string | undefined
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $status?: number | undefined
}
export interface IFListboxContentTypeApi {
    $status?: number | undefined
    $keyword?: string | undefined
}