import { statusDefault, statusObjDefault } from "@src/domain/constants/constantSelect"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "reactstrap"
import { Link } from 'react-router-dom'

const objStatus = statusDefault.reduce((a: any, v: any) => ({ ...a, [v.value]: v.label}), {})

const statusTemplate = (props: any) => {
  return (
    <Badge className='text-capitalize' color={statusObjDefault[props.status]} pill>
      {objStatus[props.status]}
    </Badge>
  )
}
const headerTemplate = (props: any) => {
  const {t} = useTranslation()
  return (
    <Fragment>
      {t(props.headerText)}
    </Fragment>
  )
}
const headerTemplateName = (props: any) => {
  const {t} = useTranslation()
  const newTo = { 
    pathname: "/weblink"
  }
  const myData = {
    id: props.id,
    name: props.name
  }
  return (
    <div className='url'>
      <Link to={newTo} state={myData}>{t(props.name)}</Link>
    </div>
  )
}
export const headerColumns = [
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: 'WebLink Code',
    visible: true,
    width: '100',
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'name',
    headerText: 'WebLink Name',
    visible: true,
    minWidth: '300',
    width: '350',
    maxWidth: '400',
    headerTemplate,
    template: headerTemplateName
  },
  {
    isPrimaryKey: true,
    field: 'description',
    headerText: 'Description',
    clipMode: "EllipsisWithTooltip",
    visible: true,
    minWidth: '300',
    width: '350',
    maxWidth: '400',
    headerTemplate
  },
  {
    isPrimaryKey: false,
    field: 'status',
    headerText: 'Trạng thái',
    template: statusTemplate,
    visible: true,
    width: '100',
    headerTemplate
  }

]
export const sortColumns = [
  {
    isPrimaryKey: true,
    field: 'key',
    headerText: "WebLink Code",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'label',
    headerText: "WebLink Name",
    visible: true,
    width: 100,
    maxWidth: 120,
    minWidth: 80,
    headerTemplate
  }
]