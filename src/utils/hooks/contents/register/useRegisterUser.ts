/**
 * @file useRegisterUser.ts
 */

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { PASSWORD_PATTER_DESCRIPTION, PASSWORD_PATTERN } from '~/constants/common'
import { initRequestPopupTypesAction } from '~/stores/modules/contents/payment/payment'
import {
  isRegisterUserLoadingAction,
  registerUserProps,
  setRegisterUserAction,
  setTimeZoneListAction,
} from '~/stores/modules/contents/register/useRegisterUser'
import { BaseResponseCommonObject } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useAdminRegisterUser, useFirstRegisterUser } from '~/utils/api/registerUser/useRegisterUser'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useRegisterUser = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { isRegisterUserLoading, registerUser, timeZoneList, commonParentCode } = useAppSelector(
    state => state.registerUserSlice
  )
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)

  const apiFirstRegisterUser = useFirstRegisterUser()
  const apiAdminRegisterUser = useAdminRegisterUser()
  const { isLoading: getCommonCodeLoading, data: getCommonCode } = useGetCommonCode({
    parentCode:
      router.pathname === '/first-register-user'
        ? commonParentCode
        : router.pathname === '/registration-guidance'
        ? commonParentCode
        : '',
  })

  const setNameAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      name: param,
      nameErr: '',
    }
    dispatch(setRegisterUserAction(params))
  }

  const setNickNameAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      nickName: param,
    }
    dispatch(setRegisterUserAction(params))
  }

  const setPasswordAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(setRegisterUserAction(params))
  }

  const setPasswordConfirmAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      passwordConfirm: param,
      passwordConfirmErr: '',
    }
    dispatch(setRegisterUserAction(params))
  }

  const setTimeZoneAction = async (param: SelectListOptionItem, item: registerUserProps) => {
    const params = {
      ...item,
      timeZone: param,
    }
    dispatch(setRegisterUserAction(params))
  }

  const setPhoneAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      phone: param,
    }
    dispatch(setRegisterUserAction(params))
  }

  const setTelePhoneAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      telePhone: param,
    }
    dispatch(setRegisterUserAction(params))
  }

  const setNewsLetterAction = async (param: string, item: registerUserProps) => {
    const params = {
      ...item,
      isNewsLetter: param,
    }
    dispatch(setRegisterUserAction(params))
  }

  const validateAction = async (item: registerUserProps) => {
    let res = false
    let params = { ...item }
    if (item.password === '') {
      res = true
      params.passwordErr = '비밀번호는 필수항목입니다.'
    } else if (item.passwordConfirm === '') {
      res = true
      params.passwordConfirmErr = '비밀번호 확인은 필수항목입니다.'
    } else if (!PASSWORD_PATTERN.test(item.password)) {
      res = true
      params.passwordErr = PASSWORD_PATTER_DESCRIPTION
    } else if (item.passwordConfirm !== item.password) {
      res = true
      params.passwordConfirmErr = '비밀번호이 일치하지 않습니다.'
    } else if (params.name === '') {
      res = true
      params.nameErr = '이름은 필수항목입니다.'
    }

    dispatch(setRegisterUserAction(params))
    return !res
  }

  const firstRegisterAction = async (item: registerUserProps) => {
    const params = {
      id: Number(item.keyValue),
      request: {
        name: item.name,
        nickname: item.nickName,
        passwd: item.password,
        mobile: item.telePhone,
        phone: item.phone,
        receiveLetter: item.isNewsLetter === 'yes',
      },
    }
    const { status, data, message } = await apiFirstRegisterUser.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await router.replace('/member/login')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const adminRegisterAction = async (item: registerUserProps) => {
    const params = {
      id: Number(item.keyValue),
      request: {
        name: item.name,
        nickname: item.nickName,
        passwd: item.password,
        mobile: item.telePhone,
        phone: item.phone,
        receiveLetter: item.isNewsLetter === 'yes',
      },
    }
    const { status, data, message } = await apiAdminRegisterUser.mutateAsync(params)
    if (status === 'S') {
      const action = {
        ...item,
        isDone: true,
      }
      dispatch(setRegisterUserAction(action))
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const registerUserAction = async (item: registerUserProps) => {
    const check = await validateAction(item)
    if (check) item.type === 'FIRST_REGISTER_USER' ? await firstRegisterAction(item) : await adminRegisterAction(item)
  }

  const initDataAction = () => {
    if (registerUser.keyValue === '') {
      openToast('잘못된 접근입니다', 'error')
      router.replace('/member/login')
    }
  }

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      let timeValues = registerUser.timeZone
      const res = data as CommonCode[]
      const list = res.map(e => {
        if (e.code === 'Asia/Seoul') timeValues = { id: e.code, name: e.name }
        return { id: e.code, name: e.name }
      })
      const params = {
        values: {
          ...registerUser,
          timeZone: timeValues,
        },
        list,
      }
      dispatch(setTimeZoneListAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/member/login')
    }
  }, [getCommonCode])

  return {
    passwordConfirmRef,
    passwordRef,
    isRegisterUserLoading,
    registerUser,
    timeZoneList,
    getCommonCodeLoading,

    initDataAction,
    setNickNameAction,
    setNameAction,
    setNewsLetterAction,
    setTelePhoneAction,
    setPhoneAction,
    setTimeZoneAction,
    setPasswordConfirmAction,
    setPasswordAction,
    registerUserAction,
  }
}
