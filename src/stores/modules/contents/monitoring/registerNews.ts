import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { clipbookContentListProps, clipbookContentProps } from '~/stores/modules/contents/monitoring/clipbook'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'

export type personalParamsProps = {
  link: string
  linkErr: string
  linkList: MonitoringSearchNewsDocumentDto[]
  title: string
  titleErr: string
  website: string
  websiteErr: string
  selectedDate: Date
  selectedTime: { hours: number; minutes: number }
  dateErrorMessage: string
  targetMedia: MbTagSearchTagItem[]
  targetAuthor: MbTagSearchTagItem[]
  targetMediaErr: string
  targetAuthorErr: string
  clipbookList: MbTagSearchTagItem[]
  tagList: MbTagSearchTagItem[]
}

export type excelListProps = {
  id: string
  title: string
  date: string
  link?: string
  media?: string
  author?: string
}

export type clipbookIdListProps = {
  id: number
  title: string
}

export type excelParamsProps = {
  clipbookList: MbTagSearchTagItem[]
  execelIdList: string[]
  excelList: excelListProps[]
  excelFileList: MbTagSearchTagItem[]
}

export type clipbookListPageProps = {
  isOpen: boolean
  name: string
  nameErr: string
  clipbookIdList: clipbookIdListProps[]
}

export type Props = {
  step: string
  personalParams: personalParamsProps
  newsListLoading: boolean
  excelDataLoading: boolean
  newsId: number
  addStep: string
  excelParams: excelParamsProps
  clipbookListPage: clipbookListPageProps
  clipbookContentList: clipbookContentListProps[]
}

// 초기값
export const initialState: Props = {
  step: 'information',
  addStep: 'personal',
  excelParams: {
    clipbookList: [],
    execelIdList: [],
    excelList: [],
    excelFileList: [],
  },
  personalParams: {
    link: '',
    linkErr: '',
    linkList: [],
    title: '',
    titleErr: '',
    website: '',
    websiteErr: '',
    selectedDate: new Date(),
    selectedTime: { hours: 12, minutes: 0 },
    dateErrorMessage: '',
    targetMedia: [],
    targetAuthor: [],
    targetMediaErr: '',
    targetAuthorErr: '',
    clipbookList: [],
    tagList: [],
  },
  newsListLoading: false,
  excelDataLoading: false,
  newsId: 0,
  clipbookListPage: {
    isOpen: false,
    name: '',
    nameErr: '',
    clipbookIdList: [],
  },
  clipbookContentList: [],
}

const registerNewsSlice = createSlice({
  name: 'registerNewsSlice',
  initialState,
  reducers: {
    clipbookPopupAction: (state, action: PayloadAction<clipbookListPageProps>) => {
      state.clipbookListPage = action.payload
    },
    initClipbookPopupAction: (state, action: PayloadAction<{ isOpen: boolean; list: clipbookIdListProps[] }>) => {
      state.clipbookListPage = {
        isOpen: action.payload.isOpen,
        name: '',
        nameErr: '',
        clipbookIdList: action.payload.list,
      }
    },
    excelDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.excelDataLoading = action.payload
    },
    addStepAction: (state, action: PayloadAction<string>) => {
      state.addStep = action.payload
      state.excelParams = {
        ...state.excelParams,
        clipbookList: [],
      }
    },
    addNewsIdAction: (state, action: PayloadAction<number>) => {
      state.newsId = action.payload
      state.addStep = 'done'
    },
    stepAction: (state, action: PayloadAction<string>) => {
      state.step = action.payload
      state.addStep = 'add'
      state.excelParams = {
        clipbookList: [],
        execelIdList: [],
        excelList: [],
        excelFileList: [],
      }
      state.personalParams = {
        link: '',
        linkErr: '',
        linkList: [],
        title: '',
        titleErr: '',
        website: '',
        websiteErr: '',
        selectedDate: new Date(),
        selectedTime: { hours: 12, minutes: 0 },
        dateErrorMessage: '',
        targetMedia: [],
        targetAuthor: [],
        targetMediaErr: '',
        targetAuthorErr: '',
        clipbookList: [],
        tagList: [],
      }
      state.newsListLoading = false
      state.excelDataLoading = false
      state.clipbookListPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        clipbookIdList: [],
      }
      state.newsId = 0
    },
    newsListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsListLoading = action.payload
    },
    newsListAction: (state, action: PayloadAction<personalParamsProps>) => {
      state.personalParams = action.payload
      state.newsListLoading = false
    },
    personalParamsAction: (state, action: PayloadAction<personalParamsProps>) => {
      state.personalParams = action.payload
    },
    excelParamsAction: (state, action: PayloadAction<excelParamsProps>) => {
      state.excelParams = action.payload
      state.excelDataLoading = false
    },
    personalLinkParamsAction: (state, action: PayloadAction<string>) => {
      state.personalParams.link = action.payload
      state.personalParams.website = ''
      state.personalParams.linkList = []
      state.personalParams.linkErr = ''
    },
    clipbookDataAction: (
      state,
      action: PayloadAction<{ personal: MbTagSearchTagItem[]; excel: MbTagSearchTagItem[] }>
    ) => {
      state.personalParams.clipbookList = action.payload.personal
      state.excelParams.clipbookList = action.payload.excel
      state.clipbookListPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        clipbookIdList: [],
      }
    },
    clipbookContentListAction: (state, action: PayloadAction<clipbookContentListProps[]>) => {
      state.clipbookContentList = action.payload
    },
    initAction: () => initialState,
  },
})

export const {
  clipbookDataAction,
  excelDataLoadingAction,
  excelParamsAction,
  initAction,
  stepAction,
  personalParamsAction,
  newsListAction,
  personalLinkParamsAction,
  newsListLoadingAction,
  addNewsIdAction,
  addStepAction,
  clipbookPopupAction,
  clipbookContentListAction,
  initClipbookPopupAction,
} = registerNewsSlice.actions
export default registerNewsSlice.reducer
