import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Header } from 'widgets/Header/Header'
import { useAppSelector } from 'app/hooks'
import { selectIsAuth } from 'slices/auth/selectors'

const MainLayout: FC = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <>
      {isAuth && <Header />}
      <Container disableGutters maxWidth={false}>
        <Outlet />
      </Container>
    </>
  )
}

export {
  MainLayout
}
