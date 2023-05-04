import { type ChangeEvent, type FC } from 'react'
// import { Search } from '@mui/icons-material'
import { SearchIconWrapper } from 'pages/contactList/styled'
import { Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import { InputBase } from '@mui/material'

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
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

interface Props {
  searchTerm: string
  setSearchTerm: (e: string) => void
}

export const SearchComponent: FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value)
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
