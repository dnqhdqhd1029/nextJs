import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { InquiryDto, InquiryDtoForList } from '~/types/api/service'
import { type SelectListOptionItem, StepItem } from '~/types/common'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type Props = {
  requestPopupTypes: requestPopupTypesProps
  menuBar: boolean
  inquiryList: Array<InquiryDtoForList>
  page: number
  size: number
  totalCount: number
  totalPageCount: number
  sort: string[]
  detailData: InquiryDto | null
}

export type InquiryDtoForListProps = {
  list: Array<InquiryDtoForList>
  page: number
  totalCount: number
  totalPageCount: number
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
    name: '',
    nameErr: '',
    phoneNm: '',
    phoneNmErr: '',
    email: '',
    emailErr: '',
    telephone: '',
  },
  menuBar: false,
  inquiryList: [],
  page: 1,
  size: 10,
  totalCount: 0,
  totalPageCount: 1,
  sort: ['date!desc'],
  detailData: null,
}

const customerCenterSlice = createSlice({
  name: 'customerCenterSlice',
  initialState,
  reducers: {
    requestPopupTypesAction: (state, action: PayloadAction<requestPopupTypesProps>) => {
      state.menuBar = false
      state.requestPopupTypes = action.payload
    },
    menuBarAction: (state, action: PayloadAction<boolean>) => {
      state.menuBar = action.payload
    },
    inquiryListPageAction: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    detailDataAction: (state, action: PayloadAction<InquiryDto>) => {
      state.detailData = action.payload
    },
    setInquiryListPageAction: (state, action: PayloadAction<InquiryDtoForListProps>) => {
      state.page = action.payload.page
      state.totalCount = action.payload.totalCount
      state.totalPageCount = action.payload.totalPageCount
      state.inquiryList = action.payload.list
    },
    initRequestPopupTypesAction: state => {
      state.menuBar = false
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: state.requestPopupTypes.selectedList,
        selectedValue: { id: '', name: '' },
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
      }
    },
    initCustomerCenterAction: state => {
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
      state.menuBar = false
      state.inquiryList = []
      state.page = 1
      state.size = 10
      state.totalCount = 0
      state.totalPageCount = 1
      state.sort = ['date!desc']
      state.detailData = null
    },
  },
})

export const {
  initCustomerCenterAction,
  detailDataAction,
  inquiryListPageAction,
  setInquiryListPageAction,
  menuBarAction,
  initRequestPopupTypesAction,
  requestPopupTypesAction,
} = customerCenterSlice.actions
export default customerCenterSlice.reducer
