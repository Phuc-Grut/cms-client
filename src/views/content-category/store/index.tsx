import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '@src/infra/api'

import {
  IFResponseListContentCategoryApi,
  IFListboxContentCategoryApi,
  IFDataContentCategory,
  IFPagingContentCategoryApi
} from '@src/domain/models/IContentCategory'

import { CONTENTCATEGORY } from '@src/domain/constants'
import { IFSort } from '@src/domain/interfaces/ISort'

interface IFContentCategoryState {
  items: IFDataContentCategory[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataContentCategory | null
}

const initialState: IFContentCategoryState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingContentCategoryApi>(CONTENTCATEGORY.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListContentCategoryApi = await api.contentCategoryApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})


export const getListBoxApi = createAsyncThunk<any, IFListboxContentCategoryApi>(CONTENTCATEGORY.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.contentCategoryApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const addApi = createAsyncThunk<any, IFDataContentCategory>(CONTENTCATEGORY.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.contentCategoryApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataContentCategory>(CONTENTCATEGORY.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.contentCategoryApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const sortApi = createAsyncThunk<any, IFSort>(CONTENTCATEGORY.ACTION_TYPES.SORT, async (params, thunkAPI) => {
  try {
    return await api.contentCategoryApi.sortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(CONTENTCATEGORY.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.contentCategoryApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const getParent = createAsyncThunk<any, string>(
  CONTENTCATEGORY.ACTION_TYPES.GET_PARENT,
  async (params, thunkAPI) => {
    try {
      return await api.contentCategoryApi.getParentApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const get = createAsyncThunk<any, string>(
  CONTENTCATEGORY.ACTION_TYPES.GET_CONTENTCATEGORY,
  async (params, thunkAPI) => {
    try {
      return await api.productCategoryApi.getApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)
export const getListComboboxApi = createAsyncThunk(CONTENTCATEGORY.ACTION_TYPES.GET_LIST_CBX, async (_: void, thunkAPI) => {
  try {
    return await api.productCategoryApi.getListComboBoxApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})

export const contentCategorySlice = createSlice({
  name: 'contentCategory',
  initialState,
  reducers: {
    updatecontentCategoryPlans: (state, action: PayloadAction<IFDataContentCategory>) => {
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

export const { updatecontentCategoryPlans } = contentCategorySlice.actions
