import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import {
  statusDefault,
  statusObjDefault
} from "@src/domain/constants/constantSelect"
import { Badge } from "reactstrap"
import { IGridColumns } from "@src/domain/interfaces/IGridColumns"
import {CDN_URL_VIEW} from "@src/domain/constants"
import { dateTimeTemplate } from "@src/utility/Common"
import avatarDefault from '@src/assets/images/avatars/avatar-blank.png'


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
  const image: string | null | undefined = props.image
  return (
    <Fragment>
      {/*{img === null || img === undefined || img === "" ? (*/}
      {/*  <div></div>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {img.startsWith("http") ? (*/}
      {/*      <img src={img} height={30} />*/}
      {/*    ) : (*/}
      {/*      <img*/}
      {/*        src={`${BASE_URL_CDN}/${img}`}*/}
      {/*        height={30}*/}
      {/*        onError={(event: any) => {*/}
      {/*          event.target.src = ""*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
        <img
          className='rounded'
          alt=''
          style={{width: '30px'}}
          src={(!image || image === '') ? avatarDefault : image.startsWith("http") ? image : `${CDN_URL_VIEW}/${image}`}
        />
      </div>

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
    width: 50,
    minWidth: 40,
    maxWidth: 65,
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
    width: 125,
    minWidth: 100,
    maxWidth: 150,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "contentType",
    headerText: "Content Type",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 75,
    minWidth: 50,
    maxWidth: 100,
    headerTemplate,
    textAlign: "left",
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "categoryRoot",
    headerText: "Catalog",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 75,
    minWidth: 50,
    maxWidth: 100,
    headerTemplate,
    textAlign: "left",
    type: "string",
    filter: filterOptions
  },
  
  {
    isPrimaryKey: false,
    field: "groupCategories",
    headerText: "InfomationChannel",
    visible: true,
    width: 75,
    minWidth: 50,
    textAlign: "left",
    maxWidth: 100,
    headerTemplate,
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "shortDescription",
    headerText: "Description",
    clipMode: "EllipsisWithTooltip",
    visible: true,
    width: 200,
    minWidth: 150,
    maxWidth: 350,
    headerTemplate,
    textAlign: "left",
    type: "string",
    filter: filterOptions
  },
  {
    isPrimaryKey: false,
    field: "status",
    headerText: "Status",
    visible: true,
    width: 75,
    minWidth: 50,
    maxWidth: 100,
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
    width: 75,
    minWidth: 50,
    maxWidth: 100,
    headerTemplate,
    type: "string"
  },
  {
    isPrimaryKey: false,
    field: "createdDate",
    headerText: "Created Date",
    visible: true,
    width: 75,
    minWidth: 50,
    maxWidth: 100,
    headerTemplate,
    type: "string",
    template: dateTimeTemplate
  }
]
