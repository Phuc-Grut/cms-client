import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import api from "@src/infra/api"
import { NEWS } from "@src/domain/constants"
// ** Imports constants
import * as NewsModel from "@src/domain/models/INews"
interface INewsState {
  items: NewsModel.IListView[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: NewsModel.IModel | null
}

const initialState: INewsState = {
  items: [],
  checkInit: false,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, NewsModel.IPagingQuery>(
  NEWS.ACTION_TYPES.GET_PAGING,
  async (params, thunkAPI) => {
    try {
      const response: NewsModel.IPagingList = await api.newsApi.getPagingApi(
        params
      )
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const getCategoryList = createAsyncThunk<any, NewsModel.ICateListView>(
  NEWS.ACTION_TYPES.GET_CATE,
  async (params, thunkAPI) => {
    try {
      const response: NewsModel.ICateListView =
        await api.newsApi.getCategoryList(params)
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const addApi = createAsyncThunk<any, NewsModel.IModel>(
  NEWS.ACTION_TYPES.ADD,
  async (params, thunkAPI) => {
    try {
      return await api.newsApi.addApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const editApi = createAsyncThunk<any, NewsModel.IModel>(
  NEWS.ACTION_TYPES.UPDATE,
  async (params, thunkAPI) => {
    try {
      return await api.newsApi.editApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const deleteApi = createAsyncThunk<any, string>(
  NEWS.ACTION_TYPES.DELETE,
  async (id, thunkAPI) => {
    try {
      return await api.newsApi.deleteApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const getByIdApi = createAsyncThunk<any, string>(
  NEWS.ACTION_TYPES.GET_BY_ID,
  async (id, thunkAPI) => {
    try {
      return await api.newsApi.getByIdApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const duplicateApi = createAsyncThunk<any, NewsModel.IDuplicateQuery>(
  NEWS.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.newsApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateNewsPlans: (state, action: PayloadAction<NewsModel.IModel>) => {
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

export const { updateNewsPlans } = newsSlice.actions
