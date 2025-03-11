import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Props = {
  invitationLifeSpan: string
}

// 초기값
export const initialState: Props = {
  invitationLifeSpan: '0',
}

const userRegisterSlice = createSlice({
  name: 'userRegisterSlice',
  initialState,
  reducers: {
    invitationLifeSpanAction: (state, action: PayloadAction<string>) => {
      state.invitationLifeSpan = action.payload
    },
  },
})

export const { invitationLifeSpanAction } = userRegisterSlice.actions
export default userRegisterSlice.reducer
