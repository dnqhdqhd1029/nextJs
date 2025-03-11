import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NavigationLinkItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export type sharedPopupType = {
  isOpen: boolean
  type: string
  popupTitle: string
  popupConfirmText: string
  title: string
  addEmail: string
  userList: NavigationLinkItem[]
  receiverList: MbTagSearchTagItem[]
  targetEmail: MbTagSearchTagItem[]
  contents: string
  editorData: string
  key: number
  receiverErr: string
  targetEmailErr: string
  shareLinkUrl: string
  files: File[]
}

export interface Props {
  sharedPopup: sharedPopupType
  activityOpen: boolean
  keyword: string
  isReleasePopup: boolean
  shared_id: number
  keywordList: NavigationLinkItem[]
}

// 초기값
export const initialState: Props = {
  sharedPopup: {
    isOpen: false,
    key: 0,
    popupTitle: '',
    popupConfirmText: '',
    type: '',
    title: '',
    addEmail: '',
    userList: [],
    receiverList: [],
    targetEmail: [],
    contents: '',
    editorData: '',
    receiverErr: '',
    targetEmailErr: '',
    shareLinkUrl: '',
    files: [],
  },
  shared_id: 0,
  activityOpen: false,
  isReleasePopup: false,
  keyword: '',
  keywordList: [],
}

const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setReleasePopupAction: (state, action: PayloadAction<{ isOpen: boolean; key: number }>) => {
      state.shared_id = action.payload.key
      state.isReleasePopup = action.payload.isOpen
    },
    activityOpenAction: (state, action: PayloadAction<boolean>) => {
      state.activityOpen = action.payload
    },
    chekcedKeywordAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.keywordList = action.payload
    },
    sharedPopupReceiverListAction: (state, action: PayloadAction<MbTagSearchTagItem[]>) => {
      state.sharedPopup.receiverList = action.payload
    },
    sharedKeyAction: (
      state,
      action: PayloadAction<{
        editor: string
        key: number
        title: string
        type: string
        sharedUrl?: string
        files?: File[]
      }>
    ) => {
      state.sharedPopup.isOpen = true
      state.sharedPopup.key = action.payload.key
      state.sharedPopup.title = action.payload.title
      state.sharedPopup.type = action.payload.type
      state.sharedPopup.editorData = action.payload.editor
      state.sharedPopup.shareLinkUrl = action.payload.sharedUrl ? action.payload.sharedUrl : ''
      console.log('action.payload.sharedUrl', action.payload.sharedUrl)
      state.sharedPopup.files = action.payload.files ? action.payload.files : []
    },
    sharedPopupAction: (state, action: PayloadAction<sharedPopupType>) => {
      console.log('action.payload', action.payload)
      state.sharedPopup = action.payload
    },
    userListAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.sharedPopup.userList = action.payload
      state.keywordList = action.payload
    },
    keywordListAction: (state, action: PayloadAction<{ items: NavigationLinkItem[]; keyword: string }>) => {
      state.keywordList = action.payload.items
      state.keyword = action.payload.keyword
    },
    initSharedPopupAction: () => initialState,
  },
})
export const {
  keywordListAction,
  chekcedKeywordAction,
  setReleasePopupAction,
  activityOpenAction,
  sharedPopupAction,
  sharedKeyAction,
  initSharedPopupAction,
  userListAction,
  sharedPopupReceiverListAction,
} = sharedSlice.actions
export default sharedSlice.reducer
