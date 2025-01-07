import {ReactNode} from "react"

export interface IRowInfo {
  type?: string,
  data?: any
}

interface ITableDefault {
  resource?: string
  idTable?: string
  columns?: any,
  dataTable: any
  height?: number,
}


export type ITypeAggregate = 'Sum' | 'Average'| 'Min'| 'Max'| 'Count'| 'Truecount' | 'Falsecount' | 'Custom'
export interface IColumnsAggregate {
  field: string,
  type: ITypeAggregate,
  value: any,
  currency?: any
  label?: string | ReactNode
}

export interface ITable extends ITableDefault{
  ref?: any,
  columns?: any,
  rowHeight?: any
  showToolbar?: boolean
  allowFilter?: boolean
  allowSort?: boolean
  showPagination?: boolean
  pageSize?: number
  totalItem?: number
  setCurrentPage?: any
  setPageSize?: any
  setToolbarAction?: any
  setCommandData?: any
  showContextMenu?: boolean
  setContextMenuClick?: any
  contextMenuItems?: any[],
  contextMenuOpen?: any,
  listContextHide?: any,
  listContextShow?: any,
  recordDoubleClick?: any,
  allowGrouping?: boolean,
  allowExcelExport?: boolean,
  groupBy?: string,
  exports?: boolean,
  searchTerm?: any,
  setSearchTerm?: any,
  setQueryFilter?: any,
  filterColumnsOptions?: any,
  queryFilter?: any
  dataSourceFilter?: any,
  setDataSelected?: any,
  selectionSettings?: any
  listDate?: any
  allowResizing?: boolean,
  childMapping?: any,
  dataInjectServices?: any,
  editOptions?: any,
  handleClick?: any,
  queryOrder?: any,
  setQueryOrder?: any,
  allowPaging?: boolean
  setDoubleClickData?: any,
  enablePersistence?: boolean,
  currentPage?: number,
  showColumnChooser?: any,
  frozenColumns?:any,
  groupSettings?:any,
  aggregateColumn?:any,
  dataSelected?:any
  toolbarTemplate?:any,
  showDropArea?:boolean
  rowDataBound?:any
}

export interface IRowInfo {
  type?: string,
  data?: any,
  index?: number
}

export interface IListCbxFilter {
  key?: string,
  data?: any
}

export interface ITableTemplate extends ITableDefault{
  typeModal?: boolean
  setDataTable?: any,
  allowPaging?: boolean,
  pageSize?: number,
  totalItem?: number,
  setCurrentPage?: any,
  setPageSize?: any,
  showContextMenu?: boolean,
  setContextMenuClick?: any,
  contextMenuItems?: any[],
  contextMenuOpen?: any,
  listContextShow?: any,
  listContextHide?: any,
  recordDoubleClick?: any,
  allowExcelExport?: boolean,
  setDataSelected?: any,
  selectionSettings?: any,
  allowResizing?: boolean,
  setDoubleClickData?: any,
  currentPage?: number,
  inlineEdit?: boolean,
  setCommandClick?: any,
  allowEditOnDblClick?: boolean,
  allowDeleting?: boolean,
  allowEditing?: boolean,
  allowAdding?: boolean
  allowSelection?: boolean
  listDelete?: any
  setListDelete?: any
}