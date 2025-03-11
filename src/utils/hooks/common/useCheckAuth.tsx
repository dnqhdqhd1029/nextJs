// /**
//  * @file useCheckAuth.ts
//  * @desc 페이지 진입 시의 인증 기능 Custom Hook
//  */
//
// import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import Cookie from 'js-cookie'
// import moment from 'moment'
// import { useRouter } from 'next/router'
//
// import ContentsUpdateAlarm from '~/components/contents/common/notiNodes/ContentsUpdateAlarm'
// import LicenseAlmostExpiredAlarm from '~/components/contents/common/notiNodes/LicenseAlmostExpiredAlarm'
// import LicenseExpiredAlarm from '~/components/contents/common/notiNodes/LicenseExpiredAlarm'
// import {
//   ACCESS_TOKEN_NAME,
//   CONTENTS_NOTIFICATION_ID,
//   GLOBAL_NOTIFICATION_ID,
//   LICENSE_NUMBER,
//   SITE_INNER_VERSION,
// } from '~/constants/common'
// import { fetchAllUsers } from '~/stores/modules/common/allUser'
// import { fetchCommonCodes } from '~/stores/modules/common/commonCode'
// import { fetchAllGroups } from '~/stores/modules/common/group'
// import { fetchGetSharePolicy } from '~/stores/modules/common/sharePolicy'
// import {
//   fetchLicenseInfo,
//   fetchOneUser,
//   setSiteVersion,
//   setUserInfo,
//   setUserSelectGroup,
//   UserInfo,
// } from '~/stores/modules/common/user'
// import { resetPasswordAction } from '~/stores/modules/contents/password/userPassword'
// import { BaseResponseCommonObject, LicenseDto } from '~/types/api/service'
// import { RefreshTokenResult, TimeoutRef } from '~/types/common'
// import { useGetAuth } from '~/utils/api/auth/useGetAuth'
// import { usePostRefreshToken } from '~/utils/api/auth/usePostRefreshToken'
// import { apiGetCommonCode, type CommonCode } from '~/utils/api/common/useGetCommonCode'
// import { toggleCaptchaBadge } from '~/utils/common/recaptcha'
// import { openToast } from '~/utils/common/toast'
// import { setAccessTokenToCookie } from '~/utils/common/token'
// import { useNotification } from '~/utils/hooks/common/useNotification'
// import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
//
// export const useCheckAuth = () => {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const timerRef: TimeoutRef = useRef(null)
//   const { contentNotification, setContentNotification, globalNotification, setGlobalNotification } = useNotification()
//
//   const [isLoading, setIsLoading] = useState(true)
//   const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup)
//   const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
//   const storeUserInfo = useAppSelector(state => state.user.userInfo)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const {
//     data: authData,
//     error: authError,
//     refetch: refetchAuth,
//     status: useAuthStatus,
//   } = useGetAuth({
//     enabled: false,
//   })
//
//   const backToLoginPage = () => {
//     router.replace({
//       pathname: '/member/login',
//       query: {
//         fromPath: router.asPath,
//       },
//     })
//   }
//
//   const makeContentsUpdateAlarmDismiss = () => {
//     if (globalNotification.id === CONTENTS_NOTIFICATION_ID.CONTENTS_UPDATE) {
//       setGlobalNotification({
//         id: '',
//         isOpen: false,
//         node: null,
//       })
//     }
//   }
//
//   const makeLicenseExpiredAlarmDismiss = () => {
//     if (globalNotification.id === GLOBAL_NOTIFICATION_ID.LICENSE_EXPIRED) {
//       setGlobalNotification({
//         id: '',
//         isOpen: false,
//         node: null,
//       })
//     }
//   }
//
//   const makeLicenseAlmostExpiredAlarmDismiss = () => {
//     if (contentNotification.id === CONTENTS_NOTIFICATION_ID.LICENSE_ALMOST_EXPIRED) {
//       setContentNotification({
//         id: '',
//         isOpen: false,
//         node: null,
//       })
//     }
//   }
//
//   // 사용권 만료 시에 글로벌 메시지 노출
//   const checkLicenseExpired = (licenseInfo?: LicenseDto) => {
//     if (licenseInfo === undefined) {
//       return
//     }
//
//     if (licenseInfo.isExpired) {
//       makeLicenseAlmostExpiredAlarmDismiss()
//
//       setGlobalNotification({
//         id: GLOBAL_NOTIFICATION_ID.LICENSE_EXPIRED,
//         isOpen: true,
//         noCloseButton: true,
//         type: 'error',
//         node: <LicenseExpiredAlarm licenseInfo={licenseInfo} />,
//       })
//     } else {
//       const today = moment()
//       const expiredDate = moment(licenseInfo.expireAt)
//       const diffDays = expiredDate.diff(today, 'days')
//       const cookieLicense = Cookie.get(LICENSE_NUMBER)
//
//       makeLicenseExpiredAlarmDismiss()
//
//       if (diffDays <= 7 && (!cookieLicense || cookieLicense !== licenseInfo?.license)) {
//         setContentNotification({
//           id: CONTENTS_NOTIFICATION_ID.LICENSE_ALMOST_EXPIRED,
//           isOpen: true,
//           type: 'warning',
//           node: <LicenseAlmostExpiredAlarm licenseInfo={licenseInfo} />,
//           onClose: () => {
//             if (licenseInfo?.license) {
//               Cookie.set(LICENSE_NUMBER, licenseInfo?.license, { expires: 365 })
//             }
//           },
//         })
//       } else {
//         makeLicenseAlmostExpiredAlarmDismiss()
//       }
//
//       checkSiteVersion()
//     }
//   }
//
//   // 버전 체크
//   const checkSiteVersion = async () => {
//     const localVersion = Cookie.get(SITE_INNER_VERSION)
//
//     try {
//       const { status, data, message } = await apiGetCommonCode({
//         parentCode: 'FRONT_APP_VERSION',
//         groupId: storeUserSelectGroup ?? 0,
//       })
//       if (status === 'S') {
//         const versionCodes = data as CommonCode[]
//         const serverVersion = versionCodes[0].name
//
//         dispatch(setSiteVersion(serverVersion))
//
//         if (!localVersion) {
//           Cookie.set(SITE_INNER_VERSION, serverVersion, { expires: 365 })
//         } else {
//           if (localVersion !== serverVersion) {
//             if (globalNotification.id === '') {
//               setGlobalNotification({
//                 id: CONTENTS_NOTIFICATION_ID.CONTENTS_UPDATE,
//                 isOpen: true,
//                 noCloseButton: true,
//                 node: <ContentsUpdateAlarm />,
//               })
//             }
//             return
//           }
//         }
//       } else {
//         openToast(message?.message, 'error')
//         makeContentsUpdateAlarmDismiss()
//       }
//     } catch (error) {
//       console.log('>> [useCheckAuth] 버전 체크 실패', error)
//       makeContentsUpdateAlarmDismiss()
//     }
//   }
//
//   const adjustAuthData = async (authData: BaseResponseCommonObject) => {
//     if (authData) {
//       const { status, data } = authData
//       if (status === 'S') {
//         const userData = data as UserInfo
//
//         console.log('>> [useCheckAuth] 인증 성공 userData', userData)
//
//         // 회사의 그룹 불러오기 API Fetch
//         dispatch(fetchAllGroups())
//
//         // 회사의 모든 유저: 리셋하고 다시 불러오기 API Fetch
//         dispatch(fetchAllUsers())
//
//         // 유저의 Auth에서 받아온 정보 저장
//         dispatch(setUserInfo(userData))
//
//         // 유저 정보 불러오기 API Fetch
//         dispatch(fetchOneUser(userData.userId as number))
//
//         // 유저 라이센스 정보 불러오기 API Fetch
//         dispatch(fetchLicenseInfo())
//
//         // 공통 코드 불러오기 API Fetch
//         dispatch(
//           fetchCommonCodes([
//             {
//               parentCode: 'USER_LANDING_PAGE',
//               keyName: 'landingPages',
//             },
//             {
//               parentCode: 'USER_SHARE_POLICY',
//               keyName: 'userSharePolicy',
//             },
//             {
//               parentCode: 'TIMEZONE',
//               keyName: 'timezone',
//             },
//           ])
//         )
//
//         // 공유설정 기본값 불러오기 API Fetch
//         dispatch(fetchGetSharePolicy(userData.userId as number))
//
//         setIsAuthenticated(true)
//       } else {
//         console.log('>> [useCheckAuth] 인증 실패 authData', authData)
//         console.log('>> [useCheckAuth] 인증 실패 accessToken', accessToken)
//         getRefreshToken.mutate()
//       }
//     }
//   }
//
//   useLayoutEffect(() => {
//     toggleCaptchaBadge(false)
//     refetchAuth()
//   }, [])
//
//   useEffect(() => {
//     if (useAuthStatus === 'loading') {
//       setIsLoading(true)
//     } else {
//       setIsLoading(false)
//     }
//   }, [useAuthStatus])
//
//   useEffect(() => {
//     if (authError) {
//       console.log('>> [useCheckAuth] authError', authError)
//       backToLoginPage()
//     }
//   }, [authError])
//
//   useEffect(() => {
//     if (!authData) {
//       return
//     }
//
//     adjustAuthData(authData)
//   }, [authData])
//
//   const getRefreshToken = usePostRefreshToken({
//     onSuccess: response => {
//       const { status, data } = response
//
//       if (status === 'S') {
//         const { accessToken } = data as RefreshTokenResult
//
//         console.log('>> [useCheckAuth] 토큰 갱신 성공', response)
//
//         setAccessTokenToCookie(accessToken)
//
//         refetchAuth()
//       } else {
//         console.log('>> [useCheckAuth] 토큰 갱신 실패', response)
//         backToLoginPage()
//
//         setIsAuthenticated(false)
//       }
//     },
//     onError: error => {
//       backToLoginPage()
//     },
//   })
//
//   useEffect(() => {
//     if (storeUserInfo.selectedGroupId && storeUserSelectGroup !== storeUserInfo.selectedGroupId) {
//       // 유저가 선택한 그룹 ID store에 저장
//       dispatch(setUserSelectGroup(storeUserInfo.selectedGroupId))
//     }
//   }, [storeUserInfo])
//
//   // 10분마다 한 번씩 토큰 갱신 시도
//   useEffect(() => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current)
//     }
//     timerRef.current = setInterval(() => {
//       refetchAuth()
//     }, 1000 * 60 * 10)
//
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current)
//       }
//     }
//   }, [])
//
//   return {
//     isLoading,
//     isAuthenticated,
//     accessToken,
//     // refetchAuth,
//     router,
//     backToLoginPage,
//     useAuthStatus,
//     checkSiteVersion,
//     checkLicenseExpired,
//   }
// }
