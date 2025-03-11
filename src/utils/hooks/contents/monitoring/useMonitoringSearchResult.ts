import { ChangeEvent, useCallback } from 'react'
import { saveAs } from 'file-saver'
import { asBlob } from 'html-docx-js-typescript'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { bool } from 'prop-types'

import {
  ClipbookAddContext,
  ClipbookAutoRegisterContext,
} from '~/components/contents/common/forms/ClipbookListPopup/ClipbookAutoRegisterContext'
import {
  defaultReportGroupingStringLastLine,
  defaultReportGroupingStringThirdLine,
  defaultReportStringFirstLine,
  defaultReportStringSecondLine,
  defaultReportStringThirdLine,
} from '~/components/contents/monitoring/MonitoringList/defaultData'
import {
  columnOptions,
  columnSeries,
  defaultMonitoringListParams,
  defaultMonitoringParams,
  extendedCommonCodeTargetList,
  lineOptions,
  lineSeries,
  newsAutoGroupingOptionList,
  pieOptionsCommon,
  subNewsFilterListList,
  subNewsFilterOptionsList,
} from '~/components/contents/monitoring/SearchResult/defaultData'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import { newsDuplicationIdListSaga, userAutoSaveDataProps } from '~/stores/modules/contents/extraData/extra'
import { userClipbookListAutoSaveDataAction } from '~/stores/modules/contents/extraData/extra'
import {
  clipbookDataListProps,
  initClipbookPopupAction,
  initStateClipbookListPopup,
} from '~/stores/modules/contents/monitoring/clipbookListPopup'
import { openMonitoringPopupAction } from '~/stores/modules/contents/monitoring/monitoringPopup'
import {
  groupingNewsListProps,
  SortedNewsItem,
  ValuePointListProps,
} from '~/stores/modules/contents/monitoring/monitoringSearch'
import {
  afterClipbookAddNewsListAction,
  afterClipbookAddNewsParamAction,
  clipbookListAction,
  countLoadingAction,
  coverageListAction,
  deletePopupAction,
  doneTagAction,
  fileDownloadPopupAction,
  filterSubParamActionsAction,
  filterSubParamActionsProps,
  informationTypeListAction,
  initMonitoringAnalysisPopupAction,
  initNewsSearchResultAction,
  initReportPopupAction,
  initTagPopupAction,
  isLimitFilterAction,
  isNoticePopupAction,
  isSelectedAllNewsIdAction,
  mediaSubTotalTypeListAction,
  mediaSubTypeListAction,
  mediaTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaTypePopupProps,
  mediaValueListAction,
  mediaValuePointListAction,
  monitoringAnalysisPopupAction,
  monitoringAnalysisPopupProps,
  monitoringCategoryButtonAction,
  monitoringCategoryKeywordAction,
  monitoringCategoryListAction,
  monitoringListParamKeywordAction,
  monitoringParamsAction,
  monitoringParamsExpandButtonAction,
  monitoringParamsProps,
  newsCheckDuplicateParamAction,
  newsIdParamsAction,
  newsLoadingAction,
  newsMultiMediaListAction,
  periodListAction,
  publishingPeriodListAction,
  reportPopupAction,
  reportPopupActivityOpenAction,
  reportPopupProps,
  resetMonitoringParamsAction,
  searchContentKeyListAction,
  searchLimitAlarmAction,
  setCheckReportPopupAction,
  setDoenReportPopupAction,
  setMediaTypePopupData,
  setNewsInitDataAction,
  setOnChangeMonitoringSearchFilterOptionAction,
  setOnChangeMonitoringSearchOptionAction,
  setSearchContentKeyListAction,
  tagPopupAction,
  toneListAction,
  userPopupAction,
} from '~/stores/modules/contents/monitoring/newsSearchResult'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  type AddDelNewsAndPrDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  type ESearchNewsOwner,
  type NewsSrchDto,
  ResponseTaggingDto,
  TagDto,
  type UserDto,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { MediaNameCountType } from '~/types/contents/Monitoring'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { usePostUpdateClipbookToNewsPr } from '~/utils/api/clipbook/usePostUpdateClipbookToNewsPr'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { apiGetOneGroup } from '~/utils/api/group/useGetOneGroup'
import { apiGetMediaValuePoints } from '~/utils/api/media/useGetMediaValuePoints'
import { usePostMediaSearch } from '~/utils/api/media/usePostMediaSearch'
import {
  useMonitoringReportAction,
  useMonitoringReportMailType,
  useMonitoringReportPDFAction,
} from '~/utils/api/monitoring/useMonitoringReport'
import { useGetNewsExcel } from '~/utils/api/monitoring/useNewsExcel'
import { useDeleteCustomNews } from '~/utils/api/news/useDeleteCustomNews'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { TaggingProps, usePostTaggingAdd } from '~/utils/api/tagging/usePostTaggingAdd'
import { usePostTaggingExcept } from '~/utils/api/tagging/usePostTaggingExcept'
import { usePostTaggingReset } from '~/utils/api/tagging/usePostTaggingReset'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { getCurrencyFormat } from '~/utils/common/number'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useUserSort } from '~/utils/hooks/contents/admin/useUserSort'

export const useMonitoringSearchResult = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getSortedUserArray } = useUserSort()
  const {
    isOwner,
    monitoringDate,
    monitoringCategoryKeyword,
    keyDateList,
    monitoringCategoryList,
    monitoringListParams,
    monitoringParams,
    pageCount,
    monitoringCategoryButton,
    monitoringListParamKeyword,
    newsIdKey,
    newsList,
    monitoringParamsExpandButton,
    toneList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    searchContentKeyList,
    newsIdParams,
    mediaValueList,
    informationTypeList,
    coverageList,
    clipbookList,
    mediaTypeList,
    periodList,
    monthsOriginSearchOption,
    mediaSubTotalTypeList,
    mediaTypePopup,
    mediaTypePopupList,
    newsLoading,
    isNoticePopup,
    monitoringAnalysisPopup,
    monitringAnalysis,
    reportPopup,
    tagPopup,
    mediaSubTypeList,
    filterSubParamActions,
    filterSubParam,
    isLimitFilter,
    userPopup,
    newsCheckDuplicateParam,
    deletePopup,
    fileDownloadPopup,
    mediaValuePointList,
    reportCancelPopup,
    monitoringActivate,
    searchLimitAlarm,
    newsMultiMediaList,
    mediaValueFilterList,
  } = useAppSelector(state => state.newsSearchResultSlice)
  const { newsDuplicationIdList, userClipbookListAutoSaveData } = useAppSelector(state => state.extraSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)

  const userNewsDelete = useDeleteCustomNews()
  const getNewsSearchResult = usePostNewsSearch()
  const getMediaSearchResult = usePostMediaSearch()
  const newsToClipbookAction = usePostUpdateClipbookToNewsPr()
  const actionTaggingAdd = usePostTaggingAdd()
  const actionTaggingReset = usePostTaggingReset()
  const actionTaggingAddExcept = usePostTaggingExcept()
  const newsExcel = useGetNewsExcel()
  const monitoringReportSend = useMonitoringReportAction()
  const monitoringReportReportPDF = useMonitoringReportPDFAction()

  const setMonitoringReportPopupStepOnChange = useCallback(
    async (e: string, props: reportPopupProps) => {
      let tempUserList = [...props.keywordList]
      if (e === 'release') {
        tempUserList = await getOneGroup()
      }
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          userList: tempUserList,
        },
        keywordList: tempUserList,
        step: e,
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.step]
  )

  const setMonitoringReportPopupTitleOnChange = useCallback(
    (e: string, props: reportPopupProps) => {
      const param = {
        ...props,
        newsStepActive: e !== '',
        nameStep: {
          name: e,
          nameErr: '',
        },
        releaseStep: {
          ...props.releaseStep,
          title: `보고서 - ${e} 분석`,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.nameStep.name, reportPopup.nameStep.nameErr, reportPopup.newsStepActive, reportPopup.releaseStep.title]
  )

  const setInitMonitoringReportPopup = useCallback(
    async (
      e: boolean,
      props: MonitoringSearchNewsDocumentDto[],
      valueList: ValuePointListProps[],
      toneArray: SelectListOptionItem[],
      titleNm: string
    ) => {
      if (props && props.length > 0) {
        let temp: SortedNewsItem[] = []
        let rankList = valueList.filter(a => Number(a.value) > 0)
        rankList = rankList.sort((a, b) => Number(b.value) - Number(a.value))
        for await (const item of props) {
          if (item) {
            const find = toneArray.find(e => e.id === item.tone)
            const findRank = rankList.find(e => {
              const userValue = item.mediaValueNew ? Number(item?.mediaValueNew) : 0
              if (userValue >= Number(e.value)) {
                return e.key
              }
            })
            temp = [
              ...temp,
              {
                id: item.newsid ?? -1,
                title: item.title ?? '',
                linkUrl: item.link ?? '',
                date: item.inserted ?? '',
                mediaName: item.mapped?.mname ?? '',
                mediaId: Number(item.mapped?.mid),
                mediaValueRank: findRank ? findRank.key : '100',
                authorList: item.mapped,
                authors: item?.mapped?.jname ? item?.mapped?.jname[0] : '',
                mediaValue: Number(item?.mediaValueNew) ?? 500,
                tone: find ? find.name : '',
                subtype: item?.media_subtype || '',
              },
            ]
          }
        }
        // @ts-ignore
        const propsList = temp.sort((a, b) => {
          if (b && a) {
            return (
              new Date(moment(b.date).format('YYYY-MM-DD HH:mm:ss')).getTime() -
              new Date(moment(b.date).format('YYYY-MM-DD HH:mm:ss')).getTime()
            )
          }
        })
        dispatch(initReportPopupAction({ isOpen: e, originNewsList: propsList, titleNm: titleNm }))
      }
    },
    [reportPopup]
  )

  const setInitTagPopupAction = useCallback(() => dispatch(initTagPopupAction()), [tagPopup])

  const openMonitoringAnalysisPopup = useCallback(
    async (e: boolean, i: string, key: number) => {
      dispatch(
        monitoringAnalysisPopupAction({
          isOpen: e,
          title: i,
          idKey: key,
          isLoading: true,
          dailyNewsCountList: [],
          toneCountList: [],
          newsCountListByUpperMedia: [],
          mediaTypeList: [],
        })
      )
    },
    [monitoringAnalysisPopup]
  )

  const setIsNoticePopupPopup = useCallback(
    (e: boolean) => {
      dispatch(isNoticePopupAction(e))
    },
    [isNoticePopup]
  )

  const setNoticeClose = useCallback(
    (id: number) => {
      dispatch(newsDuplicationIdListSaga([...newsDuplicationIdList, id]))
    },
    [newsCheckDuplicateParam]
  )

  const setMonitoringReportPopupIsDragging = useCallback(
    async (e: number | null, props: reportPopupProps) => {
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          draggingId: e,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.newsStep.draggingId]
  )

  const setMonitoringReportPopupDragOver = useCallback(
    async (items: SortedNewsItem[], props: reportPopupProps) => {
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          draggingId: null,
          newsList: items,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.newsStep.draggingId, reportPopup.newsStep.newsList]
  )

  const setMonitoringReportPopupDeleteNewsArrayList = useCallback(
    async (e: number, props: reportPopupProps) => {
      if (props.newsStep.newsList.length > 1) {
        const param = {
          ...props,
          originNewsList: props.originNewsList.filter(item => item.id !== e),
          newsStep: {
            ...props.newsStep,
            newsList: props.newsStep.newsList.filter(item => item.id !== e),
            draggingId: null,
          },
        }
        dispatch(reportPopupAction(param))
      } else {
        openToast('보고서는 1개 이상의 뉴스가 있어야 합니다.', 'warning')
      }
    },
    [reportPopup.newsStep.newsList]
  )

  const setMonitoringReportPopupDeleteGroupingNews = useCallback(
    async (e: number, originKey: string, props: reportPopupProps) => {
      let reList: groupingNewsListProps[] = []
      let originNewsList = [...props.originNewsList]
      let originList = [...props.newsStep.groupingNewsList]
      const findIndex = originList.findIndex(e => e.id === originKey)
      if (!isNaN(findIndex)) {
        const changedList = originList[findIndex].data.filter(item => item.id !== e)
        for (const sortedNewsItem of props.newsStep.groupingNewsList) {
          if (sortedNewsItem.id === originKey) {
            if (changedList.length > 0) {
              reList = [
                ...reList,
                {
                  ...sortedNewsItem,
                  data: changedList,
                },
              ]
            }
          } else {
            reList = [...reList, sortedNewsItem]
          }
        }
        originNewsList = originNewsList.filter(item => item.id !== e)
        const param = {
          ...props,
          originNewsList: originNewsList,
          newsStep: {
            ...props.newsStep,
            groupingNewsList: reList,
            draggingId: null,
          },
        }
        if (reList.length < 1) {
          openToast('보고서는 1개 이상의 뉴스가 있어야 합니다.', 'warning')
        } else {
          dispatch(reportPopupAction(param))
        }
      }
    },
    [reportPopup.newsStep.newsList]
  )

  const setMonitoringReportPopupGroupDragOver = useCallback(
    async (items: SortedNewsItem[], originKey: groupingNewsListProps, props: reportPopupProps) => {
      let originList = [...props.newsStep.groupingNewsList]
      originList = props.newsStep.groupingNewsList.map(e => {
        if (e.id === originKey.id) {
          return {
            ...e,
            data: items,
          }
        }
        return e
      })
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          draggingId: null,
          groupingNewsList: originList,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.newsStep.draggingId, reportPopup.newsStep.groupingNewsList]
  )

  const setMonitoringReportPopupResetTagListOnChange = useCallback(
    async (props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          receiverList: [],
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.receiverList]
  )

  const setMonitoringReportPopupTagListOnChange = useCallback(
    async (item: MbTagSearchTagItem, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          receiverList: _.cloneDeep(props.releaseStep.receiverList).filter(tag => tag.id !== item.id),
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.receiverList]
  )

  const setMonitoringReportPopupResetAddEmail = useCallback(
    async (item: string, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          addEmail: item,
          targetEmailErr: '',
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.addEmail]
  )

  const setMonitoringReportPopupTargetEmailCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          targetEmail: _.cloneDeep(props.releaseStep.targetEmail).filter(tag => tag.id !== item.id),
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.targetEmail]
  )

  const setMonitoringReportPopupResetTargetEmailCloseOnChange = useCallback(
    async (props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          targetEmail: [],
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.targetEmail]
  )

  const setMonitoringReportPopupSharedPopupContentAction = useCallback(
    async (e: string, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          contents: e,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.contents]
  )

  const setMonitoringReportReleaseTabAction = useCallback(
    async (e: string, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          tabStatus: e,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.tabStatus]
  )

  const setMonitoringReportReleaseFormAction = useCallback(
    async (i: boolean, e: string, props: reportPopupProps) => {
      let param = { ...props }
      console.log('isPdf', props.releaseStep.isPdf)
      console.log('isWord', props.releaseStep.isWord)
      if (e === 'isEmail') {
        param = {
          ...props,
          releaseStep: {
            ...props.releaseStep,
            isEmail: i,
          },
        }
      } else if (e === 'isWord') {
        param = {
          ...props,
          releaseStep: {
            ...props.releaseStep,
            isWord: i,
          },
        }
        console.log('isWord', param.releaseStep)
      } else if (e === 'isPdf') {
        param = {
          ...props,
          releaseStep: {
            ...props.releaseStep,
            isPdf: i,
          },
        }
        console.log('isPdf', param.releaseStep)
      } else if (e === 'isPdfDownload') {
        param = {
          ...props,
          releaseStep: {
            ...props.releaseStep,
            isPdfDownload: i,
          },
        }
      } else if (e === 'isWordDownload') {
        param = {
          ...props,
          releaseStep: {
            ...props.releaseStep,
            isWordDownload: i,
          },
        }
      }
      if (!param.releaseStep.isWord && !param.releaseStep.isPdf && !param.releaseStep.isEmail) {
        openToast('3개중 1가지 양식 선택은 필수입니다.', 'warning')
      } else {
        console.log('param.releaseStep', param.releaseStep)
        dispatch(reportPopupAction(param))
      }
    },
    [
      reportPopup.releaseStep.isEmail,
      reportPopup.releaseStep.isWord,
      reportPopup.releaseStep.isPdf,
      reportPopup.releaseStep.isPdfDownload,
      reportPopup.releaseStep.isWordDownload,
    ]
  )

  const setMonitoringReportPopupTitle = useCallback(
    async (item: string, props: reportPopupProps) => {
      const param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          title: item,
          titleErr: '',
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.title]
  )

  const setMonitoringReportPopupActivityOpenOpen = useCallback(
    async (e: boolean) => {
      dispatch(reportPopupActivityOpenAction(e))
    },
    [reportPopup.activityOpen]
  )

  const setMonitoringReportPopupKeywordsOnChange = useCallback(
    async (e: string, props: reportPopupProps) => {
      if (props.releaseStep.userList) {
        let res: NavigationLinkItem[] = []
        for await (const eElement of props.releaseStep.userList) {
          if (eElement.id && eElement.title) {
            if (eElement.title.toLowerCase().search(e.toLowerCase()) !== -1) {
              res = [...res, eElement]
            }
          }
        }
        const param = {
          ...props,
          keyword: e,
          keywordList: res.length > 0 ? res : props.releaseStep.userList,
        }
        dispatch(reportPopupAction(param))
      }
    },
    [reportPopup.keyword, reportPopup.keywordList]
  )

  const setMonitoringReportPopupKeywordsDelete = useCallback(
    async (props: reportPopupProps) => {
      const param = {
        ...props,
        keyword: 'e',
        keywordList: props.releaseStep.userList || [],
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.keyword, reportPopup.keywordList]
  )

  const setMonitoringReportReleaseKeywordsSearchDataAction = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: reportPopupProps, key: NavigationLinkItem) => {
      let dataList = [...hook.releaseStep.receiverList]
      dataList = e.target.checked
        ? [...dataList, { id: key.id, label: key?.title || '', realLabel: key?.pathLink }]
        : dataList.filter(i => i.id !== key.id)
      const param = {
        ...hook,
        releaseStep: {
          ...hook.releaseStep,
          receiverList: dataList,
        },
      }
      console.log('param', param)
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.receiverList]
  )

  const setMonitoringReportPopupTargetEmailpAction = useCallback(
    async (props: reportPopupProps) => {
      let targetEmailErr = props.releaseStep.targetEmailErr
      let targetEmail = [...props.releaseStep.targetEmail]
      let addEmail = props.releaseStep.addEmail

      if (EMAIL_PATTERN.test(props.releaseStep.addEmail)) {
        if (props.releaseStep.receiverList.length > 0) {
          const find = props.releaseStep.receiverList.find(e => e.realLabel === props.releaseStep.addEmail)
          if (find) {
            targetEmailErr = '이미 추가한 메일입니다.'
          } else {
            targetEmail = [
              ...props.releaseStep.targetEmail,
              { id: props.releaseStep.addEmail, label: props.releaseStep.addEmail },
            ]
            addEmail = ''
          }
        } else {
          targetEmail = [
            ...props.releaseStep.targetEmail,
            { id: props.releaseStep.addEmail, label: props.releaseStep.addEmail },
          ]
          addEmail = ''
        }
      } else {
        targetEmailErr = EMAIL_PATTERN_DESCRIPTION
      }
      let param = {
        ...props,
        releaseStep: {
          ...props.releaseStep,
          targetEmailErr,
          addEmail,
          targetEmail,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.releaseStep.targetEmailErr, reportPopup.releaseStep.addEmail, reportPopup.releaseStep.targetEmail]
  )

  const setMonitoringReportPopupGroupIndexChange = useCallback(
    (currentIndex: number, newIndex: number, props: reportPopupProps) => {
      let originList = [...props.newsStep.groupingNewsList]
      if (originList[currentIndex] === undefined || originList[newIndex] === undefined) {
        return
      }
      const newGroupedItems = originList.map((item, index) => {
        if (index === currentIndex) {
          return originList[newIndex]
        }
        if (index === newIndex) {
          return originList[currentIndex]
        }
        return item
      })
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          groupingNewsList: newGroupedItems,
          draggingId: null,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup]
  )

  const setMonitoringReportPopupNewsArrayList = useCallback(
    async (e: SelectListOptionItem, props: reportPopupProps) => {
      let param = { ...props }
      if (props.newsStep.isNewsGrouping) {
        let temp: groupingNewsListProps[] = []
        for (const eElement of props.newsStep.groupingNewsList) {
          const arangeList = await execSortAllItems(eElement.data, e)
          temp = [
            ...temp,
            {
              id: eElement.id,
              name: eElement.name,
              data: arangeList,
            },
          ]
        }
        param = {
          ...props,
          newsStep: {
            ...props.newsStep,
            newsArrayList: e,
            groupingNewsList: temp,
            draggingId: null,
          },
        }
      } else {
        const arangeList = await execSortAllItems(props.newsStep.newsList, e)
        param = {
          ...props,
          newsStep: {
            ...props.newsStep,
            newsArrayList: e,
            newsList: arangeList,
            draggingId: null,
          },
        }
      }

      dispatch(reportPopupAction(param))
    },
    [reportPopup.newsStep.newsArrayList]
  )

  const setMonitoringReportPopupNewsGrouping = useCallback(
    (e: boolean, props: reportPopupProps, mediaTypeArray: SelectListOptionItem[]) => {
      let temp: groupingNewsListProps[] = []
      if (e && props && props.originNewsList.length > 0) {
        for (const re of mediaTypeArray) {
          // @ts-ignore
          if (re?.data && re?.data.length > 0) {
            // @ts-ignore
            for (const paramElement of re?.data) {
              const filtered = props.originNewsList.filter(i => {
                return i.subtype === paramElement.code
              })
              if (filtered.length > 0) {
                temp = [
                  ...temp,
                  {
                    id: paramElement.code,
                    name: paramElement.name,
                    data: filtered,
                  },
                ]
              }
            }
          }
        }
      }
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          newsGroupType: newsAutoGroupingOptionList[0],
          isNewsGrouping: e,
          groupingNewsList: temp,
          newsList: props.originNewsList,
          draggingId: null,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [
      reportPopup.newsStep.isNewsGrouping,
      reportPopup.newsStep.newsGroupType,
      reportPopup.newsStep.groupingNewsList,
      reportPopup.newsStep.newsList,
    ]
  )

  const setMonitoringReportPopupNewsGroupType = useCallback(
    (
      e: SelectListOptionItem,
      props: reportPopupProps,
      valueList: ValuePointListProps[],
      toneArray: SelectListOptionItem[],
      mediaTypeArray: SelectListOptionItem[]
    ) => {
      let temp: groupingNewsListProps[] = []
      if (e.id === 'tone') {
        for (const paramElement of toneArray) {
          const filtered = props.originNewsList.filter(i => {
            return i.tone === paramElement.name
          })
          if (filtered.length > 0) {
            temp = [
              ...temp,
              {
                id: paramElement.id,
                name: paramElement.name,
                data: filtered,
              },
            ]
          }
        }
      } else if (e.id === 'mediaType') {
        for (const re of mediaTypeArray) {
          // @ts-ignore
          if (re?.data && re?.data.length > 0) {
            // @ts-ignore
            for (const paramElement of re?.data) {
              const filtered = props.originNewsList.filter(i => {
                return i.subtype === paramElement.code
              })
              if (filtered.length > 0) {
                temp = [
                  ...temp,
                  {
                    id: paramElement.code,
                    name: paramElement.name,
                    data: filtered,
                  },
                ]
              }
            }
          }
        }
      } else if (e.id === 'mediaValue') {
        for (const paramElement of valueList) {
          const filtered = props.originNewsList.filter(i => {
            return i.mediaValueRank.toString() === paramElement.key.toString()
          })
          if (filtered.length > 0) {
            temp = [
              ...temp,
              {
                id: paramElement.key,
                name:
                  paramElement.key.toString() === '100'
                    ? '기타'
                    : '매체 지수 ' +
                      (Number(paramElement.key) - 9).toString() +
                      '~' +
                      paramElement.key.toString() +
                      '%',
                data: filtered,
              },
            ]
          }
        }
        temp = temp.sort((a, b) => Number(a.id) - Number(b.id))
      }
      const param = {
        ...props,
        newsStep: {
          ...props.newsStep,
          newsGroupType: e,
          groupingNewsList: temp,
          draggingId: null,
        },
      }
      dispatch(reportPopupAction(param))
    },
    [reportPopup.newsStep.newsGroupType, reportPopup.newsStep.groupingNewsList]
  )

  const setCloseMonitoringReportPopup = useCallback(
    async (e: boolean, props: MonitoringSearchNewsDocumentDto[]) => {
      dispatch(initReportPopupAction({ isOpen: e, originNewsList: [], titleNm: '' }))
      dispatch(setCheckReportPopupAction(false))
    },
    [reportPopup, reportCancelPopup]
  )

  const setCheckReportPopup = useCallback(
    (e: boolean, props: reportPopupProps) => {
      if (e) {
        if (props.nameStep.name !== '') {
          dispatch(setCheckReportPopupAction(true))
        } else {
          dispatch(initReportPopupAction({ isOpen: false, originNewsList: [], titleNm: '' }))
          dispatch(setCheckReportPopupAction(false))
        }
      } else {
        dispatch(setCheckReportPopupAction(false))
      }
    },
    [reportCancelPopup]
  )

  const setSelectedDeleteData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        deletePopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [deletePopup]
  )

  const tagEdit = useCallback(
    async (origin: MonitoringSearchNewsDocumentDto[]) => {
      let resList: any[] = []
      let res: MbTagSearchTagItem[] = []
      if (origin && origin.length > 0) {
        for await (const reOrigin of origin) {
          if (reOrigin.taggingList && reOrigin.taggingList.length > 0) {
            resList = resList.concat(reOrigin.taggingList)
          }
        }
        if (resList.length > 0) {
          for await (const tagging of resList) {
            if (tagging.tagId && Number(tagging.tagId) > 0 && tagging.tagName && tagging.tagName !== '') {
              const find = res.find(e => e.id === tagging.tagId?.toString())
              if (!find) {
                res = [
                  ...res,
                  {
                    id: tagging.tagId?.toString(),
                    label: tagging?.tagName,
                  },
                ]
              }
            }
          }
        }
        if (res.length > 0) {
          res = res.sort((a, b) => a.label.localeCompare(b.label))
        }
        dispatch(
          tagPopupAction({
            isOpen: true,
            tagList: res,
          })
        )
      }
    },
    [tagPopup.isOpen]
  )

  const setMediaTypePopupSelectedItem = useCallback(
    async (i: boolean, e: CommonCode, props: mediaTypePopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.code?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.code.toString())
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setSelectedExcelFileData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        fileDownloadPopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [fileDownloadPopup]
  )

  const setUserProfilePopupAction = useCallback(
    () =>
      dispatch(
        userPopupAction({
          isOpen: false,
          email: '',
          keyValue: 0,
          displayName: '',
          phone: '',
          mobile: '',
          role: '',
        })
      ),
    [userPopup]
  )

  const setOpenFilterSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(filterSubParamActionsAction(e))
    },
    [filterSubParamActions]
  )

  const initMonitoringAnalysisPopup = useCallback(() => {
    dispatch(initMonitoringAnalysisPopupAction())
  }, [monitoringAnalysisPopup])

  const setMonitoringCategoryButtonAction = useCallback(
    (e: boolean) => {
      dispatch(monitoringCategoryButtonAction(e))
    },
    [monitoringCategoryButton]
  )

  const setResetSearchOption = useCallback(
    (e: null | NewsSrchDto) => {
      let params: monitoringParamsProps = defaultMonitoringParams
      if (e !== null && e.conditions) {
        let conditions = getObjectFromBase64(e.conditions)
        if (conditions && conditions !== '') {
          params = {
            period: conditions.period,
            startPeriod: conditions.startPeriod,
            endPeriod: conditions.endPeriod,
            periodTag: conditions.periodTag,
            and: conditions.and,
            or: conditions.or,
            not: conditions.not,
            mediaType: conditions.mediaType,
            mediaValue: conditions.mediaValue,
            mediaTagList: conditions.mediaTagList,
            journalistTagList: conditions.journalistTagList,
            tone: conditions.tone,
            existMultimedia: conditions?.existMultimedia || [],
            tag: conditions.tag,
            url: conditions.url,
            publishingPeriod: conditions.publishingPeriod,
            mediaBookList: conditions.mediaBookList,
            clipbook: conditions.clipbook,
            clipbookValue: conditions.clipbookValue,
            coverage: conditions.coverage,
            informationType: conditions.informationType,
          }
        }
      }
      dispatch(resetMonitoringParamsAction(params))
    },
    [monitoringParams]
  )

  const setNewsIdParamsAction = useCallback(
    async (e: MonitoringSearchNewsDocumentDto, param: monitoringParamsProps, dto: ESearchNewsCondDto) => {
      const filter = setObjectToBase64({ ...param, ...dto, news_id: Number(e.newsid) })
      console.log('{ ...param, news_id: Number(e.newsid) }', { ...param, news_id: Number(e.newsid) })
      dispatch(newsIdParamsAction(e))
      await router.replace(`/news/search-result?filter=${filter}`, undefined, { shallow: true })
      if (!e.isSysInfo && e.link && e.link !== '' && e.owner?.uid && e.owner?.uid === userInfo.userId) {
        await checkDuplicateNews(e)
      } else {
        dispatch(newsCheckDuplicateParamAction(null))
      }
    },
    [newsIdParams, newsIdKey]
  )

  const setMediaTypePopupSelectedValue = useCallback(
    async (e: string, props: mediaTypePopupProps) => {
      if (e && e !== '') {
        await getParentCommonCodeId(Number(e))
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaTypePopup.selectedValue]
  )

  const setDeleteSelectedTypeMediaTypePopup = useCallback(
    async (props: mediaTypePopupProps) => {
      let params = {
        ...props,
        selectedType: [],
      }
      dispatch(mediaTypePopupAction(params))
    },
    [mediaTypePopup.selectedType]
  )

  const setMediaTypePopupDeleteTotalSelect = useCallback(
    async (commonList: CommonCode[], props: mediaTypePopupProps) => {
      let resultList: MbTagSearchTagItem[] = []
      let selectedIdParams = props.selectedType.map(e => e.label)
      let getIdParams = commonList.map(e => e.name)
      let difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      if (difference.length > 0) {
        for await (const commonEle of difference) {
          const find = props.selectedType.find(k => k.label?.toString() === commonEle?.toString())
          if (find) {
            resultList = [...resultList, find]
          }
        }
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: resultList,
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setSelectedTypeMediaTypePopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaTypePopupProps) => {
      let params = {
        ...props,
        selectedType: props.selectedType.filter(item => item.id !== e.id),
      }
      dispatch(mediaTypePopupAction(params))
    },
    [mediaTypePopup.selectedType]
  )

  const mediaTypePopupAdjust = useCallback(
    async (e: MbTagSearchTagItem[], props: monitoringParamsProps) => {
      dispatch(
        setMediaTypePopupData({
          ...props,
          mediaType: e,
        })
      )
    },
    [monitoringParams.mediaType]
  )

  const setTagDeleteControlSearch = useCallback(
    async (props: monitoringParamsProps, type: string, apiParam: ESearchNewsCondDto) => {
      let params = {
        ...props,
      }
      if (type === 'informationType') {
        params.informationType = { id: '', name: '선택' }
      } else if (type === 'coverage') {
        params.coverage = { id: '', name: '선택' }
      } else if (type === 'clipbook') {
        params.clipbook = { id: '', name: '선택' }
      } else if (type === 'url') {
        params.url = ''
      } else if (type === 'mediaValue') {
        params.mediaValue = { id: '', name: '선택' }
      } else if (type === 'not') {
        params.not = ''
      } else if (type === 'or') {
        params.or = ''
      } else if (type === 'and') {
        params.and = ''
      }
      const dto = await changeSearchDto(apiParam, params)
      if (dto.isProcess) {
        const apiDto = {
          ...dto.apiParams,
          filterCategoryList: [],
          filterMediaNameList: [],
          filterValue: '',
          filterSourceType: [],
          filterTone: [],
          filterPeriodStartYear: '',
          filterPeriodStartMonth: '',
          filterPeriodStartDay: '',
          filterPeriodEndYear: '',
          filterPeriodEndMonth: '',
          filterPeriodEndDay: '',
          page: 1,
          sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
        }
        if (params.and !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        } else if (params.or !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        } else if (params.not !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        }
        await getNewsBySearchOption(params, apiDto, 'dto')
      } else {
        openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
      }
    },
    [monitoringParams]
  )

  const setTagControlSearch = useCallback(
    async (e: MbTagSearchTagItem, props: monitoringParamsProps, type: string, apiParam: ESearchNewsCondDto) => {
      let params = {
        ...props,
      }
      if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'journalistTagList') {
        params.journalistTagList = props.journalistTagList.filter(item => item.id !== e.id)
      } else if (type === 'tone') {
        params.tone = props.tone.filter(item => item.id !== e.id)
      } else if (type === 'existMultimedia') {
        params.existMultimedia = props?.existMultimedia ? props?.existMultimedia.filter(item => item.id !== e.id) : []
      } else if (type === 'tag') {
        params.tag = props.tag.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      } else if (type === 'mediaBookList') {
        params.mediaBookList = props.mediaBookList.filter(item => item.id !== e.id)
      } else if (type === 'clipbookValue') {
        params.clipbookValue = props.clipbookValue.filter(item => item.id !== e.id)
      }
      const dto = await changeSearchDto(apiParam, params)
      if (dto.isProcess) {
        const apiDto = {
          ...dto.apiParams,
          filterCategoryList: [],
          filterMediaNameList: [],
          filterValue: '',
          filterSourceType: [],
          filterTone: [],
          filterPeriodStartYear: '',
          filterPeriodStartMonth: '',
          filterPeriodStartDay: '',
          filterPeriodEndYear: '',
          filterPeriodEndMonth: '',
          filterPeriodEndDay: '',
          page: 1,
          sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
        }
        if (params.and !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        } else if (params.or !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        } else if (params.not !== '') {
          apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
        }
        await getNewsBySearchOption(params, apiDto, 'dto')
      } else {
        openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
      }
    },
    [monitoringParams]
  )

  const setAdditionalParamTagStatusOnChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem, props: monitoringParamsProps) => {
      const isChecked = e.target.checked
      let newTags = _.cloneDeep(props.tag)
      if (isChecked) {
        const isExist = newTags.find(tag => tag.id === item.id)
        if (!isExist) {
          newTags.push({
            id: item.id,
            label: item.name,
          })
        }
      } else {
        newTags = newTags.filter(tag => tag.id !== item.id)
      }
      const param = {
        ...props,
        tag: newTags,
      }
      dispatch(monitoringParamsAction(param))
    },
    [monitoringParams.tag]
  )

  const setAdditionalParamTagSuccess = useCallback(
    async (e: TagDto, props: monitoringParamsProps) => {
      let newTags = _.cloneDeep(props.tag)
      const isExist = newTags.find(tag => tag.id === e.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: e.tagId?.toString() ?? '',
          label: e.name ?? '',
        })
      }
      const param = {
        ...props,
        tag: newTags,
      }
      dispatch(monitoringParamsAction(param))
    },
    [monitoringParams.tag]
  )

  const setTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: monitoringParamsProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'journalistTagList') {
        params.journalistTagList = props.journalistTagList.filter(item => item.id !== e.id)
      } else if (type === 'tone') {
        params.tone = props.tone.filter(item => item.id !== e.id)
      } else if (type === 'existMultimedia') {
        params.existMultimedia = props.existMultimedia ? props.existMultimedia.filter(item => item.id !== e.id) : []
      } else if (type === 'tag') {
        params.tag = props.tag.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      } else if (type === 'mediaBookList') {
        params.mediaBookList = props.mediaBookList.filter(item => item.id !== e.id)
      } else if (type === 'clipbookValue') {
        params.clipbookValue = props.clipbookValue.filter(item => item.id !== e.id)
      }

      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams]
  )

  const setTagDeleteControl = useCallback(
    async (props: monitoringParamsProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaType') {
        params.mediaType = []
      } else if (type === 'mediaTagList') {
        params.mediaTagList = []
      } else if (type === 'journalistTagList') {
        params.journalistTagList = []
      } else if (type === 'tone') {
        params.tone = []
      } else if (type === 'existMultimedia') {
        params.existMultimedia = []
      } else if (type === 'tag') {
        params.tag = []
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = []
      } else if (type === 'mediaBookList') {
        params.mediaBookList = []
      } else if (type === 'clipbookValue') {
        params.clipbookValue = []
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams]
  )

  const setAdditionalParamUrl = useCallback(
    async (e: string, props: monitoringParamsProps) => {
      const params = {
        ...props,
        url: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.url]
  )

  const setAdditionalParamMediaValue = useCallback(
    async (e: SelectListOptionItem, props: monitoringParamsProps) => {
      const params = {
        ...props,
        mediaValue: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.mediaValue]
  )

  const setAdditionalParamMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: monitoringParamsProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.mediaTagList]
  )

  const setAdditionalParamJournalistTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: monitoringParamsProps) => {
      const params = {
        ...props,
        journalistTagList: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.journalistTagList]
  )

  const setAdditionalParamMediaBookList = useCallback(
    async (e: MbTagSearchTagItem[], props: monitoringParamsProps) => {
      const params = {
        ...props,
        mediaBookList: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.mediaBookList]
  )

  const setAdditionalParamClipbookList = useCallback(
    async (e: MbTagSearchTagItem[], props: monitoringParamsProps) => {
      const params = {
        ...props,
        clipbookValue: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.clipbookValue]
  )

  const setAdditionalParamClipbook = useCallback(
    async (e: SelectListOptionItem, props: monitoringParamsProps) => {
      const params = {
        ...props,
        clipbook: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.clipbook]
  )

  const setAdditionalParamCoverage = useCallback(
    async (e: SelectListOptionItem, props: monitoringParamsProps) => {
      const params = {
        ...props,
        coverage: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.coverage]
  )

  const setAdditionalParamInformationType = useCallback(
    async (e: SelectListOptionItem, props: monitoringParamsProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.informationType]
  )

  const setkeywordsActionAnd = useCallback(
    async (e: string, props: monitoringParamsProps) => {
      const params = {
        ...props,
        and: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.and]
  )

  const setkeywordsActionOr = useCallback(
    async (e: string, props: monitoringParamsProps) => {
      const params = {
        ...props,
        or: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.or]
  )

  const setkeywordsActionNot = useCallback(
    async (e: string, props: monitoringParamsProps) => {
      const params = {
        ...props,
        not: e,
      }
      dispatch(monitoringParamsAction(params))
    },
    [monitoringParams.not]
  )

  const setMonitoringParamsExpandButtonAction = useCallback(
    (e: boolean) => {
      dispatch(monitoringParamsExpandButtonAction(e))
    },
    [monitoringParamsExpandButton]
  )

  const setMonitoringCategoryKeywordAction = useCallback(
    async (e: string) => {
      dispatch(monitoringCategoryKeywordAction(e))
    },
    [monitoringCategoryKeyword]
  )

  const setMonitoringListParamKeywordActionAction = useCallback(
    async (e: string) => {
      dispatch(monitoringListParamKeywordAction(e))
    },
    [monitoringListParamKeyword]
  )

  const setAllSearchContentKeyList = useCallback(
    async (
      isCheck: boolean,
      origin: MonitoringSearchNewsDocumentDto[],
      newItems: MonitoringSearchNewsDocumentDto[]
    ) => {
      let newItemsList = [...newItems]
      let dataList: MonitoringSearchNewsDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.newsid === item2.newsid)
      )
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.newsid) {
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyListAction({ param: dataList, isTag: true }))
    },
    [searchContentKeyList]
  )

  const setSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: MonitoringSearchNewsDocumentDto, hook: MonitoringSearchNewsDocumentDto[]) => {
      let dataList: MonitoringSearchNewsDocumentDto[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.newsid !== actionKey?.newsid)
      }
      const isOption = await calculateButtonOption(dataList)
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isOption }))
    },
    [searchContentKeyList]
  )

  const conditionConvert = async (filter: string) => {
    let res = null
    let isFilter = false
    let tempSearchKeywordOption = ''
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      periodStartYear: moment().format('YYYY'),
      periodStartMonth: moment().format('MM'),
      periodStartDay: moment().subtract({ days: 7 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: 1,
      size: 20,
      sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      groupId: userSelectGroup,
    }
    let tempFilterSubActions = [
      {
        id: 'filterPeriod',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterCategoryList',
        isOpen: false,
        subMenu: [],
        values: [],
      },
      {
        id: 'filterInformation',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterMediaNameList',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterTone',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterMultimedia',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterSourceType',
        isOpen: false,
        values: [],
      },
    ]
    let conditions = getObjectFromBase64(filter)
    console.log('conditions', JSON.stringify(conditions))
    if (conditions && conditions !== '') {
      const params = {
        and: conditions.and,
        or: conditions.or,
        not: conditions.not,
        period: conditions.period,
        startPeriod: conditions.startPeriod,
        endPeriod: conditions.endPeriod,
        periodTag: conditions.periodTag,
        mediaType: conditions.mediaType,
        mediaValue: conditions.mediaValue,
        mediaTagList: conditions.mediaTagList,
        journalistTagList: conditions.journalistTagList,
        tone: conditions.tone,
        existMultimedia: conditions?.existMultimedia || [],
        tag: conditions.tag,
        url: conditions.url,
        publishingPeriod: conditions.publishingPeriod,
        mediaBookList: conditions.mediaBookList,
        clipbook: conditions.clipbook,
        clipbookValue: conditions.clipbookValue,
        coverage: conditions.coverage,
        informationType: conditions.informationType,
      }
      if (conditions.page && conditions.page !== 0) {
        apiParams.page = Number(conditions.page)
      }
      if (conditions.size && conditions.size !== 0) {
        apiParams.size = Number(conditions.size)
      }
      if (conditions.sort && conditions.sort.length > 0) {
        apiParams.sort = conditions.sort
      }
      if (conditions.filter && conditions.filter !== '') {
        // @ts-ignore
        apiParams.filter = conditions.filter
        tempSearchKeywordOption = conditions.filter
        isFilter = true
      }
      if (
        conditions.filterPeriodEndDay &&
        conditions.filterPeriodEndDay !== '' &&
        conditions.filterPeriodEndMonth &&
        conditions.filterPeriodEndMonth !== '' &&
        conditions.filterPeriodEndYear &&
        conditions.filterPeriodEndYear !== '' &&
        conditions.filterPeriodStartDay &&
        conditions.filterPeriodStartDay !== '' &&
        conditions.filterPeriodStartMonth &&
        conditions.filterPeriodStartMonth !== '' &&
        conditions.filterPeriodStartYear &&
        conditions.filterPeriodStartYear !== ''
      ) {
        if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(2, 'days')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['2D']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(3, 'days')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['3D']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(7, 'days')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['1W']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(14, 'days')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['2W']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(1, 'months')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['1M']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(3, 'months')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['3M']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          )
            .subtract(6, 'months')
            .isSame(
              moment(
                `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
              )
            )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['6M']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          ).isSame(moment().format('YYYY-MM-DD')) &&
          moment(
            `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
          ).isSame(moment().subtract('1', 'years').format('YYYY-MM-DD'))
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['1Y']
          }
        } else if (
          moment(
            `${conditions.filterPeriodEndYear}-${conditions.filterPeriodEndMonth}-${conditions.filterPeriodEndDay}`
          ).isSame(
            moment(
              `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
            )
          )
        ) {
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['TODAY']
          }
        } else {
          console.log(
            'filterPeriodStart',
            moment(
              `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
            ).format('YYYY-MM-DD')
          )
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterPeriod')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = ['DIRECT']
          }
        }

        apiParams.filterPeriodEndDay = conditions.filterPeriodEndDay
        apiParams.filterPeriodEndMonth = conditions.filterPeriodEndMonth
        apiParams.filterPeriodEndYear = conditions.filterPeriodEndYear
        apiParams.filterPeriodStartDay = conditions.filterPeriodStartDay
        apiParams.filterPeriodStartMonth = conditions.filterPeriodStartMonth
        apiParams.filterPeriodStartYear = conditions.filterPeriodStartYear
        isFilter = true
      }
      if (conditions.filterValue && conditions.filterValue !== '') {
        apiParams.filterValue = conditions.filterValue
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterInformation')
        if (!isNaN(find)) {
          // @ts-ignore
          tempFilterSubActions[find].values = [conditions.filterValue]
        }
      }
      if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
        apiParams.filterCategoryList = conditions.filterCategoryList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterCategoryList')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.filterCategoryList
        }
      }
      if (conditions.filterMediaNameList && conditions.filterMediaNameList.length > 0) {
        apiParams.filterMediaNameList = conditions.filterMediaNameList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterMediaNameList')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.filterMediaNameList
        }
      }
      if (conditions.filterTone && conditions.filterTone.length > 0) {
        apiParams.filterTone = conditions.filterTone
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterTone')
        if (!isNaN(find)) {
          // @ts-ignore
          tempFilterSubActions[find].values = conditions.filterTone
        }
      }
      if (conditions.filterImage) {
        apiParams.filterImage = conditions.filterImage
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterMultimedia')
        if (!isNaN(find)) {
          // @ts-ignore
          tempFilterSubActions[find].values = [
            // @ts-ignore
            ...tempFilterSubActions[find].values,
            // @ts-ignore
            'IMAGE',
          ]
        }
      }
      if (conditions.filterVideo) {
        apiParams.filterVideo = conditions.filterVideo
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterMultimedia')
        if (!isNaN(find)) {
          // @ts-ignore
          tempFilterSubActions[find].values = [
            // @ts-ignore
            ...tempFilterSubActions[find].values,
            // @ts-ignore
            'VIDEO',
          ]
        }
      }
      if (conditions.filterSourceType && conditions.filterSourceType.length > 0) {
        apiParams.filterSourceType = conditions.filterSourceType
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'filterSourceType')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.filterSourceType
        }
      }
      if (params.and && params.and !== '') {
        apiParams.queryAnd = params.and
      }
      if (params.or && params.or !== '') {
        apiParams.queryOr = params.or
      }
      if (params.not && params.not !== '') {
        apiParams.queryNot = params.not
      }
      if (params.mediaType && params.mediaType.length > 0) {
        //@ts-ignore
        apiParams.categoryList = params.mediaType.map(e => {
          return e.id
        })
      }
      if (params.mediaValue && params.mediaValue.id !== '') {
        apiParams.value = params.mediaValue.id.toString()
      }
      if (params.mediaTagList && params.mediaTagList.length > 0) {
        //@ts-ignore
        apiParams.mediaIdList = params.mediaTagList.map(e => {
          return Number(e.id)
        })
      }
      if (params.journalistTagList && params.journalistTagList.length > 0) {
        //@ts-ignore
        apiParams.journalistIdList = params.journalistTagList.map(e => {
          return Number(e.id)
        })
      }
      if (params.tone && params.tone.length > 0) {
        //@ts-ignore
        apiParams.toneList = params.tone.map(e => {
          return e.id.toString()
        })
      }
      if (params.existMultimedia && params.existMultimedia.length > 0) {
        //@ts-ignore
        const existImage = params.existMultimedia.find(e => e.id === 'IMAGE')
        //@ts-ignore
        const existVideo = params.existMultimedia.find(e => e.id === 'VIDEO')
        if (existImage) {
          apiParams.existImage = true
        }
        if (existVideo) {
          apiParams.existVideo = true
        }
      }
      if (params.tag && params.tag.length > 0) {
        //@ts-ignore
        apiParams.tagIdList = params.tag.map(e => {
          return Number(e.id)
        })
      }
      if (params.url && params.url !== '') {
        apiParams.linkUrl = params.url
      }
      if (params.publishingPeriod && params.publishingPeriod.length > 0) {
        //@ts-ignore
        apiParams.pubCycleList = params.publishingPeriod.map(e => {
          return e.id.toString()
        })
      }
      if (params.mediaBookList && params.mediaBookList.length > 0) {
        //@ts-ignore
        apiParams.mediaListId = params.mediaBookList.map(e => {
          return Number(e.id)
        })
      }
      if (params.clipbook && params.clipbook.id !== '') {
        apiParams.clipbook = params.clipbook.id
      }
      if (params.clipbookValue && params.clipbookValue.length > 0) {
        //@ts-ignore
        apiParams.clipbookIdList = params.clipbookValue.map(e => {
          return Number(e.id)
        })
      }
      if (params.coverage && params.coverage.id !== '') {
        apiParams.coverageYn = params.coverage.id
      }
      if (params.informationType && params.informationType.id !== '') {
        apiParams.sourceType = params.informationType.id
      }
      res = {
        months: conditions.period.id,
        startPeriod: conditions.startPeriod,
        endPeriod: conditions.endPeriod,
        newsId: conditions?.news_id || 0,
        tempFilterSubActions,
        apiParams,
        params,
        tempSearchKeywordOption,
        isFilter,
      }
    }
    return res
  }

  const setChangeCategoryDate = async (params: monitoringParamsProps, apiParams: ESearchNewsCondDto) => {
    const apiDto = {
      ...apiParams,
      filterCategoryList: [],
      filterMediaNameList: [],
      filterValue: '',
      filterSourceType: [],
      filterTone: [],
      filterPeriodStartYear: '',
      filterPeriodStartMonth: '',
      filterPeriodStartDay: '',
      filterPeriodEndYear: '',
      filterPeriodEndMonth: '',
      filterPeriodEndDay: '',
      page: 1,
      sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
    }
    if (params.and !== '') {
      apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
    } else if (params.or !== '') {
      apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
    } else if (params.not !== '') {
      apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
    }
    await getNewsBySearchOption(params, apiDto, 'dto')
  }

  const changeDateSet = async (date: string, start: string, end: string) => {
    let dateValue = moment()
    let res = {
      periodStartYear: dateValue.format('YYYY'),
      periodStartMonth: dateValue.format('MM'),
      periodStartDay: dateValue.format('DD'),
      periodEndYear: dateValue.format('YYYY'),
      periodEndMonth: dateValue.format('MM'),
      periodEndDay: dateValue.format('DD'),
    }
    console.log('')
    if (date === '2D') {
      dateValue = moment().subtract({ days: 2 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '3D') {
      dateValue = moment().subtract({ days: 3 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '1W') {
      dateValue = moment().subtract({ days: 7 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '2W') {
      dateValue = moment().subtract({ days: 14 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '1M') {
      dateValue = moment().subtract({ month: 1 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '3M') {
      dateValue = moment().subtract({ month: 3 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '6M') {
      dateValue = moment().subtract({ month: 6 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === '1Y') {
      dateValue = moment().subtract({ year: 1 })
      res.periodStartYear = dateValue.format('YYYY')
      res.periodStartMonth = dateValue.format('MM')
      res.periodStartDay = dateValue.format('DD')
    } else if (date === 'DIRECT' && start !== '' && end !== '') {
      res.periodStartYear = moment(start).format('YYYY')
      res.periodStartMonth = moment(start).format('MM')
      res.periodStartDay = moment(start).format('DD')
      res.periodEndYear = moment(end).format('YYYY')
      res.periodEndMonth = moment(end).format('MM')
      res.periodEndDay = moment(end).format('DD')
    }
    return res
  }

  const getNewsSearchByMonitoring = async (params: ESearchNewsCondDto) => {
    let newsData: ElasticSearchReturnDtoNewsDocumentDto | null = null
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({ ...params, groupId: userSelectGroup })
      if (status === 'S') {
        newsData = data as ElasticSearchReturnDtoNewsDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return newsData
  }

  const addAutoClipbookNews = async (idKey: number[], newsIdList: number[], newsIndexItem: string[]) => {
    let res = ''
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookId: idKey[0],
      newsId: newsIdList[0],
      newsIndex: newsIndexItem[0],
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'addone',
      info: newsToClipbookparams,
    })
    if (status) {
      res = status
    }
    return res
  }

  const filterApiAction = async (
    filterDto: ESearchNewsCondDto,
    params: monitoringParamsProps,
    tempFilterSubParam: filterSubParamActionsProps[]
  ) => {
    dispatch(newsLoadingAction(true))
    const res = await getNewsSearchByMonitoring(filterDto)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / filterDto.size)
      const filter = setObjectToBase64({
        ...filterDto,
        ...params,
        news_id: newsData.length > 0 ? (newsData[0].newsid ? Number(newsData[0].newsid) : 0) : 0,
      })
      dispatch(
        setOnChangeMonitoringSearchFilterOptionAction({
          props: params,
          dto: filterDto,
          tempFilterSubParam: tempFilterSubParam,
          newsList: newsData,
          pageCount: {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/news/search-result?filter=${filter}`, undefined, { shallow: true })
      if (newsData && newsData.length > 0) {
        if (
          newsData[0] !== null &&
          !newsData[0].isSysInfo &&
          newsData[0].link &&
          newsData[0].link !== '' &&
          newsData[0].owner?.uid &&
          newsData[0].owner?.uid === userInfo.userId
        ) {
          await checkDuplicateNews(newsData[0])
        } else {
          dispatch(newsCheckDuplicateParamAction(null))
        }
      }
    }
    dispatch(newsLoadingAction(false))
  }

  const setExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: [],
      }
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
              filterCount += 1
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
              filterCount += 1
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
          console.log('setExtractExtraFilterSearch filterMultimedia.values', filterSubParamActionsProp.values)
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(
              filterSubParamActionsProp.values[0],
              hook.filterPeriodStartYear + '-' + hook.filterPeriodStartMonth + '-' + hook.filterPeriodStartDay,
              hook.filterPeriodEndYear + '-' + hook.filterPeriodEndMonth + '-' + hook.filterPeriodEndDay
            )
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      let getIdParams = key.map(e => e.id)
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: tempFilterSubParam[keyValue].values.concat(getIdParams),
      }
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
              filterCount += 1
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
              filterCount += 1
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
          console.log('setExtractExtraFilterSearch filterMultimedia.values', filterSubParamActionsProp.values)
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(
              filterSubParamActionsProp.values[0],
              hook.filterPeriodStartYear + '-' + hook.filterPeriodStartMonth + '-' + hook.filterPeriodStartDay,
              hook.filterPeriodEndYear + '-' + hook.filterPeriodEndMonth + '-' + hook.filterPeriodEndDay
            )
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: e.target.checked
          ? [...tempFilterSubParam[keyValue].values, key.id]
          : tempFilterSubParam[keyValue].values.filter(e => e !== key.id),
      }
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
              filterCount += 1
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
              filterCount += 1
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(
              filterSubParamActionsProp.values[0],
              hook.filterPeriodStartYear + '-' + hook.filterPeriodStartMonth + '-' + hook.filterPeriodStartDay,
              hook.filterPeriodEndYear + '-' + hook.filterPeriodEndMonth + '-' + hook.filterPeriodEndDay
            )
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setInitFilterSubParamActions = async (
    item: filterSubParamActionsProps[],
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    let filterDto = {
      ...hook,
      filterCategoryList: [],
      filterMediaNameList: [],
      filterValue: '',
      filterSourceType: [],
      filterTone: [],
      filterPeriodStartYear: '',
      filterPeriodStartMonth: '',
      filterPeriodStartDay: '',
      filterPeriodEndYear: '',
      filterPeriodEndMonth: '',
      filterPeriodEndDay: '',
      page: 1,
    }
    delete filterDto.filterImage
    delete filterDto.filterVideo
    dispatch(isLimitFilterAction(0))
    await filterApiAction(filterDto, params, item)
  }

  const setAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    try {
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: [key.id],
      }
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(filterSubParamActionsProp.values[0], '', '')
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      await filterApiAction(filterDto, params, tempFilterSubParam)
    } catch (e) {}
  }

  const setAddExtraDateFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    try {
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: [key.id],
      }
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(filterSubParamActionsProp.values[0], '', '')
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      await filterApiAction(filterDto, params, tempFilterSubParam)
    } catch (e) {}
  }

  const setAddExtraCustomDateFilterSearch = async (
    item: filterSubParamActionsProps[],
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps,
    startDate: string,
    endDate: string
  ) => {
    try {
      let filterDto = {
        ...hook,
        page: 1,
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
      }
      let tempFilterSubParam = [...item]
      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategoryList') {
          filterDto.filterCategoryList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMediaNameList') {
          filterDto.filterMediaNameList = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp?.values[0] || ''
        } else if (filterSubParamActionsProp.id === 'filterTone') {
          // @ts-ignore
          filterDto.filterTone = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterMultimedia') {
          if (filterSubParamActionsProp.values && filterSubParamActionsProp.values.length > 0) {
            const findImage = filterSubParamActionsProp.values.find(n => n.toString() === 'IMAGE')
            const findVideo = filterSubParamActionsProp.values.find(n => n.toString() === 'VIDEO')
            if (findImage) {
              filterDto.filterImage = true
            } else {
              delete filterDto.filterImage
            }
            if (findVideo) {
              filterDto.filterVideo = true
            } else {
              delete filterDto.filterVideo
            }
          } else {
            delete filterDto.filterImage
            delete filterDto.filterVideo
          }
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(filterSubParamActionsProp.values[0], startDate, endDate)
            filterDto.filterPeriodStartYear = dateValue.periodStartYear
            filterDto.filterPeriodStartMonth = dateValue.periodStartMonth
            filterDto.filterPeriodStartDay = dateValue.periodStartDay
            filterDto.filterPeriodEndYear = dateValue.periodEndYear
            filterDto.filterPeriodEndMonth = dateValue.periodEndMonth
            filterDto.filterPeriodEndDay = dateValue.periodEndDay
          }
        }
      }
      await filterApiAction(filterDto, params, tempFilterSubParam)
    } catch (e) {}
  }

  const afterClipbookAddReLoad = async (
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto,
    clipbookDataList?: clipbookDataListProps[]
  ) => {
    let newsParam = originParam
    let newsList = [...originData]
    try {
      const res = await getNewsSearchByMonitoring(dto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        if (newsData && newsData.length > 0) {
          const find = newsData.find(k => k.newsid === originParam?.newsid)
          newsParam = find ? find : originParam
          newsList = newsData
        }
      }
      let timer: NodeJS.Timeout | undefined
      if (timer) {
        clearTimeout(timer)
      }
      dispatch(countLoadingAction(true))
      timer = setTimeout(async () => {
        dispatch(countLoadingAction(false))
        dispatch(
          afterClipbookAddNewsListAction({
            list: newsList,
            newsParam: newsParam,
          })
        )
        if (clipbookDataList && clipbookDataList.length > 0) {
          openToast(
            ClipbookAddContext({
              valueName: clipbookDataList,
              onChangeAction: async k => {
                await router.replace(`/news/clipbook-result?clipbook_id=${k}`, undefined, { shallow: true })
                router.reload()
              },
              onChangeTotalAction: async () => {
                await router.replace(`/news/clipbook`, undefined, { shallow: true })
                router.reload()
              },
            }),
            'success'
          )
        }
      }, 2000)
    } catch (e) {}
    //dispatch(newsLoadingAction(false))
    dispatch(initStateClipbookListPopup())
  }

  const getNewsBySearchOption = async (props: monitoringParamsProps, dto: ESearchNewsCondDto, type: string) => {
    let tempFilterSub: NavigationLinkItem[] = []
    dispatch(newsLoadingAction(true))
    try {
      const res = await getNewsSearchByMonitoring(dto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / dto.size)
        const filter = setObjectToBase64({
          ...dto,
          ...props,
          news_id: newsData.length > 0 ? Number(newsData[0].newsid) : 0,
        })
        if (type === 'dto') {
          tempFilterSub = await getFilterOptionControlData(
            res,
            dto,
            monthsOriginSearchOption,
            toneList,
            informationTypeList,
            mediaTypeList,
            periodList,
            mediaSubTotalTypeList,
            mediaValueFilterList,
            newsMultiMediaList
          )
        }
        dispatch(
          setOnChangeMonitoringSearchOptionAction({
            props,
            dto,
            newsList: newsData,
            pageCount: {
              totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
            },
            isResetSelectedNews: type === 'size' ? true : type === 'dto',
            type,
            tempFilterSub,
          })
        )
        await router.replace(`/news/search-result?filter=${filter}`, undefined, { shallow: true })
        if (newsData && newsData.length > 0) {
          if (
            newsData[0] !== null &&
            !newsData[0].isSysInfo &&
            newsData[0].link &&
            newsData[0].link !== '' &&
            newsData[0].owner?.uid &&
            newsData[0].owner?.uid === userInfo.userId
          ) {
            await checkDuplicateNews(newsData[0])
          } else {
            dispatch(newsCheckDuplicateParamAction(null))
          }
        }
      }
    } catch (e) {}
    dispatch(newsLoadingAction(false))
  }

  const calculateButtonOption = async (props: MonitoringSearchNewsDocumentDto[]) => {
    let isTag = true
    if (props.length > 0) {
      for await (const mbTagSearchTagItem of props) {
        let tempIsTag =
          !mbTagSearchTagItem.isSysInfo && mbTagSearchTagItem.owner
            ? mbTagSearchTagItem.owner?.uid === userInfo.userId
            : true
        if (isTag) {
          isTag = tempIsTag
        }
      }
    }

    return isTag
  }

  const keywordSearch = async (e: string, apiParam: ESearchNewsCondDto, hook: monitoringParamsProps) => {
    const params = {
      ...apiParam,
      filter: e,
      page: 1,
    }
    await getNewsBySearchOption(hook, params, 'filter')
  }

  const handleChangeSize = async (e: number, hook: ESearchNewsCondDto, params: monitoringParamsProps) => {
    const apiParam = {
      ...hook,
      page: 1,
      size: e,
    }
    await getNewsBySearchOption(params, apiParam, 'size')
  }

  const handlePaginationChange = async (e: number, hook: ESearchNewsCondDto, params: monitoringParamsProps) => {
    if (Number(e) * Number(hook.size) >= 20000) {
      dispatch(searchLimitAlarmAction(true))
    } else {
      await getNewsBySearchOption(
        params,
        {
          ...hook,
          page: e,
          size: hook.size,
        },
        'page'
      )
    }
  }

  const exportToExcel = async (e: MonitoringSearchNewsDocumentDto[]) => {
    const param = {
      newsIdList: e.map(e => {
        return Number(e.newsid)
      }),
      indexNameList: e.map(e => {
        return moment(e.inserted).format('YYYYMM')
      }),
    }
    const res = await newsExcel.mutateAsync(param)
    if (res) {
      const excel = res as Blob
      const blob = new Blob([excel], { type: 'ms-vnd/excel' })

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      // @ts-ignore
      link.download = '뉴스 목록 내보내기(downloaded_file).xlsx'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(link)
      dispatch(setSearchContentKeyListAction([]))
    } else {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }
  const handleChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    hook: ESearchNewsCondDto,
    params: monitoringParamsProps
  ) => {
    let sort = [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`]
    if (e.id === 'inserted') {
      sort = [`inserted!${i.id}`, `_score!${i.id}`, `char_len!${i.id}`, `newsid!${i.id}`]
    } else if (e.id === '_score') {
      sort = [`_score!${i.id}`, `inserted!${i.id}`, `char_len!${i.id}`, `newsid!${i.id}`]
    } else if (e.id === 'char_len') {
      sort = [`char_len!${i.id}`, `inserted!${i.id}`, `_score!${i.id}`, `newsid!${i.id}`]
    }
    await getNewsBySearchOption(
      params,
      {
        ...hook,
        sort,
        page: 1,
      },
      'sort'
    )
  }

  const setQueryParam = async (list: string[]) => {
    let res = ''
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          switch (query[0]) {
            case 'filter':
              res = query[1]
              break
            default:
          }
        }
      }
    }
    return res
  }

  const openMonitoringPopup = async (list: SelectListOptionItem[], props: monitoringParamsProps) => {
    const param = {
      category: list,
      scrop: shareCodeData.news_search,
      keyword: {
        and: props.and,
        or: props.or,
        not: props.not,
      },
      extra: {
        mediaType: props.mediaType,
        mediaValue: props.mediaValue,
        mediaTagList: props.mediaTagList,
        journalistTagList: props.journalistTagList,
        tone: props.tone,
        existMultimedia: props?.existMultimedia || [],
        tag: props.tag,
        url: props.url,
        publishingPeriod: props.publishingPeriod,
        mediaBookList: props.mediaBookList,
        clipbookValue: props.clipbookValue,
        clipbook: props.clipbook,
        coverage: props.coverage,
        informationType: props.informationType,
      },
    }
    dispatch(openMonitoringPopupAction(param))
  }

  const changeSearchDto = async (apiParam: ESearchNewsCondDto, params: monitoringParamsProps) => {
    let isProcess = false
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      periodStartYear: apiParam.periodStartYear,
      periodStartMonth: apiParam.periodStartMonth,
      periodStartDay: apiParam.periodStartDay,
      periodEndYear: apiParam.periodEndYear,
      periodEndMonth: apiParam.periodEndMonth,
      periodEndDay: apiParam.periodEndDay,
      page: apiParam.page,
      size: apiParam.size,
      sort: apiParam.sort,
      groupId: userSelectGroup,
    }
    if (params.and && params.and !== '') {
      apiParams.queryAnd = params.and
      isProcess = true
    }
    if (params.or && params.or !== '') {
      apiParams.queryOr = params.or
      isProcess = true
    }
    if (params.not && params.not !== '') {
      apiParams.queryNot = params.not
      isProcess = true
    }
    if (params.mediaType && params.mediaType.length > 0) {
      //@ts-ignore
      apiParams.categoryList = params.mediaType.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.mediaValue && params.mediaValue.id !== '') {
      apiParams.value = params.mediaValue.id.toString()
      isProcess = true
    }
    if (params.mediaTagList && params.mediaTagList.length > 0) {
      //@ts-ignore
      apiParams.mediaIdList = params.mediaTagList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.journalistTagList && params.journalistTagList.length > 0) {
      //@ts-ignore
      apiParams.journalistIdList = params.journalistTagList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.tone && params.tone.length > 0) {
      //@ts-ignore
      apiParams.toneList = params.tone.map(e => {
        return e.id.toString()
      })
      isProcess = true
    }
    if (params.existMultimedia && params.existMultimedia.length > 0) {
      //@ts-ignore
      const existImage = params.existMultimedia.find(e => e.id === 'IMAGE')
      //@ts-ignore
      const existVideo = params.existMultimedia.find(e => e.id === 'VIDEO')
      if (existImage) {
        apiParams.existImage = true
        isProcess = true
      } else {
        delete apiParams.existImage
      }
      if (existVideo) {
        apiParams.existVideo = true
        isProcess = true
      } else {
        delete apiParams.existVideo
      }
    } else {
      delete apiParams.existImage
      delete apiParams.existVideo
    }
    if (params.tag && params.tag.length > 0) {
      //@ts-ignore
      apiParams.tagIdList = params.tag.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.url && params.url !== '') {
      apiParams.linkUrl = params.url
      isProcess = true
    }
    if (params.publishingPeriod && params.publishingPeriod.length > 0) {
      //@ts-ignore
      apiParams.pubCycleList = params.publishingPeriod.map(e => {
        return e.id.toString()
      })
      isProcess = true
    }
    if (params.mediaBookList && params.mediaBookList.length > 0) {
      //@ts-ignore
      apiParams.mediaListId = params.mediaBookList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.clipbook && params.clipbook.id !== '') {
      apiParams.clipbook = params.clipbook.id
      isProcess = true
    }
    if (params.clipbookValue && params.clipbookValue.length > 0) {
      //@ts-ignore
      apiParams.clipbookIdList = params.clipbookValue.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.coverage && params.coverage.id !== '') {
      apiParams.coverageYn = params.coverage.id
      isProcess = true
    }
    if (params.informationType && params.informationType.id !== '') {
      apiParams.sourceType = params.informationType.id
      isProcess = true
    }

    return { apiParams, isProcess }
  }

  const changeSearchOption = async (apiParam: ESearchNewsCondDto, props: monitoringParamsProps) => {
    const param = await changeSearchDto(apiParam, props)
    if (param.isProcess) {
      const apiDto = {
        ...param.apiParams,
        filterCategoryList: [],
        filterMediaNameList: [],
        filterValue: '',
        filterSourceType: [],
        filterTone: [],
        filterPeriodStartYear: '',
        filterPeriodStartMonth: '',
        filterPeriodStartDay: '',
        filterPeriodEndYear: '',
        filterPeriodEndMonth: '',
        filterPeriodEndDay: '',
        page: 1,
        sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      }
      if (props.and !== '') {
        apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
      } else if (props.or !== '') {
        apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
      } else if (props.not !== '') {
        apiDto.sort = [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`]
      }
      await getNewsBySearchOption(props, apiDto, 'dto')
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const monitoringDataToChart = async (
    props: monitoringAnalysisPopupProps,
    newsData: ElasticSearchReturnDtoNewsDocumentDto
  ) => {
    let mediaIdList: number[] = []
    let res: monitoringAnalysisPopupProps = {
      ...props,
      mediaTypeList: [],
      dailyNewsCountList: [],
      newsCountListByUpperMedia: [],
      toneCountList: [
        {
          name: '긍정',
          count: 10,
        },
        {
          name: '부정',
          count: 5,
        },
        {
          name: '중립',
          count: 27,
        },
      ],
    }
    if (newsData.filterMediaId && newsData.filterMediaId.length > 0) {
      for await (const e of newsData.filterMediaId) {
        mediaIdList = [...mediaIdList, Number(Object.keys(e)[0])]
      }
    }
    if (newsData.filterDate && newsData.filterDate.length > 0) {
      for await (const e of newsData.filterDate) {
        const name = Object.keys(e)[0]
        const count = Number(Object.values(e)[0])
        res.dailyNewsCountList = [
          ...res.dailyNewsCountList,
          {
            name,
            count,
          },
        ]
      }
    }
    if (newsData.filterMediaName && newsData.filterMediaName.length > 0) {
      for await (const e of newsData.filterMediaName) {
        const name = Object.keys(e)[0]
        const count = Number(Object.values(e)[0])
        res.newsCountListByUpperMedia = [
          ...res.newsCountListByUpperMedia,
          {
            name,
            count,
          },
        ]
      }
    }
    if (mediaIdList.length > 0) {
      const { status, data } = await getMediaSearchResult.mutateAsync({
        mediaIdList,
        page: 1,
        size: 100,
        sort: ['name!desc'],
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const { name } = data as ElasticSearchReturnDtoMediaDocumentDto
        const mediaData = name as ESearchMediaDocumentDto[]
        if (mediaData && mediaData.length > 0) {
          for await (const e of mediaData) {
            const findItem = res.mediaTypeList.find(mItem => mItem.name === e.subtype)
            if (findItem) {
              findItem.count += 1
            } else {
              res.mediaTypeList = [
                ...res.mediaTypeList,
                {
                  name: e.subtype ?? '',
                  count: 1,
                },
              ]
            }
          }
        }
        res.dailyNewsCountList = formatMediaDates(res.dailyNewsCountList)
      }
    }

    if (res.dailyNewsCountList.length > 0) {
      const maxCountOfDailyNewsCount = Math.max(...res.dailyNewsCountList.map(item => item.count))
      const tickAmount = maxCountOfDailyNewsCount > 5 ? 5 : maxCountOfDailyNewsCount

      let newDailyNewsDataOptions: ApexCharts.ApexOptions = {
        ...lineOptions,
        chart: {
          ...lineOptions.chart,
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          ...lineOptions.xaxis,
          categories: res.dailyNewsCountList.map(item => item.name),
        },
        yaxis: {
          ...lineOptions.yaxis,
          max: maxCountOfDailyNewsCount,
          tickAmount,
        },
      }

      const newDailyNewsDataSeries: ApexAxisChartSeries = [
        {
          ...lineSeries[0],
          data: res.dailyNewsCountList.map(item => item.count),
        },
      ]
      res.newDailyNewsDataOptions = newDailyNewsDataOptions
      res.newDailyNewsDataSeries = newDailyNewsDataSeries
    }

    if (res.toneCountList.length > 0) {
      const newToneCountDataOptions: ApexCharts.ApexOptions = {
        ...pieOptionsCommon,
        chart: {
          ...pieOptionsCommon.chart,
          toolbar: {
            show: true,
          },
        },
        labels: res.toneCountList.map(item => item.name),
      }
      const newToneCountDataSeries: number[] = res.toneCountList.map(item => item.count)

      res.newToneCountDataOptions = newToneCountDataOptions
      res.newToneCountDataSeries = newToneCountDataSeries
    }

    if (res.newsCountListByUpperMedia.length > 0) {
      const maxCountOfNewsCountByUpperMedia = Math.max(...res.newsCountListByUpperMedia.map(item => item.count))
      const tickAmount = maxCountOfNewsCountByUpperMedia > 5 ? 5 : maxCountOfNewsCountByUpperMedia
      const newMediaAnalysisDataOptions: ApexCharts.ApexOptions = {
        ...columnOptions,
        chart: {
          ...columnOptions.chart,
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          ...columnOptions.xaxis,
          categories: res.newsCountListByUpperMedia.map(item => item.name),
        },
        yaxis: {
          ...columnOptions.yaxis,
          max: maxCountOfNewsCountByUpperMedia,
          tickAmount,
        },
      }
      const newMediaAnalysisDataSeries: ApexAxisChartSeries = [
        {
          ...columnSeries[0],
          data: res.newsCountListByUpperMedia.map(item => item.count),
        },
      ]

      res.newMediaAnalysisDataOptions = newMediaAnalysisDataOptions
      res.newMediaAnalysisDataSeries = newMediaAnalysisDataSeries
    }

    if (res.mediaTypeList.length > 0) {
      const newMediaTypeDataOptions: ApexCharts.ApexOptions = {
        ...pieOptionsCommon,
        chart: {
          ...pieOptionsCommon.chart,
          toolbar: {
            show: true,
          },
        },
        labels: res.mediaTypeList.map(item => item.name),
      }
      const newMediaTypeDataSeries: number[] = res.mediaTypeList.map(item => item.count)

      res.newMediaTypeDataOptions = newMediaTypeDataOptions
      res.newMediaTypeDataSeries = newMediaTypeDataSeries
    }

    return res
  }

  const formatMediaDates = (data: MediaNameCountType[], months = 1): MediaNameCountType[] => {
    const formattedData: MediaNameCountType[] = []
    let lastYear: string | null = null

    // 데이터 중 가장 최신 날짜 찾기
    const latestDate = data.reduce((latest, item) => {
      const currentDate = new Date(item.name)
      return currentDate > latest ? currentDate : latest
    }, new Date(0))

    // x달 전의 날짜 계산
    const pastDate = new Date(latestDate.setMonth(latestDate.getMonth() - months))

    data.forEach(item => {
      const [year, month, day] = item.name.split('-')
      const itemDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

      // x달 이내 데이터만 처리
      if (itemDate >= pastDate) {
        if (year !== lastYear) {
          formattedData.push({ ...item, name: item.name })
          lastYear = year
        } else {
          formattedData.push({ ...item, name: `${month}-${day}` })
        }
      }
    })

    return formattedData
  }

  const filterPeriod = async (months: string, originData: SelectListOptionItem[]) => {
    let res: NavigationLinkItem[] = []
    let todays = false
    let twoDays = false
    let threeDays = false
    let oneWeeks = false
    let twoWeeks = false
    let oneMonths = false
    let threeMonths = false
    let sixMonths = false
    let custom = false

    if (months === '2D') {
      todays = true
    } else if (months === '3D') {
      todays = true
      twoDays = true
    } else if (months === '1W') {
      todays = true
      twoDays = true
      threeDays = true
    } else if (months === '2W') {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
    } else if (months === '1M') {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
      twoWeeks = true
    } else if (months === '3M') {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
      twoWeeks = true
      oneMonths = true
    } else if (months === '6M') {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
      twoWeeks = true
      oneMonths = true
      threeMonths = true
    } else if (months === '1Y') {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
      twoWeeks = true
      oneMonths = true
      threeMonths = true
      sixMonths = true
    } else if (months === 'DIRECT') {
      custom = true
    } else {
      todays = true
      twoDays = true
      threeDays = true
      oneWeeks = true
      twoWeeks = true
    }

    for await (const paramElement of originData) {
      let temp: NavigationLinkItem = {
        id: paramElement.id,
        title: paramElement.name,
        // @ts-ignore
        subMenus: [],
      }
      if (paramElement.id === 'TODAY') {
        temp.subMenus = todays ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '2D') {
        temp.subMenus = twoDays ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '3D') {
        temp.subMenus = threeDays ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '1W') {
        temp.subMenus = oneWeeks ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '2W') {
        temp.subMenus = twoWeeks ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '1M') {
        temp.subMenus = oneMonths ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '3M') {
        temp.subMenus = threeMonths ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '6M') {
        temp.subMenus = sixMonths ? [{ id: '', title: '' }] : []
      } else if (paramElement.id === '1Y') {
        temp.subMenus = []
      } else if (paramElement.id === 'DIRECT') {
        temp.subMenus = custom ? [{ id: '', title: '' }] : []
      }
      res = [...res, temp]
    }
    return res
  }

  const filterMediaValue = async (tempMediaValueList: SelectListOptionItem[], props: ESearchNewsCondDto) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of tempMediaValueList) {
      let temp: NavigationLinkItem = {
        id: paramElement.id,
        title: paramElement.name,
        // @ts-ignore
        subMenus: [{ id: '', title: '' }],
      }
      if (props.value && props.value !== '' && Number(paramElement.id) >= Number(props.value)) {
        temp.subMenus = []
      }
      res = [...res, temp]
    }
    return res
  }

  const filterAdjust = async (list: any[], originData: SelectListOptionItem[]) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of list) {
      let temp: NavigationLinkItem = {
        id: '',
        title: '',
        subMenus: [],
      }
      const find = originData.find(e => e.id === Object.keys(paramElement)[0])
      const count = Object.values(paramElement)[0] as string
      if (find && Number(count) > 0) {
        temp.id = find.id
        temp.title = find.name
        // @ts-ignore
        temp.subMenus = count && Number(count) > 0 ? Array.from({ length: Number(count) }, (v, i) => i) : []
        res = [...res, temp]
      }
    }
    return res
  }

  const filterNonListAdjust = async (nameList: object[], idList: object[]) => {
    let res: NavigationLinkItem[] = []
    let tempIndex: number = 0
    for await (const paramElement of nameList) {
      const find = idList[tempIndex]
      const count = Object.values(paramElement)[0] as string
      if (find && Number(count) > 0) {
        let temp: NavigationLinkItem = {
          id: Object.keys(paramElement)[0].toString(),
          title: Object.keys(paramElement)[0],
          // @ts-ignore
          subMenus: count && Number(count) > 0 ? Array.from({ length: Number(count) }, (v, i) => i) : [],
        }
        res = [...res, temp]
        tempIndex += 1
      }
    }

    return res
  }

  const filterMediaTypeSubAdjust = async (codeData: CommonCode[], originKeyList: object[]) => {
    let res: NavigationLinkItem[] = []
    for await (const codeDatum of originKeyList) {
      const codeDataFind = codeData.find(e => e.code === (Object.keys(codeDatum)[0] as string).toString())
      if (codeDataFind) {
        const count = Object.values(codeDatum)[0] as string
        if (Number(count) > 0) {
          res = [
            // @ts-ignore
            ...res,
            {
              id: codeDataFind.code.toString(),
              title: codeDataFind.name,
              // @ts-ignore
              subMenus: count && Number(count) > 0 ? Array.from({ length: Number(count) }, (v, i) => i) : [],
            },
          ]
        }
      }
    }

    return res
  }

  const filterMediaTypeAdjust = async (
    originList: object[],
    originKeyList: object[],
    idList: SelectListOptionItem[],
    tempMediaSubTypeList: mediaSubTypeListProps[]
  ) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of originList) {
      const find = idList.find(e => e.extra === (Object.keys(paramElement)[0] as string).toString())
      const subTypeList = tempMediaSubTypeList.find(
        e => e.extra === (Object.keys(paramElement)[0] as string).toString()
      )
      if (find && subTypeList) {
        if (subTypeList.data.length > 0) {
          res = [
            ...res,
            {
              id: find.id,
              title: find.name,
              subMenus: await filterMediaTypeSubAdjust(subTypeList.data, originKeyList),
            },
          ]
        }
      }
    }

    return res
  }

  const executeEmailHtml = async (props: reportPopupProps) => {
    let emailHeader = ''
    let nameStepLine = ''
    let newsStepTitleLine = ''
    let newsStepListLine = ''
    let sourceHTML = ''
    try {
      const firstLine = defaultReportStringFirstLine
      const secondLine = defaultReportStringSecondLine
      const lastLine = defaultReportStringThirdLine
      const groupFinishLine = defaultReportGroupingStringLastLine
      if (props.releaseStep.contents && props.releaseStep.contents !== '') {
        emailHeader = `
          <tr>
            <td style="margin: 0; padding: 20px 0 0;">
              <span style="margin: 0; padding: 0 0 10px; display: inline-block;">${userInfo.name}님이 보고서를 공유했습니다.</span><br />
              메시지: ${props.releaseStep.contents}
            </td>
          </tr>
        `
      } else {
        emailHeader = `
          <tr>
            <td style="margin: 0; padding: 20px 0 0;">
              <span style="margin: 0; padding: 0 0 10px; display: inline-block;">${userInfo.name}님이 보고서를 공유했습니다.</span><br />
            </td>
          </tr>
        `
      }
      if (props.nameStep.name && props.nameStep.name !== '') {
        nameStepLine = `
          <tr>
            <td style="margin: 0; padding: 0 24px; font-size: 20px; font-weight: 700;">${props.nameStep.name}</td>
          </tr>
        `
      }
      if (props.newsStep.isNewsGrouping) {
        let mainStreamLine = ''
        if (props.newsStep.groupingNewsList.length > 0) {
          for await (const sourceHTMLElement of props.newsStep.groupingNewsList) {
            let groupTotalLine = ''
            let groupNmStepLine = `
              <tr>
                <td style="margin: 0; padding: 40px 24px 0; font-weight: 700;">${sourceHTMLElement.name} (${sourceHTMLElement.data.length})</td>
              </tr>
            `
            let groupDataLine = ''
            if (sourceHTMLElement.data.length > 0) {
              for await (const groupNmStepLineElement of sourceHTMLElement.data) {
                const urlLink = groupNmStepLineElement.linkUrl
                groupDataLine = groupDataLine.concat(`
                  <tr>
                    <td style="margin: 0; padding: 20px 0 0;">
                      <a href='${urlLink}' target="_blank" style="margin: 0; padding: 0 0 4px; color: #0094a8; display: inline-block;">${
                  groupNmStepLineElement.title
                }</a><br />
                      <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">${moment(
                        groupNmStepLineElement.date
                      ).format('YYYY년 MM월 DD일 HH:mm')}&nbsp;&nbsp;&nbsp;&nbsp;${
                  groupNmStepLineElement?.mediaName || ''
                }&nbsp;&nbsp;&nbsp;&nbsp;${groupNmStepLineElement?.authors || ''}</span><br />
                      <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">논조: ${
                        groupNmStepLineElement?.tone || ''
                      }&nbsp;&nbsp;&nbsp;&nbsp;매체 지수: ${getCurrencyFormat(
                  groupNmStepLineElement?.mediaValue || ''
                )}</span>
                    </td>
                  </tr>
                `)
              }
            }
            groupTotalLine = groupTotalLine.concat(groupNmStepLine)
            groupTotalLine = groupTotalLine.concat(secondLine)
            groupTotalLine = groupTotalLine.concat(groupDataLine)
            groupTotalLine = groupTotalLine.concat(defaultReportGroupingStringThirdLine)
            mainStreamLine = mainStreamLine.concat(groupTotalLine)
          }
        }
        sourceHTML = emailHeader + firstLine + nameStepLine + mainStreamLine + groupFinishLine
      } else {
        if (props.newsStep.newsList.length > 0) {
          newsStepTitleLine = `
          <tr>
            <td style="margin: 0; padding: 20px 24px 0; font-weight: 700;">뉴스 (${props.newsStep.newsList.length})</td>
          </tr>
        `
          for await (const nameStepLineElement of props.newsStep.newsList) {
            const urlLink = nameStepLineElement.linkUrl
            newsStepListLine = newsStepListLine.concat(`
            <tr>
              <td style="margin: 0; padding: 20px 0 0;">
                <a href='${urlLink}' target="_blank" style="margin: 0; padding: 0 0 4px; color: #0094a8; display: inline-block;">${
              nameStepLineElement.title
            }</a><br />
                <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">${moment(
                  nameStepLineElement.date
                ).format('YYYY년 MM월 DD일 HH:mm')}&nbsp;&nbsp;&nbsp;&nbsp;${
              nameStepLineElement?.mediaName || ''
            }&nbsp;&nbsp;&nbsp;&nbsp;${nameStepLineElement?.authors || ''}</span><br />
                <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">논조: ${
                  nameStepLineElement?.tone || ''
                }&nbsp;&nbsp;&nbsp;&nbsp;매체 지수: ${getCurrencyFormat(nameStepLineElement?.mediaValue || '')}</span>
              </td>
            </tr>
            `)
          }
        }
        sourceHTML =
          emailHeader + firstLine + nameStepLine + newsStepTitleLine + secondLine + newsStepListLine + lastLine
      }
    } catch (e) {}

    return sourceHTML
  }

  const reportEmailSender = async (props: reportPopupProps, originHtml: string) => {
    let params: useMonitoringReportMailType = {
      request: {
        title: props.releaseStep.title,
        userIdList: props.releaseStep.receiverList.map(e => {
          return Number(e.id)
        }),
        extraMailList: props.releaseStep.targetEmail.map(e => {
          return e.label
        }),
        // @ts-ignore
        objectType: 'REPORT_MONITORING',
        content: '',
        isEmail: props.releaseStep.isEmail,
        isPdf: props.releaseStep.isPdf,
      },
      fileList: [],
    }
    if (props.releaseStep.isEmail) {
      params.request.content = await executeEmailHtml(props)
    }
    if (props.releaseStep.isWord) {
      const wordFile = await executeWordDownload(props, 'file')
      if (wordFile) {
        params.fileList = [...params.fileList, wordFile]
      }
    }
    // @ts-ignore
    const { status, data, message } = await monitoringReportSend.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(setDoenReportPopupAction())
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const executeWordDownload = async (props: reportPopupProps, isType?: string) => {
    let res: File | null = null
    let nameStepLine = ''
    let newsStepTitleLine = ''
    let newsStepListLine = ''
    let sourceHTML = ''
    try {
      const header = '<html>' + "<head><meta charset='utf-8'></head><body>"
      const firstLine = defaultReportStringFirstLine
      const secondLine = defaultReportStringSecondLine
      const lastLine = defaultReportStringThirdLine
      const groupFinishLine = defaultReportGroupingStringLastLine
      const footer = '</body></html>'
      sourceHTML = header + footer
      if (props.nameStep.name && props.nameStep.name !== '') {
        nameStepLine = `
          <tr>
            <td style="margin: 0; padding: 0 24px; font-size: 20px; font-weight: 700;">${props.nameStep.name}</td>
          </tr>
        `
      }
      if (props.newsStep.isNewsGrouping) {
        let mainStreamLine = ''
        if (props.newsStep.groupingNewsList.length > 0) {
          for await (const sourceHTMLElement of props.newsStep.groupingNewsList) {
            let groupTotalLine = ''
            let groupNmStepLine = `
              <tr>
                <td style="margin: 0; padding: 40px 24px 0; font-weight: 700;">${sourceHTMLElement.name} (${sourceHTMLElement.data.length})</td>
              </tr>
            `
            let groupDataLine = ''
            if (sourceHTMLElement.data.length > 0) {
              for await (const groupNmStepLineElement of sourceHTMLElement.data) {
                const urlLink = groupNmStepLineElement.linkUrl
                groupDataLine = groupDataLine.concat(`
                  <tr>
                    <td style="margin: 0; padding: 20px 0 0;">
                      <a href='${urlLink}' target="_blank" style="margin: 0; padding: 0 0 4px; color: #0094a8; display: inline-block;">${
                  groupNmStepLineElement.title
                }</a><br />
                      <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">${moment(
                        groupNmStepLineElement.date
                      ).format('YYYY년 MM월 DD일 HH:mm')}&nbsp;&nbsp;&nbsp;&nbsp;${
                  groupNmStepLineElement?.mediaName || ''
                }&nbsp;&nbsp;&nbsp;&nbsp;${groupNmStepLineElement?.authors || ''}</span><br />
                      <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">논조: ${
                        groupNmStepLineElement?.tone || ''
                      }&nbsp;&nbsp;&nbsp;&nbsp;매체 지수: ${getCurrencyFormat(
                  groupNmStepLineElement?.mediaValue || ''
                )}</span>
                    </td>
                  </tr>
                `)
              }
            }
            groupTotalLine = groupTotalLine.concat(groupNmStepLine)
            groupTotalLine = groupTotalLine.concat(secondLine)
            groupTotalLine = groupTotalLine.concat(groupDataLine)
            groupTotalLine = groupTotalLine.concat(defaultReportGroupingStringThirdLine)
            mainStreamLine = mainStreamLine.concat(groupTotalLine)
          }
        }
        sourceHTML = header + firstLine + nameStepLine + mainStreamLine + groupFinishLine + footer
      } else {
        if (props.newsStep.newsList.length > 0) {
          newsStepTitleLine = `
          <tr>
            <td style="margin: 0; padding: 20px 24px 0; font-weight: 700;">뉴스 (${props.newsStep.newsList.length})</td>
          </tr>
        `
          for await (const nameStepLineElement of props.newsStep.newsList) {
            const urlLink = nameStepLineElement.linkUrl
            newsStepListLine = newsStepListLine.concat(`
            <tr>
              <td style="margin: 0; padding: 20px 0 0;">
                <a href='${urlLink}' target="_blank" style="margin: 0; padding: 0 0 4px; color: #0094a8; display: inline-block;">${
              nameStepLineElement.title
            }</a><br />
                <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">${moment(
                  nameStepLineElement.date
                ).format('YYYY년 MM월 DD일 HH:mm')}&nbsp;&nbsp;&nbsp;&nbsp;${
              nameStepLineElement?.mediaName || ''
            }&nbsp;&nbsp;&nbsp;&nbsp;${nameStepLineElement?.authors || ''}</span><br />
                <span style="margin: 0; padding: 0; color: #4e5050; font-size: 12px;">논조: ${
                  nameStepLineElement?.tone || ''
                }&nbsp;&nbsp;&nbsp;&nbsp;매체 지수: ${getCurrencyFormat(nameStepLineElement?.mediaValue || '')}</span>
              </td>
            </tr>
            `)
          }
        }
        sourceHTML =
          header + firstLine + nameStepLine + newsStepTitleLine + secondLine + newsStepListLine + lastLine + footer
      }
      if (isType && isType === 'file') {
        const wordssss = await asBlob(sourceHTML)
        console.log('wordssss', wordssss)
        res = new File([wordssss], `${props.nameStep.name}.doc`, { type: 'application/vnd.ms-word' })
      } else {
        asBlob(sourceHTML).then(blob =>
          // @ts-ignore
          saveAs(blob, `${props.nameStep.name}.docx`)
        )
        // const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML)
        // const fileDownload = document.createElement('a')
        // document.body.appendChild(fileDownload)
        // fileDownload.href = source
        // fileDownload.download = `${props.nameStep.name}.doc`
        // fileDownload.click()
        // document.body.removeChild(fileDownload)
      }
    } catch (e) {}

    return res
  }

  const executePdfConvert = async (props: reportPopupProps) => {
    let params: useMonitoringReportMailType = {
      request: {
        title: props.releaseStep.title,
        userIdList: [],
        extraMailList: [],
        // @ts-ignore
        objectType: 'REPORT_MONITORING',
        content: '',
        isEmail: true,
        isPdf: true,
      },
    }
    try {
      const contentHtml = await executeEmailHtml(props)
      if (contentHtml !== '') {
        params.request.content = contentHtml
      }
      const res = await monitoringReportReportPDF.mutateAsync(params)
      if (res) {
        const pdfFile = res as Blob
        const blob = new Blob([pdfFile], { type: 'application/pdf' })

        const downloadUrl = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = downloadUrl
        // @ts-ignore
        link.download = `${props.releaseStep.title}.pdf`
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(link)
      } else {
        openToast('보고서 다운로드에 실패하였습니다', 'error')
      }
    } catch (e) {}
  }

  const reportEmailSenderCheck = async (props: reportPopupProps) => {
    let isProcess = false
    if (props.nameStep.name === '') {
      openToast('보고서 제목을 입력해주세요', 'error')
    } else if (props.releaseStep.title === '') {
      openToast('메일 제목을 입력해주세요', 'error')
    } else if (props.releaseStep.receiverList.length < 1) {
      if (props.releaseStep.targetEmail.length < 1) {
        openToast('수신자를 입력하지 않았습니다', 'error')
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    return isProcess
  }

  const selectedDeleteAction = async (e: number) => {
    let returnValue = ''
    const { status, message } = await userNewsDelete.mutateAsync(e)
    if (status === 'S') {
      openToast(message?.message, 'success')
      returnValue = status
    } else {
      openToast(message?.message, 'error')
    }
    return returnValue
  }

  const checkDuplicateNews = async (params: MonitoringSearchNewsDocumentDto) => {
    let duplicationData: string[] | null = null
    const find = newsDuplicationIdList.find(k => k === params.newsid)
    if (find) {
      duplicationData = null
    } else {
      if (
        //@ts-ignore
        params.owner.link_summary &&
        //@ts-ignore
        params.owner.link_summary !== '' &&
        //@ts-ignore
        params.owner.link_title &&
        //@ts-ignore
        params.owner.link_title !== '' &&
        //@ts-ignore
        params.owner.link_id &&
        //@ts-ignore
        params.owner.link_id !== ''
      ) {
        duplicationData = [
          //@ts-ignore
          params.owner.link_id.toString(),
          //@ts-ignore
          params.owner.link_title.toString(),
          //@ts-ignore
          params.owner.link_summary.toString(),
        ]
      }
    }
    dispatch(newsCheckDuplicateParamAction(duplicationData))
  }

  const getOwnerInformation = async (e: number) => {
    let res: UserDto | null = null
    const { status, data, message } = await apiGetOneUser(e)
    if (status === 'S') {
      res = data as UserDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const ownerFunction = async (param: ESearchNewsOwner) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(param.uid),
        userId: 0,
        name: '',
        email: '',
        mobile: '',
        phone: '',
        nickname: '',
        displayName: '',
        stateCode: '',
        role: '',
        department: '',
        position: '',
        timezone: '',
        landingPage: '',
        selectedGroupId: 0,
        receiveLetter: true,
        regisAt: '',
        lastLoginAt: '',
        passwdChangeAt: '',
        company: {
          companyId: 0,
          name: '',
          totalMembers: '',
          wsite: '',
        },
        groups: [],
      })
    )
  }

  const moveMediaDetail = async (props: number) => {
    await router.push(`/media/record/${props}`)
  }
  const moveJournalDetail = async (props: number) => {
    await router.push(`/contacts/record/${props}`)
  }

  const moveNewsDetail = async (id: number, param: ESearchNewsCondDto) => {
    await router.push(`/news/record/${id}`)
  }

  const execSortAllItems = async (items: SortedNewsItem[], option: SelectListOptionItem) => {
    let res = [...items]
    if (option.id === 'latest') {
      res.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    } else if (option.id === 'oldest') {
      res.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    } else if (option.id === 'mediaValue') {
      res.sort((a, b) => {
        return b.mediaValue - a.mediaValue
      })
    } else if (option.id === 'mediaName') {
      res.sort((a, b) => {
        return b.mediaName.localeCompare(a.mediaName)
      })
    }
    return res
  }

  const landingInit = () => {
    dispatch(initNewsSearchResultAction())
  }

  const autoRegisterClipbookAction = (
    userClipbookList: userAutoSaveDataProps[],
    autoClipbookId: { key: string; name: string },
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let autoCompleteData = [...userClipbookList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup || 0,
            keyValue: Number(autoClipbookId.key),
            keyName: autoClipbookId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        },
      ]
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(userClipbookListAutoSaveDataAction(autoCompleteData))
      if (type !== '') {
        openToast(
          ClipbookAutoRegisterContext({
            valueName: autoClipbookId.name,
            onChangeAction: () => {
              type === 'checked'
                ? setClipbookPopupAction(true, apiDataList ? apiDataList : [], autoClipbookId.key)
                : setOneClipbookPopupAction(true, apiDataList ? apiDataList[0] : null, autoClipbookId.key)
            },
          }),
          'success'
        )
      }
    }, 2000)
  }

  const insertNewsToClipbookId = async (
    clipbookIdKey: number[],
    newsid: number[],
    insertedDate: string[],
    autoClipbookId: { key: string; name: string },
    userClipbookList: userAutoSaveDataProps[],
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let res: any = ''
    if (autoClipbookId && autoClipbookId.key !== '' && autoClipbookId.name !== '' && userSelectGroup) {
      res = await addAutoClipbookNews(
        autoClipbookId && autoClipbookId.key !== '' ? [Number(autoClipbookId.key)] : clipbookIdKey,
        newsid,
        insertedDate
      )
      if (res === 'S') {
        autoRegisterClipbookAction(userClipbookList, autoClipbookId, type, apiDataList)
      }
    }

    return res as string
  }

  const moveToSearch = async (props: ResponseTaggingDto) => {
    if (props.tagId) {
      const query = {
        and: '',
        clipbook: { id: '', name: '선택' },
        clipbookValue: [],
        coverage: { id: '', name: '선택' },
        endPeriod: new Date(),
        informationType: { id: '', name: '선택' },
        journalistTagList: [],
        mediaBookList: [],
        mediaTagList: [],
        mediaType: [],
        mediaValue: { id: '', name: '선택' },
        news_id: 0,
        not: '',
        or: '',
        period: { id: '', name: '선택' },
        periodTag: [],
        publishingPeriod: [],
        startPeriod: new Date(),
        tag: [{ id: props.tagId, label: props.tagName }],
        tone: [],
        existMultimedia: [],
        url: '',
      }
      const filter = setObjectToBase64({ ...query })
      await router.replace(`/news/search-result?filter=${filter}`, undefined, { shallow: true })
      await init()
    }
  }

  const setMediaTypePopupTotalSelect = async (commonList: CommonCode[], props: mediaTypePopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.code?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.code?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.code?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setMediaTypePopupAction = async (
    essentialList: SelectListOptionItem[],
    e: boolean,
    props: monitoringParamsProps
  ) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempMediaType = await getCommonCode('MEDIA_TYPE')
        const list = tempMediaType.map(e => {
          return { id: e.commonCodeId.toString(), name: e.name, extra: e.count?.toString() }
        })
        dispatch(mediaTypeListAction(list))
        if (tempMediaType && tempMediaType.length > 0) {
          tempKeyword = list[0].id
        }
      } else {
        tempKeyword = essentialList[0].id
      }
      await getParentCommonCodeId(Number(tempKeyword))
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      selectedValue: tempKeyword,
      selectedType: props.mediaType,
    }
    dispatch(mediaTypePopupAction(params))
  }

  const checkAutoRegisterSelectedNewsClipbook = async (
    e: boolean,
    idList: MonitoringSearchNewsDocumentDto[],
    userClipbookList: userAutoSaveDataProps[],
    originIdList: MonitoringSearchNewsDocumentDto[],
    originId: MonitoringSearchNewsDocumentDto,
    dto: ESearchNewsCondDto
  ) => {
    let isProcess = false
    if (userClipbookList && userClipbookList.length > 0) {
      const find = userClipbookList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        if (idList && idList.length === 1 && idList[0].clipBookIdTitleList) {
          const findAutoClipbook = idList[0].clipBookIdTitleList.find(
            i => i?.id?.toString() === find.keyValue.toString()
          )
          if (findAutoClipbook) {
            isProcess = true
          } else {
            const autoProcess = await insertNewsToClipbookId(
              [],
              idList.map(e => Number(e.newsid)),
              idList.map(e => moment(e.inserted).format('YYYYMM')),
              { key: find.keyValue.toString(), name: find.keyName },
              userClipbookList,
              'checked',
              idList
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          isProcess = true
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    if (isProcess) {
      await setClipbookPopupAction(e, idList)
    } else {
      await afterClipbookAddReLoad(dto, originIdList, originId)
    }
  }

  const setClipbookPopupAction = async (e: boolean, idList: MonitoringSearchNewsDocumentDto[], valueKey?: string) => {
    let clipbookListNull = false
    let userClipbookList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!clipbookListNull) {
          // @ts-ignore
          if (idListProp.clipBookIdTitleList && idListProp.clipBookIdTitleList.length > 0) {
            const currentClipbookId = idListProp.clipBookIdTitleList.map(i => Number(i.id))
            if (userClipbookList.length > 0) {
              userClipbookList = userClipbookList.filter(item => currentClipbookId.includes(item))
            } else {
              userClipbookList = currentClipbookId
            }
          } else {
            clipbookListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userClipbookList.find(k => k.toString() === valueKey)
      if (!find) {
        userClipbookList = [...userClipbookList, Number(valueKey)]
        clipbookListNull = false
      }
    }
    dispatch(
      initClipbookPopupAction({
        isOpen: e,
        type: 'add',
        list: [],
        origin: [],
        except: clipbookListNull ? [] : userClipbookList,
        idList: idList,
      })
    )
  }

  const checkAutoRegisterClipbook = async (
    e: boolean,
    idList: MonitoringSearchNewsDocumentDto,
    userClipbookList: userAutoSaveDataProps[],
    originIdList: MonitoringSearchNewsDocumentDto[]
  ) => {
    let autoKey: userAutoSaveDataProps = {
      groupId: 0,
      keyValue: 0,
      keyName: '',
    }
    let isProcess = false
    if (userSelectGroup && userClipbookList && userClipbookList.length > 0) {
      const find = userClipbookList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        autoKey = {
          groupId: userSelectGroup,
          keyValue: find.keyValue,
          keyName: find.keyName,
        }
        if (idList && idList.clipBookIdTitleList && idList.clipBookIdTitleList.length > 0) {
          const isAutoClipbookid = idList.clipBookIdTitleList.find(k => Number(k.id) === Number(find.keyValue))
          if (isAutoClipbookid) {
            isProcess = true
          } else {
            const autoProcess = await insertNewsToClipbookId(
              [],
              [Number(idList.newsid)],
              [moment(idList.inserted).format('YYYYMM')],
              { key: find.keyValue.toString(), name: find.keyName },
              userClipbookList,
              'any',
              [idList]
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          const autoProcess = await insertNewsToClipbookId(
            [],
            [Number(idList.newsid)],
            [moment(idList.inserted).format('YYYYMM')],
            { key: find.keyValue.toString(), name: find.keyName },
            userClipbookList,
            'any',
            [idList]
          )
          if (autoProcess !== 'S') {
            isProcess = true
          }
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }
    console.log('isProcess', isProcess)
    if (isProcess) {
      await setOneClipbookPopupAction(e, idList)
    } else {
      await afterClipbookAdd(originIdList, idList, autoKey)
    }
  }

  const afterClipbookAdd = async (
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto,
    keyId: userAutoSaveDataProps
  ) => {
    let newsParam = originParam
    let newsList = [...originData]
    if (newsList && newsList.length > 0) {
      const find = newsList.findIndex(e => (e?.newsid || '').toString() === (newsParam?.newsid || '').toString())
      if (find !== -1) {
        newsList[find] = {
          ...newsList[find],
          // @ts-ignore
          clipBookIdTitleList:
            // @ts-ignore
            newsList[find] && newsList[find]?.clipBookIdTitleList && newsList[find]?.clipBookIdTitleList.length > 0
              ? [
                  // @ts-ignore
                  ...newsList[find].clipBookIdTitleList,
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ]
              : [
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ],
        }
      }
    }
    newsParam = {
      ...newsParam,
      // @ts-ignore
      clipBookIdTitleList:
        newsParam && newsParam?.clipBookIdTitleList && newsParam?.clipBookIdTitleList.length > 0
          ? [
              // @ts-ignore
              ...newsParam.clipBookIdTitleList,
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ]
          : [
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ],
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(
        afterClipbookAddNewsParamAction({
          list: newsList,
          newsParam: newsParam,
        })
      )
    }, 2000)
  }

  const setOneClipbookPopupAction = async (
    e: boolean,
    idList: MonitoringSearchNewsDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    // @ts-ignore
    if (idList && idList.clipBookIdTitleList && idList.clipBookIdTitleList.length > 0) {
      // @ts-ignore
      for await (const clipbookIdListProp of idList.clipBookIdTitleList) {
        list = [...list, Number(clipbookIdListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }
    dispatch(
      initClipbookPopupAction({
        isOpen: e,
        type: 'any',
        origin: list,
        list: list,
        except: [],
        idList: idList ? [idList] : [],
      })
    )
  }

  const init = async () => {
    let filterSub = subNewsFilterListList
    let filterSubActions = subNewsFilterOptionsList
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempPeriodList: SelectListOptionItem[] = []
    let tempToneList: SelectListOptionItem[] = []
    let tempMultimediaList: SelectListOptionItem[] = []
    let tempNewsInfoTypeList: SelectListOptionItem[] = []
    let preloadCommonCode: CommonCode[] = []
    let params: monitoringParamsProps = defaultMonitoringParams
    let apiParams: ESearchNewsCondDto = defaultMonitoringListParams
    let months = ''
    let startPeriod = ''
    let tempSearchKeywordOption = ''
    let endPeriod = ''
    let news_id = 0
    let isFilter = false
    let tempNewsIdParams: MonitoringSearchNewsDocumentDto | null = null
    let tempNewsList: MonitoringSearchNewsDocumentDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    dispatch(initNewsSearchResultAction())
    try {
      if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
        const subParams = window.location.search.substring(1).split('?')
        const querys = await setQueryParam(subParams)
        if (querys && querys !== '') {
          const dto = await conditionConvert(querys)
          console.log('dto', dto)
          if (dto) {
            tempSearchKeywordOption = dto.tempSearchKeywordOption
            months = dto.months
            startPeriod = dto.startPeriod
            endPeriod = dto.endPeriod
            apiParams = dto.apiParams
            isFilter = dto.isFilter
            params = dto.params
            news_id = Number(dto.newsId)
            filterSubActions = dto.tempFilterSubActions
          }
        }
        const dateValue = await changeDateSet(months === '' ? '1M' : months, startPeriod, endPeriod)
        apiParams.periodStartYear = dateValue.periodStartYear
        apiParams.periodStartMonth = dateValue.periodStartMonth
        apiParams.periodStartDay = dateValue.periodStartDay
        apiParams.periodEndYear = dateValue.periodEndYear
        apiParams.periodEndMonth = dateValue.periodEndMonth
        apiParams.periodEndDay = dateValue.periodEndDay
      }
      for await (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'MONITORING_CATEGORY') {
          dispatch(
            monitoringCategoryListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (re.id === 'TONE') {
          tempToneList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(toneListAction(tempToneList))
        } else if (re.id === 'NEWS_INFO_TYPE') {
          tempNewsInfoTypeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(informationTypeListAction([{ id: '', name: '선택' }, ...tempNewsInfoTypeList]))
        } else if (re.id === 'PUB_CYCLE') {
          dispatch(
            publishingPeriodListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (re.id === 'MEDIA_VALUE') {
          tempMediaValueList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(mediaValueListAction(preloadCommonCode))
        } else if (re.id === 'NEWS_PERIOD') {
          tempPeriodList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(periodListAction({ list: preloadCommonCode, ex: months ? months : '' }))
        } else if (re.id === 'COVERAGE_NEWS_YN') {
          dispatch(
            coverageListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_TYPE') {
          tempMediaTypeList = preloadCommonCode.map(e => {
            return { id: e.commonCodeId.toString(), name: e.name, extra: e.code }
          })
          for await (const reElement of tempMediaTypeList) {
            //@ts-ignore
            const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCommonCodeId === Number(reElement.id))
            //@ts-ignore
            if (find && find.commonCodeList && find.commonCodeList.length > 0) {
              tempMediaSubTypeList = [
                ...tempMediaSubTypeList,
                {
                  extra: reElement.extra ? reElement.extra : '',
                  id: reElement.id,
                  name: reElement.name,
                  //@ts-ignore
                  data: find.commonCodeList as CommonCode[],
                },
              ]
            }
          }
          dispatch(mediaSubTotalTypeListAction(tempMediaSubTypeList))
          dispatch(mediaTypeListAction(tempMediaTypeList))
        } else if (re.id === 'CLIPBOOK_NEWS_YN') {
          dispatch(
            clipbookListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_SUB_TYPE') {
          dispatch(
            mediaSubTypeListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (re.id === 'NEWS_SEARCH_MULTIMEDIA') {
          tempMultimediaList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(
            newsMultiMediaListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        }
      }
      await setMediaValuePoints()
      const res = await getNewsSearchByMonitoring(apiParams)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / apiParams.size)
        const find = newsData.find(k => k.newsid === news_id)
        news_id = find ? news_id : newsData.length > 0 ? (newsData[0].newsid ? newsData[0].newsid : 0) : 0
        tempNewsIdParams = find ? find : newsData.length > 0 ? (newsData[0] ? newsData[0] : null) : null
        tempNewsList = newsData
        tempPageCount = {
          totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
          totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
        }
        if (isFilter) {
          const apiDtoInit = {
            ...apiParams,
            filterCategoryList: [],
            filterMediaNameList: [],
            filterValue: '',
            filterSourceType: [],
            filterTone: [],
            filterPeriodStartYear: '',
            filterPeriodStartMonth: '',
            filterPeriodStartDay: '',
            filterPeriodEndYear: '',
            filterPeriodEndMonth: '',
            filterPeriodEndDay: '',
          }
          delete apiDtoInit.filterVideo
          delete apiDtoInit.filterImage
          const getFilterData = await getNewsSearchByMonitoring(apiDtoInit)
          if (getFilterData) {
            filterSub = await getFilterOptionControlData(
              getFilterData,
              apiParams,
              months,
              tempToneList,
              tempNewsInfoTypeList,
              tempMediaTypeList,
              tempPeriodList,
              tempMediaSubTypeList,
              tempMediaValueList,
              tempMultimediaList
            )
          }
        } else {
          filterSub = await getFilterOptionControlData(
            res,
            apiParams,
            months,
            tempToneList,
            tempNewsInfoTypeList,
            tempMediaTypeList,
            tempPeriodList,
            tempMediaSubTypeList,
            tempMediaValueList,
            tempMultimediaList
          )
        }
        console.log('filterSub', filterSub)
        if (
          tempNewsIdParams !== null &&
          !tempNewsIdParams.isSysInfo &&
          tempNewsIdParams.link &&
          tempNewsIdParams.link !== '' &&
          tempNewsIdParams.owner?.uid &&
          tempNewsIdParams.owner?.uid === userInfo.userId
        ) {
          await checkDuplicateNews(tempNewsIdParams)
        } else {
          dispatch(newsCheckDuplicateParamAction(null))
        }
      }
    } catch (e) {}
    dispatch(initStateClipbookListPopup())
    dispatch(
      setNewsInitDataAction({
        params,
        apiParams,
        news_id,
        months,
        filterSubParam: filterSub,
        newsList: tempNewsList,
        pageCount: tempPageCount,
        newsIdParams: tempNewsIdParams,
        filterSubActions,
        tempSearchKeywordOption,
      })
    )
  }

  const getFilterOptionControlData = async (
    origin: ElasticSearchReturnDtoNewsDocumentDto,
    props: ESearchNewsCondDto,
    months: string,
    tempToneList: SelectListOptionItem[],
    tempNewsInfoTypeList: SelectListOptionItem[],
    tempMediaTypeList: SelectListOptionItem[],
    tempPeriodList: SelectListOptionItem[],
    tempMediaSubTypeList: mediaSubTypeListProps[],
    tempMediaValueList: SelectListOptionItem[],
    tempMultimediaList: SelectListOptionItem[]
  ) => {
    let filterSub: NavigationLinkItem[] = [
      {
        id: 'filterPeriod',
        title: '기간',
        subMenus: [],
      },
      {
        id: 'filterCategoryList',
        title: '미디어유형',
        subMenus: [],
      },
      {
        id: 'filterInformation',
        title: '매체 지수',
        subMenus: [],
      },
      {
        id: 'filterMediaNameList',
        title: '매체명',
        subMenus: [],
      },
      {
        id: 'filterTone',
        title: '논조',
        subMenus: [],
      },
      {
        id: 'filterMultimedia',
        title: '멀티미디어',
        subMenus: [],
      },
      {
        id: 'filterSourceType',
        title: '정보 유형',
        subMenus: [],
      },
    ]
    if (tempPeriodList.length > 0) {
      filterSub[0].subMenus = await filterPeriod(months, tempPeriodList)
    }
    if (origin.filterTone && origin.filterTone.length > 0) {
      filterSub[4].subMenus = await filterAdjust(origin.filterTone, tempToneList)
    }
    if (tempMediaValueList.length > 0) {
      filterSub[2].subMenus = await filterMediaValue(tempMediaValueList, props)
      console.log('filterSub[2].subMenus', filterSub[2].subMenus)
    }
    if (origin.filterMultimedia && origin.filterMultimedia.length > 0) {
      filterSub[5].subMenus = await filterAdjust(origin.filterMultimedia, tempMultimediaList)
    }
    if (origin.filterSourceType && origin.filterSourceType.length > 0) {
      filterSub[6].subMenus = await filterAdjust(origin.filterSourceType, tempNewsInfoTypeList)
    }
    if (origin.filterType && origin.filterType.length > 0 && origin.filterSubtype && origin.filterSubtype.length > 0) {
      filterSub[1].subMenus = await filterMediaTypeAdjust(
        origin.filterType,
        origin.filterSubtype,
        tempMediaTypeList,
        tempMediaSubTypeList
      )
    }
    if (
      origin.filterMediaName &&
      origin.filterMediaName.length > 0 &&
      origin.filterMediaId &&
      origin.filterMediaId.length > 0
    ) {
      filterSub[3].subMenus = await filterNonListAdjust(origin.filterMediaName, origin.filterMediaId)
    }

    console.log('getFilterOptionControlData', filterSub)
    return filterSub
  }

  const getCommonCode = async (code: string, exParams?: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const editTaggingAction = async (
    props: MbTagSearchTagItem[],
    targetIdList: MonitoringSearchNewsDocumentDto[],
    type: string,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    let res = undefined
    let param: TaggingProps = {
      category: 'NEWS',
      tagIdList: [],
      targetList: [],
    }
    if (props.length > 0) {
      for (const tagIdListElement of props) {
        param.tagIdList = [...param.tagIdList, Number(tagIdListElement.id)]
      }
    }
    if (targetIdList.length > 0) {
      for (const targetIdElement of targetIdList) {
        param.targetList = [
          ...param.targetList,
          {
            targetId: Number(targetIdElement.newsid),
            newsIndexName: moment(targetIdElement.inserted).format('YYYYMM'),
          },
        ]
      }
    }
    if (param.tagIdList.length > 0 && param.targetList.length > 0) {
      if (type === 'add') {
        res = await actionTaggingAddFunction(param, dto, originData, originParam)
      } else if (type === 'delete') {
        res = await actionTaggingExceptFunction(param, dto, originData, originParam)
      } else {
        res = await actionTaggingResetFunction(param, dto, originData, originParam)
      }
    }
    if (res === 'S') {
      dispatch(doneTagAction())
    }
  }

  const moveToResearch = async (props: monitoringParamsProps) => {
    const param = {
      keyword: {
        and: props.and,
        or: props.or,
        not: props.not,
      },
      extra: {
        period: props.period,
        startPeriod: props.startPeriod,
        endPeriod: props.endPeriod,
        periodTag: props.periodTag,
        mediaType: props.mediaType,
        mediaValue: props.mediaValue,
        mediaTagList: props.mediaTagList,
        journalistTagList: props.journalistTagList,
        tone: props.tone,
        existMultimedia: props?.existMultimedia || [],
        tag: props.tag,
        url: props.url,
        publishingPeriod: props.publishingPeriod,
        mediaBookList: props.mediaBookList,
        clipbookValue: props.clipbookValue,
        clipbook: props.clipbook,
        coverage: props.coverage,
        informationType: props.informationType,
      },
    }
    const res = setObjectToBase64({ ...param.keyword, ...param.extra })
    await router.push(`/news/search?filter=${res}`)
  }

  const actionTaggingAddFunction = async (
    param: TaggingProps,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    const { status, data, message } = await actionTaggingAdd.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAddReLoad(dto, originData, originParam)
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingExceptFunction = async (
    param: TaggingProps,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    let params = {
      category: param.category,
      tagIdList: param.tagIdList,
      targetIdList: param.targetList.map(e => {
        return Number(e.targetId)
      }),
    }
    // @ts-ignore
    const { status, data, message } = await actionTaggingAddExcept.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAddReLoad(dto, originData, originParam)
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingResetFunction = async (
    param: TaggingProps,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    const { status, data, message } = await actionTaggingReset.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAddReLoad(dto, originData, originParam)
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const getOneGroup = async () => {
    let newTagItems: NavigationLinkItem[] = []
    const { status, data: apiData, message } = await apiGetOneGroup(userSelectGroup)
    if (status === 'S') {
      const res = apiData as GroupDto
      const newUsers = getSortedUserArray(res.users)
      for await (const newUser of newUsers) {
        if (newUser.userId && newUser.email) {
          newTagItems = [
            ...newTagItems,
            {
              id: newUser?.userId?.toString() ?? '',
              title: `${newUser?.name}` + ' ' + `${newUser?.email || ''}`,
              pathLink: `${newUser?.email || ''}`,
            },
          ]
        }
      }
      //dispatch(userListAction(newTagItems))
    } else {
      openToast(message?.message, 'error')
    }

    return newTagItems
  }

  const setMediaValuePoints = async () => {
    const { status, data: apiData, message } = await apiGetMediaValuePoints()
    if (status === 'S') {
      dispatch(mediaValuePointListAction(apiData as ValuePointListProps[]))
    }
  }

  const getParentCommonCodeId = async (code: number) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({
      parentCode: 'MEDIA_SUB_TYPE',
      parentCommonCodeId: Number(code),
    })
    if (status === 'S') {
      res = data as CommonCode[]
    } else {
      openToast(message?.message, 'error')
    }

    dispatch(mediaTypePopupListAction(res))

    return res
  }

  return {
    monitoringActivate,
    userSelectGroup,
    licenseInfo,
    userInfo,
    isOwner,
    monitoringDate,
    monitoringCategoryKeyword,
    keyDateList,
    monitoringCategoryList,
    pageCount,
    monitoringListParams,
    monitoringCategoryButton,
    monitoringListParamKeyword,
    monitoringParams,
    newsList,
    newsIdKey,
    monitoringParamsExpandButton,
    toneList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    searchContentKeyList,
    newsIdParams,
    mediaValueList,
    informationTypeList,
    coverageList,
    clipbookList,
    mediaTypeList,
    mediaTypePopup,
    mediaTypePopupList,
    newsLoading,
    monitoringAnalysisPopup,
    monitringAnalysis,
    isNoticePopup,
    tagPopup,
    reportPopup,
    mediaSubTypeList,
    filterSubParamActions,
    filterSubParam,
    isLimitFilter,
    userPopup,
    newsCheckDuplicateParam,
    deletePopup,
    fileDownloadPopup,
    mediaValuePointList,
    reportCancelPopup,
    userClipbookListAutoSaveData,
    timeZone,
    mediaSubTotalTypeList,
    isDemoLicense,
    searchLimitAlarm,
    newsMultiMediaList,

    keywordSearch,
    setChangeCategoryDate,
    handleChangeSize,
    handlePaginationChange,
    handleChangeSort,
    exportToExcel,
    init,
    openMonitoringPopup,
    changeSearchOption,
    monitoringDataToChart,
    editTaggingAction,
    setAddExtraFilterSearch,
    setAddAllExtraFilterSearch,
    moveToResearch,
    setExtractExtraFilterSearch,
    setAddExtraDateFilterSearch,
    setAddExtraSelectedFilterSearch,
    setInitFilterSubParamActions,
    setAddExtraCustomDateFilterSearch,
    moveNewsDetail,
    moveMediaDetail,
    moveJournalDetail,
    ownerFunction,
    selectedDeleteAction,
    reportEmailSenderCheck,
    executePdfConvert,
    executeWordDownload,
    reportEmailSender,
    landingInit,
    checkAutoRegisterClipbook,
    checkAutoRegisterSelectedNewsClipbook,
    setMediaTypePopupAction,
    setMediaTypePopupTotalSelect,
    moveToSearch,
    afterClipbookAdd,
    afterClipbookAddReLoad,

    mediaTypePopupAdjust,
    setAllSearchContentKeyList,
    setMonitoringCategoryKeywordAction,
    setMonitoringListParamKeywordActionAction,
    setMonitoringParamsExpandButtonAction,
    setMonitoringCategoryButtonAction,
    setSearchContentKeyList,
    setNewsIdParamsAction,
    setkeywordsActionAnd,
    setkeywordsActionOr,
    setkeywordsActionNot,
    setAdditionalParamMediaValue,
    setAdditionalParamMediaTagList,
    setAdditionalParamJournalistTagList,
    setAdditionalParamTagSuccess,
    setAdditionalParamTagStatusOnChange,
    setAdditionalParamUrl,
    setAdditionalParamMediaBookList,
    setAdditionalParamClipbook,
    setAdditionalParamCoverage,
    setAdditionalParamInformationType,
    setAdditionalParamClipbookList,
    setTagControl,
    setTagDeleteControl,
    setMediaTypePopupSelectedValue,
    setDeleteSelectedTypeMediaTypePopup,
    setMediaTypePopupDeleteTotalSelect,
    setSelectedTypeMediaTypePopup,
    setResetSearchOption,
    setTagControlSearch,
    setTagDeleteControlSearch,
    openMonitoringAnalysisPopup,
    initMonitoringAnalysisPopup,
    setIsNoticePopupPopup,
    setInitTagPopupAction,
    setMonitoringReportPopupTitleOnChange,
    setMonitoringReportPopupStepOnChange,
    setInitMonitoringReportPopup,
    setOpenFilterSubParamActions,
    setUserProfilePopupAction,
    setNoticeClose,
    setSelectedDeleteData,
    setCloseMonitoringReportPopup,
    setCheckReportPopup,
    setMonitoringReportPopupNewsGroupType,
    setMonitoringReportPopupNewsGrouping,
    setMonitoringReportPopupNewsArrayList,
    setMonitoringReportPopupIsDragging,
    setMonitoringReportPopupDragOver,
    setMonitoringReportPopupDeleteNewsArrayList,
    setMonitoringReportPopupDeleteGroupingNews,
    setMonitoringReportPopupGroupDragOver,
    setMonitoringReportPopupGroupIndexChange,
    setMonitoringReportPopupTargetEmailpAction,
    setMonitoringReportPopupResetTagListOnChange,
    setMonitoringReportPopupTagListOnChange,
    setMonitoringReportPopupResetAddEmail,
    setMonitoringReportPopupTargetEmailCloseOnChange,
    setMonitoringReportPopupResetTargetEmailCloseOnChange,
    setMonitoringReportPopupSharedPopupContentAction,
    setMonitoringReportReleaseTabAction,
    setMonitoringReportReleaseFormAction,
    setMonitoringReportPopupTitle,
    setMonitoringReportPopupActivityOpenOpen,
    setMonitoringReportPopupKeywordsOnChange,
    setMonitoringReportPopupKeywordsDelete,
    setMonitoringReportReleaseKeywordsSearchDataAction,
    setSelectedExcelFileData,
    tagEdit,
    setMediaTypePopupSelectedItem,
  }
}
