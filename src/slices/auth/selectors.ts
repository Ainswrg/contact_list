import type { RootState } from '../../app/store'

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth
