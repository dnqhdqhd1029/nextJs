import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { setLandingPageAction, timeZoneAction } from '~/stores/modules/contents/auth/auth'
import {
  landingPageDataAction,
  setUserLandingListAction,
  timeZoneListAction,
  timeZoneValueAction,
} from '~/stores/modules/contents/setting/setting'
import type { BaseResponseCommonObject, UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePutUser, UsePutUserParams } from '~/utils/api/user/usePutUser'
import { useGetUserTimeZone, usePutUserTimeZone } from '~/utils/api/user/usePutUserTimeZone'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useLandingPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateUserInfo = usePutUser()

  const { userInfo, licenseInfo, frequentlyUsedCommonCode, landingPage } = useAppSelector(state => state.authSlice)
  const { timeZoneValue, landingDataList, landingPageData, timeZoneList, timeZoneTotalList } = useAppSelector(
    state => state.userSettingSlice
  )
  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname === '/setting/landingpage' ? 'USER_LANDING_PAGE' : '',
  })

  const getCommonCodeList = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
  }

  const updateProfileValidateAction = async (e: SelectListOptionItem) => {
    let preloadCommonCode: CommonCode[] = []
    const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'USER_LANDING_PAGE')
    //@ts-ignore
    if (find && find.commonCodeList && find.commonCodeList.length > 0) {
      //@ts-ignore
      preloadCommonCode = find.commonCodeList
    } else {
      preloadCommonCode = await getCommonCodeList('USER_LANDING_PAGE')
    }
    const putUserProps: UsePutUserParams = {
      id: userInfo?.userId as number,
      userInfo: {
        name: userInfo?.name || '',
        nickname: userInfo?.nickname || '',
        phone: userInfo?.phone || '',
        mobile: userInfo?.mobile || '',
        landingPage: e.id,
        receiveLetter: userInfo?.receiveLetter || false,
        //@ts-ignore
        department: userInfo?.department || '',
        //@ts-ignore
        position: userInfo?.position || '',
      },
    }
    const { status, message } = await updateUserInfo.mutateAsync(putUserProps)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const findLandingPage = preloadCommonCode.find(code => code.code === e.id)
      if (findLandingPage) {
        dispatch(setLandingPageAction([findLandingPage]))
      }
      dispatch(landingPageDataAction(e))
    } else {
      openToast(message?.message || '회원정보 수정에 실패하였습니다.', 'error')
    }
  }

  const setLandingPage = async (code: CommonCode[]) => {
    let temp: SelectListOptionItem[] = []
    let tempLandingData = { id: '', name: '' }
    for await (const listElement of code) {
      if (licenseInfo.flagMonitoring) {
        temp = [...temp, { id: listElement.code, name: listElement.name }]
      }
    }
    if (landingPage && landingPage.length > 0) {
      let findLandingPage = temp.find(item => item?.id === landingPage[0].code)
      if (findLandingPage) {
        tempLandingData = {
          id: findLandingPage.id,
          name: findLandingPage.name,
        }
      } else {
        tempLandingData = {
          id: temp[0].id,
          name: temp[0].name,
        }
      }
    }
    dispatch(setUserLandingListAction({ list: temp, data: tempLandingData }))
  }

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      setLandingPage(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [getCommonCode])

  return {
    userInfo,
    timeZoneValue,
    timeZoneList,
    landingDataList,
    landingPageData,

    updateProfileValidateAction,
  }
}
