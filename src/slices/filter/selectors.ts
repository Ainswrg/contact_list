import { type RootState } from 'app/store'
import { type FilterState } from 'shared'

const selectFilters = (state: RootState): FilterState => state.filter

export {
  selectFilters
}
