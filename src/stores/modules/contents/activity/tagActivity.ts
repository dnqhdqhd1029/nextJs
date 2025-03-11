import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import type { TagDto } from '~/types/api/service'

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

export type tagContentProps = { apiDto: tagListParamsProps; list: TagDto[]; tagType: string; pageCount: pageCountProps }

export type Props = {
  tagType: string
  pageCount: pageCountProps
  tagListParams: tagListParamsProps
  isLoading: boolean
  tagContentListButton: boolean
  tagContentLoading: boolean
  tagContentList: TagDto[]
  tagPopup: tagPopupProps
  tagListParamsKeyword: string
}

// 초기값
export const initialState: Props = {
  tagType: 'total',
  isLoading: false,
  tagContentListButton: false,
  tagContentLoading: false,
  tagListParamsKeyword: '',
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

const tagActivitySlice = createSlice({
  name: 'tagActivitySlice',
  initialState,
  reducers: {
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    tagListParamsKeywordAction: (state, action: PayloadAction<string>) => {
      state.tagListParamsKeyword = action.payload
    },
    tagContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.tagContentListButton = action.payload
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
      state.tagListParams = action.payload.apiDto
      state.tagContentList = action.payload.list
      state.pageCount = action.payload.pageCount
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
    initAction: state => {
      state.tagType = 'total'
      state.isLoading = false
      state.tagContentListButton = false
      state.tagContentLoading = false
      state.tagListParamsKeyword = ''
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
  initAction,
  isLoadingAction,
  tagContentListAction,
  resetTagListParamsAction,
  tagListParamsAction,
  tagContentListButtonAction,
  tagPopupAction,
  initTagPopupAction,
  tagListParamsKeywordAction,
} = tagActivitySlice.actions
export default tagActivitySlice.reducer
