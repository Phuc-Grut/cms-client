import { ISelectDefault } from "@src/domain/models"

export const statusObjDefault: any = {
  pending: 'light-warning',
  1: 'light-success',
  0: 'light-secondary'
}
  
export const optionStatus = [
  {
    value: 1,
    label: "Active"
  },
  {
    value: 0,
    label: "Inactive"
  }
]

export const statusDefault: ISelectDefault[] = [
  {
    value: 1,
    label: 'Sử dụng'
  },
  {
    value: 0,
    label: 'Không sử dụng'
  }
]

export const statusBoolean: ISelectDefault[] = [
  {
    value: false,
    label: 'Không'
  },
  {
    value: true,
    label: 'Có'
  }
]