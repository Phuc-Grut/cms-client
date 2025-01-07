import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '@src/infra/api'

import {
  IFDataContent,
  IFResponseListContentApi,
  IFPagingApiParams,
  IFDuplicateContentApi
} from '@src/domain/models/IContent'


// ** Imports constants
import { CONTENT } from '@src/domain/constants'

interface IFContentState {
  items: IFDataContent[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataContent | null
}

const initialState: IFContentState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingApiParams>(CONTENT.ACTION_TYPES.GET_PAGING, async (params, thunkAPI) => {
  try {
    const response: IFResponseListContentApi = await api.contentApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataContent>(CONTENT.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.contentApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataContent>(CONTENT.ACTION_TYPES.UPDATE, async (params, thunkAPI) => {
  try {
    return await api.contentApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(CONTENT.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.contentApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const getByIdApi = createAsyncThunk<any, string>(CONTENT.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
  try {
    return await api.contentApi.getByIdApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const duplicateApi = createAsyncThunk<any, IFDuplicateContentApi >(CONTENT.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.contentApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const contentSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {
    updatecontentPlans: (state, action: PayloadAction<IFDataContent>) => {
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
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

export const { updatecontentPlans } = contentSlice.actions
