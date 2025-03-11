import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'

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

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}
export interface pressListParamsProps {
  title: string
  page: number
  size: number
  sort: string[]
  ownerId: string
  shareCode: SelectListOptionItem
}
export interface pressPopupProps {
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

export interface pressContentListProps {
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

export type pressContentProps = { list: pressContentListProps[]; pageCount: pageCountProps }

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  pressId: number
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
  categoryList: categoryListProps[]
  categoryData: categoryListProps
  pageCount: pageCountProps
  pressListKeywordParams: string
  pressListParams: pressListParamsProps
  pressContentListButton: boolean
  pressContentLoading: boolean
  pressContentList: pressContentListProps[]
  pressPopup: pressPopupProps
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
  categoryData: { id: 'press', name: '언론인', count: 0 },
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
    pressId: 0,
    name: '',
  },
  ownerGroup: [],
  pressListKeywordParams: '',
  ownerLayer: { layerOpen: false, isList: false, key: '' },
  pressContentListButton: false,
  pressContentLoading: false,
  pressListParams: {
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
  pressContentList: [],
  pressPopup: {
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
    name: '',
    originName: '',
    nameErr: '',
    scrop: { id: '', name: '' },
    scropTarget: { id: '', name: '' },
    userList: [],
    selectedUser: { id: '', name: '' },
  },
}

const savedSearchPressSlice = createSlice({
  name: 'savedSearchPressSlice',
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
      console.log('savedSearchPopup', action.payload)
      state.savedSearchPopup = action.payload
    },
    pressParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.pressListKeywordParams = action.payload
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
        state.pressListParams.ownerId = action.payload.ownerId
      } else {
        state.pressListParams.ownerId = ''
      }
      state.sortByOwner = action.payload.isOwner
    },
    pressContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressContentListButton = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    pressListParamsAction: (state, action: PayloadAction<pressListParamsProps>) => {
      state.pressListParams = action.payload
    },
    resetPressListParamsAction: (state, action: PayloadAction<{ params: pressListParamsProps; button: boolean }>) => {
      state.pressListParams = action.payload.params
      state.pressContentListButton = action.payload.button
    },
    pressContentListAction: (state, action: PayloadAction<pressContentProps>) => {
      state.pressContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        pressId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.pressPopup = {
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
    pressCategoryChangedAction: state => {
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.pressListKeywordParams = ''
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        pressId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.pressPopup = {
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
        nameErr: '',
        originName: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    pressPopupAction: (state, action: PayloadAction<pressPopupProps>) => {
      state.pressPopup = action.payload
    },
    categoryListAction: (state, action: PayloadAction<categoryListProps[]>) => {
      state.categoryList = action.payload
    },
    initPressPopupAction: state => {
      state.pressPopup = {
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
      state.categoryData = { id: 'press', name: '언론인', count: 0 }
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
        pressId: 0,
        name: '',
      }
      state.ownerGroup = []
      state.pressListKeywordParams = ''
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.pressContentListButton = false
      state.pressContentLoading = false
      state.pressListParams = {
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
      state.pressContentList = []
      state.pressPopup = {
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
  },
})

export const {
  initAction,
  categoryListAction,
  ownerPopupAction,
  pressParamKeywordAction,
  pressContentListButtonAction,
  initPressPopupAction,
  pressPopupAction,
  pressContentListAction,
  resetPressListParamsAction,
  pressListParamsAction,
  pressCategoryChangedAction,
  initSavedSearchPopupAction,
  savedSearchPopupAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  contentDeletePopupAction,
} = savedSearchPressSlice.actions
export default savedSearchPressSlice.reducer
