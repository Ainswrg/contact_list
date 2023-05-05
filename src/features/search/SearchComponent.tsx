import { useCallback, type ChangeEvent, type FC } from 'react'
import { SearchIconWrapper } from 'pages/contactList/styled'
import { Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import { InputBase, debounce } from '@mui/material'
import { useAppDispatch } from 'app/hooks'
import { setSearchValue } from 'slices/filter/slice'

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

export const SearchComponent: FC = () => {
  const dispatch = useAppDispatch()

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
