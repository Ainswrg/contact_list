import React from 'react'
import type { FC } from 'react'
import Login from '../pages/login/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from '../pages/contactList/ContactList'
import { PathRoutes } from '../shared'
import { useAppSelector } from 'app/hooks'
import { selectIsAuth } from 'slices/auth/selectors'

export const AppRoutes: FC = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <Routes>
      <Route path='/' element={isAuth ? <Navigate to={PathRoutes.contacts} /> : <Navigate to={PathRoutes.login} />} />
      <Route path={PathRoutes.contacts} element={isAuth ? <ContactList /> : <Navigate to={PathRoutes.login}/>}/>
      <Route path={PathRoutes.login} element={isAuth ? <Navigate to={PathRoutes.contacts}/> : <Login />}/>
    </Routes>
  )
}
