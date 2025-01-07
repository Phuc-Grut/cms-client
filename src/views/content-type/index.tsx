import { Fragment, useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ContentTypeContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import { useTranslation } from "react-i18next"
import { ITypeModal } from "@src/domain/models"
import ModalDetail from './modalDetail'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"

const title = 'Content Type'

const ContentType = () => {
  const { t } = useTranslation()

  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const handleModalDetail = () => {
    setOpenModalDetail(!openModalDetail)
  }
  return (
    <Fragment>
      <Helmet>
        <title>{t(title)}</title>
      </Helmet>
      {ability.can(userAction.OPEN, userSubject.ContentType) ? (
        <ContentTypeContext.Provider value={{ openModal, handleModal, dataItem, setDataItem, typeModal, setTypeModal, windowSize, openModalDetail, handleModalDetail }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalDetail />
          </div>
        </ContentTypeContext.Provider>
      ) : (
        <NotPermission />
      )}


    </Fragment>
  )
}
export default ContentType