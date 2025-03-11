import { useCallback, useEffect, useMemo } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Layout } from 'react-grid-layout'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { gadgetList, monitoringGraphHeight } from '~/components/contents/dashboard/defaultData'
import { API_LIST_TYPE_MAX_COUNT, SEE_MORE_COUNT } from '~/constants/common'
import {
  checkInit,
  dashboardContentType,
  deleteLayoutAction,
  gadgetAddLayoutAction,
  GadgetChartData,
  gadgetPopupAction,
  gadgetPopupProps,
  GridItemOption,
  GridState,
  gridStateLayoutsAction,
  gridStateLayoutsLeftAction,
  gridStateLayoutsRightAction,
  initAction,
  Layouts,
  setChartAction,
  setItemListAction,
  setMoreAmountAction,
  userLoadingAction,
} from '~/stores/modules/contents/dashboard/dashboardSlice'
import { monitoringListDto } from '~/stores/modules/contents/monitoring/monitoringSearch'
import {
  BaseResponseCommonObject,
  ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  NewsSrchDto,
  PageActionDtoForList,
  PageClipBookDto,
  PageGroupDto,
  PageJournalistSrchDto,
  PageJrnlstListDto,
  PageMediaListDto,
  PageMediaSrchDto,
  PageNewsSrchDto,
  ResponseNewsSrchCategoryDto,
  SearchNewsSrchCategoryListDto,
  type UserDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MediaNameCountType } from '~/types/contents/Monitoring'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { apiGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetJournalistCustomSearchList } from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { apiGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { apiGetGroupSearch } from '~/utils/api/group/useGetGroupSearch'
import { apiGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { apiGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { apiGetMonitoringSearch } from '~/utils/api/monitoring/useGetMonitoringSearch'
import { usePostGetMonitoringByCategory } from '~/utils/api/monitoring/usePostGetMonitoringByCategory'
import { apiPostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { usePutDashboardUser, usePutUser } from '~/utils/api/user/usePutUser'
import { getDateFormat } from '~/utils/common/date'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useDashboardAction = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateUserDashboard = usePutDashboardUser()
  const getCompanyMonitoring = usePostGetMonitoringByCategory()

  const { userLoading, gridState, keywordMonitroingList, gadgetPopup, keywordMonitoring } = useAppSelector(
    state => state.dashboardSlice
  )
  const { licenseInfo, userInfo, frequentlyUsedCommonCode, userSelectGroup, timeZone, shareCodeData, timeZoneData } =
    useAppSelector(state => state.authSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)

  const setsetMoreAmount = useCallback(
    async (origin: GridState, props: number, keyId: string, isType: string) => {
      let res = 0
      if (isType === 'left') {
        res = origin.left.list.findIndex(e => e.id.toString() === keyId.toString())
      } else {
        res = origin.right.list.findIndex(e => e.id.toString() === keyId.toString())
      }
      dispatch(setMoreAmountAction({ moreAmount: props, numberIndex: res, keyId: isType }))
    },
    [gridState]
  )

  const setItemList = useCallback(
    async (origin: GridState, props: dashboardContentType[], keyId: string, isType: string) => {
      let res = 0
      if (isType === 'left') {
        res = origin.left.list.findIndex(e => e.id.toString() === keyId.toString())
      } else {
        res = origin.right.list.findIndex(e => e.id.toString() === keyId.toString())
      }
      dispatch(setItemListAction({ list: props, numberIndex: res, keyId: isType }))
    },
    [gridState]
  )

  const setChartData = useCallback(
    async (origin: GridState, props: GadgetChartData, keyId: string, isType: string) => {
      let res = 0
      if (isType === 'left') {
        res = origin.left.list.findIndex(e => e.id.toString() === keyId.toString())
      } else {
        res = origin.right.list.findIndex(e => e.id.toString() === keyId.toString())
      }
      dispatch(setChartAction({ list: props, numberIndex: res, keyId: isType }))
    },
    [gridState]
  )

  const setGadgetAction = useCallback(
    async (origin: GridState) => dispatch(gridStateLayoutsAction({ left: origin.left.list, right: origin.right.list })),
    [gridState.left.list, gridState.right.list]
  )

  const setGadgetLeftCancelAction = useCallback(
    async (origin: GridState, props: GridItemOption) => {
      let arrangeLeft: GridItemOption[] = [...origin.left.list]
      if (origin.left.list && origin.left.list.length > 0) {
        const findIndex = origin.left.list.findIndex(e => e.id.toString() === props.id.toString())
        if (findIndex !== undefined && findIndex !== null) {
          arrangeLeft[findIndex] = {
            ...props,
            status: 'list',
          }
        }
      }
      dispatch(gridStateLayoutsLeftAction(arrangeLeft))
    },
    [gridState.left.list]
  )

  const setGadgetRightCancelAction = useCallback(
    async (origin: GridState, props: GridItemOption) => {
      let arrangeRight: GridItemOption[] = [...origin.right.list]
      if (origin.right.list && origin.right.list.length > 0) {
        const findIndex = origin.right.list.findIndex(e => e.id.toString() === props.id.toString())
        if (findIndex !== undefined && findIndex !== null) {
          arrangeRight[findIndex] = {
            ...props,
            status: 'list',
          }
        }
      }
      dispatch(gridStateLayoutsRightAction(arrangeRight))
    },
    [gridState.right.list]
  )

  const setGadgetLeftSettingAction = useCallback(
    async (origin: GridState, props: GridItemOption, limitAmount: number) => {
      let arrangeLeft: GridItemOption[] = [...origin.left.list]
      if (origin.left.list && origin.left.list.length > 0) {
        const findIndex = origin.left.list.findIndex(e => e.id.toString() === props.id.toString())
        if (findIndex !== undefined && findIndex !== null) {
          arrangeLeft[findIndex] = {
            ...props,
            status: '',
            moreAmount: limitAmount,
          }
        }
      }
      dispatch(gridStateLayoutsLeftAction(arrangeLeft))
    },
    [gridState.left.list]
  )

  const setGadgetRightSettingAction = useCallback(
    async (origin: GridState, props: GridItemOption, limitAmount: number) => {
      let arrangeRight: GridItemOption[] = [...origin.right.list]
      if (origin.right.list && origin.right.list.length > 0) {
        const findIndex = origin.right.list.findIndex(e => e.id.toString() === props.id.toString())
        if (findIndex !== undefined && findIndex !== null) {
          arrangeRight[findIndex] = {
            ...props,
            status: '',
            moreAmount: limitAmount,
          }
        }
      }
      dispatch(gridStateLayoutsRightAction(arrangeRight))
    },
    [gridState.right.list]
  )

  const setGadgetPopupAction = useCallback(
    (origin: gadgetPopupProps) => {
      dispatch(gadgetPopupAction(origin))
    },
    [gadgetPopup.isOpen]
  )

  const setOpenGadgetPopupAction = useCallback(
    async (origin: GridState, keyNumber: number) => {
      let res: SelectListOptionItem[] = []
      if (origin.left.list.length + origin.right.list.length > 7) {
        openToast(`가젯은 최대 8개까지 추가할 수 있습니다.`, 'error')
      } else {
        for await (const gadgetItem of gadgetList) {
          let isPass = true
          const findLeft = origin.left.list.find(
            e =>
              e.id &&
              e.id.length > 0 &&
              e.id.split.length > 0 &&
              e.id.split('-')[0] !== 'keywordMonitoring' &&
              e.id.split('-')[0].toString() === gadgetItem.id.toString()
          )
          const findRight = origin.right.list.find(
            e =>
              e.id &&
              e.id.length > 0 &&
              e.id.split.length > 0 &&
              e.id.split('-')[0] !== 'keywordMonitoring' &&
              e.id.split('-')[0].toString() === gadgetItem.id.toString()
          )
          if (gadgetItem.id === 'keywordMonitoring') {
            if (keyNumber < 4) {
              isPass = true
            } else {
              isPass = false
            }
          }
          if (isPass) {
            res = [
              ...res,
              {
                id: gadgetItem.id,
                name: gadgetItem.name,
                extra: findLeft ? 'non' : findRight ? 'non' : '',
              },
            ]
          }
        }
        dispatch(
          gadgetPopupAction({
            isOpen: true,
            selectList: res,
          })
        )
      }
    },
    [gadgetPopup.isOpen, gadgetPopup.selectList]
  )

  const handleGadgetAdd = async (selected: SelectListOptionItem, origin: GridState, count: number) => {
    let tempSelectList: SelectListOptionItem[] = []
    if (origin.left.list.length + origin.right.list.length > 7) {
      openToast(`가젯은 최대 8개까지 추가할 수 있습니다.`, 'error')
    } else {
      const tempKeywordAmount = selected.id === 'keywordMonitoring' ? count + 1 : count
      const newList = [
        {
          id: selected.id + '-' + uuid(),
          keyId: '',
          title: selected.name,
          type: 'news',
          subType: 'line',
          count: 10,
          status: '',
          moreAmount: 0,
          isData: [],
          chartData: null,
        },
        ...origin.left.list,
      ]
      for await (const gadgetItem of gadgetList) {
        const findLeft = newList.find(
          e =>
            e.id &&
            e.id.length > 0 &&
            e.id.split.length > 0 &&
            e.id.split('-')[0] !== 'keywordMonitoring' &&
            e.id.split('-')[0].toString() === gadgetItem.id.toString()
        )
        const findRight = origin.right.list.find(
          e =>
            e.id &&
            e.id.length > 0 &&
            e.id.split.length > 0 &&
            e.id.split('-')[0] !== 'keywordMonitoring' &&
            e.id.split('-')[0].toString() === gadgetItem.id.toString()
        )
        tempSelectList = [
          ...tempSelectList,
          {
            id: gadgetItem.id,
            name: gadgetItem.name,
            extra: findLeft ? 'non' : findRight ? 'non' : '',
          },
        ]
      }
      await editUserLayout(newList, origin.right.list)
      dispatch(
        gadgetAddLayoutAction({
          left: newList,
          right: origin.right.list,
          keywordMonitoringAmount: tempKeywordAmount,
          selectList: tempSelectList,
          keywordMonitroingList:
            tempKeywordAmount > 0 ? [{ id: '', name: '선택' }, ...(await getKeywordMonitoringList())] : [],
        })
      )
    }
  }

  const registerGadget = async (
    origin: GridState,
    props: GridItemOption,
    gadgetCount: string,
    gadgetId: SelectListOptionItem,
    gadgetType: string,
    gadgetSubType: string,
    gadgetKey: string
  ) => {
    let res = ''
    let arrangeLeft: GridItemOption[] = [...origin.left.list]
    let arrangeRight: GridItemOption[] = [...origin.right.list]
    let tempKeyId = uuid()
    let tempTitle = props.title
    if (
      props.id &&
      props.id.length > 0 &&
      props.id.split.length > 0 &&
      props.id.split('-')[0] &&
      props.id.split('-')[0] === 'keywordMonitoring'
    ) {
      tempKeyId = gadgetId.id
      tempTitle = `모니터링: ${gadgetId.name}`
    }
    if (tempKeyId !== '') {
      if (gadgetKey === 'left') {
        const find = arrangeLeft.findIndex(e => e.id.toString() === props.id.toString())
        arrangeLeft[find] = {
          id: props.id,
          keyId: tempKeyId,
          title: tempTitle,
          type: gadgetType,
          subType: gadgetSubType,
          count: Number(gadgetCount),
          status: 'list',
          moreAmount: 0,
          isData: [],
          chartData: null,
        }
      } else {
        const find = arrangeRight.findIndex(e => e.id.toString() === props.id.toString())
        arrangeRight[find] = {
          id: props.id,
          keyId: tempKeyId,
          title: tempTitle,
          type: gadgetType,
          subType: gadgetSubType,
          count: Number(gadgetCount),
          status: 'list',
          moreAmount: 0,
          isData: [],
          chartData: null,
        }
      }
      await editUserLayout(arrangeLeft, arrangeRight)
      dispatch(
        gridStateLayoutsAction({
          left: arrangeLeft,
          right: arrangeRight,
        })
      )
      res = '0000'
    } else {
      res = '9999'
    }

    return res
  }

  const handleDragStop = async ({ source, destination }: DropResult, origin: GridState) => {
    if (destination === undefined || destination === null) return null
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null

    let res = origin
    let start = { ...origin.left }
    let end = { ...origin.left }
    if (source.droppableId !== 'left') {
      start = { ...origin.right }
    }
    if (destination.droppableId !== 'left') {
      end = { ...origin.right }
    }
    if (source.droppableId === destination.droppableId) {
      const newList = [...start.list].filter((_: any, idx: number) => idx !== source.index)
      newList.splice(destination.index, 0, [...start.list][source.index])
      res = {
        ...origin,
        [start.id]: {
          id: start.id,
          list: newList,
        },
      }
    } else {
      const newStartList = [...start.list].filter((_: any, idx: number) => idx !== source.index)
      const newEndList = [...end.list]
      newEndList.splice(destination.index, 0, [...start.list][source.index])
      res = {
        ...origin,
        [start.id]: {
          id: start.id,
          list: newStartList,
        },
        [end.id]: {
          id: end.id,
          list: newEndList,
        },
      }
    }
    await editUserLayout(res.left.list, res.right.list)
    dispatch(
      gridStateLayoutsAction({
        left: res.left.list,
        right: res.right.list,
      })
    )
  }

  const conditionConvert = async (confitions: string) => {
    let res: ESearchNewsCondDto = {
      timezone: timeZone,
      periodStartYear: moment().subtract({ days: 14 }).format('YYYY'),
      periodStartMonth: moment().subtract({ days: 14 }).format('MM'),
      periodStartDay: moment().subtract({ days: 14 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: 1,
      size: 20,
      sort: [`inserted!desc`],
      groupId: userSelectGroup,
    }
    try {
      let conditions = getObjectFromBase64(confitions)
      if (conditions && conditions !== '') {
        const params = {
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
        if (params.and && params.and !== '') {
          res.queryAnd = params.and
        }
        if (params.or && params.or !== '') {
          res.queryOr = params.or
        }
        if (params.not && params.not !== '') {
          res.queryNot = params.not
        }
        if (params.mediaType && params.mediaType.length > 0) {
          //@ts-ignore
          res.categoryList = params.mediaType.map(e => {
            return e.id
          })
        }
        if (params.existMultimedia && params.existMultimedia.length > 0) {
          //@ts-ignore
          const existImage = params.existMultimedia.find(e => e.id === 'IMAGE')
          //@ts-ignore
          const existVideo = params.existMultimedia.find(e => e.id === 'VIDEO')
          if (existImage) {
            res.existImage = true
          }
          if (existVideo) {
            res.existVideo = true
          }
        }
        if (params.mediaValue && params.mediaValue.id !== '') {
          res.value = params.mediaValue.id.toString()
        }
        if (params.mediaTagList && params.mediaTagList.length > 0) {
          //@ts-ignore
          res.mediaIdList = params.mediaTagList.map(e => {
            return Number(e.id)
          })
        }
        if (params.journalistTagList && params.journalistTagList.length > 0) {
          //@ts-ignore
          res.journalistIdList = params.journalistTagList.map(e => {
            return Number(e.id)
          })
        }
        if (params.tone && params.tone.length > 0) {
          //@ts-ignore
          res.toneList = params.tone.map(e => {
            return e.id.toString()
          })
        }
        if (params.tag && params.tag.length > 0) {
          //@ts-ignore
          res.tagIdList = params.tag.map(e => {
            return Number(e.id)
          })
        }
        if (params.url && params.url !== '') {
          res.linkUrl = params.url
        }
        if (params.publishingPeriod && params.publishingPeriod.length > 0) {
          //@ts-ignore
          res.pubCycleList = params.publishingPeriod.map(e => {
            return e.id.toString()
          })
        }
        if (params.mediaBookList && params.mediaBookList.length > 0) {
          //@ts-ignore
          res.mediaListId = params.mediaBookList.map(e => {
            return Number(e.id)
          })
        }
        if (params.clipbook && params.clipbook.id !== '') {
          res.clipbook = params.clipbook.id
        }
        if (params.clipbookValue && params.clipbookValue.length > 0) {
          //@ts-ignore
          res.clipbookIdList = params.clipbookValue.map(e => {
            return Number(e.id)
          })
        }
        if (params.coverage && params.coverage.id !== '') {
          res.coverageYn = params.coverage.id
        }
        if (params.informationType && params.informationType.id !== '') {
          res.sourceType = params.informationType.id
        }
      }
    } catch (e) {}
    return res
  }

  const getCommonCode = async (code: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const getGroupList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetGroupSearch({
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
        userId: userInfo.userId,
      })
      if (status === 'S') {
        const groupData = data as PageGroupDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.groupId) {
              res = [
                ...res,
                {
                  idKey: Number(paramElement.groupId),
                  isLink: '',
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.name || '',
                  displayName: `${paramElement?.count}명` || '',
                  count: '',
                  date: '',
                },
              ]
            }
          }
        }
      } else {
        openToast(message?.message ?? '그룹 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }

  const getPressList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetJournalistGroup({
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const groupData = data as PageJrnlstListDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.jrnlstListId) {
              res = [
                ...res,
                {
                  idKey: paramElement.jrnlstListId,
                  isLink: `/contacts/list-result?jrnlstList_id=${paramElement.jrnlstListId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: paramElement?.journalistCount?.toString() || '0',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast(message?.message ?? '언론인 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }

  const getMediaList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetMediaGroup({
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const groupData = data as PageMediaListDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.mediaListId) {
              res = [
                ...res,
                {
                  idKey: paramElement.mediaListId,
                  isLink: `/media/list-result?mediaList_id=${paramElement.mediaListId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: paramElement?.mediaCount?.toString() || '0',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast(message?.message ?? '미디어 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}

    return res
  }

  const getCustomPressList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetJournalistCustomSearchList({
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const groupData = data as PageJournalistSrchDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.jrnlstSrchId) {
              res = [
                ...res,
                {
                  idKey: paramElement.jrnlstSrchId,
                  isLink: `/contacts/saved-search?journal_contact_id=${paramElement.jrnlstSrchId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: '',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast(message?.message ?? '언론인 맞춤 검색 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }

  const getCustomMediaList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetMediaCustomSearchList({
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const groupData = data as PageMediaSrchDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.mediaSrchId) {
              res = [
                ...res,
                {
                  idKey: paramElement.mediaSrchId,
                  isLink: `/media/saved-search?media_contact_id=${paramElement.mediaSrchId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: '',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast(message?.message ?? '미디어 맞춤 검색 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }

  const getActionList = async (categoryList: string) => {
    let preloadCommonCode: CommonCode[] = []
    let res: dashboardContentType[] = []
    try {
      if (categoryList === '') {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'ACTION_CATEGORY_ALL')
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode('ACTION_CATEGORY_ALL')
        }
      }
      const { status, data, message } = await apiGetActionListByConfition({
        groupId: userSelectGroup,
        categoryList: categoryList !== '' ? [categoryList] : [],
        page: 1,
        size: 5000,
        sort: ['updateAt!desc'],
      })
      if (status === 'S') {
        const apiData = data as PageActionDtoForList
        if (apiData && apiData.content && apiData.content.length > 0) {
          for await (const paramElement of apiData.content) {
            if (paramElement.actionId) {
              if (categoryList !== '') {
                res = [
                  ...res,
                  {
                    idKey: Number(paramElement.actionId),
                    contentType: '',
                    contentId: '',
                    isLink: `/activity/record/${Number(paramElement.actionId) || 0}`,
                    type: '',
                    department: '',
                    title: paramElement?.title || '',
                    displayName: '',
                    count: '',
                    date: paramElement.updateAt
                      ? getDateFormat(timeZone, paramElement?.updateAt) || ''
                      : getDateFormat(timeZone, paramElement?.regisAt || ''),
                  },
                ]
              } else {
                const findCategory = preloadCommonCode.find(e => e.code === paramElement.category)
                if (findCategory) {
                  res = [
                    ...res,
                    {
                      idKey: Number(paramElement.actionId),
                      contentType: findCategory.name,
                      contentId: findCategory.code,
                      isLink: `/activity/record/${Number(paramElement.actionId) || 0}`,
                      type: '',
                      department: '',
                      title: paramElement?.title || '',
                      displayName: paramElement?.owner?.displayName || '',
                      count: '',
                      date: paramElement.updateAt
                        ? getDateFormat(timeZone, paramElement?.updateAt) || ''
                        : getDateFormat(timeZone, paramElement?.regisAt || ''),
                    },
                  ]
                }
              }
            }
          }
        }
      } else {
        openToast(
          categoryList !== ''
            ? '보도자료 배포 리스트 불러오기에 실패했습니다.'
            : '활동 리스트 불러오기에 실패했습니다.',
          'error'
        )
      }
    } catch (e) {}
    return res
  }

  const getClipBookList = async (type: string) => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetClipbooks({
        page: 1,
        size: 5000,
        sort: 'updateAt!desc',
        groupId: userSelectGroup,
        type,
      })
      if (status === 'S') {
        const groupData = data as PageClipBookDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.clipBookId) {
              res = [
                ...res,
                {
                  idKey: paramElement.clipBookId,
                  isLink: `/news/clipbook-result?clipbook_id=${paramElement.clipBookId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: paramElement?.newslist?.length.toString() || '0',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast(
          type === 'NORMAL'
            ? '클립북 리스트 불러오기에 실패했습니다.'
            : '커버리지 클립북 리스트 불러오기에 실패했습니다.',
          'error'
        )
      }
    } catch (e) {}

    return res
  }

  const getMonitoringList = async () => {
    let res: dashboardContentType[] = []
    try {
      const { status, data, message } = await apiGetMonitoringSearch({
        page: 1,
        size: 5000,
        sort: 'updateAt!desc',
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        const groupData = data as PageNewsSrchDto
        if (groupData && groupData.content && groupData.content.length > 0) {
          for await (const paramElement of groupData.content) {
            if (paramElement.newsSrchId) {
              res = [
                ...res,
                {
                  idKey: paramElement.newsSrchId,
                  isLink: `/news/monitoring?monitoring_id=${paramElement.newsSrchId}`,
                  contentType: '',
                  contentId: '',
                  type: '',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.owner?.displayName || '',
                  count: '',
                  date: paramElement.updateAt
                    ? getDateFormat(timeZone, moment(paramElement?.updateAt).format('YYYY-MM-DD')) || ''
                    : getDateFormat(timeZone, moment(paramElement?.regisAt).format('YYYY-MM-DD') || ''),
                },
              ]
            }
          }
        }
      } else {
        openToast('모니터링 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }
  const getNewsList = async (condition: GridItemOption, zNumber: number) => {
    let res: dashboardContentType[] = []
    try {
      const responseCondition = await getFilter(condition)
      const { status, data, message } = await apiPostNewsSearch({
        ...responseCondition,
        size: 100 * zNumber,
      })
      if (status === 'S') {
        const apiData = data as ElasticSearchReturnDtoNewsDocumentDto
        if (apiData && apiData.name && apiData.name.length > 0) {
          for await (const paramElement of apiData.name) {
            if (paramElement.newsid) {
              res = [
                ...res,
                {
                  idKey: Number(paramElement.newsid),
                  isLink: `/news/record/${Number(paramElement.newsid) || 0}`,
                  contentType: '',
                  contentId: '',
                  type: 'keyword',
                  department: '',
                  title: paramElement?.title || '',
                  displayName: paramElement?.mname || '',
                  count: '',
                  date: paramElement.inserted
                    ? getDateFormat(timeZone, moment(paramElement?.inserted).format('YYYY-MM-DD')) || ''
                    : '',
                },
              ]
            }
          }
        }
        //res = type !== 'chart' ? apiData.name ?? [] : apiData.filterDate ?? []
      } else {
        openToast('키워드 모니터링 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return res
  }

  const getChartList = async (condition: GridItemOption) => {
    let maxCount = 0
    let dailyNewsCountList: MediaNameCountType[] = []
    try {
      const responseCondition = await getFilter(condition)
      const { status, data, message } = await apiPostNewsSearch({
        ...responseCondition,
        size: 1,
      })
      if (status === 'S') {
        const apiData = data as ElasticSearchReturnDtoNewsDocumentDto
        if (apiData.filterDate && apiData.filterDate.length > 0) {
          for await (const paramElement of apiData.filterDate) {
            const count = Object.values(paramElement)[0] as any
            dailyNewsCountList = [
              ...dailyNewsCountList,
              {
                name: Object.keys(paramElement)[0] ? Object.keys(paramElement)[0] : '',
                count: count ? Number(count) : 0,
              },
            ]
          }
          maxCount = await calculateMaxCount(dailyNewsCountList.map(item => Number(item.count)))
        }
      } else {
        openToast('키워드 모니터링 리스트 불러오기에 실패했습니다.', 'error')
      }
    } catch (e) {}
    return {
      maxCount,
      categories: dailyNewsCountList.map(item => moment(item.name).format('MM/DD')),
      newDailyNewsDataSeries: dailyNewsCountList.map(item => item.count),
    }
  }

  const getKeywordMonitoringCalculate = async (props: NewsSrchDto[]) => {
    let keywordMonitoring: SelectListOptionItem[] = []
    for await (const newsSrchDto of props) {
      if (newsSrchDto && newsSrchDto.conditions && newsSrchDto.conditions !== '') {
        const res = await conditionConvert(newsSrchDto.conditions)
        if (newsSrchDto.newsSrchId && newsSrchDto?.title) {
          if (res.queryAnd && res.queryAnd !== '') {
            keywordMonitoring = [
              ...keywordMonitoring,
              { id: newsSrchDto?.newsSrchId?.toString(), name: newsSrchDto?.title?.toString() },
            ]
          } else if (res.queryOr && res.queryOr !== '') {
            keywordMonitoring = [
              ...keywordMonitoring,
              { id: newsSrchDto?.newsSrchId?.toString(), name: newsSrchDto?.title?.toString() },
            ]
          } else if (res.queryNot && res.queryNot !== '') {
            keywordMonitoring = [
              ...keywordMonitoring,
              { id: newsSrchDto?.newsSrchId?.toString(), name: newsSrchDto?.title?.toString() },
            ]
          }
        }
      }
    }

    return keywordMonitoring
  }

  const createIncrementArray = async (maxValue: number, increment: number) => {
    const length = Math.ceil(maxValue / increment) + 1
    return Array.from({ length }, (_, i) => i * increment).filter(num => num <= maxValue)
  }

  const calculateMaxCount = async (confitions: number[]) => {
    let isDone = false
    let res = Math.max(...confitions)
    const numberList = await createIncrementArray(1000000, 5)

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

  const getKeywordMonitoringList = async () => {
    let preloadCommonCode: CommonCode[] = []
    let keywordMonitoring: SelectListOptionItem[] = []
    let filterParam: SearchNewsSrchCategoryListDto = {
      requestList: [],
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
    }
    try {
      const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'MONITORING_CATEGORY')
      if (find) {
        //@ts-ignore
        preloadCommonCode = find.commonCodeList
      } else {
        preloadCommonCode = await getCommonCode('MONITORING_CATEGORY')
      }
      const { status, data, message } = await getCompanyMonitoring.mutateAsync({
        ...filterParam,
        requestList:
          preloadCommonCode.length > 0
            ? preloadCommonCode.map(e => {
                return {
                  category: e.code,
                  size: API_LIST_TYPE_MAX_COUNT,
                }
              })
            : [],
      })
      console.log('categoryListData', data)
      if (status === 'S') {
        const categoryListData = data as ResponseNewsSrchCategoryDto[]
        if (categoryListData.length > 0) {
          for await (const categoryListDatum of categoryListData) {
            if (categoryListDatum.content && categoryListDatum.content?.length > 0) {
              const newsNclist: NewsSrchDto[] = categoryListDatum.content
              const temp = await getKeywordMonitoringCalculate(newsNclist)
              keywordMonitoring = keywordMonitoring.concat(temp)
            }
          }
        }
      }
    } catch (e) {}
    console.log('keywordMonitoring', keywordMonitoring)
    return keywordMonitoring
  }

  const getFilter = async (props: GridItemOption) => {
    let preloadCommonCode: CommonCode[] = []
    let filterParam: SearchNewsSrchCategoryListDto = {
      requestList: [],
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
    }
    let conditions: null | NewsSrchDto = null
    let apiParams: ESearchNewsCondDto = {
      timezone: timeZone,
      periodStartYear: moment().subtract({ days: 14 }).format('YYYY'),
      periodStartMonth: moment().subtract({ days: 14 }).format('MM'),
      periodStartDay: moment().subtract({ days: 14 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: 1,
      size: 20,
      sort: [`inserted!desc`],
      groupId: userSelectGroup,
    }
    try {
      const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'MONITORING_CATEGORY')
      if (find) {
        //@ts-ignore
        preloadCommonCode = find.commonCodeList
      } else {
        preloadCommonCode = await getCommonCode('MONITORING_CATEGORY')
      }
      const { status, data, message } = await getCompanyMonitoring.mutateAsync({
        ...filterParam,
        requestList:
          preloadCommonCode.length > 0
            ? preloadCommonCode.map(e => {
                return {
                  category: e.code,
                  size: API_LIST_TYPE_MAX_COUNT,
                }
              })
            : [],
      })
      if (status === 'S') {
        const categoryListData = data as ResponseNewsSrchCategoryDto[]
        if (categoryListData.length > 0) {
          for await (const categoryListDatum of categoryListData) {
            if (categoryListDatum.content && categoryListDatum.content?.length > 0) {
              const findNm = preloadCommonCode.find(i => i.code === categoryListDatum.category)
              if (findNm && props.keyId) {
                const getId = categoryListDatum.content.find(k => k.newsSrchId === Number(props.keyId))
                if (getId) {
                  conditions = getId
                }
              }
            }
          }
        }
        if (conditions && conditions.conditions && conditions.conditions !== '') {
          const res = await conditionConvert(conditions.conditions)
          if (res) {
            apiParams = res
          }
        }
      }
    } catch (e) {}
    return apiParams
  }

  const moveToUrl = async (id: string, keyId?: string) => {
    if (id.length > 0 && id.split.length > 0 && id.split('-')[0] !== '') {
      if (id.split('-')[0] === 'activity') {
        await router.push('/activity/search')
      } else if (id.split('-')[0] === 'pressRelease') {
        const filter = setObjectToBase64({
          categoryList: ['PRESS_RELEASE'],
          activityId: 0,
        })
        await router.push(`/activity/search?filter=${filter}`)
      } else if (id.split('-')[0] === 'pressList') {
        await router.push('/contacts/list')
      } else if (id.split('-')[0] === 'mediaList') {
        await router.push('/media/list')
      } else if (id.split('-')[0] === 'pressCustomSearch') {
        await router.push('/contacts/saved-search')
      } else if (id.split('-')[0] === 'mediaCustomSearch') {
        await router.push('/media/saved-search')
      } else if (id.split('-')[0] === 'clipbook') {
        await router.push('/news/clipbook?normal')
      } else if (id.split('-')[0] === 'coverageClipbook') {
        await router.push('/news/clipbook?coverage')
      } else if (id.split('-')[0] === 'monitoring') {
        await router.push('/news/saved-search-manage')
      } else if (id.split('-')[0] === 'keywordMonitoring') {
        await router.push(`/news/monitoring?monitoring_id=${keyId}`)
      }
    }
  }

  const calcurateItemHeight = (length: number) => {
    const minHeight = 1
    let height = length * 0.47 + 0.8 - length * 0.04

    if (length > 10) {
      height -= (length - 10) * 0.003

      if (length > 20) {
        height -= (length - 20) * 0.0008
      }
    }

    if (height < minHeight) {
      height = minHeight
    }

    return height * 100
  }

  const getGadgetItem = async (props: GridItemOption, zNumber: number) => {
    let res: dashboardContentType[] = []
    if (props.id && props.id.length > 0 && props.id.split.length > 0 && props.id.split('-')[0] !== '') {
      if (props.id.split('-')[0] === 'activity') {
        res = await getActionList('')
      } else if (props.id.split('-')[0] === 'pressRelease') {
        res = await getActionList('PRESS_RELEASE')
      } else if (props.id.split('-')[0] === 'group') {
        res = await getGroupList()
      } else if (props.id.split('-')[0] === 'pressList') {
        res = await getPressList()
      } else if (props.id.split('-')[0] === 'mediaList') {
        res = await getMediaList()
      } else if (props.id.split('-')[0] === 'pressCustomSearch') {
        res = await getCustomPressList()
      } else if (props.id.split('-')[0] === 'mediaCustomSearch') {
        res = await getCustomMediaList()
      } else if (props.id.split('-')[0] === 'clipbook') {
        res = await getClipBookList('NORMAL')
      } else if (props.id.split('-')[0] === 'coverageClipbook') {
        res = await getClipBookList('COVERAGE')
      } else if (props.id.split('-')[0] === 'monitoring') {
        res = await getMonitoringList()
      } else if (props.id.split('-')[0] === 'keywordMonitoring') {
        res = await getNewsList(props, zNumber)
      }
    }

    return res
  }

  const editUserLayout = async (left: GridItemOption[], right: GridItemOption[]) => {
    if (userInfo.userId) {
      try {
        const leftList = [...left].map(e => {
          return {
            ...e,
            moreAmount: 0,
            chartData: null,
            isData: [],
          }
        })
        const rightList = [...right].map(e => {
          return {
            ...e,
            moreAmount: 0,
            chartData: null,
            isData: [],
          }
        })
        const layout = setObjectToBase64({
          left: leftList,
          right: rightList,
        })
        const { status, message } = await updateUserDashboard.mutateAsync({
          id: userInfo.userId,
          dashboard: layout,
        })
        if (status !== 'S') {
          openToast('레이아웃 저장에 실패하였습니다.', 'error')
        }
      } catch (e) {}
    }
  }

  const setGadgetDeleteAction = async (props: GridState, origin: GridItemOption, count: number, gadgetKey: string) => {
    let tempKeywordAmount = count
    if (
      props &&
      props.left &&
      props.right &&
      props.right.list &&
      props.left.list &&
      props.left.list.length + props.right.list.length > 1
    ) {
      let arrangeLeft: GridItemOption[] = [...props.left.list]
      let arrangeRight: GridItemOption[] = [...props.right.list]
      if (gadgetKey === 'left') {
        arrangeLeft = arrangeLeft.filter(k => k.id.toString() !== origin.id.toString())
      } else {
        arrangeRight = arrangeRight.filter(k => k.id.toString() !== origin.id.toString())
      }
      if (
        origin.id &&
        origin.id.length > 0 &&
        origin.id.split.length > 0 &&
        origin.id.split('-')[0] &&
        origin.id.split('-')[0] === 'keywordMonitoring'
      ) {
        tempKeywordAmount = count - 1
      }
      await editUserLayout(arrangeLeft, arrangeRight)
      dispatch(
        deleteLayoutAction({
          left: arrangeLeft,
          right: arrangeRight,
          keywordMonitoringAmount: tempKeywordAmount,
        })
      )
    } else {
      openToast('적어도 한개의 가젯이 존재해야합니다.', 'error')
    }
  }

  const init = async () => {
    let tempKeywordMonitroingList: SelectListOptionItem[] = []
    let gadgetDataRight: GridItemOption[] = []
    let gadgetDataLeft: GridItemOption[] = [
      {
        id: 'pressBriefing-' + uuid(),
        keyId: '',
        title: '미디어 소식',
        type: 'news',
        subType: 'line',
        count: 10,
        status: 'list',
        moreAmount: 0,
        isData: [],
        chartData: null,
      },
    ]
    console.log('init')
    let tempKeywordAmount = 0
    dispatch(userLoadingAction(true))
    try {
      const { status, data: apiData, message } = await apiGetOneUser(userInfo?.userId || 0)
      if (status === 'S') {
        const res = apiData as UserDto
        if (res.dashboardLayout && res.dashboardLayout !== '') {
          let conditions = getObjectFromBase64(res.dashboardLayout)
          console.log('conditions', conditions)
          if (conditions && conditions !== '') {
            if (conditions.left && conditions.left.length > 0) {
              for await (const condition of conditions.left) {
                if (
                  condition.id &&
                  condition.id.length > 0 &&
                  condition.id.split.length > 0 &&
                  condition.id.split('-')[0] &&
                  condition.id.split('-')[0] === 'keywordMonitoring'
                ) {
                  tempKeywordAmount += 1
                }
              }
              gadgetDataLeft = conditions.left
            }
            if (conditions.right && conditions.right.length > 0) {
              for await (const condition of conditions.right) {
                if (
                  condition.id &&
                  condition.id.length > 0 &&
                  condition.id.split.length > 0 &&
                  condition.id.split('-')[0] &&
                  condition.id.split('-')[0] === 'keywordMonitoring'
                ) {
                  tempKeywordAmount += 1
                }
              }
              gadgetDataRight = conditions.right
            }
          }
        }
        if (tempKeywordAmount > 0) {
          tempKeywordMonitroingList = await getKeywordMonitoringList()
          console.log('tempKeywordMonitroingList', tempKeywordMonitroingList)
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(
      initAction({
        left: gadgetDataLeft,
        right: gadgetDataRight,
        keywordMonitoringAmount: tempKeywordAmount,
        keywordMonitroingList: [{ id: '', name: '선택' }, ...tempKeywordMonitroingList],
      })
    )
  }

  return {
    licenseInfo,
    userInfo,
    gridState,
    userLoading,
    gadgetPopup,
    keywordMonitoring,
    keywordMonitroingList,
    settingsRefinedValue,

    init,
    moveToUrl,
    handleDragStop,
    handleGadgetAdd,
    registerGadget,
    getGadgetItem,
    calcurateItemHeight,
    setGadgetDeleteAction,
    getChartList,

    setGadgetPopupAction,
    setOpenGadgetPopupAction,
    setGadgetLeftSettingAction,
    setGadgetRightSettingAction,
    setGadgetRightCancelAction,
    setGadgetLeftCancelAction,
    setGadgetAction,
    setItemList,
    setChartData,
    setsetMoreAmount,
  }
}
