import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import api from "@src/infra/api"
import { GUIDE } from "@src/domain/constants"
// ** Imports constants
import * as GuideModel from "@src/domain/models/IGuide"
interface IGuideState {
  items: GuideModel.IListView[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: GuideModel.IModel | null
}

const initialState: IGuideState = {
  items: [],
  checkInit: false,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, GuideModel.IPagingQuery>(
  GUIDE.ACTION_TYPES.GET_PAGING,
  async (params, thunkAPI) => {
    try {
      const response: GuideModel.IPagingList = await api.guideApi.getPagingApi(
        params
      )
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const getCategoryList = createAsyncThunk<any, GuideModel.ICateListView>(
  GUIDE.ACTION_TYPES.GET_CATE,
  async (params, thunkAPI) => {
    try {
      const response: GuideModel.ICateListView =
        await api.guideApi.getCategoryList(params)
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const addApi = createAsyncThunk<any, GuideModel.IModel>(
  GUIDE.ACTION_TYPES.ADD,
  async (params, thunkAPI) => {
    try {
      return await api.guideApi.addApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const editApi = createAsyncThunk<any, GuideModel.IModel>(
  GUIDE.ACTION_TYPES.UPDATE,
  async (params, thunkAPI) => {
    try {
      return await api.guideApi.editApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const deleteApi = createAsyncThunk<any, string>(
  GUIDE.ACTION_TYPES.DELETE,
  async (id, thunkAPI) => {
    try {
      return await api.guideApi.deleteApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const getByIdApi = createAsyncThunk<any, string>(
  GUIDE.ACTION_TYPES.GET_BY_ID,
  async (id, thunkAPI) => {
    try {
      return await api.guideApi.getByIdApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const duplicateApi = createAsyncThunk<any, GuideModel.IDuplicateQuery>(
  GUIDE.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.guideApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {
    updateGuidePlans: (state, action: PayloadAction<GuideModel.IModel>) => {
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

export const { updateGuidePlans } = guideSlice.actions
