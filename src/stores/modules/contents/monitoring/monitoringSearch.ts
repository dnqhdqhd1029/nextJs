import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { subNewsFilterOptionsList } from '~/components/contents/monitoring/MonitoringList/defaultData'
import { deletePopupProps } from '~/stores/modules/contents/monitoring/newsDetail'
import { userPopupProps } from '~/stores/modules/contents/monitoring/newsSearchResult'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { contentDeletePopupProps } from '~/stores/modules/contents/pressMedia/savedSearch'
import { ESearchNewsCondDto, type NewsSrchDto, ResponseNewsSrchCategoryDto } from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MediaNameCountType, MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'
export interface ValuePointListProps {
  key: string
  value: string
}

export interface monitoringListDto extends ResponseNewsSrchCategoryDto {
  categoryNm: string
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export interface tagPopupProps {
  isOpen: boolean
  tagList: MbTagSearchTagItem[]
}

export interface monitoringParamsProps {
  and: string
  or: string
  not: string
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

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
}

export interface isNoticePopupProps {
  isOpen: boolean
  newsCountListByUpperMedia: ChartLineProps
  dailyNewsCountListChart: ChartLineProps
  tonePieChart: ChartProps
  mediaTypePieChart: ChartProps
}

export interface monitoringAnalysisPopupProps {
  isOpen: boolean
  title: string
  idKey: number
  isLoading: boolean
  dailyNewsCountList: MediaNameCountType[]
  toneCountList: MediaNameCountType[]
  newsCountListByUpperMedia: MediaNameCountType[]
  mediaTypeList: MediaNameCountType[]
  newDailyNewsDataOptions?: ApexCharts.ApexOptions
  newDailyNewsDataSeries?: ApexAxisChartSeries
  newToneCountDataOptions?: ApexCharts.ApexOptions
  newToneCountDataSeries?: number[]
  newMediaAnalysisDataOptions?: ApexCharts.ApexOptions
  newMediaAnalysisDataSeries?: ApexAxisChartSeries
  newMediaTypeDataOptions?: ApexCharts.ApexOptions
  newMediaTypeDataSeries?: number[]
  tagList: []
  file: File | null
}

export type MonitoringDataToChartProps = {
  mediaTypePieChart: ChartProps
  tonePieChart: ChartProps
  newsCountListByUpperMedia: ChartLineProps
  dailyNewsCountList: ChartLineProps
}

export type ChartLineProps = {
  max: number
  categories: string[]
  data: number[]
}

export type ChartProps = {
  labels: string[]
  series: number[]
}

export type ChartDataProps = {
  name: string
  count: number
}

export type reportPopupNameStepProps = {
  name: string
  nameErr: string
}

export interface SearchListItemAuthor {
  id: number
  name: string
}

export interface SortedNewsItem {
  id: number
  title: string
  linkUrl: string
  date: string
  mediaName: string
  mediaId: number
  authors: string
  mediaValueRank: string
  authorList?: {
    jid?: {
      by_email?: string[]
      by_name?: string[]
    }
    jname?: string[]
    mid?: string
    mname?: string
    pid?: string[]
  }
  tone: string
  mediaValue: number
  subtype: string
}

export type groupingNewsListProps = {
  id: string
  name: string
  data: SortedNewsItem[]
}

export type reportPopupReleaseStepProps = {
  tabStatus: string
  isWord: boolean
  isEmail: boolean
  isPdf: boolean
  isWordDownload: boolean
  isPdfDownload: boolean
  title: string
  titleErr: string
  receiverErr: string
  targetEmailErr: string
  receiverList: MbTagSearchTagItem[]
  addEmail: string
  targetEmail: MbTagSearchTagItem[]
  contents: string
  userList: NavigationLinkItem[]
}

export type reportPopupNewsStepProps = {
  newsArrayList: SelectListOptionItem
  isNewsGrouping: boolean
  newsGroupType: SelectListOptionItem
  newsList: SortedNewsItem[]
  groupingNewsList: groupingNewsListProps[]
  draggingId: number | null
}

export type reportPopupProps = {
  isOpen: boolean
  step: string
  newsStepActive: boolean
  activityOpen: boolean
  files: File[]
  keyword: string
  keywordList: NavigationLinkItem[]
  originNewsList: SortedNewsItem[]
  nameStep: reportPopupNameStepProps
  newsStep: reportPopupNewsStepProps
  releaseStep: reportPopupReleaseStepProps
}

export type Props = {
  isOwner: boolean
  monitoringDate: SelectListOptionItem
  monitoringCategoryKeyword: string
  monitoringListParamKeyword: string
  monitoringCategoryButton: boolean
  keyDateList: []
  monitoringParams: monitoringParamsProps
  monitoringSearchOptionParams: monitoringParamsProps
  monitoringCategoryList: SelectListOptionItem[]
  newsMonitoringPeriodList: SelectListOptionItem[]
  monitoringList: monitoringListDto[]
  originMonitoringList: monitoringListDto[]
  parentCode: string
  monitoringListParams: ESearchNewsCondDto
  pageCount: pageCountProps
  monitoringIdParams: number
  newsLoading: boolean
  monitoringListLoading: boolean
  countLoading: boolean
  newsIdKey: number
  newsList: MonitoringSearchNewsDocumentDto[]
  monitoringParamsExpandButton: boolean
  toneList: SelectListOptionItem[]
  newsMultiMediaList: SelectListOptionItem[]
  monitoringCategoryData: null | NewsSrchDto
  monitoringCategoryAuth: boolean
  searchContentListButton: boolean
  searchContentKeyList: MonitoringSearchNewsDocumentDto[]
  isSelectedAllNewsId: boolean
  isTagButton: boolean
  monitoringDateCode: string
  newsIdParams: MonitoringSearchNewsDocumentDto | null
  searchActivate: boolean
  searchDropBoxActivate: boolean
  periodList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  mediaValueFilterList: SelectListOptionItem[]
  publishingPeriodList: SelectListOptionItem[]
  informationTypeList: SelectListOptionItem[]
  coverageList: SelectListOptionItem[]
  clipbookList: SelectListOptionItem[]
  mediaSubTypeList: SelectListOptionItem[]
  mediaSubTotalTypeList: mediaSubTypeListProps[]
  mediaTypeList: SelectListOptionItem[]
  mediaTypePopupList: CommonCode[]
  mediaValuePointList: ValuePointListProps[]
  mediaTypePopup: mediaTypePopupProps
  editPageOpen: boolean
  isFilterSubParam: boolean
  filterSubParam: NavigationLinkItem[]
  filterSubParamActions: filterSubParamActionsProps[]
  newsCheckDuplicateParam: string[] | null
  isLimitFilter: number

  monitoringAnalysisPopup: monitoringAnalysisPopupProps
  isNoticePopup: isNoticePopupProps

  tagPopup: tagPopupProps
  reportPopup: reportPopupProps
  deletePopup: deletePopupProps
  userPopup: userPopupProps
  contentDeletePopup: contentDeletePopupProps
  fileDownloadPopup: deletePopupProps
  reportCancelPopup: boolean
  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  isTagButton: false,
  isSelectedAllNewsId: false,
  searchContentListButton: false,
  monitoringListLoading: false,
  countLoading: false,
  searchContentKeyList: [],
  isOwner: false,
  monitoringDateCode: '',
  monitoringDate: { id: '', name: '' },
  monitoringCategoryData: null,
  monitoringCategoryAuth: false,
  monitoringCategoryKeyword: '',
  monitoringCategoryButton: false,
  monitoringIdParams: 0,
  monitoringListParamKeyword: '',
  monitoringListParams: {
    timezone: '',
    periodStartYear: moment().subtract({ days: 7 }).format('YYYY'),
    periodStartMonth: moment().subtract({ days: 7 }).format('MM'),
    periodStartDay: moment().subtract({ days: 7 }).format('DD'),
    periodEndYear: moment().format('YYYY'),
    periodEndMonth: moment().format('MM'),
    periodEndDay: moment().format('DD'),
    page: 1,
    size: 20,
    sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
    groupId: 0,
  },
  monitoringParams: {
    and: '',
    or: '',
    not: '',
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
  monitoringSearchOptionParams: {
    and: '',
    or: '',
    not: '',
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
  monitoringParamsExpandButton: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  newsLoading: false,
  newsList: [],
  newsIdKey: 0,
  newsIdParams: null,
  keyDateList: [],
  monitoringList: [],
  originMonitoringList: [],
  monitoringCategoryList: [],
  newsMonitoringPeriodList: [],
  toneList: [],
  newsMultiMediaList: [],
  parentCode: 'MONITORING_CATEGORY',
  newsCheckDuplicateParam: null,

  searchActivate: false,
  searchDropBoxActivate: false,
  periodList: [],
  mediaTypeList: [],
  mediaValueList: [],
  mediaValueFilterList: [],
  publishingPeriodList: [],
  informationTypeList: [],
  mediaSubTypeList: [],
  mediaSubTotalTypeList: [],
  coverageList: [],
  clipbookList: [],
  mediaValuePointList: [],
  mediaTypePopup: {
    isOpen: false,
    selectedValue: '',
    selectedType: [],
  },
  mediaTypePopupList: [],
  editPageOpen: false,

  monitoringAnalysisPopup: {
    isOpen: false,
    title: '',
    idKey: 0,
    isLoading: false,
    dailyNewsCountList: [],
    toneCountList: [],
    newsCountListByUpperMedia: [],
    mediaTypeList: [],
    tagList: [],
    file: null,
  },
  isNoticePopup: {
    isOpen: false,
    newsCountListByUpperMedia: {
      max: 0,
      categories: [],
      data: [],
    },
    dailyNewsCountListChart: {
      max: 0,
      categories: [],
      data: [],
    },
    tonePieChart: {
      labels: [],
      series: [],
    },
    mediaTypePieChart: {
      labels: [],
      series: [],
    },
  },
  isFilterSubParam: false,
  filterSubParamActions: subNewsFilterOptionsList,
  filterSubParam: [],

  tagPopup: {
    isOpen: false,
    tagList: [],
  },
  reportPopup: {
    isOpen: false,
    step: 'name',
    originNewsList: [],
    newsStepActive: false,
    activityOpen: false,
    keyword: '',
    keywordList: [],
    files: [],
    nameStep: {
      name: '',
      nameErr: '',
    },
    newsStep: {
      newsArrayList: { id: '', name: '선택' },
      isNewsGrouping: false,
      newsGroupType: { id: '', name: '선택' },
      newsList: [],
      groupingNewsList: [],
      draggingId: null,
    },
    releaseStep: {
      tabStatus: 'email',
      isWord: false,
      isEmail: true,
      isPdf: false,
      isWordDownload: false,
      isPdfDownload: false,
      title: '',
      titleErr: '',
      addEmail: '',
      receiverList: [],
      targetEmail: [],
      contents: '',
      receiverErr: '',
      targetEmailErr: '',
      userList: [],
    },
  },
  deletePopup: {
    isOpen: false,
    title: '',
    key: 0,
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
  contentDeletePopup: {
    isOpen: false,
    title: '',
    key: 0,
    type: '',
  },
  fileDownloadPopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  reportCancelPopup: false,
  isLimitFilter: 0,
  searchLimitAlarm: false,
}

const monitoringSearchSlice = createSlice({
  name: 'monitoringSearchSlice',
  initialState,
  reducers: {
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    fileDownloadPopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.fileDownloadPopup = action.payload
    },
    setCheckReportPopupAction: (state, action: PayloadAction<boolean>) => {
      state.reportCancelPopup = action.payload
    },
    setSearchContentKeyListAction: state => {
      state.searchContentKeyList = []
    },
    setDoenReportPopupAction: state => {
      state.searchContentKeyList = []
      state.reportCancelPopup = false
      state.reportPopup = {
        isOpen: false,
        step: 'name',
        originNewsList: [],
        newsStepActive: false,
        activityOpen: false,
        keyword: '',
        keywordList: [],
        files: [],
        nameStep: {
          name: '',
          nameErr: '',
        },
        newsStep: {
          newsArrayList: { id: '', name: '선택' },
          isNewsGrouping: false,
          newsGroupType: { id: '', name: '선택' },
          newsList: [],
          groupingNewsList: [],
          draggingId: null,
        },
        releaseStep: {
          tabStatus: 'email',
          isWord: false,
          isEmail: true,
          isPdf: false,
          isWordDownload: false,
          isPdfDownload: false,
          title: ``,
          titleErr: '',
          addEmail: '',
          receiverList: [],
          targetEmail: [],
          contents: '',
          receiverErr: '',
          targetEmailErr: '',
          userList: [],
        },
      }
    },
    initReportPopupAction: (
      state,
      action: PayloadAction<{ isOpen: boolean; originNewsList: SortedNewsItem[]; titleNm: string }>
    ) => {
      console.log('initReportPopupAction', action.payload)
      state.reportPopup = {
        isOpen: action.payload.isOpen,
        step: 'name',
        originNewsList: action.payload.originNewsList,
        newsStepActive: false,
        activityOpen: false,
        keyword: '',
        keywordList: [],
        files: [],
        nameStep: {
          name: '',
          nameErr: '',
        },
        newsStep: {
          newsArrayList: { id: '', name: '선택' },
          isNewsGrouping: false,
          newsGroupType: { id: '', name: '선택' },
          newsList: action.payload.originNewsList,
          groupingNewsList: [],
          draggingId: null,
        },
        releaseStep: {
          tabStatus: 'email',
          isWord: false,
          isEmail: true,
          isPdf: false,
          isWordDownload: false,
          isPdfDownload: false,
          title: `보고서 - ${action.payload.titleNm} 분석`,
          titleErr: '',
          addEmail: '',
          receiverList: [],
          targetEmail: [],
          contents: '',
          receiverErr: '',
          targetEmailErr: '',
          userList: [],
        },
      }
    },
    monitoringListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringListLoading = action.payload
    },
    countLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.countLoading = action.payload
    },
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    isFilterSubParamAction: (state, action: PayloadAction<boolean>) => {
      state.isFilterSubParam = action.payload
    },
    filterSubParamActionsAction: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterSubParamActions = action.payload
    },
    reportPopupAction: (state, action: PayloadAction<reportPopupProps>) => {
      state.reportPopup = action.payload
    },
    reportPopupActivityOpenAction: (state, action: PayloadAction<boolean>) => {
      state.reportPopup.activityOpen = action.payload
    },
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },
    doneTagAction: state => {
      state.searchContentKeyList = []
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },
    initTagPopupAction: state => {
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },

    searchContentKeyListAction: (
      state,
      action: PayloadAction<{
        param: MonitoringSearchNewsDocumentDto[]
        isTag: boolean
      }>
    ) => {
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllNewsId = false
      state.isTagButton = action.payload.isTag
    },
    isNoticePopupAction: (state, action: PayloadAction<isNoticePopupProps>) => {
      state.isNoticePopup = action.payload
    },
    initMonitoringAnalysisPopupAction: state => {
      state.monitoringAnalysisPopup = initialState.monitoringAnalysisPopup
    },
    monitoringAnalysisPopupAction: (state, action: PayloadAction<monitoringAnalysisPopupProps>) => {
      state.monitoringAnalysisPopup = action.payload
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    isOwnerAction: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
    },
    afterClipbookAddNewsListAction: (
      state,
      action: PayloadAction<{ list: MonitoringSearchNewsDocumentDto[]; newsParam: MonitoringSearchNewsDocumentDto }>
    ) => {
      state.searchContentKeyList = []
      state.newsList = action.payload.list
      state.newsIdParams = action.payload.newsParam
    },
    afterClipbookAddNewsParamAction: (
      state,
      action: PayloadAction<{ list: MonitoringSearchNewsDocumentDto[]; newsParam: MonitoringSearchNewsDocumentDto }>
    ) => {
      state.newsList = action.payload.list
      state.newsIdParams = action.payload.newsParam
    },
    monitoringCategoryButtonAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringCategoryButton = action.payload
    },
    monitoringParamsExpandButtonAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringParamsExpandButton = action.payload
    },
    monitoringListParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.monitoringListParamKeyword = action.payload
    },
    monitoringListParamsAction: (state, action: PayloadAction<ESearchNewsCondDto>) => {
      state.monitoringListParams = action.payload
    },
    pageCountAction: (state, action: PayloadAction<pageCountProps>) => {
      state.pageCount = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    resetMonitoringParamsAction: state => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchOptionParams = {
        and: '',
        or: '',
        not: '',
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
      state.searchActivate = false
      state.searchDropBoxActivate = false
    },
    userListAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.reportPopup.releaseStep.userList = action.payload
      state.reportPopup.keywordList = action.payload
    },
    monitoringSearchOptionParamsAction: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchOptionParams = action.payload
      console.log('monitoringSearchOptionParamsAction', action.payload)
      if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tone.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tag.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.url !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.and !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.not !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.or !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
      }
    },
    monitoringParamsAction: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.monitoringParams = action.payload
      if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tone.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tag.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.url !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.and !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.not !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.or !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
      }
    },
    monitoringDateAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.monitoringDate = action.payload
    },
    originMonitoringListAction: (state, action: PayloadAction<monitoringListDto[]>) => {
      state.monitoringIdParams = 0
      state.monitoringList = action.payload
      state.originMonitoringList = action.payload
    },
    setOnChangeMonitoringListAction: (
      state,
      action: PayloadAction<{
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        filterSubParam: NavigationLinkItem[]
      }>
    ) => {
      state.filterSubParam = action.payload.filterSubParam
      state.filterSubParamActions = subNewsFilterOptionsList
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.searchLimitAlarm = false
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
    },
    setOnChangeMonitoringSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: monitoringParamsProps
        dto: ESearchNewsCondDto
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        filterSubParam: NavigationLinkItem[]
        isResetSelectedNews: boolean
        type: string
      }>
    ) => {
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      state.searchLimitAlarm = false
      state.monitoringListParams = action.payload.dto
      state.monitoringParams = action.payload.props
      state.newsList = action.payload.newsList
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      if (action.payload.filterSubParam.length > 0) {
        state.filterSubParam = action.payload.filterSubParam
      }
      if (action.payload.type === 'dto') {
        state.filterSubParamActions = subNewsFilterOptionsList
      }
    },
    setOnChangeMonitoringSearchFilterOptionAction: (
      state,
      action: PayloadAction<{
        props: monitoringParamsProps
        tempFilterSubParam: filterSubParamActionsProps[]
        dto: ESearchNewsCondDto
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
      }>
    ) => {
      state.editPageOpen = false
      state.searchContentKeyList = []
      state.searchLimitAlarm = false
      state.monitoringParams = action.payload.props
      state.monitoringListParams = action.payload.dto
      state.newsList = action.payload.newsList
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      state.filterSubParamActions = action.payload.tempFilterSubParam
    },
    isMonitoringFilterOptionAction: (
      state,
      action: PayloadAction<{
        dto: ESearchNewsCondDto
        isFilterSubParam: boolean
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        filterSubParam: NavigationLinkItem[]
        tempFilterSubParam: filterSubParamActionsProps[]
      }>
    ) => {
      state.isFilterSubParam = false
      state.editPageOpen = false
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.searchContentKeyList = []
      state.searchLimitAlarm = false
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.dto
      state.filterSubParamActions = action.payload.tempFilterSubParam
      state.filterSubParam = action.payload.filterSubParam
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
    },
    setNewsListAction: (
      state,
      action: PayloadAction<{
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        newsIdParams: MonitoringSearchNewsDocumentDto | null
        newsIdKey: number
      }>
    ) => {
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.newsIdParams = action.payload.newsIdParams
      state.newsIdKey = action.payload.newsIdKey
      state.searchLimitAlarm = false
      state.searchActivate = false
      state.searchDropBoxActivate = false
    },
    newsIdParamsAction: (state, action: PayloadAction<MonitoringSearchNewsDocumentDto>) => {
      state.newsIdParams = action.payload
      state.newsIdKey = action.payload.newsid || 0
    },
    monitoringListAction: (state, action: PayloadAction<monitoringListDto[]>) => {
      state.monitoringList = action.payload
    },
    monitoringCategoryKeywordAction: (state, action: PayloadAction<string>) => {
      state.monitoringCategoryKeyword = action.payload
    },
    keyDateListAction: (state, action: PayloadAction<[]>) => {
      state.keyDateList = action.payload
    },
    monitoringCategoryListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.monitoringCategoryList = action.payload
    },
    newsMonitoringPeriodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.newsMonitoringPeriodList = action.payload
    },
    toneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.toneList = action.payload
    },
    newsMultiMediaListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.newsMultiMediaList = action.payload
    },
    informationTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.informationTypeList = action.payload
    },
    publishingPeriodListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publishingPeriodList = action.payload
    },
    mediaValueListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaValueList = [
        { id: '', name: '선택' },
        ...action.payload.map(e => {
          return { id: e.code, name: e.name }
        }),
      ]
      state.mediaValueFilterList = action.payload.map(e => {
        return { id: e.code, name: e.name }
      })
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
    mediaSubTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      console.log('action.payload', action.payload)
      state.mediaSubTypeList = action.payload
    },
    parentCodeAction: (state, action: PayloadAction<string>) => {
      state.parentCode = action.payload
    },
    editPageOpenAction: (
      state,
      action: PayloadAction<{ editPageOpen: boolean; monitoringSearchOptionParams: monitoringParamsProps }>
    ) => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = action.payload.editPageOpen
      console.log('monitoringSearchOptionParams', action.payload.monitoringSearchOptionParams)
      state.monitoringSearchOptionParams = action.payload.monitoringSearchOptionParams
    },
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
    },
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    mediaValuePointListAction: (state, action: PayloadAction<ValuePointListProps[]>) => {
      state.mediaValuePointList = action.payload
    },
    setMediaTypePopupData: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringSearchOptionParams = action.payload
      if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tone.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.tag.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.url !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.and !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.not !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.or !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
      }
    },
    resetFilterMonitoringDataAction: (
      state,
      action: PayloadAction<{
        list: monitoringListDto[]
      }>
    ) => {
      state.monitoringList = action.payload.list
      state.originMonitoringList = action.payload.list
    },
    setFilterMonitoringDataAction: (
      state,
      action: PayloadAction<{
        list: monitoringListDto[]
        params: monitoringParamsProps
        apiParams: ESearchNewsCondDto
        dataParam: null | NewsSrchDto
        isAuth: boolean
        tempOwnerKey: number
        tempIsFilter: boolean
        monitoring_id: number
        months: SelectListOptionItem
      }>
    ) => {
      state.monitoringDate = action.payload.months
      state.monitoringCategoryData = action.payload.dataParam
      state.monitoringCategoryAuth = action.payload.isAuth
      state.monitoringListParams = action.payload.apiParams
      state.monitoringParams = action.payload.params
      state.monitoringList = action.payload.list
      state.originMonitoringList = action.payload.list
      state.isOwner = action.payload.tempOwnerKey > 0
      if (action.payload.monitoring_id > 0) {
        state.monitoringIdParams = action.payload.monitoring_id
      } else {
        state.monitoringIdParams = 0
      }
      state.isFilterSubParam = action.payload.tempIsFilter
    },
    setChangeMonitoringAction: (
      state,
      action: PayloadAction<{
        params: monitoringParamsProps
        apiParams: ESearchNewsCondDto
        isAuth: boolean
        monitoring_id: number
        categoryData: NewsSrchDto
        months: SelectListOptionItem
      }>
    ) => {
      state.searchActivate = false
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      state.searchContentKeyList = []
      state.isSelectedAllNewsId = false
      state.isTagButton = false
      state.monitoringDateCode = ''
      state.monitoringCategoryData = action.payload.categoryData
      state.monitoringCategoryAuth = action.payload.isAuth
      state.monitoringListParams = action.payload.apiParams
      state.monitoringParams = action.payload.params
      state.monitoringIdParams = action.payload.monitoring_id
      state.monitoringDate = action.payload.months
    },
    setNewsInitDataAction: (
      state,
      action: PayloadAction<{
        news_id: number
        filterSubParam: NavigationLinkItem[]
        newsIdParams: MonitoringSearchNewsDocumentDto | null
        pageCount: pageCountProps
        newsList: MonitoringSearchNewsDocumentDto[]
        filterSubActions: filterSubParamActionsProps[]
        tempSearchKeywordOption: string
      }>
    ) => {
      if (action.payload.tempSearchKeywordOption !== '') {
        state.monitoringListParamKeyword = action.payload.tempSearchKeywordOption
        state.monitoringCategoryButton = true
      } else {
        state.monitoringListParamKeyword = ''
        state.monitoringCategoryButton = false
      }
      state.filterSubParamActions = action.payload.filterSubActions
      state.filterSubParam = action.payload.filterSubParam
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.searchLimitAlarm = false
      state.newsIdKey = action.payload.news_id
      state.newsIdParams = action.payload.newsIdParams
    },
    mediaSubTotalTypeListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.mediaSubTotalTypeList = action.payload
    },
    deletePopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.deletePopup = action.payload
    },
    monitoringNewsCheckDuplicateParamAction: (state, action: PayloadAction<string[] | null>) => {
      state.newsCheckDuplicateParam = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
    },
    initMonitoringSearchAction: state => {
      state.isTagButton = false
      state.isSelectedAllNewsId = false
      state.searchContentListButton = false
      state.monitoringListLoading = true
      state.searchContentKeyList = []
      state.isOwner = false
      state.monitoringDateCode = ''
      state.monitoringDate = { id: '', name: '' }
      state.monitoringCategoryData = null
      state.monitoringCategoryAuth = false
      state.monitoringCategoryKeyword = ''
      state.monitoringCategoryButton = false
      state.monitoringIdParams = 0
      state.monitoringListParamKeyword = ''
      state.monitoringListParams = {
        timezone: '',
        periodStartYear: moment().subtract({ days: 7 }).format('YYYY'),
        periodStartMonth: moment().subtract({ days: 7 }).format('MM'),
        periodStartDay: moment().subtract({ days: 7 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size: 20,
        sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
        groupId: 0,
      }
      state.monitoringParams = {
        and: '',
        or: '',
        not: '',
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
      state.monitoringSearchOptionParams = {
        and: '',
        or: '',
        not: '',
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
      state.monitoringParamsExpandButton = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.newsLoading = true
      state.newsList = []
      state.newsIdKey = 0
      state.newsIdParams = null
      state.keyDateList = []
      state.monitoringList = []
      state.originMonitoringList = []
      state.monitoringCategoryList = []
      state.newsMonitoringPeriodList = []
      state.toneList = []
      state.newsMultiMediaList = []
      state.parentCode = 'MONITORING_CATEGORY'
      state.newsCheckDuplicateParam = null

      state.searchActivate = false
      state.searchDropBoxActivate = false
      state.periodList = []
      state.mediaTypeList = []
      state.mediaValueList = []
      state.mediaValueFilterList = []
      state.publishingPeriodList = []
      state.informationTypeList = []
      state.mediaSubTypeList = []
      state.mediaSubTotalTypeList = []
      state.coverageList = []
      state.clipbookList = []
      state.mediaValuePointList = []
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopupList = []
      state.editPageOpen = false

      state.monitoringAnalysisPopup = {
        isOpen: false,
        title: '',
        idKey: 0,
        isLoading: false,
        dailyNewsCountList: [],
        toneCountList: [],
        newsCountListByUpperMedia: [],
        mediaTypeList: [],
        tagList: [],
        file: null,
      }
      state.isNoticePopup = {
        isOpen: false,
        newsCountListByUpperMedia: {
          max: 0,
          categories: [],
          data: [],
        },
        dailyNewsCountListChart: {
          max: 0,
          categories: [],
          data: [],
        },
        tonePieChart: {
          labels: [],
          series: [],
        },
        mediaTypePieChart: {
          labels: [],
          series: [],
        },
      }
      state.isFilterSubParam = false
      state.filterSubParamActions = subNewsFilterOptionsList
      state.filterSubParam = []

      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
      state.reportPopup = {
        isOpen: false,
        step: 'name',
        originNewsList: [],
        newsStepActive: false,
        activityOpen: false,
        keyword: '',
        keywordList: [],
        files: [],
        nameStep: {
          name: '',
          nameErr: '',
        },
        newsStep: {
          newsArrayList: { id: '', name: '선택' },
          isNewsGrouping: false,
          newsGroupType: { id: '', name: '선택' },
          newsList: [],
          groupingNewsList: [],
          draggingId: null,
        },
        releaseStep: {
          tabStatus: 'email',
          isWord: false,
          isEmail: true,
          isPdf: false,
          isWordDownload: false,
          isPdfDownload: false,
          title: '',
          titleErr: '',
          addEmail: '',
          receiverList: [],
          targetEmail: [],
          contents: '',
          receiverErr: '',
          targetEmailErr: '',
          userList: [],
        },
      }
      state.deletePopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.fileDownloadPopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.isLimitFilter = 0
      state.reportCancelPopup = false
      state.searchLimitAlarm = false
    },
  },
})

export const {
  userPopupAction,
  contentDeletePopupAction,
  deletePopupAction,
  monitoringNewsCheckDuplicateParamAction,
  mediaSubTotalTypeListAction,
  setNewsListAction,
  setNewsInitDataAction,
  monitoringDateAction,
  isOwnerAction,
  monitoringListAction,
  monitoringCategoryKeywordAction,
  keyDateListAction,
  monitoringCategoryListAction,
  newsMonitoringPeriodListAction,
  originMonitoringListAction,
  monitoringParamsAction,
  setOnChangeMonitoringListAction,
  monitoringCategoryButtonAction,
  pageCountAction,
  monitoringListParamsAction,
  monitoringListParamKeywordAction,
  monitoringParamsExpandButtonAction,
  toneListAction,
  searchContentKeyListAction,
  isSelectedAllNewsIdAction,
  newsIdParamsAction,
  mediaTypePopupAction,
  setMediaTypePopupData,
  informationTypeListAction,
  publishingPeriodListAction,
  mediaValueListAction,
  periodListAction,
  coverageListAction,
  mediaTypeListAction,
  clipbookListAction,
  mediaTypePopupListAction,
  mediaValuePointListAction,
  parentCodeAction,
  editPageOpenAction,
  resetMonitoringParamsAction,
  newsLoadingAction,
  afterClipbookAddNewsParamAction,
  afterClipbookAddNewsListAction,
  setOnChangeMonitoringSearchOptionAction,
  monitoringAnalysisPopupAction,
  initMonitoringAnalysisPopupAction,
  isNoticePopupAction,
  tagPopupAction,
  doneTagAction,
  initTagPopupAction,
  initReportPopupAction,
  reportPopupAction,
  mediaSubTypeListAction,
  isFilterSubParamAction,
  filterSubParamActionsAction,
  setOnChangeMonitoringSearchFilterOptionAction,
  isLimitFilterAction,
  initMonitoringSearchAction,
  userListAction,
  reportPopupActivityOpenAction,
  monitoringListLoadingAction,
  countLoadingAction,
  setFilterMonitoringDataAction,
  resetFilterMonitoringDataAction,
  isMonitoringFilterOptionAction,
  fileDownloadPopupAction,
  setCheckReportPopupAction,
  setChangeMonitoringAction,
  searchLimitAlarmAction,
  monitoringSearchOptionParamsAction,
  setDoenReportPopupAction,
  setSearchContentKeyListAction,
  newsMultiMediaListAction,
} = monitoringSearchSlice.actions
export default monitoringSearchSlice.reducer
