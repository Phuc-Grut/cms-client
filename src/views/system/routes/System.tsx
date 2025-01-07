import { lazy } from 'react'
import * as IFRoutes from '../../../domain/models/IRouteObject'

const SystemUserPage = lazy(() => import('../view/system-user'))
const SystemGroupUserPage = lazy(() => import('../view/group-user'))
const SystemPermissionIdentityPage = lazy(() => import('../view/permission/identity'))
const SystemPermissionFunctionPage = lazy(() => import('../view/permission/function'))
const SystemPermissionInformationPage = lazy(() => import('../view/permission/information'))

const SystemRoutes:IFRoutes.RouteObject[] = [
  {
    path: '/system/user',
    element: <SystemUserPage/>
  },
  {
    path: '/system/group-user',
    element: <SystemGroupUserPage/>
  },
  {
    path: '/system/permission-identity',
    element: <SystemPermissionIdentityPage/>
  },
  {
    path: '/system/permission-info',
    element: <SystemPermissionInformationPage/>
  },
  {
    path: '/system/permission-function',
    element: <SystemPermissionFunctionPage/>
  }

]

export default SystemRoutes