import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
import classnames from "classnames"
import { isNullOrUndefined } from "@src/utility/hooks/isNullOrUndefined"
import {Fragment} from "react"
import {useTranslation} from "react-i18next"
import CreatableSelect from "react-select/creatable"
import themeConfig from "@configs/themeConfig"
interface IFCreatableSelectGroup {
  isMulti?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  control: any,
  placeholder?: string,
  name: string,
  options: any[],
  label?: any,
  labelSize?: any,
  required?: boolean,
  errors?: any,
  cssClass?: string,
  isClearable?: boolean,
  labelComponent?: any,
  iconGroup: any,
  handleGroupClick?: any,
  onInputChange?: any,
  callback?: any,
}
const CreatableSelectBoxGroup = (props: IFCreatableSelectGroup) => {
  const { t } = useTranslation()
  const {isMulti, isLabel, control, placeholder, name, options, label, labelSize, required, errors, inLine, isClearable, labelComponent, iconGroup, handleGroupClick, onInputChange, callback, ...rest } = props

  return (
    <Fragment>
      <div
        className={classnames(inLine === false ? 'form-group ' : 'form-row-inline d-flex', 'align', {
          [labelSize ? labelSize : '']: labelSize,
          'form-row-inline-error': errors}
        )}>

        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label)} {required ? <span className="text-danger">*</span> : ''} </Label>}

        <div className={classnames('form-input-content', {'hidden-label': isLabel === false})}>

          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
              
              <Fragment>
                <div className='d-flex select-group'>
                  <CreatableSelect
                    {...rest}
                    value={(!isNullOrUndefined(value) && value !== '' && (isMulti ? value?.length > 0 : true)) ? options.find((val: any) => val.value === value) : ''}
                    onChange={(val: any) => {
                      onChange((val && isMulti) ? val.map((item: any) => item.value) : (val && !isMulti) ? val.value : undefined)
                      if (callback) {
                        callback(val)
                      }
                    }}
                    onInputChange={onInputChange}
                    classNamePrefix="select"
                    className={`react-select ${errors && 'is-invalid'}`}
                    styles={{ menuPortal: base => ({ ...base, zIndex: themeConfig.selectZIndex }) }}
                    options={options}
                    placeholder={placeholder}
                    isMulti={isMulti}
                    isClearable={isClearable}
                    menuPosition="fixed"
                    formatOptionLabel={labelComponent ? labelComponent : undefined}
                  />
                  <span onClick={handleGroupClick} className='input-group-text'>
                    {iconGroup}
                  </span>
                </div>

              </Fragment>)
          
            }
          />
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </Fragment>
  )
}
export default CreatableSelectBoxGroup