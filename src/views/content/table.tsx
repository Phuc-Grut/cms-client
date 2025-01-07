import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import GridTableTemplate from "@components/grid-table-template"
import { IListCbxFilter } from "@src/domain/models/ITableGrid"
import { isObjEmpty } from "@src/utility/Utils"
import { Fragment, memo, useContext, useEffect, useState } from "react"
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import {
  Button,
  Card,
  CardBody
} from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { headerColumns } from "./columns"
import { ContentContext } from "./useContext"
import { useDebounce } from "@src/utility/hooks/useDebounce"
import { statusDefault } from "@src/domain/constants/constantSelect"
import { useContent } from "./hooks"
import moment from "moment"
import { notificationError, notificationSuccess } from "@components/notifications"
import {canContextMenuItems} from "@src/views/content/contextMenu"
import {CanPer} from "@utils/context/Can"
import {userAction, userSubject} from "@configs/acl/ability"
const MySwal = withReactContent(Swal)

const Table = () => {
  const { t } = useTranslation()
  const {
    handleModal,
    setDataItem,
    setTypeModal,
    windowSize,
    handleModalDetail,
    handleModalDuplicate
  } = useContext(ContentContext)

  const idTable = 'Contents'

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [queryFilter, setQueryFilter] = useState<any[]>([])
  const [dataSourceFilter, setDataSourceFilter] = useState<IListCbxFilter[]>([])
  const [queryOrder, setQueryOrder] = useState("createdDate;desc")
  const [contextMenuClick, setContextMenuClick] = useState<any>({})
  const [listContextShow, setListContextShow] = useState<any>(undefined)
  const [listContextHide, setListContextHide] = useState<any>(undefined)
  const [doubleClickData, setDoubleClickData] = useState<any>({})

  const listDate = ["date"]

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

  useEffect(() => {
    setDataSourceFilter((old: IListCbxFilter[]) => [
      ...old,
      { key: "status", data: statusDefault }
    ])
  }, [])

  const {
    checkInit,
    getContentPagingApi,
    getContentByIdApi,
    deleteContentApi
  } = useContent()
  const keyword = useDebounce(searchTerm, 500)

  useEffect(() => {
    const queryParam = [
      ...queryFilter,
      { key: "deleted", ope: "==", value: false, predicate: ";" }
    ]
    const rs = queryParam.map((x: any) => `${x.key}${x.ope}${listDate.find((d) => d === x.key) ? moment(x.value).format('YYYY/MM/DD') : x.value}`).join(';')
    getContentPagingApi({
      Filter: rs,
      Order: queryOrder,
      PageNumber: currentPage,
      PageSize: pageSize,
      Keyword: searchTerm
    })
      .unwrap()
      .then((rs) => {
        if (rs?.items) {
          setTimeout(() => {
            setData(rs.items)
          }, 100)
          setTotalItem(rs.totalCount)
        }
      })
      .catch((ex) => {
        console.log(ex)
      })
  }, [pageSize, keyword, checkInit, currentPage, queryFilter])

  useEffect(() => {
    if (
      doubleClickData &&
      !isObjEmpty(doubleClickData) &&
      doubleClickData.rowData !== undefined
    ) {
      getContentByIdApi(doubleClickData.rowData.id)
        .unwrap()
        .then((rs: any) => {
          setDataItem(rs)
          handleModalDetail()
        })
        .catch(() => notificationError(t("getDataError")))
      setTypeModal('View')
    }
  }, [doubleClickData])

  useEffect(() => {
    if (!isObjEmpty(contextMenuClick)) {
      if (contextMenuClick.item.id === "EDIT") {
        getContentByIdApi(contextMenuClick.rowInfo.rowData.id)
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              if (rs?.listGroupCategory && rs?.listGroupCategory.length > 0) {
                const lst = rs?.listGroupCategory.map((obj: any) => {
                  rs[obj.value] = rs?.listCategory?.filter(
                    (d: any) => d.groupCategoryId === obj.value
                  )
                  return obj.value
                })
                rs.idGroupCategories = lst
              } else {
                rs.idGroupCategories = []
              }
              setDataItem(rs)
              setTypeModal('Edit')
              handleModal()
            }, 100)
          })
          .catch(() => notificationError(t("getDataError")))
      } else if (contextMenuClick.item.id === "DETAIL") {
        getContentByIdApi(contextMenuClick.rowInfo.rowData.id)
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              setDataItem(rs)
              setTypeModal('Detail')
              handleModal()
            }, 100)
          })
          .catch((ex) => console.log(ex))
      } else if (contextMenuClick.item.id === "READ") {
        getContentByIdApi(contextMenuClick.rowInfo.rowData.id)
          .unwrap()
          .then((rs: any) => {
            if (rs) {
              setDataItem(rs)
              handleModalDetail()
            }
          })
          .catch(() => notificationError(t("getDataError")))
        setTypeModal('View')
      } else if (contextMenuClick.item.id === "DUPLICATE") {
        setDataItem(contextMenuClick.rowInfo.rowData)
        setTypeModal('Duplicate')
        handleModalDuplicate()
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

  const handleDelete = (id: string) => {
    deleteContentApi(id)
      .unwrap()
      .then((rs) => {
        if (rs.isValid) {
          notificationSuccess(t("Delete Successful"))
        }
      })
  }

  const handleAdd = () => {
    setTypeModal('Add')
    handleModal()
  }

  return (
    <Fragment>
      <div className="table-toolbar table-edit">
        <div className="table-toolbar">
          <Card className="table-bar bar__action">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="bar__action-left">
                  <BreadCrumbsNotLink breadCrumbActive={t("Blog")} />
                </div>
                <div className="bar__action-right d-flex">
                  <CanPer I={userAction.ADD} a={userSubject.Content}>
                    <Button
                      color="primary"
                      onClick={handleAdd}
                      className="me-1 d-flex"
                    >
                      <Icon.Plus fontSize={14} className="me-50" />
                      {t("Add")}
                    </Button>
                  </CanPer>

                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <GridTableTemplate
          resource="tableContent"
          idTable={idTable}
          height={windowSize.innerHeight - 310}
          dataTable={data}
          columns={headerColumns}
          showToolbar={true}
          allowFilter={true}
          allowSort={true}
          showPagination={true}
          allowResizing={true}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItem={totalItem}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          queryFilter={queryFilter}
          dataSourceFilter={dataSourceFilter}
          setQueryFilter={setQueryFilter}
          queryOrder={queryOrder}
          setQueryOrder={setQueryOrder}
          listDate={listDate}
          showContextMenu={true}
          contextMenuItems={canContextMenuItems}
          setContextMenuClick={setContextMenuClick}
          allowPaging={true}
          listContextShow={listContextShow}
          listContextHide={listContextHide}
          contextMenuOpen={contextMenuOpen}
          allowExcelExport={true}
          enablePersistence={true}
          recordDoubleClick={true}
          setDoubleClickData={setDoubleClickData}
        />
      </div>
    </Fragment>
  )
}

export default memo(Table)
