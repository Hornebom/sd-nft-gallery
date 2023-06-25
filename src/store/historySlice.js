import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
  name: 'history',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToHistory({ items }, action) {
      items.unshift(action.payload)
    },
  },
})

export const { addToHistory } = historySlice.actions
export const { reducer: historyReducer } = historySlice
