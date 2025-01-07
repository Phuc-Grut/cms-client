import { Label } from "reactstrap"
import classnames from "classnames"
import avatarDefault from "@src/assets/images/avatars/no-image.jpg"
import { CDN_URL_VIEW } from "@src/domain/constants"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
//import { useState } from "react"

type Props = {
  labelSize?: any
  height?: number
  width?: number
  image: string
  isLabel?: boolean
  inLine?: boolean
  label?: string
  styleLabel?: any
  styleImage?: any
  defaultImage?: any
}

const AvatarViewComponent = ({
  styleImage,
  styleLabel,
  labelSize,
  height,
  width,
  image,
  isLabel,
  label,
  inLine,
  defaultImage
}: Props) => {
  const renderLabel = () => {
    const { t } = useTranslation()
    return (
      <Fragment>
        {isLabel === false ? (
          ""
        ) : (
          <Label className="form-label" for={""}>
            {t(label ? label : "")}
          </Label>
        )}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <div
          className="box-image-preview me-1 p-25 mb-75 rounded border border-1 d-flex justify-content-center align-items-center"
          style={{ width, height }}
        >
          <img
            className="rounded border border-1"
            alt="Generic placeholder image"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            src={
              !image || image === "" ? defaultImage ? defaultImage : avatarDefault : image.startsWith("http") ? image : `${CDN_URL_VIEW}/${image}`
            }
          />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div
        className={classnames(
          " align",
          {
            [labelSize ? labelSize : ""]: labelSize
          },
          inLine === false ? "form-group " : "form-row-inline d-flex"
        )}
        style={styleLabel}
      >
        {renderLabel()}
        <div
          className={classnames("form-input-content", {
            "hidden-label": isLabel === false
          })}
          style={{ ...styleImage, position: "relative", zIndex: 10 }}
        >
          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}
export default AvatarViewComponent
