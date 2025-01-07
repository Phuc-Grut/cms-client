import { CommandModel } from "@syncfusion/ej2-react-grids"
import {IContextMenu} from "@src/domain/models/IContextMenu"
export const ContextMenuItems: IContextMenu[] = [
  { id: 'ADD', action: 'ADD', text: 'AddItem', target: '.e-content', iconCss:'e-flat e-icons e-add'},
  { id: 'OPEN', action: 'ADD', text: 'Open', target: '.e-content', iconCss:'e-flat e-icons e-eye'},
  { id: 'EDIT', action: 'EDIT', text: 'Edit', target: '.e-content', iconCss:'e-flat e-icons e-edit'},
  { id: 'ORDER', action: 'ADD', text: 'Order', target: '.e-content', iconCss:'e-flat e-icons e-sorting-1'},
  { id: 'READ', action: 'ADD', text: 'View', target: '.e-content', iconCss:'e-flat e-icons e-eye'},
  { id: 'DELETE', action: 'DELETE', text: 'Delete', target: '.e-content', iconCss:'e-flat e-icons e-trash'},
  { id: 'DETAIL', action: 'DETAIL', text: 'Detail', target: '.e-content', iconCss:'e-flat e-icons e-eye'},
  {id: 'APPROVAL', action: 'ADD', text: 'Approval', target: '.e-content', iconCss: 'e-flat e-icons e-edit'},
  {id: 'CANCEL', action: 'ADD', text: 'Cancel', target: '.e-content', iconCss: 'e-flat e-icons e-close'},
  {id: 'SEND_EMAIL', action: 'ADD', text: 'Send Email', target: '.e-content', iconCss: 'e-flat e-icons e-close'},
  {id: 'DUPLICATE', action: 'ADD', text: 'Duplicate', target: '.e-content', iconCss: 'e-flat e-icons e-copy'}
]

export const commands: CommandModel[] = [
  { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' }, title: 'Cập nhật'},
  { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' }, title: 'Xoá'},
  { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' }, title: 'Lưu'},
  { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }, title: 'Đóng' }
]
export const toolbarOptions:  object[] = [
  { text: 'Thêm', tooltipText: 'Thêm', prefixIcon: 'e-plus-small', id: 'Add', align: 'Right' },
  { text: 'Tất cả NV', tooltipText: 'Tất cả NV', prefixIcon: 'e-plus-small', id: 'AddAll', align: 'Right' },
  { text: 'Chọn NV', tooltipText: 'Chọn NV', prefixIcon: 'e-plus-small', id: 'AddEmployee', align: 'Right' }
]
