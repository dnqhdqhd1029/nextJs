import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { monitoringListDto } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { SelectListOptionItem } from '~/types/common'

export interface dashboardContentType {
  idKey: number
  isLink: string
  type: string
  contentType: string
  contentId: string
  department: string
  title: string
  displayName: string
  count: string
  date: string
}

export interface GadgetItem {
  id: string
  name: string
  count?: number
  isActive?: boolean
  keywordId?: string
  url?: string
}

export interface GadgetChartData {
  newDailyNewsDataSeries: number[]
  maxCount: number
  categories: string[]
}
export interface GridItemOption {
  id: string
  keyId: string
  title: string
  type: string
  subType: string
  count: number
  status: string
  moreAmount: number
  isData: dashboardContentType[]
  chartData: GadgetChartData | null
}

export interface Layouts {
  id: string
  list: GridItemOption[]
}

export interface GridState {
  left: Layouts
  right: Layouts
}

export interface gadgetPopupProps {
  isOpen: boolean
  selectList: SelectListOptionItem[]
}

export type Props = {
  gridState: GridState
  keywordMonitoring: number
  userLoading: boolean
  keywordMonitroingList: SelectListOptionItem[]
  monitoringFilter: monitoringListDto[]
  gadgetPopup: gadgetPopupProps
}

// 초기값
export const initialState: Props = {
  gridState: {
    left: {
      id: 'left',
      list: [],
    },
    right: {
      id: 'right',
      list: [],
    },
  },
  userLoading: false,
  keywordMonitoring: 0,
  monitoringFilter: [],
  keywordMonitroingList: [],
  gadgetPopup: {
    isOpen: false,
    selectList: [],
  },
}

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    checkInit: state => {
      state.gridState = {
        left: {
          id: 'left',
          list: [],
        },
        right: {
          id: 'right',
          list: [],
        },
      }
      state.keywordMonitoring = 0
      state.monitoringFilter = []
      state.gadgetPopup = {
        isOpen: false,
        selectList: [],
      }
    },
    gadgetPopupAction: (state, action: PayloadAction<gadgetPopupProps>) => {
      state.gadgetPopup = action.payload
    },
    userLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload
    },
    keywordMonitroingListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.keywordMonitroingList = action.payload
    },
    gridStateLayoutsLeftAction: (state, action: PayloadAction<GridItemOption[]>) => {
      state.gridState = {
        ...state.gridState,
        left: {
          id: 'left',
          list: action.payload,
        },
      }
    },
    setChartAction: (state, action: PayloadAction<{ list: GadgetChartData; numberIndex: number; keyId: string }>) => {
      if (action.payload.keyId === 'left') {
        let res = [...state.gridState.left.list]
        res[action.payload.numberIndex].chartData = action.payload.list
        state.gridState = {
          ...state.gridState,
          left: {
            id: 'left',
            list: res,
          },
        }
      } else {
        let res = [...state.gridState.right.list]
        res[action.payload.numberIndex].chartData = action.payload.list
        state.gridState = {
          ...state.gridState,
          right: {
            id: 'right',
            list: res,
          },
        }
      }
    },
    setMoreAmountAction: (state, action: PayloadAction<{ moreAmount: number; numberIndex: number; keyId: string }>) => {
      if (action.payload.keyId === 'left') {
        let res = [...state.gridState.left.list]
        res[action.payload.numberIndex].moreAmount = action.payload.moreAmount
        state.gridState = {
          ...state.gridState,
          left: {
            id: 'left',
            list: res,
          },
        }
      } else {
        let res = [...state.gridState.right.list]
        res[action.payload.numberIndex].moreAmount = action.payload.moreAmount
        state.gridState = {
          ...state.gridState,
          right: {
            id: 'right',
            list: res,
          },
        }
      }
    },
    setItemListAction: (
      state,
      action: PayloadAction<{ list: dashboardContentType[]; numberIndex: number; keyId: string }>
    ) => {
      if (action.payload.keyId === 'left') {
        let res = [...state.gridState.left.list]
        res[action.payload.numberIndex].isData = action.payload.list
        state.gridState = {
          ...state.gridState,
          left: {
            id: 'left',
            list: res,
          },
        }
      } else {
        let res = [...state.gridState.right.list]
        res[action.payload.numberIndex].isData = action.payload.list
        state.gridState = {
          ...state.gridState,
          right: {
            id: 'right',
            list: res,
          },
        }
      }
    },
    gridStateLayoutsRightAction: (state, action: PayloadAction<GridItemOption[]>) => {
      state.gridState = {
        ...state.gridState,
        right: {
          id: 'right',
          list: action.payload,
        },
      }
    },
    gridStateLayoutsAction: (state, action: PayloadAction<{ left: GridItemOption[]; right: GridItemOption[] }>) => {
      state.gridState = {
        left: {
          id: 'left',
          list: action.payload.left,
        },
        right: {
          id: 'right',
          list: action.payload.right,
        },
      }
    },
    deleteLayoutAction: (
      state,
      action: PayloadAction<{
        left: GridItemOption[]
        right: GridItemOption[]
        keywordMonitoringAmount: number
      }>
    ) => {
      state.gridState = {
        left: {
          id: 'left',
          list: action.payload.left,
        },
        right: {
          id: 'right',
          list: action.payload.right,
        },
      }
      state.keywordMonitoring = action.payload.keywordMonitoringAmount
    },
    gadgetAddLayoutAction: (
      state,
      action: PayloadAction<{
        left: GridItemOption[]
        right: GridItemOption[]
        keywordMonitoringAmount: number
        keywordMonitroingList: SelectListOptionItem[]
        selectList: SelectListOptionItem[]
      }>
    ) => {
      state.gridState = {
        left: {
          id: 'left',
          list: action.payload.left,
        },
        right: {
          id: 'right',
          list: action.payload.right,
        },
      }
      state.keywordMonitoring = action.payload.keywordMonitoringAmount
      state.keywordMonitroingList = action.payload.keywordMonitroingList
      state.gadgetPopup = {
        isOpen: false,
        selectList: action.payload.selectList,
      }
    },
    initAction: (
      state,
      action: PayloadAction<{
        left: GridItemOption[]
        right: GridItemOption[]
        keywordMonitoringAmount: number
        keywordMonitroingList: SelectListOptionItem[]
      }>
    ) => {
      state.gridState = {
        left: {
          id: 'left',
          list: action.payload.left,
        },
        right: {
          id: 'right',
          list: action.payload.right,
        },
      }
      state.keywordMonitoring = action.payload.keywordMonitoringAmount
      state.keywordMonitroingList = action.payload.keywordMonitroingList
      state.monitoringFilter = []
      state.gadgetPopup = {
        isOpen: false,
        selectList: [],
      }
      state.userLoading = false
    },
  },
})

export const {
  gadgetAddLayoutAction,
  deleteLayoutAction,
  keywordMonitroingListAction,
  gridStateLayoutsAction,
  checkInit,
  initAction,
  gadgetPopupAction,
  gridStateLayoutsLeftAction,
  gridStateLayoutsRightAction,
  userLoadingAction,
  setItemListAction,
  setMoreAmountAction,
  setChartAction,
} = dashboardSlice.actions

export default dashboardSlice.reducer
