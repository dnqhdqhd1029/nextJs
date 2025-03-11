/**
 * @file useDraft.ts
 * @description 배포 관리
 */

import { MouseEvent, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { enabled } from 'store'

import { draftTab } from '~/components/contents/distribution/Draft/defaultData'
import { draftCategoryList } from '~/components/contents/distribution/Draft/defaultData'
import {
  draftListAction,
  draftListPopupAction,
  initDraftListAction,
  initNwStateCodeListAction,
  initStateCodeListAction,
  setCategoryListAction,
  setSearchParamsAction,
  tabAction,
  TabType,
} from '~/stores/modules/contents/draft/draft'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import {
  ActionFilterDto,
  BaseResponseCommonObject,
  CodeNameCountDto,
  CommonCodeDto,
  PageActionDtoForList,
} from '~/types/api/service'
import { useGetActionList, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { useGetActionFilter } from '~/utils/api/action/usePostGetActionFilter'
import { useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useDeleteRelease, useLockRelease } from '~/utils/api/release/draft/useDeleteRelease'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

interface ICategoryList extends CodeNameCountDto {
  id: string
}

export const useDraft = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { isDemoLicense, userInfo, licenseInfo, userSelectGroup, shareCodeData } = useAppSelector(
    state => state.authSlice
  )
  const { tab, draftList, categoryList, stateCodeList, nwStateCodeList, draftListPopup, searchParams, pageCount } =
    useAppSelector(state => state.draftSlice)
  const { emailPopup } = useAppSelector(state => state.emailSlice)

  const {
    isLoading,
    data: listData,
    refetch: listReetch,
  } = useGetActionList(searchParams, { enabled: router.pathname === '/draft' })

  const { data: filterData, refetch: filterRefetch } = useGetActionFilter(
    { groupId: userSelectGroup },
    { enabled: router.pathname === '/draft' }
  )

  const { data: stateData, refetch: stateRefetch } = useGetCommonCode(
    { parentCode: 'ACTION_STATE_FILTER' },
    { enabled: router.pathname === '/draft' }
  )

  const { data: nwStateData, refetch: nwStateRefetch } = useGetCommonCode(
    { parentCode: 'NEWSWIRE_STATE' },
    { enabled: router.pathname === '/draft' }
  )

  const deleteData = useDeleteRelease()
  const apiLock = useLockRelease()

  const moveToNext = async (
    e: MouseEvent<HTMLAnchorElement>,
    i: number,
    type: string,
    urlKey: TabType,
    actionType: string
  ) => {
    if (!licenseInfo.isExpired) {
      if (actionType === 'new') {
        if (urlKey.id === 'MAILING') {
          dispatch(initEmailPopupAction({ key: 1, name: userInfo.name ?? '-', scrop: shareCodeData.distribute }))
        } else {
          await router.push(urlKey.value)
        }
      } else {
        const { status, data, message } = await apiLock.mutateAsync({
          id: i,
          group: userSelectGroup,
        })
        if (status !== 'S') {
          openToast('다른회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
        } else {
          e.preventDefault()
          if (type === 'MAILING') {
            dispatch(initEmailPopupAction({ key: i, name: userInfo.name ?? '-', scrop: shareCodeData.distribute }))
          } else {
            await router.push({
              pathname: type === 'PRESS_RELEASE' ? '/press-release' : '/newswire',
              query: {
                mailingId: i,
              },
            })
          }
        }
      }
    }
  }

  const selectedDeleteAction = async (e: number) => {
    const { status, message } = await deleteData.mutateAsync({
      id: e,
      group: userSelectGroup,
    })
    if (status === 'S') {
      // await refetchDraftListData()
      openToast(message?.message, 'success')
      dispatch(
        draftListPopupAction({
          key: 0,
          title: '',
          isOpen: false,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initDraftList = () => dispatch(initDraftListAction(userSelectGroup))

  const setSelectedDeleteData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        draftListPopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [draftListPopup]
  )

  const setTabAction = useCallback(
    async (e: string) => {
      const find = draftTab.find(i => i.id === e)
      if (find) dispatch(tabAction(find))
    },
    [tab]
  )

  const handleSetSearchParam = (param: UseGetActionListParams) => {
    dispatch(setSearchParamsAction({ ...searchParams, ...param }))
  }

  useEffect(() => {
    if (!stateData) return
    const { status, data, code, message } = stateData as BaseResponseCommonObject
    if (status === 'S') {
      dispatch(initStateCodeListAction(data as CommonCodeDto[]))
    } else {
      openToast(message?.message, 'error')
    }
  }, [stateData])

  useEffect(() => {
    if (!nwStateData) return
    const { status, data, code, message } = nwStateData as BaseResponseCommonObject
    if (status === 'S') {
      dispatch(initNwStateCodeListAction(data as CommonCodeDto[]))
    } else {
      openToast(message?.message, 'error')
    }
  }, [nwStateData])

  useEffect(() => {
    if (!listData || searchParams.groupId === 0) return
    const { status, code, data, message } = listData as BaseResponseCommonObject
    if (status === 'S') {
      const { content, totalElements, totalPages } = data as PageActionDtoForList
      dispatch(
        draftListAction({
          content: content || [],
          pageCount: {
            totalCount: totalElements || 0,
            totalPageCount: totalPages || 1,
          },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }, [listData, searchParams])

  useEffect(() => {
    if (!filterData) return
    const { status, code, data, message } = filterData as BaseResponseCommonObject
    if (status === 'S') {
      const { codeNameCountListCategory } = data as ActionFilterDto
      const objCategory = Object.fromEntries(
        codeNameCountListCategory?.map((category: CodeNameCountDto) => [category.code, category]) || []
      )
      let arrCategoryList: Array<ICategoryList> = []
      draftCategoryList
        .filter(category => category.id !== 'ALL')
        .forEach(category => {
          if (objCategory[category.id]) {
            arrCategoryList.push({
              id: category.id,
              code: objCategory[category.id].code,
              name: category.title,
              count: objCategory[category.id].count || 0,
            })
          } else {
            arrCategoryList.push({
              id: category.id,
              code: category.id,
              name: category.title,
              count: 0,
            })
          }
        })

      draftCategoryList
        .filter(category => category.id === 'ALL')
        .forEach(category => {
          const totalCount = arrCategoryList.reduce((acc, cur) => {
            return acc + (cur.count || 0)
          }, 0)
          arrCategoryList.splice(0, 0, {
            id: category.id,
            code: category.id,
            name: category.title,
            count: totalCount,
          })
        })

      dispatch(setCategoryListAction(arrCategoryList))
    } else {
      openToast(message?.message, 'error')
    }
  }, [filterData])

  return {
    tab,
    draftList,
    stateCodeList,
    nwStateCodeList,
    draftListPopup,
    isLoading,
    userInfo,
    licenseInfo,
    userSelectGroup,
    searchParams,
    pageCount,
    categoryList,

    setTabAction,
    setCategoryListAction,
    setSelectedDeleteData,

    initDraftList,
    selectedDeleteAction,
    moveToNext,
    handleSetSearchParam,
  }
}
