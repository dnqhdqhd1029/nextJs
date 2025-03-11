import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import { ResponseNewsSrchCategoryDto, SearchNewsSrchCategoryDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface keywordsProps {
  and: string
  or: string
  not: string
}

export interface monitoringListDto extends ResponseNewsSrchCategoryDto {
  categoryNm: string
}

export interface additionalParamProps {
  period: SelectListOptionItem
  startPeriod: Date
  endPeriod: Date
  periodTag: MbTagSearchTagItem[]
  mediaType: MbTagSearchTagItem[]
  mediaValue: SelectListOptionItem
  mediaTagList: MbTagSearchTagItem[]
  journalistTagList: MbTagSearchTagItem[]
  tone: MbTagSearchTagItem[]
  tag: MbTagSearchTagItem[]
  url: string
  publishingPeriod: MbTagSearchTagItem[]
  mediaBookList: MbTagSearchTagItem[]
  clipbookValue: MbTagSearchTagItem[]
  clipbook: SelectListOptionItem
  coverage: SelectListOptionItem
  informationType: SelectListOptionItem
  existMultimedia: MbTagSearchTagItem[]
}

export type monitoringListSearchProps = {
  requestList: SearchNewsSrchCategoryDto[]
  sort: string[]
  groupId: number
  ownerId?: number
}

export interface Props {
  parentsCode: string
  keywords: keywordsProps
  additionalParam: additionalParamProps
  periodList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  toneList: SelectListOptionItem[]
  newsMultiMediaList: SelectListOptionItem[]
  publishingPeriodList: SelectListOptionItem[]
  informationTypeList: SelectListOptionItem[]
  coverageList: SelectListOptionItem[]
  clipbookList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  mediaTypePopup: mediaTypePopupProps
  monitoringList: monitoringListDto[]
  monitoringListOption: boolean
  searchActivate: boolean
  monitoringActivate: boolean
  monitoringCategoryList: SelectListOptionItem[]
  mediaTypePopupList: CommonCode[]
}

// 초기값
export const initialState: Props = {
  parentsCode: 'MONITORING_CATEGORY',
  keywords: {
    and: '',
    or: '',
    not: '',
  },
  searchActivate: false,
  monitoringActivate: false,
  additionalParam: {
    period: { id: '', name: '선택' },
    startPeriod: new Date(),
    endPeriod: new Date(),
    periodTag: [],
    mediaType: [],
    mediaValue: { id: '', name: '선택' },
    mediaTagList: [],
    journalistTagList: [],
    tone: [],
    tag: [],
    url: '',
    publishingPeriod: [],
    mediaBookList: [],
    clipbookValue: [],
    clipbook: { id: '', name: '선택' },
    coverage: { id: '', name: '선택' },
    informationType: { id: '', name: '선택' },
    existMultimedia: [],
  },
  monitoringList: [],
  monitoringListOption: false,
  monitoringCategoryList: [],
  periodList: [],
  mediaTypeList: [],
  mediaValueList: [],
  toneList: [],
  newsMultiMediaList: [],
  publishingPeriodList: [],
  informationTypeList: [],
  coverageList: [],
  clipbookList: [],
  mediaTypePopup: {
    isOpen: false,
    selectedValue: '',
    selectedType: [],
  },
  mediaTypePopupList: [],
}

const newsSearchOptionsSlice = createSlice({
  name: 'newsSearchOptionsSlice',
  initialState,
  reducers: {
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    monitoringListSearchAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringListOption = action.payload
    },
    monitoringListAction: (state, action: PayloadAction<monitoringListDto[]>) => {
      state.monitoringList = action.payload
    },
    monitoringCategoryListAction: (state, action: PayloadAction<{ param: SelectListOptionItem[]; group: number }>) => {
      state.monitoringCategoryList = action.payload.param
    },
    informationTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.informationTypeList = action.payload
    },
    publishingPeriodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publishingPeriodList = action.payload
    },
    mediaValueListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaValueList = action.payload
    },
    periodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.periodList = action.payload
    },
    coverageListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.coverageList = action.payload
    },
    mediaTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaTypeList = action.payload
    },
    clipbookListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.clipbookList = action.payload
    },
    toneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.toneList = action.payload
    },
    newsMultiMediaListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.newsMultiMediaList = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    setMediaTypePopupData: (state, action: PayloadAction<additionalParamProps>) => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.additionalParam = action.payload
      if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.tone.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.tag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.url !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.clipbook.id !== '') {
        if (action.payload.clipbook.id === 'N') {
          state.searchActivate = true
          state.monitoringActivate = true
        }
        if (action.payload.clipbookValue.length > 0) {
          state.searchActivate = true
          state.monitoringActivate = true
        }
      } else if (action.payload.coverage.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.and !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.not !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.or !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.periodTag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = false
      } else if (action.payload.existMultimedia.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else {
        state.searchActivate = false
        state.monitoringActivate = false
      }
    },
    additionalParamAction: (state, action: PayloadAction<additionalParamProps>) => {
      state.additionalParam = action.payload
      if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.tone.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.tag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.url !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.and !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.not !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.keywords.or !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.periodTag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = false
      } else if (action.payload.existMultimedia.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else {
        state.searchActivate = false
        state.monitoringActivate = false
      }
    },
    keywordsAction: (state, action: PayloadAction<keywordsProps>) => {
      state.keywords = action.payload
      if (state.additionalParam.mediaType.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.mediaTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.journalistTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.tone.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.tag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.mediaBookList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.clipbookValue.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.url !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.mediaValue.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.clipbook.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.coverage.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.informationType.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.and !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.not !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.or !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (state.additionalParam.periodTag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = false
      } else if (state.additionalParam.existMultimedia.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else {
        state.searchActivate = false
        state.monitoringActivate = false
      }
    },
    resetSearchOption: state => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.keywords = {
        and: '',
        or: '',
        not: '',
      }
      state.monitoringActivate = false
      state.searchActivate = false
      state.additionalParam = {
        period: { id: '', name: '선택' },
        startPeriod: new Date(),
        endPeriod: new Date(),
        periodTag: [],
        mediaType: [],
        mediaValue: { id: '', name: '선택' },
        mediaTagList: [],
        journalistTagList: [],
        tone: [],
        tag: [],
        url: '',
        publishingPeriod: [],
        mediaBookList: [],
        clipbookValue: [],
        existMultimedia: [],
        clipbook: { id: '', name: '선택' },
        coverage: { id: '', name: '선택' },
        informationType: { id: '', name: '선택' },
      }
    },
    initAction: state => {
      state.keywords = {
        and: '',
        or: '',
        not: '',
      }
      state.searchActivate = false
      state.monitoringActivate = false
      state.additionalParam = {
        period: { id: '', name: '선택' },
        startPeriod: new Date(),
        endPeriod: new Date(),
        periodTag: [],
        mediaType: [],
        mediaValue: { id: '', name: '선택' },
        mediaTagList: [],
        journalistTagList: [],
        tone: [],
        tag: [],
        url: '',
        publishingPeriod: [],
        mediaBookList: [],
        clipbookValue: [],
        existMultimedia: [],
        clipbook: { id: '', name: '선택' },
        coverage: { id: '', name: '선택' },
        informationType: { id: '', name: '선택' },
      }
      state.monitoringList = []
      state.monitoringListOption = false
      state.monitoringCategoryList = []
      state.periodList = []
      state.mediaTypeList = []
      state.mediaValueList = []
      state.toneList = []
      state.newsMultiMediaList = []
      state.publishingPeriodList = []
      state.informationTypeList = []
      state.coverageList = []
      state.clipbookList = []
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopupList = []
    },
    researchOptionAction: (
      state,
      action: PayloadAction<{ keywords: keywordsProps; additionalParam: additionalParamProps; searchActivate: boolean }>
    ) => {
      state.keywords = action.payload.keywords
      state.additionalParam = action.payload.additionalParam
      if (action.payload.additionalParam.mediaType.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.mediaTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.journalistTagList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.tone.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.tag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.mediaBookList.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.clipbookValue.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.url !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.mediaValue.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.clipbook.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.coverage.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.informationType.id !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.keywords.and !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.keywords.not !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.keywords.or !== '') {
        state.searchActivate = true
        state.monitoringActivate = true
      } else if (action.payload.additionalParam.periodTag.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = false
      } else if (action.payload.additionalParam.existMultimedia.length > 0) {
        state.searchActivate = true
        state.monitoringActivate = true
      } else {
        state.searchActivate = false
        state.monitoringActivate = false
      }
    },
  },
})

export const {
  initAction,
  monitoringListSearchAction,
  periodListAction,
  informationTypeListAction,
  publishingPeriodListAction,
  coverageListAction,
  clipbookListAction,
  toneListAction,
  mediaValueListAction,
  mediaTypePopupAction,
  keywordsAction,
  additionalParamAction,
  monitoringCategoryListAction,
  mediaTypeListAction,
  monitoringListAction,
  resetSearchOption,
  mediaTypePopupListAction,
  setMediaTypePopupData,
  researchOptionAction,
  newsMultiMediaListAction,
} = newsSearchOptionsSlice.actions

export default newsSearchOptionsSlice.reducer
