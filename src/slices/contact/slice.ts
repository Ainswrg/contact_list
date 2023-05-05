import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AnyAction, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { CONTACTS_URL, type ContactsState, type ContactItem } from 'shared'

const initialState: ContactsState = {
  list: [],
  status: 'idle'
}

interface Params {
  search: string
}

export const fetchContacts = createAsyncThunk<ContactItem[], Params>(
  'contact/fetchContacts',
  async (params) => {
    const { search } = params
    const url = new URL(CONTACTS_URL)
    url.searchParams.append('sortBy', 'name')
    url.searchParams.append('search', search)
    try {
      const response = await fetch(url)
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

export const addContact = createAsyncThunk<ContactItem, Omit<ContactItem, 'id'>>(
  'contact/addContact',
  async (newContact) => {
    try {
      const response = await fetch(CONTACTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
      })
      return await response.json()
    } catch (err) {
      return await Promise.reject(err)
    }
  }
)

export const editContact = createAsyncThunk<ContactItem, ContactItem>(
  'contact/editContact',
  async (editedContact) => {
    try {
      const response = await fetch(`${CONTACTS_URL}/${editedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedContact)
      })
      return await response.json()
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

      .addCase(addContact.pending, (state: ContactsState) => {
        state.status = 'loading'
      })
      .addCase(addContact.fulfilled, (state: ContactsState, action: PayloadAction<ContactItem>) => {
        state.status = 'success'
        if (action?.payload !== undefined) {
          state.list.push(action.payload)
        }
      })
      .addCase(addContact.rejected, (state: ContactsState) => {
        state.status = 'failed'
      })

      .addCase(editContact.pending, (state: ContactsState) => {
        state.status = 'loading'
      })
      .addCase(editContact.fulfilled, (state: ContactsState, action: PayloadAction<ContactItem>) => {
        state.status = 'success'
        if (action?.payload !== undefined) {
          state.list = [...state.list].map((contact) => {
            if (contact.id === action.payload.id) {
              return action.payload
            }

            return contact
          })
        }
      })
      .addCase(editContact.rejected, (state: ContactsState) => {
        state.status = 'failed'
      })
  }
})

export const contactReducer: Reducer<ContactsState, AnyAction> = contactSlice.reducer
