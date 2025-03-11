import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Props = {
  userId: number
  emailErr: string
  email: string
  passwordErr: string
  password: string
  stayLoggedIn: boolean
  passwordCheckErr: string
  passwordCheck: string
  isLogin: boolean
  initDemo: boolean
  timeOut: string
}

export const initialState: Props = {
  userId: 0,
  initDemo: false,
  emailErr: '',
  email: '',
  passwordErr: '',
  password: '',
  passwordCheckErr: '',
  passwordCheck: '',
  stayLoggedIn: false,
  isLogin: false,
  timeOut: '',
}
export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    errAction: (state, action: PayloadAction<{ passwordErr: string; emailErr: string }>) => {
      state.passwordErr = action.payload.passwordErr
      state.emailErr = action.payload.emailErr
    },
    demoErrAction: (
      state,
      action: PayloadAction<{ passwordCheckErr: string; passwordErr: string; emailErr: string }>
    ) => {
      state.passwordErr = action.payload.passwordErr
      state.passwordCheckErr = action.payload.passwordCheckErr
      state.emailErr = action.payload.emailErr
    },
    emailAction: (state, action: PayloadAction<string>) => {
      state.email = action.payload
      state.emailErr = ''
    },
    demoEmailAction: (state, action: PayloadAction<{ userId: number; email: string; timeOut: string }>) => {
      state.initDemo = true
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.timeOut = action.payload.timeOut
      state.emailErr = ''
    },
    passwordAction: (state, action: PayloadAction<string>) => {
      state.password = action.payload
      state.passwordErr = ''
    },
    passwordCheckAction: (state, action: PayloadAction<string>) => {
      state.passwordCheck = action.payload
      state.passwordCheckErr = ''
    },
    stayLoggedInAction: (state, action: PayloadAction<boolean>) => {
      state.stayLoggedIn = action.payload
    },
    initInputLoginAction: state => {
      state.userId = 0
      state.initDemo = false
      state.emailErr = ''
      state.email = ''
      state.timeOut = ''
      state.passwordErr = ''
      state.password = ''
      state.passwordCheckErr = ''
      state.passwordCheck = ''
      state.stayLoggedIn = false
      state.isLogin = true
    },
  },
})

export const {
  initInputLoginAction,
  demoErrAction,
  passwordCheckAction,
  demoEmailAction,
  errAction,
  stayLoggedInAction,
  passwordAction,
  emailAction,
} = loginSlice.actions
export default loginSlice.reducer
