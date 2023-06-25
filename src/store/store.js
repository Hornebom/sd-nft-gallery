import { configureStore } from '@reduxjs/toolkit'
import { dataReducer } from './dataSlice'
import { historyReducer } from './historySlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    history: historyReducer,
  },
})
