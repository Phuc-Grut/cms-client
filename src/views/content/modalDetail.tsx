// ** React Imports
import { Fragment, useContext, useEffect, useState } from "react"
import {
  Modal, ModalBody, Button,
  Label, Row, Col, Badge
} from "reactstrap"
import "@styles/react/libs/editor/editor.scss"
import ModalHeader from "@components/modal-header"
import { ContentContext } from "./useContext"
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from "react-i18next"
import AvatarViewComponent from "@components/avatar-commponent-view"
import {editorBeforeView} from '@src/utility/Utils'
import { useContent } from "./hooks"
import moment from "moment"
import themeConfig from "@src/configs/themeConfig"
import { useContentType } from "../content-type/hooks"
import { useGroupCategory } from "../group-category/hooks"
import RickEditor from "@components/editor"

const statusObj: any = {
  0: 'warning',
  1: 'success',
  2: 'secondary',
  3: 'danger'
}
const ModalDetail = () => {
  const { t } = useTranslation()
  const statusOptions: any = {
    0: t("Inactive"),
    1: t("Active")
  }
  const {
    openModalDetail, handleModalDetail, windowSize, dataItem, typeModal } = useContext(ContentContext)
  const { 
  } = useContent()
  const { getListContentTypeApi } = useContentType()
  const { getListGroupCategoryApi } = useGroupCategory()
  const [optionContentType, setOptionContentType] = useState<any>([])
  const [optionGrCategory, setOptionGrCategory] = useState<any>([])

  useEffect(() => {
    if (openModalDetail === true) {
      getListContentTypeApi({ $status: 1 }).unwrap()
        .then((rs) => {
          setTimeout(() => {
            setOptionContentType(rs)
          }, 10)
        })
        .catch((ex) => {
          console.log(ex)
        })
      getListGroupCategoryApi({ $status: 1 }).unwrap()
        .then((rs: any) => {
          setTimeout(() => {
            setOptionGrCategory(rs)
          }, 10)

        })
        .catch((ex) => {
          console.log(ex)
        })
    }

  }, [openModalDetail])
  // ** Function to run when sidebar opens
  const handleFormDetailOpened = () => { }

  // ** Function to run when sidebar closes
  const handleModalDetailClosed = () => { }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <div className='d-flex justify-content-between align-items-center w-100'>
          <div>
            <p className='m-0'>
              <strong style={{ color: '#5e5873' }}>Ngày tạo:</strong> <span>{moment(dataItem.createdDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
              <strong className='ms-2' style={{ color: '#5e5873' }}>Người tạo:</strong> <span>{dataItem.createdByName}</span>
            </p>
            <p className='m-0'>
              {dataItem.updatedDate && <>
                <strong style={{ color: '#5e5873' }}>Ngày sửa:</strong> <span>{moment(dataItem.updatedDate).utcOffset('+07:00').format(themeConfig.system.dateTimeFormat)}</span>
              </>}
              {dataItem.updatedBy &&
          <>
            <strong style={{ color: '#5e5873' }} className='ms-2'>Người sửa:</strong> <span>{dataItem.updatedByName}</span>
          </>
              }
            </p>
          </div>
          <div>
            <Button color='secondary' onClick={handleModalDetail} outline>
              {t('Close')}
            </Button>
          </div>
        </div>
      </Fragment>
    )
  }
  const handleContentType = (value: any) => {
    const val = optionContentType.find((x: any) => (x.value === value))
    if (val === undefined || val === null) {
      return ""
    }
    return val.label
  }
  const handleName = (data: any) => {
    if (!data) {
      return ""
    }
    return (
      <div>
        {dataItem?.tags?.split(",").map((x: any) => (
          <Badge key={x} ml-1 className="text-capitalize " color={"warning"}>
            {x}
          </Badge>
        ))}
      </div>
    )
  }
  const handleCategories = (dataItem: any) => {
    if (!dataItem.listGroupCategory) {
      return ''
    }
    return dataItem.listGroupCategory?.map((val: any, i:number) => {
      const label = optionGrCategory.find((x: any) => x.value === val.value)?.label
      const category = dataItem.listCategory?.filter((x: any) => x.groupCategoryId === val.value).map((x: any) => x.label).join(", ")
      return <Col lg={12} md={12} xs={12} key={i}>
        <div className='d-flex form-row-inline label-medium'>
          <Label className='form-label'>{label}</Label>
          <div className='form-input-content'>
            <p>{category}</p>
          </div>
        </div>
      </Col>
    })
  }

  const renderGeneralInfomation = () => {
    return (
      <>
        <section>
          <div className='box form-box__border mb-3 p-2'>
            <h5 className="m-0 form-box__border--title">{t('Content Information')}</h5>
            <Row className='gy-1 mb-1'>
              <Col lg={12} md={12} xs={12}>
                <AvatarViewComponent
                  height={100}
                  width={100}
                  labelSize='label-medium'
                  image={dataItem.image} />
              </Col>
              <Col lg={6} md={6} xs={12}>
                <Row className='gy-1'>
                  <Col lg={12} md={12} xs={12}>
                    <div className='d-flex form-row-inline label-medium'>
                      <Label className='form-label'>{t('Categories')}</Label>
                      <div className='form-input-content'>
                        <p>{handleContentType(dataItem.contentTypeId)}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} md={12} xs={12}>
                    <div className='d-flex form-row-inline label-medium'>
                      <Label className='form-label'>{t('Content Code')}</Label>
                      <div className='form-input-content'>
                        <p>{dataItem.code}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6} xs={12} style={{ paddingRight: "25px" }}>
                <Row className='gy-1 mb-1'>
                  <Col lg={12} md={12} xs={12}>
                    <div className='d-flex form-row-inline label-medium'>
                      <Label className='form-label'>{t('Tags')}</Label>
                      <div className='form-input-content'>
                        <p>
                          {handleName(dataItem.tags)}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className='gy-1 '>
                  <Col lg={12} md={12} xs={12}>
                    <div className='d-flex form-row-inline label-medium'>
                      <Label className='form-label'>{t('Status')}</Label>
                      <div className='form-input-content'>
                        <p>
                          <Badge className='text-capitalize' color={statusObj[dataItem.status]} pill >
                            {statusOptions[dataItem.status]}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='gy-1 mb-1'>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Content Name')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.name}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Slug')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.slug}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Link Info')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.linkInfo}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('InfomationChannel')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.groupCategories}</p>
                  </div>
                </div>
              </Col>
              {handleCategories(dataItem)}
              <Col lg={12} md={12} xs={12}>
                <div className='d-flex form-row-inline label-medium'>
                  <Label className='form-label'>{t('Short description')}</Label>
                  <div className='form-input-content'>
                    <p>{dataItem.shortDescription}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>

                <RickEditor
                  label={t('Full description')}
                  showToolbar={false}
                  value={editorBeforeView(dataItem.fullDescription)}
                  labelSize={'label-medium'}
                  readonly={true}
                />

              </Col>
            </Row>
          </div></section>
      </>
    )
  }
  
  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      keyboard={false}
      toggle={handleModalDetail}
      className='modal-xl modal-detail'
      contentClassName="p-0"
      onOpened={handleFormDetailOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader
        handleModal={handleModalDetail}
        typeModal={typeModal}
        title="Content"
      />
      <Scrollbars
        
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}
      >
        <ModalBody>
          {renderGeneralInfomation()}
        </ModalBody>
      </Scrollbars>
      <div
        className="d-flex justify-content-end p-1"
        style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
      >
        {renderFooterButtons()}
      </div>
    </Modal>
  )
}

export default ModalDetail
