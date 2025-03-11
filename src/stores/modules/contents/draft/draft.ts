import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { ActionDtoForList, CodeNameCountDto, CommonCodeDto, MailingDto } from '~/types/api/service'
import { UseGetActionListParams } from '~/utils/api/action/useGetActionList'

export interface TabType {
  id: string
  value: string
  title: string
}

export interface draftListPopupType {
  isOpen: boolean
  title: string
  key: number
}

export interface PageCount {
  totalCount: number
  totalPageCount: number
}

export type Props = {
  tab: TabType
  draftList: ActionDtoForList[]
  draftListPopup: draftListPopupType
  noticeNewEmail: boolean
  stateCodeList: { [k: string]: string }
  nwStateCodeList: { [k: string]: string }
  searchParams: UseGetActionListParams
  pageCount: PageCount
  categoryList: ICategoryList[]
}

interface ICategoryList extends CodeNameCountDto {
  id: string
}

// 초기값
export const initialState: Props = {
  tab: {
    id: 'PRESS_RELEASE',
    value: '/press-release',
    title: '보도자료',
  },
  draftList: [],
  draftListPopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  noticeNewEmail: false,
  stateCodeList: {},
  nwStateCodeList: {},
  searchParams: {
    page: 1,
    size: 20,
    sort: ['updateAt!desc'],
    categoryList: ['PRESS_RELEASE', 'MAILING', 'NEWSWIRE_RELEASE'],
    groupId: 0,
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  categoryList: [],
}

const draftSlice = createSlice({
  name: 'draftSlice',
  initialState,
  reducers: {
    noticeNewEmailDraftAction: (state, action: PayloadAction<boolean>) => {
      state.noticeNewEmail = action.payload
    },
    tabAction: (state, action: PayloadAction<TabType>) => {
      state.tab = action.payload
    },
    initDraftListAction: (state, action: PayloadAction<number>) => {
      state.tab = {
        id: 'PRESS_RELEASE',
        value: '/press-release',
        title: '보도자료',
      }
      state.draftList = []
      state.draftListPopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.noticeNewEmail = false
      state.stateCodeList = {}
      state.nwStateCodeList = {}
      state.searchParams = {
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
        categoryList: ['PRESS_RELEASE', 'MAILING', 'NEWSWIRE_RELEASE'],
        groupId: action.payload,
      }
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
    },
    draftListAction: (state, action: PayloadAction<{ content: ActionDtoForList[]; pageCount: PageCount }>) => {
      state.draftList = action.payload.content
      state.pageCount = action.payload.pageCount
    },
    draftListPopupAction: (state, action: PayloadAction<draftListPopupType>) => {
      state.draftListPopup = action.payload
    },
    setSearchParamsAction: (state, action: PayloadAction<UseGetActionListParams>) => {
      state.searchParams = action.payload
    },
    setCategoryListAction: (state, action: PayloadAction<Array<ICategoryList>>) => {
      state.categoryList = action.payload
    },
    initStateCodeListAction: (state, action: PayloadAction<Array<CommonCodeDto>>) => {
      const stateCodeList = Object.fromEntries(
        [{ code: '', name: '전체' }, ...(action.payload as Array<CommonCodeDto>)].map(code => [
          code.code ?? '',
          code.name ?? '',
        ])
      )
      state.stateCodeList = stateCodeList
    },
    initNwStateCodeListAction: (state, action: PayloadAction<Array<CommonCodeDto>>) => {
      const nwStateCodeList = Object.fromEntries(
        [{ code: '', name: '전체' }, ...(action.payload as Array<CommonCodeDto>)].map(code => [
          code.code ?? '',
          code.name ?? '',
        ])
      )
      state.nwStateCodeList = nwStateCodeList
    },
  },
})

export const {
  noticeNewEmailDraftAction,
  tabAction,
  initDraftListAction,
  draftListAction,
  draftListPopupAction,
  setSearchParamsAction,
  setCategoryListAction,
  initStateCodeListAction,
  initNwStateCodeListAction,
} = draftSlice.actions
export default draftSlice.reducer
