import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { USERS_URL, type UserItem, type UserState } from 'shared'

const initialState: UserState = {
  data: null,
  status: 'idle'
}

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (userNameFromInput: string, { rejectWithValue }) => {
    try {
      const response = await fetch(USERS_URL)
      const usersList = await response.json() as UserItem[]
      const user = usersList.filter(({ username }) => username === userNameFromInput)
      if (user.length !== 0) {
        localStorage.setItem('username', user[0]?.username)
        return user
      }
      return rejectWithValue('err')
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UserState) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchUsers.fulfilled, (state: UserState, action: PayloadAction<UserItem[]>) => {
        state.status = 'success'
        if (action.payload.length !== 0) {
          state.data = action.payload
        }
      })
      .addCase(fetchUsers.rejected, (state: UserState) => {
        state.status = 'failed'
        state.data = null
      })
  }
})

export const userReducer: Reducer<UserState, AnyAction> = userSlice.reducer
