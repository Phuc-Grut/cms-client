import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DASHBOARD } from "@src/domain/constants"
import api from "@src/infra/api"

interface State {
  items: []
  checkInit: boolean
  total: number
  pageIndex: number
  pageSize: number
  successfully: boolean
  selected: any
}

const initialState: State = {
  items: [],
  checkInit: false,
  total: 1,
  pageIndex: 1,
  pageSize: 10,
  successfully: false,
  selected: null
}


export const getContentByType = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_CONTENT_BY_TYPE,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getContentByType()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopCategory = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_CATEGORY,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopCategory()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const getTopNewContent = createAsyncThunk<any>(
  DASHBOARD.ACTION_TYPES.GET_TOP_NEW_CONTENT,
  async (params, thunkAPI) => {
    try {
      return await api.dashboardApi.getTopNewContent()
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data })
    }
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateDashboard: (state, action: PayloadAction<State>) => {
      state.selected = action.payload
    }
  },
  extraReducers: () => {
  }
})
export const { updateDashboard } = dashboardSlice.actions