import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import LicenseInformationPopup from '~/components/contents/setting/Member/MyPurchase/Popup/LicenseInformationPopup'
import PaymentInformationPopup from '~/components/contents/setting/Member/MyPurchase/Popup/PaymentInformationPopup'
import { PayRequestDto, PayRequestForListDto } from '~/types/api/service'

export type PayRequestSearchParamsType = {
  page: number
  size: number
  sort: string[]
  keyword: string
}

// Interface
export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export interface PaymentInformationPopupProps {
  isOpen: boolean
  productNameList: string
  licenseName: string
  customerName: string
  payerName: string
  payerEmail: string
  payMethod: string
  depositedAmount: number
  estimatedAmount: number
  depositedAt: string
  invoiceType: string
  isIssueInvoice: string
  reigsName: string
  regisAt: string
}

export interface licensePopupProps {
  isOpen: boolean
  license: string
  mainProductName: string
  startAt: string
  expireAt: string
  userLimit: string
  userCount: string
  emailLimit: number
  nwCount: number
  emailLimitDetail: string[]
  emailLeft: string
  nwLimit: number
  groupLimit: number
  groupCount: number
  companyName: string
  buyerName: string
}
export interface Props {
  invoiceType: string
  listKeywordParams: string
  merchantId: number
  payRequestDetail: PayRequestDto[]
  isMyLicensePopupOpen: boolean
  payList: PayRequestForListDto[]
  payRequestSearchParams: PayRequestSearchParamsType
  pageCount: pageCountProps
  isLoading: boolean
  licensePopup: licensePopupProps
  paymentPopup: PaymentInformationPopupProps
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  invoiceType: '-',
  listKeywordParams: '',
  merchantId: 0,
  payRequestDetail: [],
  isMyLicensePopupOpen: false,
  payList: [],
  payRequestSearchParams: {
    page: 1,
    size: 20,
    sort: ['expireAt!desc'],
    keyword: '',
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  licensePopup: {
    isOpen: false,
    license: '',
    mainProductName: '',
    startAt: '',
    expireAt: '',
    userLimit: '',
    userCount: '',
    emailLimit: 0,
    nwCount: 0,
    emailLimitDetail: [],
    emailLeft: '',
    nwLimit: 0,
    groupLimit: 0,
    groupCount: 0,
    companyName: '',
    buyerName: '',
  },
  paymentPopup: {
    isOpen: false,
    productNameList: '',
    licenseName: '',
    customerName: '',
    payerName: '',
    payerEmail: '',
    payMethod: '',
    depositedAmount: 0,
    estimatedAmount: 0,
    depositedAt: '',
    invoiceType: '',
    isIssueInvoice: '',
    reigsName: '',
    regisAt: '',
  },
}

const myPurchaseSlice = createSlice({
  name: 'myPurchase',
  initialState,
  reducers: {
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    listKeywordParamsAction: (state, action: PayloadAction<string>) => {
      state.listKeywordParams = action.payload
    },
    payListAction: (state, action: PayloadAction<PayRequestForListDto[]>) => {
      state.payList = action.payload
    },
    invoiceTypeAction: (state, action: PayloadAction<string>) => {
      state.invoiceType = action.payload
    },
    merchantIdAction: (state, action: PayloadAction<number>) => {
      state.merchantId = action.payload
    },
    payRequestSearchParamsAction: (state, action: PayloadAction<PayRequestSearchParamsType>) => {
      state.payRequestSearchParams = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    isMyLicensePopupOpenAction: (state, action: PayloadAction<boolean>) => {
      state.isMyLicensePopupOpen = action.payload
    },
    payRequestDetailAction: (state, action: PayloadAction<PayRequestDto[]>) => {
      state.payRequestDetail = action.payload
    },
    licensePopupAction: (state, action: PayloadAction<licensePopupProps>) => {
      state.licensePopup = action.payload
    },
    paymentPopupAction: (state, action: PayloadAction<PaymentInformationPopupProps>) => {
      state.paymentPopup = action.payload
    },
    setPayListAction: (
      state,
      action: PayloadAction<{
        payList: PayRequestForListDto[]
        pageCount: pageCountProps
        apiDto: PayRequestSearchParamsType
      }>
    ) => {
      state.payList = action.payload.payList
      state.pageCount = action.payload.pageCount
      state.payRequestSearchParams = action.payload.apiDto
      state.isLoading = false
    },
    initAction: state => {
      state.isLoading = false
      state.invoiceType = '-'
      state.listKeywordParams = ''
      state.merchantId = 0
      state.payRequestDetail = []
      state.isMyLicensePopupOpen = false
      state.payList = []
      state.payRequestSearchParams = {
        page: 1,
        size: 20,
        sort: ['expireAt!desc'],
        keyword: '',
      }
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.licensePopup = {
        isOpen: false,
        license: '',
        mainProductName: '',
        startAt: '',
        expireAt: '',
        userLimit: '',
        userCount: '',
        emailLimit: 0,
        emailLimitDetail: [],
        emailLeft: '',
        nwLimit: 0,
        groupLimit: 0,
        groupCount: 0,
        companyName: '',
        buyerName: '',
        nwCount: 0,
      }
    },
  },
})

export const {
  initAction,
  setPayListAction,
  isMyLicensePopupOpenAction,
  payListAction,
  pageCountAction,
  merchantIdAction,
  listKeywordParamsAction,
  invoiceTypeAction,
  payRequestSearchParamsAction,
  payRequestDetailAction,
  isLoadingAction,
  licensePopupAction,
  paymentPopupAction,
} = myPurchaseSlice.actions
export default myPurchaseSlice.reducer
