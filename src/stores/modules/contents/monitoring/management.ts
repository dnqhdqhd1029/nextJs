import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NewsSrchDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}
export interface managementListParamsProps {
  title: string
  page: number
  size: number
  sort: string[]
  ownerId: string
  category: SelectListOptionItem
  shareCode: SelectListOptionItem
}
export interface managementPopupProps {
  isOpen: boolean
  key: number
  type: string
  title: string
  confirmText: string
  value: string
  valueErr: string
  target: string
}

export interface categoryListProps extends SelectListOptionItem {
  count: number
}

export interface managementContentListProps extends NewsSrchDto {
  isOwner: boolean
  notice: boolean
  categoryName: string
  settingList: SelectListOptionItem[]
  shareCodeNm: string
}

export type monitoringPopupProps = {
  isOpen: boolean
  key: number
  type: string
  step: string
  title: string
  confirmText: string
  name: string
  nameErr: string
  category: SelectListOptionItem
  scrop: SelectListOptionItem
  target: SelectListOptionItem
  categoryList: SelectListOptionItem[]
  isDefault: boolean
  keyword: {
    and: string
    or: string
    not: string
  }
  extra: {
    mediaType: MbTagSearchTagItem[]
    mediaLevel: SelectListOptionItem
    media: MbTagSearchTagItem[]
    author: MbTagSearchTagItem[]
    tone: SelectListOptionItem
    tag: MbTagSearchTagItem[]
    url: string
    publishPeriod: SelectListOptionItem
    mediaList: MbTagSearchTagItem[]
    clipbook: SelectListOptionItem
    coverage: SelectListOptionItem
    system: SelectListOptionItem
  }
}

export type managementContentProps = {
  list: managementContentListProps[]
  pageCount: pageCountProps
  apiDto: managementListParamsProps
}

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  monitoringId: number
}

export interface contentDeletePopupProps {
  isOpen: boolean
  key: number
  title: string
}

export type userPopupProps = {
  isOpen: boolean
  email: string
  displayName: string
  phone: string
  mobile: string
  role: string
  keyValue: number
}

export type Props = {
  isLoading: boolean
  pageCount: pageCountProps
  managementListParams: managementListParamsProps
  managementContentListButton: boolean
  managementContentLoading: boolean
  managementContentList: managementContentListProps[]
  managementPopup: managementPopupProps
  sortByOwner: boolean
  categoryList: categoryListProps[]
  categoryTotalList: SelectListOptionItem[]
  categoryCommonCodeList: CommonCode[]
  ownerLayer: {
    layerOpen: boolean
    isList: boolean
    key: string
  }
  managementListParamsContext: string
  ownerGroup: UserDtoForGroup[]
  ownerPopup: ownerPopupProps
  userPopup: userPopupProps
  contentDeletePopup: contentDeletePopupProps
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  userPopup: {
    isOpen: false,
    email: '',
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
    keyValue: 0,
  },
  ownerPopup: {
    isOpen: false,
    key: 0,
    monitoringId: 0,
    name: '',
  },
  ownerGroup: [],
  managementListParamsContext: '',
  ownerLayer: { layerOpen: false, isList: false, key: '' },
  managementContentListButton: false,
  managementContentLoading: false,
  managementListParams: {
    title: '',
    page: 1,
    size: 20,
    ownerId: '',
    sort: ['updateAt!desc'],
    category: { id: '', name: '' },
    shareCode: { id: '', name: '전체' },
  },
  categoryCommonCodeList: [],
  categoryList: [],
  categoryTotalList: [],
  sortByOwner: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  managementContentList: [],
  managementPopup: {
    isOpen: false,
    type: '',
    key: 0,
    title: '',
    confirmText: '',
    value: '',
    valueErr: '',
    target: '',
  },
  contentDeletePopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
}

const monitoringManagementSlice = createSlice({
  name: 'monitoringManagementSlice',
  initialState,
  reducers: {
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
    },
    ownerPopupAction: (state, action: PayloadAction<ownerPopupProps>) => {
      state.ownerPopup = action.payload
    },
    ownerLayerAction: (state, action: PayloadAction<{ layerOpen: boolean; key: string }>) => {
      console.log('ownerLayerAction', action.payload)
      state.ownerLayer.layerOpen = action.payload.layerOpen
      state.ownerLayer.key = action.payload.key
      state.ownerLayer.isList = false
    },
    getOwnerLayerAction: (state, action: PayloadAction<UserDtoForGroup[]>) => {
      state.ownerGroup = action.payload
      state.ownerLayer.isList = true
    },
    categoryListAction: (
      state,
      action: PayloadAction<{
        list: categoryListProps[]
        param: SelectListOptionItem
        categoryTotalList: SelectListOptionItem[]
      }>
    ) => {
      console.log('action.payload.list', action.payload.list)
      state.categoryList = action.payload.list
      state.categoryTotalList = action.payload.categoryTotalList
      state.managementListParams.category = action.payload.param
    },
    categoryCommonCodeListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.categoryCommonCodeList = action.payload
    },
    sortByOwnerAction: (state, action: PayloadAction<{ isOwner: boolean; ownerId: string }>) => {
      if (action.payload.isOwner) {
        state.managementListParams.ownerId = action.payload.ownerId
      } else {
        state.managementListParams.ownerId = ''
      }
      state.sortByOwner = action.payload.isOwner
    },
    managementContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.managementContentListButton = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    managementListParamsContextAction: (state, action: PayloadAction<string>) => {
      state.managementListParamsContext = action.payload
    },
    managementListParamsAction: (state, action: PayloadAction<managementListParamsProps>) => {
      state.managementListParams = action.payload
      if (action.payload.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
    },
    resetManagementListParamsAction: (
      state,
      action: PayloadAction<{ params: managementListParamsProps; button: boolean }>
    ) => {
      state.managementListParams = action.payload.params
      state.managementContentListButton = action.payload.button
      if (action.payload.params.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
    },
    managementContentListAction: (state, action: PayloadAction<managementContentProps>) => {
      state.managementContentList = action.payload.list
      state.managementListParams = action.payload.apiDto
      if (action.payload.apiDto.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
      state.pageCount = action.payload.pageCount
      state.isLoading = false
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        monitoringId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.managementPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        confirmText: '',
        value: '',
        valueErr: '',
        target: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
    },
    managementPopupAction: (state, action: PayloadAction<managementPopupProps>) => {
      state.managementPopup = action.payload
    },
    initManagementPopupAction: state => {
      state.managementPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        confirmText: '',
        value: '',
        valueErr: '',
        target: '',
      }
    },
    initState: state => {
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        monitoringId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.managementListParamsContext = ''
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.managementContentListButton = false
      state.managementContentLoading = false
      state.managementListParams = {
        title: '',
        page: 1,
        size: 20,
        ownerId: '',
        sort: ['updateAt!desc'],
        category: { id: '', name: '' },
        shareCode: { id: '', name: '전체' },
      }
      state.categoryCommonCodeList = []
      state.categoryList = []
      state.categoryTotalList = []
      state.sortByOwner = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.managementContentList = []
      state.managementPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        confirmText: '',
        value: '',
        valueErr: '',
        target: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
    },
  },
})

export const {
  isLoadingAction,
  initState,
  ownerPopupAction,
  managementContentListButtonAction,
  initManagementPopupAction,
  managementPopupAction,
  managementContentListAction,
  resetManagementListParamsAction,
  managementListParamsAction,
  pageCountAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  categoryCommonCodeListAction,
  categoryListAction,
  contentDeletePopupAction,
  managementListParamsContextAction,
} = monitoringManagementSlice.actions
export default monitoringManagementSlice.reducer
