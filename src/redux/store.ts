import { authReducer } from './auth/slice'
import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action, AnyAction, Reducer } from '@reduxjs/toolkit'

interface IAuth {
  isAuth: boolean
}

export const store = configureStore({
  reducer: {
    auth: authReducer as Reducer<IAuth, AnyAction>
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
