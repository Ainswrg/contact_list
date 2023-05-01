import { type ContactItem } from 'shared'
import type { RootState } from '../../app/store'

export const selectContacts = (state: RootState): ContactItem[] => state.contact.list
