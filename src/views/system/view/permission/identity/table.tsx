import classNames from "classnames"
import { Fragment, useContext, useEffect, useState } from "react"
import '@styles/react/apps/app-todo.scss'
import * as Icon from "becoxy-icons"
import { useTranslation } from "react-i18next"
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import Select from "react-select"
import ListViewTemplate from "./template-list-view"
import ListViewSelectBox from "@components/list-view-select-custom"
import { usePermissionAdmin } from "../hooks"
import { PermissionResolveTree } from "./permisssion-resolve-tree"
import BreadCrumbsNotLink from "@components/breadcrumbs-not-link"
import {notificationError, notificationSuccess} from "@utils/notification"
import { useSystemGroupUser } from "../../group-user/hooks"
import { useSystemUser } from "../../system-user/hooks"
import Scrollbars from "react-custom-scrollbars"
import { IContext, PermissionIdentityContext } from "./useContext"

const ButtonHeader = ({ }: any) => {
  const { t } = useTranslation()
  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <div className='bar__action-left'>
        <BreadCrumbsNotLink breadCrumbActive={t('Permissions by identity')} breadCrumbParent={{ title: 'Permission', link: '/permission' }} />
      </div>
    </div>
  )
}


const FilterHeader = ({
  handleStatusAssignedToChange,
  identityAssignedTo,
  handleIdentityAssignedToChange
}: any) => {
  const { t } = useTranslation()
  const optionStatus = [
    {
      value: null,
      label: t("Select status")
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

  const optionObject = [
    { value: 0, label: t("User") },
    { value: 1, label: t("Group user") }
  ]

  return (
    <div className='d-flex justify-content-between align-items-center w-100'>
      <Row className='m-0 gx-1 d-flex flex-wrap justify-content-start align-items-center w-100'>
        <Col xs={12} sm={6} md={2} lg={2}>
          <Select options={optionObject} onChange={handleIdentityAssignedToChange} value={identityAssignedTo} placeholder={t("Select object")} className='react-select' classNamePrefix='select' ></Select>
        </Col>
        <Col xs={12} sm={6} md={2} lg={2}>
          <Select options={optionStatus} onChange={handleStatusAssignedToChange} placeholder={t("Select status")} className='react-select' classNamePrefix='select' ></Select>
        </Col>
      </Row>
    </div>
  )
}


const TablePermissionIdentity = () => {
  const { t } = useTranslation()
  // ** States
  const { windowSize } = useContext<IContext>(PermissionIdentityContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [dataPermission, setDataPermission] = useState([])
  const [totalItem, setTotalItem] = useState(0)
  const [statusAssignedTo, setStatusAssignedTo] = useState<number>()
  const [identityAssignedTo, setIdentityAssignedTo]: any = useState({ value: 1, label: t("Group user") })
  const [selected, setSelected]: any = useState()
  const [changeValue, setChangeValue]: any = useState([])
  const [mainSidebar, setMainSidebar] = useState(false)

  // ** Effect
  const {
    getListGroupUserApi
  } = useSystemGroupUser()

  const {
    getProductUserPagingApi
  } = useSystemUser()

  const {
    getTreePermissionApi,
    getPermissionUserApi,
    getPermissionGroupUserApi,
    addPermissonGroupUserApi,
    checkInit,
    addPermissonUserApi,
    deletePermissonGroupUserApi,
    deletePermissonUserApi
  } = usePermissionAdmin()


  useEffect(() => {
    dataToRender(false)
  }, [searchTerm, statusAssignedTo, identityAssignedTo])

  const renderPermission = () => {
    setChangeValue([])
    if (selected) {
      if (identityAssignedTo?.value === 0) {
        getPermissionUserApi({ userId: selected?.userId }).unwrap()
          .then((rs: any) => {
            const list = dataPermission.filter((x: any) => x)
            list.forEach((ele: any) => {
              ele.privileges.forEach((ele: any) => {
                const index = rs.findIndex((x: any) => x.privilegeId === ele.id)
                if (index !== -1) {
                  ele.havePermission = true
                  ele.privilegePermissionId = rs[index].id
                } else {
                  ele.havePermission = false
                }
              })
            })
            setDataPermission(list)
          })
          .catch(() => notificationError(`${t('Get')} ${t('error')} `))
      } else if (identityAssignedTo?.value === 1) {
        getPermissionGroupUserApi({ roleId: selected?.id }).unwrap()
          .then((rs: any) => {
            const list = dataPermission.filter((x: any) => x)
            list.forEach((item: any) => {
              item.privileges.forEach((ele: any) => {
                const index = rs.findIndex((x: any) => x.privilegeId === ele.id)
                if (index !== -1) {
                  ele.havePermission = true
                  ele.privilegePermissionId = rs[index].id
                } else {
                  ele.havePermission = false
                }
              })
            })
            setDataPermission(list)
          })
          .catch(() => notificationError(`${t('Get')} ${t('error')} `))
      }
    }
  }

  useEffect(() => {
    renderPermission()
  }, [selected, checkInit])

  useEffect(() => {
    getTreePermissionApi().unwrap()
      .then((rs: any) => {
        const list: any = PermissionResolveTree(rs)
        setDataPermission(list)
      })
      .catch(() => notificationError(`${t('Get')} ${t('error')} `))
  }, [])

  //call api
  //getDataTable
  const dataToRender = (isLoadMore: boolean) => {
    if (identityAssignedTo && identityAssignedTo.value === 1) {
      getListGroupUserApi({
        $keyword: searchTerm,
        $status: statusAssignedTo
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setSelected()
            setData(rs)
          }, 100)
        })
        .catch(() => notificationError(`${t('Get')} ${t('error')} `))
    } else if (identityAssignedTo && identityAssignedTo.value === 0) {
      getProductUserPagingApi({
        $keyword: searchTerm,
        $skip: data.length,
        $top: 30
      }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            if (isLoadMore) {
              const ls = data.concat(rs.items)
              setData(ls)
            } else {
              setData(rs.items)
            }
            setSelected()
          }, 100)
          setTotalItem(rs.total)
        })
        .catch(() => notificationError(`${t('Get')} ${t('error')} `))
    }
  }

  let timeOut: any
  const handleTextChange = (val: string) => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setSearchTerm(val)
    }, 500)
  }

  const handleStatusAssignedToChange = (val: any) => {
    setStatusAssignedTo(val.value)
  }

  const handleIdentityAssignedToChange = (val: any) => {
    if (identityAssignedTo !== val) {
      setData([])
    }
    setIdentityAssignedTo(val)
  }
  const LoadMore = () => {
    if (totalItem > data?.length) {
      dataToRender(true)
    }
  }

  const Onsubmit = () => {
    const deletePermission: any = []
    const addPermission: any = []
    changeValue.forEach((element: any) => {
      if (element.havePermission) {
        addPermission.push(element.id)
      }
      if (!element.havePermission) {
        deletePermission.push(element.privilegePermissionId)
      }
    })
    if (identityAssignedTo?.value === 1) {
      if (deletePermission.length > 0) {
        deletePermissonGroupUserApi(JSON.stringify(deletePermission))
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              if (addPermission.length === 0) {
                setChangeValue([])
                notificationSuccess(`${t('Update permission')} ${t('success')} `)
              }
            } else {
              notificationError(`${t('Update permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Update permission')} ${t('error')} `))
      }
      if (addPermission.length > 0) {
        addPermissonGroupUserApi({ listPrivile: addPermission, listRole: [selected.id] })
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              renderPermission()
              notificationSuccess(`${t('Update permission')} ${t('success')} `)
            } else {
              notificationError(`${t('Update permission')} ${t('error')} `)
            }
          })
          .catch(() => notificationError(`${t('Update permission')} ${t('error')} `))
      }
    } else if (identityAssignedTo?.value === 0) {
      if (deletePermission.length > 0) {
        deletePermissonUserApi(JSON.stringify(deletePermission))
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              if (addPermission.length === 0) {
                setChangeValue([])
                notificationSuccess(`${t('Update permission')} ${t('success')} `)
              }
            }
          })
      }
      if (addPermission.length > 0) {
        addPermissonUserApi({ listPrivile: addPermission, listUser: [selected.userId] })
          .unwrap()
          .then((rs) => {
            if (rs.isValid) {
              renderPermission()
              notificationSuccess(`${t('Update permission')} ${t('success')} `)
            }
          })
      }
    }
  }

  const handleMainSidebar = () => setMainSidebar(!mainSidebar)
  //view
  return (
    <Fragment >
      <div>
        <Card className='table-bar bar__action'>
          <CardBody>
            <ButtonHeader />
          </CardBody>
        </Card>
        <Card className='table-bar bar__query'>
          <CardBody className='pe-0 ps-0'>
            <FilterHeader
              searchTerm={searchTerm}
              handleTextChange={handleTextChange}
              identityAssignedTo={identityAssignedTo}
              handleStatusAssignedToChange={handleStatusAssignedToChange}
              handleIdentityAssignedToChange={handleIdentityAssignedToChange}
            />
          </CardBody>
        </Card>
        <Card className='table-bar bar__query '>
          <div className='content-area-wrapper content-area-wrapper-custom p-0'>
            <div
              className={classNames('sidebar-left', {
                show: mainSidebar
              })}
            >
              <div className='sidebar' >
                <div className='sidebar-content todo-sidebar'>
                  <div className='todo-app-menu'>
                    <div className='w-100 m-1'>
                      <Input
                        type='text'
                        id='search-permission'
                        style={{ height: '28px', width: '290px' }}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={t('Search...')}
                      />
                    </div>
                    <Scrollbars autoHide
                      autoHeight
                      autoHeightMax={windowSize.innerHeight - 278}>
                      <ListViewSelectBox setSelected={setSelected} ismutil={false} selected={selected} showCheckBox={true} data={data} Template={ListViewTemplate}></ListViewSelectBox>
                      <div className="w-100 d-flex justify-content-end cursor-pointer" onClick={LoadMore}>
                        <span style={{ textDecoration: 'underline', color: '#0e6fff', fontSize: '13px', display: (totalItem > data?.length && data.length !== 0 && identityAssignedTo === 0) ? 'block' : 'none' }} className='m-25'>{t('Load more')} </span>
                      </div>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
            <div className='content-right'>
              <div className='content-wrapper'>
                <div className='content-body'>
                  <div
                    className={classNames('body-content-overlay', {
                      show: mainSidebar
                    })}
                    onClick={handleMainSidebar}
                  ></div>
                  <div className="border-start border-end p-1 d-flex flex-wrap justify-content-between">
                    <div className="d-flex flex-wrap justify-content-start">
                      <div className='sidebar-toggle cursor-pointer d-block d-lg-none me-2 mt-25' onClick={handleMainSidebar}>
                        <Icon.Menu fontSize={21} />
                      </div>
                      <strong className="me-2 p pt-25 pb-25">
                        {selected?.name}
                      </strong>
                    </div>
                    <Button color="primary" onClick={Onsubmit}>{t('Save changes')}</Button>
                  </div>
                  <Scrollbars autoHide
                    autoHeight
                    autoHeightMin={windowSize.innerHeight - 283}
                    autoHeightMax={windowSize.innerHeight - 283}>
                    <table className="w-100">
                      <thead>
                        <tr>
                          <th className="border p-75" >{t('Function')}</th>
                          <th className="border p-75" >{t('Permission')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPermission?.map((resource: any) => {
                          return (<tr key={resource.id}>
                            <td className="border p-75" >
                              <div className="d-flex flex-wrap me-2 p pt-25 pb-25">
                                {resource?.title?.map((ele: any, index: any) => {
                                  return (<div className="me-50" key={index}> {t(ele)} {(index < resource?.title.length - 1) ? '>>' : ''}</div>)
                                })}
                              </div>
                            </td>
                            <td className="border p-50">
                              <div className="d-flex">
                                {
                                  resource?.privileges.map((element: any, index: number) => {
                                    return (
                                      <Button
                                        key={index}
                                        color={element.havePermission ? 'success' : 'secondary'}
                                        className='me-50 p-50'
                                        outline={!element.havePermission}
                                        disabled={!selected}
                                        onClick={() => {
                                          element.havePermission = !element.havePermission
                                          const index = changeValue.findIndex((x: any) => x.id === element.id)
                                          if (index !== -1) {
                                            changeValue.splice(index, 1)
                                          } else {
                                            changeValue.push(element)
                                          }
                                          setChangeValue(changeValue)
                                          setDataPermission(dataPermission.filter((x: any) => x))
                                        }}
                                        style={{ fontSize: '13px', fontWeight: '550' }}>
                                        {element.name}
                                      </Button>
                                    )
                                  })}
                              </div>
                            </td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Fragment >
  )
}

export default TablePermissionIdentity