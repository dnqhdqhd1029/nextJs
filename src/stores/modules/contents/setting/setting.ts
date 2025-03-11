import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SettingsDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'
import { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type resetPasswordPopupTypesProps = {
  isOpen: boolean
  currentPassword: string
  password: string
  passwordConfirm: string
  currentPasswordErr: string
  passwordErr: string
  passwordConfirmErr: string
}

export type groupsProps = {
  groupId: string
  name: string
  isMyGroup: boolean
}

export type settingUserHomeDataProps = {
  companyNm: string
  role: string
  license: string
  flagActive: boolean
  groups: GroupDto[]
  timeZone: string
  newsAlarm: boolean
  landingPage: string
  regisAt: string
  lastLoginAt: string
}

export type updateUserProfilePopupTypesProps = {
  isOpen: boolean
  type: string
  title: string
  confirmTitle: string
  password: string
  passwordErr: string
  name: string
  nameErr: string
  nickName: string
  landingData: SelectListOptionItem
  phone: string
  department: string
  position: string
  telePhone: string
  telePhoneErr: string
  isNewsLetter: string
}

export type systemAlarmDataProps = {
  isLoading: boolean
  flagActive: boolean
  addCommentAddCommentContent: boolean
  modifyContentAddCommentContent: boolean
  modifyContentCuContent: boolean
  addCommentOwnerContent: boolean
  modifyContentOwnerContent: boolean
  changeUserInfo: boolean
}

export type companyInfoDataProps = {
  companyId: number
  name: string
  companyNm: string
  type: SelectListOptionItem
  userCount: SelectListOptionItem
  businessNm: string
  website: string
  region: SelectListOptionItem
  regionNm: string
  addressNm: string
  subAddressNm: string
  addressNmErr: string
  isOverseas: boolean
  filesList: FileType[]
  deletefilesList: number[]
}

export type contactInfoPopupTypesProps = {
  isOpen: boolean
  content: string
  contentErr: string
}

export type contactInfoProps = {
  info: string
  email: string
}

export type initContactInfoProps = {
  shareSettingData: shareSettingDataProps
  listOptions: SelectListOptionItem[]
}

export type shareSettingDataProps = {
  isLoading: boolean
  pressMediaListPolicy: SelectListOptionItem
  pressMediaCustomSearchPolicy: SelectListOptionItem
  clipbookPolicy: SelectListOptionItem
  monitoringPolicy: SelectListOptionItem
  projectPolicy: SelectListOptionItem
  activityPolicy: SelectListOptionItem
  distributionPolicy: SelectListOptionItem
}

export type Props = {
  isLoading: boolean
  systemAlarmLoading: boolean
  settingMainLoading: boolean
  shareSettingLoading: boolean
  resetPasswordPopupTypes: resetPasswordPopupTypesProps
  updateUserProfilePopupTypes: updateUserProfilePopupTypesProps
  landingDataList: SelectListOptionItem[]
  settingUserHomeData: settingUserHomeDataProps
  systemAlarmData: systemAlarmDataProps
  companyInfoData: companyInfoDataProps
  companyTypeList: SelectListOptionItem[]
  userCountList: SelectListOptionItem[]
  regionList: SelectListOptionItem[]
  addressPopup: boolean
  commonParentCode: string
  companyInfoLoading: boolean
  timeZoneTotalList: CommonCode[]
  timeZoneList: SelectListOptionItem[]
  timeZoneValue: SelectListOptionItem
  timeZone: string
  contactInfo: contactInfoProps
  contactInfoPopupTypes: contactInfoPopupTypesProps
  shareSettingData: shareSettingDataProps
  listOptions: SelectListOptionItem[]
  settingsValue: SettingsDto[]
  refinedValue: Record<string, string>
  landingPageData: SelectListOptionItem
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  landingPageData: { id: '', name: '' },
  settingMainLoading: false,
  systemAlarmLoading: false,
  shareSettingLoading: false,
  resetPasswordPopupTypes: {
    isOpen: false,
    currentPassword: '',
    password: '',
    passwordConfirm: '',
    currentPasswordErr: '',
    passwordErr: '',
    passwordConfirmErr: '',
  },
  updateUserProfilePopupTypes: {
    isOpen: false,
    type: '',
    title: '',
    confirmTitle: '',
    password: '',
    passwordErr: '',
    name: '',
    nameErr: '',
    nickName: '',
    department: '',
    position: '',
    landingData: { id: '', name: '' },
    phone: '',
    telePhone: '',
    telePhoneErr: '',
    isNewsLetter: 'yes',
  },
  landingDataList: [],
  settingUserHomeData: {
    companyNm: '-',
    license: '-',
    flagActive: false,
    newsAlarm: false,
    role: '-',
    groups: [],
    timeZone: '-',
    landingPage: '-',
    regisAt: '-',
    lastLoginAt: '-',
  },
  systemAlarmData: {
    isLoading: true,
    flagActive: false,
    addCommentAddCommentContent: false,
    modifyContentAddCommentContent: false,
    modifyContentCuContent: false,
    addCommentOwnerContent: false,
    modifyContentOwnerContent: false,
    changeUserInfo: false,
  },
  shareSettingData: {
    isLoading: true,
    pressMediaListPolicy: { id: '', name: '' },
    pressMediaCustomSearchPolicy: { id: '', name: '' },
    clipbookPolicy: { id: '', name: '' },
    monitoringPolicy: { id: '', name: '' },
    projectPolicy: { id: '', name: '' },
    activityPolicy: { id: '', name: '' },
    distributionPolicy: { id: '', name: '' },
  },
  companyInfoData: {
    companyId: 0,
    name: '',
    companyNm: '',
    regionNm: '',
    type: { id: '', name: '' },
    userCount: { id: '', name: '' },
    businessNm: '',
    website: '',
    region: { id: '', name: '' },
    addressNm: '',
    subAddressNm: '',
    addressNmErr: '',
    isOverseas: false,
    filesList: [],
    deletefilesList: [],
  },
  companyInfoLoading: true,
  companyTypeList: [],
  userCountList: [],
  regionList: [],
  addressPopup: false,
  commonParentCode: 'COM_TOTAL_MEMBERS',
  timeZoneTotalList: [],
  timeZoneList: [],
  timeZoneValue: { id: '', name: '' },
  timeZone: '',
  contactInfo: {
    info: '',
    email: '',
  },
  contactInfoPopupTypes: {
    isOpen: false,
    content: '',
    contentErr: '',
  },
  listOptions: [],
  settingsValue: [],
  refinedValue: {},
}

const userSettingSlice = createSlice({
  name: 'userSettingSlice',
  initialState,
  reducers: {
    setUserLandingListAction: (
      state,
      action: PayloadAction<{ list: SelectListOptionItem[]; data: SelectListOptionItem }>
    ) => {
      state.landingDataList = action.payload.list
      state.landingPageData = action.payload.data
    },
    landingPageDataAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.landingPageData = action.payload
    },
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    shareSettingLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.shareSettingLoading = action.payload
    },
    settingMainLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.settingMainLoading = action.payload
    },
    systemAlarmLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.systemAlarmLoading = action.payload
    },
    settingUserHomeDataAction: (state, action: PayloadAction<settingUserHomeDataProps>) => {
      state.settingUserHomeData = action.payload
      state.settingMainLoading = false
    },
    setResetPasswordPopupAction: (state, action: PayloadAction<resetPasswordPopupTypesProps>) => {
      state.resetPasswordPopupTypes = action.payload
    },
    companyInfoDataAction: (state, action: PayloadAction<companyInfoDataProps>) => {
      state.companyInfoData = action.payload
      state.companyInfoLoading = false
    },
    companyInfoLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.companyInfoLoading = action.payload
    },
    timeZoneAction: (state, action: PayloadAction<string>) => {
      state.timeZone = action.payload
    },
    listOptionsAction: (state, action: PayloadAction<initContactInfoProps>) => {
      state.shareSettingData = action.payload.shareSettingData
      state.listOptions = action.payload.listOptions
    },
    timeZoneListAction: (
      state,
      action: PayloadAction<{ list: SelectListOptionItem[]; value: SelectListOptionItem; total: CommonCode[] }>
    ) => {
      state.timeZoneTotalList = action.payload.total
      state.timeZoneList = action.payload.list
      state.timeZoneValue = action.payload.value
      state.timeZone = ''
    },
    timeZoneValueAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.timeZoneValue = action.payload
    },
    contactInfoPopupTypesAction: (state, action: PayloadAction<contactInfoPopupTypesProps>) => {
      state.contactInfoPopupTypes = action.payload
    },
    setUpdateUserProfilePopupTypesAction: (state, action: PayloadAction<updateUserProfilePopupTypesProps>) => {
      state.updateUserProfilePopupTypes = action.payload
    },
    systemAlarmDataAction: (state, action: PayloadAction<systemAlarmDataProps>) => {
      state.systemAlarmData = action.payload
    },
    shareSettingDataAction: (state, action: PayloadAction<shareSettingDataProps>) => {
      state.shareSettingData = action.payload
    },
    userCountListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.userCountList = action.payload
      state.commonParentCode = 'COM_CATEGORY'
    },
    regionListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.regionList = action.payload
      state.commonParentCode = ''
    },
    companyTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.companyTypeList = action.payload
      state.commonParentCode = 'COM_COUNTRY'
    },
    contactInfoAction: (state, action: PayloadAction<contactInfoProps>) => {
      state.contactInfo = action.payload
    },
    initResetPasswordPopupAction: state => {
      state.resetPasswordPopupTypes = {
        isOpen: false,
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        currentPasswordErr: '',
        passwordErr: '',
        passwordConfirmErr: '',
      }
      state.isLoading = false
    },
    initUpdateUserProfilePopupAction: state => {
      state.updateUserProfilePopupTypes = {
        isOpen: false,
        type: '',
        title: '',
        confirmTitle: '',
        password: '',
        passwordErr: '',
        name: '',
        department: '',
        position: '',
        nameErr: '',
        nickName: '',
        landingData: { id: '', name: '' },
        phone: '',
        telePhone: '',
        telePhoneErr: '',
        isNewsLetter: 'yes',
      }
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    initSettingsValueAction: (state, action: PayloadAction<Array<SettingsDto>>) => {
      const data = action.payload as Array<SettingsDto>
      state.settingsValue = data
      state.refinedValue = Object.fromEntries(data.map(({ field, value }) => [field, value]))
    },
  },
})

export const {
  shareSettingLoadingAction,
  setUserLandingListAction,
  setLoadingAction,
  setResetPasswordPopupAction,
  initResetPasswordPopupAction,
  setUpdateUserProfilePopupTypesAction,
  initUpdateUserProfilePopupAction,
  settingUserHomeDataAction,
  systemAlarmDataAction,
  companyInfoDataAction,
  addressPopupAction,
  settingMainLoadingAction,
  userCountListAction,
  companyTypeListAction,
  regionListAction,
  companyInfoLoadingAction,
  timeZoneListAction,
  timeZoneValueAction,
  timeZoneAction,
  systemAlarmLoadingAction,
  contactInfoAction,
  contactInfoPopupTypesAction,
  shareSettingDataAction,
  listOptionsAction,
  initSettingsValueAction,
  landingPageDataAction,
} = userSettingSlice.actions
export default userSettingSlice.reducer
