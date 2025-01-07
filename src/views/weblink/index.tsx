import { Fragment, useState } from "react"
import { WebLinkContext } from "./useContext"
import TableTheme from "./table"
import ModalComponent from "./modal"
import {Helmet} from "react-helmet"
import {useTranslation} from "react-i18next"
import ModalDetail from "./modalDetail"
import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import {ITypeModal} from "@src/domain/models"

const WebLink = () => {
  const ability = useAbility(AbilityContext)
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const { t } = useTranslation()
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [groupAssignedTo, setGroupAssignedTo] = useState()
  const [breadCrumb, setBreadCrumb] = useState<any>([])
  const [parentWebLink, setParentWebLink] = useState()
  const [parentWebLinkIdQuery, setParentWebLinkIdQuery] = useState()
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t('WebLink')}</title>
      </Helmet>
      {ability.can(userAction.ADD, userSubject.WebLinkList) ? (
        <WebLinkContext.Provider value={{openModal, handleModal, dataItem, setDataItem, typeModal, groupAssignedTo, setGroupAssignedTo, setTypeModal, parentWebLink, setParentWebLink, parentWebLinkIdQuery, setParentWebLinkIdQuery, openModalDetail, setOpenModalDetail, handleModalDetail, windowSize, setWindowSize, breadCrumb, setBreadCrumb}} >
          <div className="app-user-list">
            <TableTheme />
            <ModalComponent />
            <ModalDetail/>
          </div>
        </WebLinkContext.Provider>
      ) : (
        <NotPermission />
      )}

      
    </Fragment>
  )
}
export default WebLink