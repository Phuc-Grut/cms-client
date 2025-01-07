import {
  Fragment,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useState
} from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Col, FormFeedback, Input, Label, Row } from "reactstrap"
import { DropDownTreeComponent } from "@syncfusion/ej2-react-dropdowns"
import CreatableSelect from "react-select/creatable"
import { SelectBox } from "@components/select"
import { TextInput } from "@components/input"
import RickEditorInput from "@components/input/editor-input"
import AvatarUpload from "@components/avatar-upload"
import themeConfig from "@configs/themeConfig"
//--------------------------------------------------
import { MODULECODE } from "@src/domain/constants"
import { useContentCategory } from "@src/views/content-category/hooks"
import { useChannelList } from "@src/views/channel-list/hook"
import { useGroupCategory } from "@src/views/group-category/hooks"
//-------------------------------------------
import AsyncSelectBox from "./asyncSelectBox"
import { useCodeSyntax } from "../../../redux/system/codesyntax/hooks"
import { FAQContext } from "../useContext"
const ModalBodyMain = (props: any) => {
  const { control, errors, setValue } = props
  const isAutoWatch = useWatch({
    control,
    name: "isAuto"
  })
  const { t } = useTranslation()
  const {
    typeModal,
    openModal,
    dataItem,
    setOptionGrCategory,
    optionGrCategory,
    setValueTag,
    valueTag
  } = useContext(FAQContext)

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

  const [optionContentCategory, setOptionContentCategory] = useState([])
  const [selectedGrCate, setSelectedGrCate] = useState<any>([])
  const [inputValue, setInputValue] = useState<any>("")

  const { getCodeSyntaxPagingApi } = useCodeSyntax()
  const { getListComboBoxContentCategoryApi } = useContentCategory()

  const { getCbxCategoryApi } = useChannelList()
  const { getListGroupCategoryApi } = useGroupCategory()

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
      if (optionContentCategory?.length === 0) {
        getListComboBoxContentCategoryApi()
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              setOptionContentCategory(rs)
            }, 10)
          })
          .catch((ex) => {
            console.log(ex)
          })
      }
      if (optionGrCategory?.length === 0) {
        getListGroupCategoryApi({ $status: 1 })
          .unwrap()
          .then((rs) => {
            setTimeout(() => {
              setTimeout(() => {
                setOptionGrCategory([...rs])
              }, 100)
            }, 10)
            if (dataItem.listGroupCategory?.length > 0) {
              const item = dataItem.listGroupCategory?.map((a: any) => {
                return {
                  name: a.value,
                  label: rs.find((b: any) => b.value === a.value)?.label
                }
              })
              setSelectedGrCate(item)
            }
          })
          .catch((ex) => {
            console.log(ex)
          })
      } else {
        if (dataItem.listGroupCategory?.length > 0) {
          const item = dataItem.listGroupCategory?.map((a: any) => {
            return {
              name: a.value,
              label: optionGrCategory.find((b: any) => b.value === a.value)
                ?.label
            }
          })
          setSelectedGrCate(item)
        }
      }
    }
    if (typeModal === "Edit") {
    }
    if (openModal === true && typeModal === "Add") {
      getCodeSyntaxPagingApi({
        $syntaxCode: MODULECODE.CONTENT,
        $status: 0
      })
        .unwrap()
        .then((rs: any) => {
          setValue("code", rs?.code)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
    if (openModal === false) {
      setSelectedGrCate([])
    }
  }, [openModal, dataItem])

  const fieldsProCategory = {
    dataSource: optionContentCategory,
    value: "value",
    text: "name",
    child: "children"
  }

  useEffect(() => {
    if (isAutoWatch === true) {
      setValue("code", null)
      setValue("name", null)
    } else if (typeModal === "Add") {
      getCodeSyntaxPagingApi({
        $syntaxCode: MODULECODE.CONTENT,
        $status: 0
      })
        .unwrap()
        .then((rs: any) => {
          setValue("code", rs?.code)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
  }, [isAutoWatch])

  return (
    <Fragment>
      <div className="box form-box__border">
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
              <Col lg={9} md={9} xs={9}>
                <TextInput
                  control={control}
                  name="code"
                  label={t("Content Code")}
                  disabled={
                    typeModal === "Detail" ||
                    isAutoWatch === 1 ||
                    typeModal === "Edit"
                  }
                  required={true}
                  labelSize="label-medium"
                  placeholder={isAutoWatch === 1 ? t("******") : ""}
                  errors={errors.code}
                />
              </Col>
              <Col lg={3} md={3} xs={3}>
                <div className="d-flex">
                  <div className="form-check me-1">
                    <Controller
                      name="isAuto"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          id="isAuto"
                          type="checkbox"
                          onChange={(val: any) => {
                            onChange(val.target.checked ? 1 : 0)
                          }}
                          checked={value === 1}
                          disabled={typeModal === "Edit"}
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
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
          <Col md={12} xs={12}>
            <TextInput
              control={control}
              name="linkInfo"
              label={t("Link Info")}
              disabled={typeModal === "Detail"}
              required={false}
              labelSize="label-medium d-flex form-row-inline"
              placeholder=""
            />
          </Col>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex form-row-inline label-medium">
              <Label className="form-label">{t("Content Category")}</Label>
              <div className="form-input-content">
                <Controller
                  name="categoryRootId"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <DropDownTreeComponent
                        id="filter"
                        form="categoryRootId"
                        filterBarPlaceholder="Search"
                        cssClass={errors.categoryRootId ? "is-invalid" : ""}
                        allowFiltering={true}
                        value={
                          value === undefined || value === null ? undefined : [value]
                        }
                        placeholder={t("Select")}
                        popupHeight="220px"
                        fields={fieldsProCategory}
                        select={(val: any) => {
                          onChange(val?.itemData?.id)
                          setValue("categoryRoot", val?.itemData?.value)
                        }}
                      />
                    )
                  }}
                />
                {errors.categoryRootId && (
                  <FormFeedback>{errors.categoryRootId?.message}</FormFeedback>
                )}
              </div>
            </div>
          </Col>
          <Col md={12} xs={12}>
            <SelectBox
              control={control}
              name="idGroupCategories"
              labelSize="label-medium d-flex form-row-inline"
              label={t("InfomationChannel")}
              placeholder={t("Select")}
              isClearable={true}
              isMulti={true}
              options={optionGrCategory}
              callback={(val: any) => {
                const arr: any[] = val
                setSelectedGrCate([])
                const list: any[] = []
                arr?.map((id: any) => {
                  list.push({ name: id.value, label: id.label })
                })
                setTimeout(() => {
                  setSelectedGrCate(list)
                }, 100)
              }}
            />
          </Col>
          {selectedGrCate &&
            selectedGrCate?.map((val: any, i: any) => {
              let timeout: any
              return (
                <Fragment key={i}>
                  <Col md={12} xs={12}>
                    <AsyncSelectBox
                      control={control}
                      name={val.name}
                      isMulti
                      label={t(val.label)}
                      isClearable={true}
                      placeholder={t("")}
                      labelSize="label-medium d-flex form-row-inline"
                      loadOptions={(a: any, callback: any) => {
                        const text = a
                        clearTimeout(timeout)
                        timeout = setTimeout(() => {
                          getCbxCategoryApi({
                            $status: 1,
                            $groupCategoryId: val.name,
                            $parentCategoryId: "",
                            $keyword: text
                          })
                            .unwrap()
                            .then((rs: any) => {
                              callback(rs)
                            })
                            .catch(() => {})
                        }, 1500)
                      }}
                    />
                  </Col>
                </Fragment>
              )
            })}
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
          {/* <Col md={12} xs={12}>
            <div className='d-flex form-row-inline label-medium'>
              <Label className='form-label'>{t('Full description')}</Label>
              <div className='form-input-content'>
                { <Editor
                  readOnly={typeModal === 'Detail'}
                  placeholder={t("")}
                  editorState={valueEditorUpdate}
                  onEditorStateChange={data => onChangeContent(data)
                  } /> }
              </div>
            </div>
          </Col> */}
        </Row>
      </div>
    </Fragment>
  )
}

export default ModalBodyMain
