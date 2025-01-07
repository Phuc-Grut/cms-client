import { lazy } from 'react'
import * as IFRoutes from '../../domain/models/IRouteObject'

const DashboardPage = lazy(() => import('../../views/dashboard'))

const DashboardRoutes:IFRoutes.RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />
  }
]

export default DashboardRoutes
