// ** React Imports
import { Fragment, useContext, useEffect, useState, KeyboardEventHandler} from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Label, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { WebLinkContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useChannelList } from './hook'
import { IFDataWebLink } from '@src/domain/models/IWebLink'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import { notificationError, notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'
import CreatableSelect from "react-select/creatable"

const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { setParentWebLink, openModal, handleModal, setDataItem, dataItem, typeModal, groupAssignedTo, parentWebLink, breadCrumb } = useContext(WebLinkContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addWebLinkApi,
    editWebLinkApi
  } = useChannelList()


  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("WebLink Code") + t(" is required")))
      .max(50, (t("WebLink Code") + t(" must less than 255 characters")))
      .min(1, (t("WebLink Code") + t(" must greater than 2 characters"))),
    name: yup.string()
      .required(t("WebLink Name") + t(" is required"))
      .max(255, t("WebLink Name") + t(" must less than 255 characters"))
      .min(1, (t("WebLink Name") + t(" must greater than 2 characters"))),
    note: yup
      .string()
      .max(1000, (t("Note") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataWebLink = {
    id: "",
    code: "",
    name: "",
    fullName: undefined,
    description: "",
    image: undefined,
    image2: undefined,
    image3: undefined,
    web: undefined,
    url: undefined,
    groupWebLinkId: groupAssignedTo?.value,
    parentWebLinkId: parentWebLink?.value,
    parentWebLinkName: parentWebLink?.label,
    groupWebLinkCode: undefined,
    groupWebLinkName: undefined,
    displayOrder: 0,
    status: 1,
    createdBy: undefined,
    createdByName: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedByName: undefined,
    updatedDate: undefined,
    keywords: ""
  }
  const components = {
    DropdownIndicator: null
  }
  const createOption = (label: string) => ({
    label,
    value: label
  })
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) {
      return
    }
    switch (event.key) {
    case "Enter":

    case "Tab":
      setValueTag((prev: any) => [...prev, createOption(inputValue)])
      setInputValue("")
      event.preventDefault()
    }
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataWebLink>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [inputValue, setInputValue] = useState<any>("")
  const [valueTag, setValueTag] = useState<any>([])
  const optionStatus = [
    {
      value: 1,
      label: t("Active")
    },
    {
      value: 0,
      label: t("Inactive")
    }
  ]
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])


  const handleFormOpened = () => {
    if (!isObjEmpty(dataItem) && typeModal === 'Edit') {
      const lstTags: any[] = []
      const result = dataItem?.keywords ? dataItem?.keywords?.split(",") : []
      result?.map((x: any) => {
        lstTags.push({ value: x, label: x })
      })
      setValueTag(lstTags)
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          if (name.includes("Date") || name.includes("date")) {
            setValue(name, value ? new Date(value) : undefined)
          }
          if (name === "jsonData") {
            setValue(name, value ? JSON.parse(value) : [])
          } else {
            setValue(name, value)
          }
        }
      )
    } else if ( 
      parentWebLink?.value && typeModal === 'Add'
    ) {
      reset()
      setValue("parentWebLinkId", parentWebLink?.value)
      setValue("parentWebLinkName", parentWebLink?.label)
    } else if ( 
      breadCrumb.length > 1 && typeModal === 'Add'
    ) {
      reset()
      const last = breadCrumb[breadCrumb.length - 1]
      if (last?.id) {
        setValue("parentWebLinkId", last?.id)
      }
      if (last?.title) {
        setValue("parentWebLinkName", last?.title)
      }
    } else {
      reset()
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
    reset()
    setDataItem({})
    setParentWebLink({})
    setValueTag("")

  }
  
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
    clearErrors()
    reset()
    setDataItem({})
    setParentWebLink({})
    setValueTag("")
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (typeModal === 'Edit' || typeModal === 'Add') {
      return (
        <Fragment>
          <Button color="primary" className="mb-75 me-1">
            {t('Save')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button color="primary" className="mb-75 me-1" onClick={handleModal}>
            {t('Delete')}
          </Button>
          <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
            {t('Close')}
          </Button>
        </Fragment>
      )
    }
  }

  const onSubmit = (data: any) => {
    const obj = {...data}
    obj.keywords = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    obj.jsonData = JSON.stringify(obj.jsonData)
    obj.groupWebLinkId = groupAssignedTo?.value
    if (typeModal === 'Add') {
      addWebLinkApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t('Add Successful'))
          } else {
            rs.errors.forEach((element: any) => {
              setError(
                element.propertyName.toLowerCase(),
                { type: 'custom', message: t(element.errorMessage) }
              )
            })
            notificationError(t("Add Fails"))
          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editWebLinkApi(obj).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t("Update Successful"))
          } else {
            rs.errors.forEach((element: any) => {
              setError(
                element.propertyName.toLowerCase(),
                { type: 'custom', message: t(element.errorMessage) }
              )
            })
            notificationError(t("Update Fails"))
          }
        })
        .catch((ex) => console.log(ex))
    }
  }

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-xl'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title="WebLink" />
        <Scrollbars autoHide
          autoHeight
          autoHeightMax={windowSize.innerHeight - 180}>
          <ModalBody>
            <div>
              <Row className="m-0 gy-1 mb-2 me-1">
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='code'
                    label={t('WebLink Code')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.code}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('WebLink Name')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='parentWebLinkName'
                    label={t('Parent')}
                    disabled={true}
                    labelSize='d-flex form-row-inline label-medium'
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='image'
                    label={t('Image')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='image2'
                    label={t('Image 2')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='image3'
                    label={t('Image 3')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='url'
                    label={t('Url')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium'/>
                </Col>
                <Col md={12} xs={12}>
                  <div className="d-flex form-row-inline label-medium">
                    <Label className="form-label">{t("Keyword")}</Label>
                    <div className="form-input-content">
                      <CreatableSelect
                        components={components}
                        inputValue={inputValue}
                        isClearable
                        classNamePrefix="select"
                        className="react-select"
                        isMulti
                        menuIsOpen={false}
                        onChange={(newValue) => setValueTag(newValue)}
                        onInputChange={(newValue) => {
                          setInputValue(newValue)
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder=""
                        value={valueTag}
                      />
                    </div>
                  </div>
                </Col>

                
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='description'
                    type='textarea'
                    row={3}
                    disabled={typeModal === 'Detail'}
                    label={t('Description')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.description} />
                </Col>
                
                <Col md={6} xs={6}>
                  <SelectBox
                    control={control}
                    name="status"
                    labelSize='d-flex form-row-inline label-medium'
                    label={t("Status")}
                    disabled={typeModal === 'Detail'}
                    errors={errors.status}
                    placeholder={t("Select")}
                    options={optionStatus}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <TextInput
                    control={control}
                    name='displayOrder'
                    type='number'
                    disabled={typeModal === 'Detail'}
                    label={t('Display order')}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.displayOrder} />
                </Col>

              </Row>
            </div>
          </ModalBody>
        </Scrollbars>
        <div
          className="d-flex justify-content-end p-1"
          style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}
        >
          {renderFooterButtons()}
        </div>
      </Form>
    </Modal>
  )
}

export default ModalComponent
