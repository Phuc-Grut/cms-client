import {Fragment, useEffect, useState} from 'react'
import {Helmet} from "react-helmet"
import { GroupWebLinkContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import {useTranslation} from "react-i18next"
import {ITypeModal} from "@src/domain/models"
import ModalOrderComponent from './modalOrder'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"

const title = 'Group WebLink'

const BankPage = () => {
  const { t } = useTranslation()

  const ability = useAbility(AbilityContext)

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [openModal, setOpenModal] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [typeModal, setTypeModal] = useState<ITypeModal>('')
  const [openModalOrder, setOpenModalOrder] = useState(false)
  const [optionGroupWebLink, setOptionGroupWebLink] = useState([])
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
  const handleModalOrder = () => {
    setOpenModalOrder(!openModalOrder)
  }
  return (
    <Fragment>
      <Helmet>
        <title>{t('Catalog')} - {t(title)}</title>
      </Helmet>
      {ability.can(userAction.ADD, userSubject.GroupWebLink) ? (
        <GroupWebLinkContext.Provider value={{ openModal,
          handleModal,
          dataItem,
          setDataItem,
          typeModal,
          setTypeModal,
          windowSize,
          openModalOrder,
          handleModalOrder,
          optionGroupWebLink,
          setOptionGroupWebLink
        }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalOrderComponent />
          </div>
        </GroupWebLinkContext.Provider>
      ) : (
        <NotPermission />
      )}


    </Fragment>
  )
}
export default BankPage