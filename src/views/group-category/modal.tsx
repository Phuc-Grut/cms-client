// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalBody, Button, Form, Row, Col } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjEmpty } from '@src/utility/Utils'
import { GroupCategoryContext } from './useContext'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import { useGroupCategory } from './hooks'
import { IFDataGroupCategory } from '@src/domain/models/IGroupCategory'
import {TextInput} from '@components/input'
import {SelectBox} from '@components/select'
import { notificationSuccess } from '@components/notifications'
import ModalHeader from '@components/modal-header'


const ModalComponent = () => {
  // ** Props
  const { t } = useTranslation()
  const { openModal, handleModal, dataItem, typeModal } = useContext(GroupCategoryContext)
  // ** States
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const {
    addGroupCategoryApi,
    editGroupCategoryApi,
    checkInit
  } = useGroupCategory()

  // ** States
  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required((t("Group category code") + t(" is required")))
      .max(50, (t("Group category code") + t(" must less than 255 characters")))
      .min(2, (t("Group category code") + t(" must greater than 2 characters"))),
    name: yup.string()
      .required((t("Group category name") + t(" is required")))
      .max(255, t("Group category name") + t(" must less than 255 characters"))
      .min(2, (t("Group category name") + t(" must greater than 2 characters"))),
    description: yup
      .string()
      .max(500, (t("Description") + t(" must less than 500 characters")))
  })

  const defaultValues: IFDataGroupCategory = {
    id: "",
    name: "",
    code: "",
    title:"",
    displayOrder: 0,
    description: "",
    image: undefined,
    logo: undefined,
    logo2: undefined,
    favicon: undefined,
    url: undefined,
    tag: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    facebook: undefined,
    youtube: undefined,
    zalo: undefined,
    status: 1,
    createdBy: undefined,
    createdByName: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedByName: undefined,
    updatedDate: undefined
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IFDataGroupCategory>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(formSchema)
  })
  const [windowSize, setWindowSize] = useState(getWindowSize())
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

  // ** Function to run when sidebar opens
  const handleFormOpened = () => {
    if (!isObjEmpty(dataItem)) {
      Object.entries(dataItem).forEach(
        ([name, value]: any) => {
          if (name.includes("Date") || name.includes("date")) {
            setValue(name, value ? new Date(value) : undefined)
          } else {
            setValue(name, value)
          }
        }
      )
    } else {
      reset()
    }
  }

  // ** Function to run when sidebar closes
  const handleFormClosed = () => {
    clearErrors()
  }
  
  // ** Function to reset fileds
  const handleCancel = () => {
    handleModal()
  }


  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button disabled={checkInit} color="primary" className="mb-75 me-1">
          {t('Save')}
        </Button>
        <Button color="secondary" onClick={handleCancel} outline className="mb-75 me-1">
          {t('Close')}
        </Button>
      </Fragment>
    )
  }


  const onSubmit = (data: any) => {
    if (typeModal === 'Add') {
      addGroupCategoryApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t('Add Successful'))
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }

          }
        })
        .catch((ex) => console.log(ex))
    } else {
      editGroupCategoryApi(data).unwrap()
        .then((rs) => {
          if (rs.isValid === true) {
            handleModal()
            notificationSuccess(t("Update Successful"))
          } else {
            for (let i = 0; i < rs.errors.length; i++) {
              setError(
                rs.errors[i].propertyName.toLowerCase(),
                { type: 'custom', message: t(rs.errors[i].errorMessage) }
              )
            }

          }
        })
        .catch((ex) => console.log(ex))
    }
  }
  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg'
      contentClassName='p-0'
      onOpened={handleFormOpened}
      onClosed={handleFormClosed}
    >
      <Form id='form-modal-globalzone' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader handleModal={handleModal} typeModal={typeModal} title='InfomationChannel' />
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
                    label={t('InfomationChannelCode')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.code} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='name'
                    label={t('InfomationChannelName')}
                    disabled={typeModal === 'Detail'}
                    required={true}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.name} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='title'
                    label={t('Group Title')}
                    disabled={typeModal === 'Detail'}
                    required={false}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.title} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='image'
                    label={t('Image')}
                    disabled={typeModal === 'Detail'}
                    required={false}
                    labelSize='d-flex form-row-inline label-medium'
                    errors={errors.image} />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='logo'
                    label={t('Logo')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='logo2'
                    label={t('Logo2')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='favicon'
                    label={t('Favicon')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='url'
                    label={t('Url')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='tags'
                    label={t('Tags')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='email'
                    label={t('Email')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='phone'
                    label={t('Phone')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='address'
                    label={t('Address')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='facebook'
                    label={t('Facebook')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='youtube'
                    label={t('Youtube')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name='zalo'
                    label={t('Zalo')}
                    disabled={typeModal === 'Detail'}
                    labelSize='d-flex form-row-inline label-medium' />
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
