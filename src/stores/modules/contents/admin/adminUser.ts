import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authorityOptions } from '~/components/contents/admin/defaultData'
import { type GroupDtoForUser, type UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import type { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'

export type requestSearchParamsType = {
  page: number
  size: number
  sort: string[]
  keyword: string
  role: SelectListOptionItem
  stateCode: SelectListOptionItem
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export type userPopupProps = {
  isLoading: boolean
  isOpen: boolean
  keyValue: number
  type: string
  email: string
  displayName: string
  mobile: string
  mobileErr: string
  role: string
  name: string
  nameErr: string
  nickName: string
  permission: string
  phone: string
  department: string
  position: string
  userGroupList: MbTagSearchResultItem[]
  storedTagItems: MbTagSearchTagItem[]
  groupErrorMessage: string
  groups: GroupDtoForUser[]
  password: string
  passwordErr: string
  passwordAction: number
  userStatus: string
}
export type Props = {
  isLoading: boolean
  isOnlyActiveUser: boolean
  userPopup: userPopupProps
  commonParentCode: string
  requestSearchText: string
  userParamKeyword: string
  requestSearchParams: requestSearchParamsType
  pageCount: pageCountProps
  userList: UserDto[]
  pageGroupList: GroupDto[]
  certificationOtp: {
    otpNm: string
    otpErr: string
  }
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  commonParentCode: '',
  userParamKeyword: '',
  userPopup: {
    isLoading: true,
    isOpen: false,
    type: '',
    keyValue: 0,
    email: '',
    displayName: '',
    phone: '',
    mobile: '',
    mobileErr: '',
    department: '',
    position: '',
    role: '',
    name: '',
    nameErr: '',
    nickName: '',
    permission: '',
    userGroupList: [],
    storedTagItems: [],
    groupErrorMessage: '',
    groups: [],
    password: '',
    passwordErr: '',
    passwordAction: 0,
    userStatus: '',
  },
  requestSearchText: '',
  requestSearchParams: {
    page: 1,
    size: 20,
    sort: ['name!desc'],
    keyword: '',
    role: { id: '', name: '' },
    stateCode: { id: '', name: '' },
  },
  isOnlyActiveUser: false,
  userList: [],
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  pageGroupList: [],
  certificationOtp: {
    otpNm: '',
    otpErr: '',
  },
}

const adminUserSlice = createSlice({
  name: 'adminUserSlice',
  initialState,
  reducers: {
    isOnlyActiveUserAction: (state, action: PayloadAction<boolean>) => {
      state.isOnlyActiveUser = action.payload
    },
    userProfilePopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    setPageGroupListAction: (state, action: PayloadAction<GroupDto[]>) => {
      state.pageGroupList = action.payload
    },
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initUserProfilePopupAction: (
      state,
      action: PayloadAction<{ isLoading: boolean; isOpen: boolean; keyValue: number; type: string }>
    ) => {
      state.userPopup = {
        isLoading: action.payload.isLoading,
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        keyValue: action.payload.keyValue,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        mobileErr: '',
        role: '',
        name: '',
        nameErr: '',
        nickName: '',
        permission: '',
        department: '',
        position: '',
        userGroupList: [],
        storedTagItems: [],
        groupErrorMessage: '',
        groups: [],
        password: '',
        passwordErr: '',
        passwordAction: 0,
        userStatus: '',
      }
    },
    requestSearchTextAction: (state, action: PayloadAction<string>) => {
      state.requestSearchText = action.payload
    },
    requestSearchParamsAction: (state, action: PayloadAction<requestSearchParamsType>) => {
      state.requestSearchParams = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    certificationOtpAction: (
      state,
      action: PayloadAction<{
        otpNm: string
        otpErr: string
      }>
    ) => {
      state.certificationOtp = action.payload
    },
    userParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.userParamKeyword = action.payload
    },
    setListAction: (
      state,
      action: PayloadAction<{ list: UserDto[]; pageCount: pageCountProps; apiDto: requestSearchParamsType }>
    ) => {
      state.userList = action.payload.list
      state.requestSearchParams = action.payload.apiDto
      state.pageCount = action.payload.pageCount
    },
    initAction: state => {
      state.commonParentCode = ''
      state.userPopup = {
        isLoading: true,
        isOpen: false,
        type: '',
        keyValue: 0,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        mobileErr: '',
        role: '',
        name: '',
        nameErr: '',
        nickName: '',
        permission: '',
        department: '',
        position: '',
        userGroupList: [],
        storedTagItems: [],
        groupErrorMessage: '',
        groups: [],
        password: '',
        passwordErr: '',
        passwordAction: 0,
        userStatus: '',
      }
      state.userParamKeyword = ''
      state.requestSearchText = ''
      state.requestSearchParams = {
        page: 1,
        size: 20,
        sort: ['name!desc'],
        keyword: '',
        role: { id: '', name: '' },
        stateCode: { id: '', name: '' },
      }
      state.userList = []
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.pageGroupList = []
      state.certificationOtp = {
        otpNm: '',
        otpErr: '',
      }
    },
  },
})

export const {
  certificationOtpAction,
  requestSearchTextAction,
  initUserProfilePopupAction,
  setListAction,
  userProfilePopupAction,
  requestSearchParamsAction,
  pageCountAction,
  setPageGroupListAction,
  initAction,
  userParamKeywordAction,
  isLoadingAction,
  isOnlyActiveUserAction,
} = adminUserSlice.actions

export default adminUserSlice.reducer
