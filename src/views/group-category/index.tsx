import {Fragment, useEffect, useState} from 'react'
import {Helmet} from "react-helmet"
import { GroupCategoryContext } from './useContext'
import Table from './table'
import ModalComponent from './modal'
import {useTranslation} from "react-i18next"
import {ITypeModal} from "@src/domain/models"
import ModalOrderComponent from './modalOrder'

import {userAction, userSubject} from "@configs/acl/ability"
import NotPermission from "@components/not-permission"
import {useAbility} from "@casl/react"
import {AbilityContext} from "@utils/context/Can"

const title = 'InfomationChannel'

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
  const [optionGroupCategory, setOptionGroupCategory] = useState([])
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
      {ability.can(userAction.ADD, userSubject.InformationChannel) ? (
        <GroupCategoryContext.Provider value={{ openModal,
          handleModal,
          dataItem,
          setDataItem,
          typeModal,
          setTypeModal,
          windowSize,
          openModalOrder,
          handleModalOrder,
          optionGroupCategory,
          setOptionGroupCategory
        }} >
          <div className='app-user-list'>
            <Table />
            <ModalComponent />
            <ModalOrderComponent />
          </div>
        </GroupCategoryContext.Provider>
      ) : (
        <NotPermission />
      )}


    </Fragment>
  )
}
export default BankPage