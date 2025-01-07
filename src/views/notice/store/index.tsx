import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import api from "@src/infra/api"
import { NOTICE } from "@src/domain/constants"
// ** Imports constants
import * as NoticeModel from "@src/domain/models/INotice"
interface INoticeState {
  items: NoticeModel.IListView[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: NoticeModel.IModel | null
}

const initialState: INoticeState = {
  items: [],
  checkInit: false,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, NoticeModel.IPagingQuery>(
  NOTICE.ACTION_TYPES.GET_PAGING,
  async (params, thunkAPI) => {
    try {
      const response: NoticeModel.IPagingList =
        await api.noticeApi.getPagingApi(params)
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const getCategoryList = createAsyncThunk<any, NoticeModel.ICateListView>(
  NOTICE.ACTION_TYPES.GET_CATE,
  async (params, thunkAPI) => {
    try {
      const response: NoticeModel.ICateListView =
        await api.noticeApi.getCategoryList(params)
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const addApi = createAsyncThunk<any, NoticeModel.IModel>(
  NOTICE.ACTION_TYPES.ADD,
  async (params, thunkAPI) => {
    try {
      return await api.noticeApi.addApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const editApi = createAsyncThunk<any, NoticeModel.IModel>(
  NOTICE.ACTION_TYPES.UPDATE,
  async (params, thunkAPI) => {
    try {
      return await api.noticeApi.editApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const deleteApi = createAsyncThunk<any, string>(
  NOTICE.ACTION_TYPES.DELETE,
  async (id, thunkAPI) => {
    try {
      return await api.noticeApi.deleteApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const getByIdApi = createAsyncThunk<any, string>(
  NOTICE.ACTION_TYPES.GET_BY_ID,
  async (id, thunkAPI) => {
    try {
      return await api.noticeApi.getByIdApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const duplicateApi = createAsyncThunk<any, NoticeModel.IDuplicateQuery>(
  NOTICE.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.noticeApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    updateNoticePlans: (state, action: PayloadAction<NoticeModel.IModel>) => {
      state.selected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(addApi.pending, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteApi.pending, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editApi.pending, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(duplicateApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updateNoticePlans } = noticeSlice.actions
