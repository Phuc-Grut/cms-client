import { Controller } from "react-hook-form"
import {Input, Label} from "reactstrap"
import classnames from "classnames"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"

interface IRadioOptions {
  value: any,
  label: string
}

interface IFFormInput {
  control: any,
  name: string,
  label: string,
  labelSize: string,
  height?: number | string,
  disabled?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  radioOptions: IRadioOptions[]
}
const RadioInput = (props: IFFormInput) => {
  const { t } = useTranslation()
  const { control, name, label, labelSize, isLabel, radioOptions, inLine } = props

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{label}</Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Fragment>
              {radioOptions?.map((item: IRadioOptions, index:number) => {
                return (
                  <Fragment key={index}>
                    <Input
                      type="radio"
                      className="me-1"
                      style={{marginLeft: index === 0 ? '0px' : '50px'}}
                      checked={value === item.value}
                      onChange={() => onChange(item.value)} />
                    {t(item.label)}
                  </Fragment>
                )
              })}
            </Fragment>
          )}
        />
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize
        }, inLine === false ? 'form-group ' : 'form-row-inline d-flex'
        )}
      >
        {renderLabel()}
        <div className={classnames('form-input-content', {'hidden-label': isLabel === false})}>

          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

export default RadioInput