import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface
export interface UserListState {
  page: number
  size: number
  sort: string[]
  role: string
  keyword: string
  stateCode: string
  persist: boolean
}

// 초기값
const initialState: UserListState = {
  page: 1,
  size: 10,
  sort: ['updateAt!desc'],
  role: '',
  keyword: '',
  stateCode: '',
  persist: true,
}

const adminUserSlice = createSlice({
  name: 'ActivitySearchResult',
  initialState,
  reducers: {
    adminUserListChangePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    adminUserListChangeSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload
    },
    adminUserListChangeSort: (state, action: PayloadAction<string[]>) => {
      state.sort = action.payload
    },
    adminUserListChangeRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    adminUserListChangeKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload
    },
    adminUserListChangeStateCode: (state, action: PayloadAction<string>) => {
      state.stateCode = action.payload
    },
    resetAdminUserList: state => {
      state.page = 1
      state.size = 10
      state.sort = ['updateAt!desc']
      state.role = ''
      state.keyword = ''
      state.persist = true
    },
  },
})

export const {
  adminUserListChangePage,
  adminUserListChangeSort,
  adminUserListChangeSize,
  adminUserListChangeRole,
  adminUserListChangeKeyword,
  adminUserListChangeStateCode,
  resetAdminUserList,
} = adminUserSlice.actions
export default adminUserSlice.reducer
