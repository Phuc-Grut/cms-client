import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import api from "@src/infra/api"
import { UPGRADE } from "@src/domain/constants"
// ** Imports constants
import * as UpgradeModel from "@src/domain/models/IUpgrade"
interface IUpgradeState {
  items: UpgradeModel.IListView[]
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: UpgradeModel.IModel | null
}

const initialState: IUpgradeState = {
  items: [],
  checkInit: false,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  successfully: false,
  selected: null
}

export const getPagingApi = createAsyncThunk<any, UpgradeModel.IPagingQuery>(
  UPGRADE.ACTION_TYPES.GET_PAGING,
  async (params, thunkAPI) => {
    try {
      const response: UpgradeModel.IPagingList =
        await api.upgradeApi.getPagingApi(params)
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const getCategoryList = createAsyncThunk<
  any,
  UpgradeModel.ICateListView
>(UPGRADE.ACTION_TYPES.GET_CATE, async (params, thunkAPI) => {
  try {
    const response: UpgradeModel.ICateListView =
      await api.upgradeApi.getCategoryList(params)
    return response
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})
export const addApi = createAsyncThunk<any, UpgradeModel.IModel>(
  UPGRADE.ACTION_TYPES.ADD,
  async (params, thunkAPI) => {
    try {
      return await api.upgradeApi.addApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const editApi = createAsyncThunk<any, UpgradeModel.IModel>(
  UPGRADE.ACTION_TYPES.UPDATE,
  async (params, thunkAPI) => {
    try {
      return await api.upgradeApi.editApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const deleteApi = createAsyncThunk<any, string>(
  UPGRADE.ACTION_TYPES.DELETE,
  async (id, thunkAPI) => {
    try {
      return await api.upgradeApi.deleteApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const getByIdApi = createAsyncThunk<any, string>(
  UPGRADE.ACTION_TYPES.GET_BY_ID,
  async (id, thunkAPI) => {
    try {
      return await api.upgradeApi.getByIdApi(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)
export const duplicateApi = createAsyncThunk<any, UpgradeModel.IDuplicateQuery>(
  UPGRADE.ACTION_TYPES.DUPLICATE,
  async (params, thunkAPI) => {
    try {
      return await api.upgradeApi.duplicateApi(params)
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    updateUpgradePlans: (state, action: PayloadAction<UpgradeModel.IModel>) => {
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

export const { updateUpgradePlans } = upgradeSlice.actions
