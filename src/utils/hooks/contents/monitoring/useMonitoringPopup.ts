import { ChangeEvent, useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'

import {
  defaultBasicMonitoringSetting,
  defaultMonitoringSetting,
  disclosureScopeFilterOptionList,
} from '~/components/contents/monitoring/Management/defaultData'
import { extendedCommonCodeTargetList } from '~/components/contents/monitoring/MonitoringPopup/defaultData'
import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import { shareCodeAction } from '~/stores/modules/contents/auth/auth'
import {
  categoryListAction,
  categoryListProps,
  managementContentListAction,
  managementContentListProps,
} from '~/stores/modules/contents/monitoring/management'
import {
  additionalParamProps,
  initMonitoringPopupAction,
  initMonitoringSearchPopupAction,
  keywordsProps,
  monitoringCancelPopupAction,
  monitoringCheckPopupAction,
  monitoringOptionAdjustAction,
  monitoringPopupAction,
  monitoringPopupProps,
  monitoringSearchPopupAction,
  popupadditionalParamAction,
  popupclipbookListAction,
  popupcoverageListAction,
  popupinformationTypeListAction,
  popupkeywordsAction,
  popupmediaTypeListAction,
  popupmediaTypePopupAction,
  popupmediaTypePopupListAction,
  popupmediaValueListAction,
  popupNewsMultiMediaListAction,
  popupperiodListAction,
  popuppublishingPeriodListAction,
  popupsetMediaTypePopupData,
  popuptoneListAction,
  resetSearchOptionPopupAction,
} from '~/stores/modules/contents/monitoring/monitoringPopup'
import {
  mediaTypePopupProps,
  monitoringListAction,
  monitoringListDto,
} from '~/stores/modules/contents/monitoring/newsSearch'
import {
  BaseResponseCommonObject,
  CreateNewsSrchDto,
  type PageNewsSrchDto,
  ResponseNewsSrchCategoryDto,
  SearchNewsSrchCategoryListDto,
  TagDto,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { MonitoringCountDto } from '~/types/contents/Monitoring'
import {
  apiGetCommonCode,
  CommonCode,
  useGetCommonCode,
  useGetCommonCodeParentCommonCodeId,
} from '~/utils/api/common/useGetCommonCode'
import { apiGetMonitoringCount } from '~/utils/api/monitoring/useGetMonitoringCount'
import { apiGetMonitoringSearch } from '~/utils/api/monitoring/useGetMonitoringSearch'
import { usePostGetMonitoringByCategory } from '~/utils/api/monitoring/usePostGetMonitoringByCategory'
import { usePostMonitoringCreate } from '~/utils/api/monitoring/usePostMonitoringCreate'
import { usePostMonitoringNameCheck } from '~/utils/api/monitoring/usePostMonitoringNameCheck'
import { usePutMonitoringUpdate, UsePutMonitoringUpdateParams } from '~/utils/api/monitoring/usePutMonitoringUpdate'
import { usePutSharePolicy } from '~/utils/api/setting/policy/usePutSharePolicy'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMonitoringPopup = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { monitoringListOption } = useAppSelector(state => state.newsSearchOptionsSlice)
  const { managementListParams } = useAppSelector(state => state.monitoringManagementSlice)
  const { monitoringSearchPopup, monitoringCancelPopup, monitoringPopup, monitoringCheckPopup } = useAppSelector(
    state => state.monitoringPopupSlice
  )
  const { licenseInfo, frequentlyUsedCommonCode, userInfo, userSelectGroup, shareCode } = useAppSelector(
    state => state.authSlice
  )

  const apiPutSharePolicy = usePutSharePolicy()
  const checkMonitoringName = usePostMonitoringNameCheck()
  const createMonitroingApi = usePostMonitoringCreate()
  const getCompanyMonitoring = usePostGetMonitoringByCategory()
  const updateMonitroingApi = usePutMonitoringUpdate()

  const setInitMonitoringPopup = useCallback(() => {
    dispatch(initMonitoringPopupAction())
    dispatch(monitoringCancelPopupAction(false))
    dispatch(monitoringCheckPopupAction(false))
  }, [monitoringPopup, monitoringCheckPopup, monitoringCancelPopup])

  const setMonitoringCancelPopup = useCallback(
    (e: boolean) => dispatch(monitoringCancelPopupAction(e)),
    [monitoringPopup]
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
        popupmediaTypePopupAction({
          ...props,
          selectedType: resultList,
        })
      )
    },
    [monitoringSearchPopup.mediaTypePopup.selectedType]
  )

  const setMonitoringCheckCancelPopup = useCallback(
    (e: boolean, origin: monitoringPopupProps) => {
      if (e) {
        if (origin.isEdit) {
          dispatch(monitoringCheckPopupAction(true))
        } else {
          dispatch(initMonitoringPopupAction())
        }
      } else {
        dispatch(monitoringCheckPopupAction(false))
      }
    },
    [monitoringPopup, monitoringCheckPopup]
  )

  const monitoringPopupTitleOnChange = useCallback(
    (param: string, origin: monitoringPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
        isEdit: true,
      }
      dispatch(monitoringPopupAction(params))
    },
    [monitoringPopup.name, monitoringPopup.isEdit]
  )

  const monitoringPopupHandleCategory = useCallback(
    (param: SelectListOptionItem, origin: monitoringPopupProps) => {
      const params = {
        ...origin,
        category: param,
        isEdit: true,
      }
      dispatch(monitoringPopupAction(params))
    },
    [monitoringPopup.category, monitoringPopup.isEdit]
  )

  const monitoringPopupHandleShareSetting = useCallback(
    (param: SelectListOptionItem, origin: monitoringPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
        isEdit: true,
      }
      dispatch(monitoringPopupAction(params))
    },
    [monitoringPopup.scrop, monitoringPopup.isEdit]
  )

  const monitoringPopupHandleTarget = useCallback(
    (param: SelectListOptionItem, origin: monitoringPopupProps) => {
      const params = {
        ...origin,
        target: param,
        isEdit: true,
      }
      dispatch(monitoringPopupAction(params))
    },
    [monitoringPopup.target, monitoringPopup.isEdit]
  )

  const monitoringPopupHandleDefault = useCallback(
    (param: boolean, origin: monitoringPopupProps) => {
      const params = {
        ...origin,
        isDefault: param,
        isEdit: true,
      }
      dispatch(monitoringPopupAction(params))
    },
    [monitoringPopup.isDefault, monitoringPopup.isEdit]
  )

  const setkeywordsActionAnd = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        and: e,
      }
      dispatch(popupkeywordsAction(params))
    },
    [monitoringSearchPopup.keywords.and]
  )

  const setkeywordsActionOr = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        or: e,
      }
      dispatch(popupkeywordsAction(params))
    },
    [monitoringSearchPopup.keywords.or]
  )

  const setkeywordsActionNot = useCallback(
    async (e: string, props: keywordsProps) => {
      const params = {
        ...props,
        not: e,
      }
      dispatch(popupkeywordsAction(params))
    },
    [monitoringSearchPopup.keywords.not]
  )

  const setTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: additionalParamProps, type: string) => {
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

      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam]
  )

  const setTagDeleteControl = useCallback(
    async (props: additionalParamProps, type: string) => {
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
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam]
  )

  const setResetSearchOptionControl = useCallback(async () => {
    dispatch(resetSearchOptionPopupAction())
  }, [monitoringSearchPopup])

  const setAdditionalParamMediaValue = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        mediaValue: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.mediaValue]
  )

  const setAdditionalParamMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.mediaTagList]
  )

  const setAdditionalParamClipbookList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        clipbookValue: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.clipbookValue]
  )

  const setAdditionalParamJournalistTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        journalistTagList: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.journalistTagList]
  )

  const setAdditionalParamTagStatusOnChange = useCallback(
    async (item: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        popupadditionalParamAction({
          ...props,
          tag: item,
        })
      )
    },
    [monitoringSearchPopup.additionalParam.tag]
  )

  const setAdditionalParamUrl = useCallback(
    async (e: string, props: additionalParamProps) => {
      const params = {
        ...props,
        url: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.url]
  )

  const setAdditionalParamMediaBookList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaBookList: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.mediaBookList]
  )

  const setAdditionalParamClipbook = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        clipbook: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.clipbook]
  )

  const setAdditionalParamCoverage = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        coverage: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.coverage]
  )

  const setAdditionalParamInformationType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(popupadditionalParamAction(params))
    },
    [monitoringSearchPopup.additionalParam.informationType]
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
        popupadditionalParamAction({
          ...props,
          existMultimedia: dataList,
        })
      )
    },
    [monitoringSearchPopup.additionalParam.existMultimedia]
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
        popupadditionalParamAction({
          ...props,
          tone: dataList,
        })
      )
    },
    [monitoringSearchPopup.additionalParam.tone]
  )

  const setAdditionalParamPublishingPeriod = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        popupadditionalParamAction({
          ...props,
          publishingPeriod: e,
        })
      )
    },
    [monitoringSearchPopup.additionalParam.publishingPeriod]
  )

  const setMediaTypePopupSelectedValue = useCallback(
    async (e: string, props: mediaTypePopupProps) => {
      if (e && e !== '') {
        await getParentCommonCodeId(Number(e))
      }
      dispatch(
        popupmediaTypePopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [monitoringSearchPopup.mediaTypePopup.selectedValue]
  )

  const setDeleteSelectedTypeMediaTypePopup = useCallback(
    async (props: mediaTypePopupProps) => {
      dispatch(
        popupmediaTypePopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [monitoringSearchPopup.mediaTypePopup.selectedType]
  )

  const mediaTypePopupAdjust = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        popupadditionalParamAction({
          ...props,
          mediaType: e,
        })
      )
    },
    [monitoringSearchPopup.additionalParam.mediaType]
  )

  const setSelectedTypeMediaTypePopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaTypePopupProps) => {
      dispatch(
        popupmediaTypePopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [monitoringSearchPopup.mediaTypePopup.selectedType]
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
        popupmediaTypePopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [monitoringSearchPopup.mediaTypePopup.selectedType]
  )

  const setInitMonitoringSearchPopup = useCallback(async () => {
    dispatch(initMonitoringSearchPopupAction())
  }, [monitoringSearchPopup])

  const openMonitoringSearchPopup = async (keywords: keywordsProps, additionalParam: additionalParamProps) => {
    await init()
    dispatch(
      monitoringSearchPopupAction({
        keywords,
        additionalParam,
      })
    )
  }

  const monitoringSearchPopupAdjust = (keywords: keywordsProps, additionalParam: additionalParamProps) => {
    dispatch(
      monitoringOptionAdjustAction({
        keywords,
        additionalParam,
      })
    )
  }

  const checkValidation = async (props: monitoringPopupProps) => {
    let nameErr = ''
    let categoryErr = ''
    let isProcess = false
    if (props.name === '') {
      nameErr = '모니터링의 이름을 입력하세요'
    } else if (props.name.length > 100) {
      nameErr = '이름은 100자를 넘을 수 없습니다.'
    } else if (props.category.id === '') {
      categoryErr = '모니터링의 카테고리를 선택해주세요'
    } else {
      console.log('props.key', props.key)
      if (props.key > 0) {
        isProcess = true
      } else {
        console.log('props.name', props.name)
        const { status } = await checkMonitoringName.mutateAsync({
          oldName: '',
          newName: props.name,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          nameErr = '같은 이름의 모니터링이 이미 있습니다'
        }
      }
    }
    if (!isProcess) {
      const param = {
        ...props,
        categoryErr,
        nameErr,
      }
      dispatch(monitoringPopupAction(param))
    }
    return isProcess
  }

  const updatePolicy = async (props: string) => {
    const param = {
      list: shareCode.list,
      jrnlstMediaSrch: shareCode.jrnlstMediaSrch,
      clipbook: shareCode.clipbook,
      news_search: props,
      project: shareCode.project,
      action: shareCode.action,
      distribute: shareCode.distribute,
    }
    const { status, message } = await apiPutSharePolicy.mutateAsync({
      id: userInfo?.userId || 0,
      policyInfo: param,
    })
    if (status === 'S') {
      console.log('param', param)
      dispatch(shareCodeAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const monitroingFunction = async (props: monitoringPopupProps) => {
    if (props.key > 0) {
      await updateMonitroing(props)
    } else {
      await createMonitroing(props)
    }
  }

  const updateMonitroing = async (props: monitoringPopupProps) => {
    let param: UsePutMonitoringUpdateParams = {
      id: Number(props.key),
      info: {
        category: props.category.id,
        title: props.name,
        shareCode: props.scrop.id,
        groupId: userSelectGroup,
        shareTargetCode: props.target.id,
        conditions: setObjectToBase64({ ...props.keyword, ...props.extra }),
      },
    }
    const { status, message } = await updateMonitroingApi.mutateAsync(param)
    if (status === 'S') {
      openToast('검색 조건을 업데이트 했습니다', 'success')
      await reMonitoringList(props.categoryList)
      await initCategoryList()
      dispatch(initMonitoringPopupAction())
      if (router.pathname !== '/news/saved-search-manage') {
        router.reload()
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const createMonitroing = async (props: monitoringPopupProps) => {
    let param: CreateNewsSrchDto = {
      category: props.category.id,
      title: props.name,
      shareCode: props.scrop.id,
      chkDefault: props.isDefault,
      groupId: userSelectGroup,
      shareTargetCode: props.target.id,
      conditions: setObjectToBase64({ ...props.keyword, ...props.extra }),
    }
    const { status, message } = await createMonitroingApi.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (props.isDefault) {
        await updatePolicy(props.scrop.id)
      }
      await reMonitoringByCategory(props.categoryList)
      dispatch(initMonitoringPopupAction())
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initMonitoringByCategory = async (param: ResponseNewsSrchCategoryDto[], list: SelectListOptionItem[]) => {
    if (param.length > 0) {
      let temp: monitoringListDto[] = []
      for await (const categoryListDatum of param) {
        if (categoryListDatum.content && categoryListDatum.content?.length > 0) {
          const find = list.find(i => i.id === categoryListDatum.category)
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

  const getCode = async () => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: 'MONITORING_CATEGORY' })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const initCategoryList = async () => {
    const categoryCommonCodeList = await getCode()
    const { status, data, message } = await apiGetMonitoringCount(userSelectGroup)
    if (status === 'S') {
      const param = data as MonitoringCountDto
      if (categoryCommonCodeList.length > 0 && param) {
        let res: categoryListProps[] = []
        let categoryParam =
          managementListParams.category.id !== '' ? managementListParams.category : { id: 'ALL', name: '전체' }
        let count = 0
        let categoryTotalList = categoryCommonCodeList.map(e => {
          return { id: e.code, name: e.name }
        })
        for await (const commonCode of categoryCommonCodeList) {
          if (param[commonCode.code] && (param[commonCode.code] as number) > 0) {
            let temp = {
              id: commonCode.code,
              name: commonCode.name,
              count: param[commonCode.code] as number,
            }
            console.log('temp', temp)
            count += Number(param[commonCode.code])
            res = [...res, temp]
          }
        }
        res.unshift({ id: 'ALL', name: '전체', count })
        console.log('res', res)
        console.log('categoryParam', categoryParam)
        console.log('categoryTotalList', categoryTotalList)
        console.log('categoryCommonCodeList', categoryCommonCodeList)
        dispatch(categoryListAction({ list: res, param: categoryParam, categoryTotalList }))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const reMonitoringList = async (list: SelectListOptionItem[]) => {
    let param = {
      page: managementListParams.page,
      size: managementListParams.size,
      groupId: userSelectGroup,
      category: managementListParams.category.id,
      ownerId: managementListParams.ownerId !== '' ? Number(managementListParams.ownerId) : undefined,
      sort: managementListParams.sort[0],
      title: managementListParams.title,
      shareCode: managementListParams.shareCode.id,
    }
    let listParams: managementContentListProps[] = []
    const { status, data, message } = await apiGetMonitoringSearch(param)
    if (status === 'S') {
      const res = data as PageNewsSrchDto
      if (res.content && res.content.length > 0) {
        for await (const content of res.content) {
          const findCategory = list.find(e => e.id === content.category)
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: managementContentListProps = {
            ...content,
            isOwner: userInfo.userId === content.owner?.userId,
            notice: false,
            categoryName: findCategory ? findCategory.name : '알수없음',
            settingList: defaultBasicMonitoringSetting,
            shareCodeNm: findShareScopeList?.name || '',
          }
          if (userInfo.userId === content.owner?.userId) {
            temp.settingList = defaultMonitoringSetting
          } else if (content.shareCode === 'WRITABLE') {
            temp.settingList = defaultMonitoringSetting
          } else if (content.shareCode === 'READABLE') {
            if (userInfo.role === 'ADMIN') {
              temp.settingList = [
                ...defaultBasicMonitoringSetting,
                {
                  id: 'DELETE',
                  name: '삭제하기',
                },
              ]
            } else {
              temp.settingList = defaultBasicMonitoringSetting
            }
          }
          listParams = [...listParams, temp]
        }
      }
      dispatch(
        managementContentListAction({
          list: listParams,
          pageCount: {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          },
          apiDto: managementListParams,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const reMonitoringByCategory = async (list: SelectListOptionItem[]) => {
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
    if (monitoringListOption) params.ownerId = userInfo.userId
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

  const getCommonCode = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
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
    dispatch(popupmediaTypePopupListAction(res))
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
        popupmediaTypePopupAction({
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
        dispatch(popupmediaTypeListAction(list))
        if (tempMediaType && tempMediaType.length > 0) {
          tempKeyword = list[0].id
        }
      } else {
        tempKeyword = essentialList[0].id
      }
      await getParentCommonCodeId(Number(tempKeyword))
    }
    dispatch(
      popupmediaTypePopupAction({
        isOpen: tempKeyword === '' ? false : e,
        selectedValue: tempKeyword,
        selectedType: props.mediaType,
      })
    )
  }

  const init = async () => {
    let preloadCommonCode: CommonCode[] = []
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
        console.log('param.id', param.id)
        console.log('preloadCommonCode', preloadCommonCode)
        if (param.id === 'NEWS_INFO_TYPE') {
          dispatch(
            popupinformationTypeListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'PUB_CYCLE') {
          dispatch(
            popuppublishingPeriodListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'MEDIA_VALUE') {
          dispatch(
            popupmediaValueListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'NEWS_PERIOD') {
          dispatch(
            popupperiodListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'COVERAGE_NEWS_YN') {
          dispatch(
            popupcoverageListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'MEDIA_TYPE') {
          dispatch(
            popupmediaTypeListAction(
              preloadCommonCode.map(e => {
                return { id: e.commonCodeId.toString(), name: e.name }
              })
            )
          )
        } else if (param.id === 'CLIPBOOK_NEWS_YN') {
          dispatch(
            popupclipbookListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (param.id === 'TONE') {
          dispatch(
            popuptoneListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (param.id === 'NEWS_SEARCH_MULTIMEDIA') {
          dispatch(
            popupNewsMultiMediaListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        }
      }
    } catch (e) {}
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    monitoringPopup,
    monitoringSearchPopup,
    monitoringCancelPopup,
    monitoringCheckPopup,

    openMonitoringSearchPopup,
    monitoringSearchPopupAdjust,
    checkValidation,
    monitroingFunction,
    setMediaTypePopupAction,
    setMediaTypePopupTotalSelect,
    init,

    mediaTypePopupAdjust,
    setInitMonitoringPopup,
    setMonitoringCheckCancelPopup,
    monitoringPopupTitleOnChange,
    monitoringPopupHandleCategory,
    monitoringPopupHandleShareSetting,
    monitoringPopupHandleTarget,
    monitoringPopupHandleDefault,
    setkeywordsActionAnd,
    setkeywordsActionOr,
    setkeywordsActionNot,
    setTagControl,
    setTagDeleteControl,
    setAdditionalParamMediaValue,
    setAdditionalParamMediaTagList,
    setAdditionalParamJournalistTagList,
    setAdditionalParamTagStatusOnChange,
    setAdditionalParamUrl,
    setAdditionalParamMediaBookList,
    setAdditionalParamClipbook,
    setAdditionalParamCoverage,
    setAdditionalParamInformationType,
    setAdditionalParamTone,
    setAdditionalParamExistMultimedia,
    setAdditionalParamPublishingPeriod,
    setMediaTypePopupSelectedValue,
    setDeleteSelectedTypeMediaTypePopup,
    setSelectedTypeMediaTypePopup,
    setMediaTypePopupSelectedItem,
    setInitMonitoringSearchPopup,
    setAdditionalParamClipbookList,
    setMonitoringCancelPopup,
    setMediaTypePopupDeleteTotalSelect,
    setResetSearchOptionControl,
  }
}
