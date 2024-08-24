import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const initialState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {},
    logout: (state) => {},
  },
})

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer

export const useCurrentToken = (state: RootState) => state.auth.token
export const selectCurrentUser = (state: RootState) => state.auth.user
