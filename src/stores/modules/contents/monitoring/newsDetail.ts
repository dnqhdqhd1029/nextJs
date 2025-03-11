import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { draftListPopupType } from '~/stores/modules/contents/draft/draft'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { personalParamsProps } from '~/stores/modules/contents/monitoring/registerNews'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'

export type userPopupProps = {
  isOpen: boolean
  email: string
  displayName: string
  phone: string
  mobile: string
  role: string
  keyValue: number
}

export interface newsEditPopupProps {
  isOpen: boolean
  link: string
  linkErr: string
  linkList: MonitoringSearchNewsDocumentDto[]
  isRenew: boolean
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
export interface newsIdParamsProps extends MonitoringSearchNewsDocumentDto {
  toneValue: string
  mediaSubType: string
  clipbookData: MbTagSearchTagItem[]
  tagList: MbTagSearchTagItem[]
  optionList: SelectListOptionItem[]
}

export type deletePopupProps = {
  isOpen: boolean
  title: string
  key: number
}

export type newsErrPopupProps = {
  isOpen: boolean
  newsTitle: string
  newsId: number
  key: number
  title: string
  titleErr: string
  contents: string
  contentErr: string
}

export type newsApiParamsProps = {
  newsIdList: number[]
  timezone: string
  periodStartYear: string
  periodStartMonth: string
  periodStartDay: string
  periodEndYear: string
  periodEndMonth: string
  periodEndDay: string
  page: number
  size: number
  sort: string[]
  groupId: number
}

export type Props = {
  newsIdParams: newsIdParamsProps | null
  newsApiParams: newsApiParamsProps
  mediaSubTypeList: SelectListOptionItem[]
  toneList: SelectListOptionItem[]
  parentCode: string
  newsLoading: boolean
  isOwner: boolean
  deletePopup: deletePopupProps
  newsErrPopup: newsErrPopupProps
  newsEditPopup: newsEditPopupProps
  userPopup: userPopupProps
  newsLinkLoading: boolean
  newsCheckDuplicateParam: string[] | null
}

// 초기값
export const initialState: Props = {
  newsIdParams: null,
  newsApiParams: {
    newsIdList: [],
    timezone: '',
    periodStartYear: moment().format('YYYY'),
    periodStartMonth: moment().format('MM'),
    periodStartDay: moment().subtract({ days: 7 }).format('DD'),
    periodEndYear: moment().format('YYYY'),
    periodEndMonth: moment().format('MM'),
    periodEndDay: moment().format('DD'),
    page: 1,
    size: 10,
    sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
    groupId: 0,
  },
  isOwner: false,
  parentCode: 'TONE',
  toneList: [],
  mediaSubTypeList: [],

  newsCheckDuplicateParam: null,
  newsLoading: false,
  deletePopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  newsErrPopup: {
    isOpen: false,
    newsTitle: '',
    newsId: 0,
    key: 0,
    title: '',
    titleErr: '',
    contents: '',
    contentErr: '',
  },
  newsEditPopup: {
    isOpen: false,
    link: '',
    linkErr: '',
    website: '',
    websiteErr: '',
    linkList: [],
    isRenew: false,
    title: '',
    titleErr: '',
    selectedDate: new Date(),
    selectedTime: { hours: 0, minutes: 0 },
    dateErrorMessage: '',
    targetMedia: [],
    targetAuthor: [],
    targetMediaErr: '',
    targetAuthorErr: '',
    clipbookList: [],
    tagList: [],
  },
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  newsLinkLoading: false,
}

const newsDetailSlice = createSlice({
  name: 'newsDetailSlice',
  initialState,
  reducers: {
    newsLinkLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLinkLoading = action.payload
    },
    personalLinkParamsAction: (state, action: PayloadAction<string>) => {
      state.newsEditPopup.link = action.payload
      state.newsEditPopup.website = ''
      state.newsEditPopup.isRenew = true
      state.newsEditPopup.linkList = []
      state.newsEditPopup.linkErr = ''
    },
    initNewsLinkAction: state => {
      state.newsEditPopup = {
        isOpen: false,
        link: '',
        linkErr: '',
        website: '',
        websiteErr: '',
        linkList: [],
        isRenew: false,
        title: '',
        titleErr: '',
        selectedDate: new Date(),
        selectedTime: { hours: 0, minutes: 0 },
        dateErrorMessage: '',
        targetMedia: [],
        targetAuthor: [],
        targetMediaErr: '',
        targetAuthorErr: '',
        clipbookList: [],
        tagList: [],
      }
      state.newsLinkLoading = false
    },
    newsLinkAction: (state, action: PayloadAction<newsEditPopupProps>) => {
      state.newsEditPopup = action.payload
      state.newsLinkLoading = false
    },
    newsEditPopupAction: (state, action: PayloadAction<newsEditPopupProps>) => {
      state.newsEditPopup = action.payload
    },
    newsEditClipbookAction: (state, action: PayloadAction<newsEditPopupProps>) => {
      state.newsEditPopup = action.payload
    },
    newsErrPopupPropsAction: (state, action: PayloadAction<newsErrPopupProps>) => {
      state.newsErrPopup = action.payload
    },
    initNewsErrPopupPropsAction: state => {
      state.newsErrPopup = {
        isOpen: false,
        newsTitle: '',
        newsId: 0,
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    newsIdParamsAction: (state, action: PayloadAction<newsIdParamsProps>) => {
      state.newsIdParams = action.payload
      state.deletePopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.newsErrPopup = {
        isOpen: false,
        newsTitle: '',
        newsId: 0,
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.newsEditPopup = {
        isOpen: false,
        link: '',
        linkErr: '',
        website: '',
        websiteErr: '',
        linkList: [],
        isRenew: false,
        title: '',
        titleErr: '',
        selectedDate: new Date(),
        selectedTime: { hours: 0, minutes: 0 },
        dateErrorMessage: '',
        targetMedia: [],
        targetAuthor: [],
        targetMediaErr: '',
        targetAuthorErr: '',
        clipbookList: [],
        tagList: [],
      }
    },
    setNewsDetailAction: (
      state,
      action: PayloadAction<{ param: newsIdParamsProps; dto: newsApiParamsProps; isOwner: boolean }>
    ) => {
      state.newsIdParams = action.payload.param
      state.newsApiParams = action.payload.dto
      state.isOwner = action.payload.isOwner

      state.parentCode = 'TONE'
      state.toneList = []
      state.mediaSubTypeList = []

      state.newsLoading = false
      state.deletePopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.newsErrPopup = {
        isOpen: false,
        newsTitle: '',
        newsId: 0,
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.newsEditPopup = {
        isOpen: false,
        link: '',
        linkErr: '',
        website: '',
        websiteErr: '',
        linkList: [],
        isRenew: false,
        title: '',
        titleErr: '',
        selectedDate: new Date(),
        selectedTime: { hours: 0, minutes: 0 },
        dateErrorMessage: '',
        targetMedia: [],
        targetAuthor: [],
        targetMediaErr: '',
        targetAuthorErr: '',
        clipbookList: [],
        tagList: [],
      }
      state.newsLinkLoading = false
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    newsDetailCheckDuplicateParamAction: (state, action: PayloadAction<string[] | null>) => {
      state.newsCheckDuplicateParam = action.payload
    },
    toneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.toneList = action.payload
    },
    newsApiParamsAction: (state, action: PayloadAction<newsApiParamsProps>) => {
      console.log('action.payload', action.payload)
      state.newsApiParams = action.payload
    },
    mediaSubTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaSubTypeList = action.payload
    },
    deletePopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.deletePopup = action.payload
    },
  },
})

export const {
  newsIdParamsAction,
  newsApiParamsAction,
  initNewsErrPopupPropsAction,
  toneListAction,
  mediaSubTypeListAction,
  newsLoadingAction,
  setNewsDetailAction,
  deletePopupAction,
  newsErrPopupPropsAction,
  newsLinkAction,
  newsEditPopupAction,
  initNewsLinkAction,
  personalLinkParamsAction,
  newsLinkLoadingAction,
  newsEditClipbookAction,
  userPopupAction,
  newsDetailCheckDuplicateParamAction,
} = newsDetailSlice.actions

export default newsDetailSlice.reducer
