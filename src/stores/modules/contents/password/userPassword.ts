import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type passwordProps = {
  email: string
  emailErr: string
}

export type resetProps = {
  userId: string
  type: string
  email: string
  password: string
  passwordConfirm: string
  passwordErr: string
  passwordConfirmErr: string
}

export type Props = {
  password: passwordProps
  reset: resetProps
  isResetLoading: boolean
}

// 초기값
export const initialState: Props = {
  password: {
    email: '',
    emailErr: '',
  },
  isResetLoading: false,
  reset: {
    userId: '',
    type: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passwordErr: '',
    passwordConfirmErr: '',
  },
}

const userPasswordSlice = createSlice({
  name: 'userPasswordSlice',
  initialState,
  reducers: {
    setPasswordAction: (state, action: PayloadAction<passwordProps>) => {
      state.password = action.payload
    },
    isResetLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isResetLoading = action.payload
    },
    resetPasswordAction: (state, action: PayloadAction<resetProps>) => {
      state.reset = action.payload
    },
  },
})

export const { setPasswordAction, resetPasswordAction, isResetLoadingAction } = userPasswordSlice.actions
export default userPasswordSlice.reducer
