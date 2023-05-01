import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { CONTACT_LIST, type ContactState, type ContactItem } from 'shared'

const initialState: ContactState = {
  list: [],
  status: 'idle'
}

export const fetchContact = createAsyncThunk<ContactItem[]>(
  'contact/fetchContact',
  async () => {
    try {
      const response = await fetch(CONTACT_LIST)
      return await response.json()
    } catch (err) {
      return err
    }
  }
)

export const deleteContact = createAsyncThunk<string, string>(
  'contact/deleteContact',
  async (id): Promise<string> => {
    try {
      await fetch(`${CONTACT_LIST}/${id}`, {
        method: 'DELETE'
      })
      return id
    } catch (err) {
      return await Promise.reject(err)
    }
  }
)
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state: ContactState) => {
        state.status = 'loading'
      })
      .addCase(fetchContact.fulfilled, (state: ContactState, action: PayloadAction<ContactItem[]>) => {
        state.status = 'success'
        state.list = action.payload
      })
      .addCase(fetchContact.rejected, (state: ContactState) => {
        state.status = 'failed'
      })
      .addCase(deleteContact.pending, (state: ContactState) => {
        state.status = 'loading'
      })
      .addCase(deleteContact.fulfilled, (state: ContactState, action: PayloadAction<string>) => {
        if (action?.payload.length !== 0) {
          state.list = state.list.filter((contact) => contact.id !== action.payload)
          state.status = 'success'
        }
      })
      .addCase(deleteContact.rejected, (state: ContactState) => {
        state.status = 'failed'
      })
  }
})

export const contactReducer: Reducer<ContactState, AnyAction> = contactSlice.reducer
