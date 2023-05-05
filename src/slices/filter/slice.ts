import { type AnyAction, type Reducer, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FilterState, OrderSort } from 'shared'

const initialState: FilterState = {
  searchValue: '',
  orderSort: 'asc'
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setOrderSort: (state, action: PayloadAction<OrderSort>) => {
      state.orderSort = action.payload
    }
  }
})

export const filterReducer: Reducer<FilterState, AnyAction> = filterSlice.reducer
export const { setSearchValue, setOrderSort } = filterSlice.actions
