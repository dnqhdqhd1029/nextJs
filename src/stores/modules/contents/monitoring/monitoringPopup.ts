import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { mediaTypePopupProps, monitoringListDto } from '~/stores/modules/contents/monitoring/newsSearch'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface keywordsProps {
  and: string
  or: string
  not: string
}

export interface additionalParamProps {
  mediaType: MbTagSearchTagItem[]
  mediaValue: SelectListOptionItem
  mediaTagList: MbTagSearchTagItem[]
  journalistTagList: MbTagSearchTagItem[]
  tone: MbTagSearchTagItem[]
  existMultimedia: MbTagSearchTagItem[]
  tag: MbTagSearchTagItem[]
  url: string
  publishingPeriod: MbTagSearchTagItem[]
  mediaBookList: MbTagSearchTagItem[]
  clipbookValue: MbTagSearchTagItem[]
  clipbook: SelectListOptionItem
  coverage: SelectListOptionItem
  informationType: SelectListOptionItem
}

export type StartMonitoringPopupProps = {
  category: SelectListOptionItem[]
  scrop: SelectListOptionItem
  isReturnAction?: boolean
  keyword: {
    and: string
    or: string
    not: string
  }
  extra: {
    mediaType: MbTagSearchTagItem[]
    mediaValue: SelectListOptionItem
    mediaTagList: MbTagSearchTagItem[]
    journalistTagList: MbTagSearchTagItem[]
    tone: MbTagSearchTagItem[]
    existMultimedia: MbTagSearchTagItem[]
    tag: MbTagSearchTagItem[]
    url: string
    publishingPeriod: MbTagSearchTagItem[]
    mediaBookList: MbTagSearchTagItem[]
    clipbookValue: MbTagSearchTagItem[]
    clipbook: SelectListOptionItem
    coverage: SelectListOptionItem
    informationType: SelectListOptionItem
  }
}

export type EditMonitoringPopupProps = {
  key: number
  name: string
  categoryList: SelectListOptionItem[]
  category: SelectListOptionItem
  scrop: SelectListOptionItem
  target: SelectListOptionItem
  isReturnAction?: boolean
  keyword: {
    and: string
    or: string
    not: string
  }
  extra: {
    mediaType: MbTagSearchTagItem[]
    mediaValue: SelectListOptionItem
    mediaTagList: MbTagSearchTagItem[]
    journalistTagList: MbTagSearchTagItem[]
    tone: MbTagSearchTagItem[]
    existMultimedia: MbTagSearchTagItem[]
    tag: MbTagSearchTagItem[]
    url: string
    publishingPeriod: MbTagSearchTagItem[]
    mediaBookList: MbTagSearchTagItem[]
    clipbookValue: MbTagSearchTagItem[]
    clipbook: SelectListOptionItem
    coverage: SelectListOptionItem
    informationType: SelectListOptionItem
  }
}

export type monitoringPopupProps = {
  isOpen: boolean
  key: number
  type: string
  step: string
  title: string
  confirmText: string
  name: string
  nameErr: string
  isEdit: boolean
  category: SelectListOptionItem
  categoryErr: string
  scrop: SelectListOptionItem
  target: SelectListOptionItem
  categoryList: SelectListOptionItem[]
  isReturnAction: boolean
  isDefault: boolean
  keyword: {
    and: string
    or: string
    not: string
  }
  extra: {
    mediaType: MbTagSearchTagItem[]
    mediaValue: SelectListOptionItem
    mediaTagList: MbTagSearchTagItem[]
    journalistTagList: MbTagSearchTagItem[]
    tone: MbTagSearchTagItem[]
    existMultimedia: MbTagSearchTagItem[]
    tag: MbTagSearchTagItem[]
    url: string
    publishingPeriod: MbTagSearchTagItem[]
    mediaBookList: MbTagSearchTagItem[]
    clipbookValue: MbTagSearchTagItem[]
    clipbook: SelectListOptionItem
    coverage: SelectListOptionItem
    informationType: SelectListOptionItem
  }
}

export type monitoringSearchPopupProps = {
  isOpen: boolean
  parentsCode: string
  keywords: keywordsProps
  additionalParam: additionalParamProps
  periodList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  toneList: SelectListOptionItem[]
  publishingPeriodList: SelectListOptionItem[]
  informationTypeList: SelectListOptionItem[]
  coverageList: SelectListOptionItem[]
  clipbookList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  newsMultiMediaList: SelectListOptionItem[]
  mediaTypePopup: mediaTypePopupProps
  monitoringList: monitoringListDto[]

  monitoringListOption: boolean
  searchActivate: boolean
  monitoringCategoryList: SelectListOptionItem[]
  mediaTypePopupList: CommonCode[]
}

export type Props = {
  categoryCommonCodeList: CommonCode[]
  monitoringPopup: monitoringPopupProps
  monitoringSearchPopup: monitoringSearchPopupProps
  monitoringCancelPopup: boolean
  monitoringCheckPopup: boolean
}

// 초기값
export const initialState: Props = {
  categoryCommonCodeList: [],
  monitoringPopup: {
    isOpen: false,
    isEdit: false,
    type: '',
    key: 0,
    step: '1',
    title: '',
    confirmText: '',
    name: '',
    nameErr: '',
    isReturnAction: false,
    category: { id: '', name: '선택' },
    categoryErr: '',
    scrop: { id: '', name: '' },
    target: { id: 'GROUP', name: '이 그룹' },
    categoryList: [],
    isDefault: false,
    keyword: {
      and: '',
      or: '',
      not: '',
    },
    extra: {
      mediaType: [],
      mediaValue: { id: '', name: '선택' },
      mediaTagList: [],
      journalistTagList: [],
      tone: [],
      existMultimedia: [],
      tag: [],
      url: '',
      publishingPeriod: [],
      mediaBookList: [],
      clipbookValue: [],
      clipbook: { id: '', name: '선택' },
      coverage: { id: '', name: '선택' },
      informationType: { id: '', name: '선택' },
    },
  },
  monitoringSearchPopup: {
    isOpen: false,
    parentsCode: '',
    keywords: {
      and: '',
      or: '',
      not: '',
    },
    searchActivate: false,
    additionalParam: {
      mediaType: [],
      mediaValue: { id: '', name: '선택' },
      mediaTagList: [],
      journalistTagList: [],
      tone: [],
      existMultimedia: [],
      tag: [],
      url: '',
      publishingPeriod: [],
      mediaBookList: [],
      clipbookValue: [],
      clipbook: { id: '', name: '선택' },
      coverage: { id: '', name: '선택' },
      informationType: { id: '', name: '선택' },
    },
    monitoringList: [],
    monitoringListOption: false,
    monitoringCategoryList: [],
    periodList: [],
    newsMultiMediaList: [],
    mediaTypeList: [],
    mediaValueList: [],
    toneList: [],
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
  },
  monitoringCancelPopup: false,
  monitoringCheckPopup: false,
}

const monitoringPopupSlice = createSlice({
  name: 'monitoringPopupSlice',
  initialState,
  reducers: {
    monitoringPopupAction: (state, action: PayloadAction<monitoringPopupProps>) => {
      state.monitoringPopup = action.payload
    },
    monitoringCancelPopupAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringCancelPopup = action.payload
    },
    monitoringCheckPopupAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringCheckPopup = action.payload
    },
    initMonitoringPopupAction: state => {
      state.monitoringPopup = initialState.monitoringPopup
      state.monitoringCancelPopup = false
      state.monitoringCheckPopup = false
    },
    initMonitoringSearchPopupAction: state => {
      state.monitoringSearchPopup = initialState.monitoringSearchPopup
    },
    monitoringOptionAdjustAction: (
      state,
      action: PayloadAction<{ keywords: keywordsProps; additionalParam: additionalParamProps }>
    ) => {
      state.monitoringSearchPopup = initialState.monitoringSearchPopup
      state.monitoringPopup.keyword = action.payload.keywords
      state.monitoringPopup.extra = action.payload.additionalParam
      state.monitoringPopup.isEdit = true
    },
    monitoringSearchPopupAction: (
      state,
      action: PayloadAction<{ keywords: keywordsProps; additionalParam: additionalParamProps }>
    ) => {
      state.monitoringSearchPopup = {
        isOpen: true,
        parentsCode: '',
        keywords: action.payload.keywords,
        searchActivate: true,
        additionalParam: action.payload.additionalParam,
        monitoringList: state.monitoringSearchPopup.monitoringList,
        monitoringListOption: false,
        monitoringCategoryList: state.monitoringSearchPopup.monitoringCategoryList,
        periodList: state.monitoringSearchPopup.periodList,
        mediaTypeList: state.monitoringSearchPopup.mediaTypeList,
        mediaValueList: state.monitoringSearchPopup.mediaValueList,
        toneList: state.monitoringSearchPopup.toneList,
        publishingPeriodList: state.monitoringSearchPopup.publishingPeriodList,
        informationTypeList: state.monitoringSearchPopup.informationTypeList,
        coverageList: state.monitoringSearchPopup.coverageList,
        clipbookList: state.monitoringSearchPopup.clipbookList,
        newsMultiMediaList: state.monitoringSearchPopup.newsMultiMediaList,
        mediaTypePopup: {
          isOpen: false,
          selectedValue: '',
          selectedType: [],
        },
        mediaTypePopupList: state.monitoringSearchPopup.mediaTypePopupList,
      }
    },
    popupinformationTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.informationTypeList = action.payload
    },
    popuppublishingPeriodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.publishingPeriodList = action.payload
    },
    popupmediaValueListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.mediaValueList = action.payload
    },
    popupperiodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.periodList = action.payload
    },
    popupcoverageListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.coverageList = action.payload
    },
    popupmediaTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.mediaTypeList = action.payload
    },
    popupclipbookListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.clipbookList = action.payload
    },
    popuptoneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.toneList = action.payload
    },
    popupNewsMultiMediaListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringSearchPopup.newsMultiMediaList = action.payload
    },
    popupmediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.monitoringSearchPopup.mediaTypePopupList = action.payload
    },
    openMonitoringPopupAction: (state, action: PayloadAction<StartMonitoringPopupProps>) => {
      state.monitoringPopup = {
        isOpen: true,
        isEdit: false,
        type: 'create',
        key: 0,
        step: '1',
        title: '모니터링 만들기',
        confirmText: '저장',
        name: '',
        nameErr: '',
        isReturnAction: !!action?.payload?.isReturnAction,
        category: action.payload.category.length > 0 ? action.payload.category[0] : { id: '', name: '선택' },
        categoryErr: '',
        scrop: action.payload.scrop,
        target: { id: 'GROUP', name: '이 그룹' },
        categoryList: action.payload.category,
        isDefault: false,
        keyword: action.payload.keyword,
        extra: action.payload.extra,
      }
    },
    editMonitoringPopupAction: (state, action: PayloadAction<EditMonitoringPopupProps>) => {
      state.monitoringPopup = {
        isOpen: true,
        isEdit: false,
        type: 'edit',
        key: action.payload.key,
        step: '1',
        title: '모니터링 수정',
        confirmText: '수정',
        name: action.payload.name,
        nameErr: '',
        isReturnAction: !!action.payload.isReturnAction,
        category: action.payload.category,
        scrop: action.payload.scrop,
        target: action.payload.target,
        categoryErr: '',
        categoryList: action.payload.categoryList,
        isDefault: false,
        keyword: action.payload.keyword,
        extra: action.payload.extra,
      }
    },
    popupkeywordsAction: (state, action: PayloadAction<keywordsProps>) => {
      state.monitoringSearchPopup.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchPopup.keywords = action.payload
      if (state.monitoringSearchPopup.additionalParam.mediaType.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.mediaTagList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.journalistTagList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.tone.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.existMultimedia.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.tag.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.publishingPeriod.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.mediaBookList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.clipbookValue.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.url !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.mediaValue.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.clipbook.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.coverage.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.additionalParam.informationType.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.and !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.not !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.or !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else {
        state.monitoringSearchPopup.searchActivate = false
      }
    },
    popupadditionalParamAction: (state, action: PayloadAction<additionalParamProps>) => {
      state.monitoringSearchPopup.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchPopup.additionalParam = action.payload
      if (action.payload.mediaType.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.tone.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.tag.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.url !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.keywords.and !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.keywords.not !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else if (state.monitoringSearchPopup.keywords.or !== '') {
        state.monitoringSearchPopup.searchActivate = true
      } else {
        state.monitoringSearchPopup.searchActivate = false
      }
    },
    resetSearchOptionPopupAction: state => {
      state.monitoringSearchPopup.keywords = {
        and: '',
        or: '',
        not: '',
      }
      state.monitoringSearchPopup.searchActivate = false
      state.monitoringSearchPopup.additionalParam = {
        mediaType: [],
        mediaValue: { id: '', name: '선택' },
        mediaTagList: [],
        journalistTagList: [],
        tone: [],
        existMultimedia: [],
        tag: [],
        url: '',
        publishingPeriod: [],
        mediaBookList: [],
        clipbookValue: [],
        clipbook: { id: '', name: '선택' },
        coverage: { id: '', name: '선택' },
        informationType: { id: '', name: '선택' },
      }
    },
    popupmediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.monitoringSearchPopup.mediaTypePopup = action.payload
    },
    popupsetMediaTypePopupData: (state, action: PayloadAction<additionalParamProps>) => {
      state.monitoringSearchPopup.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchPopup.additionalParam = action.payload
    },
  },
})

export const {
  openMonitoringPopupAction,
  editMonitoringPopupAction,
  initMonitoringPopupAction,
  monitoringPopupAction,
  monitoringSearchPopupAction,
  popupinformationTypeListAction,
  popuppublishingPeriodListAction,
  popupmediaValueListAction,
  popupperiodListAction,
  popupcoverageListAction,
  popupmediaTypeListAction,
  popupclipbookListAction,
  popuptoneListAction,
  popupNewsMultiMediaListAction,
  popupkeywordsAction,
  popupadditionalParamAction,
  resetSearchOptionPopupAction,
  popupmediaTypePopupListAction,
  popupmediaTypePopupAction,
  popupsetMediaTypePopupData,
  initMonitoringSearchPopupAction,
  monitoringOptionAdjustAction,
  monitoringCancelPopupAction,
  monitoringCheckPopupAction,
} = monitoringPopupSlice.actions
export default monitoringPopupSlice.reducer
