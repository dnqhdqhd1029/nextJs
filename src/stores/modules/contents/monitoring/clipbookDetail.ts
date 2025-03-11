import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { subNewsFilterOptionsList } from '~/components/contents/monitoring/Clipbook/Result/defaultData'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import {
  reportPopupProps,
  SortedNewsItem,
  ValuePointListProps,
} from '~/stores/modules/contents/monitoring/monitoringSearch'
import { deletePopupProps } from '~/stores/modules/contents/monitoring/newsDetail'
import { userPopupProps } from '~/stores/modules/contents/monitoring/newsSearchResult'
import {
  isPressFilterSubParamAction,
  setOnChangePressSearchOptionAction,
} from '~/stores/modules/contents/pressMedia/listResult'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { contentDeletePopupProps } from '~/stores/modules/contents/pressMedia/savedSearch'
import { type ElasticSearchReturnDtoNewsDocumentDto, ESearchNewsCondDto } from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MediaNameCountType, MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

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

export interface isNoticePopupProps {
  isOpen: boolean
  newsCountListByUpperMedia: ChartLineProps
  dailyNewsCountListChart: ChartLineProps
  tonePieChart: ChartProps
  mediaTypePieChart: ChartProps
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

export interface tagPopupProps {
  isOpen: boolean
  tagList: MbTagSearchTagItem[]
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
}

export interface clipbookNewsListDto {
  id: string
  categoryNm: string
  content: clipbookContentListProps[]
}

export type Props = {
  toneList: SelectListOptionItem[]
  newsMultiMediaList: SelectListOptionItem[]
  periodList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  mediaValueFilterList: SelectListOptionItem[]
  informationTypeList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  mediaSubTypeList: SelectListOptionItem[]
  mediaValuePointList: ValuePointListProps[]
  mediaSubTotalTypeList: mediaSubTypeListProps[]
  newsLoading: boolean
  isOwner: boolean
  arrayclipbookAuth: boolean
  clipbookListLoading: boolean

  filterSubParamActions: filterSubParamActionsProps[]
  filterSubParam: NavigationLinkItem[]
  monitoringListParams: ESearchNewsCondDto
  pageCount: pageCountProps
  newsList: MonitoringSearchNewsDocumentDto[]
  newsIdKey: number
  newsIdParams: MonitoringSearchNewsDocumentDto | null
  newsCheckDuplicateParam: string[] | null

  clipbookCategory: clipbookNewsListDto[]
  clipbookIdKey: number
  clipbookDataCatgory: clipbookContentListProps | null

  isFilterSubParam: boolean
  newsKeyword: string
  isTagButton: boolean
  isSelectedAllNewsId: boolean
  searchContentKeyList: MonitoringSearchNewsDocumentDto[]
  monitoringCategoryButton: boolean

  monitoringAnalysisPopup: monitoringAnalysisPopupProps
  tagPopup: tagPopupProps
  isLimitFilter: number
  isNoticePopup: isNoticePopupProps
  reportPopup: reportPopupProps
  deletePopup: deletePopupProps
  contentDeletePopup: contentDeletePopupProps
  userPopup: userPopupProps
  fileDownloadPopup: deletePopupProps
  reportCancelPopup: boolean
  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  toneList: [],
  newsMultiMediaList: [],
  periodList: [],
  mediaValueList: [],
  mediaValueFilterList: [],
  informationTypeList: [],
  mediaTypeList: [],
  mediaSubTypeList: [],
  mediaValuePointList: [],
  mediaSubTotalTypeList: [],
  clipbookListLoading: false,
  newsLoading: false,
  isOwner: false,

  filterSubParamActions: [],
  filterSubParam: [],
  monitoringListParams: {
    timezone: '',
    periodStartYear: moment().subtract({ years: 100 }).format('YYYY'),
    periodStartMonth: moment().subtract({ years: 100 }).format('MM'),
    periodStartDay: moment().subtract({ years: 100 }).format('DD'),
    periodEndYear: moment().format('YYYY'),
    periodEndMonth: moment().format('MM'),
    periodEndDay: moment().format('DD'),
    page: 1,
    size: 20,
    sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
    groupId: 0,
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  newsList: [],
  newsIdKey: 0,
  newsIdParams: null,
  newsCheckDuplicateParam: null,

  clipbookCategory: [],
  clipbookIdKey: 0,
  clipbookDataCatgory: null,
  arrayclipbookAuth: false,

  newsKeyword: '',
  isFilterSubParam: false,
  isTagButton: false,
  isSelectedAllNewsId: false,
  searchContentKeyList: [],
  monitoringCategoryButton: false,

  isLimitFilter: 0,

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
  contentDeletePopup: {
    isOpen: false,
    title: '',
    key: 0,
    type: '',
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
  fileDownloadPopup: {
    isOpen: false,
    title: '',
    key: 0,
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
  reportCancelPopup: false,
  searchLimitAlarm: false,
}

const monitoringClipbookDetailSlice = createSlice({
  name: 'monitoringClipbookDetailSlice',
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
    setDoneReportPopupAction: state => {
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
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    reportPopupAction: (state, action: PayloadAction<reportPopupProps>) => {
      console.log('reportPopupAction', action.payload)
      state.reportPopup = action.payload
    },
    clipbookListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.clipbookListLoading = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
    },
    reportPopupActivityOpenAction: (state, action: PayloadAction<boolean>) => {
      console.log('reportPopupAction', action.payload)
      state.reportPopup.activityOpen = action.payload
    },
    userListAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      state.reportPopup.releaseStep.userList = action.payload
      state.reportPopup.keywordList = action.payload
    },
    mediaValuePointListAction: (state, action: PayloadAction<ValuePointListProps[]>) => {
      state.mediaValuePointList = action.payload
    },
    monitoringCategoryButtonAction: (state, action: PayloadAction<boolean>) => {
      state.monitoringCategoryButton = action.payload
    },
    newsKeywordAction: (state, action: PayloadAction<string>) => {
      state.newsKeyword = action.payload
    },
    toneListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      console.log('toneListAction', action.payload)
      state.toneList = action.payload
    },
    informationTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.informationTypeList = action.payload
    },
    mediaTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaTypeList = action.payload
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    afterClipbookAddNewsListAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[]
        newsParam: MonitoringSearchNewsDocumentDto
        apiDto?: ESearchNewsCondDto
        tempPageCount?: pageCountProps
        filterSub?: NavigationLinkItem[]
        filterSubActions?: filterSubParamActionsProps[]
        isReset?: boolean
      }>
    ) => {
      state.searchContentKeyList = []
      state.newsList = action.payload.list
      state.newsIdParams = action.payload.newsParam
      state.newsIdKey = action.payload.newsParam?.newsid || 0
      if (
        action.payload.isReset &&
        action.payload.apiDto &&
        action.payload.filterSubActions &&
        action.payload.filterSub &&
        action.payload.tempPageCount
      ) {
        state.monitoringListParams = action.payload.apiDto
        state.filterSubParamActions = action.payload.filterSubActions
        state.filterSubParam = action.payload.filterSub
        state.pageCount = action.payload.tempPageCount
      }
    },
    afterClipbookAddNewsParamAction: (
      state,
      action: PayloadAction<{ list: MonitoringSearchNewsDocumentDto[]; newsParam: MonitoringSearchNewsDocumentDto }>
    ) => {
      state.newsList = action.payload.list
      state.newsIdParams = action.payload.newsParam
    },
    filterSubParamActionsAction: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterSubParamActions = action.payload
    },
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    setOnChangeClipbookListAction: (
      state,
      action: PayloadAction<{
        apiParams: ESearchNewsCondDto
        //filterSubParam: NavigationLinkItem[]
        categoryData: clipbookContentListProps
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        clipbook_id: number
      }>
    ) => {
      state.searchContentKeyList = []
      state.isSelectedAllNewsId = false
      state.isTagButton = false
      state.clipbookIdKey = action.payload.clipbook_id
      state.clipbookDataCatgory = action.payload.categoryData
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.apiParams
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
    },
    setOnChangeNewsFilterAction: (
      state,
      action: PayloadAction<{
        apiParams: ESearchNewsCondDto
        categoryData: clipbookContentListProps
        newsList: MonitoringSearchNewsDocumentDto[]
        pageCount: pageCountProps
        clipbook_id: number
        filterSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.searchContentKeyList = []
      state.isSelectedAllNewsId = false
      state.isTagButton = false
      state.clipbookIdKey = action.payload.clipbook_id
      state.filterSubParamActions = action.payload.filterSubParamActions
      state.clipbookDataCatgory = action.payload.categoryData
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.monitoringListParams = action.payload.apiParams
      state.newsIdParams =
        action.payload.newsList.length > 0 ? (action.payload.newsList[0] ? action.payload.newsList[0] : null) : null
      state.newsIdKey =
        action.payload.newsList.length > 0
          ? action.payload.newsList[0].newsid
            ? action.payload.newsList[0].newsid
            : 0
          : 0
    },
    newsIdParamsAction: (state, action: PayloadAction<MonitoringSearchNewsDocumentDto>) => {
      state.newsIdParams = action.payload
      state.newsIdKey = action.payload.newsid || 0
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
    mediaSubTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      console.log('mediaSubTypeList', action.payload)
      state.mediaSubTypeList = action.payload
    },

    initMonitoringAnalysisPopupAction: state => {
      state.monitoringAnalysisPopup = initialState.monitoringAnalysisPopup
    },
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
    },
    mediaSubTotalTypeListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.mediaSubTotalTypeList = action.payload
    },
    newsMultiMediaListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.newsMultiMediaList = action.payload
    },
    monitoringAnalysisPopupAction: (state, action: PayloadAction<monitoringAnalysisPopupProps>) => {
      state.monitoringAnalysisPopup = action.payload
    },
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },

    isFilterSubParamAction: (state, action: PayloadAction<boolean>) => {
      state.isFilterSubParam = action.payload
    },
    initTagPopupAction: state => {
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },
    doneTagAction: state => {
      state.searchContentKeyList = []
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },
    isNoticePopupAction: (state, action: PayloadAction<isNoticePopupProps>) => {
      state.isNoticePopup = action.payload
    },
    setFilterClipbookDataAction: (
      state,
      action: PayloadAction<{
        apiDto: ESearchNewsCondDto
        tempClipbookNewsList: clipbookNewsListDto[]
        clipbook_id: number
        tempArrayClipbookAuth: boolean
        tempClipbookDataCatgory: clipbookContentListProps | null
        tempIsFilter: boolean
        tempOwnerKey: number
      }>
    ) => {
      state.arrayclipbookAuth = action.payload.tempArrayClipbookAuth
      state.isFilterSubParam = action.payload.tempIsFilter
      state.isOwner = action.payload.tempOwnerKey > 0
      state.monitoringListParams = action.payload.apiDto
      state.clipbookCategory = action.payload.tempClipbookNewsList
      state.clipbookDataCatgory = action.payload.tempClipbookDataCatgory
      if (action.payload.clipbook_id > 0) {
        state.clipbookIdKey = action.payload.clipbook_id
      } else {
        state.clipbookIdKey = 0
      }
    },
    setResetFilterClipbookDataAction: (state, action: PayloadAction<clipbookNewsListDto[]>) => {
      state.clipbookCategory = action.payload
    },
    setNewsInitDataAction: (
      state,
      action: PayloadAction<{
        news_id: number
        filterSubParam: NavigationLinkItem[]
        newsIdParams: MonitoringSearchNewsDocumentDto | null
        pageCount: pageCountProps
        filterSubParamActions: filterSubParamActionsProps[]
        newsList: MonitoringSearchNewsDocumentDto[]
        tempSearchKeywordOption: string
      }>
    ) => {
      if (action.payload.tempSearchKeywordOption !== '') {
        state.newsKeyword = action.payload.tempSearchKeywordOption
        state.monitoringCategoryButton = true
      } else {
        state.newsKeyword = ''
        state.monitoringCategoryButton = false
      }
      state.filterSubParamActions = action.payload.filterSubParamActions
      state.newsIdKey = action.payload.news_id
      state.searchLimitAlarm = false
      state.newsList = action.payload.newsList
      state.filterSubParam = action.payload.filterSubParam
      state.newsIdParams = action.payload.newsIdParams
      state.pageCount = action.payload.pageCount
    },
    isClipbookFilterSubParamAction: (
      state,
      action: PayloadAction<{
        apiParams: ESearchNewsCondDto
        tempPageCount: pageCountProps
        tempNewsList: MonitoringSearchNewsDocumentDto[]
        filterSub: NavigationLinkItem[]
        filterSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      console.log(
        'isClipbookFilterSubParamAction:::::::: action.payload.filterSubParamActions ',
        action.payload.filterSubParamActions
      )
      console.log('isClipbookFilterSubParamAction:::::::: action.payload.filterSub ', action.payload.filterSub)
      state.searchContentKeyList = []
      state.isFilterSubParam = false
      state.monitoringListParams = action.payload.apiParams
      state.searchLimitAlarm = false
      state.newsList = action.payload.tempNewsList
      state.pageCount = action.payload.tempPageCount
      state.filterSubParamActions = action.payload.filterSubParamActions
      state.filterSubParam = action.payload.filterSub
      state.newsIdParams =
        action.payload.tempNewsList.length > 0
          ? action.payload.tempNewsList[0]
            ? action.payload.tempNewsList[0]
            : null
          : null
      state.newsIdKey =
        action.payload.tempNewsList.length > 0
          ? action.payload.tempNewsList[0].newsid
            ? action.payload.tempNewsList[0].newsid
            : 0
          : 0
    },
    setOnChangeSearchOptionAction: (
      state,
      action: PayloadAction<{
        apiParams: ESearchNewsCondDto
        filterSub: filterSubParamActionsProps[]
        tempPageCount: pageCountProps
        tempNewsList: MonitoringSearchNewsDocumentDto[]
        tempNewsIdParams: MonitoringSearchNewsDocumentDto | null
        news_id: number
      }>
    ) => {
      state.searchContentKeyList = []
      state.monitoringListParams = action.payload.apiParams
      state.searchLimitAlarm = false
      state.newsList = action.payload.tempNewsList
      state.newsIdParams = action.payload.tempNewsIdParams
      state.newsIdKey = action.payload.news_id
      state.pageCount = action.payload.tempPageCount
      state.filterSubParamActions = action.payload.filterSub
    },
    setOnChangeMonitoringSearchOptionAction: (
      state,
      action: PayloadAction<{
        apiParams: ESearchNewsCondDto
        tempNewsList: MonitoringSearchNewsDocumentDto[]
        tempPageCount: pageCountProps
        news_id: number
        tempNewsIdParams: MonitoringSearchNewsDocumentDto | null
        isResetSelectedNews: boolean
      }>
    ) => {
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      state.monitoringListParams = action.payload.apiParams
      state.searchLimitAlarm = false
      state.newsList = action.payload.tempNewsList
      state.newsIdParams = action.payload.tempNewsIdParams
      state.newsIdKey = action.payload.news_id
      state.pageCount = action.payload.tempPageCount
    },
    setChangeClipbookTargetIdAction: (
      state,
      action: PayloadAction<{
        arrayClipbookAuth: boolean
        apiParams: ESearchNewsCondDto
        clipbook_id: number
      }>
    ) => {
      state.monitoringListParams = action.payload.apiParams
      state.clipbookIdKey = action.payload.clipbook_id
      state.arrayclipbookAuth = action.payload.arrayClipbookAuth
    },
    setOnChangeOptionIdAction: (
      state,
      action: PayloadAction<{
        tempNewsList: MonitoringSearchNewsDocumentDto[]
        tempNewsIdParams: MonitoringSearchNewsDocumentDto | null
        news_id: number
        tempClipbookData: clipbookContentListProps | null
        tempPageCount: pageCountProps
        filterSub: NavigationLinkItem[]
        filterSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      console.log('action.payload.filterSubParamActions', action.payload.filterSubParamActions)
      console.log('action.payload.filterSub', action.payload.filterSub)
      state.searchContentKeyList = []
      state.pageCount = action.payload.tempPageCount
      state.searchLimitAlarm = false
      state.newsList = action.payload.tempNewsList
      state.filterSubParamActions = action.payload.filterSubParamActions
      state.filterSubParam = action.payload.filterSub
      state.newsIdParams = action.payload.tempNewsIdParams
      state.newsIdKey = action.payload.news_id
      state.clipbookDataCatgory = action.payload.tempClipbookData
    },
    deletePopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.deletePopup = action.payload
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
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    setCheckReportPopupAction: (state, action: PayloadAction<boolean>) => {
      state.reportCancelPopup = action.payload
    },
    fileDownloadPopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.fileDownloadPopup = action.payload
    },
    clipbookNewsCheckDuplicateParamAction: (state, action: PayloadAction<string[] | null>) => {
      state.newsCheckDuplicateParam = action.payload
    },
    initClipbookDetailAction: state => {
      state.toneList = []
      state.newsMultiMediaList = []
      state.informationTypeList = []
      state.mediaTypeList = []
      state.mediaSubTypeList = []
      state.mediaValuePointList = []
      state.mediaSubTotalTypeList = []
      state.periodList = []
      state.mediaValueList = []
      state.mediaValueFilterList = []
      state.clipbookListLoading = true
      state.newsLoading = true
      state.isOwner = false

      state.filterSubParamActions = []
      state.filterSubParam = []
      state.monitoringListParams = {
        timezone: '',
        periodStartYear: moment().subtract({ years: 100 }).format('YYYY'),
        periodStartMonth: moment().subtract({ years: 100 }).format('MM'),
        periodStartDay: moment().subtract({ years: 100 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size: 20,
        sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
        groupId: 0,
      }
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.newsList = []
      state.newsIdKey = 0
      state.newsIdParams = null
      state.newsCheckDuplicateParam = null

      state.clipbookCategory = []
      state.clipbookIdKey = 0
      state.clipbookDataCatgory = null
      state.arrayclipbookAuth = false

      state.newsKeyword = ''
      state.isFilterSubParam = false
      state.isTagButton = false
      state.isSelectedAllNewsId = false
      state.searchContentKeyList = []
      state.monitoringCategoryButton = false

      state.isLimitFilter = 0

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
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
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
      state.fileDownloadPopup = {
        isOpen: false,
        title: '',
        key: 0,
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
      state.reportCancelPopup = false
      state.searchLimitAlarm = false
    },
  },
})

export const {
  deletePopupAction,
  clipbookNewsCheckDuplicateParamAction,
  newsIdParamsAction,
  searchContentKeyListAction,
  newsLoadingAction,
  afterClipbookAddNewsParamAction,
  afterClipbookAddNewsListAction,
  setNewsInitDataAction,
  toneListAction,
  periodListAction,
  mediaValueListAction,
  informationTypeListAction,
  mediaTypeListAction,
  isFilterSubParamAction,
  monitoringAnalysisPopupAction,
  monitoringCategoryButtonAction,
  mediaSubTypeListAction,
  isSelectedAllNewsIdAction,
  tagPopupAction,
  initTagPopupAction,
  doneTagAction,
  newsKeywordAction,
  filterSubParamActionsAction,
  isLimitFilterAction,
  initClipbookDetailAction,
  isNoticePopupAction,
  initMonitoringAnalysisPopupAction,
  setOnChangeSearchOptionAction,
  isClipbookFilterSubParamAction,
  setOnChangeOptionIdAction,
  setChangeClipbookTargetIdAction,
  setOnChangeMonitoringSearchOptionAction,
  reportPopupAction,
  initReportPopupAction,
  setDoneReportPopupAction,
  userPopupAction,
  reportPopupActivityOpenAction,
  contentDeletePopupAction,
  userListAction,
  mediaValuePointListAction,
  mediaSubTotalTypeListAction,
  clipbookListLoadingAction,
  fileDownloadPopupAction,
  setFilterClipbookDataAction,
  setResetFilterClipbookDataAction,
  setCheckReportPopupAction,
  searchLimitAlarmAction,
  newsMultiMediaListAction,
} = monitoringClipbookDetailSlice.actions

export default monitoringClipbookDetailSlice.reducer
