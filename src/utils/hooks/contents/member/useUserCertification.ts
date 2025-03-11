/**
 * @file useUserCertification.ts
 * @description 사용자 인증 코드
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import { EMAIL_PATTERN, NUMBER_PATTERN } from '~/constants/common'
import { certificationOtpAction } from '~/stores/modules/contents/admin/adminUser'
import { setBlockedEmailAction } from '~/stores/modules/contents/auth/auth'
import { apiPostAccessOtp } from '~/utils/api/user/usePostAccessOtp'
import { apiPostCheckOtp } from '~/utils/api/user/usePostCheckOtp'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useUserCertification = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { licenseInfo, userInfo, blockedEmail } = useAppSelector(state => state.authSlice)
  const { certificationOtp } = useAppSelector(state => state.adminUserSlice)
  const [endTimeRef, setEndTimeRef] = useState<Date | null>(null)
  const [minute, setMinute] = useState(5)
  const [second, setSecond] = useState('59')
  const [isLoading, setIsLoading] = useState(false)

  const setOtpNm = useCallback(
    (e: string, origin: string) => {
      let otpErr = ''
      let otpNm = e
      if (NUMBER_PATTERN.test(e)) {
        otpErr = '숫자만 입력 가능합니다'
        otpNm = origin
      }
      dispatch(
        certificationOtpAction({
          otpNm: otpNm,
          otpErr: otpErr,
        })
      )
    },
    [certificationOtp.otpNm, certificationOtp.otpErr]
  )

  const otpAction = async (e: string) => {
    setIsLoading(() => true)
    const { status, message } = await apiPostCheckOtp({ email: blockedEmail, otp: e })
    if (status === 'S') {
      setEndTimeRef(() => null)
      setMinute(() => 5)
      setSecond(() => '59')
      dispatch(setBlockedEmailAction(''))
      await router.push('/member/login')
    } else {
      dispatch(
        certificationOtpAction({
          otpNm: e,
          otpErr: '인증코드가 틀렸습니다.',
        })
      )
    }
    setIsLoading(() => false)
  }

  const getOtpTime = async (email: string) => {
    setIsLoading(() => true)
    const { timestamp, status, message } = await apiPostAccessOtp(email)
    if (status === 'S') {
      setEndTimeRef(() => moment(timestamp).toDate())
    } else {
      setEndTimeRef(() => null)
      openToast('코드 발급에 실패했습니다.', 'error')
    }
    setMinute(() => 5)
    setSecond(() => '59')
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (endTimeRef !== null) {
      const authExpireInterval = setInterval(() => {
        const currentTime = Math.floor(5 * 60 - (new Date().getTime() - endTimeRef.getTime()) / 1000)
        if (currentTime <= 0) {
          clearInterval(authExpireInterval)
        }
        const minuteRemaining = Math.floor(currentTime / 60)
        const secondRemaining = currentTime % 60
        setMinute(() => minuteRemaining)
        setSecond(() => secondRemaining.toString())
      }, 1000)
      return () => clearInterval(authExpireInterval)
    }
  }, [endTimeRef])

  useEffect(() => {
    getOtpTime(blockedEmail)
  }, [])

  return {
    licenseInfo,
    userInfo,
    minute,
    second,
    isLoading,
    endTimeRef,
    certificationOtp,
    blockedEmail,

    getOtpTime,
    otpAction,

    setOtpNm,
  }
}
