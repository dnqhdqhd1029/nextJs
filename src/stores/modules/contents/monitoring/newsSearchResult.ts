import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { subNewsFilterOptionsList } from '~/components/contents/monitoring/SearchResult/defaultData'
import { clipbookContentListProps, clipbookContentProps } from '~/stores/modules/contents/monitoring/clipbook'
import { reportPopupNameStepProps, ValuePointListProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { deletePopupProps } from '~/stores/modules/contents/monitoring/newsDetail'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import {
  type ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  type NewsSrchDto,
  ResponseNewsSrchCategoryDto,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MediaNameCountType, MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface monitoringListDto extends ResponseNewsSrchCategoryDto {
  categoryNm: string
}

export type userPopupProps = {
  isOpen: boolean
  email: string
  displayName: string
  phone: string
  mobile: string
  role: string
  keyValue: number
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export interface tagPopupProps {
  isOpen: boolean
  tagList: MbTagSearchTagItem[]
}

export interface additionalParamProps {
  and: string
  or: string
  not: string
  period: SelectListOptionItem
  startPeriod: Date
  endPeriod: Date
  periodTag: MbTagSearchTagItem[]
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

export interface monitoringParamsProps {
  and: string
  or: string
  not: string

  period: SelectListOptionItem
  startPeriod: Date
  endPeriod: Date
  periodTag: MbTagSearchTagItem[]
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
}

export type clipbookIdListProps = {
  id: number
  type: string
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
  monitoringActivate: boolean
  monitoringDate: SelectListOptionItem
  monitoringCategoryKeyword: string
  monitoringListParamKeyword: string
  monitoringCategoryButton: boolean
  keyDateList: []
  monitoringParams: monitoringParamsProps
  monitoringCategoryList: SelectListOptionItem[]
  parentCode: string
  monitoringListParams: ESearchNewsCondDto
  pageCount: pageCountProps
  newsLoading: boolean
  countLoading: boolean
  newsIdKey: number
  newsList: MonitoringSearchNewsDocumentDto[]
  monitoringParamsExpandButton: boolean
  toneList: SelectListOptionItem[]
  newsMultiMediaList: SelectListOptionItem[]
  searchContentListButton: boolean
  searchContentKeyList: MonitoringSearchNewsDocumentDto[]
  isSelectedAllNewsId: boolean
  isTagButton: boolean
  newsIdParams: MonitoringSearchNewsDocumentDto | null
  monitringAnalysis: ElasticSearchReturnDtoNewsDocumentDto | null
  periodList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  mediaValueFilterList: SelectListOptionItem[]
  publishingPeriodList: SelectListOptionItem[]
  informationTypeList: SelectListOptionItem[]
  coverageList: SelectListOptionItem[]
  mediaValuePointList: ValuePointListProps[]
  clipbookList: SelectListOptionItem[]
  mediaSubTypeList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  mediaSubTotalTypeList: mediaSubTypeListProps[]
  mediaTypePopupList: CommonCode[]
  mediaTypePopup: mediaTypePopupProps
  filterSubParam: NavigationLinkItem[]
  filterSubParamActions: filterSubParamActionsProps[]
  newsCheckDuplicateParam: string[] | null
  monitoringAnalysisPopup: monitoringAnalysisPopupProps
  isNoticePopup: boolean

  tagPopup: tagPopupProps
  reportPopup: reportPopupProps
  userPopup: userPopupProps
  deletePopup: deletePopupProps
  fileDownloadPopup: deletePopupProps
  isLimitFilter: number

  monthsOriginSearchOption: string
  reportCancelPopup: boolean
  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  monthsOriginSearchOption: '',
  isTagButton: false,
  monitoringActivate: false,
  isSelectedAllNewsId: false,
  searchContentListButton: false,
  searchContentKeyList: [],
  isOwner: false,
  monitoringDate: { id: '1M', name: '한달' },
  monitoringCategoryKeyword: '',
  monitoringCategoryButton: false,
  monitoringListParamKeyword: '',
  monitoringListParams: {
    timezone: '',
    periodStartYear: moment().subtract({ month: 1 }).format('YYYY'),
    periodStartMonth: moment().subtract({ month: 1 }).format('MM'),
    periodStartDay: moment().subtract({ month: 1 }).format('DD'),
    periodEndYear: moment().format('YYYY'),
    periodEndMonth: moment().format('MM'),
    periodEndDay: moment().format('DD'),
    page: 1,
    size: 20,
    sort: ['_score!desc'],
    groupId: 0,
  },
  monitoringParams: {
    period: { id: '', name: '선택' },
    startPeriod: new Date(),
    endPeriod: new Date(),
    periodTag: [],
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
  newsCheckDuplicateParam: null,
  monitoringParamsExpandButton: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  newsLoading: false,
  countLoading: false,
  newsList: [],
  newsIdKey: 0,
  newsIdParams: null,
  keyDateList: [],
  monitoringCategoryList: [],
  toneList: [],
  newsMultiMediaList: [],
  parentCode: 'MONITORING_CATEGORY',
  monitringAnalysis: null,

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

  monitoringAnalysisPopup: {
    isOpen: false,
    title: '',
    idKey: 0,
    isLoading: false,
    dailyNewsCountList: [],
    toneCountList: [],
    newsCountListByUpperMedia: [],
    mediaTypeList: [],
  },
  isNoticePopup: false,
  filterSubParamActions: subNewsFilterOptionsList,
  filterSubParam: [],

  tagPopup: {
    isOpen: false,
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
  fileDownloadPopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  isLimitFilter: 0,
  reportCancelPopup: false,
  searchLimitAlarm: false,
}

const newsSearchResultSlice = createSlice({
  name: 'newsSearchResultSlice',
  initialState,
  reducers: {
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
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    setCheckReportPopupAction: (state, action: PayloadAction<boolean>) => {
      state.reportCancelPopup = action.payload
    },
    setSearchContentKeyListAction: (state, action: PayloadAction<MonitoringSearchNewsDocumentDto[]>) => {
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
    reportPopupAction: (state, action: PayloadAction<reportPopupProps>) => {
      state.reportPopup = action.payload
    },
    reportPopupActivityOpenAction: (state, action: PayloadAction<boolean>) => {
      state.reportPopup.activityOpen = action.payload
    },
    userListAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.reportPopup.releaseStep.userList = action.payload
      state.reportPopup.keywordList = action.payload
    },
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    filterSubParamActionsAction: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterSubParamActions = action.payload
    },
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },
    newsMultiMediaListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.newsMultiMediaList = action.payload
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
    isNoticePopupAction: (state, action: PayloadAction<boolean>) => {
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
    countLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.countLoading = action.payload
    },
    isOwnerAction: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
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
    resetMonitoringParamsAction: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.monitoringParams = action.payload
      if (action.payload.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
    },
    monitoringParamsAction: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.monitoringParams = action.payload
      if (action.payload.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
    },
    monitoringDateAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.monitoringDate = action.payload
    },
    setOnChangeMonitoringListAction: (
      state,
      action: PayloadAction<{
        id: number
        props: monitoringParamsProps
        dto: ESearchNewsCondDto
        categoryData: NewsSrchDto
        date: SelectListOptionItem
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        monitringAnalysis: ElasticSearchReturnDtoNewsDocumentDto | null
        filterSubParam: NavigationLinkItem[]
      }>
    ) => {
      state.searchContentKeyList = []
      state.searchLimitAlarm = false
      state.isSelectedAllNewsId = false
      state.isTagButton = false
      state.filterSubParam = action.payload.filterSubParam
      state.filterSubParamActions = subNewsFilterOptionsList
      state.monitringAnalysis = action.payload.monitringAnalysis
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.dto
      state.monitoringParams = action.payload.props
      state.monitoringDate = action.payload.date
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
      if (action.payload.props.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
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
    setOnChangeMonitoringSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: monitoringParamsProps
        dto: ESearchNewsCondDto
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        tempFilterSub: NavigationLinkItem[]
        isResetSelectedNews: boolean
        type: string
      }>
    ) => {
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      if (action.payload.tempFilterSub.length > 0) {
        state.filterSubParam = action.payload.tempFilterSub
      }
      if (action.payload.type === 'dto') {
        state.filterSubParamActions = subNewsFilterOptionsList
      }
      state.searchLimitAlarm = false
      state.pageCount = action.payload.pageCount
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.dto
      state.monitoringParams = action.payload.props
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
      if (action.payload.props.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
    },
    setOnChangeMonitoringSearchFilterOptionAction: (
      state,
      action: PayloadAction<{
        props: monitoringParamsProps
        dto: ESearchNewsCondDto
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        tempFilterSubParam: filterSubParamActionsProps[]
      }>
    ) => {
      state.searchContentKeyList = []
      state.filterSubParamActions = action.payload.tempFilterSubParam
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.dto
      state.monitoringParams = action.payload.props
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
      if (action.payload.props.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.props.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.props.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
    },
    setNewsListAction: (
      state,
      action: PayloadAction<{
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        newsIdParams: MonitoringSearchNewsDocumentDto | null
        newsIdKey: number
        monitringAnalysis: ElasticSearchReturnDtoNewsDocumentDto | null
      }>
    ) => {
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.newsIdParams = action.payload.newsIdParams
      state.newsIdKey = action.payload.newsIdKey
      state.monitringAnalysis = action.payload.monitringAnalysis
    },
    newsIdParamsAction: (state, action: PayloadAction<MonitoringSearchNewsDocumentDto>) => {
      state.newsIdParams = action.payload
      state.newsIdKey = action.payload.newsid || 0
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
    periodListAction: (state, action: PayloadAction<{ list: CommonCode[]; ex: string }>) => {
      let temp = { id: '', name: '' }
      if (action.payload.list.length > 0) {
        if (action.payload.ex !== '') {
          const find = action.payload.list.find(e => e.code === action.payload.ex)
          temp = find ? { id: find.code, name: find.name } : { id: '', name: '' }
        } else {
          const find = action.payload.list.find(e => e.code === '1M')
          temp = find ? { id: find.code, name: find.name } : { id: '', name: '' }
        }
      }
      state.periodList = action.payload.list.map(e => {
        return { id: e.code, name: e.name }
      })
      state.monitoringDate = temp
    },
    toneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.toneList = action.payload
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
      state.mediaSubTypeList = action.payload
    },
    mediaSubTotalTypeListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.mediaSubTotalTypeList = action.payload
    },
    parentCodeAction: (state, action: PayloadAction<string>) => {
      state.parentCode = action.payload
    },
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
    },
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    setMediaTypePopupData: (state, action: PayloadAction<monitoringParamsProps>) => {
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.monitoringParams = action.payload
      if (action.payload.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
    },
    setNewsInitDataAction: (
      state,
      action: PayloadAction<{
        params: monitoringParamsProps
        apiParams: ESearchNewsCondDto
        news_id: number
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        newsIdParams: MonitoringSearchNewsDocumentDto | null
        filterSubParam: NavigationLinkItem[]
        filterSubActions: filterSubParamActionsProps[]
        months: string
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
      state.monthsOriginSearchOption = action.payload.months
      state.filterSubParamActions = action.payload.filterSubActions
      state.filterSubParam = action.payload.filterSubParam
      state.monitoringListParams = action.payload.apiParams
      state.monitoringParams = action.payload.params
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.newsIdKey = action.payload.news_id
      state.newsIdParams = action.payload.newsIdParams
      if (action.payload.params.mediaType.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.mediaTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.journalistTagList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.tone.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.existMultimedia.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.tag.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.publishingPeriod.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.mediaBookList.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.clipbookValue.length > 0) {
        state.monitoringActivate = true
      } else if (action.payload.params.url !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.mediaValue.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.clipbook.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.coverage.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.informationType.id !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.and !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.not !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.or !== '') {
        state.monitoringActivate = true
      } else if (action.payload.params.periodTag.length > 0) {
        state.monitoringActivate = false
      } else {
        state.monitoringActivate = false
      }
      state.newsLoading = false
    },
    mediaValuePointListAction: (state, action: PayloadAction<ValuePointListProps[]>) => {
      state.mediaValuePointList = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    newsCheckDuplicateParamAction: (state, action: PayloadAction<string[] | null>) => {
      state.newsCheckDuplicateParam = action.payload
    },
    deletePopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.deletePopup = action.payload
    },
    fileDownloadPopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.fileDownloadPopup = action.payload
    },
    initNewsSearchResultAction: state => {
      state.monthsOriginSearchOption = ''
      state.isTagButton = false
      state.isSelectedAllNewsId = false
      state.searchContentListButton = false
      state.searchContentKeyList = []
      state.isOwner = false
      state.monitoringDate = { id: '1M', name: '한달' }
      state.monitoringCategoryKeyword = ''
      state.monitoringCategoryButton = false
      state.monitoringListParamKeyword = ''
      state.monitoringListParams = {
        timezone: '',
        periodStartYear: moment().subtract({ month: 1 }).format('YYYY'),
        periodStartMonth: moment().subtract({ month: 1 }).format('MM'),
        periodStartDay: moment().subtract({ month: 1 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size: 20,
        sort: ['_score!desc'],
        groupId: 0,
      }
      state.monitoringParams = {
        period: { id: '', name: '선택' },
        startPeriod: new Date(),
        endPeriod: new Date(),
        periodTag: [],
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
      state.newsCheckDuplicateParam = null
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
      state.monitoringCategoryList = []
      state.toneList = []
      state.newsMultiMediaList = []
      state.parentCode = 'MONITORING_CATEGORY'
      state.monitringAnalysis = null

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

      state.monitoringAnalysisPopup = {
        isOpen: false,
        title: '',
        idKey: 0,
        isLoading: false,
        dailyNewsCountList: [],
        toneCountList: [],
        newsCountListByUpperMedia: [],
        mediaTypeList: [],
      }
      state.isNoticePopup = false
      state.filterSubParamActions = subNewsFilterOptionsList
      state.filterSubParam = []

      state.tagPopup = {
        isOpen: false,
        tagList: [],
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
  setNewsListAction,
  setNewsInitDataAction,
  monitoringDateAction,
  isOwnerAction,
  monitoringCategoryKeywordAction,
  keyDateListAction,
  monitoringCategoryListAction,
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
  fileDownloadPopupAction,
  informationTypeListAction,
  publishingPeriodListAction,
  mediaValueListAction,
  periodListAction,
  coverageListAction,
  mediaTypeListAction,
  clipbookListAction,
  mediaTypePopupListAction,
  parentCodeAction,
  resetMonitoringParamsAction,
  newsLoadingAction,
  countLoadingAction,
  setOnChangeMonitoringSearchOptionAction,
  afterClipbookAddNewsListAction,
  afterClipbookAddNewsParamAction,
  monitoringAnalysisPopupAction,
  initMonitoringAnalysisPopupAction,
  isNoticePopupAction,
  tagPopupAction,
  doneTagAction,
  initTagPopupAction,
  initReportPopupAction,
  reportPopupAction,
  mediaSubTypeListAction,
  filterSubParamActionsAction,
  setOnChangeMonitoringSearchFilterOptionAction,
  isLimitFilterAction,
  initNewsSearchResultAction,
  userPopupAction,
  newsCheckDuplicateParamAction,
  deletePopupAction,
  reportPopupActivityOpenAction,
  userListAction,
  mediaValuePointListAction,
  mediaSubTotalTypeListAction,
  setCheckReportPopupAction,
  setDoenReportPopupAction,
  searchLimitAlarmAction,
  setSearchContentKeyListAction,
  newsMultiMediaListAction,
} = newsSearchResultSlice.actions
export default newsSearchResultSlice.reducer
