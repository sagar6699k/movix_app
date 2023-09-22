import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: {},
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addUrlDetails: (state, action) => {
      state.url = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUrlDetails } = homeSlice.actions

export default homeSlice.reducer