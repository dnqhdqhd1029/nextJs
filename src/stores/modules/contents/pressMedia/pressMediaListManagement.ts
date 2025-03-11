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
  isReAction: false,
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
}

const pressMediaListManagementSlice = createSlice({
  name: 'pressMediaListManagementSlice',
  initialState,
  reducers: {
    savedSearchManagementSaga: (state, action: PayloadAction<string>) => {
      state.saga = action.payload
    },
    categoryDataManagementSaga: (state, action: PayloadAction<categoryListProps>) => {
      state.saga = action.payload
    },
    isReActionAction: (state, action: PayloadAction<boolean>) => {
      state.isReAction = action.payload
    },
    categoryDataAction: (state, action: PayloadAction<categoryListProps>) => {
      state.categoryData = action.payload
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
} = pressMediaListManagementSlice.actions
export default pressMediaListManagementSlice.reducer
