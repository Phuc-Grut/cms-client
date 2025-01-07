import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"
import { userAction, userSubject } from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import { useAbility } from "@casl/react"
import { AbilityContext } from "@utils/context/Can"
//--------------------------------------------
import { NewsContext } from "./useContext"
import { ITypeModal } from "@src/domain/models"
import Table from "./table"
import ModalComponent from "./modal"
import ModalDetail from "./modalDetail"
import ModalDuplicate from "./modalDuplicate"
const NewsPage = () => {
  const { t } = useTranslation()
  const ability = useAbility(AbilityContext)
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ITypeModal>("")
  const [dataItem, setDataItem]: any = useState({})
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [openModalDuplicate, setOpenModalDuplicate] = useState(false)
  const [optionGrCategory, setOptionGrCategory] = useState([])
  const [valueTag, setValueTag] = useState<any>([])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }
  const handleModalDuplicate = () => {
    setOpenModalDuplicate(!openModalDuplicate)
  }

  return (
    <Fragment>
      <Helmet>
        <title>{t("Hỏi đáp")}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.NEWS) ? (
        <NewsContext.Provider
          value={{
            windowSize,
            openModal,
            handleModal,
            typeModal,
            setTypeModal,
            dataItem,
            setDataItem,
            openModalDetail,
            setOpenModalDetail,
            handleModalDetail,
            openModalDuplicate,
            setOpenModalDuplicate,
            handleModalDuplicate,
            optionGrCategory,
            setOptionGrCategory,
            valueTag,
            setValueTag
          }}
        >
          <div className="todo-application">
            <Table></Table>
            <ModalComponent />
            <ModalDetail />
            <ModalDuplicate />
          </div>
        </NewsContext.Provider>
      ) : (
        <NotPermission />
      )}
    </Fragment>
  )
}

export default NewsPage
