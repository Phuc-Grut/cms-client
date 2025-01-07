export interface ISelectDefault {
  value: any,
  label: string,
  key?: any
}

export type IType = 'Add' | 'Edit' | 'Detail' | 'View' | ''
export type ITypeModal = 'Add' | 'Edit' | 'Detail' | 'View' | 'Duplicate' | 'Copy' | 'Open' | 'Order' | ''