import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Props = {
  paramKey: string
}

// 초기값
export const initialState: Props = {
  paramKey: '',
}

const mailInfoLinkSlice = createSlice({
  name: 'mailInfoLinkSlice',
  initialState,
  reducers: {
    paramKeyAction: (state, action: PayloadAction<string>) => {
      state.paramKey = action.payload
    },
  },
})

export const { paramKeyAction } = mailInfoLinkSlice.actions
export default mailInfoLinkSlice.reducer
