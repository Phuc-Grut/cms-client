import { useEffect, useState } from 'react'
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts"
import * as Chart from '../charts'
import {  columnsNewsContent } from "./columns"
import { useDashboard } from './hook'
import { replaceNumberNullOrUndefined } from '@src/utility/hooks/replaceNumberNullOrUndefined'
import { useTranslation } from 'react-i18next'


const Dashboard = () => {
  const {t} = useTranslation()
  let dashboardObj: any


  const optionContentByType = {
    sizeX: 10,
    sizeY: 4,
    minSizeX: 8,
    minSizeY: 4,
    row: 0,
    col: 0,
    type: 'ColumnTemplate',
    title: t('TopByContentType'),
    data: []
  }

  const optionTopCategory = {
    sizeX: 10,
    sizeY: 6,
    minSizeX: 8,
    minSizeY: 4,
    row: 4,
    col: 0,
    type: 'CardListTemplate',
    title: t('ContentTopCategory'),
    data: []
  }

  const optionTopNewContent = {
    sizeX: 14,
    sizeY: 10,
    minSizeX: 10,
    minSizeY: 6,
    row: 0,
    col: 10,
    type: 'TableTemplate',
    title: t('TopNewContent'),
    columns: columnsNewsContent,
    data: []
  }

  const { 
    getContentByType, 
    getTopCategory, 
    getTopNewContent } = useDashboard()
  const [dataContentByType, setDataContentByType] = useState<any>(optionContentByType)
  const [dataTopCategory, setDataTopCategory] = useState<any>(optionTopCategory)
  const [dataTopNewContent, setDataTopNewContent] = useState<any>(optionTopNewContent)
  useEffect(() => {
    getContentByType().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataContentByType((prevState: any) => ({
              ...prevState,
              data: rs.map((a: any) => ({  x: a?.contentType, y: replaceNumberNullOrUndefined(a?.totalCountByType) }))
            }))
          }, 100)
        }
      })
    getTopCategory().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopCategory((prevState: any) => (
              {
                ...prevState,
                data: rs?.map((a: any) => ({
                  img: a?.image,
                  title: a.name,
                  value: a.contentCount
                }))
              }
            ))
          }, 100)
        }
      })
    getTopNewContent().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopNewContent((prev: any) => (
              {
                ...prev,
                data: rs
              }
            ))
          }, 100)
        }
      })
  }, [])

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const columns = 24
  const [cellAspectRatio] = useState(1)
  const [cellSpacing] = useState([10, 10])
  const mediaQuery = 'max-width: 800px'


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (windowSize.innerWidth < 769) {

      dashboardObj.refresh()
    } else {
      dashboardObj.refresh()
    }
  }, [windowSize])


  const renderContent = (value: any) => {
    //@ts-ignore
    const TagChart = Chart[value.type]
    return (
      <TagChart data={value} />
    )
  }
  const onPanelResize = (args: any) => {
    if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
      try {
        const chartObj = args.element.querySelector('.e-panel-container .e-panel-content div div').ej2_instances[0]
        if (chartObj !== undefined) {
          chartObj.refresh()
          return
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (args.element && args.element.querySelector('.e-panel-container .e-panel-content .template div')) {
      try {
        const cardDiv = args.element.querySelector('.e-panel-container .e-panel-content .template div').ej2_instances[0]
        if (cardDiv !== undefined) {
          cardDiv.refresh()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className='pb-50'>
      <DashboardLayoutComponent
        ref={s => (dashboardObj = s)}
        id='Dashboard'
        cellSpacing={cellSpacing}
        columns={columns}
        cellAspectRatio={cellAspectRatio}
        allowFloating={false}
        mediaQuery={mediaQuery}
        allowResizing={false}
        resizeStop={e => onPanelResize(e)}
        allowDragging={true}
        enablePersistence={false}
      >
        <PanelsDirective>
          <PanelDirective
            row={dataContentByType?.row}
            col={dataContentByType?.col}
            sizeX={dataContentByType?.sizeX}
            sizeY={dataContentByType?.sizeY}
            minSizeX={dataContentByType?.minSizeX}
            minSizeY={dataContentByType?.minSizeY}
            content={() => renderContent(dataContentByType)}>
          </PanelDirective>
          <PanelDirective
            row={dataTopCategory?.row}
            col={dataTopCategory?.col}
            sizeX={dataTopCategory?.sizeX}
            sizeY={dataTopCategory?.sizeY}
            minSizeX={dataTopCategory?.minSizeX}
            minSizeY={dataTopCategory?.minSizeY}
            content={() => renderContent(dataTopCategory)}>
          </PanelDirective>
          <PanelDirective
            row={dataTopNewContent?.row}
            col={dataTopNewContent?.col}
            sizeX={dataTopNewContent?.sizeX}
            sizeY={dataTopNewContent?.sizeY}
            minSizeX={dataTopNewContent?.minSizeX}
            minSizeY={dataTopNewContent?.minSizeY}
            content={() => renderContent(dataTopNewContent)}>
          </PanelDirective>
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  )
}

export default Dashboard
