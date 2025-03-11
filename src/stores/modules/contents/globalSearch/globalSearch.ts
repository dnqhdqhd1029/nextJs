import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { JournalistAutoCompleteDto, MediaAutoCompleteDto } from '~/types/api/service'

export type globalSeaarchPopupProps = {
  isOpen: boolean
  isLoading: boolean
  keyword: string
  journalistResultList: JournalistAutoCompleteDto[]
  mediaResultList: MediaAutoCompleteDto[]
}
export type Props = {
  journalLoading: boolean
  mediaLoading: boolean
  globalSeaarchPopup: globalSeaarchPopupProps
}

// 초기값
export const initialState: Props = {
  journalLoading: false,
  mediaLoading: false,
  globalSeaarchPopup: {
    isOpen: false,
    isLoading: false,
    keyword: '',
    journalistResultList: [],
    mediaResultList: [],
  },
}

const globalSearchSlice = createSlice({
  name: 'globalSearchSlice',
  initialState,
  reducers: {
    journalLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.journalLoading = action.payload
    },
    mediaLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaLoading = action.payload
    },
    setJournalistResultListAction: (state, action: PayloadAction<JournalistAutoCompleteDto[]>) => {
      state.globalSeaarchPopup.journalistResultList = action.payload
    },
    setMediaResultListAction: (state, action: PayloadAction<MediaAutoCompleteDto[]>) => {
      state.globalSeaarchPopup.mediaResultList = action.payload
    },
    setGlobalSeaarchPopupAction: (state, action: PayloadAction<globalSeaarchPopupProps>) => {
      state.globalSeaarchPopup = action.payload
    },
    initGlobalSearch: (state, action: PayloadAction<boolean>) => {
      state.globalSeaarchPopup = initialState.globalSeaarchPopup
    },
  },
})

export const {
  journalLoadingAction,
  mediaLoadingAction,
  setGlobalSeaarchPopupAction,
  initGlobalSearch,
  setJournalistResultListAction,
  setMediaResultListAction,
} = globalSearchSlice.actions
export default globalSearchSlice.reducer
