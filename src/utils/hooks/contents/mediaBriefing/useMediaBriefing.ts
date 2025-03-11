import { useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  isMediabriefingSearchAction,
  mediabriefingSearchParamsAction,
  mediabriefingSearchParamsProps,
} from '~/stores/modules/contents/pressMedia/mediaBriefing'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMediaBriefing = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { userInfo, licenseInfo, userSelectGroup, shareCodeData } = useAppSelector(state => state.authSlice)
  const {
    isMediabriefingSearch,
    mediabriefingSearchList,
    mediabriefingSearchShortList,
    mediabriefingData,
    mediabriefingSearchParams,
    pageCount,
  } = useAppSelector(state => state.mediabriefingSlice)

  const setIsMediabriefingSearch = useCallback(
    async (e: boolean) => {
      dispatch(isMediabriefingSearchAction(e))
    },
    [isMediabriefingSearch]
  )

  const handlePaginationChange = useCallback(
    async (e: number, props: mediabriefingSearchParamsProps) => {
      dispatch(
        mediabriefingSearchParamsAction({
          ...props,
          page: e,
          size: props.size,
        })
      )
    },
    [mediabriefingSearchParams.page]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, props: mediabriefingSearchParamsProps) => {
      dispatch(
        mediabriefingSearchParamsAction({
          ...props,
          title: e,
        })
      )
    },
    [mediabriefingSearchParams.title]
  )

  const getSearchActionByKeyword = useCallback(
    async (props: mediabriefingSearchParamsProps) => {
      dispatch(
        mediabriefingSearchParamsAction({
          ...props,
          title: '',
        })
      )
    },
    [mediabriefingSearchParams.title]
  )

  return {
    isMediabriefingSearch,
    mediabriefingSearchList,
    mediabriefingSearchParams,
    pageCount,
    userInfo,
    licenseInfo,
    userSelectGroup,
    mediabriefingSearchShortList,
    mediabriefingData,

    setIsMediabriefingSearch,
    handleKeywordsChange,
    getSearchActionByKeyword,
    handlePaginationChange,
  }
}
