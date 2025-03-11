import { KeyboardEvent, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { DefaultMediaParam, DefaultPressParam } from '~/components/contents/common/search/defaultData'
import {
  globalSeaarchPopupProps,
  initGlobalSearch,
  journalLoadingAction,
  mediaLoadingAction,
  setGlobalSeaarchPopupAction,
  setJournalistResultListAction,
  setMediaResultListAction,
} from '~/stores/modules/contents/globalSearch/globalSearch'
import { BaseResponseCommonObject, JournalistAutoCompleteDto, MediaAutoCompleteDto } from '~/types/api/service'
import {
  apiGetJournalistSimpleSearch,
  useGetJournalistSimpleSearch,
} from '~/utils/api/journalist/useGetJournalistSimpleSearch'
import { apiGetMediaSimpleSearch, useGetMediaSimpleSearch } from '~/utils/api/media/useGetMediaSimpleSearch'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useGlobalSearch = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { journalLoading, mediaLoading, globalSeaarchPopup } = useAppSelector(state => state.globalSearchSlice)
  const { licenseInfo, userInfo, userSelectGroup, globalNoti, shareCodeData } = useAppSelector(state => state.authSlice)

  const searchInputRef = useRef<HTMLInputElement>(null)

  const setIsOpenGloablSearchPopup = useCallback(
    (e: boolean) => {
      dispatch(
        setGlobalSeaarchPopupAction({
          isOpen: e,
          isLoading: false,
          keyword: '',
          journalistResultList: [],
          mediaResultList: [],
        })
      )
    },
    [globalSeaarchPopup]
  )

  const setKeywordGloablSearchPopup = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, props: globalSeaarchPopupProps) => {
      const value = searchInputRef.current?.value ?? ''
      const param = {
        ...props,
        keyword: value,
        isLoading: value.trim().length >= 2,
      }
      dispatch(setGlobalSeaarchPopupAction(param))
    },
    [globalSeaarchPopup.keyword]
  )

  const setInitKeywordGloablSearchPopup = useCallback(
    (props: globalSeaarchPopupProps) => {
      const param = {
        ...props,
        keyword: '',
      }
      dispatch(setGlobalSeaarchPopupAction(param))
    },
    [globalSeaarchPopup.keyword]
  )

  const setGloablSearchPopup = useCallback(
    (props: globalSeaarchPopupProps) => {
      dispatch(setGlobalSeaarchPopupAction(props))
    },
    [globalSeaarchPopup]
  )

  const moveToJournal = (e: number) => {
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/contacts/record/${e}`)
  }

  const moveToMedia = (e: number) => {
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/media/record/${e}`)
  }

  const moveToJournalSearchOption = () => {
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/contacts/search`)
  }

  const moveToMediaSearchOption = () => {
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/media/search`)
  }

  const moveToMediaKeywordSearchOption = (e: string) => {
    const res = setObjectToBase64({
      ...DefaultMediaParam.keywordParam,
      ...DefaultMediaParam.additionalParam,
      keyword: [{ id: e, label: e }],
      media_id: 0,
      key_id: 'media',
    })
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/contacts/search-result?filter=${res}`)
  }

  const moveToJournalKeywordSearchOption = (e: string) => {
    const res = setObjectToBase64({
      ...DefaultPressParam.keywordParam,
      ...DefaultPressParam.additionalParam,
      keyword: [{ id: e, label: e }],
      journalist_id: 0,
      key_id: 'press',
    })
    dispatch(
      setGlobalSeaarchPopupAction({
        isOpen: false,
        isLoading: false,
        keyword: '',
        journalistResultList: [],
        mediaResultList: [],
      })
    )
    router.push(`/contacts/search-result?filter=${res}`)
  }

  const getJournalistSearchData = async (e: string) => {
    if (e && e.length > 1) {
      dispatch(journalLoadingAction(true))
      const { status, data, message } = await apiGetJournalistSimpleSearch({
        keyword: e,
        page: 1,
        size: 20,
        sort: 'value!desc',
      })
      if (status === 'S') {
        const jData = data as JournalistAutoCompleteDto[]
        dispatch(setJournalistResultListAction(jData))
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(journalLoadingAction(false))
    }
  }

  const getMediaSearchData = async (e: string) => {
    if (e && e.length > 1) {
      dispatch(mediaLoadingAction(true))
      const { status, data, message } = await apiGetMediaSimpleSearch({
        keyword: e,
        page: 1,
        size: 20,
        sort: 'value!desc',
      })
      if (status === 'S') {
        const mData = data as MediaAutoCompleteDto[]
        dispatch(setMediaResultListAction(mData))
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(mediaLoadingAction(false))
    }
  }

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    globalSeaarchPopup,
    searchInputRef,
    journalLoading,
    mediaLoading,

    moveToJournalSearchOption,
    moveToMediaSearchOption,
    moveToMediaKeywordSearchOption,
    moveToJournalKeywordSearchOption,
    moveToMedia,
    moveToJournal,
    getJournalistSearchData,
    getMediaSearchData,

    setIsOpenGloablSearchPopup,
    setGloablSearchPopup,
    setKeywordGloablSearchPopup,
    setInitKeywordGloablSearchPopup,
  }
}
