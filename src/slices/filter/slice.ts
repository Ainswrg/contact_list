import { type AnyAction, type Reducer, createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  searchValue: string
}

const initialState: FilterState = {
  searchValue: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  }
})

export const filterReducer: Reducer<FilterState, AnyAction> = filterSlice.reducer
export const { setSearchValue } = filterSlice.actions
