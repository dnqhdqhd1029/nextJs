import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
export interface contentAllDeletePopupProps {
  isOpen: boolean
  key: MbTagSearchTagItem[]
}

export type contentAllShareCodePopupProps = {
  isOpen: boolean
  key: MbTagSearchTagItem[]
  scrop: SelectListOptionItem
}

export type mediaGroupPopupProps = {
  isOpen: boolean
  isOwner: boolean
  title: string
  confirmText: string
  type: string
  key: number
  name: string
  nameErr: string
  originName: string
  scrop: SelectListOptionItem
  targetGroup: SelectListOptionItem
  isDefaultChecked: boolean
  groupList: SelectListOptionItem[]
  userList: SelectListOptionItem[]
  selectedUser: SelectListOptionItem
}

export type mediaContentDetailPopupProps = {
  isOpen: boolean
  data: mediaContentListProps | null
}

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

export interface mediaContentListProps extends JournalistMediaGroupItem {
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
}

export type mediaContentProps = { list: mediaContentListProps[]; pageCount: pageCountProps }

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  mediaId: number
  title: string
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
  categoryData: categoryListProps
  categoryList: categoryListProps[]
  pageCount: pageCountProps
  mediaListParams: mediaListParamsProps
  mediaContentListButton: boolean
  mediaContentLoading: boolean
  mediaListKeywordParams: string
  mediaContentList: mediaContentListProps[]
  mediaPopup: mediaPopupProps
  searchContentKeyList: mediaContentListProps[]
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
  mediaGroupPopup: mediaGroupPopupProps
  mediaContentDetailPopup: mediaContentDetailPopupProps
  isSelectedAllActionId: boolean
  contentAllDeletePopup: contentAllDeletePopupProps
  contentAllShareCodePopup: contentAllShareCodePopupProps
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
    title: '',
  },
  optionButton: {
    isDelete: false,
    isShared: false,
  },
  ownerGroup: [],
  isSelectedAllActionId: false,
  searchContentKeyList: [],
  ownerLayer: { layerOpen: false, isList: false, key: '' },
  mediaContentListButton: false,
  mediaContentLoading: false,
  mediaListKeywordParams: '',
  mediaContentDetailPopup: {
    isOpen: false,
    data: null,
  },
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
  mediaGroupPopup: {
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

const mediaListManagementSlice = createSlice({
  name: 'mediaListManagementSlice',
  initialState,
  reducers: {
    initMediaGroupPopupAction: state => {
      state.mediaGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        key: 0,
        name: '',
        nameErr: '',
        originName: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
      }
    },
    mediaParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.mediaListKeywordParams = action.payload
    },
    contentAllShareCodePopupAction: (state, action: PayloadAction<contentAllShareCodePopupProps>) => {
      state.contentAllShareCodePopup = action.payload
    },
    mediaGroupPopupAction: (state, action: PayloadAction<mediaGroupPopupProps>) => {
      state.mediaGroupPopup = action.payload
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
      state.searchContentKeyList = []
    },
    mediaContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaContentListButton = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    mediaContentDetailPopupAction: (state, action: PayloadAction<mediaContentDetailPopupProps>) => {
      state.mediaContentDetailPopup = action.payload
    },
    isSelectedAllActionIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllActionId = action.payload
    },
    searchContentKeyListAction: (
      state,
      action: PayloadAction<{ param: mediaContentListProps[]; isDelete: boolean; isShared: boolean }>
    ) => {
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllActionId = false
      state.optionButton.isDelete = action.payload.isDelete
      state.optionButton.isShared = action.payload.isShared
    },
    mediaListParamsAction: (state, action: PayloadAction<{ props: mediaListParamsProps; isReset?: boolean }>) => {
      state.mediaListParams = action.payload.props
      if (action.payload.isReset) {
        state.searchContentKeyList = []
      }
    },
    contentAllDeletePopupAction: (state, action: PayloadAction<contentAllDeletePopupProps>) => {
      state.contentAllDeletePopup = action.payload
    },
    mediaContentListAction: (state, action: PayloadAction<mediaContentProps>) => {
      state.mediaContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        mediaId: 0,
        name: '',
        title: '',
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
      state.mediaGroupPopup = {
        isOpen: false,
        isOwner: false,
        title: '',
        confirmText: '',
        type: '',
        key: 0,
        name: '',
        nameErr: '',
        originName: '',
        scrop: { id: '', name: '' },
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.mediaContentDetailPopup = {
        isOpen: false,
        data: null,
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
    mediaCategoryChangedAction: state => {
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        mediaId: 0,
        name: '',
        title: '',
      }
      state.optionButton = {
        isDelete: false,
        isShared: false,
      }
      state.ownerGroup = []
      state.isSelectedAllActionId = false
      state.searchContentKeyList = []
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.mediaContentListButton = false
      state.mediaContentLoading = false
      state.mediaListKeywordParams = ''
      state.mediaContentDetailPopup = {
        isOpen: false,
        data: null,
      }
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
      state.mediaGroupPopup = {
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
    resetMediaListParamsAction: (state, action: PayloadAction<{ params: mediaListParamsProps; button: boolean }>) => {
      state.mediaListParams = action.payload.params
      state.mediaContentListButton = action.payload.button
      state.searchContentKeyList = []
    },
    categoryListAction: (state, action: PayloadAction<categoryListProps[]>) => {
      state.categoryList = action.payload
    },
    mediaPopupAction: (state, action: PayloadAction<mediaPopupProps>) => {
      state.mediaPopup = action.payload
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
        title: '',
      }
      state.optionButton = {
        isDelete: false,
        isShared: false,
      }
      state.ownerGroup = []
      state.isSelectedAllActionId = false
      state.searchContentKeyList = []
      state.ownerLayer = { layerOpen: false, isList: false, key: '' }
      state.mediaContentListButton = false
      state.mediaContentLoading = false
      state.mediaListKeywordParams = ''
      state.mediaContentDetailPopup = {
        isOpen: false,
        data: null,
      }
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
      state.mediaGroupPopup = {
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
  categoryListAction,
  initAction,
  mediaParamKeywordAction,
  resetMediaListParamsAction,
  ownerPopupAction,
  mediaContentListButtonAction,
  mediaPopupAction,
  mediaContentListAction,
  mediaListParamsAction,
  mediaCategoryChangedAction,
  initMediaGroupPopupAction,
  mediaGroupPopupAction,
  userPopupAction,
  ownerLayerAction,
  getOwnerLayerAction,
  sortByOwnerAction,
  contentDeletePopupAction,
  mediaContentDetailPopupAction,
  contentAllShareCodePopupAction,
  contentAllDeletePopupAction,
  searchContentKeyListAction,
  isSelectedAllActionIdAction,
} = mediaListManagementSlice.actions
export default mediaListManagementSlice.reducer
