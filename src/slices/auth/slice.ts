import { createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer } from '@reduxjs/toolkit'
import type { AuthState } from 'shared'

const initialState: AuthState = {
  isAuth: localStorage.getItem('isAuth') === 'true'
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
      localStorage.setItem('isAuth', 'true')
    },
    logout: (state) => {
      state.isAuth = false
      localStorage.setItem('isAuth', 'true')
    }
  }
})

export const authReducer: Reducer<AuthState, AnyAction> = authSlice.reducer
export const { login, logout } = authSlice.actions
