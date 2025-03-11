import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface
export interface GroupListState {
  page: number
  size: number
  sort: string[]
  keyword: string
  userId: number
  persist: boolean
}

// 초기값
const initialState: GroupListState = {
  page: 1,
  size: 10,
  sort: ['updateAt!desc'],
  keyword: '',
  userId: -1,
  persist: true,
}

const adminGroupSlice = createSlice({
  name: 'AdminGroup',
  initialState,
  reducers: {
    adminGroupListChangePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    adminGroupListChangeSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload
    },
    adminGroupListChangeSort: (state, action: PayloadAction<string[]>) => {
      state.sort = action.payload
    },
    adminGroupListChangeKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload
    },
    adminGroupListChangeUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
    },
    resetAdminGroupList: state => {
      state.page = 1
      state.size = 10
      state.sort = ['updateAt!desc']
      state.keyword = ''
      state.userId = -1
      state.persist = true
    },
  },
})

export const {
  adminGroupListChangePage,
  adminGroupListChangeSort,
  adminGroupListChangeSize,
  adminGroupListChangeKeyword,
  adminGroupListChangeUserId,
  resetAdminGroupList,
} = adminGroupSlice.actions
export default adminGroupSlice.reducer
