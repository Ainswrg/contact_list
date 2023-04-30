import { createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer } from '@reduxjs/toolkit'
import type { IAuth } from './types'

const initialState: IAuth = {
  isAuth: false
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
    }
  }
})

export const authReducer: Reducer<IAuth, AnyAction> = authSlice.reducer
export const { login, logout } = authSlice.actions
