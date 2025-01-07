export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_BFF = process.env.REACT_APP_BASE_BFF
export const BASE_URL_CDN = process.env.REACT_APP_BASE_URL_CDN
export const CDN_URL_VIEW = process.env.REACT_APP_CDN_URL_VIEW
export const REPLACE_STRING_CDN = process.env.REACT_APP_REPLACE_STRING_CDN
export const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR

export const MODULECODE = {
  CONTENT: "CONTENT",
  FAQ: "CONTENT",
  NEWS: "CONTENT",
  GUIDE: "CONTENT"

}
export const CODESYNTAX = {
  ACTION_TYPES: {
    GETCODE: 'CODESYNTAX/GETCODE'
  },
  URL_API: {
    GETCODE_API: `${BASE_URL}/api/codesyntax/get-code`
  }
}
export const ITEM = {
  ACTION_TYPES: {
    GET_DATA: 'ITEM/GET_DATA',
    GET_ITEM_ID: 'ITEM/GET_ITEM_ID',
    ADD_ITEM: 'ITEM/ADD_ITEM',
    ADD_FOLDER: 'ITEM/ADD_FOLDER',
    EDIT_FOLDER: 'ITEM/EDIT_FOLDER',
    EDIT_ITEM: 'ITEM/EDIT_ITEM',
    DELETE_ITEM: 'ITEM/DELETE_ITEM',
    GET_PARENT: "ITEM/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/item/paging`,
    GET_ITEM_ID_API: `${BASE_URL}/api/item/get`,
    ADD_ITEM_API: `${BASE_URL}/api/item/add`,
    ADD_FOLDER_API: `${BASE_URL}/api/item/add-folder`,
    EDIT_FOLDER_API: `${BASE_URL}/api/item/edit-folder`,
    EDIT_ITEM_API: `${BASE_URL}/api/item/edit`,
    DELETE_ITEM_API: `${BASE_URL}/api/item/delete`,
    GET_PARENT_API: `${BASE_URL}/api/item/getAllParent`
  }
}

export const DASHBOARD = {
  ACTION_TYPES: {
    GET_CONTENT_BY_TYPE: 'DASHBOARD/GET_CONTENT_BY_TYPE',
    GET_TOP_CATEGORY: 'DASHBOARD/GET_TOP_CATEGORY',
    GET_TOP_NEW_CONTENT: 'DASHBOARD/GET_TOP_NEW_CONTENT'
  },
  URL_API: {
    GET_CONTENT_BY_TYPE_API: `${BASE_URL}/api/dashboard/get-content-by-type`,
    GET_TOP_CATEGORY_API: `${BASE_URL}/api/dashboard/get-top-category`,
    GET_TOP_NEW_CONTENT_API: `${BASE_URL}/api/dashboard/get-top-new-content`
  }
}
export const ITEMPRODUCT = {
  ACTION_TYPES: {
    GET_ALL_ITEM_PRODUCT: 'DASHBOARD/GET_ALL_ITEM_PRODUCT'
  },
  URL_API: {
    GET_ALL_ITEM_PRODUCT_API: `${BASE_URL}/api/itemproduct/get-all`
  }
}

export const UPLOADFILE = {
  ACTION_TYPES: {
    UPLOAD_FILE: 'UPLOADFILE/UPLOAD_FILE',
    UPLOAD_IMAGE: 'UPLOADFILE/UPLOAD_IMAGE',
    UPLOAD_FILE_MULTI: 'UPLOADFILE/UPLOAD_FILE_MULTI',
    UPLOAD_IMAGE_MULTI: 'UPLOADFILE/UPLOAD_IMAGE_MULTI'
  },
  URL_API: {
    UPLOAD_FILE_API: `${BASE_URL}/api/file/upload`,
    UPLOAD_IMAGE_API: `${BASE_URL}/api/image/upload`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    UPLOAD_FILE_MULTI_API: `${BASE_URL}/api/file/upload-mutil`,
    UPLOAD_IMAGE_MULTI_API: `${BASE_URL}/api/image/upload-mutil`
  }
}

export const GROUPCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'GROUPCATEGORY/GET_DATA',
    GET_LISTBOX: 'GROUPCATEGORY/GET_LISTBOX',
    ADD: 'GROUPCATEGORY/ADD',
    EDIT: 'GROUPCATEGORY/EDIT',
    DELETE: 'GROUPCATEGORY/DELETE',
    GROUPCATEGORY_SORT: 'GROUPCATEGORY/EDITSORT',
    GET_ALL_GROUPCATEGORY: "GROUPCATEGORY/GETAll"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/groupcategory/paging`,
    GET_ALL_GROUPCATEGORY: `${BASE_URL}/api/groupcategory/get-list`,
    GET_LISTBOX_API: `${BASE_URL}/api/groupcategory/get-listbox`,
    ADD_API: `${BASE_URL}/api/groupcategory/add`,
    EDIT_API: `${BASE_URL}/api/groupcategory/edit`,
    DELETE_API: `${BASE_URL}/api/groupcategory/delete`,
    GROUPCATEGORY_SORT: `${BASE_URL}/api/groupcategory/sort`
  }
}
export const PRODUCTCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTCATEGORY/GET_DATA',
    GET_LISTBOX: 'PRODUCTCATEGORY/GET_LISTBOX',
    GET_LIST_CBX: 'PRODUCTCATEGORY/GET_LIST_CBX',
    ADD: 'PRODUCTCATEGORY/ADD',
    EDIT: 'PRODUCTCATEGORY/EDIT',
    DELETE: 'PRODUCTCATEGORY/DELETE',
    GET_PRODUCTCATEGORY: "PRODUCTCATEGORY/GET",
    SORT: "PRODUCTCATEGORY/SORT",
    GET_PARENT: "PRODUCTCATEGORY/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/categoryroot/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/categoryroot/get-listbox`,
    GET_LIST_CBX: `${BASE_URL}/api/categoryroot/get-cbx-by-tree`,
    ADD_API: `${BASE_URL}/api/categoryroot/add`,
    EDIT_API: `${BASE_URL}/api/categoryroot/edit`,
    DELETE_API: `${BASE_URL}/api/categoryroot/delete`,
    GET_PRODUCTCATEGORY_API: `${BASE_URL}/api/categoryroot/get`,
    SORT_API: `${BASE_URL}/api/categoryroot/sort`,
    GET_PARENT_API: `${BASE_URL}/api/categoryroot/getAllParent`
  }
}
export const CONTENT = {
  ACTION_TYPES: {
    GET_PAGING: 'CONTENT/GET_PAGING',
    GET_LIST: 'CONTENT/GET_LIST',
    ADD: 'CONTENT/ADD',
    UPDATE: 'CONTENT/UPDATE',
    DELETE: 'CONTENT/DELETE',
    GET_BY_ID: 'CONTENT/GET_BY_ID',
    DUPLICATE: 'CONTENT/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/content/paging`,
    GET_LIST_API: `${BASE_URL}/api/content/get-listbox`,
    ADD_API: `${BASE_URL}/api/content/add`,
    UPDATE_API: `${BASE_URL}/api/content/edit`,
    DELETE_API: `${BASE_URL}/api/content/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/content/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/content/duplicate`
  }
}


export const CONTENTTYPE = {
  ACTION_TYPES: {
    GET_DATA: 'CONTENTTYPE/GET_DATA',
    GET_LISTBOX: 'CONTENTTYPE/GET_LISTBOX',
    ADD: 'CONTENTTYPE/ADD',
    EDIT: 'CONTENTTYPE/EDIT',
    SORT: 'CONTENTTYPE/SORT',
    DELETE: 'CONTENTTYPE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/contenttype/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/contenttype/get-listbox`,
    ADD_API: `${BASE_URL}/api/contenttype/add`,
    EDIT_API: `${BASE_URL}/api/contenttype/edit`,
    SORT_API: `${BASE_URL}/api/contenttype/sort`,
    DELETE_API: `${BASE_URL}/api/contenttype/delete`
  }
}

export const CATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'CATEGORY/GET_DATA',
    GET_LISTBOX: 'CATEGORY/GET_LISTBOX',
    GET_CBX: 'CATEGORY/GET_CBX',
    ADD: 'CATEGORY/ADD',
    EDIT: 'CATEGORY/EDIT',
    DELETE: 'CATEGORY/DELETE',
    GET_CATEGORY: "CATEGORY/GET",
    SORT: "CATEGORY/SORT",
    GET_PARENT: "CATEGORY/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/category/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/category/get-listbox`,
    GET_CBX_API: `${BASE_URL}/api/category/get-cbx`,
    ADD_API: `${BASE_URL}/api/category/add`,
    EDIT_API: `${BASE_URL}/api/category/edit`,
    DELETE_API: `${BASE_URL}/api/category/delete`,
    GET_CATEGORY_API: `${BASE_URL}/api/category/get`,
    SORT_API: `${BASE_URL}/api/category/sort`,
    GET_PARENT_API: `${BASE_URL}/api/category/getAllParent`
  }
}

export const CONTENTCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'CONTENTCATEGORY/GET_DATA',
    GET_LISTBOX: 'CONTENTCATEGORY/GET_LISTBOX',
    ADD: 'CONTENTCATEGORY/ADD',
    EDIT: 'CONTENTCATEGORY/EDIT',
    SORT: 'CONTENTCATEGORY/SORT',
    DELETE: 'CONTENTCATEGORY/DELETE',
    GET_CONTENTCATEGORY: "CONTENTCATEGORY/GET",
    GET_PARENT: "CONTENTCATEGORY/GET_PARENT",
    GET_LIST_CBX: "CONTENTCATEGORY/GET_LIST_CBX"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/categoryroot/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/categoryroot/get-listbox`,
    ADD_API: `${BASE_URL}/api/categoryroot/add`,
    EDIT_API: `${BASE_URL}/api/categoryroot/edit`,
    SORT_API: `${BASE_URL}/api/categoryroot/sort`,
    DELETE_API: `${BASE_URL}/api/categoryroot/delete`,
    GET_CONTENTCATEGORY_API: `${BASE_URL}/api/categoryroot/get`,
    GET_PARENT_API: `${BASE_URL}/api/categoryroot/getAllParent`,
    GET_LIST_CBX: `${BASE_URL}/api/categoryroot/get-cbx-by-tree`
  }
}
export const GROUPWEBLINK = {
  ACTION_TYPES: {
    GET_DATA: 'GROUPWEBLINK/GET_DATA',
    GET_LISTBOX: 'GROUPWEBLINK/GET_LISTBOX',
    ADD: 'GROUPWEBLINK/ADD',
    EDIT: 'GROUPWEBLINK/EDIT',
    DELETE: 'GROUPWEBLINK/DELETE',
    GROUPWEBLINK_SORT: 'GROUPWEBLINK/EDITSORT',
    GET_ALL_GROUPWEBLINK: "GROUPWEBLINK/GETAll"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/groupweblink/paging`,
    GET_ALL_GROUPWEBLINK: `${BASE_URL}/api/groupweblink/get-list`,
    GET_LISTBOX_API: `${BASE_URL}/api/groupweblink/get-listbox`,
    ADD_API: `${BASE_URL}/api/groupweblink/add`,
    EDIT_API: `${BASE_URL}/api/groupweblink/edit`,
    DELETE_API: `${BASE_URL}/api/groupweblink/delete`,
    GROUPWEBLINK_SORT: `${BASE_URL}/api/groupweblink/sort`
  }
}

export const WEBLINK = {
  ACTION_TYPES: {
    GET_DATA: 'WEBLINK/GET_DATA',
    GET_LISTBOX: 'WEBLINK/GET_LISTBOX',
    GET_CBX: 'WEBLINK/GET_CBX',
    ADD: 'WEBLINK/ADD',
    EDIT: 'WEBLINK/EDIT',
    DELETE: 'WEBLINK/DELETE',
    GET_WEBLINK: "WEBLINK/GET",
    SORT: "WEBLINK/SORT",
    GET_PARENT: "WEBLINK/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/weblink/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/weblink/get-listbox`,
    GET_CBX_API: `${BASE_URL}/api/weblink/get-cbx`,
    ADD_API: `${BASE_URL}/api/weblink/add`,
    EDIT_API: `${BASE_URL}/api/weblink/edit`,
    DELETE_API: `${BASE_URL}/api/weblink/delete`,
    GET_WEBLINK_API: `${BASE_URL}/api/weblink/get`,
    SORT_API: `${BASE_URL}/api/weblink/sort`,
    GET_PARENT_API: `${BASE_URL}/api/weblink/getAllParent`
  }
}
export const MENU = {
  ACTION_TYPES: {
    GET_DATA_TREE_MENU: 'MENU/GET_TREE_MENU',
    GET_DATA_LIST_MENU: 'MENU/GET_LIST_MENU'
  },
  URL_API: {
    GET_MENU_API: `${BASE_URL}/api/resource/get-listbox`,
    GET_MENU_TREE_API: `${BASE_URL}/api/resource/get-tree-by-product`
  }
}
//---------------------

export const FAQ = {
  ACTION_TYPES: {
    GET_PAGING: 'FAQ/GET_PAGING',
    GET_LIST: 'FAQ/GET_LIST',
    GET_CATE: 'FAQ/GET_CATE',
    ADD: 'FAQ/ADD',
    UPDATE: 'FAQ/UPDATE',
    DELETE: 'FAQ/DELETE',
    GET_BY_ID: 'FAQ/GET_BY_ID',
    DUPLICATE: 'FAQ/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/faq/paging`,
    GET_LIST_API: `${BASE_URL}/api/faq/get-listbox`,
    GET_CATE: `${BASE_URL}/api/faq/get-cate`,
    ADD_API: `${BASE_URL}/api/faq/add`,
    UPDATE_API: `${BASE_URL}/api/faq/edit`,
    DELETE_API: `${BASE_URL}/api/faq/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/faq/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/faq/duplicate`
  }
}

//---------------------

export const NEWS = {
  ACTION_TYPES: {
    GET_PAGING: 'NEWS/GET_PAGING',
    GET_LIST: 'NEWS/GET_LIST',
    GET_CATE: 'NEWS/GET_CATE',
    ADD: 'NEWS/ADD',
    UPDATE: 'NEWS/UPDATE',
    DELETE: 'NEWS/DELETE',
    GET_BY_ID: 'NEWS/GET_BY_ID',
    DUPLICATE: 'NEWS/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/news/paging`,
    GET_LIST_API: `${BASE_URL}/api/news/get-listbox`,
    GET_CATE: `${BASE_URL}/api/news/get-cate`,
    ADD_API: `${BASE_URL}/api/news/add`,
    UPDATE_API: `${BASE_URL}/api/news/edit`,
    DELETE_API: `${BASE_URL}/api/news/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/news/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/news/duplicate`
  }
}

//---------------------

export const GUIDE = {
  ACTION_TYPES: {
    GET_PAGING: 'GUIDE/GET_PAGING',
    GET_LIST: 'GUIDE/GET_LIST',
    GET_CATE: 'GUIDE/GET_CATE',
    ADD: 'GUIDE/ADD',
    UPDATE: 'GUIDE/UPDATE',
    DELETE: 'GUIDE/DELETE',
    GET_BY_ID: 'GUIDE/GET_BY_ID',
    DUPLICATE: 'GUIDE/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/guide/paging`,
    GET_LIST_API: `${BASE_URL}/api/guide/get-listbox`,
    GET_CATE: `${BASE_URL}/api/guide/get-cate`,
    ADD_API: `${BASE_URL}/api/guide/add`,
    UPDATE_API: `${BASE_URL}/api/guide/edit`,
    DELETE_API: `${BASE_URL}/api/guide/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/guide/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/guide/duplicate`
  }
}
//---------------------

export const NOTICE = {
  ACTION_TYPES: {
    GET_PAGING: 'NOTICE/GET_PAGING',
    GET_LIST: 'NOTICE/GET_LIST',
    GET_CATE: 'NOTICE/GET_CATE',
    ADD: 'NOTICE/ADD',
    UPDATE: 'NOTICE/UPDATE',
    DELETE: 'NOTICE/DELETE',
    GET_BY_ID: 'NOTICE/GET_BY_ID',
    DUPLICATE: 'NOTICE/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/notice/paging`,
    GET_LIST_API: `${BASE_URL}/api/notice/get-listbox`,
    GET_CATE: `${BASE_URL}/api/notice/get-cate`,
    ADD_API: `${BASE_URL}/api/notice/add`,
    UPDATE_API: `${BASE_URL}/api/notice/edit`,
    DELETE_API: `${BASE_URL}/api/notice/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/notice/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/notice/duplicate`
  }
}

//---------------------

export const UPGRADE = {
  ACTION_TYPES: {
    GET_PAGING: 'UPGRADE/GET_PAGING',
    GET_LIST: 'UPGRADE/GET_LIST',
    GET_CATE: 'UPGRADE/GET_CATE',
    ADD: 'UPGRADE/ADD',
    UPDATE: 'UPGRADE/UPDATE',
    DELETE: 'UPGRADE/DELETE',
    GET_BY_ID: 'UPGRADE/GET_BY_ID',
    DUPLICATE: 'UPGRADE/DUPLICATE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/upgrade/paging`,
    GET_LIST_API: `${BASE_URL}/api/upgrade/get-listbox`,
    GET_CATE: `${BASE_URL}/api/upgrade/get-cate`,
    ADD_API: `${BASE_URL}/api/upgrade/add`,
    UPDATE_API: `${BASE_URL}/api/upgrade/edit`,
    DELETE_API: `${BASE_URL}/api/upgrade/delete`,
    GET_BY_ID_API: `${BASE_URL}/api/upgrade/get-by-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/upgrade/duplicate`
  }
}

export const CONFIG = {
  ACTION_TYPES: {
    GET_PAGING: 'CONFIG/GET_PAGING',
    GET_BY_CODE: 'CONFIG/GET_BY_CODE'
  },
  URL_API: {
    GET_BY_CODE_API: `${BASE_URL}/api/config/get-by-code-config`
  }
}
export const COMMON = {
  ACTION_TYPES: {
    GET_USER_INFO: 'COMMON/GET_USER_INFO'
  },
  URL_API: {
    GET_USER_INFO: `${BASE_BFF}/account/userinfo`
  }
}