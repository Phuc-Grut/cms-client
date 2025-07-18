import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '@src/infra/api'

import {
  IFDataContentType,
  IFResponseListContentTypeApi,
  IFPagingContentTypeApi,
  IFListboxContentTypeApi
} from '@src/domain/models/IContentType'

import { CONTENTTYPE } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFContentTypeState {
  items: IFDataContentType[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataContentType | null
}

const initialState: IFContentTypeState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingContentTypeApi>(CONTENTTYPE.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListContentTypeApi = await api.contentTypeApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getListBoxApi = createAsyncThunk<any, IFListboxContentTypeApi>(CONTENTTYPE.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.contentTypeApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataContentType>(CONTENTTYPE.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.contentTypeApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataContentType>(CONTENTTYPE.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.contentTypeApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(CONTENTTYPE.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.contentTypeApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(CONTENTTYPE.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.contentTypeApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const contentTypeSlice = createSlice({
  name: 'ContentType',
  initialState,
  reducers: {
    updateContentTypePlans: (state, action: PayloadAction<IFDataContentType>) => {
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
    builder.addCase(sortApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updateContentTypePlans } = contentTypeSlice.actions
