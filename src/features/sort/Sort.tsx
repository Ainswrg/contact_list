import React, { type FC } from 'react'
import { TextRotateUp, TextRotateVertical } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContactsStatus } from 'slices/contact/selectors'
import { setOrderSort } from 'slices/filter/slice'
import { selectFilters } from 'slices/filter/selectors'
import type { OrderSort } from 'shared'

export const Sort: FC = () => {
  const status = useAppSelector(selectContactsStatus)
  const { orderSort } = useAppSelector(selectFilters)
  const dispatch = useAppDispatch()
  const handleSort = (): void => {
    const order: OrderSort = orderSort === 'asc' ? 'desc' : 'asc'
    dispatch(setOrderSort(order))
  }

  return (
    <Box display={'flex'} justifyContent={'flex-end'}>
      <IconButton
        aria-label='sort'
        onClick={() => {
          handleSort()
        }}
        disabled={status === 'loading'}
      >
        <Typography fontWeight={'bold'}>Sort:</Typography> { orderSort === 'asc'
          ? <TextRotateVertical/>
          : <TextRotateUp /> }
      </IconButton>
    </Box>
  )
}
