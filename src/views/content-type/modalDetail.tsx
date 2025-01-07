// ** React Imports
import { Fragment, useContext } from "react"
import { Modal, ModalBody, Button } from "reactstrap"
import "@styles/react/libs/editor/editor.scss"
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from "react-i18next"
import { ContentTypeContext } from "./useContext"
import ModalHeader from "@components/modal-header"
import moment from "moment"
import themeConfig from "@src/configs/themeConfig"

const ModalDetail = () => {
  const { t } = useTranslation()
  const {
    openModalDetail,
    handleModalDetail,
    windowSize,
    dataItem
  } = useContext(ContentTypeContext)

  const handleFormOpened = () => {}

  const handleModalDetailClosed = () => {}

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

  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      toggle={handleModalDetail}
      className="modal-dialog-centered modal-lg modal-detail"
      contentClassName="p-0"
      onOpened={handleFormOpened}
      onClosed={handleModalDetailClosed}
    >
      <ModalHeader
        handleModal={handleModalDetail}
        typeModal="View"
        title="Content Type"
      />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMax={windowSize.innerHeight - 180}
      >
        <ModalBody>
          <div className="row-detail">
            <span className="row-detail__label">
              {t("Content type code")}:
            </span>

            <p className="row-detail__content">{dataItem.code}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">
              {t("Content type name")}:
            </span>

            <p className="row-detail__content">{dataItem.name}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Description")}:</span>

            <p className="row-detail__content">{dataItem.description}</p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Status")}:</span>

            <p className="row-detail__content">
              {dataItem.status === 1 ? t("Active") : t("Inactive")}
            </p>
          </div>
          <div className="row-detail">
            <span className="row-detail__label">{t("Display order")}:</span>

            <p className="row-detail__content">{dataItem.displayOrder}</p>
          </div>
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
