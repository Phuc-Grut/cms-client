// ** React Imports
import React, { Fragment, useContext, useEffect, useState } from "react"

// ** Third Party Components
import { Modal, ModalBody, Button, Form } from "reactstrap"
// ** Styles Imports
// import { isObjEmpty } from '@src/utility/Utils'
import { useTranslation } from "react-i18next"
import { IContext, ContentContext } from "./useContext"
import ModalHeader from "@components/modal-header"
import {
  editorBeforeUpload,
  editorBeforeView,
  isObjEmpty
} from "@src/utility/Utils"
import { checkNull } from "@src/utility/hooks/checkNull"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import TabGeneralInfo from "./components/tab-general"
import { IFModelContent } from "@src/domain/models/IContent"

import { MODULECODE } from "@src/domain/constants"
import {
  notificationError,
  notificationSuccess
} from "@components/notifications"
import { useContent } from "./hooks"

const ModalComponent = () => {
  const { t } = useTranslation()
  const {
    openModal,
    handleModal,
    typeModal,
    dataItem,
    setDataItem,
    setTypeModal,
    setValueTag,
    valueTag
  } = useContext<IContext>(ContentContext)

  const { addContentApi, editContentApi, getContentByIdApi, checkInit } =
    useContent()

  const [typeSubmit, setTypeSubmit] = useState(0)

  const formSchema = yup.object().shape({
    // contentTypeId: yup
    //   .string()
    //   .required(t("Content Code") + t(" is required")),
    // code: yup.string().nullable().when(['isAuto'], {
    //   is: (isAuto: number) => (isAuto === 0),
    //   then: yup.string().required(t("Content Code") + t(" is required"))
    //     .max(25, (t("Content Code") + t(" must less than 25 characters")))
    //     .min(2, (t("Content Code") + t(" must greater than 2 characters")))
    // }),
    // name: yup
    //   .string()
    //   .max(400, (t("Content Name") + t(" must less than 400 characters")))
    //   .min(2, (t("Content Name") + t(" must greater than 2 characters"))).nullable()
  })

  const defaultValues: IFModelContent = {
    id: "",
    code: "",
    name: "",
    linkInfo: "",
    status: 1,
    slug: undefined,
    categoryRoot: "",
    categoryRootId: "",
    shortDescription: "",
    fullDescription: "",
    groupCategories: "",
    deleted: false,
    createdBy: undefined,
    createdDate: undefined,
    updatedBy: undefined,
    updatedDate: undefined,
    tags: "",
    isChangeAvata: false,
    isAuto: 0,
    moduleCode: MODULECODE.CONTENT
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
  } = useForm<IFModelContent>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(formSchema)
  })

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
            name !== "listCategory" &&
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
    const cates: any[] = data.idGroupCategories?.map((a: any) => {
      const cate: any[] = data[a]
      if (cate) {
        return cate?.map((c: any) => {
          return { groupCategoryId: a, categoryId: c?.value }
        })
      }
    })
    if (cates && cates?.length > 0) {
      const c = cates?.reduce((a: any, b: any) => a?.concat(b))
      const d = c?.map((a: any, i: any) => ({ ...a, displayOrder: i }))
      data.categories = d
    }
    data.tags = valueTag ? valueTag?.map((val: any) => val.value).toString() : ""

    const obj = {
      ...data,
      fullDescription: editorBeforeUpload(data.fullDescription),
      idGroupCategories: data.idGroupCategories?.toString(),
      categories: data.categories
    }

    if (typeModal === "Add") {
      if (typeSubmit === 0) {
        addContentApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              handleModal()
              notificationSuccess(t("Add Successful"))
            } else {
              renderError(rs)
              notificationError(t("Add Fails"))
            }
          })
          .catch((ex) => console.log(ex))
      } else if (typeSubmit === 1) {
        addContentApi(obj)
          .unwrap()
          .then((rs) => {
            if (rs.isValid === true) {
              clearErrors()
              getContentByIdApi(rs?.id)
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
        editContentApi(obj)
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
        editContentApi(obj)
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
      onOpened={handleModalOpened}
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

        <ModalBody className="p-1">
          <TabGeneralInfo
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
          ></TabGeneralInfo>
        </ModalBody>
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
