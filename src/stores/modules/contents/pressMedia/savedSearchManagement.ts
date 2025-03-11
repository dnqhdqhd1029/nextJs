import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'

export interface categoryListProps extends SelectListOptionItem {
  count: number
}

export type Props = {
  categoryList: categoryListProps[]
  categoryData: categoryListProps
  saga: any
  isReAction: boolean
}

// 초기값
export const initialState: Props = {
  saga: '',
  categoryData: { id: 'press', name: '언론인', count: 0 },
  isReAction: false,
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
}

const savedSearchManagementSlice = createSlice({
  name: 'savedSearchManagementSlice',
  initialState,
  reducers: {
    savedSearchManagementSaga: (state, action: PayloadAction<string>) => {
      state.saga = action.payload
    },
    categoryDataManagementSaga: (state, action: PayloadAction<categoryListProps>) => {
      state.saga = action.payload
    },
    categoryDataAction: (state, action: PayloadAction<categoryListProps>) => {
      state.categoryData = action.payload
    },
    isReActionAction: (state, action: PayloadAction<boolean>) => {
      state.isReAction = action.payload
    },
    categoryListAction: (state, action: PayloadAction<categoryListProps[]>) => {
      state.categoryList = action.payload
    },
  },
})

export const {
  categoryDataAction,
  categoryListAction,
  isReActionAction,
  savedSearchManagementSaga,
  categoryDataManagementSaga,
} = savedSearchManagementSlice.actions
export default savedSearchManagementSlice.reducer
