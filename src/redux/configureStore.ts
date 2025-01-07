import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'

import { menuSlice } from '@src/layouts/store'
import { groupCategorySlice } from '../views/group-category/store'
import { groupWebLinkSlice } from '../views/group-weblink/store'
import { categorySlice } from '../views/channel-list/store'
import { weblinkSlice } from '../views/weblink/store'
import { uploadFileSlice } from '../utility/stores/uploadFile'
import { codeSyntaxSlice } from "@src/redux/system/codesyntax/store"
import { contentSlice } from "../views/content/store"
import { faqSlice } from "../views/faq/store"
import { newsSlice } from "../views/news/store"
import { guideSlice } from "../views/guide/store"
import { noticeSlice } from "../views/notice/store"
import { upgradeSlice } from "../views/upgrade/store"
import { contentCategorySlice } from "../views/content-category/store"
import { contentTypeSlice } from "../views/content-type/store"
import { dashboardSlice } from "../views/dashboard/store"
import {systemGroupUserSlice} from "@src/views/system/view/group-user/store"
import {permissionAdminSlice} from "@src/views/system/view/permission/store"
import {systemUserSlice} from "@src/views/system/view/system-user/store"

export const store = configureStore({
  reducer: {
    navbar,
    layout,
    menu: menuSlice.reducer,
    category: categorySlice.reducer,
    weblink: weblinkSlice.reducer,
    uploadFile: uploadFileSlice.reducer,
    codeSyntax: codeSyntaxSlice.reducer,
    content: contentSlice.reducer,
    faq: faqSlice.reducer,
    news: newsSlice.reducer,
    guide: guideSlice.reducer,
    upgrade: upgradeSlice.reducer,
    notice: noticeSlice.reducer,
    contentCategory: contentCategorySlice.reducer,
    groupCategory: groupCategorySlice.reducer,
    contentType: contentTypeSlice.reducer,
    dashboard: dashboardSlice.reducer,
    groupWebLink: groupWebLinkSlice.reducer,
    systemGroupUser: systemGroupUserSlice.reducer,
    permissionAdmins: permissionAdminSlice.reducer,
    systemUser: systemUserSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
