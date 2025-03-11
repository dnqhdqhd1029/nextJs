import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type Props = {
  pageType: string
  isActionButton: boolean
  agreeNoticeInfo: string[]
  totalAgreeNotice: boolean
  applicantInfo: applicantInfoProps
  companyInfo: companyInfoProps
  productInfo: productInfoProps
  addressPopup: boolean
  regionList: SelectListOptionItem[]
  companyTypeList: SelectListOptionItem[]
  userCountList: SelectListOptionItem[]
  commonParentCode: string
  requestPopupTypes: requestPopupTypesProps
  companyLoaing: boolean
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

export type payApplyRequestProps = {
  applicantInfo: applicantInfoProps
  companyInfo: companyInfoProps
  productInfo: productInfoProps
  agreeNoticeInfo: string[]
}

export type productListProps = {
  productId: number
  name: string
  productCode: string
  price: number
  isUserNumFixed: boolean
  bundles: string[]
}

export type applicantInfoProps = {
  name: string
  email: string
  phone: string
  telephone: string
  department: string
  position: string
  phoneErr: string
  telePhoneErr: string
  departmentErr: string
  positionErr: string
}

export type companyInfoProps = {
  name: string
  type: SelectListOptionItem
  userCount: SelectListOptionItem
  region: SelectListOptionItem
  website: string
  zipCode: string
  addressNm: string
  subAddressNm: string
  addressNmErr: string
}

export type productInfoProps = {
  originList: productListProps[]
  typeList: SelectListOptionItem[]
  type: SelectListOptionItem
  userCountList: SelectListOptionItem[]
  userCount: SelectListOptionItem
  detail: string
  isUser: boolean
}

// 초기값
export const initialState: Props = {
  pageType: '0',
  isActionButton: false,
  agreeNoticeInfo: [],
  totalAgreeNotice: false,
  applicantInfo: {
    name: '',
    email: '',
    phone: '',
    telephone: '',
    department: '',
    position: '',
    phoneErr: '',
    telePhoneErr: '',
    departmentErr: '',
    positionErr: '',
  },
  companyInfo: {
    name: '',
    type: { id: '', name: '' },
    userCount: { id: '', name: '' },
    website: '',
    region: { id: '', name: '' },
    zipCode: '',
    addressNm: '',
    subAddressNm: '',
    addressNmErr: '',
  },
  productInfo: {
    originList: [],
    typeList: [],
    type: { id: '', name: '' },
    isUser: false,
    userCountList: [],
    userCount: { id: '', name: '' },
    detail: '',
  },
  companyTypeList: [],
  userCountList: [],
  regionList: [],
  addressPopup: false,
  commonParentCode: 'COM_TOTAL_MEMBERS',
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
  companyLoaing: true,
}

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequestSlice',
  initialState,
  reducers: {
    initDataAction: (
      state,
      action: PayloadAction<{ applicantInfo: applicantInfoProps; companyInfo: companyInfoProps }>
    ) => {
      state.applicantInfo = action.payload.applicantInfo
      state.companyInfo = action.payload.companyInfo
      state.companyLoaing = false
    },
    userCountListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.userCountList = action.payload
      state.commonParentCode = 'COM_CATEGORY'
    },
    regionListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.regionList = action.payload
      state.commonParentCode = 'INQUIRY_WHY_CODE'
    },
    companyTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.companyTypeList = action.payload
      state.commonParentCode = 'COM_COUNTRY'
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    applicantInfoAction: (state, action: PayloadAction<applicantInfoProps>) => {
      state.applicantInfo = action.payload
    },
    productInfoAction: (state, action: PayloadAction<productInfoProps>) => {
      state.productInfo = action.payload
    },
    agreeNoticeInfoAction: (state, action: PayloadAction<{ list: string[]; values: boolean; isActive: boolean }>) => {
      state.agreeNoticeInfo = action.payload.list
      state.totalAgreeNotice = !action.payload.values
      state.isActionButton = action.payload.isActive
    },
    companyInfoAction: (state, action: PayloadAction<companyInfoProps>) => {
      state.companyInfo = action.payload
    },
    pageTypeAction: state => {
      state.pageType = '1'
    },
    requestPopupTypesAction: (state, action: PayloadAction<requestPopupTypesProps>) => {
      state.requestPopupTypes = action.payload
      state.commonParentCode = ''
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
    },
  },
})

export const {
  pageTypeAction,
  userCountListAction,
  regionListAction,
  companyTypeListAction,
  agreeNoticeInfoAction,
  initDataAction,
  productInfoAction,
  applicantInfoAction,
  companyInfoAction,
  addressPopupAction,
  requestPopupTypesAction,
  initRequestPopupTypesAction,
} = purchaseRequestSlice.actions
export default purchaseRequestSlice.reducer
