import React from 'react'
import type { FC } from 'react'
import Login from './pages/login/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './pages/contactList/ContactList'
import { PathRoutes } from './shared'

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path={PathRoutes.contacts} element={<ContactList />}/>
      <Route path={PathRoutes.login} element={<Login />}/>
    </Routes>
  )
}
