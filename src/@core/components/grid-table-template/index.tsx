import {
  ColumnDirective,
  ColumnsDirective,
  CommandColumn,
  Filter,
  Page,
  PageSettingsModel,
  PagerComponent,
  Pager,
  PagerDropDown,
  Sort,
  GridComponent,
  Toolbar,
  ColumnChooser,
  VirtualScroll,
  Freeze,
  ContextMenu,
  Edit,
  Group,
  EditSettingsModel,
  Inject,
  ExcelExport,
  Search,
  Resize, Aggregate,
  AggregateColumnDirective,
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
  LazyLoadGroup, TextWrapSettingsModel
} from "@syncfusion/ej2-react-grids"
import moment from "moment"
Pager.Inject(PagerDropDown)
import * as React from "react"
import {Fragment, useEffect, memo, useRef} from "react"
// import {Fragment, useEffect, memo, useRef, useState} from "react"
import { ITable } from "@src/domain/models/ITableGrid"
import { useTranslation } from "react-i18next"
import {direction, operator, predicate} from "@src/domain/constants/constantOperator"
import {
  DropDownList,
  MultiSelect,
  CheckBoxSelection,
  DropDownTree
} from "@syncfusion/ej2-react-dropdowns"
import {DataManager} from "@syncfusion/ej2-data"
import {createElement, L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base'
import {MaskedTextBox, TextBox} from "@syncfusion/ej2-inputs"
import {DatePicker, DateRangePicker} from "@syncfusion/ej2-react-calendars"
// import {statusBooks} from "@src/views/hr/insurances/columns"
import themeConfig from "@configs/themeConfig"
import {statusBoolean} from "@src/domain/constants/constantSelect"
import { Input} from "reactstrap"

MultiSelect.Inject(CheckBoxSelection)

interface IFPageSize {
  pageSize: number
  name: string
}

interface IFCurrentPage {
  currentPage: number
}

interface IFCurrentPageConfig {
  currentPage: number
  newProp: IFCurrentPage
  oldProp: IFCurrentPage
  cancel: boolean
  name: string
}

const GridTableTemplate = memo((props: ITable) => {
  const { t } = useTranslation()
  // let dataGrid: GridComponent | null

  const dataGrid: any = useRef()
  // const searchRef: any = useRef()

  // const layoutStore = useSelector((state: any) => state.layout)
  // const lang = layoutStore.language ? layoutStore.language : 'vi'
  const lag = window.localStorage.getItem('i18nextLng')
  const lang = lag ? lag : 'vi'

  const {
    // resource,
    idTable,
    columns,
    dataTable,
    showToolbar,
    allowFilter,
    allowSort,
    allowPaging,
    pageSize,
    totalItem,
    setCurrentPage,
    setPageSize,
    setToolbarAction,
    setCommandData,
    showContextMenu,
    setContextMenuClick,
    contextMenuItems,
    rowHeight,
    contextMenuOpen,
    listContextShow,
    listContextHide,
    recordDoubleClick,
    aggregateColumn,
    allowGrouping,
    allowExcelExport,
    groupBy,
    // exports,
    searchTerm,
    setSearchTerm,
    queryFilter,
    setQueryFilter,
    dataSourceFilter,
    setDataSelected,
    dataSelected,
    selectionSettings,
    listDate,
    allowResizing,
    setQueryOrder,
    setDoubleClickData,
    enablePersistence,
    currentPage,
    height,
    toolbarTemplate,
    showDropArea,
    showColumnChooser,
    rowDataBound
  } = props

  const wrapSettings: TextWrapSettingsModel = { wrapMode: 'Header' }

  const groupSettings: any = {
    columns: !groupBy || groupBy === '' ? [] : [groupBy],
    showDropArea: groupBy !== '' && showDropArea
  }

  const servicesWithToolbar = [VirtualScroll, Page, Search, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, Toolbar, ColumnChooser, Group, LazyLoadGroup, ExcelExport, Resize, Aggregate]
  const servicesWithoutToolbar = [VirtualScroll, Page, Search, Filter, Sort, Edit, CommandColumn, Freeze, ContextMenu, ColumnChooser, Group, LazyLoadGroup, ExcelExport, Resize, Aggregate]

  const injectServices: any = showToolbar ? servicesWithToolbar : servicesWithoutToolbar

  loadCldr()
  L10n.load(require(`@public/assets/data/locales/${lang}.json`)) // load corresponding culture text
  useEffect(() => {
    loadCldr(
      require(`@src/assets/cldr-data/main/${lang}/ca-gregorian.json`),
      require(`@src/assets/cldr-data/main/${lang}/numbers.json`),
      require(`@src/assets/cldr-data/main/${lang}/timeZoneNames.json`),
      require("@src/assets/supplemental/numberingSystems.json")
      // require(`cldr-data/main/${lang}/currencies.json`),
    )
    // L10n.load(require(`@src/assets/data/locales/${lang}.json`)) // load corresponding culture text
    dataGrid.locale = lang ? lang : 'vi' // need to change the locale dynamically for grid
    // L10n.load(require('@syncfusion/ej2-locale/src/vi.json')) // load corresponding culture text
    setCulture(lang) // Change the Grid culture
    setCurrencyCode('VND')// Change the currency code
  }, [lang])

  useEffect(() => {
    if (dataGrid && dataSelected?.length === 0) {
      dataGrid.current?.clearSelection()
    }
  }, [dataSelected])

  useEffect(() => {
    if (dataGrid) {
      if (listContextShow?.type === 'SHOW') {
        dataGrid?.current.contextMenuModule.contextMenu.showItems(listContextShow.list, true)
      }
      if (listContextHide?.type === 'HIDE') {
        dataGrid?.current.contextMenuModule.contextMenu.hideItems(listContextHide.list, true)
      }
    }
  }, [listContextShow, listContextHide])

  // const captionTemplates = (props: any) => {
  //   return props.items[0][groupBy ? groupBy : ""]
  // }

  const pageOptions: PageSettingsModel = {
    currentPage: currentPage ? currentPage : 1,
    pageSize,
    pageSizes: true
  }

  const handleBlur = (val: any) => {
    setSearchTerm(val.target.value)
    setCurrentPage(1)
  }

  const handleKeyPress = (val: any) => {
    if (val.key === 'Enter') {
      setSearchTerm(val.target.value)
      setCurrentPage(1)
    }

  }


  const searchTemplate = () => {

    return (
      <Fragment>
        <Input
          style={{width: '230px'}}
          defaultValue={searchTerm}
          // ref={searchRef}
          placeholder={t('Search')}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      </Fragment>
    )


  }

  // const toolbarOption: any = toolbarTemplate ? [
  //   'ColumnChooser',
  //   {text: 'Search', align: 'Left' },
  //   {template: searchTemplate},
  //   ...toolbarTemplate
  // ] : [
  //   'ColumnChooser',
  //   {text: 'Search', align: 'Left' }
  // ]

  // const defaultToolbarOption: any[] = [{ text: 'Search', align: 'Left' }, {template: searchTemplate}]
  const defaultToolbarOption: any[] = [{template: searchTemplate}]
  let toolbarOption: any[] = []
  if (toolbarTemplate) {
    toolbarOption = [...defaultToolbarOption, ...toolbarTemplate]
  } else {
    toolbarOption = [...defaultToolbarOption]
  }

  if (showColumnChooser !== false) {
    toolbarOption.push('ColumnChooser')
  }

  const searchOptions = {
    ignoreCase: true,
    ignoreAccent: true
  }

  const filterOptions: any = { type: "Menu"}

  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    showDeleteConfirmDialog: false,
    allowEditOnDblClick: false
  }

  // const groupOptions: Object = {
  //   showGroupedColumn: true,
  //   columns: groupBy ? groupBy : [],
  //   showDropArea: false,
  //   captionTemplate: captionTemplates
  // }

  const onChangePage = (args: IFCurrentPageConfig) => {
    if (args.newProp.currentPage === args.oldProp.currentPage) {
      return
    }
    setCurrentPage(args.currentPage)
  }

  const onChangePageSize = (args: IFPageSize) => {
    if (allowPaging) {
      if (pageSize !== args.pageSize) {
        setPageSize(args.pageSize)
        setCurrentPage(1)
      }
    }
  }

  const contextMenuClick = (args: any) => {
    args.cancel = true
    setContextMenuClick(args)
  }

  const cellEdit = (args: any) => {
    if (args.type === "add") {
      if (args.columnName === "Commands") {
        args.cancel = true
      }
    }
  }

  const rowSelected = () => {
    if (dataGrid && setDataSelected) {
      /** Get the selected row indexes */
      // const selectedrowindex = dataGrid.getSelectedRowIndexes()
      /** Get the selected records. */
      const selectedRecords = dataGrid.current?.getSelectedRecords()
      setDataSelected(selectedRecords)
    }
  }

  const rowDeselected = () => {
    if (dataGrid && setDataSelected) {
      /** Get the selected row indexes */
      // const selectedrowindex = dataGrid.getSelectedRowIndexes()
      /** Get the selected records. */
      const selectedRecords = dataGrid.current?.getSelectedRecords()
      setDataSelected(selectedRecords)
    }
  }

  const recordDoubleClickEvent = (arg: any) => {
    setDoubleClickData(arg)
  }

  const commandClick = (args: any) => {
    if (
      dataGrid &&
      (args.commandColumn.type === "Edit" ||
        args.commandColumn.type === "Delete" ||
        args.commandColumn.type === "Detail" || args.commandColumn.type === "Edit111"
      )
    ) {
      args.cancel = true
      setCommandData({
        type: args.commandColumn.type,
        data: args.rowData
      })
    }
  }


  const customFilter = (props: any) => {

    let dropInstance: any
    let dropTreeInstance: any
    let DateRangInstance: any
    let DateInstance: any
    let TimeInstance: any
    let checkBoxInstance: any
    let NumberInstance: any

    const dropListFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          const dataSource = dataSourceFilter?.find((a: any) => a.key === args.column.field)

          dropInstance = new DropDownList({
            dataSource: new DataManager(dataSource?.data),
            fields: { text: 'label', value: 'value' },
            placeholder: t('Select'),
            popupHeight: '200px'
          })
          dropInstance?.appendTo(flValInput)
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, 'equal', dropInstance?.value, 'and')
        },
        write: (args: any) => {
          dropInstance.value = args.filteredValue
        },
        destroy: () => {
          if (dropInstance) {
            dropInstance.destroy()
          }
        }
      }
    }

    const dropTreeFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          const dataSource = dataSourceFilter?.find((a: any) => a.key === args.column.field)

          dropTreeInstance = new DropDownTree({
            fields: { dataSource: dataSource.data, value: 'value', text: 'label', child: 'children' },
            placeholder: t('Select'),
            popupHeight: '300px',
            showClearButton: false,
            select(e) {
              window[`${args.column.field}Text` as any] = e.itemData.text
            }
          })
          dropTreeInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (dropTreeInstance) {
            dropTreeInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, 'equal', dropTreeInstance?.value[0], 'and')
        },
        write: (args: any) => {
          if (args.filteredValue) {
            dropTreeInstance.value = args.filteredValue
            dropTreeInstance.text = window[`${args.column.field}Text` as any]
          } else {
            dropTreeInstance.text = ''
          }
        }
      }
    }

    const CheckboxFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput: any = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)
          const dataSource = props.type === 'boolean' ? {data: statusBoolean} : dataSourceFilter?.find((a: any) => a.key === args.column.field)

          checkBoxInstance = new MultiSelect({
            dataSource: new DataManager(dataSource?.data),
            fields: { text: 'label', value: 'value' },
            placeholder: t('Select'),
            popupHeight: '200px',
            allowFiltering: true,
            mode: 'CheckBox'
          })
          checkBoxInstance.appendTo(flValInput)
        },
        read: (args: any) => {
          dataGrid.current.removeFilteredColsByField(args.column.field)
          if (checkBoxInstance) {
            args.fltrObj.filterByColumn(args.column.field, 'equal', checkBoxInstance.value, 'or')
          }
        },
        write: (args: any) => {
          const filteredValue: any[] = []
          dataGrid.current.filterSettings.columns?.map((item: any) => {
            if (item.field === args.column.field && item.value !== undefined) {
              filteredValue.push(item.value)
            }
          })
          if (filteredValue.length > 0) {
            checkBoxInstance.value = filteredValue
          }
        },
        destroy: () => {
          if (checkBoxInstance) {
            checkBoxInstance.destroy()
          }
        }
      }
    }

    const NumberFilter: any = {
      operator: 'equal',
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          NumberInstance = new TextBox({
            placeholder: t('EnterValue')
          })
          NumberInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (NumberInstance) {
            NumberInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, parseInt(NumberInstance.value), 'and')
        },
        write: (args: any) => {
          if (args.filteredValue) {
            NumberInstance.value = parseInt(args.filteredValue)
          } else {
            NumberInstance.value = ''
          }
        }
      }
    }

    const DateFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          DateInstance = new DatePicker({
            format: themeConfig.system.dateFormat
          })
          DateInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (DateInstance) {
            DateInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, DateInstance.value, 'and')
        },
        write: (args: any) => {
          if (args.filteredValue) {
            DateInstance.value = args.filteredValue
          } else {
            DateInstance.value = ''
          }
        }
      }
    }

    const TimeFilter: any = {
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          TimeInstance = new MaskedTextBox({
            mask: '00:00'
          })
          TimeInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (TimeInstance) {
            TimeInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, TimeInstance.preEleVal, 'and')
        },
        write: (args: any) => {
          if (args.filteredValue) {
            TimeInstance.value = args.filteredValue
          } else {
            TimeInstance.value = ''
          }
        }
      }
    }

    const DateRangeFilter: any = {
      ui: {
        create: (args: any) => {
          window[`${args.column.field}` as any] = args.column.field
          const flValInput = createElement("input", { className: "flm-input" })
          args.target.appendChild(flValInput)
          const fdate: any = []
          dataGrid.current.filterSettings.columns.forEach((col: any) => {
            // if (col.field === 'startDate) {
            if (col.field === args.column.field) {
              fdate.push(col.value)
            }
          })
          DateRangInstance = new DateRangePicker({
            locale: lang,
            format: themeConfig.system.dateFormat,
            change(e: any) {
              if (e !== undefined && e !== null && e.value) {
                const grid = dataGrid.current
                window[`${args.column.field}StartDateValue` as any] = e.value[0]
                window[`${args.column.field}EndDateValue` as any] = e.value[1]

                // @ts-ignore
                window[`${args.column.field}StartDate` as any] = moment(e.value[0]).format('YYYY-MM-DDTHH:mm:ss').toString()
                // @ts-ignore
                window[`${args.column.field}EndDate` as any] = moment(e.value[1]).format('YYYY-MM-DDTHH:mm:ss').toString()
                if (window[`${args.column.field}StartDate` as any] === fdate[0]) {
                  grid.filterByColumn(args.column.field, "lessthanorequal", moment(e.value[1]).format('YYYY-MM-DDTHH:mm:ss').toString())
                } else {
                  grid.filterByColumn(args.column.field, "greaterthanorequal", moment(e.value[0]).format('YYYY-MM-DDTHH:mm:ss').toString())
                }

              }
            }
          })
          if (fdate.length > 0) {
            DateRangInstance.startDate =  window[`${args.column.field}StartDateValue` as any]
            DateRangInstance.endDate =  window[`${args.column.field}EndDateValue` as any]
          }
          DateRangInstance.appendTo(flValInput)
        },
        read: () => {
          // args.fltrObj.filterByColumn(args.column.field, 'greaterthanorequal', moment(DateRangInstance.startDate).format('YYYY-MM-DDTHH:mm:ss').toString())
        },

        write: () => {},

        destroy: () => {
          if (DateRangInstance) {
            DateRangInstance.destroy()
          }
        }
      }
    }

    const defaultFilter: any = {
      operator: 'contains',
      ui: {
        create: (args: any) => {
          const flValInput = createElement('input', { className: 'flm-input' })
          args.target.appendChild(flValInput)

          dropInstance = new TextBox({
            placeholder: t('Select')
          })
          dropInstance.appendTo(flValInput)
        },
        destroy: () => {
          if (dropInstance) {
            dropInstance.destroy()
          }
        },
        read: (args: any) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance?.value, 'and')
        },
        write: (args: any) => {
          if (args.filteredValue) {
            dropInstance.value = args.filteredValue
          } else {
            dropInstance.value = ''
          }
        }
      }
    }

    if (props.typeFilter === 'Dropdown') {
      return dropListFilter
    } else if (props.typeFilter === 'Number') {
      return NumberFilter
    } else if (props.typeFilter === 'DropTree') {
      return dropTreeFilter
    } else if (props.typeFilter === 'Date') {
      return DateFilter
    } else if (props.typeFilter === 'Time') {
      return TimeFilter
    } else if (props.typeFilter === 'DateRange') {
      return DateRangeFilter
    } else if (props.typeFilter === 'Checkbox') {
      return CheckboxFilter
    } else {
      return defaultFilter
    }
  }

  const actionComplete = (args: any) => {
    if (args && args?.filterModel?.col?.hideOperator) {
      args.filterModel.dlgObj.element.children[0].firstElementChild.children[0].style.display = "none"
      // setCurrentColumn(args.columnName)
    }
    if (args.requestType === "beginEdit") {
      // focus cell the column without freeze
      // args.form.elements[dataGrid.element.getAttribute('id') + fieldName].focus()
      // focus cell the column with freeze
      // if (fieldName !== undefined) {
      //   args.movableForm[dataGrid.element.getAttribute('id') + fieldName].focus()
      // }
    }
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      //hide the command buttons when frozen left
      if (
        args.movableForm &&
        args.movableForm.querySelector(".e-unboundcell")
      ) {
        args.movableForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.movableForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
      //hide the command buttons when don't frozen
      if (args.form && args.form.querySelector(".e-unboundcell")) {
        args.form
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.form
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
      //hide the command buttons when frozen right
      if (
        args.frozenRightForm &&
        args.frozenRightForm.querySelector(".e-unboundcell")
      ) {
        args.frozenRightForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].disabled =
          true
        args.frozenRightForm
          .querySelector(".e-unboundcell")
          .querySelector("button[title='Detail']").ej2_instances[0].cssClass =
          "e-hide e-flat"
      }
    }
    if (args.action === "edit" || (args.action === "add" && args.isFrozen)) {
      setToolbarAction(args)
    }
  }

  const actionBegin = (args: any) => {

    // if (!initialAbility.can('EDIT', resource)) {
    //   if (args.requestType === 'beginEdit') {
    //     args.cancel = true
    //   }
    // }

    if (args.requestType === "filtering" && listDate?.includes(args.currentFilteringColumn)) {
      const grid = dataGrid.current

      if (window[`${args.currentFilteringColumn}StartDate` as any] && window[`${args.currentFilteringColumn}EndDate` as any]) {
        args.columns = args.columns.filter((object: any) => {
          return object.field !== args.currentFilteringColumn
        })
        args.columns.push(
          {
            actualFilterValue: {},
            actualOperator: {},
            field: args.currentFilteringColumn,
            ignoreAccent: false,
            isForeignKey: false,
            matchCase: false,
            operator: "greaterthanorequal",
            predicate: "and",
            uid: grid.getColumnByField(args.currentFilteringColumn).uid,
            // value: window[`${args.currentFilteringColumn}EndDate` as any]
            value: window[`${args.currentFilteringColumn}StartDate` as any]
          },
          {
            actualFilterValue: {},
            actualOperator: {},
            field: args.currentFilteringColumn,
            ignoreAccent: false,
            isForeignKey: false,
            matchCase: false,
            operator: "lessthanorequal",
            predicate: "and",
            uid: grid.getColumnByField(args.currentFilteringColumn).uid,
            // value: window[`${args.currentFilteringColumn}EndDate` as any]
            value: window[`${args.currentFilteringColumn}EndDate` as any]
          })
      }


    }

    if (args.requestType === "filtering" && args.currentFilteringColumn === "premiumSalary") {

    }


    if (args.requestType === "filtering" && args.action === 'filter') {
      // args.cancel = true
      const colQuery = args.columns.map((item: any) => (
        {
          key: item.field,
          value: item.value,
          ope: operator[item.operator],
          predicate: predicate[item.predicate]
        }
      ))

      // const newArr = colQuery.filter((object: any) => {
      //   return object.key !== rangeMax.key
      // })

      // const rs = [...newArr, rangeMin, rangeMax]

      setQueryFilter(colQuery)
      setCurrentPage(1)
    }

    if (args.requestType === "sorting") {
      if (args.columnName && args.direction) {
        setQueryOrder(`${args.columnName  };${ direction[args.direction]}`)
      } else {
        setQueryOrder('')
      }
      setCurrentPage(1)

    }


    if (args.requestType === "filtering" && args.action === 'clearFilter') {
      // args.cancel = false
      const rs = queryFilter.filter((object: any) => {
        return object.key !== args.currentFilterColumn.field
      })

      setQueryFilter([...rs])
      setCurrentPage(1)

    }


    if (args.requestType === "searching") {
      // args.cancel = true
      // setSearchTerm(args.searchString)
    }

    if (args.requestType === "refresh" && searchTerm !== '') {
      // args.cancel = false
    }

    if (args.requestType === "beginEdit") {
      args.cancel = true
    }

    if (args.requestType === 'delete') {
      args.cancel = true

      console.log(args)

      setContextMenuClick({
        item: {
          id: 'DELETE'
        },
        rowInfo: {
          rowData: args.data[0]
        }
      })

    }

  }


  return (
    <Fragment>
      <div className="grid-table-component">
        <GridComponent
          ref={dataGrid}
          id={idTable}
          locale={lang}
          rowHeight={rowHeight ? rowHeight : null}
          dataSource={dataTable}
          toolbar={showToolbar ? toolbarOption : undefined }
          pageSettings={pageOptions}
          commandClick={commandClick}
          editSettings={editOptions}
          actionComplete={actionComplete}
          actionBegin={actionBegin}
          allowFiltering={allowFilter}
          filterSettings={filterOptions}
          allowSorting={allowSort}
          allowMultiSorting={true}
          showColumnChooser={showToolbar}
          // toolbarClick={clickHandler}
          cellEdit={cellEdit}
          enableHover={false}
          // dataBound={dataBound}
          // load={load}
          allowResizing={false}
          allowExcelExport={allowExcelExport}
          allowGrouping={allowGrouping}
          groupSettings={groupSettings}
          searchSettings={searchOptions}
          recordDoubleClick={recordDoubleClick ? recordDoubleClickEvent : undefined}
          contextMenuOpen={contextMenuOpen}
          contextMenuItems={showContextMenu ? contextMenuItems?.map((x: any) => ({...x, text: t(x.text)})) : undefined}
          contextMenuClick={showContextMenu ? contextMenuClick : undefined}
          selectionSettings={selectionSettings}
          rowSelected={rowSelected}
          rowDeselected={rowDeselected}
          allowPaging={false}
          gridLines={allowResizing ? 'Both' : 'Default'}
          // queryCellInfo={queryCellInfo}
          enablePersistence={enablePersistence}// kích hoạt lưu tất cả trạng thái của table
          height={height}
          rowDataBound ={rowDataBound}
          textWrapSettings={wrapSettings}
          allowTextWrap={true}
        >
          <Inject services={injectServices}
          />

          <ColumnsDirective>
            {columns.map((col: any, index: number) => (
              <ColumnDirective
                key={index}
                {...col}
                headerText={t(col.headerText)}
                filter={customFilter(col)}
              />
            ))}
          </ColumnsDirective>
          {aggregateColumn && <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                {aggregateColumn.map((col: any, index: any) => (
                  <AggregateColumnDirective key={index} {...col} />
                ))}
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>}
        </GridComponent>

        {allowPaging ? <PagerComponent
          locale={lang}
          click={onChangePage}
          pageSize={pageSize}
          currentPage={currentPage}
          pageSizes={themeConfig.system.pageSizes}
          totalRecordsCount={totalItem ? totalItem : undefined}
          pageCount={5}
          dropDownChanged={onChangePageSize}
        /> : ''}

      </div>

    </Fragment>
  )
})

export default GridTableTemplate
