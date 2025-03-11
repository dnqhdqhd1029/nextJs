import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type Props = {
  requestPopupTypes: requestPopupTypesProps
  agreeNoticeInfo: string[]
  totalAgreeNotice: boolean
  isActionButton: boolean
  applicantInfo: applicantInfoProps
  companyInfo: companyInfoProps
  companyTypeList: SelectListOptionItem[]
  userCountList: SelectListOptionItem[]
  commonParentCode: string
  pageType: string
}

export type demoRequestProps = {
  agreeNoticeInfo: string[]
  applicantInfo: applicantInfoProps
  companyInfo: companyInfoProps
}

export type requestPopupTypesProps = {
  isOpen: boolean
  type: string
  selectedList: SelectListOptionItem[]
  selectedValue: SelectListOptionItem
  titleErr: string
  title: string
  contents: string
  contentsErr: string
  filesList: FileType[]
}

export type applicantInfoProps = {
  name: string
  nameErr: string
  phoneNm: string
  phoneNmErr: string
  email: string
  emailErr: string
  position: string
  positionErr: string
  department: string
  departmentErr: string
  telephone: string
  telephoneErr: string
}

export type companyInfoProps = {
  name: string
  nameErr: string
  type: SelectListOptionItem
  userCount: SelectListOptionItem
  website: string
}

// 초기값
export const initialState: Props = {
  requestPopupTypes: {
    isOpen: false,
    type: '',
    selectedList: [],
    selectedValue: { id: '', name: '' },
    titleErr: '',
    title: '',
    contents: '',
    contentsErr: '',
    filesList: [],
  },
  applicantInfo: {
    name: '',
    nameErr: '',
    phoneNm: '',
    phoneNmErr: '',
    email: '',
    emailErr: '',
    position: '',
    positionErr: '',
    department: '',
    departmentErr: '',
    telephone: '',
    telephoneErr: '',
  },
  companyInfo: {
    name: '',
    nameErr: '',
    type: { id: '', name: '' },
    userCount: { id: '', name: '' },
    website: '',
  },
  agreeNoticeInfo: [],
  totalAgreeNotice: false,
  isActionButton: false,
  companyTypeList: [],
  userCountList: [],
  commonParentCode: 'COM_TOTAL_MEMBERS',
  pageType: '0',
}

const demoSlice = createSlice({
  name: 'demoSlice',
  initialState,
  reducers: {
    agreeNoticeInfoAction: (state, action: PayloadAction<{ list: string[]; values: boolean; isActive: boolean }>) => {
      state.agreeNoticeInfo = action.payload.list
      state.totalAgreeNotice = !action.payload.values
      state.isActionButton = action.payload.isActive
    },
    pageTypeAction: state => {
      state.pageType = '1'
    },
    requestPopupTypesAction: (state, action: PayloadAction<requestPopupTypesProps>) => {
      state.requestPopupTypes = action.payload
    },
    applicantInfoAction: (state, action: PayloadAction<applicantInfoProps>) => {
      state.applicantInfo = action.payload
    },
    companyInfoAction: (state, action: PayloadAction<companyInfoProps>) => {
      state.companyInfo = action.payload
    },
    companyTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.companyTypeList = action.payload
      state.companyInfo = {
        ...state.companyInfo,
        type: action.payload.length > 0 ? action.payload[0] : { id: '', name: '' },
      }
      state.commonParentCode = 'INQUIRY_WHY_CODE'
    },
    userCountListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.userCountList = action.payload
      state.companyInfo = {
        ...state.companyInfo,
        userCount: action.payload.length > 0 ? action.payload[0] : { id: '', name: '' },
      }
      state.commonParentCode = 'COM_CATEGORY'
    },
    initRequestPopupTypesAction: state => {
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: state.requestPopupTypes.selectedList,
        selectedValue: { id: '', name: '' },
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
      }
      state.commonParentCode = ''
    },
  },
})

export const {
  pageTypeAction,
  companyTypeListAction,
  userCountListAction,
  companyInfoAction,
  applicantInfoAction,
  agreeNoticeInfoAction,
  requestPopupTypesAction,
  initRequestPopupTypesAction,
} = demoSlice.actions
export default demoSlice.reducer
