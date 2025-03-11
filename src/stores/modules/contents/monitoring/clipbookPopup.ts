import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export type clipbookPopupProps = {
  isOpen: boolean
  isOwner: boolean
  key: number
  oldName: string
  name: string
  nameErr: string
  coverageId: SelectListOptionItem
  isScropChanged: boolean
  scrop: SelectListOptionItem
  userList: SelectListOptionItem[]
  selectedUser: SelectListOptionItem
}

export type Props = {
  clipbookPopup: clipbookPopupProps
  keyword: string
  activityOpen: boolean
  keywordList: NavigationLinkItem[]
  prjList: MbTagSearchTagItem[]
}

// 초기값
export const initialState: Props = {
  clipbookPopup: {
    isOpen: false,
    isOwner: false,
    key: 0,
    name: '',
    oldName: '',
    nameErr: '',
    coverageId: { id: 'NORMAL', name: '일반 클립북' },
    scrop: { id: '', name: '' },
    isScropChanged: false,
    userList: [],
    selectedUser: { id: '', name: '' },
  },
  prjList: [],
  activityOpen: false,
  keyword: '',
  keywordList: [],
}

const clipbookPopupSlice = createSlice({
  name: 'clipbookPopupSlice',
  initialState,
  reducers: {
    initClipbookAction: state => {
      state.clipbookPopup = {
        isOpen: false,
        isOwner: false,
        key: 0,
        name: '',
        oldName: '',
        nameErr: '',
        coverageId: { id: 'NORMAL', name: '일반 클립북' },
        scrop: { id: '', name: '' },
        isScropChanged: false,
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.prjList = []
      state.activityOpen = false
      state.keyword = ''
      state.keywordList = []
    },
    clipbookPopupAction: (state, action: PayloadAction<clipbookPopupProps>) => {
      state.clipbookPopup = action.payload
    },
    setClipbookPopupInfoAction: (
      state,
      action: PayloadAction<{ params: clipbookPopupProps; prjList: MbTagSearchTagItem[] }>
    ) => {
      state.clipbookPopup = action.payload.params
      state.prjList = action.payload.prjList
    },
    clipbookPopupPrjListAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.keywordList = action.payload
    },
    activityOpenAction: (state, action: PayloadAction<boolean>) => {
      state.activityOpen = action.payload
    },
    keywordAction: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload
    },
    clipbbokPopupReceiverListAction: (state, action: PayloadAction<MbTagSearchTagItem[]>) => {
      state.prjList = action.payload
    },
    initClipbookPopupAction: () => initialState,
  },
})

export const {
  setClipbookPopupInfoAction,
  initClipbookPopupAction,
  clipbookPopupPrjListAction,
  clipbookPopupAction,
  activityOpenAction,
  keywordAction,
  clipbbokPopupReceiverListAction,
  initClipbookAction,
} = clipbookPopupSlice.actions
export default clipbookPopupSlice.reducer
