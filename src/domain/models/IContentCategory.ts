
export interface IFDataContentCategory {
    id: string 
    name?: string | undefined
    code?: string | undefined
    parentCategoryId?: string | undefined
    parentCategoryName?: string | undefined
    displayOrder?: number | undefined
    description?: string | undefined
    slug?: string | undefined
    status?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
    createdByName?: string | undefined
    updatedByName?: string | undefined
    jsonData: {
        name: string;
        value: string;
      }[]
    keywords?: string | undefined

}
export interface IFResponseListContentCategoryApi {
    items: IFDataContentCategory[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingContentCategoryApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $parentCategoryRootId?: string | undefined
    $status?: number | undefined
}
export interface IFListboxContentCategoryApi {
    $status?: number | undefined
    $keyword?: string | undefined
    $parentCategoryRootId?: string | undefined
}