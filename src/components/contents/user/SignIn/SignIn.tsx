// /**
//  * @file SignIn.tsx
//  * @description 로그인
//  */
//
// import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'
// import Cookie from 'js-cookie'
// import { useRouter } from 'next/router'
// import { v4 as uuid } from 'uuid'
//
// import Button from '~/components/common/ui/Button'
// import FormInputBtn from '~/components/common/ui/FormInputBtn'
// import FormInputText from '~/components/common/ui/FormInputText'
// import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
// import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
// import {
//   ACCESS_TOKEN_NAME,
//   EMAIL_PATTERN,
//   PASSWORD_PATTER_DESCRIPTION,
//   PASSWORD_PATTERN,
//   RECAPTCHA_MIN_SCORE,
//   USESTATE_DELAY_TIME,
// } from '~/constants/common'
// import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
// import { fetchCommonCodes } from '~/stores/modules/common/commonCode'
// import { setLandingPage, setUserSelectGroup } from '~/stores/modules/common/user'
// import { paymentsIdAction } from '~/stores/modules/contents/payment/payment'
// import { resetState } from '~/stores/reducer'
// import { LicenseDto, LoginDto } from '~/types/api/service'
// import type { LoginResult } from '~/types/common'
// import { TimeoutRef } from '~/types/common'
// import { useSignIn } from '~/utils/api/auth/useSignIn'
// import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
// import { apiGetLicenseInfo } from '~/utils/api/license/useGetLicenseInfo'
// import { openToast } from '~/utils/common/toast'
// import { setAccessTokenToCookie } from '~/utils/common/token'
// import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
// import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
// import { useValidate } from '~/utils/hooks/common/useValidate'
//
// const SignIn = () => {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
//     minScore: RECAPTCHA_MIN_SCORE,
//   })
//
//   const timerRef: TimeoutRef = useRef(null)
//   const [isWorking, setIsWorking] = useState(false)
//   const landingPages = useAppSelector(state => state.commonCode.landingPages)
//   const [isLoginBlockModalOpen, setIsLoginBlockModalOpen] = useState(false)
//   const { getInputRef } = useValidate()
//   const emailRef = useRef<HTMLInputElement>(null)
//   const passwordRef = useRef<HTMLInputElement>(null)
//   const localstorageStayLoggedIn = window.localStorage.getItem('stayLoggedIn')
//   const [emailErrorMessage, setEmailErrorMessage] = useState('')
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
//   const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(localstorageStayLoggedIn === 'true')
//   const [email, setEmail] = useState('')
//   const [passwd, setPasswd] = useState('')
//   const [isGoingToLandingPageFlag, setIsGoingToLandingPageFlag] = useState(false)
//   const [userData, setUserData] = useState<LoginResult>()
//   const [fromPath, setFromPath] = useState<string>('')
//
//   const checkLicense = async () => {
//     const res = {
//       iValid: false,
//       defaultGroupId: 0,
//     }
//     try {
//       const { status, data, message } = await apiGetLicenseInfo()
//       if (status === 'S') {
//         const licenseInfo = data as LicenseDto
//         if (licenseInfo.isExpired) {
//           await router.push('/setting/license-info')
//         } else {
//           const find = licenseInfo.productList?.find(e => (e.isGeneralProduct = true))
//           if (find && find.productId) res.iValid = true
//         }
//       } else {
//         openToast(message?.message, 'error')
//       }
//     } catch (e) {
//       console.error('>> checkLicense error', e)
//     }
//     return res
//   }
//
//   const signIn = useSignIn({
//     onSuccess: async response => {
//       console.log('>> signIn response', response)
//       const { status, message, code } = response
//       if (status === 'S') {
//         const userData = response.data as LoginResult
//         const { accessToken, userId, selectedGroupId } = userData
//
//         localStorage.clear()
//
//         if (stayLoggedIn) {
//           localStorage.setItem('stayLoggedIn', 'true')
//         }
//
//         dispatch(resetState())
//
//         setTimeout(async () => {
//           setUserData(userData)
//
//           openToast(message?.message ?? '정상적으로 로그인되었습니다.', 'success')
//
//           await setAccessTokenToCookie(accessToken)
//
//           const isLicenseOk = await checkLicense()
//           if (!isLicenseOk.iValid) {
//             setIsWorking(false)
//             return false
//           }
//           // 유저가 선택한 그룹 ID store에 저장
//           if (selectedGroupId !== null && selectedGroupId !== undefined && selectedGroupId > 0) {
//             console.log('selectedGroupId', selectedGroupId)
//             dispatch(setUserSelectGroup(selectedGroupId))
//           } else {
//             // console.log('isLicenseOk.defaultGroupId', isLicenseOk.defaultGroupId)
//             // dispatch(setUserSelectGroup(isLicenseOk.defaultGroupId))
//           }
//
//           if (fromPath !== '') {
//             await router.replace(fromPath)
//           } else {
//             if (userData.landingPage === null) {
//               await router.replace('/dashboard')
//             } else {
//               dispatch(
//                 fetchCommonCodes([
//                   {
//                     parentCode: 'USER_LANDING_PAGE',
//                     keyName: 'landingPages',
//                   },
//                 ])
//               ).then(() => {
//                 console.log('>> 공통 코드 로딩 완료')
//                 setIsGoingToLandingPageFlag(true)
//               })
//             }
//           }
//
//           setTimeout(() => {
//             setIsWorking(false)
//           }, 5000)
//         }, USESTATE_DELAY_TIME)
//       } else {
//         if (code === '00004') {
//           if (message?.message) {
//             const msg = message?.message.split('\n')
//             if (msg?.length > 1) {
//               openToast(`${msg[0]}회`, 'error', undefined, uuid())
//               openToast(`5회 실패시 계정이 잠깁니다.`, 'error', undefined, uuid())
//             } else {
//               openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
//             }
//             console.log('msg', msg)
//           } else {
//             openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
//           }
//         } else {
//           console.log('message?.message', message?.message)
//           openToast(message?.message ?? '로그인에 실패하였습니다.', 'error', undefined, uuid())
//         }
//         setIsWorking(false)
//       }
//     },
//     onError: error => {
//       setIsWorking(false)
//     },
//   })
//
//   const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.trim()
//     if (value !== '') {
//       setEmailErrorMessage('')
//     }
//     setEmail(value)
//   }
//
//   const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.trim()
//     if (value !== '') {
//       setPasswordErrorMessage('')
//     }
//     setPasswd(value)
//   }
//
//   const excuteLoginProcess = () => {
//     const signInData: LoginDto = {
//       email,
//       passwd,
//     }
//
//     signIn.mutate(signInData)
//   }
//
//   const isValidated = () => {
//     if (email === '') {
//       setEmailErrorMessage('아이디를 입력해주세요.')
//       setTimeout(() => {
//         if (emailRef.current) emailRef.current.focus()
//       }, 10)
//       return
//     }
//
//     if (passwd === '') {
//       setPasswordErrorMessage('비밀번호를 입력해주세요.')
//       setTimeout(() => {
//         if (passwordRef.current) passwordRef.current.focus()
//       }, 10)
//       return
//     }
//
//     // if (!EMAIL_PATTERN.test(email)) {
//     //   setEmailErrorMessage('올바른 이메일이 아닙니다.')
//     //   setTimeout(() => {
//     //     if (emailRef.current) emailRef.current.focus()
//     //   }, 10)
//     //   return
//     // }
//     //
//     // if (!PASSWORD_PATTERN.test(passwd)) {
//     //   setPasswordErrorMessage(PASSWORD_PATTER_DESCRIPTION)
//     //   setTimeout(() => {
//     //     if (passwordRef.current) passwordRef.current.focus()
//     //   }, 10)
//     //   return
//     // }
//
//     return true
//   }
//
//   const isRecaptchaValidated = async () => {
//     const v3Result = await textRecaptchaV3()
//
//     if (!v3Result) {
//       console.log('>> v3Failed', v3Result)
//       setIsV3Failed(true)
//     } else {
//       excuteLoginProcess()
//     }
//   }
//
//   const handleSubmit = () => {
//     if (isWorking) return
//
//     setIsWorking(true)
//
//     if (!isValidated()) {
//       setIsWorking(false)
//       return
//     }
//     excuteLoginProcess()
//     //isRecaptchaValidated()
//   }
//
//   const handleResetPassword = () => {
//     router.push('/member/password-reset')
//   }
//
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSubmit()
//     }
//   }
//
//   const handleGoToNewswireLogin = () => {
//     window.open('https://www.newswire.co.kr/login/login', '_blank', 'noopener, noreferrer')
//   }
//
//   const checkV2Recaptcha = async (token: string | null) => {
//     if (!token) {
//       return
//     }
//
//     const result = await testRecaptchaV2(token)
//
//     console.log('>> checkV2Recaptcha result', result)
//
//     setIsV3Failed(false)
//
//     if (result) {
//       excuteLoginProcess()
//     }
//   }
//
//   useEffect(() => {
//     if (v2Token) {
//       checkV2Recaptcha(v2Token)
//     }
//
//     dispatch(resetState())
//   }, [v2Token])
//
//   useEffect(() => {
//     console.group('>> [useEffect] DemoSignIn')
//     console.log('>> isGoingToLandingPageFlag', isGoingToLandingPageFlag)
//     console.log('>> landingPages', landingPages)
//     console.log('>> userData', userData)
//     console.groupEnd()
//     if (userData && isGoingToLandingPageFlag && landingPages.length > 0) {
//       const landingPage = landingPages.find(landingPage => landingPage.code === userData.landingPage)
//       const navigationItem = LANDINGPAGE_LINKS.find(link => link.code === landingPage?.code)
//       if (navigationItem) {
//         dispatch(setLandingPage(landingPage))
//         router.push(navigationItem.link)
//       } else {
//         router.push('/home')
//       }
//     }
//   }, [isGoingToLandingPageFlag, landingPages, userData])
//
//   useEffect(() => {
//     if (stayLoggedIn) {
//       window.localStorage.setItem('stayLoggedIn', 'true')
//     } else {
//       window.localStorage.removeItem('stayLoggedIn')
//     }
//   }, [stayLoggedIn])
//
//   useEffect(() => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current)
//     }
//     timerRef.current = setTimeout(() => {
//       Cookie.remove(ACCESS_TOKEN_NAME)
//       if (emailRef.current) emailRef.current.focus()
//
//       if (router.query.error) {
//         const errorCode = router.query.error as string
//         if (errorCode === 'login_replace') {
//           openToast('다른 기기에서 로그인하여 로그아웃 되었습니다.', 'error')
//         }
//       }
//
//       if (router.query.fromPath !== undefined) {
//         setFromPath(router.query.fromPath as string)
//       }
//     }, 100)
//   }, [router])
//
//   return (
//     <>
//       <div className="log-type1__section position-blank-center">
//         <div className="log-type1-header__section">
//           <div className="log-type1-header__logo">
//             <MediaBeeLogo />
//           </div>
//           <h2 className="log-type1-header__title">로그인</h2>
//         </div>
//         <div className="log-type1-contents__section">
//           <ul>
//             <li>
//               <FormInputText
//                 id="user-email"
//                 name="user-email"
//                 title="이메일"
//                 value={email}
//                 getInputRef={ref => getInputRef(ref, emailRef)}
//                 onChange={handleChangeEmail}
//                 onKeyDown={handleKeyDown}
//                 failed={emailErrorMessage !== ''}
//                 msg={emailErrorMessage}
//               />
//             </li>
//             <li>
//               <FormInputText
//                 id="user-passwd"
//                 name="user-passwd"
//                 title="비밀번호"
//                 inputType="password"
//                 getInputRef={ref => getInputRef(ref, passwordRef)}
//                 value={passwd}
//                 onChange={handleChangePassword}
//                 onKeyDown={handleKeyDown}
//                 failed={passwordErrorMessage !== ''}
//                 msg={passwordErrorMessage}
//               />
//             </li>
//             <li>
//               <div className="log-type1-keep__section">
//                 <FormInputBtn
//                   type="checkbox"
//                   name="ck"
//                   id="ck"
//                   label="로그인 상태 유지"
//                   checked={stayLoggedIn}
//                   onChange={e => setStayLoggedIn(e.target.checked)}
//                 />
//                 <Button
//                   elem="button"
//                   label={'비밀번호 찾기'}
//                   cate={'link-text'}
//                   size={'m'}
//                   color={'body-link'}
//                   onClick={handleResetPassword}
//                 />
//               </div>
//             </li>
//           </ul>
//           {isV3Failed && (
//             <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
//               <ReCAPTCHA
//                 size="normal"
//                 sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
//                 onChange={token => setV2Token(token)}
//               />
//             </div>
//           )}
//         </div>
//         <div className="log-type1-footer__section">
//           <Button
//             label={'로그인'}
//             cate={'default'}
//             size={'m'}
//             color={'primary'}
//             onClick={handleSubmit}
//             disabled={isWorking}
//             isLoading={isWorking}
//           />
//         </div>
//         <div className="display-flex justify-content__flex-end mt-20">
//           <Button
//             elem="button"
//             label={'뉴스와이어 로그인'}
//             cate={'link-ico-text'}
//             size={'m'}
//             color={'link'}
//             icoRight={true}
//             icoRightData={icoSvgData.chevronRight}
//             onClick={handleGoToNewswireLogin}
//           />
//         </div>
//       </div>
//     </>
//   )
// }
//
// export default SignIn
