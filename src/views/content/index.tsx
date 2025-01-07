import { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { ContentContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from 'react-i18next'
import ModalDetail from "./modalDetail"
import ModalDuplicate from './modalDuplicate'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"
import {ITypeModal} from "@src/domain/models"


const ContentPage = () => {
  const { t } = useTranslation()
  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [windowSize, setWindowSize] = useState(getWindowSize())
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
        <title>{t("Content")}</title>
      </Helmet>
      {ability.can(userAction.ADD, userSubject.Content) ? (
        <ContentContext.Provider value={{
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
        }}>
          <div className='todo-application'>
            <Table></Table>
            <ModalComponent />
            <ModalDetail />
            <ModalDuplicate />
          </div>
        </ContentContext.Provider>
      ) : (
        <NotPermission />
      )}

     
    </Fragment>
  )
}

export default ContentPage