// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Api Imports
import api from '@src/infra/api'

import {
  IFDataGroupWebLink,
  IFResponseListGroupWebLinkApi,
  IFPagingGroupWebLinkApi,
  IFListboxGroupWebLinkApi,
  GroupWebLinkSort
} from '@src/domain/models/IGroupWebLink'


// ** Imports constants
import { GROUPWEBLINK } from '@src/domain/constants'

interface IFGroupWebLinkState {
  items: IFDataGroupWebLink[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: IFDataGroupWebLink | null
}

const initialState: IFGroupWebLinkState = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, IFPagingGroupWebLinkApi>(GROUPWEBLINK.ACTION_TYPES.GET_DATA, async (params, thunkAPI) => {
  try {
    const response: IFResponseListGroupWebLinkApi = await api.groupWebLinkApi.getPagingApi(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

// export const getByIdApi = createAsyncThunk<any, string>(GROUPWEBLINK.ACTION_TYPES.GET_BY_ID, async (id, thunkAPI) => {
//   try {
//     return await api.groupWebLinkApi.getByIdApi(id)
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue({ error: error.data })
//   }
// })

export const getListBoxApi = createAsyncThunk<any, IFListboxGroupWebLinkApi>(GROUPWEBLINK.ACTION_TYPES.GET_LISTBOX, async (params, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.getListBoxApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const get_all = createAsyncThunk<any>(GROUPWEBLINK.ACTION_TYPES.GET_ALL_GROUPWEBLINK, async (params, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.getGroupWebLinkAllApi()
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})
export const addApi = createAsyncThunk<any, IFDataGroupWebLink>(GROUPWEBLINK.ACTION_TYPES.ADD, async (params, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.addApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const editApi = createAsyncThunk<any, IFDataGroupWebLink>(GROUPWEBLINK.ACTION_TYPES.EDIT, async (params, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.editApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const deleteApi = createAsyncThunk<any, string>(GROUPWEBLINK.ACTION_TYPES.DELETE, async (id, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.deleteApi(id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const update_sort = createAsyncThunk<any, GroupWebLinkSort>(GROUPWEBLINK.ACTION_TYPES.GROUPWEBLINK_SORT, async (params, thunkAPI) => {
  try {
    return await api.groupWebLinkApi.editGroupWebLinkSortApi(params)
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data })
  }
})
export const groupWebLinkSlice = createSlice({
  name: 'groupWebLink',
  initialState,
  reducers: {
    updategroupWebLinkPlans: (state, action: PayloadAction<IFDataGroupWebLink>) => {
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
    builder.addCase(addApi.rejected, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(deleteApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(editApi.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
    builder.addCase(update_sort.fulfilled, (state) => {
      state.checkInit = !state.checkInit
    })
  }
})

export const { updategroupWebLinkPlans } = groupWebLinkSlice.actions
