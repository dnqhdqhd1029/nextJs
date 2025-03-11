import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface
export interface userPopupProps {
  isOpen: boolean
  type: string
  email: string
  nickName: string
  phone: string
  mobile: string
  role: string
  key: number
}
export interface Props {
  userPopup: userPopupProps
}

// 초기값
export const initialState: Props = {
  userPopup: {
    isOpen: false,
    type: '',
    email: '',
    nickName: '',
    phone: '',
    mobile: '',
    role: '',
    key: 0,
  },
}

const myLicenseSlice = createSlice({
  name: 'myLicenseSlice',
  initialState,
  reducers: {
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    initUserPopupAction: state => {
      state.userPopup = {
        isOpen: false,
        type: '',
        email: '',
        nickName: '',
        phone: '',
        mobile: '',
        role: '',
        key: 0,
      }
    },
  },
})

export const { userPopupAction, initUserPopupAction } = myLicenseSlice.actions
export default myLicenseSlice.reducer
