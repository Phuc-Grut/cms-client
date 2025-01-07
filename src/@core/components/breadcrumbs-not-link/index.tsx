// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'
import { Home} from 'becoxy-icons'

// ** Reactstrap Imports
import {
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'
import {isObjEmpty} from "@utils/Utils"

const BreadCrumbsNotLink = (props: any) => {
  // ** Props
  const { breadCrumbTitle, breadCrumbParent, breadCrumbParent2, breadCrumbParent3, breadCrumbActive } = props

  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-start mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb className='breadcrumb-nowrap'>
                <BreadcrumbItem tag='li'>
                  <Link to='/'>
                    <Home fontSize={20}/>
                  </Link>
                </BreadcrumbItem>
                {breadCrumbParent && !isObjEmpty(breadCrumbParent) ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {/*{breadCrumbParent}*/}
                    <Link to={breadCrumbParent.link}>
                      {breadCrumbParent.title}
                    </Link>
                  </BreadcrumbItem>
                ) : ''}
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag='li' active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbsNotLink

// ** PropTypes
BreadCrumbsNotLink.propTypes = {
  // breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
  breadCrumbParent: Proptypes.object
  // breadCrumbParent: Proptypes.arrayOf(
  //   Proptypes.shape({
  //     link: Proptypes.string,
  //     title: Proptypes.string
  //   })
  // )
}
