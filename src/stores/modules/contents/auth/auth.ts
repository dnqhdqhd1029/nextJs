import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_EXPIRED_DAYS, ACCESS_TOKEN_NAME } from '~/constants/common'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { GroupDtoForUser, LicenseDto, type ProductDto, SettingsDto, UserDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import type { ShareItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export const defaultScopeList: ShareItem[] = [
  {
    id: USER_PREVILLEGE_CODE.WRITABLE.id,
    name: USER_PREVILLEGE_CODE.WRITABLE.name,
    shortName: USER_PREVILLEGE_CODE.WRITABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.READABLE.id,
    name: USER_PREVILLEGE_CODE.READABLE.name,
    shortName: USER_PREVILLEGE_CODE.READABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.PRIVATE.id,
    name: USER_PREVILLEGE_CODE.PRIVATE.name,
    shortName: USER_PREVILLEGE_CODE.PRIVATE.shortName,
  },
]

export interface UserInfoAuth extends UserDto {
  groupId?: number[]
  userip?: string
  sub?: string
  iat?: number
  exp?: number
}

export type initProps = {
  loggedIn: boolean
  stayLoggedIn: boolean
  licenseInfo: LicenseDto
  userInfo: UserInfoAuth
  userSelectGroup: number
  updateAt: string
  needLicenseCheck: boolean
  currentGroup: GroupDtoForUser
  globalNoti: NotiProps[]
  siteVersion: string
  userCountLimit: {
    isOpen: boolean
    active: boolean
  }
  shareCode: shareCodeProps
  timeZone: string
  timeZoneData: CommonCode | null
  commonCodePreload: FrequentlyUsedCommonCodeProps
  adminSetting: SettingsDto[]
  isDemoLicense: boolean
}

export type accessTokenProps = {
  name: string
  token: string
  option: {
    sameSite: string
    expires: number
  }
}

export type NotiProps = {
  type: string
  style: string
  hasClose: boolean
  isChecked: boolean
  content?: string
  title?: string
  key: string
}

export type FrequentlyUsedCommonCodeProps = {
  version: number
  data: CommonCode[]
}

export type shareCodeDataProps = {
  list: SelectListOptionItem
  jrnlstMediaSrch: SelectListOptionItem
  clipbook: SelectListOptionItem
  news_search: SelectListOptionItem
  project: SelectListOptionItem
  action: SelectListOptionItem
  distribute: SelectListOptionItem
}
export type shareCodeProps = {
  list: string
  jrnlstMediaSrch: string
  clipbook: string
  news_search: string
  project: string
  action: string
  distribute: string
}

export type Props = {
  loggedIn: boolean
  sagaAction: string
  stayLoggedIn: boolean
  licenseInfo: LicenseDto
  userInfo: UserInfoAuth
  userSelectGroup: number
  landingPage: CommonCode[]
  siteVersion: string
  updateAt: string
  signInAt: string
  needLicenseCheck: boolean
  globalNoti: NotiProps[]
  userCountLimit: {
    isOpen: boolean
    active: boolean
  }
  generalProduct: ProductDto
  shareCode: shareCodeProps
  timeZone: string
  shareCodeData: shareCodeDataProps
  timeZoneData: CommonCode
  frequentlyUsedCommonCode: FrequentlyUsedCommonCodeProps
  sharedLinkUrl: string
  isDemoLicense: boolean
  defaultLocale: string
  blockedEmail: string
}

// 초기값
export const initialState: Props = {
  sagaAction: '',
  stayLoggedIn: false,
  userInfo: {},
  loggedIn: false,
  licenseInfo: {},
  userSelectGroup: 0,
  landingPage: [],
  siteVersion: '1.0.1', // 사이트 버전 관리
  updateAt: '',
  signInAt: '',
  defaultLocale: 'ko',
  needLicenseCheck: false,
  globalNoti: [],
  userCountLimit: {
    isOpen: false,
    active: false,
  },
  shareCode: {
    list: 'READABLE',
    jrnlstMediaSrch: 'READABLE',
    clipbook: 'READABLE',
    news_search: 'READABLE',
    project: 'READABLE',
    action: 'READABLE',
    distribute: 'READABLE',
  },
  shareCodeData: {
    list: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    jrnlstMediaSrch: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    clipbook: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    news_search: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    project: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    action: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
    distribute: { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
  },
  generalProduct: {
    productId: 0,
    name: '',
    active: false,
    price: 0,
    mediaOn: true,
    monitorOn: true,
    projectOn: true,
    releaseOn: true,
    jrnlstViaNewsOn: true,
    groupOn: true,
    newsNoticeOn: false,
    dedicatedSupportOn: true,
    userNum: 0,
    groupNum: 0,
    projNum: 0,
    emailNum: 0,
    nwireNum: 0,
    newsNoticeDayLimit: 0,
    isGeneralProduct: false,
    etcProductType: '',
    productCode: '',
  },
  timeZone: 'Asia/Seoul',
  timeZoneData: {
    commonCodeId: 489,
    parentId: 55,
    parentCode: 'TIMEZONE',
    code: 'Asia/Seoul',
    language: 'ko',
    name: '(UTC +09:00) 서울',
    def: true,
    weight: 6200,
  },
  frequentlyUsedCommonCode: {
    version: 0,
    data: [],
  },
  sharedLinkUrl: '',
  isDemoLicense: false,
  blockedEmail: '',
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    sharedLinkUrlAction: (state, action: PayloadAction<string>) => {
      state.sharedLinkUrl = action.payload
    },
    frequentlyUsedCommonCodeAction: (state, action: PayloadAction<FrequentlyUsedCommonCodeProps>) => {
      state.frequentlyUsedCommonCode = action.payload
    },
    globalNotiAction: (state, action: PayloadAction<NotiProps[]>) => {
      state.globalNoti = action.payload
    },
    setLogInAction: (state, action: PayloadAction<initProps>) => {
      state.sagaAction = ''
    },
    setLogOutAction: state => {
      state.sagaAction = ''
    },
    setUserInfoBySettingPage: (state, action: PayloadAction<UserInfoAuth>) => {
      // state.sagaAction = ''
      state.userInfo = action.payload
    },
    setUserInfoPasswordBySettingPage: (state, action: PayloadAction<UserInfoAuth>) => {
      state.sagaAction = ''
    },
    setUserInfoByAdminUser: (state, action: PayloadAction<UserInfoAuth>) => {
      state.sagaAction = ''
    },
    timeZoneAction: (state, action: PayloadAction<{ timeZone: string; timeZoneData: CommonCode }>) => {
      state.timeZone = action.payload.timeZone
      state.timeZoneData = action.payload.timeZoneData
    },
    timeZoneDataAction: (state, action: PayloadAction<CommonCode>) => {
      state.timeZoneData = action.payload
    },
    shareCodeAction: (state, action: PayloadAction<shareCodeProps>) => {
      console.log('shareCodeAction', action.payload)
      const list = defaultScopeList.find(e => e.id === action.payload.list)
      const jrnlstMediaSrch = defaultScopeList.find(e => e.id === action.payload.jrnlstMediaSrch)
      const clipbook = defaultScopeList.find(e => e.id === action.payload.clipbook)
      const news_search = defaultScopeList.find(e => e.id === action.payload.news_search)
      const project = defaultScopeList.find(e => e.id === action.payload.project)
      const actions = defaultScopeList.find(e => e.id === action.payload.action)
      const distribute = defaultScopeList.find(e => e.id === action.payload.distribute)
      state.shareCodeData = {
        list: list ? list : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        jrnlstMediaSrch: jrnlstMediaSrch
          ? jrnlstMediaSrch
          : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        clipbook: clipbook ? clipbook : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        news_search: news_search
          ? news_search
          : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        project: project ? project : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        action: actions ? actions : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        distribute: distribute ? distribute : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
      }
      state.shareCode = action.payload
    },
    userCountLimitAction: (
      state,
      action: PayloadAction<{
        isOpen: boolean
        active: boolean
      }>
    ) => {
      state.userCountLimit = action.payload
    },
    setNeedLicenseCheckAction: (state, action: PayloadAction<boolean>) => {
      state.needLicenseCheck = action.payload
    },
    setStayLoggedInAction: (state, action: PayloadAction<boolean>) => {
      state.stayLoggedIn = action.payload
    },
    setUserInfoAction: (state, action: PayloadAction<UserInfoAuth>) => {
      state.userInfo = action.payload
    },
    setLicenseInfoAction: (state, action: PayloadAction<{ info: LicenseDto; date: string }>) => {
      state.licenseInfo = action.payload.info
      state.updateAt = action.payload.date
      state.needLicenseCheck = false
    },
    setUserSelectGroupAction: (state, action: PayloadAction<number>) => {
      state.userSelectGroup = action.payload
    },
    setLandingPageAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.landingPage = action.payload
    },
    setSiteVersionAction: (state, action: PayloadAction<string>) => {
      state.siteVersion = action.payload
    },
    setUpdateAtAction: (state, action: PayloadAction<string>) => {
      state.updateAt = action.payload
    },
    setBlockedEmailAction: (state, action: PayloadAction<string>) => {
      state.blockedEmail = action.payload
    },
    initUserAction: (state, action: PayloadAction<initProps>) => {
      const list = defaultScopeList.find(e => e.id === action.payload.shareCode.list)
      const jrnlstMediaSrch = defaultScopeList.find(e => e.id === action.payload.shareCode.jrnlstMediaSrch)
      const clipbook = defaultScopeList.find(e => e.id === action.payload.shareCode.clipbook)
      const news_search = defaultScopeList.find(e => e.id === action.payload.shareCode.news_search)
      const project = defaultScopeList.find(e => e.id === action.payload.shareCode.project)
      const actions = defaultScopeList.find(e => e.id === action.payload.shareCode.action)
      const distribute = defaultScopeList.find(e => e.id === action.payload.shareCode.distribute)
      state.shareCodeData = {
        list: list ? list : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        jrnlstMediaSrch: jrnlstMediaSrch
          ? jrnlstMediaSrch
          : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        clipbook: clipbook ? clipbook : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        news_search: news_search
          ? news_search
          : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        project: project ? project : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        action: actions ? actions : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
        distribute: distribute ? distribute : { id: 'READABLE', name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)' },
      }
      if (
        action.payload.licenseInfo &&
        action.payload.licenseInfo.productList &&
        action.payload.licenseInfo.productList.length > 0
      ) {
        const generalProduct = action.payload.licenseInfo.productList.find(e => e.isGeneralProduct)
        state.generalProduct = generalProduct
          ? generalProduct
          : {
              productId: 0,
              name: '',
              active: false,
              price: 0,
              mediaOn: true,
              monitorOn: true,
              projectOn: true,
              releaseOn: true,
              jrnlstViaNewsOn: true,
              groupOn: true,
              newsNoticeOn: false,
              dedicatedSupportOn: true,
              userNum: 0,
              groupNum: 0,
              projNum: 0,
              emailNum: 0,
              nwireNum: 0,
              newsNoticeDayLimit: 0,
              isGeneralProduct: false,
              etcProductType: '',
              productCode: '',
            }
      }
      state.loggedIn = action.payload.loggedIn
      state.userSelectGroup = action.payload.userSelectGroup
      state.stayLoggedIn = action.payload.stayLoggedIn
      state.licenseInfo = action.payload.licenseInfo
      state.userInfo = action.payload.userInfo
      state.updateAt = action.payload.updateAt
      state.needLicenseCheck = false
      state.signInAt = action.payload.updateAt
      state.defaultLocale = 'ko'
      state.globalNoti = action.payload.globalNoti
      state.siteVersion = action.payload.siteVersion
      state.userCountLimit = action.payload.userCountLimit
      state.timeZone = action.payload.timeZone
      state.shareCode = action.payload.shareCode
      if (action.payload.timeZoneData !== null) {
        state.timeZoneData = action.payload.timeZoneData
      }
      state.isDemoLicense = action.payload.isDemoLicense
    },
  },
})

export const {
  setStayLoggedInAction,
  setUserInfoAction,
  setLicenseInfoAction,
  setUserSelectGroupAction,
  setLandingPageAction,
  setSiteVersionAction,
  setUpdateAtAction,
  globalNotiAction,
  setNeedLicenseCheckAction,
  initUserAction,
  setLogInAction,
  setLogOutAction,
  setUserInfoBySettingPage,
  setUserInfoPasswordBySettingPage,
  userCountLimitAction,
  setUserInfoByAdminUser,
  shareCodeAction,
  timeZoneAction,
  timeZoneDataAction,
  sharedLinkUrlAction,
  frequentlyUsedCommonCodeAction,
  setBlockedEmailAction,
} = authSlice.actions
export default authSlice.reducer
