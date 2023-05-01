import type { RootState } from 'app/store'
import { type UserItem, type TypeStatus } from 'shared'

export const selectUserData = (state: RootState): UserItem[] | null => state.user.data
export const selectUserStatus = (state: RootState): TypeStatus => state.user.status
