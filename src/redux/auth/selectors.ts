import type { RootState } from '../store'

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth
