/* eslint-disable react/react-in-jsx-scope */
import React from 'react'

import './App.css'
import Login from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'
import ContactList from './pages/contactList/ContactList'

function App (): any {
  return (
    <Routes>
      <Route path='/' element={<ContactList />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App
