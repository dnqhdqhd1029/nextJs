import { useCallback, useEffect } from 'react'

import { PASSWORD_PATTER_DESCRIPTION, PASSWORD_PATTERN, TELEPHONE_NUMBER_PATTERN } from '~/constants/common'
import {
  setLandingPageAction,
  setUserInfoBySettingPage,
  setUserInfoPasswordBySettingPage,
} from '~/stores/modules/contents/auth/auth'
import {
  resetPasswordPopupTypesProps,
  setLoadingAction,
  setResetPasswordPopupAction,
  setUpdateUserProfilePopupTypesAction,
  setUserLandingListAction,
  updateUserProfilePopupTypesProps,
} from '~/stores/modules/contents/setting/setting'
import { BaseResponseCommonObject, CheckPasswordDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { usePostUserPasswordCheck } from '~/utils/api/user/usePostUserPasswordCheck'
import { usePutUser, UsePutUserParams } from '~/utils/api/user/usePutUser'
import { usePutUserPasswordChange } from '~/utils/api/user/usePutUserPasswordChange'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useUserProfile = () => {
  const dispatch = useAppDispatch()

  const { licenseInfo, frequentlyUsedCommonCode, userInfo, landingPage } = useAppSelector(state => state.authSlice)
  const { resetPasswordPopupTypes, updateUserProfilePopupTypes, isLoading, landingDataList } = useAppSelector(
    state => state.userSettingSlice
  )

  const changeUserPassword = usePutUserPasswordChange()
  const checkUserPassword = usePostUserPasswordCheck()
  const updateUserInfo = usePutUser()

  const updateUserProfilePopupAction = useCallback(
    async (isOpen: boolean, type: string) => {
      let temp: SelectListOptionItem[] = []
      let preloadCommonCode: CommonCode[] = []
      if (isOpen) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'USER_LANDING_PAGE')
        //@ts-ignore
        if (find && find.commonCodeList && find.commonCodeList.length > 0) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode('USER_LANDING_PAGE')
        }
        for await (const listElement of preloadCommonCode) {
          if (listElement.code !== 'MONITORING' && licenseInfo.flagMonitoring) {
            temp = [...temp, { id: listElement.code, name: listElement.name }]
          }
        }
        dispatch(setUserLandingListAction({ list: temp, data: temp[0] }))
      }
      dispatch(
        setUpdateUserProfilePopupTypesAction({
          isOpen,
          type: type,
          title: type === 'passwordCheck' ? '비밀번호 확인' : '회원정보 수정',
          confirmTitle: type === 'passwordCheck' ? '확인' : '저장',
          password: '',
          passwordErr: '',
          name: userInfo?.name || '',
          nameErr: '',
          nickName: userInfo?.nickname || '',
          landingData: { id: '', name: '' },
          phone: userInfo?.phone || '',
          telePhone: userInfo?.mobile || '',
          telePhoneErr: '',
          isNewsLetter: userInfo.receiveLetter ? 'yes' : 'no',
          //@ts-ignore
          department: userInfo?.department || '',
          //@ts-ignore
          position: userInfo?.position || '',
        })
      )
    },
    [updateUserProfilePopupTypes]
  )

  const resetPasswordPopupAction = useCallback(
    (isOpen: boolean) => {
      const params = {
        isOpen,
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        currentPasswordErr: '',
        passwordErr: '',
        passwordConfirmErr: '',
      }
      dispatch(setResetPasswordPopupAction(params))
    },
    [dispatch]
  )

  const getCommonCode = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
  }

  const updateUserProfile = async (item: updateUserProfilePopupTypesProps) => {
    dispatch(setLoadingAction(true))
    let preloadCommonCode: CommonCode[] = []
    const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'USER_LANDING_PAGE')
    //@ts-ignore
    if (find && find.commonCodeList && find.commonCodeList.length > 0) {
      //@ts-ignore
      preloadCommonCode = find.commonCodeList
    } else {
      preloadCommonCode = await getCommonCode('USER_LANDING_PAGE')
    }
    if (item.type === 'passwordCheck') {
      const check = await passwordValidateAction(item)
      if (check) {
        const params = {
          ...item,
          type: 'profile',
          title: '회원정보 수정',
          confirmTitle: '저장',

          landingData: { id: '', name: '' },
        }
        if (preloadCommonCode.length > 0) {
          if (landingPage && landingPage.length > 0) {
            let findLandingPage = preloadCommonCode.find(item => item.code === landingPage[0].code)
            if (findLandingPage) {
              params.landingData = {
                id: findLandingPage.code,
                name: findLandingPage.name,
              }
            } else {
              params.landingData = {
                id: preloadCommonCode[0].code,
                name: preloadCommonCode[0].name,
              }
            }
          }
        }
        dispatch(setUpdateUserProfilePopupTypesAction(params))
      }
    } else {
      const check = await updateProfileValidateAction(item)
      if (check) {
        const findLandingPage = preloadCommonCode.find(code => code.code === item.landingData.id)
        if (findLandingPage) {
          dispatch(setLandingPageAction([findLandingPage]))
        }
        const { status: userStatus, data: userData, message: userMsg } = await apiGetOneUser(Number(userInfo.userId))
        if (userStatus === 'S') {
          const authInfo = {
            userip: userInfo.userip,
            sub: userInfo.sub,
            iat: userInfo.iat,
            exp: userInfo.exp,
            ...userData,
          }
          dispatch(setUserInfoBySettingPage(authInfo))
        }
      }
    }
    dispatch(setLoadingAction(false))
  }

  const setCheckPassword = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }
  const setCurrentPassword = (param: string, item: resetPasswordPopupTypesProps) => {
    const params = {
      ...item,
      currentPassword: param,
      currentPasswordErr: '',
    }
    dispatch(setResetPasswordPopupAction(params))
  }
  const setPasswordConfirm = (param: string, item: resetPasswordPopupTypesProps) => {
    const params = {
      ...item,
      passwordConfirm: param,
      passwordConfirmErr: '',
    }
    dispatch(setResetPasswordPopupAction(params))
  }

  const setPassword = (param: string, item: resetPasswordPopupTypesProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(setResetPasswordPopupAction(params))
  }

  const setNickNameAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      nickName: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }

  const setNameAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      name: param,
      nameErr: '',
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }
  const setPhoneAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      phone: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }
  const setDepartmentAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      department: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }
  const setPositionAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      position: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }
  const setTelePhoneAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      telePhone: param,
      telePhoneErr: '',
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }

  const setNewsLetterAction = (param: string, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      isNewsLetter: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }

  const setLandingDataAction = (param: SelectListOptionItem, item: updateUserProfilePopupTypesProps) => {
    const params = {
      ...item,
      landingData: param,
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
  }

  const updateProfileValidateAction = async (item: updateUserProfilePopupTypesProps) => {
    let res = false
    let params = { ...item }
    if (item.name === '') {
      res = true
      params.nameErr = '이름을 입력해주세요.'
    }
    if (item.password === '') {
      res = true
      params.passwordErr = '비밀번호를 입력해주세요.'
    }
    if (item.telePhone !== '' && !TELEPHONE_NUMBER_PATTERN.test(item.telePhone)) {
      res = true
      params.telePhoneErr = '유효한 번호가 아닙니다.'
    }
    if (!res) {
      const putUserProps: UsePutUserParams = {
        id: userInfo?.userId as number,
        userInfo: {
          name: item.name,
          nickname: item.nickName,
          phone: item.phone,
          mobile: item.telePhone,
          landingPage: item.landingData.id,
          receiveLetter: item.isNewsLetter === 'yes',
          //@ts-ignore
          department: item.department,
          //@ts-ignore
          position: item.position,
        },
      }
      const { status, message } = await updateUserInfo.mutateAsync(putUserProps)
      if (status === 'S') {
        openToast(message?.message, 'success')
      } else {
        res = true
        openToast(message?.message || '회원정보 수정에 실패하였습니다.', 'error')
      }
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
    return !res
  }

  const passwordValidateAction = async (item: updateUserProfilePopupTypesProps) => {
    let res = false
    let params = { ...item }
    if (item.password === '') {
      res = true
      params.passwordErr = '비밀번호는 필수항목입니다.'
    } else {
      const { status, message } = await checkUserPassword.mutateAsync({ password: item.password })
      if (status !== 'S') {
        res = true
        params.passwordErr = '비밀번호가 일치하지 않습니다.'
      }
    }
    dispatch(setUpdateUserProfilePopupTypesAction(params))
    return !res
  }

  const validateAction = async (item: resetPasswordPopupTypesProps) => {
    let res = false
    let params = { ...item }

    if (item.currentPassword === '') {
      res = true
      params.currentPasswordErr = '비밀번호를 입력해 주세요.'
    } else if (item.password === '') {
      res = true
      params.passwordErr = '신규 비밀번호를 입력해 주세요.'
    } else if (!PASSWORD_PATTERN.test(item.password)) {
      res = true
      params.passwordErr = PASSWORD_PATTER_DESCRIPTION
    } else if (item.passwordConfirm === '') {
      res = true
      params.passwordConfirmErr = '신규 비밀번호 확인을 입력해 주세요.'
    } else if (item.passwordConfirm !== item.password) {
      res = true
      params.passwordErr = ''
      params.passwordConfirmErr = '새로운 비밀번호 확인이 일치하지 않습니다.'
    } else if (item.currentPassword === item.password) {
      res = true
      params.passwordErr = '직전에 사용한 비밀번호를 사용할 수 없습니다. 다시 입력해 주세요.'
    } else {
      if (userInfo.userId && userInfo.email) {
        const checkPasswdParam: CheckPasswordDto = {
          password: item.currentPassword,
        }
        const { status: pwCheckStatus, message: pwCheckMessage } = await checkUserPassword.mutateAsync(checkPasswdParam)
        if (pwCheckStatus !== 'S') {
          res = true
          params.currentPasswordErr = pwCheckMessage?.message || '비밀번호가 일치하지 않습니다.'
        }
      } else {
        res = true
      }
    }
    dispatch(setResetPasswordPopupAction(params))
    return !res
  }

  const resetPasswordFunction = async (item: resetPasswordPopupTypesProps) => {
    dispatch(setLoadingAction(true))
    const check = await validateAction(item)
    if (check) {
      const param = {
        id: Number(userInfo.userId),
        passwordInfo: {
          currentPassword: item.currentPassword,
          newPassword: item.password,
          newPasswordConfirm: item.passwordConfirm,
        },
      }
      const { status, message } = await changeUserPassword.mutateAsync(param)
      if (status === 'S') {
        openToast(message?.message, 'success')
        const { status: userStatus, data: userData, message: userMsg } = await apiGetOneUser(Number(userInfo.userId))
        if (userStatus === 'S') {
          const authInfo = {
            userip: userInfo.userip,
            sub: userInfo.sub,
            iat: userInfo.iat,
            exp: userInfo.exp,
            ...userData,
          }
          dispatch(setUserInfoPasswordBySettingPage(authInfo))
        }
      } else {
        openToast(message?.message || '비밀번호 변경에 실패하였습니다.', 'error')
        dispatch(setResetPasswordPopupAction(item))
      }
    }
    dispatch(setLoadingAction(false))
  }

  return {
    userInfo,
    resetPasswordPopupTypes,
    updateUserProfilePopupTypes,
    isLoading,
    landingDataList,

    resetPasswordPopupAction,
    updateUserProfilePopupAction,
    updateUserProfile,

    setCheckPassword,
    resetPasswordFunction,
    setCurrentPassword,
    setPasswordConfirm,
    setPassword,
    setNickNameAction,
    setNameAction,
    setNewsLetterAction,
    setTelePhoneAction,
    setPhoneAction,
    setLandingDataAction,
    setPositionAction,
    setDepartmentAction,
  }
}
