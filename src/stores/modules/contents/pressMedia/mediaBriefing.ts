import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}
export type mediabriefingSearchParamsProps = {
  title: string
  page: number
  size: number
}

export type mediabriefingSearchListProps = {
  itemId: number
  itemImg: string
  itemTitle: string
  itemContent: string
  itemDate: string
}

export type mediabriefingListProps = {
  list: mediabriefingSearchListProps[]
  short: mediabriefingSearchListProps[]
  page: pageCountProps
}

export type mediabriefingDataProps = {
  title: string
  img: string
  content: string
  date: string
}

export type Props = {
  isMediabriefingSearch: boolean
  mediabriefingSearchParams: mediabriefingSearchParamsProps
  pageCount: pageCountProps
  mediabriefingSearchList: mediabriefingSearchListProps[]
  mediabriefingSearchShortList: mediabriefingSearchListProps[]
  mediabriefingData: mediabriefingDataProps
}

// 초기값
export const initialState: Props = {
  isMediabriefingSearch: false,
  mediabriefingSearchList: [],
  mediabriefingSearchShortList: [],
  mediabriefingSearchParams: {
    title: '',
    page: 1,
    size: 5,
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  mediabriefingData: {
    title: '',
    img: '',
    content: '',
    date: '',
  },
}

const mediabriefingSlice = createSlice({
  name: 'mediabriefingSlice',
  initialState,
  reducers: {
    mediabriefingSearchListAction: (state, action: PayloadAction<mediabriefingListProps>) => {
      state.mediabriefingSearchList = action.payload.list
      state.pageCount = action.payload.page
      if (action.payload.short.length > 0) {
        state.mediabriefingSearchShortList = action.payload.short
      }
    },
    mediabriefingDataAction: (state, action: PayloadAction<mediabriefingDataProps>) => {
      state.mediabriefingData = action.payload
    },
    isMediabriefingSearchAction: (state, action: PayloadAction<boolean>) => {
      state.isMediabriefingSearch = action.payload
    },
    mediabriefingSearchParamsAction: (state, action: PayloadAction<mediabriefingSearchParamsProps>) => {
      state.mediabriefingSearchParams = action.payload
    },
  },
})

export const {
  mediabriefingSearchParamsAction,
  mediabriefingDataAction,
  mediabriefingSearchListAction,
  isMediabriefingSearchAction,
} = mediabriefingSlice.actions
export default mediabriefingSlice.reducer
