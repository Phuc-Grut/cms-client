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
