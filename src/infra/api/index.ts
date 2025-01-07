
import menuApi from './menu'
import categoryApi from './category'
import groupCategoryApi from './group-category'
import fileApi from './file'
import codeSyntaxApi from './code-syntax'
import contentApi from './contents'
import faqApi from './faq'
import newsApi from './news'
import guideApi from './guide'
import noticeApi from './notice'
import upgradeApi from './upgrade'
import contentCategoryApi from './content-category'
import contentTypeApi from './content-type'
import dashboardApi from './dashboard'
import productCategoryApi from './product-category'
import itemProductApi from './item-product'
import itemApi from './item'
import weblinkApi from './weblink'
import configApi from './config'
import groupWebLinkApi from './group-weblink'
import groupUserApi from '@src/views/system/infra/group-user'
import permissionApi from '@src/views/system/infra/permission'
import systemUserApi from '@src/views/system/infra/user'
const api = {
  ...menuApi,
  ...categoryApi,
  ...groupCategoryApi,
  ...fileApi,
  ...codeSyntaxApi,
  ...contentApi,
  ...faqApi,
  ...newsApi,
  ...guideApi,
  ...noticeApi,
  ...upgradeApi,
  ...contentCategoryApi,
  ...productCategoryApi,
  ...contentTypeApi,
  ...dashboardApi,
  ...itemProductApi,
  ...itemApi,
  ...weblinkApi,
  ...groupWebLinkApi,
  ...groupUserApi,
  ...permissionApi,
  ...systemUserApi,
  ...configApi
}

export default api
