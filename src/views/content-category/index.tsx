import { Fragment, useState } from "react"
import { ContentCategoryContext } from "./useContext"
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

const ContentCategory = () => {
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
  const [parentCategory, setParentCategory] = useState()
  const [parentCategoryIdQuery, setParentCategoryIdQuery] = useState()
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
        <title>{t('Content Category')}</title>
      </Helmet>
      {ability.can(userAction.ADD, userSubject["content-category"]) ? (
        <ContentCategoryContext.Provider value={{openModal, handleModal, dataItem, setDataItem, typeModal, groupAssignedTo, setGroupAssignedTo, setTypeModal, parentCategory, setParentCategory, parentCategoryIdQuery, setParentCategoryIdQuery, openModalDetail, setOpenModalDetail, handleModalDetail, windowSize, setWindowSize, breadCrumb, setBreadCrumb}} >
          <div className="app-user-list">
            <TableTheme />
            <ModalComponent />
            <ModalDetail/>
          </div>
        </ContentCategoryContext.Provider>
      ) : (
        <NotPermission />
      )}


    </Fragment>
  )
}
export default ContentCategory