import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LicenseDto, UserDto } from '~/types/api/service'

export interface userInformationPopupProps extends UserDto {
  idKey: number
  department: string
  position: string
  isOpen: boolean
}

export interface licenseInformationPopupProps {
  idKey: number
  isOpen: boolean
  license: null | LicenseDto
}

export type Props = {
  userInformationPopup: userInformationPopupProps
  licenseInformationPopup: licenseInformationPopupProps
}

// 초기값
export const initialState: Props = {
  licenseInformationPopup: {
    idKey: 0,
    isOpen: false,
    license: null,
  },
  userInformationPopup: {
    idKey: 0,
    isOpen: false,
    userId: 0,
    name: '',
    email: '',
    mobile: '',
    phone: '',
    nickname: '',
    displayName: '',
    stateCode: '',
    role: '',
    department: '',
    position: '',
    timezone: '',
    landingPage: '',
    selectedGroupId: 0,
    receiveLetter: true,
    regisAt: '',
    lastLoginAt: '',
    passwdChangeAt: '',
    company: {
      companyId: 0,
      name: '',
      totalMembers: '',
      wsite: '',
    },
    groups: [],
  },
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    licenseInformationPopupAction: (state, action: PayloadAction<licenseInformationPopupProps>) => {
      state.licenseInformationPopup = action.payload
    },
    initLicenseInformationPopupAction: state => {
      state.licenseInformationPopup = {
        idKey: 0,
        isOpen: false,
        license: null,
      }
    },
    userInformationPopupAction: (state, action: PayloadAction<userInformationPopupProps>) => {
      state.userInformationPopup = action.payload
    },
    initUserInformationPopupAction: state => {
      state.userInformationPopup = {
        idKey: 0,
        isOpen: false,
        userId: 0,
        name: '',
        email: '',
        mobile: '',
        phone: '',
        nickname: '',
        displayName: '',
        stateCode: '',
        role: '',
        department: '',
        position: '',
        timezone: '',
        landingPage: '',
        selectedGroupId: 0,
        receiveLetter: true,
        regisAt: '',
        lastLoginAt: '',
        passwdChangeAt: '',
        company: {
          companyId: 0,
          name: '',
          totalMembers: '',
          wsite: '',
        },
        groups: [],
      }
    },
  },
})

export const {
  userInformationPopupAction,
  initLicenseInformationPopupAction,
  licenseInformationPopupAction,
  initUserInformationPopupAction,
} = userSlice.actions
export default userSlice.reducer
