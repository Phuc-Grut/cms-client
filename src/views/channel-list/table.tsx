import GridTableTemplate from "@components/grid-table-template"
import { isObjEmpty } from "@src/utility/Utils"
import { Fragment, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
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
  Spinner,
  UncontrolledButtonDropdown
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useGroupCategory } from "../group-category/hooks"
import { useLocation } from "react-router-dom"

import { headerColumns, sortColumns } from "./columns"
import { useChannelList } from "./hook"
import { CategoryContext } from "./useContext"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import ModalSortComponent from "@components/sort-component"
import BreadCrumbs from "@components/breadcrumbs"
import {canContextMenuItems} from "@src/views/channel-list/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"

const MySwal = withReactContent(Swal)

const ButtonHeader = ({ handleExport, handleAdd, breadCrumb, setBreadCrumb}: any) => {
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="bar__action-left">
        <BreadCrumbs data={breadCrumb} title={setBreadCrumb} />
      </div>
      <div className="bar__action-right d-flex">
        <CanPer I={userAction.ADD} a={userSubject.ChannelList}>
          <Button color="primary" onClick={handleAdd} className="me-1 d-flex">
            <Icon.Plus fontSize={14} className="me-50" />
            {t("Add")}
          </Button>
        </CanPer>

        <UncontrolledButtonDropdown>
          <DropdownMenu>
            <CanPer I={userAction.ADD} a={userSubject.ChannelList}>
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
  handleTextChange,
  handleGroupAssignedToChange,
  optionGroup,
  groupAssignedTo
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
            value={optionGroup.find(
              (val: any) => val.value === groupAssignedTo?.value
            )}
            options={optionGroup}
            onChange={handleGroupAssignedToChange}
            placeholder={t("Select Option")}
            className="react-select"
            classNamePrefix="select"
          ></Select>
        </Col>
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
  const location = useLocation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    groupAssignedTo,
    setGroupAssignedTo,
    setParentCategory,
    handleModalDetail,
    breadCrumb,
    setBreadCrumb
  } = useContext(CategoryContext)
  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [optionGroup, setOptionGroup] = useState([])
  const [exports, setExport] = useState<boolean>()
  const [totalItem, setTotalItem] = useState(0)
  const [contextMenuClick, setContextMenuClick] = useState<any>({})
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [doubleClickData, setDoubleClickData] = useState<any>({})
  const [openModalSort, setOpenModalSort] = useState(false)
  const [dataSort, setDataSort] = useState([])
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
    getCategoryPagingApi,
    deleteCategoryApi,
    checkInit,
    getByIdApi,
    sortApi,
    getListCategoryApi,
    getParentByIdApi
  } = useChannelList()

  const { getListGroupCategoryApi } = useGroupCategory()
  const handleModalSort = () => {
    getListCategoryApi({
      $keyword: searchTerm,
      $status: statusAssignedTo,
      $groupCategoryId: groupAssignedTo?.value ? groupAssignedTo?.value : undefined,
      $parentCategoryId: location.state?.id ? location.state?.id : "null"
    })
      .unwrap()
      .then((rs: any) => {
        setDataSort(rs)
        setOpenModalSort(!openModalSort)
      })
      .catch((ex: any) => console.log(ex))
  }
  useEffect(() => {
    dataToRender()
  }, [
    currentPage,
    pageSize,
    searchTerm,
    statusAssignedTo,
    checkInit,
    groupAssignedTo
  ])

  useEffect(() => {
    getListGroupCategoryApi({})
      .unwrap()
      .then(async (rs) => {
        setOptionGroup(rs)
        if (rs && rs.length > 0) {
          const obj = { value: rs[0].value, label: rs[0].label }
          const groupCategoryLocal = await localStorage.getItem("groupCategory")
          if (groupCategoryLocal && groupCategoryLocal !== "undefined") {
            setGroupAssignedTo(JSON.parse(groupCategoryLocal))
          } else {
            setGroupAssignedTo(obj)
            localStorage.setItem("groupCategory", JSON.stringify(obj))
          }
        }
      })
      .catch((ex) => console.log(ex))
  }, [])
  useEffect(() => {
    if (
      doubleClickData &&
      !isObjEmpty(doubleClickData) &&
      doubleClickData.rowData !== undefined
    ) {
      getByIdApi(doubleClickData.rowData.id)
        .unwrap()
        .then((rs: any) => {
          setDataItem(rs)
          handleModalDetail()
        })
        .catch(() => notificationError(t("getDataError")))
      setTypeModal("View")
    }
  }, [doubleClickData])
  useEffect(() => {
    if (!isObjEmpty(contextMenuClick)) {
      if (contextMenuClick.item.id === "EDIT") {
        getByIdApi(contextMenuClick.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            setDataItem(rs)
            handleModal()
          })
          .catch(() => notificationError(t("getDataError")))
        setTypeModal("Edit")
      }
      if (contextMenuClick.item.id === "ADD") {
        setParentCategory({
          value: contextMenuClick.rowInfo.rowData.id,
          label: contextMenuClick.rowInfo.rowData.name
        })
        setTypeModal("Add")
        handleModal()
      } else if (contextMenuClick.item.id === "READ") {
        getByIdApi(contextMenuClick.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            setDataItem(rs)
            handleModalDetail()
          })
          .catch(() => notificationError(t("getDataError")))
        setTypeModal("View")
      } else if (contextMenuClick.item.id === "ORDER") {
        handleModalSort()
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
          }
        })
      }
    }
  }, [contextMenuClick])

  const dataToRender = () => {
    if (!groupAssignedTo?.value) {
      return
    }
    getCategoryPagingApi({
      $skip: (currentPage - 1) * pageSize,
      $top: pageSize,
      $keyword: searchTerm,
      $status: statusAssignedTo,
      $groupCategoryId: groupAssignedTo?.value ? groupAssignedTo?.value : undefined,
      $parentCategoryId: location.state?.id ? location.state?.id : "null"
    })
      .unwrap()
      .then((rs) => {
        setTimeout(() => {
          setData(rs.items)
        }, 100)
        setTotalItem(rs.total)
        setLoading(false)
      })
      .catch((ex) => {
        console.log(ex)
        setLoading(false)
      })
    if (location.state?.id) {
      getParentByIdApi(location.state?.id)
        .unwrap()
        .then((rs: any) => {
          const result = rs
            .map((x: any) => ({
              isActive: false,
              link: "/channel-list",
              title: x.name,
              id: x.id
            }))
            .reverse()
          setBreadCrumb([
            {
              isActive: false,
              link: "/channel-list",
              title: "Channel List"
            },
            ...result
          ])
        })
        .catch(() => notificationError(t("getDataError")))
    } else {
      setBreadCrumb([
        {
          isActive: false,
          link: "/channel-list",
          title: "Channel List"
        }
      ])
    }
  }
  const handleDelete = (id: string) => {
    deleteCategoryApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(`${t("Delete Item successful")}!`)
        } else {
          notificationError(`${t("Delete Item error")}!`)
        }
      })
      .catch(() => {
        notificationError(`${t("Delete Item error")}!`)
      })
  }
  const handleTextChange = (val: string) => {
    setSearchTerm(val)
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val.value)
  }

  const handleGroupAssignedToChange = (val: any) => {
    setGroupAssignedTo(val)
    localStorage.setItem("groupCategory", JSON.stringify(val))
    if (location?.state?.id) {
      location.state.id = null
    }
    if (location?.state?.name) {
      location.state.name = null
    }
  }

  const handleExport = () => {
    setExport(!exports)
  }
  const handleAdd = () => {
    if (!groupAssignedTo || !groupAssignedTo?.value) {
      notificationError(t("InfomationChannel"))
    }
    setTypeModal("Add")
    setDataItem(Math.random())
    handleModal()
  }
  //view
  return (
    <Fragment>
      <div className="table-toolbar">
        <Card className="table-bar bar__action">
          <CardBody>
            <ButtonHeader
              handleExport={handleExport}
              handleAdd={handleAdd}
              breadCrumb={breadCrumb}
            />
          </CardBody>
        </Card>
        <Card className="table-bar bar__query">
          <CardBody className="pe-0 ps-0">
            <FilterHeader
              handleGroupAssignedToChange={handleGroupAssignedToChange}
              optionGroup={optionGroup}
              handleTextChange={handleTextChange}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
              groupAssignedTo={groupAssignedTo}
            />
          </CardBody>
        </Card>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner type="grow" color="warning" children={false} />
          </div>
        ) : (
          <GridTableTemplate
            dataTable={data}
            columns={headerColumns}
            showToolbar={false}
            allowFilter={false}
            allowSort={false}
            showPagination={true}
            showContextMenu={true}
            contextMenuItems={canContextMenuItems}
            setContextMenuClick={setContextMenuClick}
            pageSize={pageSize}
            totalItem={totalItem}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            listContextShow={listContextShow}
            listContextHide={listContextHide}
            contextMenuOpen={contextMenuOpen}
            recordDoubleClick={true}
            setDoubleClickData={setDoubleClickData}
            allowResizing={true}
            allowPaging={true}
          />
        )}
        <ModalSortComponent
          openModal={openModalSort}
          handleModal={handleModalSort}
          data={dataSort}
          setData={setDataSort}
          columns={sortColumns}
          sortApi={sortApi}
        />
      </div>
    </Fragment>
  )
}

export default Table
