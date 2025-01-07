// ** React Imports
// import { lazy } from 'react'

// import { Navigate } from 'react-router-dom'
const NoticePage = lazy(() => import("../../views/notice"))
import * as IFRoutes from "../../domain/models/IRouteObject"
import { lazy } from "react"
const UpgradePage = lazy(() => import("../../views/upgrade"))

const ContentPage = lazy(() => import("../../views/content"))
const FaqPage = lazy(() => import("../../views/faq"))
const NewsPage = lazy(() => import("../../views/news"))
const GuidePage = lazy(() => import("../../views/guide"))
const ContentTypePage = lazy(() => import("../../views/content-type"))
const ContentCategoryPage = lazy(() => import("../../views/content-category"))
const GroupCategoryPage = lazy(() => import("../../views/group-category"))
const GroupWebLinkPage = lazy(() => import("../../views/group-weblink"))
const WebLinkPage = lazy(() => import("../../views/weblink"))
const ChannelListPage = lazy(() => import("../../views/channel-list"))

const AppRoutes: IFRoutes.RouteObject[] = [
  {
    path: "/content",
    element: <ContentPage />
  },
  {
    path: "/faq",
    element: <FaqPage />
  },
  {
    path: "/news",
    element: <NewsPage />
  },
  {
    path: "/guide",
    element: <GuidePage />
  },
  {
    path: "/notice",
    element: <NoticePage />
  },
  {
    path: "/upgrade",
    element: <UpgradePage />
  },
  {
    path: "/content-type",
    element: <ContentTypePage />
  },
  {
    path: "/content-category",
    element: <ContentCategoryPage />
  },
  {
    path: "/group-category",
    element: <GroupCategoryPage />
  },
  {
    path: "/channel-list",
    element: <ChannelListPage />
  },
  {
    path: "/group-weblink",
    element: <GroupWebLinkPage />
  },
  {
    path: "/weblink",
    element: <WebLinkPage />
  }
]

export default AppRoutes
