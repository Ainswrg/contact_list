import { type RootState } from 'app/store'

interface FilterState {
  searchValue: string
}

const selectFilters = (state: RootState): FilterState => state.filter

export {
  selectFilters
}
