import { IFSort } from '@src/domain/interfaces/ISort'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { WEBLINK } from "@src/domain/constants"
import { IFListboxWebLinkApi, IFDataWebLink, IFPagingWebLinkApi, IFResponseListWebLinkApi } from "@src/domain/models/IWebLink"
import api from "@src/infra/api"

interface IFWebLinkState {
  items: IFDataWebLink[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataWebLink | null
}

const initialState: IFWebLinkState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const get = createAsyncThunk<any, string>(
  WEBLINK.ACTION_TYPES.GET_WEBLINK,
  async (params, thunkAPI) => {
    try {
      return await api.weblinkApi.getApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getParent = createAsyncThunk<any, string>(
  WEBLINK.ACTION_TYPES.GET_PARENT,
  async (params, thunkAPI) => {
    try {
      return await api.weblinkApi.getParentApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getPagingApi = createAsyncThunk<any, IFPagingWebLinkApi>(WEBLINK.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListWebLinkApi = await api.weblinkApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const sortApi = createAsyncThunk<any, IFSort>(WEBLINK.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.weblinkApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getListBoxApi = createAsyncThunk<any, IFListboxWebLinkApi>(WEBLINK.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.weblinkApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getCbxApi = createAsyncThunk<any, IFListboxWebLinkApi>(WEBLINK.ACTION_TYPES.GET_CBX, async (params, thunkAPI) => {
  try {
    return await api.weblinkApi.getCbxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataWebLink>(WEBLINK.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try { 
    return await api.weblinkApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataWebLink>(WEBLINK.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try { 
    return await api.weblinkApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(WEBLINK.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try { 
    return await api.weblinkApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const weblinkSlice = createSlice({
  name: 'WebLink',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(sortApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})