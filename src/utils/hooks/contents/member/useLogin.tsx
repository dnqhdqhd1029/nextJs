import { useCallback } from 'react'
import Cookie from 'js-cookie'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  ACCESS_TOKEN_NAME,
  COMMON_PRELOAD_DATA,
  DEMO_DOMAINS,
  DEMO_LICENSE,
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  PASSWORD_PATTER_DESCRIPTION,
  PASSWORD_PATTERN,
  SHARED_LINK_URL,
} from '~/constants/common'
import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
import {
  frequentlyUsedCommonCodeAction,
  FrequentlyUsedCommonCodeProps,
  globalNotiAction,
  NotiProps,
  setBlockedEmailAction,
  setLandingPageAction,
  setLogInAction,
  shareCodeProps,
  sharedLinkUrlAction,
  UserInfoAuth,
} from '~/stores/modules/contents/auth/auth'
import {
  demoErrAction,
  emailAction,
  errAction,
  passwordAction,
  passwordCheckAction,
  stayLoggedInAction,
} from '~/stores/modules/contents/login/login'
import { GroupDtoForUser, LicenseDto, LoginDto, SettingsDto } from '~/types/api/service'
import type { LoginResult } from '~/types/common'
import { apiGetAuth } from '~/utils/api/auth/useGetAuth'
import { useSignIn } from '~/utils/api/auth/useSignIn'
import {
  apiGetCommonCode,
  apiGetCommonCodePreload,
  CommonCode,
  UseGetCommonCodeParams,
} from '~/utils/api/common/useGetCommonCode'
import { apiGetLicenseInfo } from '~/utils/api/license/useGetLicenseInfo'
import { apiGetNotificationList } from '~/utils/api/notification/useNotification'
import { useUserPasswordCheck } from '~/utils/api/password/usePassword'
import { apiGetSettings } from '~/utils/api/setting/common/useGetSettings'
import { apiGetSharePolicy } from '~/utils/api/setting/policy/useGetSharePolicy'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { setAccessTokenToCookie } from '~/utils/common/token'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    initDemo,
    timeOut,
    userId,
    stayLoggedIn,
    passwordCheckErr,
    passwordCheck,
    passwordErr,
    password,
    email,
    emailErr,
  } = useAppSelector(state => state.loginSlice)
  const sharedLinkUrl = Cookie.get(SHARED_LINK_URL) ?? ''

  const signIn = useSignIn()
  const apiUserPasswordCheck = useUserPasswordCheck()

  const setEmailAction = useCallback(
    (e: string) => {
      dispatch(emailAction(e))
    },
    [email, emailErr]
  )

  const setPasswordAction = useCallback(
    (e: string) => {
      dispatch(passwordAction(e))
    },
    [password, passwordErr]
  )

  const setPasswordCheckAction = useCallback(
    (e: string) => {
      dispatch(passwordCheckAction(e))
    },
    [password, passwordErr]
  )

  const setStayLoggedInAction = useCallback(
    (e: boolean) => {
      e ? window.localStorage.setItem('stayLoggedIn', 'true') : window.localStorage.removeItem('stayLoggedIn')
      dispatch(stayLoggedInAction(e))
    },
    [stayLoggedIn]
  )

  const getLicense = async () => {
    let res = null
    try {
      const { status, data, message } = await apiGetLicenseInfo()
      if (status === 'S') {
        res = data as LicenseDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> checkLicense error', e)
    }
    return res
  }

  const getAuth = async () => {
    let res = null
    try {
      const { status, data, message } = await apiGetAuth()
      if (status === 'S') {
        const auth = data as UserInfoAuth
        const { status: userStatus, data: userData, message: userMsg } = await apiGetOneUser(Number(auth.userId))
        if (userStatus === 'S') {
          res = {
            ...(userData as UserInfoAuth),
            ...(data as UserInfoAuth),
          }
        } else {
          openToast(userMsg?.message, 'error')
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> checkLicense error', e)
    }
    return res
  }

  const getCommonCode = async (props: UseGetCommonCodeParams) => {
    let res: CommonCode[] = []
    try {
      const { status, data, message } = await apiGetCommonCode(props)
      if (status === 'S') {
        res = data as CommonCode[]
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> checkLicense error', e)
    }
    return res
  }

  const checkCommonCodePreload = async (groupId: number) => {
    let res: CommonCode[] = []
    try {
      const { status, data, message } = await apiGetCommonCodePreload(COMMON_PRELOAD_DATA, groupId)
      if (status === 'S') {
        res = data as CommonCode[]
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> checkSiteVersion error', e)
    }
    return res
  }

  const notificationList = async () => {
    let res: NotiProps[] = []
    try {
      const { status, data, message } = await apiGetNotificationList()
      if (status === 'S') {
        const list = data as { threadId: number; content: string; title: string }[]
        for (const i of list) {
          res = [
            ...res,
            {
              type: 'NOTIFICATION',
              style: 'info',
              hasClose: true,
              isChecked: false,
              content: i.content,
              title: i.title,
              key: i.threadId.toString(),
            },
          ]
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> notificationList error', e)
    }
    return res
  }

  const nextStepValidate = async (paramEmail: string, paramPassword: string) => {
    let emailErr = ''
    let passwordErr = ''
    if (paramEmail === '') emailErr = '이메일을 입력하세요.'
    if (paramPassword === '') passwordErr = '비밀번호를 입력하세요.'
    if (!EMAIL_PATTERN.test(paramEmail)) emailErr = EMAIL_PATTERN_DESCRIPTION
    if (!PASSWORD_PATTERN.test(paramPassword)) passwordErr = PASSWORD_PATTER_DESCRIPTION
    if (passwordErr === '' && emailErr === '') {
      return true
    } else {
      dispatch(errAction({ emailErr, passwordErr }))
      return false
    }
  }

  const demoNextStepValidate = async (paramEmail: string, paramPassword: string, paramPasswordCheck: string) => {
    let emailErr = ''
    let passwordErr = ''
    let passwordCheckErr = ''
    if (paramEmail === '') emailErr = '이메일을 입력하세요.'
    if (paramPassword === '') passwordErr = '비밀번호를 입력하세요.'
    if (paramPasswordCheck === '') passwordCheckErr = '비밀번호를 입력하세요.'
    if (!EMAIL_PATTERN.test(paramEmail)) emailErr = EMAIL_PATTERN_DESCRIPTION
    if (!PASSWORD_PATTERN.test(paramPassword)) passwordErr = PASSWORD_PATTER_DESCRIPTION
    if (passwordErr === '' && emailErr === '' && passwordCheckErr === '') {
      return true
    } else {
      dispatch(demoErrAction({ emailErr, passwordErr, passwordCheckErr }))
      return false
    }
  }

  const getAdminSetting = async () => {
    let res: SettingsDto[] = []
    try {
      const { status, data, message } = await apiGetSettings()
      if (status === 'S') {
        res = data as SettingsDto[]
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> notificationList error', e)
    }
    return res
  }

  const getShareCodeList = async (id: number) => {
    let res: shareCodeProps = {
      list: 'READABLE',
      jrnlstMediaSrch: 'READABLE',
      clipbook: 'READABLE',
      news_search: 'READABLE',
      project: 'READABLE',
      action: 'READABLE',
      distribute: 'READABLE',
    }
    try {
      const { status, data, message } = await apiGetSharePolicy(id)
      if (status === 'S') {
        res = data as shareCodeProps
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> notificationList error', e)
    }
    return res
  }

  const setAuthLayout = async (res: LoginResult, stayLogin: boolean) => {
    let tempTimeZone = null
    let currentGroup: GroupDtoForUser = {
      groupId: 0,
      name: '',
      isDefault: false,
    }
    let notification: NotiProps[] = []
    let commonUsedCodeData: FrequentlyUsedCommonCodeProps = {
      version: 0,
      data: [],
    }
    let adminValue: SettingsDto[] = []
    try {
      const licenseInfo = await getLicense()
      const authInfo = await getAuth()
      if (
        licenseInfo !== null &&
        authInfo !== null &&
        authInfo.userId &&
        authInfo.groups &&
        authInfo.groups.length > 0
      ) {
        currentGroup = authInfo?.groups[0]
        const notiList = await notificationList()
        if (notiList && notiList.length > 0) {
          notification = notiList
        }
        const adminSettingValue = await getAdminSetting()
        if (adminSettingValue && adminSettingValue.length > 0) {
          adminValue = adminSettingValue
        }
        const shareCode = await getShareCodeList(authInfo.userId)
        if (authInfo.selectedGroupId && authInfo.selectedGroupId > 0) {
          const tempCurrent = authInfo?.groups?.find(e => e.groupId === authInfo.selectedGroupId)
          if (tempCurrent) {
            currentGroup = tempCurrent
          }
        }
        const versionCodes = await getCommonCode({
          parentCode: 'FRONT_APP_VERSION',
          groupId:
            authInfo.selectedGroupId && authInfo.selectedGroupId > 0
              ? authInfo.selectedGroupId
              : Number(currentGroup.groupId),
        })
        const checkCommonCodeVersion = await getCommonCode({ parentCode: 'COMMON_CODE_VERSION' })
        const commonCodePreload = await checkCommonCodePreload(
          authInfo.selectedGroupId && authInfo.selectedGroupId > 0
            ? authInfo.selectedGroupId
            : Number(currentGroup.groupId)
        )
        if (
          checkCommonCodeVersion &&
          commonCodePreload.length > 0 &&
          checkCommonCodeVersion[0].name &&
          commonCodePreload &&
          commonCodePreload.length > 0
        ) {
          commonUsedCodeData = {
            version: Number(checkCommonCodeVersion[0].name),
            data: commonCodePreload,
          }
        }
        if (authInfo.timezone) {
          const commonData = await getCommonCode({ parentCode: 'TIMEZONE' })
          if (commonData.length > 0) {
            const find = commonData.find(e => e.code === authInfo?.timezone)
            tempTimeZone = find ? find : null
          }
        }
        if (moment().isAfter(moment(licenseInfo.expireAt).add(-1, 'months'))) {
          notification = [
            ...notification,
            {
              key: 'LICENSE_ALMOST_EXPIRED',
              type: 'LICENSE_ALMOST_EXPIRED',
              style: 'warning',
              hasClose: true,
              isChecked: false,
            },
          ]
        }
        dispatch(
          setLogInAction({
            loggedIn: true,
            stayLoggedIn: stayLogin,
            licenseInfo: licenseInfo,
            userInfo: authInfo,
            shareCode: shareCode,
            timeZone: authInfo?.timezone || 'Asia/Seoul',
            userSelectGroup:
              authInfo.selectedGroupId && authInfo.selectedGroupId > 0
                ? authInfo.selectedGroupId
                : Number(currentGroup.groupId),
            updateAt: moment().format('YYYY-MM-DD'),
            needLicenseCheck: false,
            siteVersion: versionCodes && versionCodes.length > 0 ? versionCodes[0].name : '1.0.1',
            globalNoti: notification,
            timeZoneData: tempTimeZone,
            currentGroup,
            commonCodePreload: commonUsedCodeData,
            adminSetting: adminValue,
            isDemoLicense: DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number]),
            userCountLimit:
              !licenseInfo.isExpired &&
              licenseInfo.userCount &&
              licenseInfo.userLimit &&
              licenseInfo.userCount > licenseInfo.userLimit
                ? {
                    isOpen: true,
                    active: true,
                  }
                : {
                    isOpen: false,
                    active: false,
                  },
          })
        )
        if (licenseInfo.isExpired) {
          openToast('라이센스가 만료되었습니다', 'warning')
          dispatch(
            globalNotiAction([
              {
                key: 'LICENSE_EXPIRED',
                type: 'LICENSE_EXPIRED',
                style: 'error',
                hasClose: false,
                isChecked: false,
              },
            ])
          )
          await router.replace('/setting/member/information')
        } else {
          console.log('router', router)
          if (sharedLinkUrl && sharedLinkUrl !== '') {
            const link = sharedLinkUrl
            dispatch(sharedLinkUrlAction(''))
            Cookie.remove(SHARED_LINK_URL)
            console.log('sharedLinkUrl', sharedLinkUrl)
            await router.push(link)
          } else if (res.landingPage !== null) {
            const userLandingPage = await getCommonCode({
              parentCode: 'USER_LANDING_PAGE',
            })
            const landingPage = userLandingPage.find(i => i.code === res.landingPage)
            const navigationItem = LANDINGPAGE_LINKS.find(link => link.code === landingPage?.code || '')
            if (navigationItem && landingPage) {
              dispatch(setLandingPageAction([landingPage]))
              await router.replace(navigationItem.link)
            } else {
              await router.replace('/dashboard')
            }
          } else {
            await router.replace('/dashboard')
          }
        }
      } else {
        openToast('유효하지 않은 로그인 정보입니다.', 'error', undefined, uuid())
      }
    } catch (e) {}
  }

  const setUserPasswordCheck = async (
    tempUserId: number,
    paramEmail: string,
    paramPassword: string,
    paramStayLoggedIn: boolean
  ) => {
    const param = {
      id: Number(tempUserId),
      passwordInfo: {
        email: paramEmail,
        newPassword: paramPassword,
        newPasswordConfirm: paramPassword,
      },
      locale: 'ko',
    }
    const { status, message } = await apiUserPasswordCheck.mutateAsync(param)
    if (status === 'S') {
      await setLogin(paramEmail, paramPassword, paramStayLoggedIn)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setLogin = async (paramEmail: string, paramPassword: string, paramStayLoggedIn: boolean) => {
    const param: LoginDto = {
      email: paramEmail,
      passwd: paramPassword,
    }
    const { status, message, data, code } = await signIn.mutateAsync(param)
    if (status === 'S') {
      const res = data as LoginResult
      if (res.accessToken && res.accessToken !== '') {
        await setAccessTokenToCookie(res.accessToken, paramStayLoggedIn ? 'true' : 'false')
        await setAuthLayout(res, paramStayLoggedIn)
      } else {
        openToast('잘못된 접근입니다.', 'error', undefined, uuid())
      }
    } else {
      if (message?.code === 'PASSWORD_EXPIRED') {
        // const param = {
        //   userId: res.id.toString(),
        //   type: '',
        //   email: res.email,
        //   password: '',
        //   passwordConfirm: '',
        //   passwordErr: '',
        //   passwordConfirmErr: '',
        // }
        // dispatch(resetPasswordAction(param))
        await router.replace('/reset-password')
      } else if (code === '00004') {
        if (message?.code === 'LOGIN_FAIL_LOCKED') {
          dispatch(setBlockedEmailAction(paramEmail))
          await router.push('/member/login-blocked')
        } else if (message?.message) {
          const msg = message?.message.split('\n')
          if (msg?.length > 1) {
            openToast(`${msg[0]}회`, 'error', undefined, uuid())
            openToast(`5회 실패시 계정이 잠깁니다.`, 'error', undefined, uuid())
          } else {
            openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
          }
        } else {
          openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
        }
      } else {
        openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
      }
    }
  }

  return {
    stayLoggedIn,
    passwordErr,
    password,
    email,
    emailErr,
    passwordCheckErr,
    passwordCheck,
    userId,
    timeOut,
    initDemo,

    nextStepValidate,
    setLogin,
    demoNextStepValidate,
    setUserPasswordCheck,

    setPasswordAction,
    setEmailAction,
    setStayLoggedInAction,
    setPasswordCheckAction,
  }
}
