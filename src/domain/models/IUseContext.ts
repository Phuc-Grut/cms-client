import { ITypeModal } from "@src/domain/models/index"

export interface IUseContext {
  windowSize?: any,
  openModal?: boolean,
  handleAside?: any,
  handleModal?: any,
  typeModal?: ITypeModal,
  // eslint-disable-next-line no-unused-vars
  // setTypeModal: (props: ITypeModal) =>  void,
  setTypeModal?: any,
  openSubModal?: any,
  handleSubModal?: any,
  typeSubModal?: any,
  setTypeSubModal?: any,
  dataItem?: any,
  setDataItem?: any
  openModalOrder?: any
  handleModalOrder?: any
  openModalDetail?: any
  handleModalDetail?: any
  openModalDuplicate?: any
  handleModalDuplicate?: any
  openModalUpload?: any
  handleModalUpload?: any
}