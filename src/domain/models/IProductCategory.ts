
export interface IFDataProductCategory {
    id: string 
    name?: string | undefined
    code?: string | undefined
    parentCategoryId?: string | undefined
    parentCategoryName?: string | undefined
    description?: string | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedDate: Date | undefined
    jsonData: {
        name: string;
        value: string;
      }[]
    keywords?: string | undefined
}

export interface IFPagingProductCategoryApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $parentCategoryRootId?: string | undefined
    $status?: number | undefined
}

export interface IFListboxProductCategoryApi {
    $status?: number | undefined
    $keyword?: string | undefined
    $parentCategoryRootId?: string | undefined
}