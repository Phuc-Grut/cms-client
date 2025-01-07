import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { isObjEmpty } from "@src/utility/Utils"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Select from "react-select"
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  Input,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import classnames from 'classnames'
// ** Table Columns
import { headerColumns } from "./columns"
import { useGroupCategory } from "./hooks"
import { GroupCategoryContext } from "./useContext"
import { notificationError } from "@components/notifications"
import {canContextMenuItems} from "@src/views/group-category/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"
const MySwal = withReactContent(Swal)

const ButtonHeader = ({
  setTypeModal,
  setDataItem,
  handleModal,
  handleExport
}: any) => {
  const { t } = useTranslation()
  const handleAdd = () => {
    setTypeModal("Add")
    setDataItem(Math.random())
    handleModal()
  }
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbsNotLink breadCrumbActive={t("InfomationChannel")} />
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.InformationChannel}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>

        <UncontrolledButtonDropdown>
          {/* <DropdownToggle outline color='primary' className='dropdown-no-icon d-flex' caret>
            <Icon.MoreVertical fontSize={13} />
            Thao tác
          </DropdownToggle> */}
          <DropdownMenu>
            <CanPer I={userAction.ADD} a={userSubject.InformationChannel}>
              <DropdownItem onClick={handleExport} tag="a">
                Export
              </DropdownItem>
            </CanPer>

          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </div>
  )
}

const FilterHeader = ({
  handleStatusAssignedToChange,
  handleTextChange
}: any) => {
  const { t } = useTranslation()
  const optionStatus = [
    {
      value: null,
      label: t("Select Option")
    },
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <Row className="m-0 gx-1 d-flex flex-wrap justify-content-end align-items-center w-100">
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Select
            options={optionStatus}
            onChange={handleStatusAssignedToChange}
            placeholder={t("Select Option")}
            className="react-select"
            classNamePrefix="select"
          ></Select>
        </Col>
        <Col xs={12} sm={6} md={3} lg={2} className="pt-25 pb-25">
          <Input
            type="text"
            id="search-permission"
            className="w-100"
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={t("Search...")}
          />
        </Col>
      </Row>
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    handleModalOrder,
    setOptionGroupCategory
  } = useContext(GroupCategoryContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [exports, setExport] = useState<boolean>()

  const [contextMenuClick, setContextMenuClick] = useState<any>({})
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)

  const contextMenuOpen = (args: any): void => {
    if (args.rowInfo.rowData !== undefined) {
      switch (args.rowInfo.rowData.isActive) {
      case 0:
        setListContextShow({ list: ["APPROVAL"], type: "SHOW" })
        setListContextHide({ list: ["CANCEL"], type: "HIDE" })
        break
      case 1:
        setListContextShow({ list: ["CANCEL"], type: "SHOW" })
        setListContextHide({ list: ["APPROVAL"], type: "HIDE" })
        break
      case 2:
        setListContextShow({ list: ["APPROVAL"], type: "SHOW" })
        setListContextHide({ list: ["CANCEL"], type: "HIDE" })
        break
      }
    }
  }

  // ** Effect
  const {
    getGroupCategoryPagingApi,
    deleteGroupCategoryApi,
    checkInit,
    getAllApi
  } = useGroupCategory()

  useEffect(() => {
    dataToRender()
  }, [currentPage, pageSize, searchTerm, statusAssignedTo, checkInit])

  useEffect(() => {
    if (!isObjEmpty(contextMenuClick)) {
      if (contextMenuClick.item.id === "EDIT") {
        setDataItem(contextMenuClick.rowInfo.rowData)
        setTypeModal("Edit")
        handleModal()
      } else if (contextMenuClick.item.id === "DETAIL") {
        setDataItem(contextMenuClick.rowInfo.rowData)

        handleModal()
      } else if (contextMenuClick.item.id === "ORDER") {
        getAllApi()
          .unwrap()
          .then((rs) => {
            if (isObjEmpty(rs)) {
              return notificationError(`${t("Retrieving data failed")}!`)
            }

            setTypeModal("Order")
            setOptionGroupCategory(
              rs.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
            )
            handleModalOrder()
          })
          .catch(() => notificationError(`${t("Retrieving data failed")}!`))
      } else if (contextMenuClick.item.id === "DELETE") {
        MySwal.fire({
          title: t("Confirm"),
          text: t("Do you want to delete item?"),
          icon: "warning",
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: t("Delete"),
          cancelButtonText: t("Cancel"),
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger ms-1"
          },
          buttonsStyling: false
        }).then(async (result) => {
          if (result.value) {
            handleDelete(contextMenuClick.rowInfo.rowData.id)
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
          }
        })
      }
    }
  }, [contextMenuClick])

  //call api
  //getDataTable
  const dataToRender = () => {
    getGroupCategoryPagingApi({
      $skip: (currentPage - 1) * pageSize,
      $top: pageSize,
      $keyword: searchTerm,
      $status: statusAssignedTo
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setData(rs.items)
        }, 100)
        setTotalItem(rs.total)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }
  const handleDelete = (id: string) => {
    deleteGroupCategoryApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          toast.success(
            <Fragment>
              <div className="toastify-header">
                <div className="title-wrapper">
                  <h6 className="toast-title">
                    {t("Delete Item successful!")}
                  </h6>
                </div>
              </div>
              <div className="toastify-body">
                <ul className="list-unstyled mb-0">
                  <li></li>
                </ul>
              </div>
            </Fragment>
          )
        }
      })
  }
  const handleTextChange = (val: string) => {
    setSearchTerm(val)
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val.value)
  }

  const handleExport = () => {
    setExport(!exports)
  }

  //view
  return (
    <Fragment>
      <div className="table-toolbar">
        <Card className="table-bar bar__action">
          <CardBody>
            <ButtonHeader
              setTypeModal={setTypeModal}
              setDataItem={setDataItem}
              handleExport={handleExport}
              handleModal={handleModal}
            />
          </CardBody>
        </Card>
        <Card className="table-bar bar__query">
          <CardBody className="pe-0 ps-0">
            <FilterHeader
              searchTerm={searchTerm}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
            />
          </CardBody>
        </Card>
        <GridTableTemplate
          resource="tableGroupCategorys"
          idTable="GroupCategorys"
          // rowHeight={40}
          dataTable={data}
          columns={headerColumns}
          showToolbar={false}
          allowFilter={false}
          allowSort={false}
          showPagination={true}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          setContextMenuClick={setContextMenuClick}
          allowPaging={true}
          listContextShow={listContextShow}
          listContextHide={listContextHide}
          contextMenuOpen={contextMenuOpen}
          exports={exports}
          allowExcelExport={true}
        />
      </div>
    </Fragment>
  )
}

export default Table
