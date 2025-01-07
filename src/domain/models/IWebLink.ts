
export interface IFDataWebLink {
    id: string 
    name?: string | undefined
    fullName?: string | undefined
    code?: string | undefined
    parentWebLinkId?: string | undefined
    parentWebLinkName?: string | undefined
    groupWebLinkId?: string | undefined
    groupWebLinkCode?: string | undefined
    groupWebLinkName?: string | undefined
    description?: string | undefined
    image?: string | undefined
    image2?: string | undefined
    image3?: string | undefined
    web?: string | undefined
    url?: string | undefined
    status?: number | undefined
    displayOrder?: number | undefined
    createdBy: string | undefined
    createdByName: string | undefined
    createdDate: Date | undefined
    updatedBy: string | undefined
    updatedByName: string | undefined
    updatedDate: Date | undefined
    keywords?: string | undefined
}

export interface IFResponseListWebLinkApi {
    items: IFDataWebLink[]
    total: number
    pageSize: number
    pageIndex: number
    status: boolean
    detailErrors: any
}
export interface IFPagingWebLinkApi {
    $skip?: number | undefined
    $top?: number | undefined
    $keyword?: string | undefined
    $groupWebLinkId?: string | undefined
    $parentWebLinkId?: string | undefined
    $status?: number | undefined
}
export interface IFListboxWebLinkApi {
    $status?: number | undefined
    $keyword?: string | undefined
    $groupWebLinkId?: string | undefined
    $parentWebLinkId?: string | undefined
}