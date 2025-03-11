import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { extendedShareScopeList } from '~/components/contents/activity/common/defaultData'
import { type SelectListOptionItem, StepItem } from '~/types/common'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type Props = {
  paymentTypeKey: string
  paymentsStep: string
  linkPopup: LinkPopupProps
  addressPopup: boolean
  productCode: string
  paymentInfo: paymentInfoProps
  applicantInfo: applicantInfoProps
  requestInfo: string
  taxBillInfo: taxBillInfoProps
  cashReceiptsInfo: cashReceiptsInfoProps
  agreeNoticeInfo: string[]
  totalAgreeNotice: boolean
  requestPopupTypes: requestPopupTypesProps
  paymentsId: number
  getInfo: boolean
  commonParentCode: string
  invoiceTypeList: SelectListOptionItem[]
  invoiceType: SelectListOptionItem
  payMethodList: SelectListOptionItem[]
  payMethodType: SelectListOptionItem
  companyInfo: companyInfoProps
  isActionButton: boolean
  productId: number
  count: number
  isLoading: boolean
  companyLoading: boolean
}

export type initCompanyInfoProps = {
  companyInfo: companyInfoProps
  taxBillInfo: taxBillInfoProps
  cashReceiptsInfo: cashReceiptsInfoProps
}

export type companyInfoProps = {
  businessNm: string
  zipCode: string
  addressNm: string
  subAddressNm: string
  phone: string
  name: string
  email: string
  companyNm: string
  ceoNm: string
}

export type setPaymentInfoProps = {
  paymentInfo: paymentInfoProps
  applicantInfo: applicantInfoProps
}

export type payActionProps = {
  paymentInfo: paymentInfoProps
  invoiceType: SelectListOptionItem
  payMethodType: SelectListOptionItem
  applicantInfo: applicantInfoProps
  requestInfo: string
  taxBillInfo: taxBillInfoProps
  cashReceiptsInfo: cashReceiptsInfoProps
  agreeNoticeInfo: string[]
  totalAgreeNotice: boolean
  paymentsId: number
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
  name: string
  nameErr: string
  phoneNm: string
  phoneNmErr: string
  email: string
  emailErr: string
  telephone: string
}
export type cashReceiptsInfoProps = {
  getApplicatnInfo: boolean
  name: string
  phoneNm: string
  nameErr: string
  phoneNmErr: string
}

export type taxBillInfoProps = {
  getApplicatnInfo: boolean
  companyNm: string
  name: string
  businessNm: string
  email: string
  zipCode: string
  addressNm: string
  subAddressNm: string
  adminNm: string
  adminPhone: string
  companyNmErr: string
  nameErr: string
  businessNmErr: string
  emailErr: string
  addressNmErr: string
  subAddressNmErr: string
  adminNmErr: string
  adminPhoneErr: string
}

export type applicantInfoProps = {
  email: string
  companyNm: string
  name: string
  phone: string
  phoneCallNm: string
  department: string
  position: string
  phoneCallNmErr: string
  departmentErr: string
  positionErr: string
  businessNm: string
  zipCode: string
  addressNm: string
  subAddressNm: string
}

export type paymentInfoProps = {
  productNm: string[]
  payAmount: number
}

export type LinkPopupProps = {
  isOpen: boolean
  type: string
  dataUrl: string
}

// 초기값
export const initialState: Props = {
  paymentTypeKey: '',
  paymentsStep: '0',
  paymentsId: 0,
  productCode: '',
  paymentInfo: {
    productNm: [],
    payAmount: 0,
  },
  applicantInfo: {
    businessNm: '',
    zipCode: '',
    addressNm: '',
    subAddressNm: '',
    email: '',
    companyNm: '',
    name: '',
    phone: '',
    phoneCallNm: '',
    department: '',
    position: '',
    phoneCallNmErr: '',
    departmentErr: '',
    positionErr: '',
  },
  requestInfo: '',
  taxBillInfo: {
    getApplicatnInfo: true,
    companyNm: '',
    name: '',
    businessNm: '',
    email: '',
    zipCode: '',
    addressNm: '',
    subAddressNm: '',
    adminNm: '',
    adminPhone: '',
    companyNmErr: '',
    nameErr: '',
    businessNmErr: '',
    emailErr: '',
    addressNmErr: '',
    subAddressNmErr: '',
    adminNmErr: '',
    adminPhoneErr: '',
  },
  cashReceiptsInfo: {
    getApplicatnInfo: true,
    name: '',
    phoneNm: '',
    nameErr: '',
    phoneNmErr: '',
  },
  agreeNoticeInfo: [],
  totalAgreeNotice: false,
  linkPopup: {
    isOpen: false,
    type: '',
    dataUrl: '',
  },
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
    name: '',
    nameErr: '',
    phoneNm: '',
    phoneNmErr: '',
    email: '',
    emailErr: '',
    telephone: '',
  },
  companyInfo: {
    businessNm: '',
    zipCode: '',
    addressNm: '',
    subAddressNm: '',
    phone: '',
    name: '',
    email: '',
    companyNm: '',
    ceoNm: '',
  },
  addressPopup: false,
  getInfo: false,
  commonParentCode: 'PAY_METHOD',
  invoiceTypeList: [],
  invoiceType: { id: '', name: '' },
  payMethodList: [],
  payMethodType: { id: '', name: '' },
  isActionButton: false,
  productId: 0,
  count: 0,
  isLoading: true,
  companyLoading: true,
}

const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    setCompanyInfoAction: (state, action: PayloadAction<initCompanyInfoProps>) => {
      state.companyInfo = action.payload.companyInfo
      state.taxBillInfo = action.payload.taxBillInfo
      state.cashReceiptsInfo = action.payload.cashReceiptsInfo
      state.companyLoading = false
    },
    setInfoAction: (state, action: PayloadAction<setPaymentInfoProps>) => {
      state.applicantInfo = action.payload.applicantInfo
      state.paymentInfo = action.payload.paymentInfo
      state.getInfo = true
      state.isLoading = false
    },
    payMethodTypeAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.payMethodType = action.payload
    },
    payMethodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.payMethodList = action.payload
      state.payMethodType = action.payload[0]
      state.commonParentCode = 'INVOICE_TYPE'
    },
    invoiceTypeAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.invoiceType = action.payload
    },
    invoiceTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.invoiceTypeList = action.payload
      state.invoiceType = action.payload[0]
      state.commonParentCode = 'INQUIRY_WHY_CODE'
    },
    requestInfoAction: (state, action: PayloadAction<string>) => {
      state.requestInfo = action.payload
    },
    paymentsIdAction: (
      state,
      action: PayloadAction<{ paymentsId: number; paymentTypeKey: string; count: number; productId: number }>
    ) => {
      state.isLoading = true
      state.paymentsId = action.payload.paymentsId
      state.paymentTypeKey = action.payload.paymentTypeKey
      state.count = action.payload.count
      state.productId = action.payload.productId
      state.commonParentCode = 'PAY_METHOD'
      state.paymentsStep = '0'
      state.productCode = ''
      state.paymentInfo = {
        productNm: [],
        payAmount: 0,
      }
      state.applicantInfo = {
        businessNm: '',
        zipCode: '',
        addressNm: '',
        subAddressNm: '',
        email: '',
        companyNm: '',
        name: '',
        phone: '',
        phoneCallNm: '',
        department: '',
        position: '',
        phoneCallNmErr: '',
        departmentErr: '',
        positionErr: '',
      }
      state.requestInfo = ''
      state.taxBillInfo = {
        getApplicatnInfo: true,
        companyNm: '',
        name: '',
        businessNm: '',
        email: '',
        zipCode: '',
        addressNm: '',
        subAddressNm: '',
        adminNm: '',
        adminPhone: '',
        companyNmErr: '',
        nameErr: '',
        businessNmErr: '',
        emailErr: '',
        addressNmErr: '',
        subAddressNmErr: '',
        adminNmErr: '',
        adminPhoneErr: '',
      }
      state.cashReceiptsInfo = {
        getApplicatnInfo: true,
        name: '',
        phoneNm: '',
        nameErr: '',
        phoneNmErr: '',
      }
      state.agreeNoticeInfo = []
      state.totalAgreeNotice = false
      state.linkPopup = {
        isOpen: false,
        type: '',
        dataUrl: '',
      }
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: [],
        selectedValue: { id: '', name: '' },
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
      state.addressPopup = false
      state.getInfo = false
      state.invoiceTypeList = []
      state.invoiceType = { id: '', name: '' }
      state.payMethodList = []
      state.payMethodType = { id: '', name: '' }
      state.isActionButton = false
    },
    cashReceiptsInfoAction: (state, action: PayloadAction<cashReceiptsInfoProps>) => {
      state.cashReceiptsInfo = action.payload
    },
    taxBillInfoAction: (state, action: PayloadAction<taxBillInfoProps>) => {
      state.taxBillInfo = action.payload
    },
    applicantInfoAction: (state, action: PayloadAction<applicantInfoProps>) => {
      state.applicantInfo = action.payload
    },
    paymentInfoAction: (state, action: PayloadAction<paymentInfoProps>) => {
      state.paymentInfo = action.payload
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    agreeNoticeInfoAction: (state, action: PayloadAction<{ list: string[]; values: boolean; isActive: boolean }>) => {
      state.agreeNoticeInfo = action.payload.list
      state.totalAgreeNotice = !action.payload.values
      state.isActionButton = action.payload.isActive
    },
    requestPopupTypesAction: (state, action: PayloadAction<requestPopupTypesProps>) => {
      state.requestPopupTypes = action.payload
      state.commonParentCode = ''
    },
    resetInAction: state => {
      state.commonParentCode = 'PAY_METHOD'
      state.getInfo = false
    },
    moveConfirmPageAction: state => {
      state.paymentsStep = 'confirm'
    },
    cashPaymentsAction: (state, action: PayloadAction<payActionProps>) => {
      state.paymentsStep = '1'
      state.paymentsId = action.payload.paymentsId
      state.payMethodType = action.payload.payMethodType
      state.cashReceiptsInfo = action.payload.cashReceiptsInfo
      state.taxBillInfo = action.payload.taxBillInfo
      state.invoiceType = action.payload.invoiceType
      state.requestInfo = action.payload.requestInfo
      state.applicantInfo = action.payload.applicantInfo
      state.agreeNoticeInfo = action.payload.agreeNoticeInfo
      state.totalAgreeNotice = action.payload.totalAgreeNotice
      state.paymentInfo = action.payload.paymentInfo
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
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
    },
    initAction: state => {
      state.isLoading = true
      state.paymentsStep = '0'
      state.productCode = ''
      state.paymentInfo = {
        productNm: [],
        payAmount: 0,
      }
      state.applicantInfo = {
        businessNm: '',
        zipCode: '',
        addressNm: '',
        subAddressNm: '',
        email: '',
        companyNm: '',
        name: '',
        phone: '',
        phoneCallNm: '',
        department: '',
        position: '',
        phoneCallNmErr: '',
        departmentErr: '',
        positionErr: '',
      }
      state.requestInfo = ''
      state.taxBillInfo = {
        getApplicatnInfo: true,
        companyNm: '',
        name: '',
        businessNm: '',
        email: '',
        zipCode: '',
        addressNm: '',
        subAddressNm: '',
        adminNm: '',
        adminPhone: '',
        companyNmErr: '',
        nameErr: '',
        businessNmErr: '',
        emailErr: '',
        addressNmErr: '',
        subAddressNmErr: '',
        adminNmErr: '',
        adminPhoneErr: '',
      }
      state.cashReceiptsInfo = {
        getApplicatnInfo: true,
        name: '',
        phoneNm: '',
        nameErr: '',
        phoneNmErr: '',
      }
      state.agreeNoticeInfo = []
      state.totalAgreeNotice = false
      state.linkPopup = {
        isOpen: false,
        type: '',
        dataUrl: '',
      }
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: [],
        selectedValue: { id: '', name: '' },
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
      state.addressPopup = false
      state.getInfo = false
      state.commonParentCode = 'PAY_METHOD'
      state.invoiceTypeList = []
      state.invoiceType = { id: '', name: '' }
      state.payMethodList = []
      state.payMethodType = { id: '', name: '' }
      state.isActionButton = false
    },
  },
})

export const {
  moveConfirmPageAction,
  setCompanyInfoAction,
  initAction,
  resetInAction,
  cashPaymentsAction,
  payMethodTypeAction,
  payMethodListAction,
  invoiceTypeListAction,
  invoiceTypeAction,
  setInfoAction,
  paymentsIdAction,
  applicantInfoAction,
  requestInfoAction,
  addressPopupAction,
  agreeNoticeInfoAction,
  paymentInfoAction,
  cashReceiptsInfoAction,
  taxBillInfoAction,
  requestPopupTypesAction,
  initRequestPopupTypesAction,
} = paymentSlice.actions
export default paymentSlice.reducer
