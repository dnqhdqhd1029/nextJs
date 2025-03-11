import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}
export interface mediaListParamsProps {
  title: string
  page: number
  size: number
  sort: string[]
  ownerId: string
  shareCode: SelectListOptionItem
}
export interface mediaPopupProps {
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

export interface mediaContentListProps {
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
  conditions: string
  title: string
  shareCode?: string
  contact_id: number
  shareTargetCode?: string
  owner?: UserDtoForGroup
  regisAt?: Date
  updateAt?: Date
  register?: UserDtoForGroup
  updater?: UserDtoForGroup
}

export type mediaContentProps = { list: mediaContentListProps[]; pageCount: pageCountProps }

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  mediaId: number
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

export type savedSearchPopupProps = {
  isOpen: boolean
  isOwner: boolean
  key: number
  name: string
  nameErr: string
  scrop: SelectListOptionItem
  scropTarget: SelectListOptionItem
  userList: SelectListOptionItem[]
  selectedUser: SelectListOptionItem
  originName: string
}

export type Props = {
  categoryList: categoryListProps[]
  categoryData: categoryListProps
  pageCount: pageCountProps
  mediaListParams: mediaListParamsProps
  mediaContentListButton: boolean
  mediaContentLoading: boolean
  mediaListKeywordParams: string
  mediaContentList: mediaContentListProps[]
  mediaPopup: mediaPopupProps
  sortByOwner: boolean
  ownerLayer: {
    layerOpen: boolean
    isList: boolean
    key: string
  }
  ownerGroup: UserDtoForGroup[]
  ownerPopup: ownerPopupProps
  contentDeletePopup: contentDeletePopupProps
  userPopup: userPopupProps
  savedSearchPopup: savedSearchPopupProps
}

// 초기값
export const initialState: Props = {
  categoryData: { id: 'media', name: '매체', count: 0 },
  categoryList: [
    {
      id: 'press',
      name: '언론인',
      count: 0,
    },
    {
      id: 'media',
      name: '매체',
      count: 0,
    },
  ],
  ownerPopup: {
    isOpen: false,
    key: 0,
    mediaId: 0,
    name: '',
  },
  ownerGroup: [],
  mediaListKeywordParams: '',
  ownerLayer: { layerOpen: false, isList: false, key: '' },
  mediaContentListButton: false,
  mediaContentLoading: false,
  mediaListParams: {
    title: '',
    page: 1,
    size: 20,
    ownerId: '',
    sort: ['updateAt!desc'],
    shareCode: { id: '', name: '전체' },
  },
  sortByOwner: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  mediaContentList: [],
  mediaPopup: {
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
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  savedSearchPopup: {
    isOpen: false,
    isOwner: false,
    key: 0,
    originName: '',
    name: '',
    nameErr: '',
    scrop: { id: '', name: '' },
    scropTarget: { id: '', name: '' },
    userList: [],
    selectedUser: { id: '', name: '' },
  },
}

const savedSearchMediaSlice = createSlice({
  name: 'savedSearchMediaSlice',
  initialState,
  reducers: {
    initSavedSearchPopupAction: state => {
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        key: 0,
        name: '',
        nameErr: '',
        originName: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    savedSearchPopupAction: (state, action: PayloadAction<savedSearchPopupProps>) => {
      console.log('savedSearchPopupAction', action.payload)
      state.savedSearchPopup = action.payload
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
    sortByOwnerAction: (state, action: PayloadAction<{ isOwner: boolean; ownerId: string }>) => {
      if (action.payload.isOwner) {
        state.mediaListParams.ownerId = action.payload.ownerId
      } else {
        state.mediaListParams.ownerId = ''
      }
      state.sortByOwner = action.payload.isOwner
    },
    mediaContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaContentListButton = action.payload
    },
    mediaParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.mediaListKeywordParams = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    mediaListParamsAction: (state, action: PayloadAction<mediaListParamsProps>) => {
      state.mediaListParams = action.payload
    },
    resetMediaListParamsAction: (state, action: PayloadAction<{ params: mediaListParamsProps; button: boolean }>) => {
      state.mediaListParams = action.payload.params
      state.mediaContentListButton = action.payload.button
    },
    mediaContentListAction: (state, action: PayloadAction<mediaContentProps>) => {
      state.mediaContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        mediaId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.mediaPopup = {
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
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    mediaCategoryChangedAction: state => {
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.mediaListKeywordParams = ''
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        mediaId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.mediaPopup = {
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
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    mediaPopupAction: (state, action: PayloadAction<mediaPopupProps>) => {
      state.mediaPopup = action.payload
    },
    categoryListAction: (state, action: PayloadAction<categoryListProps[]>) => {
      state.categoryList = action.payload
    },
    initMediaPopupAction: state => {
      state.mediaPopup = {
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
    initAction: state => {
      state.categoryData = { id: 'media', name: '매체', count: 0 }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          count: 0,
        },
        {
          id: 'media',
          name: '매체',
          count: 0,
        },
      ]
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        mediaId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.mediaListKeywordParams = ''
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.mediaContentListButton = false
      state.mediaContentLoading = false
      state.mediaListParams = {
        title: '',
        page: 1,
        size: 20,
        ownerId: '',
        sort: ['updateAt!desc'],
        shareCode: { id: '', name: '전체' },
      }
      state.sortByOwner = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.mediaContentList = []
      state.mediaPopup = {
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
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        key: 0,
        originName: '',
        name: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
  },
})

export const {
  categoryListAction,
  initAction,
  mediaParamKeywordAction,
  ownerPopupAction,
  mediaContentListButtonAction,
  initMediaPopupAction,
  mediaPopupAction,
  mediaContentListAction,
  resetMediaListParamsAction,
  mediaListParamsAction,
  mediaCategoryChangedAction,
  initSavedSearchPopupAction,
  savedSearchPopupAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  contentDeletePopupAction,
} = savedSearchMediaSlice.actions
export default savedSearchMediaSlice.reducer
