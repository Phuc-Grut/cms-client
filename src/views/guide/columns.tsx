import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import {
  statusDefault,
  statusObjDefault
} from "@src/domain/constants/constantSelect"
import { Badge } from "reactstrap"
import { IGridColumns } from "@src/domain/interfaces/IGridColumns"
import { CDN_URL_VIEW } from "@src/domain/constants"
import { dateTimeTemplate } from "@src/utility/Common"
//import avatarDefault from '@src/assets/images/avatars/no-image.jpg'

const objStatus = statusDefault.reduce(
  (a: any, v: any) => ({ ...a, [v.value]: v.label }),
  {}
)

const statusTemplate = (props: any) => {
  return (
    <Badge
      className="text-capitalize"
      color={statusObjDefault[props.status]}
      pill
    >
      {objStatus[props.status]}
    </Badge>
  )
}

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return <Fragment>{t(props.headerText)}</Fragment>
}

const pictureTemplate = (props: any) => {
  const img: string | null | undefined = props.image
  return (
    <Fragment>
      {img === null || img === undefined || img === "" ? (
        <div></div>
      ) : (
        <>
          {img.startsWith("http") ? (
            <img src={img} height={30} alt="" />
          ) : (
            <img
              src={`${CDN_URL_VIEW}/${img}`}
              height={30}
              onError={(event: any) => {
                event.target.src = ""
              }}
            />
          )}
        </>
      )}
    </Fragment>
  )
}
const filterOptions = { operator: "contains", mode: "Immediate" }
export const headerColumns: IGridColumns[] = [
  {
    isPrimaryKey: false,
    field: "image",
    headerText: "Picture",
    visible: true,
    textAlign: "center",
    width: 70,
    minWidth: 70,
    maxWidth: 70,
    headerTemplate,
    template: pictureTemplate,
    allowFiltering: false
  },
  {
    isPrimaryKey: true,
    field: "name",
    textAlign: "left",
    headerText: "Blog Name",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 250,
    minWidth: 250,
    maxWidth: 400,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "categories",
    headerText: "Catalog",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 150,
    minWidth: 150,
    maxWidth: 180,
    headerTemplate,
    textAlign: "left",
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "shortDescription",
    headerText: "Description",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    headerTemplate,
    textAlign: "left",
    minWidth: 200,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "status",
    headerText: "Status",
    visible: true,
    width: 130,
    minWidth: 130,
    maxWidth: 130,
    headerTemplate,
    template: statusTemplate,
    textAlign: "center",
    type: "string",
    typeFilter: "Checkbox",
    hideOperator: true
  },
  {
    isPrimaryKey: false,
    field: "createdByName",
    headerText: "Created By",
    visible: false,
    width: 110,
    minWidth: 110,
    maxWidth: 110,
    headerTemplate,
    type: "string"
  },
  {
    isPrimaryKey: false,
    field: "createdDate",
    headerText: "Created Date",
    visible: true,
    width: 130,
    minWidth: 130,
    maxWidth: 130,
    headerTemplate,
    type: "string",
    template: dateTimeTemplate
  }
]
