import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { timeZoneAction } from '~/stores/modules/contents/auth/auth'
import { timeZoneListAction, timeZoneValueAction } from '~/stores/modules/contents/setting/setting'
import type { BaseResponseCommonObject, UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useGetUserTimeZone, usePutUserTimeZone } from '~/utils/api/user/usePutUserTimeZone'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useTimeZone = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const updateUserTimeZone = usePutUserTimeZone()

  const { userInfo, timeZone, timeZoneData } = useAppSelector(state => state.authSlice)
  const { timeZoneValue, timeZoneList, timeZoneTotalList } = useAppSelector(state => state.userSettingSlice)
  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname === '/setting/time-zone' ? 'TIMEZONE' : '',
  })

  const setTimeZoneValueAction = useCallback(
    async (e: SelectListOptionItem, hooks: SelectListOptionItem) => {
      const params = {
        id: userInfo?.userId ?? 0,
        info: {
          timezone: e.id,
        },
      }
      dispatch(timeZoneValueAction(e))
      const { status, message } = await updateUserTimeZone.mutateAsync(params)
      if (status === 'S') {
        openToast('표준 시간대를 변경했습니다.', 'success')
        const find = timeZoneTotalList.length > 0 ? timeZoneTotalList.find(i => i.code === e.id) : timeZoneData
        dispatch(timeZoneAction({ timeZone: e.id, timeZoneData: find ? find : timeZoneData }))
      } else {
        openToast(message?.message, 'error')
        dispatch(timeZoneValueAction(hooks))
      }
    },
    [timeZoneValue]
  )

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      const findTimezone = list.find(item => item.id === timeZone)
      dispatch(timeZoneListAction({ list, value: findTimezone ? findTimezone : { id: '', name: '' }, total: res }))
    } else {
      openToast(message?.message, 'error')
    }
  }, [getCommonCode])

  return {
    userInfo,
    timeZoneValue,
    timeZoneList,

    setTimeZoneValueAction,
  }
}
