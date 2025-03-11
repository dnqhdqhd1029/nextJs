import { NavigationLinkItem, type SortFilterOptionItem } from '~/types/common'

export const DefaultSettingLinks: NavigationLinkItem[] = [
  {
    id: 'information',
    title: '회원 정보',
    pathLink: '/setting/member/information',
  },
  {
    id: 'my-purchase',
    title: '구매 내역',
    pathLink: '/setting/member/my-purchase',
  },
]

export const myPurchaseSortOptionsByData: SortFilterOptionItem[] = [
  {
    id: 'expireAt',
    name: '유효기간',
  },
  {
    id: 'depositedAt',
    name: '결제일',
  },
]

export const DefaultLicensePopup = {
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

export const DefaultPaymentPopup = {
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
}
