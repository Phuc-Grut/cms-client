import { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from 'reactstrap'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'


import IconJpg from '@src/assets/images/icons/jpg.png'
import IconDoc from '@src/assets/images/icons/doc.png'
import IconJson from '@src/assets/images/icons/json.png'
import IconTxt from '@src/assets/images/icons/txt.png'
import IconXlsx from '@src/assets/images/icons/xls.png'
import { Copy, Edit, Folder, Info, MoreVertical, Trash } from 'becoxy-icons'


interface IFCardFolder {
    // id: string,
    // name: string,
    // title?: string,
    // mimeType: string,
    // size?: string,
    // updatedDate?: boolean,
    // lastOpenDate?: any,
    // varia?: any,

    // showContextMenu?: boolean
    // setContextMenuClick?: any
    // contextMenuItems?: any[],
    contextMenuOpen?: any,
    listContextHide?: any,
    listContextShow?: any,
    showContextMenu?: boolean
    contextMenuItems?: any[],
    setContextMenuClick?: any,
    dataItem: any,
    setDoubleClickData?: any,
    recordDoubleClick?: any,
    
} 

const fileExtended: any = {
  jpg: IconJpg,
  jpeg: IconJpg,
  png: IconJpg,
  xlsx: IconXlsx,
  doc: IconDoc,
  json: IconJson,
  txt: IconTxt
}

const CardFolder = (props: IFCardFolder) => {
  const { t } = useTranslation()
  const dataGrid: any = useRef()
  
  const [arrSelected, setArrSelected] = useState<string[]>([])

  const {
    contextMenuOpen,
    listContextShow,
    listContextHide,
    showContextMenu,
    contextMenuItems,
    setContextMenuClick,
    dataItem,
    setDoubleClickData
    
  } = props

  
  const contextMenuClick = (args: any) => {
    args.cancel = true
    setContextMenuClick(args)
  }

  useEffect(() => {
    if (dataGrid) {
      if (listContextShow?.type === 'SHOW') {
        dataGrid?.current.contextMenuModule.contextMenu.showItems(listContextShow.list, true)
      }
      if (listContextHide?.type === 'HIDE') {
        dataGrid?.current.contextMenuModule.contextMenu.hideItems(listContextHide.list, true)
      }
    }
  }, [listContextShow, listContextHide])


  console.log('dataGrid', dataGrid)
  console.log('datadshahsjkGrid', dataGrid.current)
  

  const renderIconFile = (extended: string) => {
    const mimeType = extended.substring(1)
  
    return (
      <img src={fileExtended[mimeType]} alt="file-icon" height="35" />
    )
  }
 
  const renderDropdownItem = () => {
    return (
      <UncontrolledDropdown className='float-end'>
        <DropdownToggle className='toggle-dropdown mt-n25' tag='a' href='/' onClick={e => e.preventDefault()}>
          <MoreVertical className='' fontSize={16}/>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag='div' onClick={e => e.preventDefault}>
            <Copy fontSize={14} className="me-50"/>
            <span className="align-middle">{t("Preview")}</span>
          </DropdownItem>
          <DropdownItem tag='div' to='/'>
            <Copy fontSize={14} className="me-50"/>
            <span className="align-middle">{t("Make a copy")}</span>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem tag='div' to='/'>
            <Edit fontSize={14} className="me-50"/>
            <span className="align-middle">{t("Rename")}</span>
          </DropdownItem>
          <DropdownItem tag='div' to='/'>
            <Info fontSize={14} className="me-50"/>
            <span className="align-middle">{t("Info")}</span>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem tag='div' to='/'>
            <Trash fontSize={14} className="me-50"/>
            <span className="align-middle">{t("Delete")}</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  const convertSizeToMB = (size: any) => {
    const gbSize = size / (1024 * 1024)
    const roundedSize = gbSize.toFixed(2)
    return `${roundedSize} MB`
  }

  const formatDate = (date:any) => {
    const formattedDate = new Date(date)
    const day = formattedDate.getDate()
    const month = formattedDate.getMonth() + 1
    const year = formattedDate.getFullYear()
    return `${day}/${month}/${year}`
  }

  const onSelectItems = (id: string) => {
    const arr = [...arrSelected]
    if (!arrSelected.includes(id)) {
      arr.push(id)
      setArrSelected(arr)
    } else {
      const filteredItems = arrSelected.filter((item) => item !== id)
      setArrSelected(filteredItems)
    }
  }

  return (
    <Fragment>
      {dataItem.map((item: any, index: number) => (
        <Card
          ref={dataGrid}
          contextMenuItems={showContextMenu ? contextMenuItems?.map((x: any) => ({...x, text: t(x.text)})) : undefined}
          contextMenuClick={showContextMenu ? contextMenuClick : undefined}
          dataItem={dataItem}

          listContextShow={listContextShow}
          listContextHide={listContextHide}
          contextMenuOpen={contextMenuOpen}
          recordDoubleClick={true}
          setDoubleClickData={setDoubleClickData}
          
          key={index}
          className={classnames('file-manager-item file', {
            selected: arrSelected.includes(item.id)
          })}
        >
          <div className="form-check">
            <Input
              type='checkbox'
              onClick={() => onSelectItems(item.name)}
              className="form-check-input"
              id={`customCheck-${index + 1}`}
            />
          </div>
          <div className="card-img-top file-logo-wrapper">
            {renderDropdownItem()}
            <div className="d-flex align-items-center justify-content-center w-100">
              {item.isFile === 0 ? (
                renderIconFile(item.mimeType)
              ) : (
                <Folder className='feather feather-folder' fontSize={35}/>
              )}
            </div>
          </div>
          <CardBody>
            <div className="content-wrapper">
              <p className="card-text file-name mb-0">{item.title}</p>
              <p className="card-text file-size mb-0">{convertSizeToMB(item.size)}</p>
              <p className="card-text file-date">{item.updatedDate}</p>
            </div>
            <small className="file-accessed text-muted">
              {t("Last Accessed")}: {formatDate(item.lastOpenDate)}
            </small>
          </CardBody>
        </Card>
      ))}
    </Fragment>
  )
}
export default CardFolder
