// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {
  const response = await axios.get('/api/bookmarks/data')
  return {
    data: response.data.suggestions,
    bookmarks: response.data.bookmarks
  }
})

export const updateBookmarked = createAsyncThunk('layout/updateBookmarked', async id => {
  await axios.post('/api/bookmarks/update', { id })
  return id
})

export const navbarSlice = createSlice({
  name: 'layout',
  initialState: {
    query: '',
    bookmarks: [],
    suggestions: []
  },
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.suggestions = action.payload.data
        state.bookmarks = action.payload.bookmarks
      })
      .addCase(updateBookmarked.fulfilled, (state: any, action) => {
        let objectToUpdate

        // ** find & update object
        state.suggestions.find((item:any) => {
          if (item.id === action.payload) {
            item.isBookmarked = !item.isBookmarked
            objectToUpdate = item
          }
        })

        // ** Get index to add or remove bookmark from array
        const bookmarkIndex = state.bookmarks.findIndex((x:any) => x.id === action.payload)

        if (bookmarkIndex === -1) {
          state.bookmarks.push(objectToUpdate)
        } else {
          state.bookmarks.splice(bookmarkIndex, 1)
        }
      })
  }
})

export const { handleSearchQuery } = navbarSlice.actions

export default navbarSlice.reducer
