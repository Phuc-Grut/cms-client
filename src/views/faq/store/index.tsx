import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import api from "@src/infra/api"

import * as FAQModel from "@src/domain/models/IFAQ"

// ** Imports constants
import { FAQ } from "@src/domain/constants"

interface IFAQState {
  items: FAQModel.IListView[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: FAQModel.IModel | null
}

const initialState: IFAQState = {
  items: [],
  checkInit: false,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, FAQModel.IPagingQuery>(
  FAQ.ACTION_TYPES.GET_PAGING,
  async (params, thunkAPI) => {
    try {
      const response: FAQModel.IPagingList = await api.faqApi.getPagingApi(
        params
      )
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const getCategoryList = createAsyncThunk<any, FAQModel.ICateListView>(
  FAQ.ACTION_TYPES.GET_CATE,
  async (params, thunkAPI) => {
    try {
      const response: FAQModel.ICateListView = await api.faqApi.getCategoryList(
        params
      )
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const addApi = createAsyncThunk<any, FAQModel.IModel>(
  FAQ.ACTION_TYPES.ADD,
  async (params, thunkAPI) => {
    try {
      return await api.faqApi.addApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const editApi = createAsyncThunk<any, FAQModel.IModel>(
  FAQ.ACTION_TYPES.UPDATE,
  async (params, thunkAPI) => {
    try {
      return await api.faqApi.editApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const deleteApi = createAsyncThunk<any, string>(
  FAQ.ACTION_TYPES.DELETE,
  async (id, thunkAPI) => {
    try {
      return await api.faqApi.deleteApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const getByIdApi = createAsyncThunk<any, string>(
  FAQ.ACTION_TYPES.GET_BY_ID,
  async (id, thunkAPI) => {
    try {
      return await api.faqApi.getByIdApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const duplicateApi = createAsyncThunk<any, FAQModel.IDuplicateQuery>(
  FAQ.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.faqApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    updateFaqPlans: (state, action: PayloadAction<FAQModel.IModel>) => {
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

export const { updateFaqPlans } = faqSlice.actions
