import { RefObject, useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  disclosureScopeFilterOptionList,
  extendedCommonCodeTargetList,
  mediaInitParams,
} from '~/components/contents/pressMedia/MediaSearch/defaultData'
import {
  basicFieldPopupProps,
  basicLocationPopupProps,
  fieldListProps,
  filterDataListAction,
  IJournalistSearchFilter,
  industryListAction,
  initAction,
  journalistBlockYNListAction,
  journalistInfoTypeListAction,
  journalistOccupationListAction,
  journalistSocialFilterListAction,
  languageListAction,
  locationListAction,
  mediaAdditionalParamAction,
  mediaAdditionalParamProps,
  mediaBlockYNListAction,
  mediaCountListAction,
  mediaDataAction,
  mediaFieldListAction,
  mediaFieldListProps,
  mediaFieldPopupAction,
  mediaFieldPopupProps,
  mediaInfoTypeListAction,
  mediaKeywordParamProps,
  mediaLocationListAction,
  mediaLocationPopupAction,
  mediaNameRevealedYNListAction,
  mediaSearchOptionAction,
  mediaSearchOptionProps,
  mediaTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaTypePopupProps,
  mediaValueListAction,
  portalListAction,
  pressMediaContentListProps,
  pressMediaListMediaTypeAction,
  pressMediaListOptionAction,
  pressMediaListPressTypeAction,
  pubCycleListAction,
  resetSearchOption,
  searchRegisterPopupAction,
  searchRegisterPopupProps,
} from '~/stores/modules/contents/pressMedia/mediaSearch'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import type { PressMediaCustomSearchListItem } from '~/types/contents/PressMedia'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import {
  apiGetJournalistCustomSearchList,
  UseGetJournalistCustomSearchListParams,
} from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { apiGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { usePostMediaCustomSearchCreate } from '~/utils/api/customSearch/media/usePostMediaCustomSearchCreate'
import { usePostMediaCustomSearchNameCheck } from '~/utils/api/customSearch/media/usePostMediaCustomSearchNameCheck'
import { apiGetJournalistSearchFilter } from '~/utils/api/journalist/useGetJournalistSearchFilter'
import { apiGetMediaFieldSubData } from '~/utils/api/media/useGetMediaFieldSubData'
import { apiGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { apiGetMediaLocationSubData } from '~/utils/api/media/useGetMediaLocation'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMediaSearchOptions = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    categoryData,
    pubCycleList,
    mediaValueList,
    journalistOccupationList,
    mediaTypeList,
    journalistInfoTypeList,
    languageList,
    mediaCountList,
    journalistBlockYNList,
    journalistSocialFilterList,
    portalList,
    mediaNameRevealedYNList,
    mediaBlockYNList,
    mediaInfoTypeList,
    searchRegisterPopup,
    mediaSearchOption,
    pressMediaList,
    pressMediaListOption,
    filterDataList,
    searchActivate,
    locationList,
    industryList,
    mediaTypePopup,
    mediaTypePopupList,
    mediaFieldPopup,
    mediaFieldList,
    mediaLocationPopup,
    mediaLocationList,
  } = useAppSelector(state => state.mediaSearchSlice)

  const { licenseInfo, userInfo, generalProduct, userSelectGroup, shareCodeData, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)

  const mediaRegisterCheck = usePostMediaCustomSearchNameCheck()
  const mediaRegister = usePostMediaCustomSearchCreate()

  const setMediaLanguageType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        languageParam: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam.languageParam]
  )

  const setPortalKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaAdditionalParamProps) => {
      dispatch(
        mediaAdditionalParamAction({
          ...props,
          portal: e,
        })
      )
    },
    [mediaSearchOption.additionalParam.portal]
  )

  const setMediaAdditionTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: mediaAdditionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTargetList') {
        params.journalistTargetList = props.journalistTargetList.filter(item => item.id !== e.id)
      } else if (type === 'portal') {
        params.portal = props.portal.filter(item => item.id !== e.id)
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam]
  )

  const setMediaTagDeleteControl = useCallback(
    async (props: mediaKeywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTagList') {
        params.mediaTagList = []
      } else if (type === 'mediaType') {
        params.mediaType = []
      } else if (type === 'mediaField') {
        params.mediaField = []
      } else if (type === 'mediaArea') {
        params.mediaArea = []
      } else if (type === 'keyword') {
        params.keyword = []
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = []
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = []
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOption.keywordParam]
  )

  const setMediaAdditionMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaGroupList: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.mediaGroupList]
  )

  const setMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaTagList: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.mediaTagList]
  )

  const setMediaInformationType = useCallback(
    async (e: SelectListOptionItem, props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          informationType: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.informationType]
  )

  const setPublishingKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          publishingPeriod: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.publishingPeriod]
  )

  const setMediaFieldPopupSelectedItem = useCallback(
    async (i: boolean, e: fieldListProps, props: basicFieldPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setMediaFieldKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.mediaField]
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

  const mediaTypePopupAdjust = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaType: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.mediaType]
  )

  const setMediaTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: mediaKeywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'mediaField') {
        params.mediaField = props.mediaField.filter(item => item.id !== e.id)
      } else if (type === 'mediaArea') {
        params.mediaArea = props.mediaArea.filter(item => item.id !== e.id)
      } else if (type === 'keyword') {
        params.keyword = props.keyword.filter(item => item.id !== e.id)
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = props.mediaGroupList.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOption.keywordParam]
  )

  const setMediaTagAdditionDeleteControl = useCallback(
    async (props: mediaAdditionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTargetList') {
        params.journalistTargetList = []
      } else if (type === 'portal') {
        params.portal = []
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam]
  )

  const setJournalistTargetListTargetList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaAdditionalParamProps) => {
      dispatch(
        mediaAdditionalParamAction({
          ...props,
          journalistTargetList: e,
        })
      )
    },
    [mediaSearchOption.additionalParam.journalistTargetList]
  )

  const setMediaIsJournalistType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        isJournalist: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam.isJournalist]
  )

  const setMediaSystemType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        system: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam.system]
  )

  const setMediaLimitType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        limit: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOption.additionalParam.limit]
  )

  const setSearchRegisterPopup = useCallback(
    async (isOpen: boolean, type: string) => {
      dispatch(
        searchRegisterPopupAction({
          isOpen,
          type,
          title: '',
          titleErr: '',
        })
      )
    },
    [searchRegisterPopup.isOpen, searchRegisterPopup.type]
  )

  const setResetSearchOption = useCallback(async () => {
    dispatch(resetSearchOption())
  }, [mediaSearchOption, searchActivate])

  const setSearchRegisterPopupOnChange = useCallback(
    async (e: string, props: searchRegisterPopupProps) => {
      dispatch(
        searchRegisterPopupAction({
          ...props,
          title: e,
          titleErr: '',
        })
      )
    },
    [searchRegisterPopup.title]
  )

  const setPressMediaListOptionAction = useCallback(
    async (e: boolean) => {
      dispatch(pressMediaListOptionAction(e))
      await getPressSavedSearchList(e)
      await getMediaSavedSearchList(e)
    },
    [pressMediaListOption]
  )

  const setPressMediaAreaAction = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaArea: e,
        })
      )
    },
    [mediaSearchOption.keywordParam.mediaArea]
  )

  const setSelectedTypeMediaLocationPopup = useCallback(
    async (e: MbTagSearchTagItem, props: basicLocationPopupProps) => {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setMediaLocationPopupDeleteTotalSelect = useCallback(
    async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setDeleteSelectedTypeMediaLocationPopup = useCallback(
    async (props: basicLocationPopupProps) => {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setMediaLocationPopupSelectedValue = useCallback(
    async (e: string, props: basicLocationPopupProps) => {
      if (e && e !== '') {
        await mediaLocationAction(e)
      }
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaLocationPopup.selectedValue]
  )

  const setMediaLocationPopupSelectedItem = useCallback(
    async (i: boolean, e: fieldListProps, props: basicLocationPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setDeleteSelectedTypeMediaFieldPopup = useCallback(
    async (props: basicFieldPopupProps) => {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setSelectedTypeMediaFieldPopup = useCallback(
    async (e: MbTagSearchTagItem, props: basicFieldPopupProps) => {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setMediaFieldPopupDeleteTotalSelect = useCallback(
    async (commonList: fieldListProps[], props: basicFieldPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setMediaFieldPopupSelectedValue = useCallback(
    async (e: string, props: mediaFieldPopupProps) => {
      if (e && e !== '') {
        await mediaFieldAction(e)
      }
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaFieldPopup.selectedValue]
  )

  const setMediaFieldPopupTotalSelect = async (commonList: fieldListProps[], props: basicFieldPopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setMediaKeywordAction = async (refs: RefObject<HTMLInputElement>, items: mediaKeywordParamProps) => {
    let param = {
      ...items,
      keyword: items.keyword,
    }
    if (items.keyword.length <= 2) {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          keyword: [...items.keyword, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    } else {
      openToast('키워드는 최대 3개까지 입력가능합니다.', 'warning')
    }
    dispatch(mediaSearchOptionAction(param))
  }

  const setMediaFieldPopupAction = async (essentialList: string[], e: boolean, props: mediaKeywordParamProps) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('INDUSTRY')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
        dispatch(industryListAction(tempIndustry))
      } else {
        tempKeyword = essentialList[0]
      }
      await mediaFieldAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.mediaField,
    }
    dispatch(mediaFieldPopupAction(params))
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
    props: mediaKeywordParamProps
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

  const mediaFieldAction = async (title: string) => {
    const { status, data, message } = await apiGetMediaFieldSubData({ name: title })
    if (status === 'S') {
      const apiData = data as { name: string; itmems: mediaFieldListProps[] }
      const res = apiData.itmems as mediaFieldListProps[]
      dispatch(mediaFieldListAction(res))
    } else {
      openToast(message?.message, 'error')
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

  const categoryDataHandle = (e: SelectListOptionItem) => {
    router.push(e.id === 'media' ? '/media/search' : '/contacts/search')
  }

  const getPressSavedSearchList = async (isOwner: boolean) => {
    let params: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (isOwner) {
      params.ownerId = Number(userInfo.userId)
    }
    const { status, data, message } = await apiGetJournalistCustomSearchList(params)
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      await initList(res, 'press')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getMediaSavedSearchList = async (isOwner: boolean) => {
    let params: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (isOwner) {
      params.ownerId = Number(userInfo.userId)
    }
    const { status, data, message } = await apiGetMediaCustomSearchList(params)
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      await initList(res, 'media')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaRegisterAction = async (title: string, props: mediaSearchOptionProps, tempOwner: boolean) => {
    const param = {
      title,
      groupId: userSelectGroup,
      shareCode: shareCodeData.jrnlstMediaSrch.id,
      shareTargetCode: 'GROUP',
      conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
    }
    const { status, data, message } = await mediaRegister.mutateAsync(param)
    if (status === 'S') {
      await getPressSavedSearchList(tempOwner)
      await getMediaSavedSearchList(tempOwner)
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const searchMediaRegisterAction = async (
    hook: searchRegisterPopupProps,
    props: mediaSearchOptionProps,
    tempOwner: boolean
  ) => {
    let isOpen = true
    let titleErr = ''
    if (hook.title === '') {
      titleErr = '제목을 입력해주세요'
    } else if (hook.title.length > 100) {
      titleErr = '제목은 100자를 넘을 수 없습니다.'
    } else {
      const { status, data, message } = await mediaRegisterCheck.mutateAsync({
        oldName: '',
        newName: hook.title,
      })
      if (status === 'S') {
        isOpen = false
        await mediaRegisterAction(hook.title, props, tempOwner)
      } else {
        titleErr = message?.message ?? '같은 제목의 검색이 이미 있습니다.'
      }
    }
    dispatch(
      searchRegisterPopupAction({
        ...hook,
        isOpen,
        titleErr,
      })
    )
  }

  const mediaLocationAction = async (title: string) => {
    const { status, data, message } = await apiGetMediaLocationSubData({ name: title })
    if (status === 'S') {
      const apiData = data as { name: string; itmems: mediaFieldListProps[] }
      const res = apiData.itmems as mediaFieldListProps[]
      dispatch(mediaLocationListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setMediaLocationPopupTotalSelect = async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setMediaLocationPopupAction = async (essentialList: string[], e: boolean, props: mediaKeywordParamProps) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('LOCATION')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
        dispatch(locationListAction(tempIndustry))
      } else {
        tempKeyword = essentialList[0]
      }
      await mediaLocationAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.mediaArea,
    }
    dispatch(mediaLocationPopupAction(params))
  }

  const initList = async (prop: PageableDataDto<PressMediaCustomSearchListItem>, type: string) => {
    let param: pressMediaContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
        let temp: pressMediaContentListProps = {
          contact_id: 0,
          conditions: content?.conditions || '',
          isOwner: userInfo.userId === content.owner?.userId,
          settingList: [],
          shareCodeNm: findShareScopeList?.name || '',
          title: content?.title || '',
          shareCode: content?.shareCode || '',
          shareTargetCode: content?.shareTargetCode || '',
        }
        if (content.mediaSrchId) {
          temp.contact_id = content.mediaSrchId
        }
        if (content.jrnlstSrchId) {
          temp.contact_id = content.jrnlstSrchId
        }
        if (content.owner) {
          temp.owner = content.owner
        }
        if (content.regisAt) {
          temp.regisAt = content.regisAt
        }
        if (content.updateAt) {
          temp.updateAt = content.updateAt
        }
        if (content.register) {
          temp.register = content.register
        }
        if (content.updater) {
          temp.updater = content.updater
        }
        if (userInfo.userId === content.owner?.userId) {
          temp.settingList = [
            {
              id: 'DELETE',
              name: '삭제하기',
            },
          ]
        } else if (content.shareCode === 'WRITABLE') {
          temp.settingList = [
            {
              id: 'DELETE',
              name: '삭제하기',
            },
          ]
        } else if (content.shareCode === 'READABLE') {
          if (userInfo.role === 'ADMIN') {
            temp.settingList = [
              {
                id: 'DELETE',
                name: '삭제하기',
              },
            ]
          } else {
            temp.settingList = []
          }
        }
        param = [...param, temp]
      }
    }
    if (type === 'media') {
      dispatch(pressMediaListMediaTypeAction(param))
    } else {
      dispatch(pressMediaListPressTypeAction(param))
    }
  }

  const moveMediaSearchResult = async (props: mediaSearchOptionProps) => {
    let res = {
      ...props.keywordParam,
      ...props.additionalParam,
      media_id: 0,
      key_id: 'media',
      sort: [`values.combined_new!desc`],
    }
    if (props.keywordParam.keyword.length > 0) {
      res = {
        ...props.keywordParam,
        ...props.additionalParam,
        media_id: 0,
        key_id: 'media',
        sort: [`_score!desc`],
      }
    }
    const filter = setObjectToBase64(res)
    await router.push(`/media/search-result?filter=${filter}`)
  }

  const getCommonCode = async (code: string, isGroupId?: boolean) => {
    let res: CommonCode[] = []
    let tempParam = {
      parentCode: code,
    }
    if (isGroupId) {
      tempParam = {
        parentCode: code,
        // @ts-ignore
        groupId: userSelectGroup,
      }
    }
    const { status, data, message } = await apiGetCommonCode(tempParam)
    if (status === 'S') {
      res = data as CommonCode[]
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const fieldListData = async (type: 'INDUSTRY' | 'LOCATION') => {
    let res: string[] = []
    const { status, data, message } = await apiGetMediaFieldType({ type })
    if (status === 'S') {
      res = data as string[]
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const filterListData = async () => {
    let res: IJournalistSearchFilter | null = null
    const { status, data, message } = await apiGetJournalistSearchFilter()
    if (status === 'S') {
      res = data as IJournalistSearchFilter
    } else {
      openToast(message?.message, 'error')
    }

    return res
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

  const init = async () => {
    let searchActivate = false
    let mediaParams = mediaInitParams
    let preloadCommonCode: CommonCode[] = []
    dispatch(initAction())
    try {
      for await (const param of extendedCommonCodeTargetList) {
        if (param.id === 'JOURNALIST_OCCUPATION') {
          preloadCommonCode = await getCommonCode(param.id)
        } else if (param.id === 'JOURNALIST_BLOCK_YN') {
          preloadCommonCode = await getCommonCode(param.id, true)
        } else if (param.id === 'JOURNALIST_INFO_TYPE') {
          preloadCommonCode = await getCommonCode(param.id)
        } else if (param.id === 'JRNLST_SOCIAL_FILTER_ID') {
          preloadCommonCode = await getCommonCode(param.id)
        } else if (param.id === 'MEDIA_BLOCK_YN') {
          preloadCommonCode = await getCommonCode(param.id, true)
        } else if (param.id === 'MEDIA_INFO_TYPE') {
          preloadCommonCode = await getCommonCode(param.id)
        } else if (param.id === 'LOCATION') {
          const tempLocation = await fieldListData(param.id)
          dispatch(locationListAction(tempLocation))
        } else if (param.id === 'INDUSTRY') {
          const tempIndustry = await fieldListData(param.id)
          dispatch(industryListAction(tempIndustry))
        } else if (param.id === 'FILTER') {
          const tempFilter = await filterListData()
          dispatch(filterDataListAction(tempFilter))
        } else {
          const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === param.id)
          //@ts-ignore
          if (find && find.commonCodeList && find.commonCodeList.length > 0) {
            //@ts-ignore
            preloadCommonCode = find.commonCodeList
          } else {
            preloadCommonCode = await getCommonCode(param.id)
          }
        }
        let list = preloadCommonCode.map(e => {
          return { id: e.code, name: e.name, extra: e.count?.toString() }
        })
        if (param.id === 'PUB_CYCLE') {
          dispatch(pubCycleListAction(list))
        } else if (param.id === 'MEDIA_VALUE') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaValueListAction(list))
        } else if (param.id === 'JOURNALIST_OCCUPATION') {
          dispatch(journalistOccupationListAction(list))
        } else if (param.id === 'MEDIA_TYPE') {
          list = preloadCommonCode.map(e => {
            return { id: e.commonCodeId.toString(), name: e.name, extra: e.count?.toString() }
          })
          dispatch(mediaTypeListAction(list))
        } else if (param.id === 'JOURNALIST_INFO_TYPE') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(journalistInfoTypeListAction(list))
        } else if (param.id === 'LANGUAGE') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(languageListAction(list))
        } else if (param.id === 'MEDIA_COUNT') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaCountListAction(list))
        } else if (param.id === 'JOURNALIST_BLOCK_YN') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(journalistBlockYNListAction(list))
        } else if (param.id === 'JRNLST_SOCIAL_FILTER_ID') {
          console.log('list', list)
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(journalistSocialFilterListAction(list))
        } else if (param.id === 'PORTAL_CODE') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          console.log('list', list)
          dispatch(portalListAction(list))
        } else if (param.id === 'MEDIA_JRNLIST_NAME_REVEALED_YN') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaNameRevealedYNListAction(list))
        } else if (param.id === 'MEDIA_BLOCK_YN') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaBlockYNListAction(list))
        } else if (param.id === 'MEDIA_INFO_TYPE') {
          // @ts-ignore
          list = preloadCommonCode.map(e => {
            return { id: e.code.toString(), name: e.name }
          })
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaInfoTypeListAction(list))
        }
      }
      await getPressSavedSearchList(false)
      await getMediaSavedSearchList(false)
      if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
        const subParams = window.location.search.substring(1).split('?')
        const querys = await setQueryParam(subParams)
        if (querys && querys !== '') {
          let conditions = getObjectFromBase64(querys)
          searchActivate = true
          mediaParams = {
            keywordParam: {
              mediaTagList: conditions.mediaTagList,
              mediaType: conditions.mediaType,
              mediaField: conditions.mediaField,
              mediaArea: conditions.mediaArea,
              keyword: conditions.keyword,
              keywordValue: conditions.keywordValue,
              mediaGroupList: conditions.mediaGroupList,
              informationType: conditions.informationType,
              publishingPeriod: conditions.publishingPeriod,
            },
            additionalParam: {
              journalistTargetList: conditions.journalistTargetList,
              portal: conditions.portal,
              languageParam: conditions.languageParam,
              isJournalist: conditions.isJournalist,
              system: conditions.system,
              limit: conditions.limit,
            },
          }
          console.log('searchActivate', searchActivate)
          dispatch(mediaDataAction({ searchActivate, mediaParams }))
        }
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  return {
    categoryData,
    pressMediaList,
    licenseInfo,
    userInfo,
    generalProduct,
    userSelectGroup,
    shareCodeData,
    frequentlyUsedCommonCode,
    pressMediaListOption,
    searchActivate,
    searchRegisterPopup,
    mediaSearchOption,
    pubCycleList,
    mediaValueList,
    journalistOccupationList,
    mediaTypeList,
    journalistInfoTypeList,
    languageList,
    mediaCountList,
    journalistBlockYNList,
    journalistSocialFilterList,
    portalList,
    mediaNameRevealedYNList,
    mediaBlockYNList,
    mediaInfoTypeList,
    filterDataList,
    locationList,
    industryList,
    mediaTypePopup,
    mediaTypePopupList,
    mediaFieldPopup,
    mediaFieldList,
    mediaLocationPopup,
    mediaLocationList,

    init,
    categoryDataHandle,
    searchMediaRegisterAction,
    moveMediaSearchResult,
    setMediaKeywordAction,
    setMediaTypePopupAction,
    setMediaTypePopupTotalSelect,
    setMediaFieldPopupAction,
    setMediaFieldPopupTotalSelect,
    setMediaLocationPopupAction,
    setMediaLocationPopupTotalSelect,

    setPressMediaListOptionAction,
    setSearchRegisterPopup,
    setSearchRegisterPopupOnChange,
    setResetSearchOption,
    setMediaLimitType,
    setMediaSystemType,
    setMediaIsJournalistType,
    setMediaLanguageType,
    setPortalKeywordValueAction,
    setJournalistTargetListTargetList,
    setMediaAdditionTagControl,
    setMediaTagAdditionDeleteControl,
    setMediaTagControl,
    setMediaTagDeleteControl,
    setMediaAdditionMediaTagList,
    setMediaTagList,
    setMediaInformationType,
    setPublishingKeywordValueAction,
    setMediaTypePopupSelectedValue,
    setSelectedTypeMediaTypePopup,
    setDeleteSelectedTypeMediaTypePopup,
    mediaTypePopupAdjust,
    setMediaTypePopupDeleteTotalSelect,
    setMediaTypePopupSelectedItem,
    setMediaFieldKeywordValueAction,
    setMediaFieldPopupSelectedItem,
    setMediaFieldPopupSelectedValue,
    setMediaFieldPopupDeleteTotalSelect,
    setSelectedTypeMediaFieldPopup,
    setDeleteSelectedTypeMediaFieldPopup,
    setMediaLocationPopupSelectedItem,
    setPressMediaAreaAction,
    setMediaLocationPopupSelectedValue,
    setSelectedTypeMediaLocationPopup,
    setDeleteSelectedTypeMediaLocationPopup,
    setMediaLocationPopupDeleteTotalSelect,
  }
}
