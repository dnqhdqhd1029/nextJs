import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PageCount } from '~/stores/modules/contents/draft/draft'
import { NewsAlertDto, NewsAlertListDto, ScheduleRow } from '~/types/api/service'
import { StepItem } from '~/types/common'

// Interface
export type newsAlertsSearchParamsProps = {
  keyword: string
  page: number
  size: number
  sort: string[]
}

export type newsAlertsDataTypes = {
  isLoading: boolean
  receiveNewsAlert: boolean
  newsAlertDataList: NewsAlertListDto[]
  pageCount: PageCount
}

export type newsAlertsDeletePopupTypes = {
  isOpen: boolean
  alertId: number
  newsSrchName: string
}

export interface userPopupProps {
  isOpen: boolean
  type: string
  email: string
  nickName: string
  phone: string
  mobile: string
  role: string
  key: number
}

export type newsAlertsPopupTypes = {
  isOpen: boolean
}

export type newsAlertsCancelPopupTypes = {
  isOpen: boolean
}

export type newsAlertsSuspendPopupTypes = {
  isOpen: boolean
}

export type settingPageDataType = {
  title: string
  titleErr: string
  content: string
  sortOption: string
}

export type emailReceiveDateType = {
  emailReceiveDays: string[]
  emailReceiveTime: { hours: number; minutes: number }
}

export type receivePageDataType = {
  emailReceiveDate: emailReceiveDateType
  emailReceiveErr: string
  showLink: boolean
  schedules: ScheduleRow[]
  selectedReceiveErr: string
  hasExpireAt: boolean
  hasExpireAtErr: string
  expireAt: Date | null
  expireAtErr: string
}

export interface Props {
  newsAlertsData: newsAlertsDataTypes
  newsAlertParamKeyword: string
  newsAlertSearchParams: newsAlertsSearchParamsProps
  userPopup: userPopupProps
  newsAlertsPopup: newsAlertsPopupTypes
  newsAlertsCancelPopup: newsAlertsCancelPopupTypes
  newsAlertsSuspendPopup: newsAlertsSuspendPopupTypes
  newsAlertsDeletePopup: newsAlertsDeletePopupTypes
  newsAlertsStep: {
    id: string
    title: string
  }
  newsAlertsSettingData: settingPageDataType
  newsAlertsReceiveData: receivePageDataType
  currentNewsSrchId: number
  currentNewsAlert: NewsAlertDto
  currentAlertId: number
  isEdit: boolean
}

// 초기값
export const initialState: Props = {
  newsAlertsData: {
    isLoading: true,
    receiveNewsAlert: false,
    newsAlertDataList: [],
    pageCount: {
      totalCount: 0,
      totalPageCount: 1,
    },
  },
  newsAlertParamKeyword: '',
  newsAlertSearchParams: {
    keyword: '',
    page: 1,
    size: 10,
    sort: ['regisAt!desc'],
  },
  newsAlertsDeletePopup: {
    isOpen: false,
    alertId: 0,
    newsSrchName: '',
  },
  userPopup: {
    isOpen: false,
    type: '',
    email: '',
    nickName: '',
    phone: '',
    mobile: '',
    role: '',
    key: 0,
  },
  newsAlertsPopup: {
    isOpen: false,
  },
  newsAlertsCancelPopup: {
    isOpen: false,
  },
  newsAlertsSuspendPopup: {
    isOpen: false,
  },
  newsAlertsStep: {
    id: 'setting',
    title: '설정',
  },
  newsAlertsSettingData: {
    title: '',
    titleErr: '',
    content: '',
    sortOption: 'INSERTED',
  },
  newsAlertsReceiveData: {
    emailReceiveDate: {
      emailReceiveDays: [],
      emailReceiveTime: { hours: 0, minutes: 0 },
    },
    emailReceiveErr: '',
    showLink: false,
    schedules: [],
    selectedReceiveErr: '',
    hasExpireAt: false,
    hasExpireAtErr: '',
    expireAt: null,
    expireAtErr: '',
  },
  currentNewsSrchId: 0,
  currentNewsAlert: {
    alertId: 0,
    newsSrchId: 0,
    title: '',
    content: '',
    sortOption: 'INSERTED',
  },
  currentAlertId: 0,
  isEdit: false,
}

const newsAlertSlice = createSlice({
  name: 'newsAlertSlice',
  initialState,
  reducers: {
    setNewsAlertSettingAction: (state, action: PayloadAction<boolean>) => {
      state.newsAlertsData.receiveNewsAlert = action.payload
    },
    newsAlertListAction: (state, action: PayloadAction<{ content: NewsAlertListDto[]; pageCount: PageCount }>) => {
      state.newsAlertsData.newsAlertDataList = action.payload.content
      state.newsAlertsData.pageCount = action.payload.pageCount
    },
    newsAlertParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.newsAlertParamKeyword = action.payload
    },
    newsAlertSearchParamsAction: (state, action: PayloadAction<newsAlertsSearchParamsProps>) => {
      state.newsAlertSearchParams = action.payload
    },
    newsAlertsDeletePopupAction: (state, action: PayloadAction<newsAlertsDeletePopupTypes>) => {
      state.newsAlertsDeletePopup = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    initNewsAlertListAction: state => {
      state.newsAlertsData = {
        isLoading: false,
        receiveNewsAlert: false,
        newsAlertDataList: [],
        pageCount: {
          totalCount: 0,
          totalPageCount: 1,
        },
      }
    },
    initUserPopupAction: state => {
      state.userPopup = {
        isOpen: false,
        type: '',
        email: '',
        nickName: '',
        phone: '',
        mobile: '',
        role: '',
        key: 0,
      }
    },
    initCreateNewsAlertsPopup: state => {
      state.newsAlertsCancelPopup = {
        isOpen: false,
      }
      state.newsAlertsSuspendPopup = {
        isOpen: false,
      }
      state.newsAlertsStep = {
        id: 'setting',
        title: '설정',
      }
      state.newsAlertsSettingData = {
        title: '',
        titleErr: '',
        content: '',
        sortOption: 'INSERTED',
      }
      state.newsAlertsReceiveData = {
        emailReceiveDate: {
          emailReceiveDays: [],
          emailReceiveTime: { hours: 0, minutes: 0 },
        },
        emailReceiveErr: '',
        showLink: false,
        schedules: [],
        selectedReceiveErr: '',
        hasExpireAt: false,
        hasExpireAtErr: '',
        expireAt: null,
        expireAtErr: '',
      }
      state.currentNewsAlert = {
        alertId: 0,
        newsSrchId: 0,
        title: '',
        content: '',
        sortOption: 'INSERTED',
      }
      state.isEdit = false
    },
    initSettingDataAction: (state, action: PayloadAction<settingPageDataType>) => {
      state.newsAlertsCancelPopup = {
        isOpen: false,
      }
      state.newsAlertsSuspendPopup = {
        isOpen: false,
      }
      state.newsAlertsStep = {
        id: 'setting',
        title: '설정',
      }
      state.newsAlertsSettingData = action.payload
      state.newsAlertsReceiveData = {
        emailReceiveDate: {
          emailReceiveDays: [],
          emailReceiveTime: { hours: 0, minutes: 0 },
        },
        emailReceiveErr: '',
        showLink: false,
        schedules: [],
        selectedReceiveErr: '',
        hasExpireAt: false,
        hasExpireAtErr: '',
        expireAt: null,
        expireAtErr: '',
      }
    },
    tabAction: (state, action: PayloadAction<StepItem>) => {
      state.newsAlertsStep = action.payload
    },
    setNewsAlertsPopupAction: (state, action: PayloadAction<newsAlertsPopupTypes>) => {
      state.newsAlertsPopup = action.payload
      state.newsAlertsStep = initialState.newsAlertsStep
    },
    setCurrentNewsSrchId: (state, action: PayloadAction<number>) => {
      state.currentNewsSrchId = action.payload
    },
    setNewsAlertAction: (state, action: PayloadAction<NewsAlertDto>) => {
      state.currentNewsAlert = action.payload
    },
    setNewsAlertsCancelPopupAction: (state, action: PayloadAction<newsAlertsCancelPopupTypes>) => {
      state.newsAlertsCancelPopup = action.payload
    },
    setNewsAlertsSuspendPopupAction: (state, action: PayloadAction<newsAlertsSuspendPopupTypes>) => {
      state.newsAlertsSuspendPopup = action.payload
    },
    setNewsAlertsSettingPageDataAction: (state, action: PayloadAction<settingPageDataType>) => {
      state.newsAlertsSettingData = action.payload
      state.isEdit = true
    },
    setNewsAlertsReceivePageDataAction: (state, action: PayloadAction<receivePageDataType>) => {
      state.newsAlertsReceiveData = action.payload
      state.isEdit = true
    },
    fromSettingToReceiveAction: (state, action: PayloadAction<{ id: number; param?: receivePageDataType }>) => {
      state.currentAlertId = action.payload.id
      state.newsAlertsReceiveData = action.payload.param ? action.payload.param : initialState.newsAlertsReceiveData
      state.newsAlertsStep = {
        id: 'receive',
        title: '수신',
      }
      state.isEdit = false
    },
  },
})

export const {
  setNewsAlertSettingAction,
  newsAlertListAction,
  newsAlertParamKeywordAction,
  newsAlertSearchParamsAction,
  newsAlertsDeletePopupAction,
  userPopupAction,
  initNewsAlertListAction,
  initUserPopupAction,
  initCreateNewsAlertsPopup,
  initSettingDataAction,
  tabAction,
  setNewsAlertsPopupAction,
  setCurrentNewsSrchId,
  setNewsAlertAction,
  setNewsAlertsCancelPopupAction,
  setNewsAlertsSuspendPopupAction,
  setNewsAlertsSettingPageDataAction,
  setNewsAlertsReceivePageDataAction,
  fromSettingToReceiveAction,
} = newsAlertSlice.actions
export default newsAlertSlice.reducer
