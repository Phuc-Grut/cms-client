
import { Edit, Info, Plus, X} from "becoxy-icons"
import {useTranslation} from "react-i18next"

const ModalHeader = (props: any) => {
  // ** Props
  const { title, handleModal, typeModal } = props
  const { t } = useTranslation()


  const handleModalIcon = () => {
    if (typeModal === 'Edit' || typeModal === 'Approval') {
      return <Edit fontSize={17} className='me-1'/>
    } else if (typeModal === 'View') {
      return <Info fontSize={17} className='me-1'/>
    } else if (typeModal === 'Order') {
      return <span className="e-icons e-sorting-1 me-1" style={{fontSize: '14px'}}></span>
    } else if (typeModal === 'Process') {
      return <span className="e-flat e-icons e-paste-match-destination me-1" style={{fontSize: '14px'}}></span>
    } else {
      return <Plus fontSize={17} className='me-1'/>
    }
  }

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>
        {handleModalIcon()} {t(title)}
      </h5>
      <div className='todo-item-action d-flex align-items-center'>
        <X
          className='fw-normal mt-25 cursor-pointer'
          fontSize={20}
          onClick={handleModal}
        />
      </div>
    </div>
  )
}

export default ModalHeader