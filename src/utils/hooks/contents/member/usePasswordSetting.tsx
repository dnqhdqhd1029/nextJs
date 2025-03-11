/**
 * @file usePasswordSetting.ts
 */

import { useRef, useState } from 'react'
import router, { useRouter } from 'next/router'

import {
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  PASSWORD_PATTER_DESCRIPTION,
  PASSWORD_PATTERN,
} from '~/constants/common'
import {
  isResetLoadingAction,
  passwordProps,
  resetPasswordAction,
  resetProps,
  setPasswordAction,
} from '~/stores/modules/contents/password/userPassword'
import { resetInAction } from '~/stores/modules/contents/payment/payment'
import { useNonUserResetPassword, useUserPasswordCheck } from '~/utils/api/password/usePassword'
import { apiInternalPutUserResetPassword } from '~/utils/api/user/usePutUserResetPassword'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePasswordSetting = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { password, reset, isResetLoading } = useAppSelector(state => state.userPasswordSlice)

  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const apiNonUserResetPassword = useNonUserResetPassword()
  const apiUserPasswordCheck = useUserPasswordCheck()

  const initDataAction = () => {
    if (reset.userId === '') {
      openToast('잘못된 접근입니다', 'error')
      router.replace('/member/login')
    }
  }

  const sendPasswordEmail = async (param: passwordProps) => {
    let tempMsg = ''
    if (param.email === '') {
      tempMsg = '이메일을 입력하세요'
    } else if (!EMAIL_PATTERN.test(param.email)) {
      tempMsg = EMAIL_PATTERN_DESCRIPTION
    }

    if (tempMsg !== '') {
      let params = {
        ...param,
        emailErr: tempMsg,
      }
      dispatch(setPasswordAction(params))
      openToast(params.emailErr, 'warning')
    } else {
      await resetPassword(param)
    }
  }

  const setRePasswordAction = async (param: string) => {
    const params = {
      email: param,
      emailErr: '',
    }
    dispatch(setPasswordAction(params))
  }

  const checkAction = async () => {
    if (password.email === '') {
      // openToast('잘못된 접근입니다', 'error')
      // await router.replace('/member/login')
    }
  }

  const resetPassword = async (param: passwordProps) => {
    const params = param.email
    const { status, message } = await apiNonUserResetPassword.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (router.pathname !== '/member/password-reset-link') {
        dispatch(setPasswordAction(param))
        await router.push('/member/password-reset-link')
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setResetPassword = async (param: string, item: resetProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(resetPasswordAction(params))
  }

  const setResetPasswordConfirm = async (param: string, item: resetProps) => {
    const params = {
      ...item,
      passwordConfirm: param,
      passwordConfirmErr: '',
    }
    dispatch(resetPasswordAction(params))
  }

  const validateAction = async (item: resetProps) => {
    let res = false
    let params = { ...item }
    if (item.password === '') {
      res = true
      params.passwordErr = '신규 비밀번호를 입력해 주세요.'
    } else if (item.passwordConfirm === '') {
      res = true
      params.passwordConfirmErr = '신규 비밀번호 확인을 입력해 주세요.'
    } else if (!PASSWORD_PATTERN.test(item.password)) {
      res = true
      params.passwordErr = PASSWORD_PATTER_DESCRIPTION
    } else if (item.passwordConfirm !== item.password) {
      res = true
      params.passwordErr = ''
      params.passwordConfirmErr = '새로운 비밀번호 확인이 일치하지 않습니다.'
    }
    dispatch(resetPasswordAction(params))
    return !res
  }

  const resetPasswordFunction = async (item: resetProps) => {
    const check = await validateAction(item)
    if (check) {
      const param = {
        id: Number(item.userId),
        passwordInfo: {
          email: item.email,
          newPassword: item.password,
          newPasswordConfirm: item.passwordConfirm,
        },
        locale: 'ko',
      }
      const { status, message } = await apiUserPasswordCheck.mutateAsync(param)
      if (status === 'S') {
        openToast(message?.message, 'success')
        await router.replace('/member/login')
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  return {
    password,
    passwordRef,
    passwordConfirmRef,
    reset,
    isResetLoading,

    initDataAction,
    checkAction,
    resetPassword,
    setRePasswordAction,
    sendPasswordEmail,
    setResetPassword,
    setResetPasswordConfirm,
    resetPasswordFunction,
  }
}
