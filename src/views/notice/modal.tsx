import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  KeyboardEventHandler
} from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { Modal, ModalBody, Button, Form, Col, Label, Row } from "reactstrap"
import CreatableSelect from "react-select/creatable"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { checkNull } from "@src/utility/hooks/checkNull"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  editorBeforeUpload,
  editorBeforeView,
  isObjEmpty
} from "@src/utility/Utils"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import { SelectBox } from "@components/select"
import { CheckboxInput, TextInput } from "@components/input"
import RickEditorInput from "@components/input/editor-input"
import ModalHeader from "@components/modal-header"
import AvatarUpload from "@components/avatar-upload"
import themeConfig from "@configs/themeConfig"
//-------------------------------------------
import { MODULECODE } from "@src/domain/constants"
import { useCodeSyntax } from "../../redux/system/codesyntax/hooks"
//-----------
import * as INotice from "@src/domain/models/INotice"
import { IContext, NoticeContext } from "./useContext"
import { useNotice } from "./hooks"
import SelectBox2 from "@components/select/select-2"

const ModalComponent = () => {
  const { t } = useTranslation()
  const {
    openModal,
    handleModal,
    windowSize,
    typeModal,
    dataItem,
    setDataItem,
    setTypeModal,
    setValueTag,
    valueTag
  } = useContext<IContext>(NoticeContext)
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
  const {
    addNoticeApi,
    editNoticeApi,
    getNoticeByIdApi,
    checkInit,
    getCategoryList
  } = useNotice()
  const { getCodeSyntaxPagingApi } = useCodeSyntax()
  const [typeSubmit, setTypeSubmit] = useState(0)
  const [inputValue, setInputValue] = useState<any>("")
  const [categoryList, setCategoryList] = useState<any>([])
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .max(400, t("Name") + t(" must less than 400 characters"))
      .min(2, t("Name") + t(" must greater than 2 characters"))
      .nullable()
  })

  const defaultValues: INotice.IModel = {
    id: "",
    code: "",
    name: "",
    title: "",
    status: 1,
    slug: undefined,
    categoryRoot: "",
    categoryRootId: "",
    shortDescription: "",
    fullDescription: "",
    groupCategories: "",
    categories: "",
    tags: "",
    isAuto: true
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    watch,
    setError,
    formState: { errors }
  } = useForm<INotice.IModel>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(formSchema)
  })
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
  useEffect(() => {
    if (openModal === true) {
      if (categoryList?.length === 0) {
        getCategoryList({})
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              // const lstCategory: any[] = []
              // rs.sort((a: any, b: any) => a.displayOrder - b.displayOrder)?.map(
              //   (x: any) => {
              //     lstCategory.push({
              //       groupCategoryId: x.groupCategoryId,
              //       displayOrder: x.displayOrder,
              //       value: x.id,
              //       label: x.name
              //     })
              //   }
              // )
              setCategoryList(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      } else {
      }
    }
    if (openModal === true && typeModal === "Add") {
      const isAuto = watch("isAuto")
      if (isAuto === true) {
        setValue("code", "")
      } else if (typeModal === "Add") {
        getCodeSyntaxPagingApi({
          $syntaxCode: MODULECODE.GUIDE,
          $status: 0
        })
          .unwrap()
          .then((rs: any) => {
            setValue("code", rs?.code)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
    }
  }, [openModal])

  useEffect(() => {
    const isAuto = watch("isAuto")
    if (isAuto === true) {
      setValue("code", "")
    } else if (typeModal === "Add") {
      getCodeSyntaxPagingApi({
        $syntaxCode: MODULECODE.GUIDE,
        $status: 0
      })
        .unwrap()
        .then((rs: any) => {
          setValue("code", rs?.code)
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  }, [watch("isAuto")])

  useEffect(() => {
    // @ts-ignore
    const firstErrorKey = Object.keys(errors).find((key: any) => errors[key])
    if (firstErrorKey) {
      ;(
        document.querySelector(
          `input[name="${firstErrorKey}"]`
        ) as HTMLInputElement | null
      )?.focus()
      ;(
        document.querySelector(
          `input[form="${firstErrorKey}"]`
        ) as HTMLInputElement | null
      )?.focus()
    }
  }, [errors])

  useEffect(() => {
    let name = watch("name")
    if (typeModal === "Edit" && name === dataItem.name) {
      setValue("slug", dataItem.slug)
    } else {
      setValue("title", name)
      name = name?.toLowerCase()
      name = name?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
      name = name?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      name = name?.replace(/ì|í|ị|ỉ|ĩ/g, "i")
      name = name?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
      name = name?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      name = name?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
      name = name?.replace(/đ/g, "d")
      name = name?.replace(/[^a-zA-Z0-9- ]/g, "")
      name = name?.trim().replace(/ /g, "-")
      clearErrors()
      setValue("slug", name)
    }
  }, [watch("name")])

  const handleModalOpened = () => {
    if (
      !isObjEmpty(dataItem) &&
      (typeModal === "Edit" || typeModal === "Detail")
    ) {
      setTimeout(() => {
        const lstTags: any[] = []
        const result = dataItem?.tags ? dataItem?.tags?.split(",") : []
        result?.map((x: any) => {
          lstTags.push({ value: x, label: x })
        })
        setValueTag(lstTags)
        Object.entries(dataItem).forEach(([name, value]: any) => {
          if (
            name !== null &&
            // name !== "listCategory" &&
            name !== "listGroupCategory"
          ) {
            setValue(name, value)
            if (name === "fullDescription") {
              setValue(name, editorBeforeView(value))
            }

            if (name.includes("Date") || name.includes("date")) {
              setValue(name, checkNull(value) ? new Date(value) : undefined)
            }
          }
        })
      }, 200)
    } else {
      reset()
    }
  }
  useEffect(() => {
    if (openModal === true) {
      handleModalOpened()
    }
  }, [dataItem, openModal])

  const handleModalClosed = () => {
    clearErrors()
    setDataItem({})
    reset()
    setValueTag("")
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        {(typeModal === "Add" || typeModal === "Edit") && (
          <Button
            disabled={checkInit}
            color="primary"
            className="add-todo-item me-1"
          >
            <div
              onClick={() => {
                setTypeSubmit(0)
              }}
            >
              {t("Save")}
            </div>
          </Button>
        )}
        {(typeModal === "Add" || typeModal === "Edit") && (
          <Button
            disabled={checkInit}
            color="primary"
            className="add-todo-item me-1"
          >
            <div
              onClick={() => {
                setTypeSubmit(1)
              }}
            >
              {t("Save and continue")}
            </div>
          </Button>
        )}
        <Button color="secondary" onClick={handleModal} outline>
          {t("Close")}
        </Button>
      </Fragment>
    )
  }

  const renderError = (rs: any) => {
    for (let i = 0; i < rs?.errors.length; i++) {
      const string = rs?.errors[i].errorMessage
        ?.split(" ")
        .reduce(
          (accumulator: string, currentValue: any) => `${accumulator} ${t(currentValue)}`,
          ""
        )
      setError(rs?.errors[i].propertyName.toLowerCase(), {
        type: "custom",
        message: string
      })
    }
  }
  const removeEmpty = (data: any) => {
    const entries = Object.entries(data).filter(([, value]) => value !== null)
    const clean: any = entries.map(([key, v]) => {
      return [key, v]
    })
    return Object.fromEntries(clean)
  }

  const onSubmit = (_data: any) => {
    const data: any = removeEmpty(_data)
    let lstIdCategories: any[] = []
    if (_data.listCategory && _data.listCategory?.length > 0) {
      const c = _data.listCategory?.map((a: any) => a.value)
      lstIdCategories = c
    }
    data.tags = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""
    const obj = {
      ...data,
      fullDescription: editorBeforeUpload(data.fullDescription),
      ListIdCategories: lstIdCategories
    }

    if (typeModal === "Add") {
      if (typeSubmit === 0) {
        addNoticeApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModalClosed()
              handleModal()
              notificationSuccess(t("Add Successful"))
            } else {
              renderError(rs)
              notificationError(t("Add Fails"))
            }
          })
          .catch((ex) => console.log(ex))
      } else if (typeSubmit === 1) {
        addNoticeApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              clearErrors()
              getNoticeByIdApi(rs?.id)
                .unwrap()
                .then((rsP) => {
                  setTimeout(() => {
                    if (
                      rsP?.listGroupCategory &&
                      rsP?.listGroupCategory.length > 0
                    ) {
                      const l = rsP?.listGroupCategory.map((obj: any) => {
                        rsP[obj.value] = rsP?.listCategory?.filter(
                          (d: any) => d.groupCategoryId === obj.value
                        )
                        return obj.value
                      })
                      rsP.idGroupCategories = l
                    } else {
                      rsP.idGroupCategories = []
                    }
                    setDataItem(rsP)
                    setTypeModal("Edit")
                  }, 100)
                })
              notificationSuccess(t("Add Successful"))
            } else {
              renderError(rs)
              notificationError(t("Add Fails"))
            }
          })
          .catch((ex) => console.log(ex))
      }
    } else {
      if (typeSubmit === 0) {
        editNoticeApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModal()
              notificationSuccess(t("Edit Successful"))
            } else {
              renderError(rs)
              notificationError(t("Edit Fails"))
            }
          })
          .catch((ex) => console.log(ex))
      } else if (typeSubmit === 1) {
        editNoticeApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              setTypeModal("Edit")
              notificationSuccess(t("Edit Successful"))
            } else {
              renderError(rs)
              notificationError(t("Edit Fails"))
            }
          })
          .catch((ex) => console.log(ex))
      }
    }
  }

  return (
    <Modal
      isOpen={openModal}
      toggle={handleModal}
      className="modal-dialog-centered modal-xl modal-tabs"
      contentClassName="p-0"
      //onOpened={handleModalOpened}
      onClosed={handleModalClosed}
      keyboard={false}
      backdrop="static"
      scrollable
    >
      <Form
        id="form-modal-tenants"
        className="todo-modal modal-form-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader
          handleModal={handleModal}
          typeModal={typeModal}
          title="Content"
        />
        <Scrollbars
          autoHide
          universal
          autoHeight
          autoHeightMin={400}
          autoHeightMax={windowSize.innerHeight - 180}
        >
          <ModalBody className="p-1">
            <section>
              <Row className="gy-1">
                <Col lg={4} md={4} xs={12}>
                  <AvatarUpload
                    image={dataItem.image}
                    name="image"
                    height={100}
                    width={100}
                    labelSize="label-medium"
                    callback={(val: any) => setValue("image", val)}
                  />
                </Col>

                <Col lg={4} md={4} xs={12}>
                  <Row className="gy-1 mb-1">
                    <Col lg={typeModal === "Add" ? 10 : 12} md={10} xs={10}>
                      <TextInput
                        control={control}
                        name="code"
                        label={t("Content Code")}
                        required={true}
                        labelSize="label-medium"
                        placeholder={
                          watch("isAuto") ? t("AutomaticGeneration") : t("Content Code")
                        }
                        disabled={watch("isAuto") || typeModal === "Edit"}
                        errors={errors.code}
                      />
                    </Col>
                    {typeModal === "Add" && (
                      <Col lg={2} md={2} xs={2}>
                        <CheckboxInput
                          control={control}
                          name="isAuto"
                          label=""
                          labelSize=""
                          reverse={true}
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <Row className="gy-1 mb-1">
                    <Col md={12} xs={12}>
                      <SelectBox
                        control={control}
                        name="status"
                        label={t("Status")}
                        labelSize="label-small"
                        disabled={typeModal === "Detail"}
                        errors={errors.status}
                        required={true}
                        placeholder={t("Select")}
                        options={optionStatus}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="name"
                    label={t("Content Name")}
                    disabled={typeModal === "Detail"}
                    required={true}
                    labelSize="label-medium d-flex form-row-inline"
                    placeholder=""
                    errors={errors.name}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="slug"
                    label={t("Slug")}
                    disabled={typeModal === "Detail"}
                    labelSize="d-flex form-row-inline label-medium"
                  />
                </Col>

                <Col lg={12} md={12} xs={12}>
                  <SelectBox2
                    control={control}
                    name="listCategory"
                    labelSize="label-medium d-flex form-row-inline"
                    label={t("Category")}
                    placeholder={t("Select")}
                    isClearable={true}
                    isMulti={true}
                    options={categoryList}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="shortDescription"
                    type="textarea"
                    label={t("Short description")}
                    labelSize="label-medium d-flex form-row-inline"
                    placeholder=""
                    row={4}
                    disabled={typeModal === "Detail"}
                    errors={null}
                  />
                </Col>
                <Col md={12} xs={12}>
                  <RickEditorInput
                    control={control}
                    name="fullDescription"
                    labelSize="label-medium"
                    label={t("Full description")}
                    placeholder={t("")}
                  />
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <TextInput
                    control={control}
                    name="title"
                    label={t("Title")}
                    disabled={typeModal === "Detail"}
                    labelSize="label-medium d-flex form-row-inline"
                    placeholder=""
                  />
                </Col>
                <Col md={12} xs={12}>
                  <div className="d-flex form-row-inline label-medium">
                    <Label className="form-label">{t("Tags")}</Label>
                    <div className="form-input-content">
                      <CreatableSelect
                        components={components}
                        inputValue={inputValue}
                        isClearable
                        styles={{
                          menuPortal: (base) => ({
                            ...base,
                            zIndex: themeConfig.selectZIndex
                          })
                        }}
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
              </Row>
            </section>
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
