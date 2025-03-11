import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { MbSearchFilterItem } from '~/types/contents/Common'
import { CommonSearchValues } from '~/types/contents/Common'
import { ESearchContDto } from '~/types/contents/PressMedia'

// Interface
export interface PressMediaListResultValueState {
  tab: string
  pressSearchValues: CommonSearchValues
  mediaSearchValues: CommonSearchValues
  page: number
  size: number
  sort: string[]
  filter: string
  selectedItemId: number | undefined
  checkedItemIds: number[]
  filterItems: MbSearchFilterItem[] | undefined
  filterSearchValues: ESearchContDto | undefined
  allItemCheckedPage: number[]
  sideFilterOpen: boolean
  myButtonToggle: boolean
  listId: number | undefined
  pressGroupSize: number
  mediaGroupSize: number
  persist: boolean
}

// 초기값
export const initialState: PressMediaListResultValueState = {
  tab: 'press',
  pressSearchValues: {},
  mediaSearchValues: {},
  page: 1,
  size: 10,
  sort: ['name!asc'],
  filter: '',
  sideFilterOpen: false,
  selectedItemId: undefined,
  checkedItemIds: [],
  filterItems: undefined,
  filterSearchValues: undefined,
  allItemCheckedPage: [],
  myButtonToggle: false,
  listId: undefined,
  pressGroupSize: 10,
  mediaGroupSize: 10,
  persist: true,
}

const pressMediaListResultSlice = createSlice({
  name: 'PressMediaListResult',
  initialState,
  reducers: {
    setPressMediaListResultCurrentTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload
    },

    setPressMediaListResultPressSearchValues: (state, action: PayloadAction<CommonSearchValues>) => {
      state.pressSearchValues = action.payload
    },
    setPressMediaListResultMediaSearchValues: (state, action: PayloadAction<CommonSearchValues>) => {
      state.mediaSearchValues = action.payload
    },
    setPressMediaListResultSideFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.sideFilterOpen = action.payload
    },
    setPressMediaListResultFilterItems: (state, action: PayloadAction<MbSearchFilterItem[] | undefined>) => {
      state.filterItems = action.payload
    },
    setPressMediaListResultFilterSearchValues: (state, action: PayloadAction<ESearchContDto | undefined>) => {
      state.filterSearchValues = action.payload
    },
    setPressMediaListResultAllItemCheckedPage: (state, action: PayloadAction<number[]>) => {
      state.allItemCheckedPage = action.payload
    },
    setPressMediaListResultListId: (state, action: PayloadAction<number | undefined>) => {
      state.listId = action.payload
    },
    setPressMediaListResultPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPressMediaListResultSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload
    },
    setPressMediaListResultSort: (state, action: PayloadAction<string[]>) => {
      state.sort = action.payload
    },
    setPressMediaListResultFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
    setPressMediaListResultSelectedItemId: (state, action: PayloadAction<number | undefined>) => {
      state.selectedItemId = action.payload
    },
    setPressMediaListResultCheckedItemIds: (state, action: PayloadAction<number[]>) => {
      state.checkedItemIds = action.payload
    },
    setPressMediaListResultMyButtonToggle: (state, action: PayloadAction<boolean>) => {
      state.myButtonToggle = action.payload
    },
    setGroupListPressGroupSize: (state, action: PayloadAction<number>) => {
      state.pressGroupSize = action.payload
    },
    setGroupListMediaGroupSize: (state, action: PayloadAction<number>) => {
      state.mediaGroupSize = action.payload
    },
    resetPressMediaListResultValues: state => {
      state.tab = 'press'
      state.pressSearchValues = {}
      state.mediaSearchValues = {}
      state.page = 1
      state.size = 10
      state.sort = ['name!asc']
      state.filter = ''
      state.selectedItemId = undefined
      state.checkedItemIds = []
      state.filterItems = undefined
      state.filterSearchValues = undefined
      state.allItemCheckedPage = []
      state.myButtonToggle = false
      state.listId = undefined
      state.pressGroupSize = 10
      state.mediaGroupSize = 10
      state.persist = true
    },
  },
})

export const {
  setPressMediaListResultCurrentTab,
  setPressMediaListResultPressSearchValues,
  setPressMediaListResultMediaSearchValues,
  setPressMediaListResultListId,
  setPressMediaListResultPage,
  setPressMediaListResultSize,
  setPressMediaListResultFilterItems,
  setPressMediaListResultFilterSearchValues,
  setPressMediaListResultAllItemCheckedPage,
  setPressMediaListResultSort,
  setPressMediaListResultFilter,
  setPressMediaListResultSelectedItemId,
  setPressMediaListResultCheckedItemIds,
  setPressMediaListResultMyButtonToggle,
  setPressMediaListResultSideFilterOpen,
  setGroupListPressGroupSize,
  setGroupListMediaGroupSize,
  resetPressMediaListResultValues,
} = pressMediaListResultSlice.actions
export default pressMediaListResultSlice.reducer
