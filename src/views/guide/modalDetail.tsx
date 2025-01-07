// ** React Imports
import { Fragment, useContext, useEffect } from "react"
import { Modal, ModalBody, Button, Label, Row, Col, Badge } from "reactstrap"
import "@styles/react/libs/editor/editor.scss"
import ModalHeader from "@components/modal-header"
import { GuideContext } from "./useContext"
import { Scrollbars } from "react-custom-scrollbars"
import { useTranslation } from "react-i18next"
import AvatarViewComponent from "@components/avatar-commponent-view"
import { editorBeforeView } from "@src/utility/Utils"
import { useGuide } from "./hooks"
import moment from "moment"
import themeConfig from "@src/configs/themeConfig"
import RickEditor from "@components/editor"

const statusObj: any = {
  0: "warning",
  1: "success",
  2: "secondary",
  3: "danger"
}
const ModalDetail = () => {
  const { t } = useTranslation()
  const statusOptions: any = {
    0: t("Inactive"),
    1: t("Active")
  }
  const {
    openModalDetail,
    handleModalDetail,
    windowSize,
    dataItem,
    typeModal
  } = useContext(GuideContext)
  const {} = useGuide()

  useEffect(() => {
    if (openModalDetail === true) {
    }
  }, [openModalDetail])
  // ** Function to run when sidebar opens
  const handleFormDetailOpened = () => {}

  // ** Function to run when sidebar closes
  const handleModalDetailClosed = () => {}

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <p className="m-0">
              <strong style={{ color: "#5e5873" }}>Ngày tạo:</strong>{" "}
              <span>
                {moment(dataItem.createdDate)
                  .utcOffset("+07:00")
                  .format(themeConfig.system.dateTimeFormat)}
              </span>
              <strong className="ms-2" style={{ color: "#5e5873" }}>
                Người tạo:
              </strong>{" "}
              <span>{dataItem.createdByName}</span>
            </p>
            <p className="m-0">
              {dataItem.updatedDate && (
                <>
                  <strong style={{ color: "#5e5873" }}>Ngày sửa:</strong>{" "}
                  <span>
                    {moment(dataItem.updatedDate)
                      .utcOffset("+07:00")
                      .format(themeConfig.system.dateTimeFormat)}
                  </span>
                </>
              )}
              {dataItem.updatedBy && (
                <>
                  <strong style={{ color: "#5e5873" }} className="ms-2">
                    Người sửa:
                  </strong>{" "}
                  <span>{dataItem.updatedByName}</span>
                </>
              )}
            </p>
          </div>
          <div>
            <Button color="secondary" onClick={handleModalDetail} outline>
              {t("Close")}
            </Button>
          </div>
        </div>
      </Fragment>
    )
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

  const renderGeneralInfomation = () => {
    return (
      <>
        <section>
          <div className="box form-box__border">
            <Row className="gy-1">
              <Col lg={3} md={12} xs={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <AvatarViewComponent
                    height={100}
                    width={100}
                    labelSize="label-medium"
                    image={dataItem.image}
                    isLabel={false}
                    styleLabel={{ borderBottomColor: "white" }}
                  />{" "}
                </div>
              </Col>
              <Col lg={9} md={12} xs={12}>
                <Row className="gy-1 mb-1">
                  <Col lg={6} md={12} xs={12} className="p-0">
                    <div className="d-flex form-row-inline label-medium">
                      <Label className="form-label">{t("Content Code")}</Label>
                      <div className="form-input-content">
                        <p>{dataItem.code}</p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={6} md={12} xs={12}>
                    <div className="d-flex form-row-inline label-medium">
                      <Label className="form-label">{t("Status")}</Label>
                      <div className="form-input-content">
                        <p>
                          <Badge
                            className="text-capitalize"
                            color={statusObj[dataItem.status]}
                            pill
                          >
                            {statusOptions[dataItem.status]}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={12} md={12} xs={12} className="p-0">
                    <div className="d-flex form-row-inline label-medium">
                      <Label className="form-label">{t("Content Name")}</Label>
                      <div className="form-input-content">
                        <p>{dataItem.name}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} md={12} xs={12} className="p-0">
                    <div className="d-flex form-row-inline label-medium">
                      <Label className="form-label">{t("Danh mục")}</Label>
                      <div className="form-input-content">
                        <p>{dataItem.categories}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col lg={12} md={12} xs={12}>
                <div className="d-flex form-row-inline label-medium">
                  <Label className="form-label">{t("Short description")}</Label>
                  <div className="form-input-content">
                    <p>{dataItem.shortDescription}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <RickEditor
                  label={t("Full description")}
                  showToolbar={false}
                  value={editorBeforeView(dataItem.fullDescription)}
                  labelSize={"label-medium"}
                  readonly={true}
                />
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className="d-flex form-row-inline label-medium">
                  <Label className="form-label">{t("Tags")}</Label>
                  <div className="form-input-content">
                    <p>{handleName(dataItem.tags)}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className="d-flex form-row-inline label-medium">
                  <Label className="form-label">{t("Page Title")}</Label>
                  <div className="form-input-content">
                    <p>{dataItem.title}</p>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className="d-flex form-row-inline label-medium">
                  <Label className="form-label">{t("Slug")}</Label>
                  <div className="form-input-content">
                    <p>{dataItem.slug}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </>
    )
  }

  return (
    <Modal
      isOpen={openModalDetail}
      backdrop="static"
      keyboard={false}
      toggle={handleModalDetail}
      className="modal-xl modal-detail"
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
        <ModalBody>{renderGeneralInfomation()}</ModalBody>
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
