/**
 * @file useMailInfoLink.ts
 * @description 시스템 통합 링크
 */

import { useEffect, useMemo } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import { DEMO_DOMAINS } from '~/constants/common'
import { demoEmailAction } from '~/stores/modules/contents/login/login'
import { paramKeyAction } from '~/stores/modules/contents/mailInfoLink/mailInfoLink'
import { resetPasswordAction } from '~/stores/modules/contents/password/userPassword'
import { paymentsIdAction } from '~/stores/modules/contents/payment/payment'
import { setRegisterUserAction } from '~/stores/modules/contents/register/useRegisterUser'
import { resetState } from '~/stores/reducer'
import { BaseResponseCommonObject } from '~/types/api/service'
import { useGetOriginalUrlRaw } from '~/utils/api/mailInfoLink/useMailInfoLink'
import { useAdminConfirmRegisterUser, useAdminRegisterUser } from '~/utils/api/registerUser/useRegisterUser'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMailInfoLink = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { paramKey } = useAppSelector(state => state.mailInfoLinkSlice)

  const { isLoading, data: getOriginalUrlRaw } = useGetOriginalUrlRaw(
    router.pathname.startsWith('/mailinfolink') ? paramKey : ''
  )
  const apiAdminConfirmRegisterUser = useAdminConfirmRegisterUser()

  const isDemoDomain = useMemo(
    () => DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number]),
    []
  )

  const effectFunction = async () => {
    const { status, data, message } = getOriginalUrlRaw as BaseResponseCommonObject
    dispatch(resetState())
    Cookie.remove('ACCESS_TOKEN_NAME')
    if (status === 'S') {
      const res = data as {
        id?: string
        email?: string
        company?: string
        type: string
        objectType?: string
        originUrl?: string
        timeout?: string
      }
      if (res.type === 'RESET_PASSWORD') {
        const param = {
          userId: res?.id?.toString() || '',
          type: '',
          email: res?.email || '',
          password: '',
          passwordConfirm: '',
          passwordErr: '',
          passwordConfirmErr: '',
        }
        dispatch(resetPasswordAction(param))
        await router.replace('/reset-password')
      } else if (res.type === 'FIRST_REGISTER_USER') {
        const param = {
          keyValue: res?.id?.toString() || '',
          type: 'FIRST_REGISTER_USER',
          email: res?.email || '',
          company: res?.company || '',
          name: '',
          nameErr: '',
          nickName: '',
          password: '',
          passwordConfirm: '',
          passwordErr: '',
          passwordConfirmErr: '',
          timeZone: { id: '', name: '' },
          phone: '',
          telePhone: '',
          isNewsLetter: 'yes',
          isDone: false,
        }
        dispatch(setRegisterUserAction(param))
        await router.replace('/first-register-user')
      } else if (res.type === 'REGISTRATION_GUIDANCE') {
        const param = {
          keyValue: res?.id?.toString() || '',
          type: 'REGISTRATION_GUIDANCE',
          email: res?.email || '',
          company: res?.company || '',
          name: '',
          nameErr: '',
          nickName: '',
          password: '',
          passwordConfirm: '',
          passwordErr: '',
          passwordConfirmErr: '',
          timeZone: { id: '', name: '' },
          phone: '',
          telePhone: '',
          isNewsLetter: 'yes',
          isDone: false,
        }
        dispatch(setRegisterUserAction(param))
        await router.replace('/registration-guidance')
      } else if (res.type === 'FIRST_REGISTER_ADMIN_CONFIRM') {
        const { status, data, message } = await apiAdminConfirmRegisterUser.mutateAsync(Number(res?.id || 0))
        if (status !== 'S') openToast(message?.message, status === 'S' ? 'success' : 'error')
        await router.replace('/member/login')
      } else if (res.type === 'DEMO_INVITE') {
        if (res.id && res.email && isDemoDomain) {
          dispatch(demoEmailAction({ userId: Number(res.id || 0), email: res.email || '', timeOut: res.timeout || '' }))
          await router.replace('/member/login')
        } else {
          openToast('잘못된 접근입니다', 'error')
          await router.replace('/500')
        }
      } else if (res.type === 'DEMO_PURCHASE') {
        window.location.replace('https://www.naver.com/')
      } else {
        const param = {
          paymentsId: Number(res?.id || 0),
          paymentTypeKey: 'non_user',
          count: 0,
          productId: 0,
        }
        dispatch(paymentsIdAction(param))
        await router.replace('/payment')
      }
    } else {
      openToast(message?.message, 'error')
      await router.replace('/member/login')
    }
  }
  useEffect(() => {
    router.query.id && dispatch(paramKeyAction(router.query.id.toString()))
  }, [router.query.id])

  useEffect(() => {
    if (!getOriginalUrlRaw) return
    effectFunction()
  }, [getOriginalUrlRaw])

  return {
    paramKey,
    isLoading,
  }
}
