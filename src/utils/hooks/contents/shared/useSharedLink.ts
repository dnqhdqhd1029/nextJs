import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { sharedLinkUrlAction } from '~/stores/modules/contents/auth/auth'
import { BaseResponseCommonObject } from '~/types/api/service'
import { useGetOriginalUrlRaw } from '~/utils/api/mailInfoLink/useMailInfoLink'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSharedLink = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { loggedIn, userInfo } = useAppSelector(state => state.authSlice)

  const { isLoading, data: getOriginalUrlRaw } = useGetOriginalUrlRaw(
    router.pathname.startsWith('/mailinfolink') ? '0' : ''
  )

  const effectFunction = async () => {
    const { status, data, message } = getOriginalUrlRaw as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as { id: string; email: string; type: string; objectType: string; originUrl: string }
      if (res.type === 'RESET_PASSWORD') {
        if (userInfo.userId && loggedIn) {
          //await router.replace()
        } else {
          //dispatch(sharedLinkUrlAction())
          await router.replace('/member/login')
        }
      } else {
        openToast('잘못된 접근입니다.', 'error')
        await router.replace('/500')
      }
    } else {
      openToast(message?.message, 'error')
      await router.replace('/member/login')
    }
  }

  useEffect(() => {
    if (!getOriginalUrlRaw) return
    effectFunction()
  }, [getOriginalUrlRaw])

  return {
    isLoading,
  }
}
