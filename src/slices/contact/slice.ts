import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { CONTACTS_URL, type ContactsState, type ContactItem } from 'shared'

const initialState: ContactsState = {
  list: [],
  status: 'idle'
}

export const fetchContacts = createAsyncThunk<ContactItem[]>(
  'contact/fetchContacts',
  async () => {
    try {
      const response = await fetch(CONTACTS_URL)
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
      await fetch(`${CONTACTS_URL}/${id}`, {
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
      .addCase(fetchContacts.pending, (state: ContactsState) => {
        state.status = 'loading'
      })
      .addCase(fetchContacts.fulfilled, (state: ContactsState, action: PayloadAction<ContactItem[]>) => {
        state.status = 'success'
        state.list = action.payload
      })
      .addCase(fetchContacts.rejected, (state: ContactsState) => {
        state.status = 'failed'
      })
      .addCase(deleteContact.pending, (state: ContactsState) => {
        state.status = 'loading'
      })
      .addCase(deleteContact.fulfilled, (state: ContactsState, action: PayloadAction<string>) => {
        state.status = 'success'
        if (action?.payload.length !== 0) {
          state.list = state.list.filter((contact) => contact.id !== action.payload)
        }
      })
      .addCase(deleteContact.rejected, (state: ContactsState) => {
        state.status = 'failed'
      })
  }
})

export const contactReducer: Reducer<ContactsState, AnyAction> = contactSlice.reducer
