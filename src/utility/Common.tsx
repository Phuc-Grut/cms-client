import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { Badge, Input } from "reactstrap"
import * as Icon from 'becoxy-icons'
import moment from "moment"


const statusObj: any = {
  null: 'light-warning',
  1: 'light-success',
  0: 'light-secondary'
}

const statusTemplate = (props: any) => {
  const { t } = useTranslation()
  return (
    <Badge className='text-capitalize' color={statusObj[props.status]} pill>
      {props.status ? t('Active') : t('Inactive')}
    </Badge>
  )
}

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return (<Fragment>
    {t(props.headerText)}
  </Fragment>)
}

const colorTemplate = (props: any) => {
  return props[props.column.field] ? <Input type="color" value={props[props.column.field]} /> : ''
}
const dateTimeTemplate = (props: any) => {
  return (
    <Fragment>
      {moment(new Date(props[props.column.field])).format('DD/MM/YYYY  HH:mm')}
    </Fragment>
  )
}

const addPeriod = (nStr: any) => {
  if (nStr !== null && nStr !== "" && nStr !== undefined) {
    nStr = Math.round(parseFloat(nStr) * 100) / 100

    nStr += ""
    let x = null
    if (nStr.indexOf(",") >= 0) {
      x = nStr.split(",")
    } else {
      x = nStr.split(".")
    }
    let x1 = x[0]
    const x2 = x.length > 1 && parseInt(x[1]) > 0 ? `${","}${x[1]}` : ""
    const rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `${"$1"}.${"$2"}`)
    }
    const Total = x1 + x2
    return Total
  } else {
    return 0
  }
}

const dateTemplate = (props: any) => {
  return (
    <Fragment>
      {(new Date(props[props.column.field])).toLocaleDateString('en-GB')}
    </Fragment>
  )
}

const convertDate = (date: any) => {
  return (
    <Fragment>
      {(new Date(date)).toLocaleDateString('en-GB')}
    </Fragment>
  )
}

const checkObj: any = {
  false: 'danger',
  true: 'success'
}

const checkTemplate = (props: any) => {
  return (
    <Fragment>
      <Badge className='icon-capitalize p-25' color={checkObj[props[props.column.field]]} pill>
        {props[props.column.field] ? <Icon.Check fontSize={12} /> : <Icon.X fontSize={12} />}
      </Badge>
    </Fragment>
  )
}

const currencyTemplate = (props: any) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props[props.column.field] ? props[props.column.field] : 0)
}

const numberTemplate = (props: any) => {
  return props[props.column.field] === null ? '' : addPeriod(props[props.column.field])
}
const extractContent = (s: any) => {
  const span = document.createElement('span')
  span.innerHTML = s
  return span.textContent || span.innerText
}

export {
  statusTemplate,
  headerTemplate,
  currencyTemplate,
  numberTemplate,
  addPeriod,
  dateTemplate,
  convertDate,
  checkTemplate,
  colorTemplate,
  extractContent,
  dateTimeTemplate
}
