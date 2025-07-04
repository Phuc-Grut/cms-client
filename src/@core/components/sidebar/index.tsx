// ** Third Party Components
import { X } from 'becoxy-icons'
import Proptypes from 'prop-types'
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const Sidebar = (props: any) => {
  // ** Props
  const {
    open,
    size,
    title,
    width,
    children,
    closeBtn,
    className,
    toggleSidebar,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    ...rest
  } = props

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn ? closeBtn : <X className='cursor-pointer' fontSize={15} onClick={toggleSidebar} />

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName={classnames('overflow-hidden', {
        [contentClassName]: contentClassName
      })}
      modalClassName={classnames('modal-slide-in', {
        [wrapperClassName]: wrapperClassName
      })}
      className={classnames({
        [className]: className,
        'sidebar-lg': size === 'lg',
        'sidebar-sm': size === 'sm'
      })}
      /*eslint-disable */
      {...(width !== undefined
        ? {
            style: { width: String(width) + 'px' }
          }
        : {})}
      /*eslint-enable */
      {...rest}
    >
      <ModalHeader
        className={classnames({
          [headerClassName]: headerClassName
        })}
        toggle={toggleSidebar}
        close={renderCloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>
          <span className='align-middle'>{title}</span>
        </h5>
      </ModalHeader>
      <Scrollbars autoHide>
        <ModalBody
          className={classnames('flex-grow-1', {
            [bodyClassName]: bodyClassName
          })}
        >
          {children}
        </ModalBody>
      </Scrollbars>
    </Modal>
  )
}

export default Sidebar

// ** PropTypes
Sidebar.propTypes = {
  className: Proptypes.string,
  bodyClassName: Proptypes.string,
  open: Proptypes.bool.isRequired,
  title: Proptypes.string.isRequired,
  contentClassName: Proptypes.string,
  wrapperClassName: Proptypes.string,
  children: Proptypes.any.isRequired,
  size: Proptypes.oneOf(['sm', 'lg']),
  toggleSidebar: Proptypes.func.isRequired,
  width: Proptypes.oneOfType([Proptypes.number, Proptypes.string])
}
