import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
  category: '',
  priceRange: [0, 1000],
  sortOrder: '',
  currentPage: 1,
  pageSize: 9,
  maxPrice: 1000,
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ''
      state.category = ''
      state.priceRange = [0, state.maxPrice] // Reset price range
      state.sortOrder = ''
      state.currentPage = 1
      state.pageSize = 9
    },
  },
})

export const {
  setSearchTerm,
  setCategory,
  setPriceRange,
  setSortOrder,
  setCurrentPage,
  setPageSize,
  setMaxPrice,
  clearFilters,
} = carsSlice.actions

export default carsSlice.reducer
