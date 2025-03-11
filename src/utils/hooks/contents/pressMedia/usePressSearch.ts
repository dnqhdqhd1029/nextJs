import { RefObject, useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  disclosureScopeFilterOptionList,
  extendedCommonCodeTargetList,
  pressInitParams,
} from '~/components/contents/pressMedia/PressSearch/defaultData'
import {
  additionalParamProps,
  basicFieldListAction,
  basicFieldPopupAction,
  basicFieldPopupProps,
  basicLocationListAction,
  basicLocationPopupAction,
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
  keywordParamProps,
  languageListAction,
  locationListAction,
  mediaBlockYNListAction,
  mediaCountListAction,
  mediaFieldListAction,
  mediaFieldListProps,
  mediaFieldPopupAction,
  mediaInfoTypeListAction,
  mediaLocationListAction,
  mediaLocationPopupAction,
  mediaNameRevealedYNListAction,
  mediaTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaTypePopupProps,
  mediaValueListAction,
  portalListAction,
  pressAdditionalParamAction,
  pressMediaContentListProps,
  pressMediaDataAction,
  pressMediaListMediaTypeAction,
  pressMediaListOptionAction,
  pressMediaListPressTypeAction,
  pressSearchOptionAction,
  pressSearchOptionProps,
  pubCycleListAction,
  resetSearchOption,
  searchRegisterPopupAction,
  searchRegisterPopupProps,
} from '~/stores/modules/contents/pressMedia/pressSearch'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import type { PressMediaCustomSearchListItem } from '~/types/contents/PressMedia'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import {
  apiGetJournalistCustomSearchList,
  UseGetJournalistCustomSearchListParams,
} from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { usePostJournalistCustomSearchCreate } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchCreate'
import { usePostJournalistCustomSearchNameCheck } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchNameCheck'
import { apiGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { apiGetJournalistFieldSubData } from '~/utils/api/journalist/useGetJournalistFieldSubData'
import { apiGetJournalistLocationSubData } from '~/utils/api/journalist/useGetJournalistLocation'
import { apiGetJournalistSearchFilter } from '~/utils/api/journalist/useGetJournalistSearchFilter'
import { apiGetMediaFieldSubData } from '~/utils/api/media/useGetMediaFieldSubData'
import { apiGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { apiGetMediaLocationSubData } from '~/utils/api/media/useGetMediaLocation'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePressSearchOptions = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    categoryData,
    basicFieldPopup,
    searchRegisterPopup,
    searchActivate,
    pressSearchOption,
    pressMediaListOption,
    pressMediaList,
    industryList,
    basicFieldList,
    mediaTypePopup,
    mediaTypeList,
    mediaTypePopupList,
    basicLocationPopup,
    locationList,
    basicLocationList,
    journalistOccupationList,
    mediaValueList,
    pubCycleList,
    journalistBlockYNList,
    journalistInfoTypeList,
    mediaCountList,
    languageList,
    mediaLocationList,
    mediaLocationPopup,
    filterDataList,
    journalistSocialFilterList,
    mediaFieldList,
    portalList,
    mediaFieldPopup,
  } = useAppSelector(state => state.pressSearchSlice)
  const { licenseInfo, userInfo, generalProduct, userSelectGroup, shareCodeData, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)

  const pressRegisterCheck = usePostJournalistCustomSearchNameCheck()
  const pressRegister = usePostJournalistCustomSearchCreate()

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

  const setResetSearchOption = useCallback(async () => {
    dispatch(resetSearchOption())
  }, [pressSearchOption, searchActivate])

  const setPressMediaListOptionAction = useCallback(
    async (e: boolean) => {
      dispatch(pressMediaListOptionAction(e))
      await getPressSavedSearchList(e)
      await getMediaSavedSearchList(e)
    },
    [pressMediaListOption]
  )
  const setPressTagDeleteControl = useCallback(
    async (props: keywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTagList') {
        params.journalistTagList = []
      } else if (type === 'field') {
        params.field = []
      } else if (type === 'area') {
        params.area = []
      } else if (type === 'mediaTagList') {
        params.mediaTagList = []
      } else if (type === 'mediaType') {
        params.mediaType = []
      } else if (type === 'occupation') {
        params.occupation = []
      } else if (type === 'position') {
        params.position = []
      } else if (type === 'keyword') {
        params.keyword = []
      } else if (type === 'department') {
        params.department = []
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = []
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam]
  )

  const setPressTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: keywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTagList') {
        params.journalistTagList = props.journalistTagList.filter(item => item.id !== e.id)
      } else if (type === 'field') {
        params.field = props.field.filter(item => item.id !== e.id)
      } else if (type === 'area') {
        params.area = props.area.filter(item => item.id !== e.id)
      } else if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'occupation') {
        params.occupation = props.occupation.filter(item => item.id !== e.id)
      } else if (type === 'position') {
        params.position = props.position.filter(item => item.id !== e.id)
      } else if (type === 'keyword') {
        params.keyword = props.keyword.filter(item => item.id !== e.id)
      } else if (type === 'department') {
        params.department = props.department.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam]
  )

  const setPressJournalistTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        journalistTagList: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.journalistTagList]
  )

  const setPressAreaAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          area: e,
        })
      )
    },
    [pressSearchOption.keywordParam.area]
  )

  const setPressMediaAreaAction = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          mediaArea: e,
        })
      )
    },
    [pressSearchOption.additionalParam.mediaArea]
  )

  const setNewsKeywordValueAction = useCallback(
    async (e: string, props: keywordParamProps) => {
      const params = {
        ...props,
        newsKeywordValue: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.newsKeywordValue]
  )

  const mediaTypePopupAdjust = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          mediaType: e,
        })
      )
    },
    [pressSearchOption.keywordParam.mediaType]
  )

  const setFieldKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        field: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.field]
  )

  const setMediaFieldKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [pressSearchOption.additionalParam.mediaField]
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

  const setBasicFieldPopupSelectedItem = useCallback(
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
        basicFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [basicFieldPopup.selectedType]
  )

  const setSelectedTypeBasicFieldPopup = useCallback(
    async (e: MbTagSearchTagItem, props: basicFieldPopupProps) => {
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [basicFieldPopup.selectedType]
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

  const setDeleteSelectedTypeBasicFieldPopup = useCallback(
    async (props: basicFieldPopupProps) => {
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [basicFieldPopup.selectedType]
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

  const setBasicLocationPopupSelectedValue = useCallback(
    async (e: string, props: basicLocationPopupProps) => {
      if (e && e !== '') {
        await basicLocationAction(e)
      }
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [basicLocationPopup.selectedValue]
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

  const setSelectedTypeBasicLocationPopup = useCallback(
    async (e: MbTagSearchTagItem, props: basicLocationPopupProps) => {
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [basicLocationPopup.selectedType]
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

  const setDeleteSelectedTypeBasicLocationPopup = useCallback(
    async (props: basicLocationPopupProps) => {
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [basicLocationPopup.selectedType]
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

  const setPressInformationType = useCallback(
    async (e: SelectListOptionItem, props: keywordParamProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.informationType]
  )

  const setBasicLocationPopupDeleteTotalSelect = useCallback(
    async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        basicLocationPopupAction({
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
    [basicLocationPopup.selectedType]
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

  const setBasicFieldPopupSelectedValue = useCallback(
    async (e: string, props: basicFieldPopupProps) => {
      if (e && e !== '') {
        await basicFieldAction(e)
      }
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [basicFieldPopup.selectedValue]
  )

  const setMediaFieldPopupSelectedValue = useCallback(
    async (e: string, props: basicFieldPopupProps) => {
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

  const setBasicFieldPopupDeleteTotalSelect = useCallback(
    async (commonList: fieldListProps[], props: basicFieldPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        basicFieldPopupAction({
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
    [basicFieldPopup.selectedType]
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

  const setSocialKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          social: e,
        })
      )
    },
    [pressSearchOption.additionalParam.social]
  )

  const setPortalKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          portal: e,
        })
      )
    },
    [pressSearchOption.additionalParam.portal]
  )

  const setOccupationKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        occupation: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.occupation]
  )

  const setPublishingKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        publishingPeriod: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.publishingPeriod]
  )

  const setPressMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOption.keywordParam.mediaTagList]
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

  const setBasicLocationPopupSelectedItem = useCallback(
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
        basicLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [basicLocationPopup.selectedType]
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

  const setMediaTypePopupAction = async (
    essentialList: SelectListOptionItem[],
    e: boolean,
    props: keywordParamProps
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

  const setBasicFieldPopupTotalSelect = async (commonList: fieldListProps[], props: basicFieldPopupProps) => {
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
        basicFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
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

  const setPressLanguageType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        languageParam: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.languageParam]
  )

  const setPressAdditionMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaGroupList: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.mediaGroupList]
  )

  const setPressAdditionMediaTargetList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      console.log('setPressAdditionMediaTargetList', e)
      const params = {
        ...props,
        mediaTargetList: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.mediaTargetList]
  )

  const setPressCountType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        count: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.count]
  )

  const setPressSystemType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        system: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.system]
  )

  const setPressLimitType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        limit: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam.limit]
  )

  const setPressAdditionTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTargetList') {
        params.mediaTargetList = props.mediaTargetList.filter(item => item.id !== e.id)
      } else if (type === 'mediaField') {
        params.mediaField = props.mediaField.filter(item => item.id !== e.id)
      } else if (type === 'mediaArea') {
        params.mediaArea = props.mediaArea.filter(item => item.id !== e.id)
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = props.mediaGroupList.filter(item => item.id !== e.id)
      } else if (type === 'portal') {
        params.portal = props.portal.filter(item => item.id !== e.id)
      } else if (type === 'social') {
        params.social = props.social.filter(item => item.id !== e.id)
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam]
  )

  const setPressTagAdditionDeleteControl = useCallback(
    async (props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTargetList') {
        params.mediaTargetList = []
      } else if (type === 'mediaField') {
        params.mediaField = []
      } else if (type === 'mediaArea') {
        params.mediaArea = []
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = []
      } else if (type === 'portal') {
        params.portal = []
      } else if (type === 'social') {
        params.social = []
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOption.additionalParam]
  )

  const setPressPositionValueAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      position: items.position,
    }
    if (param.position.length > 2) {
      openToast('직책은 최대 3개까지 입력가능합니다.', 'warning')
    } else {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          position: [...items.position, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    }
    dispatch(pressSearchOptionAction(param))
  }

  const setPressKeywordAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      keyword: items.keyword,
    }

    if (param.keyword.length > 2) {
      openToast('키워드는 최대 3개까지 입력가능합니다.', 'warning')
    } else {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          keyword: [...items.keyword, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    }
    dispatch(pressSearchOptionAction(param))
  }

  const setPressDepartmentAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      department: items.department,
    }
    if (items.department.length <= 2) {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          department: [...items.department, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    } else {
      openToast('부서는 최대 3개까지 입력가능합니다.', 'warning')
    }
    dispatch(pressSearchOptionAction(param))
  }

  const setBasicLocationPopupTotalSelect = async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
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
        basicLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const searchPressRegisterAction = async (
    hook: searchRegisterPopupProps,
    props: pressSearchOptionProps,
    tempOwner: boolean
  ) => {
    let isOpen = true
    let titleErr = ''
    if (hook.title === '') {
      titleErr = '제목을 입력해주세요'
    } else if (hook.title.length > 100) {
      titleErr = '제목은 100자를 넘을 수 없습니다.'
    } else {
      const { status, data, message } = await pressRegisterCheck.mutateAsync({
        oldName: '',
        newName: hook.title,
      })
      if (status === 'S') {
        isOpen = false
        await pressRegisterAction(hook.title, props, tempOwner)
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

  const pressRegisterAction = async (title: string, props: pressSearchOptionProps, tempOwner: boolean) => {
    const param = {
      title,
      groupId: userSelectGroup,
      shareCode: shareCodeData.jrnlstMediaSrch.id,
      shareTargetCode: 'GROUP',
      conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
    }
    const { status, data, message } = await pressRegister.mutateAsync(param)
    if (status === 'S') {
      await getPressSavedSearchList(tempOwner)
      await getMediaSavedSearchList(tempOwner)
      openToast(message?.message, 'success')
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

  const setMediaLocationPopupAction = async (essentialList: string[], e: boolean, props: additionalParamProps) => {
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

  const setBasicLocationPopupAction = async (essentialList: string[], e: boolean, props: keywordParamProps) => {
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
      await basicLocationAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.area,
    }
    dispatch(basicLocationPopupAction(params))
  }

  const setBasicFieldPopupAction = async (essentialList: string[], e: boolean, props: keywordParamProps) => {
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
      await basicFieldAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.field,
    }
    dispatch(basicFieldPopupAction(params))
  }

  const setMediaFieldPopupAction = async (essentialList: string[], e: boolean, props: additionalParamProps) => {
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

  const basicLocationAction = async (title: string) => {
    const { status, data, message } = await apiGetJournalistLocationSubData({ name: title })
    if (status === 'S') {
      const res = data as mediaFieldListProps[]
      dispatch(basicLocationListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const basicFieldAction = async (title: string) => {
    const { status, data, message } = await apiGetJournalistFieldSubData({ name: title })
    if (status === 'S') {
      const res = data as mediaFieldListProps[]
      dispatch(basicFieldListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
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
    console.log('init')
    let searchActivate = false
    let pressParams = pressInitParams
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
          // @ts-ignore
          list = preloadCommonCode.map(e => {
            return { id: e.code.toString(), name: e.name }
          })
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
          list = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name, extra: e.weight?.toString() }
          })
          dispatch(journalistSocialFilterListAction(list))
        } else if (param.id === 'PORTAL_CODE') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(portalListAction(list))
        } else if (param.id === 'MEDIA_JRNLIST_NAME_REVEALED_YN') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaNameRevealedYNListAction(list))
        } else if (param.id === 'MEDIA_BLOCK_YN') {
          list = [{ id: '', name: '선택', extra: '' }, ...list]
          dispatch(mediaBlockYNListAction(list))
        } else if (param.id === 'MEDIA_INFO_TYPE') {
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
          pressParams = {
            keywordParam: {
              journalistTagList: conditions.journalistTagList,
              newsKeyword: conditions.newsKeyword,
              newsKeywordValue: conditions.newsKeywordValue,
              field: conditions.field,
              area: conditions.area,
              mediaTagList: conditions.mediaTagList,
              mediaType: conditions.mediaType,
              occupation: conditions.occupation,
              position: conditions.position,
              positionValue: conditions.positionValue,
              keyword: conditions.keyword,
              keywordValue: conditions.keywordValue,
              department: conditions.department,
              departmentValue: conditions.departmentValue,
              informationType: conditions.informationType,
              publishingPeriod: conditions.publishingPeriod,
            },
            additionalParam: {
              mediaTargetList: conditions.mediaTargetList,
              mediaField: conditions.mediaField,
              mediaArea: conditions.mediaArea,
              mediaGroupList: conditions.mediaGroupList,
              portal: conditions.portal,
              social: conditions.social,
              languageParam: conditions.languageParam,
              count: conditions.count,
              system: conditions.system,
              limit: conditions.limit,
            },
          }
          console.log('searchActivate', searchActivate)
          console.log('pressParams', pressParams)
          dispatch(pressMediaDataAction({ searchActivate, pressParams }))
        }
      }
    } catch (e) {
      console.log('error', e)
    }
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

  const categoryDataHandle = (e: SelectListOptionItem) => {
    router.push(e.id === 'media' ? '/media/search' : '/contacts/search')
  }

  const movePressSearchResult = async (props: pressSearchOptionProps) => {
    let res = {
      ...props.keywordParam,
      ...props.additionalParam,
      journalist_id: 0,
      key_id: 'press',
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
    }
    if (props.keywordParam.keyword.length > 0) {
      res = {
        ...props.keywordParam,
        ...props.additionalParam,
        journalist_id: 0,
        key_id: 'press',
        sort: [`_score!desc`],
      }
    } else if (props.keywordParam.newsKeywordValue !== '') {
      res = {
        ...props.keywordParam,
        ...props.additionalParam,
        journalist_id: 0,
        key_id: 'press',
        sort: [`_score!desc`],
      }
    }
    const filter = setObjectToBase64(res)
    await router.push(`/contacts/search-result?filter=${filter}`)
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
    pressSearchOption,
    searchRegisterPopup,
    basicFieldPopup,
    industryList,
    basicFieldList,
    mediaTypePopup,
    mediaTypeList,
    mediaTypePopupList,
    basicLocationPopup,
    locationList,
    basicLocationList,
    journalistOccupationList,
    mediaValueList,
    pubCycleList,
    journalistBlockYNList,
    journalistInfoTypeList,
    mediaCountList,
    languageList,
    mediaLocationList,
    mediaLocationPopup,
    portalList,
    filterDataList,
    mediaFieldPopup,
    journalistSocialFilterList,
    mediaFieldList,

    init,
    categoryDataHandle,
    movePressSearchResult,
    setBasicFieldPopupAction,
    setBasicFieldPopupTotalSelect,
    setMediaTypePopupAction,
    setBasicLocationPopupAction,
    setBasicLocationPopupTotalSelect,
    setPressDepartmentAction,
    setPressKeywordAction,
    setPressPositionValueAction,
    setMediaLocationPopupAction,
    setMediaLocationPopupTotalSelect,
    searchPressRegisterAction,
    setMediaFieldPopupAction,
    setMediaFieldPopupTotalSelect,
    setMediaTypePopupTotalSelect,

    setResetSearchOption,
    setPressMediaListOptionAction,
    setSearchRegisterPopup,
    setSearchRegisterPopupOnChange,
    setPressTagDeleteControl,
    setPressTagControl,
    setPressJournalistTagList,
    setNewsKeywordValueAction,
    setFieldKeywordValueAction,
    setBasicFieldPopupSelectedItem,
    setMediaFieldPopupSelectedItem,
    setSelectedTypeBasicFieldPopup,
    setDeleteSelectedTypeBasicFieldPopup,
    setBasicFieldPopupSelectedValue,
    setBasicFieldPopupDeleteTotalSelect,
    setPressMediaTagList,
    setOccupationKeywordValueAction,
    setPortalKeywordValueAction,
    setSocialKeywordValueAction,
    setMediaTypePopupSelectedValue,
    setMediaTypePopupSelectedItem,
    setSelectedTypeMediaTypePopup,
    setDeleteSelectedTypeMediaTypePopup,
    setMediaTypePopupDeleteTotalSelect,
    mediaTypePopupAdjust,
    setBasicLocationPopupSelectedItem,
    setMediaLocationPopupSelectedItem,
    setPressAreaAction,
    setPressMediaAreaAction,
    setBasicLocationPopupSelectedValue,
    setMediaLocationPopupSelectedValue,
    setSelectedTypeBasicLocationPopup,
    setDeleteSelectedTypeBasicLocationPopup,
    setBasicLocationPopupDeleteTotalSelect,
    setPressInformationType,
    setPublishingKeywordValueAction,
    setPressTagAdditionDeleteControl,
    setPressAdditionTagControl,
    setPressLanguageType,
    setPressLimitType,
    setPressSystemType,
    setPressCountType,
    setPressAdditionMediaTagList,
    setPressAdditionMediaTargetList,
    setSelectedTypeMediaLocationPopup,
    setDeleteSelectedTypeMediaLocationPopup,
    setMediaLocationPopupDeleteTotalSelect,
    setMediaFieldKeywordValueAction,
    setMediaFieldPopupSelectedValue,
    setMediaFieldPopupDeleteTotalSelect,
    setSelectedTypeMediaFieldPopup,
    setDeleteSelectedTypeMediaFieldPopup,
  }
}
