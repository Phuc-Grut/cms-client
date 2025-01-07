import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'
import React, { useEffect } from 'react'
import './treeview.css'

interface ITreeViewSelect {
  dataTree: any
  allowMultiSelection?: boolean
  showCheckBox?: boolean
  treeId: string
  treeText: string
  TreeChild: string
  SetSelectNodes: any
  handUnSelectNode?: any
  selectNodes?: any
}

const TreeViewSelect = (props: ITreeViewSelect) => {

  const {
    dataTree,
    allowMultiSelection,
    showCheckBox,
    treeId,
    treeText,
    TreeChild,
    SetSelectNodes,
    handUnSelectNode,
    selectNodes
  } = props

  const fields = { dataSource: dataTree, id: treeId, text: treeText, child: TreeChild }

  const ref: any = React.useRef()

  const customClass: string = "custom-treeview"

  const nodeClicked = (e: any) => {
    if (allowMultiSelection) {
      const index = selectNodes.findIndex((x: any) => x.selectId  === e.node.dataset.uid)
      if (index > -1) {
        const list = selectNodes.filter((x: any) => x.selectId !== e.node.dataset.uid)
        ref.current.selectedNodes = list.map((x: any) => { return (x.selectId) })
        SetSelectNodes(list)
        handUnSelectNode(selectNodes[index])
      } else {
        const list = [...selectNodes, { selectId: e.node.dataset.uid }]
        ref.current.selectedNodes = list.map((x: any) => { return (x.selectId) })
        SetSelectNodes(list)
      }
    } else {
      ref.current.selectedNodes = [e.node.dataset.uid]
      SetSelectNodes(ref.current.selectedNodes)
    }
  }

  useEffect(() => {
    if (selectNodes && selectNodes?.length !== ref.current.selectedNodes?.length) {
      ref.current.selectedNodes = selectNodes.map((x: any) => { return (x.selectId) })
    }
  }, [selectNodes])

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='tree-control_wrapper'>
          <TreeViewComponent
            ref={ref}
            fields={fields}
            cssClass={customClass}
            showCheckBox={showCheckBox}
            nodeClicked={nodeClicked}
            allowMultiSelection={allowMultiSelection ? allowMultiSelection : false} />
        </div>
      </div>
    </div>
  )
}
export default TreeViewSelect