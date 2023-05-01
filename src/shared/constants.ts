export const USERS_URL = 'https://644781dc7bb84f5a3e408fca.mockapi.io/users'
export const CONTACT_LIST = 'https://644781dc7bb84f5a3e408fca.mockapi.io/contact-list'

export const enum PathRoutes {
  login = '/login',
  contacts = '/contacts'
}

export interface UserItem {
  name: string
  username: string
  avatar: string
  email: string
  id: string
}

export interface ContactItem {
  name: string
  phone: string
  avatar: string
  id: string
}

export interface ContactState {
  list: ContactItem[]
  status: TypeStatus
}

export interface AuthState {
  isAuth: boolean
}
export type TypeStatus = 'idle' | 'loading' | 'failed' | 'success'

export interface UserState {
  data: UserItem[] | null
  status: TypeStatus
}
