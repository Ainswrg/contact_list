import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { CONTACT_LIST, type ContactState, type ContactItem } from 'shared'

const initialState: ContactState = {
  list: []
}

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async () => {
    try {
      const response = await fetch(CONTACT_LIST)
      const contactList = await response.json()

      return contactList
    } catch (err) {
      return err
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
        state.list = []
      })
      .addCase(fetchContact.fulfilled, (state: ContactState, action: PayloadAction<ContactItem[]>) => {
        state.list = action.payload
      })
      .addCase(fetchContact.rejected, (state: ContactState) => {
        state.list = []
      })
  }
})

export const contactReducer: Reducer<ContactState, AnyAction> = contactSlice.reducer
