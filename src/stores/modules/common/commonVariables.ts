import { createSlice } from '@reduxjs/toolkit'

// Interface
export interface CommonVariablesState {
  tagSearchFocusId: string
  persist: boolean
}

// Initial State
export const initialState: CommonVariablesState = {
  tagSearchFocusId: '',
  persist: true,
}

// Slice
const pageSlice = createSlice({
  name: 'commonVariables',
  initialState,
  reducers: {
    setTagSearchFocusId: (state, action) => {
      state.tagSearchFocusId = action.payload
    },
  },
})

export const { setTagSearchFocusId } = pageSlice.actions

export default pageSlice.reducer
