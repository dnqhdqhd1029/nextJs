import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type ClipBookDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export type contentAllShareCodePopupProps = {
  isOpen: boolean
  key: MbTagSearchTagItem[]
  scrop: SelectListOptionItem
}

export interface contentAllDeletePopupProps {
  isOpen: boolean
  key: MbTagSearchTagItem[]
}

export interface clipbookListParamsProps {
  title: string
  page: number
  size: number
  sort: string[]
  ownerId: string
  category: SelectListOptionItem
  shareCode: SelectListOptionItem
}

export interface categoryListProps extends SelectListOptionItem {
  count: number
}

export type pressReleaseInfoProps = {
  id: string
  title: string
}
export interface clipbookContentListProps extends ClipBookDto {
  isEdit: boolean
  isOwner: boolean
  categoryName: string
  settingList: SelectListOptionItem[]
  shareCodeNm: string
  pressReleaseInfo: pressReleaseInfoProps[]
}

export type clipbookContentProps = {
  list: clipbookContentListProps[]
  pageCount: pageCountProps
  apiDto: clipbookListParamsProps
}

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  clipBookId: number
  type: string
  title: string
}
export interface clipbookDetailPopupProps {
  isOpen: boolean
  data: clipbookContentListProps | null
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

export type clipbookCopyPopupProps = {
  isOpen: boolean
  key: number
  name: string
  nameErr: string
  categoryList: SelectListOptionItem[]
  category: SelectListOptionItem
  scrop: SelectListOptionItem
}

export type Props = {
  isLoading: boolean
  clipbookListKeywords: string
  pageCount: pageCountProps
  clipbookListParams: clipbookListParamsProps
  clipbookContentListButton: boolean
  clipbookContentLoading: boolean
  clipbookContentList: clipbookContentListProps[]
  sortByOwner: boolean
  categoryList: categoryListProps[]
  categoryCommonCodeList: CommonCode[]
  ownerLayer: {
    layerOpen: boolean
    isList: boolean
    key: string
  }
  ownerGroup: UserDtoForGroup[]
  ownerPopup: ownerPopupProps
  contentDeletePopup: contentDeletePopupProps
  userPopup: userPopupProps
  clipbookDetailPopup: clipbookDetailPopupProps
  clipbookCopyPopup: clipbookCopyPopupProps
  searchContentKeyList: clipbookContentListProps[]
  optionButton: {
    isDelete: boolean
    isShared: boolean
  }
  contentAllDeletePopup: contentAllDeletePopupProps
  contentAllShareCodePopup: contentAllShareCodePopupProps
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  ownerPopup: {
    isOpen: false,
    key: 0,
    clipBookId: 0,
    type: '',
    title: '',
    name: '',
  },
  ownerGroup: [],
  ownerLayer: { layerOpen: false, isList: false, key: '' },
  clipbookContentListButton: false,
  clipbookContentLoading: false,
  clipbookListKeywords: '',
  clipbookListParams: {
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
  sortByOwner: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  clipbookContentList: [],
  searchContentKeyList: [],
  optionButton: {
    isDelete: false,
    isShared: false,
  },
  contentDeletePopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  clipbookDetailPopup: {
    isOpen: false,
    data: null,
  },
  clipbookCopyPopup: {
    isOpen: false,
    key: 0,
    name: '',
    nameErr: '',
    categoryList: [],
    category: { id: '', name: '' },
    scrop: { id: '', name: '' },
  },
  contentAllShareCodePopup: {
    isOpen: false,
    key: [],
    scrop: { id: '', name: '' },
  },
  contentAllDeletePopup: {
    isOpen: false,
    key: [],
  },
}

const monitoringClipbookSlice = createSlice({
  name: 'monitoringClipbookSlice',
  initialState,
  reducers: {
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clipbookCopyPopupAction: (state, action: PayloadAction<clipbookCopyPopupProps>) => {
      state.clipbookCopyPopup = action.payload
    },
    initClipbookCopyPopupAction: state => {
      state.clipbookCopyPopup = {
        isOpen: false,
        key: 0,
        name: '',
        nameErr: '',
        categoryList: [],
        category: { id: '', name: '' },
        scrop: { id: '', name: '' },
      }
    },
    clipbookDetailPopupAction: (state, action: PayloadAction<clipbookDetailPopupProps>) => {
      state.clipbookDetailPopup = action.payload
    },
    searchContentKeyListAction: (
      state,
      action: PayloadAction<{ param: clipbookContentListProps[]; isDelete: boolean; isShared: boolean }>
    ) => {
      state.searchContentKeyList = action.payload.param
      state.optionButton.isDelete = action.payload.isDelete
      state.optionButton.isShared = action.payload.isShared
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
      state.ownerLayer.layerOpen = action.payload.layerOpen
      state.ownerLayer.key = action.payload.key
      state.ownerLayer.isList = false
    },
    getOwnerLayerAction: (state, action: PayloadAction<UserDtoForGroup[]>) => {
      state.ownerGroup = action.payload
      state.ownerLayer.isList = true
    },
    categoryListAction: (state, action: PayloadAction<{ list: categoryListProps[]; param: SelectListOptionItem }>) => {
      console.log('categoryListAction', action.payload)
      state.categoryList = action.payload.list
      state.clipbookListParams.category = action.payload.param
      state.searchContentKeyList = []
    },
    sortByOwnerAction: (state, action: PayloadAction<{ isOwner: boolean; ownerId: string }>) => {
      if (action.payload.isOwner) {
        state.clipbookListParams.ownerId = action.payload.ownerId
      } else {
        state.clipbookListParams.ownerId = ''
      }
      state.sortByOwner = action.payload.isOwner
      state.searchContentKeyList = []
    },
    clipbookContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.clipbookContentListButton = action.payload
    },
    clipbookListKeywordsAction: (state, action: PayloadAction<string>) => {
      state.clipbookListKeywords = action.payload
    },
    clipbookListParamsAction: (state, action: PayloadAction<{ props: clipbookListParamsProps; isReset?: boolean }>) => {
      state.clipbookListParams = action.payload.props
      if (action.payload.props.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
      if (action.payload.isReset) {
        state.searchContentKeyList = []
      }
    },
    resetClipbookListParamsAction: (
      state,
      action: PayloadAction<{ params: clipbookListParamsProps; button: boolean }>
    ) => {
      console.log('resetClipbookListParamsAction', action.payload)
      state.clipbookListParams = action.payload.params
      if (action.payload.params.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
      state.clipbookContentListButton = action.payload.button
    },
    contentAllShareCodePopupAction: (state, action: PayloadAction<contentAllShareCodePopupProps>) => {
      state.contentAllShareCodePopup = action.payload
    },
    contentAllDeletePopupAction: (state, action: PayloadAction<contentAllDeletePopupProps>) => {
      state.contentAllDeletePopup = action.payload
    },
    clipbookContentListAction: (state, action: PayloadAction<clipbookContentProps>) => {
      state.isLoading = false
      state.clipbookContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.clipbookListParams = action.payload.apiDto
      if (action.payload.apiDto.ownerId !== '') {
        state.sortByOwner = true
      } else {
        state.sortByOwner = false
      }
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        clipBookId: 0,
        type: '',
        title: '',
        name: '',
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
      state.clipbookDetailPopup = {
        isOpen: false,
        data: null,
      }
      state.clipbookCopyPopup = {
        isOpen: false,
        key: 0,
        name: '',
        nameErr: '',
        categoryList: [],
        category: { id: '', name: '' },
        scrop: { id: '', name: '' },
      }
      state.contentAllShareCodePopup = {
        isOpen: false,
        key: [],
        scrop: { id: '', name: '' },
      }
      state.contentAllDeletePopup = {
        isOpen: false,
        key: [],
      }
      state.searchContentKeyList = []
    },
    initState: state => {
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        clipBookId: 0,
        type: '',
        title: '',
        name: '',
      }
      state.ownerGroup = []
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.clipbookContentListButton = false
      state.clipbookContentLoading = false
      state.clipbookListKeywords = ''
      state.clipbookListParams = {
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
      state.sortByOwner = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.searchContentKeyList = []
      state.clipbookContentList = []
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
      state.clipbookDetailPopup = {
        isOpen: false,
        data: null,
      }
      state.clipbookCopyPopup = {
        isOpen: false,
        key: 0,
        name: '',
        nameErr: '',
        categoryList: [],
        category: { id: '', name: '' },
        scrop: { id: '', name: '' },
      }
      state.contentAllShareCodePopup = {
        isOpen: false,
        key: [],
        scrop: { id: '', name: '' },
      }
      state.contentAllDeletePopup = {
        isOpen: false,
        key: [],
      }
    },
  },
})

export const {
  initState,
  clipbookListKeywordsAction,
  ownerPopupAction,
  clipbookContentListButtonAction,
  clipbookContentListAction,
  resetClipbookListParamsAction,
  clipbookListParamsAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  categoryListAction,
  contentDeletePopupAction,
  clipbookDetailPopupAction,
  initClipbookCopyPopupAction,
  clipbookCopyPopupAction,
  searchContentKeyListAction,
  contentAllShareCodePopupAction,
  contentAllDeletePopupAction,
  isLoadingAction,
} = monitoringClipbookSlice.actions
export default monitoringClipbookSlice.reducer
