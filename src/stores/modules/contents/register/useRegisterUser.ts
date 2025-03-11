import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'

export type registerUserProps = {
  keyValue: string
  type: string
  email: string
  company: string
  name: string
  nameErr: string
  nickName: string
  password: string
  passwordConfirm: string
  passwordErr: string
  passwordConfirmErr: string
  timeZone: SelectListOptionItem
  phone: string
  telePhone: string
  isNewsLetter: string
  isDone: boolean
}

export type Props = {
  registerUser: registerUserProps
  timeZoneList: SelectListOptionItem[]
  isRegisterUserLoading: boolean
  commonParentCode: string
}

// 초기값
export const initialState: Props = {
  isRegisterUserLoading: false,
  commonParentCode: 'TIMEZONE',
  registerUser: {
    keyValue: '',
    type: '',
    email: '',
    company: '',
    name: '',
    nameErr: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    passwordErr: '',
    passwordConfirmErr: '',
    timeZone: { id: '', name: '' },
    phone: '',
    telePhone: '',
    isNewsLetter: 'yes',
    isDone: false,
  },
  timeZoneList: [],
}

const registerUserSlice = createSlice({
  name: 'registerUserSlice',
  initialState,
  reducers: {
    setRegisterUserAction: (state, action: PayloadAction<registerUserProps>) => {
      state.registerUser = action.payload
    },
    setTimeZoneListAction: (
      state,
      action: PayloadAction<{ list: SelectListOptionItem[]; values: registerUserProps }>
    ) => {
      state.timeZoneList = action.payload.list
      state.registerUser = action.payload.values
    },
    isRegisterUserLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isRegisterUserLoading = action.payload
    },
  },
})

export const { isRegisterUserLoadingAction, setRegisterUserAction, setTimeZoneListAction } = registerUserSlice.actions
export default registerUserSlice.reducer
