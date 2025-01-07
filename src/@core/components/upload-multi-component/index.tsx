import { Label, FormFeedback, Input, Button } from "reactstrap"
import classnames from "classnames"
import avatarDefault from '@src/assets/images/avatars/blank.png'
import { useTranslation } from "react-i18next"
import { X } from "becoxy-icons"
import { BASE_URL_CDN } from "@src/domain/constants"
import { useEffect, useState } from "react"

const UploadMultiComponent = ({ name, labelSeize, errors, height, width, disabled, fileList, setFileList, handleUpload, setListAdd, listAdd, handleDelete}: any) => {
  const { t } = useTranslation()
  const [disabledUpload, setDisabledUpload] = useState<boolean>(true)

  const handleFileChange = (e: any) => {
    setFileList((old:any) => [...old, e.target.files[0]])
    if (setListAdd) {
      setListAdd((old:any) => [...old, e.target.files[0]])
    }
  }

  useEffect(() => {
    if (listAdd && listAdd.length > 0) {
      setDisabledUpload(false)
    } else {
      setDisabledUpload(true)
    }
  }, [listAdd])

  const files = fileList ? [...fileList] : []

  const remove = (a:any) => {
    const i = fileList.filter((c:any) => c !== a)
    setFileList(i)
    setListAdd(i)
    if (a?.id && handleDelete) {
      handleDelete(a?.id)
    }
  }
  return (
    <>
      <div
        className={classnames({
          [labelSeize]: labelSeize,
          'form-row-inline-error': errors
        })}
      >
        {labelSeize?.includes('d-flex form-row-inline') ? <Label className="form-label" for={name}> </Label> : <></>}
        <div className='form-input-content'>
          <div className='d-flex align-items-end mt-75'>
            {disabled ? <></> : <div className="d-flex align-items-center mb-75 ">
              <Button tag={Label} className="me-75" size="sm" color="info" disabled={disabledUpload} onClick={() => {
                if (handleUpload) { handleUpload() }
              }}>
                {t('Upload')}
              </Button>
              <Button tag={Label} className='me-75' size='sm' color='primary'>
                {t('selectImage')}
                <Input type='file' onChange={handleFileChange} hidden accept='image/*'/>
              </Button>
              <p className='mb-0'>{t('Allowed jpg, gif or png')}</p>
              {/* <p className='mb-0'>{t('Allowed JPG, GIF or PNG. Max size of 800kB')}</p> */}
            </div>
            }
          </div>
          <div className='d-flex'>
            {files.map((file: any, i: any) => (
              <div className='me-25 position-relative img-wrap' key={i}>
                <span className="position-absolute b-1 btn-remove" onClick={() => remove(file)}><X fontSize={15} color='red' strokeWidth={5}/></span>
                <div className='rounded me-50 border' style={{ overflow: 'Hidden' }}>
                  <img
                    src={file ? (file?.path ? (`${BASE_URL_CDN}/${file?.path}`) : URL.createObjectURL(file)) : avatarDefault}
                    width={width}
                    height={height}
                    style={{objectFit: 'contain'}}
                  />
                </div>
              </div>
            ))}

          </div>
          {errors && <FormFeedback>{errors?.message}</FormFeedback>}
        </div>
      </div>
    </>
  )
}
export default UploadMultiComponent