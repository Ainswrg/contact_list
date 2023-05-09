import { useCallback, type ChangeEvent, type FC, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { SearchIconWrapper } from 'pages/contactList/styled'
import { Search as SearchIcon } from '@mui/icons-material'
import { debounce } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { fetchContacts, selectFilters, setSearchValue } from 'slices'
import { Search, StyledInputBase } from './styles'

export const SearchComponent: FC = () => {
  const dispatch = useAppDispatch()
  const { searchValue, orderSort } = useAppSelector(selectFilters)
  const navigate = useNavigate()
  const isMounted = useRef(false)

  const memoizedParams = useMemo(() => ({ sortBy: 'name', order: orderSort, search: searchValue }), [searchValue, orderSort])

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )

  const handleSearch = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    updateSearchValue(e.target.value)
  }

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortBy: 'name',
        order: orderSort,
        search: searchValue
      }
      const queryString = qs.stringify(params, {
        skipNulls: true,
        addQueryPrefix: true
      })
      navigate(`${location.pathname}${queryString}`)
    }
    isMounted.current = true
  }, [searchValue, orderSort, navigate, location.pathname])

  useEffect(() => {
    const fetchContactsData = async (): Promise<void> => {
      try {
        await dispatch(fetchContacts(memoizedParams))
      } catch (error) {
        console.error(error)
      }
    }

    fetchContactsData()
  }, [searchValue, orderSort])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => {
          handleSearch(e)
        }}
      />
    </Search>
  )
}
