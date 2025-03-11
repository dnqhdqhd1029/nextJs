import { useState } from 'react'
import Cookie from 'js-cookie'
import moment from 'moment'
import { NextRouter, useRouter } from 'next/router'

import {
  ACCESS_TOKEN_NAME,
  COMMON_PRELOAD_DATA,
  DEMO_DOMAINS,
  DEMO_LICENSE,
  IS_STAY_LOGGIN,
  SHARED_LINK_URL,
} from '~/constants/common'
import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
import {
  frequentlyUsedCommonCodeAction,
  FrequentlyUsedCommonCodeProps,
  globalNotiAction,
  NotiProps,
  setLicenseInfoAction,
  setLogInAction,
  shareCodeProps,
  sharedLinkUrlAction,
  UserInfoAuth,
} from '~/stores/modules/contents/auth/auth'
import { GroupDtoForUser, LicenseDto, SettingsDto } from '~/types/api/service'
import { LayoutKeys } from '~/types/common'
import { apiGetAuth } from '~/utils/api/auth/useGetAuth'
import {
  apiGetCommonCode,
  apiGetCommonCodePreload,
  type CommonCode,
  UseGetCommonCodeParams,
} from '~/utils/api/common/useGetCommonCode'
import { apiGetLicenseInfo } from '~/utils/api/license/useGetLicenseInfo'
import { apiGetNotificationList } from '~/utils/api/notification/useNotification'
import { apiGetSettings } from '~/utils/api/setting/common/useGetSettings'
import { apiGetSharePolicy } from '~/utils/api/setting/policy/useGetSharePolicy'
import { apiGetAdminMenuAccess } from '~/utils/api/user/useGetAdminMenuAccess'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  layout?: LayoutKeys | undefined
  noLoginHeader?: boolean
}

interface NavigationResponse {
  code: 'pass' | 'signOut' | 'replace' | 'push'
  isReplace: boolean
  url: string
}

const DEFAULT_RESPONSE: NavigationResponse = {
  code: 'pass',
  isReplace: false,
  url: '',
}

export const useLayout = (props: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessTokenCookie = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const stayLoggedIn = Cookie.get(IS_STAY_LOGGIN) ?? ''
  const {
    loggedIn,
    globalNoti,
    userInfo,
    licenseInfo,
    userSelectGroup,
    landingPage,
    siteVersion,
    needLicenseCheck,
    frequentlyUsedCommonCode,
    userCountLimit,
  } = useAppSelector(state => state.authSlice)
  const { isLogin } = useAppSelector(state => state.loginSlice)
  const [checkLoading, setCheckLoading] = useState(false)

  const logger = process.env.NODE_ENV === 'development' ? console.log : () => {}

  const handleLicenseExpired = (router: NextRouter): NavigationResponse => {
    if (router.pathname === '/setting/member/my-purchase' || router.pathname === '/payment/purchase-request') {
      return { ...DEFAULT_RESPONSE }
    }

    return {
      code: 'replace',
      isReplace: true,
      url: '/setting/member/information',
    }
  }

  const licenseCheck = async (reLicenseInfo: LicenseDto) => {
    let resCode = 'F'
    let res = { ...DEFAULT_RESPONSE }
    const demoLicenseCheck = DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number])
    if (router.pathname === '/') {
      if (landingPage && landingPage.length > 0) {
        const navigationItem = LANDINGPAGE_LINKS.find(link => link.code === landingPage[0]?.code || '')
        res = {
          code: 'replace',
          isReplace: true,
          url: navigationItem ? navigationItem.link : '/dashboard',
        }
      } else {
        res = {
          code: 'replace',
          isReplace: true,
          url: '/dashboard',
        }
      }
    } else if (!reLicenseInfo.flagMonitoring && router.pathname === '/news/monitoring') {
      logger(
        "!reLicenseInfo.flagMonitoring && router.pathname === '/news/monitoring' ==================================>>>>>>>>>>>>>>>>>>"
      )
      res = {
        code: 'replace',
        isReplace: true,
        url: '/news/search',
      }
    } else if (router.pathname.startsWith('/admin') && router.pathname !== '/admin/certification') {
      logger(`userInfo.role ${userInfo.role}`)
      if (userInfo.role !== 'ADMIN') {
        logger("userInfo.role !== 'ADMIN' ==================================>>>>>>>>>>>>>>>>>>")
        openToast('접근 권한이 없습니다.', 'error')
        res = {
          code: 'push',
          isReplace: false,
          url: '/setting/member/information',
        }
      } else {
        if (demoLicenseCheck) {
          resCode = 'S'
        } else {
          resCode = await getAdminEnable()
        }
        if (resCode === 'S') {
          if (router.pathname === '/admin/group' && !reLicenseInfo.flagGroup) {
            logger(
              "router.pathname === '/admin/group' && !reLicenseInfo.flagGroup ==================================>>>>>>>>>>>>>>>>>>"
            )
            openToast('접근 권한이 없습니다.', 'error')
            res = {
              code: 'replace',
              isReplace: true,
              url: '/setting/member/information',
            }
          } else if (router.pathname === '/admin/user' && reLicenseInfo.userLimit && reLicenseInfo.userLimit < 2) {
            logger(
              "router.pathname === '/admin/user' && reLicenseInfo.userLimit && reLicenseInfo.userLimit < 2 ==================================>>>>>>>>>>>>>>>>>>"
            )
            openToast('접근 권한이 없습니다.', 'error')
            res = {
              code: 'replace',
              isReplace: true,
              url: '/setting/member/information',
            }
          } else if (demoLicenseCheck && router.pathname === '/admin/user-add') {
            logger(
              "router.pathname === '/admin/user-add' && reLicenseInfo.userLimit && reLicenseInfo.userLimit < 2 ==================================>>>>>>>>>>>>>>>>>>"
            )
            openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
            res = {
              code: 'replace',
              isReplace: true,
              url: '/admin/user',
            }
          } else if (router.pathname === '/admin/user-add' && reLicenseInfo.userLimit && reLicenseInfo.userLimit < 2) {
            logger(
              "router.pathname === '/admin/user-add' && reLicenseInfo.userLimit && reLicenseInfo.userLimit < 2 ==================================>>>>>>>>>>>>>>>>>>"
            )
            openToast('접근 권한이 없습니다.', 'error')
            res = {
              code: 'replace',
              isReplace: true,
              url: '/setting/member/information',
            }
          }
        } else {
          logger('접근 권한이 없습니다. ==================================>>>>>>>>>>>>>>>>>>')
          dispatch(sharedLinkUrlAction(router.asPath))
          res = {
            code: 'push',
            isReplace: false,
            url: '/admin/certification',
          }
        }
      }
    } else if (demoLicenseCheck && router.pathname.startsWith('/payment')) {
      openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
      res = {
        code: 'push',
        isReplace: false,
        url: '/dashboard',
      }
    } else {
      res = {
        code: 'pass',
        isReplace: false,
        url: '',
      }
    }
    dispatch(setLicenseInfoAction({ info: reLicenseInfo, date: moment().format('YYYY-MM-DD HH:mm:ss') }))

    return res
  }

  const checkUrl = async (): Promise<NavigationResponse> => {
    let res = { ...DEFAULT_RESPONSE }
    window.scrollTo(0, 0)

    logger('CheckUrl:', { router, loggedIn, accessTokenCookie })
    if (loggedIn) {
      const badge = document.getElementsByClassName('grecaptcha-badge')[0]
      if (badge && badge instanceof HTMLElement) badge.style.visibility = 'hidden'
      logger('로그인상태 ==================================>>>>>>>>>>>>>>>>>>', isLogin)
      logger('자동로그인 ==================================>>>>>>>>>>>>>>>>>>', stayLoggedIn)
      logger('layout ==============', props.layout)
      if (router.pathname === '/payment/inicis-close') {
        logger("router.pathname === '/payment/inicis-close' ==================================>>>>>>>>>>>>>>>>>>")
        res = {
          code: 'pass',
          isReplace: false,
          url: '',
        }
      } else if (router.pathname === '/payment/inicis-result') {
        logger("router.pathname === '/payment/inicis-result' ==================================>>>>>>>>>>>>>>>>>>")
        res = {
          code: 'pass',
          isReplace: false,
          url: '',
        }
      } else if (accessTokenCookie === '' && stayLoggedIn === 'true') {
        logger(
          "accessTokenCookie === '' && stayLoggedIn === 'true' ==================================>>>>>>>>>>>>>>>>>>"
        )
        res = {
          code: 'signOut',
          isReplace: false,
          url: '',
        }
      } else if (accessTokenCookie === '') {
        logger("accessTokenCookie === '' ==================================>>>>>>>>>>>>>>>>>>")
        res = {
          code: 'signOut',
          isReplace: false,
          url: '',
        }
      } else {
        if (!isLogin) {
          logger('필요한 회원정보 api ==================================>>>>>>>>>>>>>>>>>>')
          res = await setAuthLayout()
        } else if (licenseInfo.isExpired) {
          if (DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number])) {
            res = {
              code: 'replace',
              isReplace: true,
              url: '/user/auto-signout',
            }
          } else {
            logger('licenseInfo.isExpired ==================================>>>>>>>>>>>>>>>>>>')
            res = handleLicenseExpired(router)
          }
        } else if (userCountLimit.active && router.pathname !== '/admin/user') {
          logger('userCountLimit 사용자 제한 ==================================>>>>>>>>>>>>>>>>>>')
          res = {
            code: 'replace',
            isReplace: true,
            url: '/admin/user',
          }
        } else {
          logger('getLicense api ==================================>>>>>>>>>>>>>>>>>>')
          const reLicenseInfo = await getLicense()
          if (reLicenseInfo !== null) {
            logger('COMMON_CODE_VERSION api ==================================>>>>>>>>>>>>>>>>>>')
            const commonCodeVersion = await getCommonCode({ parentCode: 'COMMON_CODE_VERSION' })
            if (
              commonCodeVersion &&
              commonCodeVersion.length > 0 &&
              Number(commonCodeVersion[0].name) > frequentlyUsedCommonCode.version
            ) {
              logger('checkCommonCodePreload api ==================================>>>>>>>>>>>>>>>>>>')
              const commonCodePreload = await checkCommonCodePreload(userSelectGroup)
              dispatch(
                frequentlyUsedCommonCodeAction({ version: Number(commonCodeVersion[0].name), data: commonCodePreload })
              )
            }
            res = await licenseCheck(reLicenseInfo)
          } else {
            res = {
              code: 'signOut',
              isReplace: false,
              url: '',
            }
          }
        }
      }
    } else {
      if (router && router.asPath && router.asPath !== '') {
        logger(
          'dispatch(sharedLinkUrlAction(router.asPath)) ==================================>>>>>>>>>>>>>>>>>> ',
          router.asPath
        )
        Cookie.set(SHARED_LINK_URL, router.asPath)
        dispatch(sharedLinkUrlAction(router.asPath))
      }
      // TEMP: 비로그인 리다이렉트 주석 처리
      // res = {
      //   code: 'signOut',
      //   isReplace: false,
      //   url: '',
      // }
    }

    logger('checkUrl done ==================================>>>>>>>>>>>>>>>>>>')
    return res
  }

  const getAdminSetting = async () => {
    let res: SettingsDto[] = []
    try {
      const { status, data, message } = await apiGetSettings()
      if (status === 'S') {
        res = data as SettingsDto[]
      }
    } catch (e) {
      console.error('>> notificationList error', e)
    }
    return res
  }

  const getLicense = async () => {
    let res = null
    try {
      const { status, data, message } = await apiGetLicenseInfo()
      if (status === 'S') {
        res = data as LicenseDto
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
      }
    } catch (e) {
      console.error('>> checkSiteVersion error', e)
    }
    return res
  }

  const getAdminEnable = async () => {
    let res: string = 'F'
    try {
      const { status, data, message } = await apiGetAdminMenuAccess()
      if (status === 'S') {
        res = status
      }
    } catch (e) {
      console.error('>> getAdminEnable error', e)
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
      }
    } catch (e) {
      console.error('>> notificationList error', e)
    }
    return res
  }

  const getAuth = async () => {
    try {
      const { status, data, message } = await apiGetAuth()
      if (status !== 'S') {
        return null
      }

      const auth = data as UserInfoAuth
      const { status: userStatus, data: userData, message: userMsg } = await apiGetOneUser(Number(auth.userId))

      if (userStatus !== 'S') {
        return null
      }

      return {
        ...(userData as UserInfoAuth),
        ...(data as UserInfoAuth),
      }
    } catch (e) {
      console.error('Auth check failed:', e)
      return null
    }
  }

  const setAuthLayout = async () => {
    let tempTimeZone = null
    let currentGroup: GroupDtoForUser = {
      groupId: 0,
      name: '',
      isDefault: false,
    }
    let adminValue: SettingsDto[] = []
    let notification: NotiProps[] = []
    let commonUsedCodeData: FrequentlyUsedCommonCodeProps = {
      version: 0,
      data: [],
    }
    let res = { ...DEFAULT_RESPONSE }
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
        if (versionCodes && versionCodes.length > 0 && siteVersion !== versionCodes[0].name) {
          notification = [
            ...notification,
            {
              key: 'CONTENTS_UPDATE',
              type: 'CONTENTS_UPDATE',
              style: '',
              hasClose: true,
              isChecked: false,
            },
          ]
        }
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
        const getCheck = globalNoti.find(e => e.type === 'LICENSE_ALMOST_EXPIRED' && e.isChecked)
        if (!getCheck && moment().isAfter(moment(licenseInfo.expireAt).add(-1, 'months'))) {
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
        if (authInfo.timezone) {
          const commonData = await getCommonCode({ parentCode: 'TIMEZONE' })
          if (commonData.length > 0) {
            const find = commonData.find(e => e.code === authInfo?.timezone)
            tempTimeZone = find ? find : null
          }
        }
        const demoLicenseCheck = DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number])
        dispatch(
          setLogInAction({
            loggedIn: true,
            stayLoggedIn: stayLoggedIn === 'true',
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
            currentGroup,
            timeZoneData: tempTimeZone,
            commonCodePreload: commonUsedCodeData,
            adminSetting: adminValue,
            globalNoti: notification,
            isDemoLicense: demoLicenseCheck,
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
          if (demoLicenseCheck) {
            res = {
              code: 'replace',
              isReplace: true,
              url: '/user/auto-signout',
            }
          } else {
            console.log('라이센스 만료 =============================')
            openToast('라이센스가 만료되었습니다', 'error')
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
            res = {
              code: 'replace',
              isReplace: true,
              url: '/setting/member/information',
            }
          }
        } else {
          res = await licenseCheck(licenseInfo)
        }
      } else {
        res = {
          code: 'signOut',
          isReplace: false,
          url: '',
        }
      }
    } catch (e) {
      res = {
        code: 'signOut',
        isReplace: false,
        url: '',
      }
    }

    return res
  }

  return {
    stayLoggedIn,
    userInfo,
    licenseInfo,
    userSelectGroup,
    landingPage,
    siteVersion,
    needLicenseCheck,
    accessTokenCookie,
    checkLoading,

    checkUrl,
  }
}
