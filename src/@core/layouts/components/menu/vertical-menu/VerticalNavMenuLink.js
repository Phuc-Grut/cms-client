// ** React Imports
import { NavLink } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'
// import IconCustom from "@components/icon"
import * as Icon from "becoxy-icons"

const VerticalNavMenuLink = ({ item, activeItem }) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink
  // ** Hooks
  const { t } = useTranslation()
  const IconTag = Icon[item.resAttributes?.VLAYOUT_ICON ? item.resAttributes.VLAYOUT_ICON : 'Home']
  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
            href: item.navLink || '/'
          }
          : {
            to: item.navLink || '/',
            className: ({ isActive }) => {
              if (isActive && !item.disabled) {
                return 'd-flex align-items-center active'
              } else {
                return 'd-flex align-items-center'
              }
            }
          })}
        onClick={e => {
          if (item.navLink.length === 0 || item.navLink === '#' || item.navLink === null || item.disabled === true) {
            e.preventDefault()
          }
        }}
      >
        {/*{item.icon}*/}
        <IconTag fontSize={17}/>
        {/*<IconCustom typeIcon={item.typeIcon} iconName={item.resAttributes && item.resAttributes.VLAYOUT_ICON ? item.resAttributes.VLAYOUT_ICON : ''} fontSize={17}/>*/}
        <span className='menu-item text-truncate'>{t(item.title)}</span>

        {item.badge && item.badgeText ? (
          <Badge className='ms-auto me-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink
