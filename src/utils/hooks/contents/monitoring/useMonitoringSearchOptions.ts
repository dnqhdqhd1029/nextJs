import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'

import { extendedCommonCodeTargetList, monitoringInitParams } from '~/components/contents/monitoring/Search/defaultData'
import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import { openMonitoringPopupAction } from '~/stores/modules/contents/monitoring/monitoringPopup'
import {
  additionalParamAction,
  additionalParamProps,
  clipbookListAction,
  coverageListAction,
  informationTypeListAction,
  initAction,
  keywordsAction,
  keywordsProps,
  mediaTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaTypePopupProps,
  mediaValueListAction,
  monitoringCategoryListAction,
  monitoringListAction,
  monitoringListDto,
  monitoringListSearchAction,
  newsMultiMediaListAction,
  periodListAction,
  publishingPeriodListAction,
  researchOptionAction,
  resetSearchOption,
  setMediaTypePopupData,
  toneListAction,
} from '~/stores/modules/contents/monitoring/newsSearch'
import {
  BaseResponseCommonObject,
  ESearchNewsCondDto,
  type NewsSrchDto,
  ResponseNewsSrchCategoryDto,
  SearchNewsSrchCategoryListDto,
  TagDto,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import {
  apiGetCommonCode,
  CommonCode,
  useGetCommonCode,
  useGetCommonCodeParentCommonCodeId,
} from '~/utils/api/common/useGetCommonCode'
import { UseGetJournalistCustomSearchListParams } from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import {
  useGetMonitoringByCategory,
  usePostGetMonitoringByCategory,
} from '~/utils/api/monitoring/usePostGetMonitoringByCategory'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMonitoringSearchOptions = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    monitoringActivate,
    parentsCode,
    keywords,
    additionalParam,
    periodList,
    mediaValueList,
    toneList,
    publishingPeriodList,
    informationTypeList,
    coverageList,
    clipbookList,
    mediaTypePopup,
    monitoringCategoryList,
    monitoringList,
    monitoringListOption,
    mediaTypeList,
    searchActivate,
    mediaTypePopupList,
    newsMultiMediaList,
  } = useAppSelector(state => state.newsSearchOptionsSlice)
  const { licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } = useAppSelector(
    state => state.authSlice
  )

  const getCompanyMonitoring = usePostGetMonitoringByCategory()

  const setResetSearchOption = useCallback(async () => {
    dispatch(resetSearchOption())
  }, [keywords, additionalParam, searchActivate])

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

  const setSelectedTypeMediaTypePopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaTypePopupProps) => {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setDeleteSelectedTypeMediaTypePopup = useCallback(
    async (props: mediaTypePopupProps) => {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaTypePopup.selectedType]
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

  const setkeywordsActionAnd = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        and: e,
      }
      dispatch(keywordsAction(params))
    },
    [keywords.and]
  )

  const setkeywordsActionOr = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        or: e,
      }
      dispatch(keywordsAction(params))
    },
    [keywords.or]
  )

  const setkeywordsActionNot = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        not: e,
      }
      dispatch(keywordsAction(params))
    },
    [keywords.not]
  )

  const setAdditionalParamUrl = useCallback(
    async (e: string, props: additionalParamProps) => {
      const params = {
        ...props,
        url: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.url]
  )

  const setAdditionalParamMediaValue = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        mediaValue: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.mediaValue]
  )

  const setAdditionalParamMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.mediaTagList]
  )

  const setAdditionalParamJournalistTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        journalistTagList: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.journalistTagList]
  )

  const setAdditionalParamMediaBookList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaBookList: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.mediaBookList]
  )

  const setAdditionalParamClipbookList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        clipbookValue: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.clipbookValue]
  )

  const setAdditionalParamClipbook = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        clipbook: e,
        clipbookValue: e.id === 'Y' ? props.clipbookValue : [],
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.clipbook]
  )

  const setAdditionalParamCoverage = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        coverage: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.coverage]
  )

  const setAdditionalParamInformationType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(additionalParamAction(params))
    },
    [additionalParam.informationType]
  )

  const mediaTypePopupAdjust = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        setMediaTypePopupData({
          ...props,
          mediaType: e,
        })
      )
    },
    [additionalParam.mediaType]
  )

  const setAdditionalParamPeriodDateAction = useCallback(
    async (start: Date, end: Date, props: additionalParamProps) => {
      dispatch(
        additionalParamAction({
          ...props,
          startPeriod: start,
          endPeriod: end,
          periodTag: [
            {
              id: props.period.id,
              label: moment(start).format('YYYY-MM-DD') + '~' + moment(end).format('YYYY-MM-DD'),
            },
          ],
        })
      )
    },
    [additionalParam.periodTag, additionalParam.startPeriod, additionalParam.endPeriod]
  )

  const setAdditionalParamPeriod = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      dispatch(
        additionalParamAction({
          ...props,
          period: e,
          periodTag: [
            {
              id: e.id?.toString() ?? '',
              label: e.name ?? '',
            },
          ],
        })
      )
    },
    [additionalParam.periodTag, additionalParam.period]
  )

  const setAdditionalParamPeriodDate = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      dispatch(
        additionalParamAction({
          ...props,
          period: e,
        })
      )
    },
    [additionalParam.period]
  )

  const setAdditionalParamPublishingPeriod = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        additionalParamAction({
          ...props,
          publishingPeriod: e,
        })
      )
    },
    [additionalParam.publishingPeriod]
  )

  const setAdditionalParamExistMultimedia = useCallback(
    async (i: boolean, e: SelectListOptionItem, props: additionalParamProps) => {
      let dataList = [...props.existMultimedia]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.id?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.id)
      }
      dispatch(
        additionalParamAction({
          ...props,
          existMultimedia: dataList,
        })
      )
    },
    [additionalParam.existMultimedia]
  )

  const setAdditionalParamTone = useCallback(
    async (i: boolean, e: SelectListOptionItem, props: additionalParamProps) => {
      let dataList = [...props.tone]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.id?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.id)
      }
      dispatch(
        additionalParamAction({
          ...props,
          tone: dataList,
        })
      )
    },
    [additionalParam.tone]
  )

  const setAdditionalParamTagSuccess = useCallback(
    async (e: TagDto, props: additionalParamProps) => {
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
      dispatch(additionalParamAction(param))
    },
    [additionalParam.tag]
  )

  const setAdditionalParamTagStatusOnChange = useCallback(
    async (item: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        additionalParamAction({
          ...props,
          tag: item,
        })
      )
    },
    [additionalParam.tag]
  )

  const setTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'periodTag') {
        params.periodTag = props.periodTag.filter(item => item.id !== e.id)
        params.period = { id: '', name: '선택' }
      } else if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'journalistTagList') {
        params.journalistTagList = props.journalistTagList.filter(item => item.id !== e.id)
      } else if (type === 'tone') {
        params.tone = props.tone.filter(item => item.id !== e.id)
      } else if (type === 'existMultimedia') {
        params.existMultimedia = props.existMultimedia.filter(item => item.id !== e.id)
      } else if (type === 'tag') {
        params.tag = props.tag.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      } else if (type === 'mediaBookList') {
        params.mediaBookList = props.mediaBookList.filter(item => item.id !== e.id)
      } else if (type === 'clipbookValue') {
        params.clipbookValue = props.clipbookValue.filter(item => item.id !== e.id)
      }

      dispatch(additionalParamAction(params))
    },
    [additionalParam]
  )

  const setTagDeleteControl = useCallback(
    async (props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'periodTag') {
        params.periodTag = []
      } else if (type === 'mediaType') {
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
      dispatch(additionalParamAction(params))
    },
    [additionalParam]
  )

  const setMonitoringListOptionAction = useCallback(
    async (e: boolean, list: SelectListOptionItem[]) => {
      dispatch(monitoringListSearchAction(e))
      await monitoringByCategory(e, list)
    },
    [monitoringListOption]
  )

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
    props: additionalParamProps
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
    dispatch(
      mediaTypePopupAction({
        isOpen: tempKeyword === '' ? false : e,
        selectedValue: tempKeyword,
        selectedType: props.mediaType,
      })
    )
  }

  const moveSearchResult = async (keywords: keywordsProps, props: additionalParamProps) => {
    let res = {
      ...keywords,
      ...props,
      news_id: 0,
      sort: [`inserted!desc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
    }
    if (keywords.and !== '') {
      res = {
        ...keywords,
        ...props,
        news_id: 0,
        sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      }
    } else if (keywords.or !== '') {
      res = {
        ...keywords,
        ...props,
        news_id: 0,
        sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      }
    } else if (keywords.not !== '') {
      res = {
        ...keywords,
        ...props,
        news_id: 0,
        sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      }
    }
    console.log('{ ...param.keyword, ...param.extra, news_id: 0 }', JSON.stringify(res))
    const filter = setObjectToBase64(res)
    await router.push(`/news/search-result?filter=${filter}`)
  }

  const openMonitoringPopup = async (
    list: SelectListOptionItem[],
    keywords: keywordsProps,
    props: additionalParamProps
  ) => {
    const param = {
      category: list,
      scrop: shareCodeData.news_search,
      keyword: keywords,
      extra: {
        mediaType: props.mediaType,
        mediaValue: props.mediaValue,
        mediaTagList: props.mediaTagList,
        journalistTagList: props.journalistTagList,
        tone: props.tone,
        existMultimedia: props.existMultimedia,
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

  const monitoringByCategory = async (isOwner: boolean, list: SelectListOptionItem[]) => {
    let params: SearchNewsSrchCategoryListDto = {
      requestList:
        list.length > 0
          ? list.map(e => {
              return {
                category: e.id,
                size: API_LIST_TYPE_MAX_COUNT,
              }
            })
          : [],
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
    }
    if (isOwner) {
      params.ownerId = Number(userInfo.userId)
    }
    const { status, data, message } = await getCompanyMonitoring.mutateAsync(params)
    if (status === 'S') {
      const categoryListData = data as ResponseNewsSrchCategoryDto[]
      if (categoryListData) {
        await initMonitoringByCategory(categoryListData, list)
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initMonitoringByCategory = async (param: ResponseNewsSrchCategoryDto[], list?: SelectListOptionItem[]) => {
    if (param.length > 0) {
      let temp: monitoringListDto[] = []
      for await (const categoryListDatum of param) {
        if (categoryListDatum.content && categoryListDatum.content?.length > 0) {
          const categoryData = list ? list : monitoringCategoryList
          const find = categoryData.find(i => i.id === categoryListDatum.category)
          if (find) {
            temp = [
              ...temp,
              {
                ...categoryListDatum,
                categoryNm: find.name,
              },
            ]
          }
        }
      }
      dispatch(monitoringListAction(temp))
    }
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

  const getCommonCode = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
  }

  const init = async () => {
    let tempMonitoringCategoryList: SelectListOptionItem[] = []
    let preloadCommonCode: CommonCode[] = []
    let params = {
      searchActivate: false,
      keywords: {
        and: '',
        or: '',
        not: '',
      },
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
        existMultimedia: [],
        clipbook: { id: '', name: '선택' },
        coverage: { id: '', name: '선택' },
        informationType: { id: '', name: '선택' },
      },
    }
    dispatch(initAction())
    try {
      for await (const param of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === param.id)
        //@ts-ignore
        if (find && find.commonCodeList && find.commonCodeList.length > 0) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(param.id)
        }
        if (param.id === 'MONITORING_CATEGORY') {
          tempMonitoringCategoryList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(monitoringCategoryListAction({ param: tempMonitoringCategoryList, group: userSelectGroup }))
        } else if (param.id === 'NEWS_INFO_TYPE') {
          dispatch(
            informationTypeListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'PUB_CYCLE') {
          dispatch(
            publishingPeriodListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'MEDIA_VALUE') {
          dispatch(
            mediaValueListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'NEWS_PERIOD') {
          dispatch(
            periodListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'COVERAGE_NEWS_YN') {
          dispatch(
            coverageListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'MEDIA_TYPE') {
          dispatch(
            mediaTypeListAction(
              preloadCommonCode.map(e => {
                return { id: e.commonCodeId.toString(), name: e.name }
              })
            )
          )
        } else if (param.id === 'CLIPBOOK_NEWS_YN') {
          dispatch(
            clipbookListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'TONE') {
          dispatch(
            toneListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'NEWS_SEARCH_MULTIMEDIA') {
          dispatch(
            newsMultiMediaListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        }
      }
      await monitoringByCategory(false, tempMonitoringCategoryList)
      if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
        const subParams = window.location.search.substring(1).split('?')
        const querys = await setQueryParam(subParams)
        if (querys && querys !== '') {
          let conditions = getObjectFromBase64(querys)
          params = {
            searchActivate: true,
            keywords: {
              and: conditions.and,
              or: conditions.or,
              not: conditions.not,
            },
            additionalParam: {
              period: conditions.period,
              startPeriod: conditions.startPeriod,
              endPeriod: conditions.endPeriod,
              periodTag: conditions.periodTag,
              mediaType: conditions.mediaType,
              mediaValue: conditions.mediaValue,
              mediaTagList: conditions.mediaTagList,
              journalistTagList: conditions.journalistTagList,
              tone: conditions.tone,
              tag: conditions.tag,
              url: conditions.url,
              publishingPeriod: conditions.publishingPeriod,
              mediaBookList: conditions.mediaBookList,
              clipbookValue: conditions.clipbookValue,
              clipbook: conditions.clipbook,
              coverage: conditions.coverage,
              informationType: conditions.informationType,
              existMultimedia: conditions.existMultimedia,
            },
          }
          dispatch(researchOptionAction(params))
        }
      }
    } catch (e) {}
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    parentsCode,
    keywords,
    additionalParam,
    periodList,
    mediaValueList,
    toneList,
    publishingPeriodList,
    informationTypeList,
    coverageList,
    clipbookList,
    mediaTypePopup,
    monitoringList,
    monitoringListOption,
    mediaTypeList,
    monitoringCategoryList,
    searchActivate,
    mediaTypePopupList,
    shareCodeData,
    monitoringActivate,
    newsMultiMediaList,

    init,
    openMonitoringPopup,
    moveSearchResult,
    setMediaTypePopupAction,
    setMediaTypePopupTotalSelect,

    mediaTypePopupAdjust,
    setMonitoringListOptionAction,
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
    setTagControl,
    setTagDeleteControl,
    setResetSearchOption,
    setAdditionalParamPublishingPeriod,
    setAdditionalParamTone,
    setAdditionalParamExistMultimedia,
    setAdditionalParamPeriod,
    setAdditionalParamPeriodDate,
    setAdditionalParamPeriodDateAction,
    setMediaTypePopupSelectedValue,
    setMediaTypePopupSelectedItem,
    setMediaTypePopupDeleteTotalSelect,
    setDeleteSelectedTypeMediaTypePopup,
    setSelectedTypeMediaTypePopup,
    setAdditionalParamClipbookList,
  }
}
