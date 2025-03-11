import { ChangeEvent, useCallback, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { asBlob } from 'html-docx-js-typescript'
import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'
import jsPDF from 'jspdf'
import _ from 'lodash'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import { ClipbookAddContext } from '~/components/contents/common/forms/ClipbookListPopup/ClipbookAutoRegisterContext'
import {
  defaultClipbookParamList,
  extendedCommonCodeTargetList,
  subNewsFilterListList,
  subNewsFilterOptionsList,
} from '~/components/contents/monitoring/Clipbook/Result/defaultData'
import { ClipbookAutoRegisterContext } from '~/components/contents/monitoring/Clipbook/Result/Popup/AutoRegisterContext'
import {
  defaultReportGroupingStringLastLine,
  defaultReportGroupingStringThirdLine,
  defaultReportStringFirstLine,
  defaultReportStringSecondLine,
  defaultReportStringThirdLine,
  newsAutoGroupingOptionList,
} from '~/components/contents/monitoring/MonitoringList/defaultData'
import { ALLOWED_ORIGINS, EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION, SVC_DOMAIN_URL } from '~/constants/common'
import {
  newsDuplicationIdListSaga,
  userAutoSaveDataProps,
  userClipbookListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import {
  clipbookNewsListDto,
  filterSubParamActionsProps,
  monitoringAnalysisPopupProps,
  MonitoringDataToChartProps,
} from '~/stores/modules/contents/monitoring/clipbookDetail'
import {
  afterClipbookAddNewsListAction,
  afterClipbookAddNewsParamAction,
  clipbookListLoadingAction,
  clipbookNewsCheckDuplicateParamAction,
  contentDeletePopupAction,
  deletePopupAction,
  doneTagAction,
  fileDownloadPopupAction,
  filterSubParamActionsAction,
  informationTypeListAction,
  initClipbookDetailAction,
  initMonitoringAnalysisPopupAction,
  initReportPopupAction,
  initTagPopupAction,
  isClipbookFilterSubParamAction,
  isFilterSubParamAction,
  isLimitFilterAction,
  isNoticePopupAction,
  isSelectedAllNewsIdAction,
  mediaSubTotalTypeListAction,
  mediaSubTypeListAction,
  mediaTypeListAction,
  mediaValueListAction,
  mediaValuePointListAction,
  monitoringAnalysisPopupAction,
  monitoringCategoryButtonAction,
  newsIdParamsAction,
  newsKeywordAction,
  newsLoadingAction,
  newsMultiMediaListAction,
  periodListAction,
  reportPopupAction,
  reportPopupActivityOpenAction,
  searchContentKeyListAction,
  searchLimitAlarmAction,
  setChangeClipbookTargetIdAction,
  setCheckReportPopupAction,
  setDoneReportPopupAction,
  setFilterClipbookDataAction,
  setNewsInitDataAction,
  setOnChangeMonitoringSearchOptionAction,
  setOnChangeOptionIdAction,
  setOnChangeSearchOptionAction,
  setResetFilterClipbookDataAction,
  tagPopupAction,
  toneListAction,
  userPopupAction,
} from '~/stores/modules/contents/monitoring/clipbookDetail'
import {
  clipbookDataListProps,
  initClipbookPopupAction,
  initStateClipbookListPopup,
} from '~/stores/modules/contents/monitoring/clipbookListPopup'
import {
  ChartDataProps,
  ChartLineProps,
  ChartProps,
  groupingNewsListProps,
  reportPopupProps,
  SortedNewsItem,
  ValuePointListProps,
} from '~/stores/modules/contents/monitoring/monitoringSearch'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { contentDeletePopupProps } from '~/stores/modules/contents/pressMedia/savedSearch'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  type AddDelNewsAndPrDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  type ESearchNewsOwner,
  type PageClipBookDto,
  ResponseTaggingDto,
  type UserDto,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MediaNameCountType, MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { useDeleteClipbook } from '~/utils/api/clipbook/useDeleteClipbook'
import { UseGetClipbooksParams, usePostClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { usePostUpdateClipbookToNewsPr } from '~/utils/api/clipbook/usePostUpdateClipbookToNewsPr'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { apiGetOneGroup } from '~/utils/api/group/useGetOneGroup'
import { apiGetMediaValuePoints } from '~/utils/api/media/useGetMediaValuePoints'
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
import { CostomFont } from '~/utils/common/NotoSansKR-Regular'
import { getCurrencyFormat } from '~/utils/common/number'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useUserSort } from '~/utils/hooks/contents/admin/useUserSort'

export const useClipbookDetail = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getSortedUserArray } = useUserSort()
  const {
    toneList,
    informationTypeList,
    mediaTypeList,
    mediaSubTypeList,
    newsLoading,
    isOwner,
    filterSubParamActions,
    filterSubParam,
    monitoringListParams,
    pageCount,
    newsList,
    newsIdKey,
    newsIdParams,
    clipbookCategory,
    clipbookIdKey,
    clipbookDataCatgory,
    isFilterSubParam,
    newsKeyword,
    monitoringCategoryButton,
    searchContentKeyList,
    monitoringAnalysisPopup,
    isSelectedAllNewsId,
    isTagButton,
    tagPopup,
    isLimitFilter,
    isNoticePopup,
    reportPopup,
    mediaValuePointList,
    newsCheckDuplicateParam,
    deletePopup,
    userPopup,
    clipbookListLoading,
    mediaSubTotalTypeList,
    mediaValueFilterList,
    contentDeletePopup,
    fileDownloadPopup,
    reportCancelPopup,
    periodList,
    arrayclipbookAuth,
    searchLimitAlarm,
    newsMultiMediaList,
  } = useAppSelector(state => state.monitoringClipbookDetailSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)
  const { newsDuplicationIdList, userClipbookListAutoSaveData } = useAppSelector(state => state.extraSlice)

  const userNewsDelete = useDeleteCustomNews()
  const getClipbookByCatgoryList = usePostClipbooks()
  const getNewsSearchResult = usePostNewsSearch()
  const newsToClipbookAction = usePostUpdateClipbookToNewsPr()
  const actionTaggingAdd = usePostTaggingAdd()
  const actionTaggingReset = usePostTaggingReset()
  const actionTaggingAddExcept = usePostTaggingExcept()
  const newsExcel = useGetNewsExcel()
  const monitoringReportSend = useMonitoringReportAction()
  const deleteClipbook = useDeleteClipbook()
  const monitoringReportReportPDF = useMonitoringReportPDFAction()

  const setInitTagPopupAction = useCallback(() => dispatch(initTagPopupAction()), [tagPopup])

  const setOpenFilterSubParamActions = useCallback(
    (e: filterSubParamActionsProps[]) => {
      dispatch(filterSubParamActionsAction(e))
    },
    [filterSubParamActions]
  )

  const setIsFilterSubParamAction = useCallback(
    async (mainId: number, subId: number, apiParams: ESearchNewsCondDto, tempOwnerKey: boolean) => {
      const filter = setObjectToBase64({
        ...apiParams,
        clipbook_id: mainId,
        news_id: subId,
        editPageOpen: true,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
      dispatch(isFilterSubParamAction(true))
    },
    [isFilterSubParam]
  )

  const setNewsKeyword = useCallback(
    (e: string) => {
      dispatch(newsKeywordAction(e))
    },
    [newsKeyword]
  )

  const setNewsIdParamsAction = useCallback(
    async (
      e: MonitoringSearchNewsDocumentDto,
      id: number,
      apiParam: ESearchNewsCondDto,
      tempOwnerKey: boolean,
      tempEditPageOpen: boolean
    ) => {
      const filter = setObjectToBase64({
        ...apiParam,
        clipbook_id: Number(id),
        news_id: e.newsid,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      dispatch(newsIdParamsAction(e))
      await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
      if (!e.isSysInfo && e.link && e.link !== '' && e.owner?.uid && e.owner?.uid === userInfo.userId) {
        await checkDuplicateNews(e)
      } else {
        dispatch(clipbookNewsCheckDuplicateParamAction(null))
      }
    },
    [newsIdParams, newsIdKey]
  )

  const setSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: MonitoringSearchNewsDocumentDto, hook: MonitoringSearchNewsDocumentDto[]) => {
      console.log('hook', hook)
      let dataList: MonitoringSearchNewsDocumentDto[] = [...hook]
      console.log('1', dataList)
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.newsid !== actionKey?.newsid)
      }
      console.log('2', dataList)
      const isOption = await calculateButtonOption(dataList)
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isOption }))
    },
    [searchContentKeyList]
  )

  const setAllSearchContentKeyList = useCallback(
    async (
      isCheck: boolean,
      origin: MonitoringSearchNewsDocumentDto[],
      newItems: MonitoringSearchNewsDocumentDto[]
    ) => {
      let isTagChecked = true
      let newItemsList = [...newItems]
      let dataList: MonitoringSearchNewsDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.newsid === item2.newsid)
      )
      for await (const newItemsListElement of dataList) {
        if (isTagChecked) {
          if (
            !newItemsListElement.isSysInfo &&
            newItemsListElement.owner &&
            newItemsListElement.owner?.uid !== userInfo.userId
          ) {
            isTagChecked = false
          }
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.newsid) {
            if (isTagChecked) {
              if (
                !dataListElement.isSysInfo &&
                dataListElement.owner &&
                dataListElement.owner?.uid !== userInfo.userId
              ) {
                isTagChecked = false
              }
            }
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isTagChecked }))
    },
    [searchContentKeyList]
  )

  const initMonitoringAnalysisPopup = useCallback(() => {
    dispatch(initMonitoringAnalysisPopupAction())
  }, [monitoringAnalysisPopup])

  const setIsNoticePopupPopup = useCallback(
    (
      e: boolean,
      newsCountList?: ChartLineProps,
      dailyNewsCountList?: ChartLineProps,
      tonePie?: ChartProps,
      mediaTypePie?: ChartProps
    ) => {
      dispatch(
        isNoticePopupAction({
          isOpen: e,
          newsCountListByUpperMedia: newsCountList
            ? newsCountList
            : {
                max: 0,
                categories: [],
                data: [],
              },
          dailyNewsCountListChart: dailyNewsCountList
            ? dailyNewsCountList
            : {
                max: 0,
                categories: [],
                data: [],
              },
          tonePieChart: tonePie
            ? tonePie
            : {
                labels: [],
                series: [],
              },
          mediaTypePieChart: mediaTypePie
            ? mediaTypePie
            : {
                labels: [],
                series: [],
              },
        })
      )
    },
    [isNoticePopup]
  )

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

  const setCloseMonitoringReportPopup = useCallback(
    (e: boolean, props: MonitoringSearchNewsDocumentDto[]) => {
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

  const setSelectedDeleteContent = useCallback(
    (param: contentDeletePopupProps) => dispatch(contentDeletePopupAction(param)),
    [contentDeletePopup]
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

  const setNoticeClose = useCallback(
    (id: number) => {
      dispatch(newsDuplicationIdListSaga([...newsDuplicationIdList, id]))
    },
    [newsCheckDuplicateParam]
  )

  const setInitMonitoringReportPopup = useCallback(
    async (
      dto: ESearchNewsCondDto,
      total: number,
      e: boolean,
      valueList: ValuePointListProps[],
      toneArray: SelectListOptionItem[],
      titleNm: string
    ) => {
      let temp: SortedNewsItem[] = []
      let rankList = valueList.filter(a => Number(a.value) > 0)
      rankList = rankList.sort((a, b) => Number(b.value) - Number(a.value))
      try {
        const getList = await getTotalClipbookIdList(dto, total)
        if (getList && getList.length > 0) {
          for await (const item of getList) {
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
      } catch (e) {
        openToast('보고서 만들기를 실패하였습니다', 'error')
      }
    },
    [reportPopup]
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

  const setMonitoringReportPopupActivityOpenOpen = useCallback(
    async (e: boolean) => {
      dispatch(reportPopupActivityOpenAction(e))
    },
    [reportPopup.activityOpen]
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

  const openMonitoringAnalysisPopup = useCallback(
    async (e: boolean, i: clipbookContentListProps, key: number) => {
      dispatch(
        monitoringAnalysisPopupAction({
          isOpen: e,
          title: i.title || '',
          idKey: key,
          isLoading: true,
          dailyNewsCountList: [],
          toneCountList: [],
          newsCountListByUpperMedia: [],
          mediaTypeList: [],
          tagList: [],
          file: null,
        })
      )
    },
    [monitoringAnalysisPopup]
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
    [tagPopup.isOpen, tagPopup.tagList]
  )

  const setMonitoringCategoryButtonAction = useCallback(
    (e: boolean) => {
      dispatch(monitoringCategoryButtonAction(e))
    },
    [monitoringCategoryButton]
  )

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

  const resetClipbbokListSearchList = async (ownerKey: boolean, idKey: number) => {
    let filterParam: UseGetClipbooksParams = {
      page: 1,
      size: 100000,
      sort: 'updateAt!desc',
      groupId: userSelectGroup,
    }
    if (ownerKey) filterParam.ownerId = userInfo.userId
    const getClipbookByCategory = await getFilter(filterParam, idKey)
    dispatch(setResetFilterClipbookDataAction(getClipbookByCategory.list))
  }

  const setAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    try {
      let filterCount = 0
      let filterDto = {
        ...apiParam,
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
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
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
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(
              filterSubParamActionsProp.values[0],
              apiParam.filterPeriodStartYear +
                '-' +
                apiParam.filterPeriodStartMonth +
                '-' +
                apiParam.filterPeriodStartDay,
              apiParam.filterPeriodEndYear + '-' + apiParam.filterPeriodEndMonth + '-' + apiParam.filterPeriodEndDay
            )
            filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
            filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
            filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
            filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
            filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
            filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
          }
        }
      }

      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setIsCloseFilterSubParamAction = async (mainId: number, hook: ESearchNewsCondDto, tempOwnerKey: boolean) => {
    try {
      const apiParam = {
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
      delete apiParam.filterImage
      delete apiParam.filterVideo
      dispatch(newsLoadingAction(true))
      const res = await getNewsSearchByMonitoring(apiParam)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / apiParam.size)
        const filter = setObjectToBase64({
          ...apiParam,
          clipbook_id: Number(mainId),
          news_id: newsData.length > 0 ? (newsData[0].newsid ? Number(newsData[0].newsid) : 0) : 0,
          editPageOpen: false,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        dispatch(
          isClipbookFilterSubParamAction({
            apiParams: apiParam,
            tempNewsList: newsData,
            tempPageCount: {
              totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
            },
            filterSubParamActions: subNewsFilterOptionsList,
            filterSub: await getFilterOptionControlData(
              res,
              apiParam,
              toneList,
              informationTypeList,
              mediaTypeList,
              periodList,
              mediaSubTotalTypeList,
              mediaValueFilterList,
              newsMultiMediaList
            ),
          })
        )
        await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
        if (
          newsData &&
          newsData.length > 0 &&
          !newsData[0].isSysInfo &&
          newsData[0].link &&
          newsData[0].link !== '' &&
          newsData[0].owner?.uid &&
          newsData[0].owner?.uid === userInfo.userId
        ) {
          await checkDuplicateNews(newsData[0])
        } else {
          dispatch(clipbookNewsCheckDuplicateParamAction(null))
        }
      }
    } catch (e) {}
    dispatch(newsLoadingAction(false))
  }

  const selectedClipbookDeleteAction = async (param: contentDeletePopupProps, idKey: number, ownerKey: boolean) => {
    const { status, data, message } = await deleteClipbook.mutateAsync(Number(param.key))
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (idKey.toString() === param.key.toString()) {
        await router.replace('/contacts/list-result')
        router.reload()
      } else {
        await resetClipbbokListSearchList(ownerKey, idKey)
        dispatch(contentDeletePopupAction({ isOpen: false, key: 0, title: '', type: '' }))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const calculateChangeValueCheck = (newValue: number[], origin: number[]) => {
    let res = false
    if (newValue.length === 0 && origin.length === 0) {
      res = false
    } else if (newValue.length === 0 && origin.length > 0) {
      res = true
    } else if (newValue.length > 0 && origin.length === 0) {
      res = true
    } else {
      if (origin.length > 0) {
        const newValueBigger = newValue.filter(item => !origin.includes(item))
        const originBigger = origin.filter(item => !newValue.includes(item))
        const changeValue = [...newValueBigger, ...originBigger]
        if (changeValue && changeValue.length > 0) {
          res = true
        }
      } else {
        res = true
      }
    }

    return res
  }

  const setChangeCategoryId = async (e: clipbookContentListProps, tempEditPage: boolean, tempOwnerKey: boolean) => {
    let news_id = 0
    let isAuth = false
    let clipbook_id = 0
    let tempClipbookData: clipbookContentListProps = e
    let tempNewsIdParams: MonitoringSearchNewsDocumentDto | null = null
    let tempNewsList: MonitoringSearchNewsDocumentDto[] = []
    let filterSub = subNewsFilterListList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      page: 1,
      size: 20,
      clipbook: 'Y',
      clipbookIdList: [],
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      groupId: userSelectGroup,
    }
    if (e) {
      clipbook_id = e?.clipBookId ? e?.clipBookId : 0
      isAuth = userInfo.userId === e.owner?.userId ? true : e?.shareCode === 'WRITABLE'
      apiParams.clipbookIdList = e?.clipBookId ? [e?.clipBookId] : []
    }
    dispatch(
      setChangeClipbookTargetIdAction({
        apiParams,
        clipbook_id,
        arrayClipbookAuth: isAuth,
      })
    )
    dispatch(newsLoadingAction(true))
    const res = await getNewsSearchByMonitoring(apiParams)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / apiParams.size)
      const filter = setObjectToBase64({
        ...apiParams,
        clipbook_id: clipbook_id,
        news_id: 0,
        editPageOpen: tempEditPage,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
      filterSub = await getFilterOptionControlData(
        res,
        apiParams,
        toneList,
        informationTypeList,
        mediaTypeList,
        periodList,
        mediaSubTotalTypeList,
        mediaValueFilterList,
        newsMultiMediaList
      )
      news_id = newsData && newsData.length > 0 ? (newsData[0].newsid ? newsData[0].newsid : 0) : 0
      tempNewsIdParams = newsData && newsData.length > 0 ? (newsData[0] ? newsData[0] : null) : null
      tempNewsList = newsData && newsData.length > 0 ? newsData : []
      tempPageCount = {
        totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
        totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
      }
    }
    dispatch(
      setOnChangeOptionIdAction({
        tempNewsList,
        tempNewsIdParams,
        news_id,
        tempPageCount,
        tempClipbookData,
        filterSub,
        filterSubParamActions: subNewsFilterOptionsList,
      })
    )
    if (
      tempNewsIdParams &&
      !tempNewsIdParams.isSysInfo &&
      tempNewsIdParams.link &&
      tempNewsIdParams.link !== '' &&
      tempNewsIdParams.owner?.uid &&
      tempNewsIdParams.owner?.uid === userInfo.userId
    ) {
      await checkDuplicateNews(tempNewsIdParams)
    } else {
      dispatch(clipbookNewsCheckDuplicateParamAction(null))
    }
    dispatch(newsLoadingAction(false))
  }

  const setOwnerKey = async (tempOwnerKey: boolean, tempEditPage: boolean) => {
    const filter = setObjectToBase64({
      editPageOpen: tempEditPage,
      ownerKey: tempOwnerKey ? userInfo.userId : 0,
    })
    await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
    await init()
  }

  const monitoringDataToChart = async (props: monitoringAnalysisPopupProps, dto: ESearchNewsCondDto, total: number) => {
    let res: MonitoringDataToChartProps = {
      mediaTypePieChart: {
        labels: [],
        series: [],
      },
      tonePieChart: {
        labels: [],
        series: [],
      },
      newsCountListByUpperMedia: {
        max: 0,
        categories: [],
        data: [],
      },
      dailyNewsCountList: {
        max: 0,
        categories: [],
        data: [],
      },
    }
    try {
      const getList = await getTotalClipbookAnalysis(dto, total)
      if (getList !== null) {
        if (getList.filterTone && getList.filterTone.length > 0 && toneList && toneList.length > 0) {
          let tempToneChartList: ChartDataProps[] = []
          let tempTone: { name: string; count: number }[] = []
          for await (const paramElement of getList.filterTone) {
            const find = toneList.find(e => e.id === Object.keys(paramElement)[0])
            const count = Object.values(paramElement)[0] as any
            tempToneChartList = [
              ...tempToneChartList,
              {
                name: find ? (find.name ? find.name : '') : '',
                count: count ? Number(count) : 0,
              },
            ]
          }
          if (tempTone.length > 0) {
            tempToneChartList = tempTone.sort((a, b) => a.name.localeCompare(b.name))
          }
          if (tempToneChartList.length > 0) {
            res.tonePieChart.labels = tempToneChartList.map(item => item.name)
            res.tonePieChart.series = tempToneChartList.map(item => item.count)
          }
        }
        if (
          getList.filterSubtype &&
          getList.filterSubtype.length > 0 &&
          mediaSubTotalTypeList &&
          mediaSubTotalTypeList.length > 0
        ) {
          let tempMediaTypeList: ChartDataProps[] = []
          for await (const paramElement of getList.filterSubtype) {
            const find = await mediaSubTotalTypeListConvert(mediaSubTotalTypeList, Object.keys(paramElement)[0])
            const count = Object.values(paramElement)[0] as any
            tempMediaTypeList = [
              ...tempMediaTypeList,
              {
                name: find ? find : '',
                count: count ? Number(count) : 0,
              },
            ]
          }
          const maxCountSort = await calculateMaxSort(tempMediaTypeList, 'max8')
          if (tempMediaTypeList.length > 0) {
            res.mediaTypePieChart.labels = maxCountSort.map(item => item.name)
            res.mediaTypePieChart.series = maxCountSort.map(item => item.count)
          }
        }
        if (getList.filterDate && getList.filterDate.length > 0) {
          let tempDailyNewsCountList: ChartDataProps[] = []
          for await (const paramElement of getList.filterDate) {
            const count = Object.values(paramElement)[0] as any
            if (count && Number(count) > 0) {
              tempDailyNewsCountList = [
                ...tempDailyNewsCountList,
                {
                  name: Object.keys(paramElement)[0] ? Object.keys(paramElement)[0] : '',
                  count: count ? Number(count) : 0,
                },
              ]
            }
          }
          tempDailyNewsCountList.sort(
            (a, b) => Number(moment(b.name).format('YYYYMMDD')) - Number(moment(a.name).format('YYYYMMDD'))
          )
          if (tempDailyNewsCountList.length >= 30) {
            tempDailyNewsCountList = tempDailyNewsCountList.slice(0, 30)
          }
          tempDailyNewsCountList.sort(
            (a, b) => Number(moment(a.name).format('YYYYMMDD')) - Number(moment(b.name).format('YYYYMMDD'))
          )
          res.dailyNewsCountList.max = await calculateMaxCount(tempDailyNewsCountList.map(item => Number(item.count)))
          res.dailyNewsCountList.categories = tempDailyNewsCountList.map(item => moment(item.name).format('MM/DD'))
          res.dailyNewsCountList.data = tempDailyNewsCountList.map(item => item.count)
        }
        if (getList.filterMediaName && getList.filterMediaName.length > 0) {
          let tempNewsCountListByUpperMedia: ChartDataProps[] = []
          for await (const paramElement of getList.filterMediaName) {
            const count = Object.values(paramElement)[0] as any
            tempNewsCountListByUpperMedia = [
              ...tempNewsCountListByUpperMedia,
              {
                name: Object.keys(paramElement)[0] ? Object.keys(paramElement)[0] : '',
                count: count ? Number(count) : 0,
              },
            ]
          }
          const maxCountSort = await calculateMaxSort(tempNewsCountListByUpperMedia, 'max10')
          res.newsCountListByUpperMedia.max = await calculateMaxCount(
            tempNewsCountListByUpperMedia.map(item => Number(item.count))
          )
          res.newsCountListByUpperMedia.categories = maxCountSort.map(item => item.name)
          res.newsCountListByUpperMedia.data = maxCountSort.map(item => Number(item.count))
        }
      }
    } catch (e) {}

    return res
  }

  const createIncrementArray = async (maxValue: number, increment: number) => {
    const length = Math.ceil(maxValue / increment) + 1
    return Array.from({ length }, (_, i) => i * increment).filter(num => num <= maxValue)
  }

  const calculateMaxCount = async (confitions: number[]) => {
    let isDone = false
    let res = Math.max(...confitions)
    const numberList = await createIncrementArray(100000, 50)

    for await (const re of numberList) {
      if (!isDone) {
        if (Number(res) <= Number(re)) {
          res = Number(re)
          isDone = true
        }
      }
    }

    return res
  }

  const calculateMaxSort = async (
    confitions: {
      name: string
      count: number
    }[],
    type: string
  ) => {
    let maxCount = 0
    let res: {
      name: string
      count: number
    }[] = []
    const numberList = confitions.sort((a, b) => b.count - a.count)
    for await (const re of numberList) {
      if (res.length > 6) {
        if (numberList.length === 8 && type === 'max8') {
          res = [...res, re]
        } else if (res.length < 10 && type === 'max10') {
          res = [...res, re]
        } else {
          maxCount += re.count
        }
      } else {
        res = [...res, re]
      }
    }
    if (numberList.length > 8 && type === 'max8') {
      res = [
        ...res,
        {
          name: '기타',
          count: maxCount,
        },
      ]
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

  const dataURLToBlob = (dataURL: any, type: string) => {
    const BASE64_MARKER = ';base64,'

    // base64로 인코딩 되어있지 않을 경우
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',')
      const contentType = parts[0].split(':')[1]
      const raw = parts[1]
      return new Blob([raw], {
        type,
      })
    }
    // base64로 인코딩 된 이진데이터일 경우
    const parts = dataURL.split(BASE64_MARKER)
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    // atob()는 Base64를 디코딩하는 메서드
    const rawLength = raw.length
    // 부호 없는 1byte 정수 배열을 생성
    const uInt8Array = new Uint8Array(rawLength) // 길이만 지정된 배열
    let i = 0
    while (i < rawLength) {
      uInt8Array[i] = raw.charCodeAt(i)
      i++
    }
    return new Blob([uInt8Array], {
      type,
    })
  }

  const makePdf = async (originString: string, fileNm: string, isDown: string) => {
    const converToImg = async (originHtml: string) => {
      const template = document.createElement('div')
      template.style.left = '-9999px'
      template.style.top = '-9999px'
      template.style.width = '100%'
      template.innerHTML = originHtml.trim()
      document.body.appendChild(template)
      // html to imageFile

      const canvas = await html2canvas(template, { scale: 1.5 })
      return canvas.toDataURL('image/png', 1.0)
    }

    const converToPdf = (imageFile: string, sFileNm: string, isDownload: string) => {
      // imageFile to pdf

      const doc = new JsPdf('p', 'mm', 'a4')
      doc.addFileToVFS('CustomFont.ttf', CostomFont)
      doc.addFont('CustomFont.ttf', 'CustomFont', 'normal')
      doc.setFont('CustomFont') // 폰트 설정
      doc.setFontSize(32)
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      doc.addImage(imageFile, 'SVG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')

      if (isDownload !== 'file') {
        doc.save(sFileNm)
      }

      return new File([doc.output('blob')], sFileNm, {
        type: 'application/pdf',
      })
    }
    // html to imageFile
    const imageFile = await converToImg(originString)

    // imageFile to Pdf
    return converToPdf(imageFile, fileNm, isDown)
  }

  const deleteClipbookNews = async (
    props: MonitoringSearchNewsDocumentDto[],
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    if (props.length > 0) {
      let newsIdItem: number[] = []
      for (const re of props) {
        if (re.newsid) {
          newsIdItem = [...newsIdItem, Number(re.newsid)]
        }
      }
      const res = await delClipbookNews([idKey], newsIdItem)
      if (res === 'S') {
        await afterForceClipbookPopupReLoad(idKey, tempOwnerKey, tempEditPageOpen, dto, originData, originParam)
      }
    }
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
        objectType: 'REPORT_CLIPBOOK',
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
      dispatch(setDoneReportPopupAction())
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
        objectType: 'REPORT_CLIPBOOK',
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

  const getTotalClipbookIdList = async (dto: ESearchNewsCondDto, total: number) => {
    let res: MonitoringSearchNewsDocumentDto[] = []
    const { status, message, data } = await getNewsSearchResult.mutateAsync({
      timezone: timeZone,
      page: 1,
      size: total,
      clipbook: 'Y',
      clipbookIdList: dto.clipbookIdList,
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const dataList = data as ElasticSearchReturnDtoNewsDocumentDto
      if (dataList && dataList.name) {
        let mainDataList = dataList.name as MonitoringSearchNewsDocumentDto[]
        if (mainDataList && mainDataList.length > 0) {
          res = mainDataList
        }
      }
    }

    return res
  }

  const getTotalClipbookAnalysis = async (dto: ESearchNewsCondDto, total: number) => {
    let res: ElasticSearchReturnDtoNewsDocumentDto | null = null
    const { status, message, data } = await getNewsSearchResult.mutateAsync({
      timezone: timeZone,
      page: 1,
      size: total,
      clipbook: 'Y',
      clipbookIdList: dto.clipbookIdList,
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const dataList = data as ElasticSearchReturnDtoNewsDocumentDto
      if (dataList) {
        res = {
          ...dataList,
          name: [],
        }
      }
    }

    return res
  }

  const exportToExcel = async (dto: ESearchNewsCondDto, total: number) => {
    let tempNewsIdList: number[] = []
    let tempIndexNameList: string[] = []
    try {
      const getList = await getTotalClipbookIdList(dto, total)
      if (getList && getList.length > 0) {
        for await (const monitoringSearchNewsDocumentDto of getList) {
          if (monitoringSearchNewsDocumentDto.newsid) {
            tempNewsIdList = [...tempNewsIdList, Number(monitoringSearchNewsDocumentDto.newsid)]
          }
          if (monitoringSearchNewsDocumentDto.inserted) {
            tempIndexNameList = [
              ...tempIndexNameList,
              moment(monitoringSearchNewsDocumentDto.inserted).format('YYYYMM'),
            ]
          }
        }
      }
      const param = {
        newsIdList: tempNewsIdList,
        indexNameList: tempIndexNameList,
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
      } else {
        openToast('내보내기에 실패하였습니다', 'error')
      }
    } catch (e) {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }

  const createPdfFile = async (element: HTMLElement, isEmail: boolean) => {
    let pdf: JsPdf | null = null
    try {
      const canvas = await html2canvas(element, {
        scale: isEmail ? 1 : 2,
        useCORS: true,
        logging: true,
        windowWidth: element.offsetWidth,
        windowHeight: element.offsetHeight,
      })

      const imgData = canvas.toDataURL('image/png')

      // A4 크기로 PDF 생성
      pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
      })

      pdf.internal.pageSize.width = element.offsetWidth
      pdf.internal.pageSize.height = element.offsetHeight

      pdf.addImage(imgData, 'PNG', 40, 20, element.offsetWidth, element.offsetHeight)

      pdf.addFileToVFS('CustomFont.ttf', CostomFont)
      pdf.addFont('CustomFont.ttf', 'CustomFont', 'normal')
      pdf.setFont('CustomFont') // 폰트 설정

      const textYPosition = element.offsetHeight - 25
      const textXPosition = 40
      const text = `${monitoringAnalysisPopup.title}_모니터링_분석`

      // 텍스트 그림자 효과
      pdf.setFillColor(200, 200, 200) // 연한 회색
      pdf.setTextColor(200, 200, 200)
      pdf.setFontSize(28)
      pdf.text(text, textXPosition + 1, textYPosition + 1) // 그림자 텍스트

      // 메인 텍스트
      pdf.setTextColor(62, 152, 219) // 밝은 파란색
      pdf.text(text, textXPosition, textYPosition)

      const linkWidth = pdf.getTextWidth(text)

      // 세련된 밑줄 효과
      const underlineYPosition = textYPosition + 3
      pdf.setLineWidth(0.8) // 더 굵은 밑줄

      // 그라데이션 효과를 위한 여러 개의 선
      const gradientSteps = 3
      for (let i = 0; i < gradientSteps; i++) {
        pdf.setDrawColor(62, 152, 219)
        pdf.line(textXPosition, underlineYPosition + i * 0.5, textXPosition + linkWidth, underlineYPosition + i * 0.5)
      }

      // 링크 영역 설정
      pdf.link(textXPosition, textYPosition - 28, linkWidth, 32, {
        url:
          process.env.MY_ENV_VAR === 'production'
            ? SVC_DOMAIN_URL.PROD
            : SVC_DOMAIN_URL.DEV + `/news/monitoring?monitoring_id=${monitoringAnalysisPopup.idKey}`,
      })
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error)
    }

    return pdf
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
        url: '',
      }
      const res = setObjectToBase64({ ...query })
      await router.push(`/news/search-result?filter=${res}`)
    }
  }

  const sharePdfFile = async (element: JsPdf, props: monitoringAnalysisPopupProps) => {
    try {
      const pdfFile = element.output('blob')
      if (pdfFile) {
        // File 객체를 state로 저장
        dispatch(
          sharedKeyAction({
            key: monitoringAnalysisPopup.idKey,
            title: '클립북 분석 공유 - ' + monitoringAnalysisPopup.title || '',
            editor: monitoringAnalysisPopup.title || '',
            type: 'REPORT_CLIPBOOK',
            files: [
              new File(
                [pdfFile], // cast as any
                `${props.title}_모니터링_분석.pdf`,
                {
                  lastModified: new Date().getTime(),
                  type: pdfFile.type,
                }
              ),
            ],
            sharedUrl:
              process.env.MY_ENV_VAR === 'production'
                ? SVC_DOMAIN_URL.PROD
                : SVC_DOMAIN_URL.DEV + `/news/clipbook-result?clipbook_id=${props.idKey}`,
          })
        )
      }
    } catch (e) {}
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
    if (userClipbookList && userClipbookList.length > 0) {
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
    dispatch(
      afterClipbookAddNewsParamAction({
        list: newsList,
        newsParam: newsParam,
      })
    )
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
            await insertNewsToClipbookId(
              [],
              idList.map(e => Number(e.newsid)),
              idList.map(e => moment(e.inserted).format('YYYYMM')),
              { key: find.keyValue.toString(), name: find.keyName },
              userClipbookList,
              'checked',
              idList
            )
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

  const afterClipbookPopupReLoadAction = async (
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto,
    deleteItem: number[],
    clipbookDataList?: clipbookDataListProps[]
  ) => {
    if (deleteItem && deleteItem.length > 0) {
      const find = deleteItem.find(k => k.toString() === clipbookKeyId?.toString())
      if (find) {
        await afterForceClipbookPopupReLoad(clipbookKeyId, tempOwnerKey, tempEditPageOpen, dto, originData, originParam)
      } else {
        await afterClipbookAddReLoad(dto, originData, originParam)
      }
    } else {
      await afterClipbookAddReLoad(dto, originData, originParam)
    }
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
  }

  const afterForceClipbookPopupReLoad = async (
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    let preloadCommonCode: CommonCode[] = []
    let tempToneList: SelectListOptionItem[] = []
    let tempNewsInfoTypeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempPeriodList: SelectListOptionItem[] = []
    let tempMultimediaList: SelectListOptionItem[] = []
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let filterSub = subNewsFilterListList
    let filterSubActions = subNewsFilterOptionsList
    let newsParam = originParam
    let newsList = [...originData]
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    const apiDto: ESearchNewsCondDto = {
      timezone: timeZone,
      page: 1,
      size: 20,
      clipbook: 'Y',
      clipbookIdList: dto.clipbookIdList,
      sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      groupId: userSelectGroup,
    }
    //dispatch(newsLoadingAction(true))
    try {
      const res = await getNewsSearchByMonitoring(apiDto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / apiDto.size)
        if (newsData && newsData.length > 0) {
          const find = newsData.find(k => k.newsid === originParam?.newsid)
          newsList = newsData
          if (find) {
            newsParam = find
          } else {
            newsParam = newsData[0]
          }
          const filter = setObjectToBase64({
            ...apiDto,
            clipbook_id: Number(clipbookKeyId),
            news_id: newsParam.newsid,
            editPageOpen: tempEditPageOpen,
            ownerKey: tempOwnerKey ? userInfo.userId : 0,
          })
          await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
          if (
            !newsParam.isSysInfo &&
            newsParam.link &&
            newsParam.link !== '' &&
            newsParam.owner?.uid &&
            newsParam.owner?.uid === userInfo.userId
          ) {
            await checkDuplicateNews(newsParam)
          } else {
            dispatch(clipbookNewsCheckDuplicateParamAction(null))
          }
          tempPageCount = {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          }
          for await (const re of extendedCommonCodeTargetList) {
            const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
            if (find) {
              //@ts-ignore
              preloadCommonCode = find.commonCodeList
            } else {
              preloadCommonCode = await getCommonCode(re.id)
            }
            if (re.id === 'TONE') {
              tempToneList = preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            } else if (re.id === 'NEWS_INFO_TYPE') {
              tempNewsInfoTypeList = preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            } else if (re.id === 'MEDIA_TYPE') {
              tempMediaTypeList = preloadCommonCode.map(e => {
                return { id: e.commonCodeId.toString(), name: e.name, extra: e.code }
              })
              for await (const reElement of tempMediaTypeList) {
                const find = frequentlyUsedCommonCode.data.find(
                  //@ts-ignore
                  fre => fre.parentCommonCodeId === Number(reElement.id)
                )
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
            } else if (re.id === 'NEWS_PERIOD') {
              tempPeriodList = preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            } else if (re.id === 'MEDIA_VALUE') {
              tempMediaValueList = preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            } else if (re.id === 'NEWS_SEARCH_MULTIMEDIA') {
              tempMultimediaList = preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            }
          }
          filterSub = await getFilterOptionControlData(
            res,
            apiDto,
            tempToneList,
            tempNewsInfoTypeList,
            tempMediaTypeList,
            tempPeriodList,
            tempMediaSubTypeList,
            tempMediaValueList,
            tempMultimediaList
          )
        }
      }
      dispatch(
        afterClipbookAddNewsListAction({
          list: newsList,
          newsParam: newsParam,
          tempPageCount,
          filterSub,
          filterSubActions,
          apiDto,
          isReset: true,
        })
      )
      dispatch(initStateClipbookListPopup())
    } catch (e) {}
  }

  const afterClipbookAddReLoad = async (
    dto: ESearchNewsCondDto,
    originData: MonitoringSearchNewsDocumentDto[],
    originParam: MonitoringSearchNewsDocumentDto
  ) => {
    let newsParam = originParam
    let newsList = [...originData]
    //dispatch(newsLoadingAction(true))
    try {
      const res = await getNewsSearchByMonitoring(dto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        if (newsData && newsData.length > 0) {
          const find = newsData.find(k => k.newsid === originParam?.newsid)
          newsParam = find ? find : newsData[0]
          newsList = newsData
        }
      }
      dispatch(
        afterClipbookAddNewsListAction({
          list: newsList,
          newsParam: newsParam,
        })
      )
      dispatch(initStateClipbookListPopup())
    } catch (e) {}
    //dispatch(newsLoadingAction(false))
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

  const setAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    try {
      let filterCount = 0
      let filterDto = {
        ...apiParam,
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
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
          filterCount += filterSubParamActionsProp.values.length
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
        } else if (filterSubParamActionsProp.id === 'filterPeriod') {
          if (
            filterSubParamActionsProp.values &&
            filterSubParamActionsProp.values.length > 0 &&
            filterSubParamActionsProp.values[0] !== ''
          ) {
            const dateValue = await changeDateSet(
              filterSubParamActionsProp.values[0],
              apiParam.filterPeriodStartYear +
                '-' +
                apiParam.filterPeriodStartMonth +
                '-' +
                apiParam.filterPeriodStartDay,
              apiParam.filterPeriodEndYear + '-' + apiParam.filterPeriodEndMonth + '-' + apiParam.filterPeriodEndDay
            )
            filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
            filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
            filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
            filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
            filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
            filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
          }
        }
      }
      await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    } catch (e) {}
  }

  const setAddExtraCustomDateFilterSearch = async (
    item: filterSubParamActionsProps[],
    hook: ESearchNewsCondDto,
    startDate: string,
    endDate: string,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
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
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp?.values || []
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
      } else if (filterSubParamActionsProp.id === 'filterPeriod') {
        if (
          filterSubParamActionsProp.values &&
          filterSubParamActionsProp.values.length > 0 &&
          filterSubParamActionsProp.values[0] !== ''
        ) {
          const dateValue = await changeDateSet(filterSubParamActionsProp.values[0], startDate, endDate)
          filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
          filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
          filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
          filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
          filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
          filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
        }
      }
    }
    await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
  }

  const setAddExtraDateFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
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
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp?.values || []
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
      } else if (filterSubParamActionsProp.id === 'filterPeriod') {
        if (
          filterSubParamActionsProp.values &&
          filterSubParamActionsProp.values.length > 0 &&
          filterSubParamActionsProp.values[0] !== ''
        ) {
          const dateValue = await changeDateSet(filterSubParamActionsProp.values[0], '', '')
          filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
          filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
          filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
          filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
          filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
          filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
        }
      }
    }
    await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
  }

  const setAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp?.values || []
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
            filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
            filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
            filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
            filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
            filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
            filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
          }
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (i) {
      console.log('setAddExtraFilterSearch', i)
    }
  }

  const setExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let filterCount = 0
    let filterDto = {
      ...apiParam,
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
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp?.values || []
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
      } else if (filterSubParamActionsProp.id === 'filterPeriod') {
        if (
          filterSubParamActionsProp.values &&
          filterSubParamActionsProp.values.length > 0 &&
          filterSubParamActionsProp.values[0] !== ''
        ) {
          const dateValue = await changeDateSet(
            filterSubParamActionsProp.values[0],
            apiParam.filterPeriodStartYear +
              '-' +
              apiParam.filterPeriodStartMonth +
              '-' +
              apiParam.filterPeriodStartDay,
            apiParam.filterPeriodEndYear + '-' + apiParam.filterPeriodEndMonth + '-' + apiParam.filterPeriodEndDay
          )
          filterDto.filterPeriodStartYear = dateValue.filterPeriodStartYear
          filterDto.filterPeriodStartMonth = dateValue.filterPeriodStartMonth
          filterDto.filterPeriodStartDay = dateValue.filterPeriodStartDay
          filterDto.filterPeriodEndYear = dateValue.filterPeriodEndYear
          filterDto.filterPeriodEndMonth = dateValue.filterPeriodEndMonth
          filterDto.filterPeriodEndDay = dateValue.filterPeriodEndDay
        }
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await getNewsListByClipbookId(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const getNewsListByClipbookId = async (
    dto: ESearchNewsCondDto,
    subFilter: filterSubParamActionsProps[],
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    dispatch(newsLoadingAction(true))
    const res = await getNewsSearchByMonitoring(dto)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / dto.size)
      const filter = setObjectToBase64({
        ...dto,
        clipbook_id: Number(idKey),
        news_id: newsData.length > 0 ? (newsData[0].newsid ? Number(newsData[0].newsid) : 0) : 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      dispatch(
        setOnChangeSearchOptionAction({
          apiParams: dto,
          filterSub: subFilter,
          tempNewsList: newsData,
          tempNewsIdParams: newsData[0],
          news_id: newsData.length > 0 ? (newsData[0].newsid ? Number(newsData[0].newsid) : 0) : 0,
          tempPageCount: {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
      if (
        newsData &&
        newsData.length > 0 &&
        !newsData[0].isSysInfo &&
        newsData[0].link &&
        newsData[0].link !== '' &&
        newsData[0].owner?.uid &&
        newsData[0].owner?.uid === userInfo.userId
      ) {
        await checkDuplicateNews(newsData[0])
      } else {
        dispatch(clipbookNewsCheckDuplicateParamAction(null))
      }
    }
    dispatch(newsLoadingAction(false))
  }

  const setQueryParam = async (list: string[]) => {
    let res = {
      param: '',
      data: '',
    }
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          res = {
            param: query[0],
            data: query[1],
          }
        }
      }
    }
    return res
  }

  const getCommonCode = async (code: string, exParams?: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const getFilter = async (filterParam: UseGetClipbooksParams, clipbookId: number) => {
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      page: 1,
      size: 20,
      clipbook: 'Y',
      clipbookIdList: [],
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
      groupId: userSelectGroup,
    }
    let param: clipbookNewsListDto[] = [
      {
        id: 'NORMAL',
        categoryNm: '클립북',
        content: [],
      },
      {
        id: 'COVERAGE',
        categoryNm: '커버리지 클립북',
        content: [],
      },
    ]
    let isAuth = false
    let categoryId = clipbookId
    let clipbookData: clipbookContentListProps | null = null
    dispatch(clipbookListLoadingAction(true))
    try {
      const { status, data, message } = await getClipbookByCatgoryList.mutateAsync(filterParam)
      if (status === 'S') {
        const res = data as PageClipBookDto
        if (res.content && res.content.length > 0) {
          for await (const content of res.content) {
            if (content.type === 'COVERAGE') {
              param[1].content = [
                ...param[1].content,
                {
                  ...content,
                  isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
                  isOwner: userInfo.userId === content.owner?.userId,
                  categoryName: '커버리지',
                  settingList: [],
                  shareCodeNm: '',
                  pressReleaseInfo: [],
                },
              ]
            } else {
              param[0].content = [
                ...param[0].content,
                {
                  ...content,
                  isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
                  isOwner: userInfo.userId === content.owner?.userId,
                  categoryName: '',
                  settingList: [],
                  shareCodeNm: '',
                  pressReleaseInfo: [],
                },
              ]
            }
          }
          if (categoryId > 0) {
            const getParam = param[0].content.find(e => e.clipBookId === clipbookId)
            if (getParam) {
              clipbookData = getParam
            } else {
              const getParam = param[1].content.find(e => e.clipBookId === clipbookId)
              if (getParam) {
                clipbookData = getParam
              } else {
                openToast('해당하는 목록이 존재하지 않습니다', 'error')
                clipbookData = null
              }
            }
          } else {
            categoryId = res.content.length > 0 ? (res.content[0].clipBookId ? res.content[0].clipBookId : 0) : 0
            clipbookData =
              param[0].content.length > 0
                ? param[0].content[0]
                : param[1].content.length > 0
                ? param[1].content[0]
                : null
          }
          if (clipbookData) {
            isAuth = userInfo.userId === clipbookData.owner?.userId ? true : clipbookData.shareCode === 'WRITABLE'
            apiParams.clipbookIdList = clipbookData.clipBookId ? [clipbookData.clipBookId] : []
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(clipbookListLoadingAction(false))

    return {
      list: param,
      id: categoryId,
      apiDto: apiParams,
      apiParams: clipbookData,
      clipbookIdList: apiParams.clipbookIdList,
      isAuth,
    }
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

  const getNewsSearchByMonitoring = async (params: ESearchNewsCondDto) => {
    let newsData: ElasticSearchReturnDtoNewsDocumentDto | null = null
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({
        ...params,
        clipbook: 'Y',
        groupId: userSelectGroup,
        timezone: timeZone,
      })
      if (status === 'S') {
        newsData = data as ElasticSearchReturnDtoNewsDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return newsData
  }

  const getFilterOptionControlData = async (
    origin: ElasticSearchReturnDtoNewsDocumentDto,
    props: ESearchNewsCondDto,
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
      console.log('tempPeriodList', tempPeriodList)
      filterSub[0].subMenus = await filterPeriod(tempPeriodList)
      console.log('filterSub[0].subMenus', filterSub[0].subMenus)
    }
    if (tempMediaValueList.length > 0) {
      filterSub[2].subMenus = await filterMediaValue(tempMediaValueList, props)
      console.log('filterSub[2].subMenus', filterSub[2].subMenus)
    }
    if (origin.filterTone && origin.filterTone.length > 0) {
      filterSub[4].subMenus = await filterAdjust(origin.filterTone, tempToneList)
    }
    if (origin.filterMultimedia) {
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

    return filterSub
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

  const filterPeriod = async (originData: SelectListOptionItem[]) => {
    let res: NavigationLinkItem[] = []

    for await (const paramElement of originData) {
      let temp: NavigationLinkItem = {
        id: paramElement.id,
        title: paramElement.name,
        // @ts-ignore
        subMenus: [{ id: '', title: '' }],
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

  const mediaSubTotalTypeListConvert = async (confitions: mediaSubTypeListProps[], findKey: string) => {
    let res: string = ''
    for await (const object of confitions) {
      if (object.data && object.data.length > 0) {
        const find = object.data.find(e => e.code === findKey)
        if (find) {
          res = find.name
        }
      }
    }

    return res
  }

  const conditionConvert = async (confitions: string) => {
    let res = null
    let tempSearchKeywordOption = ''
    let isDtoFilter = false
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      page: 1,
      size: 20,
      clipbook: 'Y',
      clipbookIdList: [],
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
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
    let tempIsFilter = false
    let tempOwnerKey = 0
    let clipbook_id = 0
    let news_id = 0
    try {
      let conditions = getObjectFromBase64(confitions)
      console.log('conditions', conditions)
      if (conditions && conditions !== '') {
        tempIsFilter = conditions.editPageOpen ? conditions.editPageOpen : false
        clipbook_id = conditions.clipbook_id ? conditions.clipbook_id : 0
        news_id = conditions.news_id ? conditions.news_id : 0

        if (conditions.page && conditions.page !== 0) {
          apiParams.page = Number(conditions.page)
        }
        if (conditions.size && conditions.size !== 0) {
          apiParams.size = Number(conditions.size)
        }
        if (conditions.sort && conditions.sort.length > 0) {
          apiParams.sort = conditions.sort
        }
        if (conditions.clipbookIdList && conditions.clipbookIdList.length > 0) {
          apiParams.clipbookIdList = conditions.clipbookIdList
        }
        if (conditions.ownerKey && conditions.ownerKey !== '') {
          tempOwnerKey = conditions.ownerKey
        }
        if (conditions.filter && conditions.filter !== '') {
          apiParams.filter = conditions.filter
          tempSearchKeywordOption = conditions.filter
          isDtoFilter = true
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
          isDtoFilter = true
        }
        if (conditions.filterValue && conditions.filterValue !== '') {
          apiParams.filterValue = conditions.filterValue
          isDtoFilter = true
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterInformation')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = [conditions.filterValue]
          }
        }
        if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
          apiParams.filterCategoryList = conditions.filterCategoryList
          isDtoFilter = true
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterCategoryList')
          if (!isNaN(find)) {
            tempFilterSubActions[find].values = conditions.filterCategoryList
          }
        }
        if (conditions.filterMediaNameList && conditions.filterMediaNameList.length > 0) {
          apiParams.filterMediaNameList = conditions.filterMediaNameList
          isDtoFilter = true
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterMediaNameList')
          if (!isNaN(find)) {
            tempFilterSubActions[find].values = conditions.filterMediaNameList
          }
        }
        if (conditions.filterTone && conditions.filterTone.length > 0) {
          apiParams.filterTone = conditions.filterTone
          isDtoFilter = true
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterTone')
          if (!isNaN(find)) {
            // @ts-ignore
            tempFilterSubActions[find].values = conditions.filterTone
          }
        }
        if (conditions.filterImage) {
          apiParams.filterImage = conditions.filterImage
          isDtoFilter = true
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
          isDtoFilter = true
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
          isDtoFilter = true
          const find = tempFilterSubActions.findIndex(e => e.id === 'filterSourceType')
          if (!isNaN(find)) {
            tempFilterSubActions[find].values = conditions.filterSourceType
          }
        }
      }
      res = {
        tempFilterSubActions,
        tempSearchKeywordOption,
        tempOwnerKey,
        tempIsFilter,
        clipbook_id,
        news_id,
        apiParams,
        isDtoFilter,
      }
    } catch (e) {}
    return res
  }

  const changeDateSet = async (date: string, start: string, end: string) => {
    let dateValue = moment()
    let res = {
      filterPeriodStartYear: dateValue.format('YYYY'),
      filterPeriodStartMonth: dateValue.format('MM'),
      filterPeriodStartDay: dateValue.format('DD'),
      filterPeriodEndYear: dateValue.format('YYYY'),
      filterPeriodEndMonth: dateValue.format('MM'),
      filterPeriodEndDay: dateValue.format('DD'),
    }
    if (date === '3D') {
      dateValue = moment().subtract({ days: 3 })
      res.filterPeriodStartYear = dateValue.format('YYYY')
      res.filterPeriodStartMonth = dateValue.format('MM')
      res.filterPeriodStartDay = dateValue.format('DD')
    } else if (date === '1W') {
      dateValue = moment().subtract({ days: 7 })
      res.filterPeriodStartYear = dateValue.format('YYYY')
      res.filterPeriodStartMonth = dateValue.format('MM')
      res.filterPeriodStartDay = dateValue.format('DD')
    } else if (date === '1M') {
      dateValue = moment().subtract({ month: 1 })
      res.filterPeriodStartYear = dateValue.format('YYYY')
      res.filterPeriodStartMonth = dateValue.format('MM')
      res.filterPeriodStartDay = dateValue.format('DD')
    } else if (date === '3M') {
      dateValue = moment().subtract({ month: 3 })
      res.filterPeriodStartYear = dateValue.format('YYYY')
      res.filterPeriodStartMonth = dateValue.format('MM')
      res.filterPeriodStartDay = dateValue.format('DD')
    } else if (date === '1Y') {
      dateValue = moment().subtract({ year: 1 })
      res.filterPeriodStartYear = dateValue.format('YYYY')
      res.filterPeriodStartMonth = dateValue.format('MM')
      res.filterPeriodStartDay = dateValue.format('DD')
    } else if (date === 'DIRECT' && start !== '' && end !== '') {
      res.filterPeriodStartYear = moment(start).format('YYYY')
      res.filterPeriodStartMonth = moment(start).format('MM')
      res.filterPeriodStartDay = moment(start).format('DD')
      res.filterPeriodEndYear = moment(end).format('YYYY')
      res.filterPeriodEndMonth = moment(end).format('MM')
      res.filterPeriodEndDay = moment(end).format('DD')
    }
    return res
  }

  const init = async () => {
    let tempClipbookNewsList: clipbookNewsListDto[] = defaultClipbookParamList
    let tempIsFilter = false
    let tempArrayClipbookAuth = false
    let tempOwnerKey = 0
    let tempSearchKeywordOption = ''
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempToneList: SelectListOptionItem[] = []
    let tempPeriodList: SelectListOptionItem[] = []
    let tempMultimediaList: SelectListOptionItem[] = []
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempNewsInfoTypeList: SelectListOptionItem[] = []
    let filterSub = subNewsFilterListList
    let filterSubActions = subNewsFilterOptionsList
    let clipbook_id = 0
    let news_id = 0
    let isDtoFilter = false
    let tempClipbookDataCatgory: clipbookContentListProps | null = null
    let preloadCommonCode: CommonCode[] = []
    let tempNewsIdParams: MonitoringSearchNewsDocumentDto | null = null
    let tempNewsList: MonitoringSearchNewsDocumentDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let apiDto: ESearchNewsCondDto = {
      timezone: timeZone,
      page: 1,
      size: 20,
      clipbook: 'Y',
      clipbookIdList: [],
      sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      groupId: userSelectGroup,
    }
    let filterParam: UseGetClipbooksParams = {
      page: 1,
      size: 100000,
      sort: 'updateAt!desc',
      groupId: userSelectGroup,
    }
    dispatch(initClipbookDetailAction())
    try {
      if (window.location.search && window.location.search.substring(1).split('&').length > 0) {
        const subParams = window.location.search.substring(1).split('&')
        const querys = await setQueryParam(subParams)
        if (querys && querys.param === 'filter') {
          const dto = await conditionConvert(querys.data)
          console.log('dto', dto)
          if (dto) {
            tempIsFilter = dto.tempIsFilter
            clipbook_id = dto.clipbook_id
            news_id = dto.news_id
            apiDto = dto.apiParams
            isDtoFilter = dto.isDtoFilter
            tempSearchKeywordOption = dto.tempSearchKeywordOption
            filterSubActions = dto.tempFilterSubActions
            if (dto.tempOwnerKey > 0 && userInfo.userId) {
              tempOwnerKey = userInfo.userId
              filterParam.ownerId = userInfo.userId
            }
          }
        } else if (querys && querys.param === 'clipbook_id' && querys.data !== '') {
          clipbook_id = Number(querys.data)
        }
      }
      for await (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }

        if (re.id === 'TONE') {
          tempToneList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(toneListAction(tempToneList))
        } else if (re.id === 'NEWS_INFO_TYPE') {
          tempNewsInfoTypeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(informationTypeListAction([{ id: '', name: '선택' }, ...tempNewsInfoTypeList]))
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
        } else if (re.id === 'MEDIA_SUB_TYPE') {
          dispatch(
            mediaSubTypeListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (re.id === 'NEWS_PERIOD') {
          tempPeriodList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(periodListAction(tempPeriodList))
        } else if (re.id === 'MEDIA_VALUE') {
          tempMediaValueList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(mediaValueListAction(preloadCommonCode))
        } else if (re.id === 'NEWS_SEARCH_MULTIMEDIA') {
          tempMultimediaList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(mediaValueListAction(preloadCommonCode))
        }
      }
      await setMediaValuePoints()
      const getClipbookByCategory = await getFilter(filterParam, clipbook_id)
      if (clipbook_id < 1) {
        apiDto = getClipbookByCategory.apiDto
        clipbook_id = getClipbookByCategory.id
      }
      apiDto.clipbookIdList = getClipbookByCategory.clipbookIdList
      tempArrayClipbookAuth = getClipbookByCategory.isAuth
      tempClipbookNewsList = getClipbookByCategory.list
      tempClipbookDataCatgory = getClipbookByCategory.apiParams
      dispatch(
        setFilterClipbookDataAction({
          apiDto,
          tempClipbookNewsList,
          clipbook_id,
          tempArrayClipbookAuth,
          tempClipbookDataCatgory,
          tempIsFilter,
          tempOwnerKey,
        })
      )
      if (apiDto.clipbookIdList && apiDto.clipbookIdList.length > 0 && clipbook_id > 0) {
        const res = await getNewsSearchByMonitoring(apiDto)
        if (res) {
          const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
          const totalSize = res.totalElements as number
          const totalPage = Math.ceil(totalSize / apiDto.size)
          const find = newsData.find(k => k.newsid === news_id)
          news_id = find ? news_id : newsData.length > 0 ? (newsData[0].newsid ? newsData[0].newsid : 0) : 0
          tempNewsIdParams = find ? find : newsData.length > 0 ? (newsData[0] ? newsData[0] : null) : null
          tempNewsList = newsData
          tempPageCount = {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          }
          if (isDtoFilter) {
            const getFilterData = await getNewsSearchByMonitoring({
              timezone: timeZone,
              page: 1,
              size: 20,
              clipbook: 'Y',
              clipbookIdList: apiDto.clipbookIdList,
              sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
              groupId: userSelectGroup,
            })
            if (getFilterData) {
              filterSub = await getFilterOptionControlData(
                getFilterData,
                {
                  timezone: timeZone,
                  page: 1,
                  size: 20,
                  clipbook: 'Y',
                  clipbookIdList: apiDto.clipbookIdList,
                  sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
                  groupId: userSelectGroup,
                },
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
              apiDto,
              tempToneList,
              tempNewsInfoTypeList,
              tempMediaTypeList,
              tempPeriodList,
              tempMediaSubTypeList,
              tempMediaValueList,
              tempMultimediaList
            )
          }

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
            dispatch(clipbookNewsCheckDuplicateParamAction(null))
          }
        }
      }
    } catch (e) {}
    dispatch(initStateClipbookListPopup())
    dispatch(
      setNewsInitDataAction({
        news_id,
        filterSubParam: filterSub,
        newsIdParams: tempNewsIdParams,
        pageCount: tempPageCount,
        filterSubParamActions: filterSubActions,
        newsList: tempNewsList,
        tempSearchKeywordOption: tempSearchKeywordOption,
      })
    )
    dispatch(newsLoadingAction(false))
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
    dispatch(clipbookNewsCheckDuplicateParamAction(duplicationData))
  }
  const handleChangeSize = async (
    e: number,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...hook,
      page: 1,
      size: e,
    }
    await getNewsBySearchOption(apiParam, 'size', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const handlePaginationChange = async (
    e: number,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    if (Number(e) * Number(hook.size) >= 20000) {
      dispatch(searchLimitAlarmAction(true))
    } else {
      await getNewsBySearchOption(
        {
          ...hook,
          page: e,
          size: hook.size,
        },
        'page',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    }
  }

  const keywordSearch = async (
    e: string,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...hook,
      filter: e,
      page: 1,
    }
    await getNewsBySearchOption(apiParam, 'filter', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const setInitFilterSubParamActionsAction = async (
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
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
    delete apiParam.filterImage
    delete apiParam.filterVideo
    dispatch(isLimitFilterAction(0))
    await getNewsListByClipbookId(apiParam, subNewsFilterOptionsList, idKey, tempOwnerKey, tempEditPageOpen)
  }

  const moveNewsDetail = async (id: number, param: ESearchNewsCondDto) => {
    await router.push(`/news/record/${id}`)
  }

  const handleChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    hook: ESearchNewsCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let sort = [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`]
    if (e.id === 'inserted') {
      sort = [`inserted!${i.id}`, `_score!${i.id}`, `char_len!${i.id}`, `newsid!${i.id}`]
    } else if (e.id === '_score') {
      sort = [`_score!${i.id}`, `inserted!${i.id}`, `char_len!${i.id}`, `newsid!${i.id}`]
    } else if (e.id === 'char_len') {
      sort = [`char_len!${i.id}`, `inserted!${i.id}`, `_score!${i.id}`, `newsid!${i.id}`]
    }
    await getNewsBySearchOption(
      {
        ...hook,
        sort,
        page: 1,
      },
      'sort',
      idKey,
      tempOwnerKey,
      tempEditPageOpen
    )
  }

  const getNewsBySearchOption = async (
    dto: ESearchNewsCondDto,
    type: string,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    dispatch(newsLoadingAction(true))
    const res = await getNewsSearchByMonitoring(dto)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / dto.size)
      const filter = setObjectToBase64({
        ...dto,
        clipbook_id: Number(idKey),
        news_id: newsData.length > 0 ? Number(newsData[0].newsid) : 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      dispatch(
        setOnChangeMonitoringSearchOptionAction({
          apiParams: dto,
          tempNewsList: newsData,
          news_id: newsData.length > 0 ? Number(newsData[0].newsid) : 0,
          tempNewsIdParams: newsData[0],
          isResetSelectedNews: type === 'size',
          tempPageCount: {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/news/clipbook-result?filter=${filter}`, undefined, { shallow: true })
      if (
        newsData &&
        newsData.length > 0 &&
        !newsData[0].isSysInfo &&
        newsData[0].link &&
        newsData[0].link !== '' &&
        newsData[0].owner?.uid &&
        newsData[0].owner?.uid === userInfo.userId
      ) {
        await checkDuplicateNews(newsData[0])
      } else {
        dispatch(clipbookNewsCheckDuplicateParamAction(null))
      }
    }
    dispatch(newsLoadingAction(false))
  }

  const editTaggingAction = async (
    props: MbTagSearchTagItem[],
    targetIdList: MonitoringSearchNewsDocumentDto[],
    type: string,
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
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
        res = await actionTaggingAddFunction(
          param,
          clipbookKeyId,
          tempOwnerKey,
          tempEditPageOpen,
          dto,
          originData,
          originParam
        )
      } else if (type === 'delete') {
        res = await actionTaggingExceptFunction(
          param,
          clipbookKeyId,
          tempOwnerKey,
          tempEditPageOpen,
          dto,
          originData,
          originParam
        )
      } else {
        res = await actionTaggingResetFunction(
          param,
          clipbookKeyId,
          tempOwnerKey,
          tempEditPageOpen,
          dto,
          originData,
          originParam
        )
      }
    }
    if (res === 'S') {
      dispatch(doneTagAction())
    }
  }

  const actionTaggingAddFunction = async (
    param: TaggingProps,
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
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
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
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
    clipbookKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
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

  const delClipbookNews = async (idKey: number[], newsIdList: number[]) => {
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookIdList: idKey,
      newsIdList: newsIdList,
      // startYear: moment().format('YYYY'),
      // startMonth: moment().format('M'),
      // startDay: moment().format('D'),
      // endYear: moment().format('YYYY'),
      // endMonth: moment().format('M'),
      // endDay: moment().format('D'),
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'del',
      info: newsToClipbookparams,
    })
    if (status !== 'S') {
      openToast(message?.message, 'error')
    }
    return status
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

  const setMediaValuePoints = async () => {
    const { status, data: apiData, message } = await apiGetMediaValuePoints()
    if (status === 'S') {
      dispatch(mediaValuePointListAction(apiData as ValuePointListProps[]))
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    toneList,
    informationTypeList,
    mediaTypeList,
    newsLoading,
    isOwner,
    filterSubParamActions,
    filterSubParam,
    monitoringListParams,
    pageCount,
    newsList,
    newsIdKey,
    newsIdParams,
    clipbookCategory,
    clipbookIdKey,
    clipbookDataCatgory,
    isFilterSubParam,
    newsKeyword,
    monitoringCategoryButton,
    searchContentKeyList,
    mediaSubTypeList,
    monitoringAnalysisPopup,
    isSelectedAllNewsId,
    isTagButton,
    tagPopup,
    isLimitFilter,
    isNoticePopup,
    reportPopup,
    mediaValuePointList,
    newsCheckDuplicateParam,
    deletePopup,
    userPopup,
    mediaSubTotalTypeList,
    clipbookListLoading,
    contentDeletePopup,
    fileDownloadPopup,
    reportCancelPopup,
    userClipbookListAutoSaveData,
    timeZone,
    isDemoLicense,
    searchLimitAlarm,
    arrayclipbookAuth,
    newsMultiMediaList,

    init,
    setChangeCategoryId,
    handleChangeSize,
    handlePaginationChange,
    moveNewsDetail,
    handleChangeSort,
    editTaggingAction,
    keywordSearch,
    setInitFilterSubParamActionsAction,
    setExtractExtraFilterSearch,
    setAddExtraFilterSearch,
    monitoringDataToChart,
    exportToExcel,
    reportEmailSenderCheck,
    executeEmailHtml,
    executePdfConvert,
    executeWordDownload,
    reportEmailSender,
    deleteClipbookNews,
    selectedDeleteAction,
    ownerFunction,
    selectedClipbookDeleteAction,
    setOwnerKey,
    setIsCloseFilterSubParamAction,
    setAddAllExtraFilterSearch,
    setAddExtraDateFilterSearch,
    setAddExtraCustomDateFilterSearch,
    setAddExtraSelectedFilterSearch,
    setClipbookPopupAction,
    checkAutoRegisterSelectedNewsClipbook,
    setOneClipbookPopupAction,
    checkAutoRegisterClipbook,
    createPdfFile,
    sharePdfFile,
    moveToSearch,
    afterClipbookAddReLoad,
    afterClipbookPopupReLoadAction,

    setMonitoringCategoryButtonAction,
    setSearchContentKeyList,
    setNewsIdParamsAction,
    setAllSearchContentKeyList,
    openMonitoringAnalysisPopup,
    tagEdit,
    setInitTagPopupAction,
    setNewsKeyword,
    setIsFilterSubParamAction,
    setOpenFilterSubParamActions,
    setIsNoticePopupPopup,
    initMonitoringAnalysisPopup,
    setMonitoringReportPopupStepOnChange,
    setCloseMonitoringReportPopup,
    setCheckReportPopup,
    setMonitoringReportReleaseFormAction,
    setMonitoringReportPopupTargetEmailpAction,
    setMonitoringReportPopupResetTagListOnChange,
    setMonitoringReportPopupTagListOnChange,
    setMonitoringReportPopupResetAddEmail,
    setMonitoringReportPopupTargetEmailCloseOnChange,
    setMonitoringReportPopupResetTargetEmailCloseOnChange,
    setMonitoringReportReleaseTabAction,
    setMonitoringReportPopupSharedPopupContentAction,
    setMonitoringReportPopupTitle,
    setMonitoringReportPopupIsDragging,
    setMonitoringReportPopupGroupIndexChange,
    setMonitoringReportPopupGroupDragOver,
    setMonitoringReportPopupDeleteNewsArrayList,
    setMonitoringReportPopupDeleteGroupingNews,
    setMonitoringReportPopupTitleOnChange,
    setMonitoringReportPopupNewsGroupType,
    setMonitoringReportPopupNewsGrouping,
    setMonitoringReportPopupNewsArrayList,
    setMonitoringReportPopupDragOver,
    setMonitoringReportPopupActivityOpenOpen,
    setMonitoringReportReleaseKeywordsSearchDataAction,
    setMonitoringReportPopupKeywordsOnChange,
    setMonitoringReportPopupKeywordsDelete,
    setInitMonitoringReportPopup,
    setNoticeClose,
    setSelectedDeleteData,
    setUserProfilePopupAction,
    setSelectedDeleteContent,
    setSelectedExcelFileData,
  }
}
