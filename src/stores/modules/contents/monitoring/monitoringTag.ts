import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TagDto } from '~/types/api/service'

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}
export interface tagListParamsProps {
  name: string
  page: number
  size: number
  sort: string[]
}
export interface tagPopupProps {
  isOpen: boolean
  key: number
  type: string
  title: string
  confirmText: string
  value: string
  valueErr: string
  target: string
}

export type tagContentProps = { tagType: string; list: TagDto[]; pageCount: pageCountProps; apiDto: tagListParamsProps }

export type Props = {
  tagType: string
  tagContentListContext: string
  pageCount: pageCountProps
  tagListParams: tagListParamsProps
  tagContentListButton: boolean
  isLoading: boolean
  tagContentLoading: boolean
  tagContentList: TagDto[]
  tagPopup: tagPopupProps
}

// 초기값
export const initialState: Props = {
  tagType: 'total',
  tagContentListButton: false,
  isLoading: false,
  tagContentLoading: false,
  tagContentListContext: '',
  tagListParams: {
    name: '',
    page: 1,
    size: 20,
    sort: ['updateAt!desc'],
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  tagContentList: [],
  tagPopup: {
    isOpen: false,
    type: '',
    key: 0,
    title: '',
    confirmText: '',
    value: '',
    valueErr: '',
    target: '',
  },
}

const monitoringTagSlice = createSlice({
  name: 'monitoringTagSlice',
  initialState,
  reducers: {
    tagContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.tagContentListButton = action.payload
    },
    tagContentListContextAction: (state, action: PayloadAction<string>) => {
      state.tagContentListContext = action.payload
    },
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    tagListParamsAction: (state, action: PayloadAction<tagListParamsProps>) => {
      state.tagListParams = action.payload
    },
    resetTagListParamsAction: (state, action: PayloadAction<{ params: tagListParamsProps; button: boolean }>) => {
      state.tagListParams = action.payload.params
      state.tagContentListButton = action.payload.button
    },
    tagContentListAction: (state, action: PayloadAction<tagContentProps>) => {
      state.tagContentList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.tagListParams = action.payload.apiDto
      state.tagType = action.payload.tagType
      state.isLoading = false
      state.tagPopup = {
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
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },
    initTagPopupAction: state => {
      state.tagPopup = {
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
      state.tagType = 'total'
      state.tagContentListButton = false
      state.isLoading = false
      state.tagContentLoading = false
      state.tagContentListContext = ''
      state.tagListParams = {
        name: '',
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
      }
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.tagContentList = []
      state.tagPopup = {
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
  },
})

export const {
  initState,
  tagContentListAction,
  resetTagListParamsAction,
  tagListParamsAction,
  tagContentListButtonAction,
  tagPopupAction,
  initTagPopupAction,
  tagContentListContextAction,
  isLoadingAction,
} = monitoringTagSlice.actions
export default monitoringTagSlice.reducer
