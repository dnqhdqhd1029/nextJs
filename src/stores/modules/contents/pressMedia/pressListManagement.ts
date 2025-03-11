import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PressContentDetailPopup from '~/components/contents/pressMedia/List/Search/Press/Popup/PressContentDetailPopup'
import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'

export type pressGroupPopupProps = {
  isOpen: boolean
  isOwner: boolean
  title: string
  confirmText: string
  type: string
  key: number
  name: string
  originName: string
  nameErr: string
  scrop: SelectListOptionItem
  targetGroup: SelectListOptionItem
  isDefaultChecked: boolean
  groupList: SelectListOptionItem[]
  userList: SelectListOptionItem[]
  selectedUser: SelectListOptionItem
}

export type pressContentDetailPopupProps = {
  isOpen: boolean
  data: pressContentListProps | null
}

export type contentAllShareCodePopupProps = {
  isOpen: boolean
  key: MbTagSearchTagItem[]
  scrop: SelectListOptionItem
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

export interface pressContentListProps extends JournalistMediaGroupItem {
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
}

export type pressContentProps = { list: pressContentListProps[]; pageCount: pageCountProps }

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  pressId: number
  title: string
}

export interface contentAllDeletePopupProps {
  isOpen: boolean
  key: MbTagSearchTagItem[]
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

export interface categoryListProps extends SelectListOptionItem {
  count: number
}

export type Props = {
  categoryData: categoryListProps
  categoryList: categoryListProps[]
  pageCount: pageCountProps
  pressListParams: pressListParamsProps
  pressContentListButton: boolean
  pressContentLoading: boolean
  pressListKeywordParams: string
  pressContentList: pressContentListProps[]
  pressPopup: pressPopupProps
  searchContentKeyList: pressContentListProps[]
  sortByOwner: boolean
  ownerLayer: {
    layerOpen: boolean
    isList: boolean
    key: string
  }
  optionButton: {
    isDelete: boolean
    isShared: boolean
  }
  ownerGroup: UserDtoForGroup[]
  ownerPopup: ownerPopupProps
  contentDeletePopup: contentDeletePopupProps
  userPopup: userPopupProps
  pressGroupPopup: pressGroupPopupProps
  pressContentDetailPopup: pressContentDetailPopupProps
  isSelectedAllActionId: boolean
  contentAllDeletePopup: contentAllDeletePopupProps
  contentAllShareCodePopup: contentAllShareCodePopupProps
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
    title: '',
  },
  optionButton: {
    isDelete: false,
    isShared: false,
  },
  pressListKeywordParams: '',
  isSelectedAllActionId: false,
  searchContentKeyList: [],
  pressContentDetailPopup: {
    isOpen: false,
    data: null,
  },
  ownerGroup: [],
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
  pressGroupPopup: {
    isOpen: false,
    isOwner: false,
    title: '',
    confirmText: '',
    type: '',
    key: 0,
    name: '',
    originName: '',
    nameErr: '',
    scrop: { id: '', name: '' },
    targetGroup: { id: '', name: '' },
    isDefaultChecked: false,
    groupList: [],
    userList: [],
    selectedUser: { id: '', name: '' },
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

const pressListManagementSlice = createSlice({
  name: 'pressListManagementSlice',
  initialState,
  reducers: {
    initPressGroupPopupAction: state => {
      state.pressGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        originName: '',
        key: 0,
        name: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    pressParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.pressListKeywordParams = action.payload
    },
    pressGroupPopupAction: (state, action: PayloadAction<pressGroupPopupProps>) => {
      state.pressGroupPopup = action.payload
    },
    contentAllShareCodePopupAction: (state, action: PayloadAction<contentAllShareCodePopupProps>) => {
      state.contentAllShareCodePopup = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    pressContentDetailPopupAction: (state, action: PayloadAction<pressContentDetailPopupProps>) => {
      state.pressContentDetailPopup = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
    },
    contentAllDeletePopupAction: (state, action: PayloadAction<contentAllDeletePopupProps>) => {
      state.contentAllDeletePopup = action.payload
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
      state.searchContentKeyList = []
    },
    isSelectedAllActionIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllActionId = action.payload
    },
    searchContentKeyListAction: (
      state,
      action: PayloadAction<{ param: pressContentListProps[]; isDelete: boolean; isShared: boolean }>
    ) => {
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllActionId = false
      state.optionButton.isDelete = action.payload.isDelete
      state.optionButton.isShared = action.payload.isShared
    },
    pressContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressContentListButton = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    pressListParamsAction: (state, action: PayloadAction<{ props: pressListParamsProps; isReset?: boolean }>) => {
      state.pressListParams = action.payload.props
      if (action.payload.isReset) {
        state.searchContentKeyList = []
      }
    },
    resetPressListParamsAction: (state, action: PayloadAction<{ params: pressListParamsProps; button: boolean }>) => {
      state.pressListParams = action.payload.params
      state.pressContentListButton = action.payload.button
      state.searchContentKeyList = []
    },
    pressContentListAction: (state, action: PayloadAction<pressContentProps>) => {
      state.pressContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        pressId: 0,
        name: '',
        title: '',
      }
      state.pressContentDetailPopup = {
        isOpen: false,
        data: null,
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
      state.pressGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        key: 0,
        originName: '',
        name: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
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
    pressCategoryChangedAction: state => {
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        pressId: 0,
        name: '',
        title: '',
      }
      state.optionButton = {
        isDelete: false,
        isShared: false,
      }
      state.pressListKeywordParams = ''
      state.isSelectedAllActionId = false
      state.searchContentKeyList = []
      state.pressContentDetailPopup = {
        isOpen: false,
        data: null,
      }
      state.ownerGroup = []
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
      state.pressGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
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
        title: '',
      }
      state.optionButton = {
        isDelete: false,
        isShared: false,
      }
      state.pressListKeywordParams = ''
      state.isSelectedAllActionId = false
      state.searchContentKeyList = []
      state.pressContentDetailPopup = {
        isOpen: false,
        data: null,
      }
      state.ownerGroup = []
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
      state.pressGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
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
  initAction,
  pressParamKeywordAction,
  ownerPopupAction,
  pressContentListButtonAction,
  initPressPopupAction,
  pressPopupAction,
  pressContentListAction,
  resetPressListParamsAction,
  pressListParamsAction,
  pressCategoryChangedAction,
  initPressGroupPopupAction,
  pressGroupPopupAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  contentDeletePopupAction,
  pressContentDetailPopupAction,
  searchContentKeyListAction,
  isSelectedAllActionIdAction,
  contentAllDeletePopupAction,
  contentAllShareCodePopupAction,
  categoryListAction,
} = pressListManagementSlice.actions
export default pressListManagementSlice.reducer
