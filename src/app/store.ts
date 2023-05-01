import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'
import { authReducer } from 'slices/auth/slice'
import { contactReducer } from 'slices/contact/slice'
import { userReducer } from 'slices/user/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
