/**
 * @file axios.ts
 * @description axios 인스턴스를 생성하는 파일
 */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import router from 'next/router'

import NetworkErrorMesage from '~/components/common/ui/NetworkErrorMesage'
import { SITE_INNER_VERSION, USER_COOKIE_LIST } from '~/constants/common'
import { getLoginSliceState, RootState, store } from '~/stores'
import { setLogOutAction } from '~/stores/modules/contents/auth/auth'
import { BaseResponseCommonObject } from '~/types/api/service'
import { RefreshTokenResult } from '~/types/common'
import { apiPostRefreshToken } from '~/utils/api/auth/usePostRefreshToken'
import { openToast } from '~/utils/common/toast'
import { setAccessTokenToCookie } from '~/utils/common/token'

const backToLogin = () => {
  USER_COOKIE_LIST.map(cookieName => Cookie.remove(cookieName))
  Cookie.set(SITE_INNER_VERSION, store.getState().authSlice.siteVersion, { expires: 365 })
  store.dispatch(setLogOutAction())

  console.log('>> 로그인 화면으로 이동')
  router.replace({
    pathname: '/member/login',
  })
}

const getCurrentState = () => {
  const state: RootState = store.getState()
  console.log('Current state:', state)
  return state
}

const getRefreshToken = async () => {
  return new Promise(async resolve => {
    const { status, data } = await apiPostRefreshToken()
    //const { status, data } = tokenResult as BaseResponseCommonObject
    if (status === 'S') {
      const { accessToken } = data as RefreshTokenResult
      await setAccessTokenToCookie(accessToken)
      resolve(accessToken)
    } else {
      resolve(false)
    }
  })
}

/**
 * axios 인스턴스를 생성
 */
const instance: AxiosInstance = axios.create({
  // 통신 최대 대기 시간. 설정값을 넘게 되면 통신을 멈추고 에러를 반환.
  timeout: 20000,
  // withCredentials: true,
})

/**
 * Request 직전 설정
 * @function
 * @param {function} anonymous - 요청 성공 직전 호출되는 함수. axios 설정값을 넣는다. (사용자 정의 설정도 추가 가능)
 * @param {function} anonymous - 요청 에러 직전 호출되는 함수. 요청 관련 error argument를 받음
 */
instance.interceptors.request.use(
  function (config) {
    try {
      // console.group('Axios Request 시작')
      // console.log(config)
      // console.groupEnd()
    } catch (e) {
      console.log('>> Axios Request success error: ', e)
    }
    return config
  },
  function (error) {
    try {
      // console.group('Axios Request 에러')
      // console.log(error)
      // console.groupEnd()
    } catch (e) {
      console.log('>> Axios Request fail error: ', e)
    }
    return Promise.reject(error)
  }
)

/**
 * Response 직후 설정
 * @function
 * @param {function} anonymous - http status 200. 응답 성공 직전 호출. then()으로 이어짐.
 * @param {function} anonymous - http 200이 아닌 경우. 응답 에러 직전 호출. catch()로 이어짐
 */
instance.interceptors.response.use(
  async function (response) {
    //const currentState = getCurrentState()
    //console.log('authSlice', currentState.authSlice)
    // console.group('Axios Response 성공')
    // console.log(config)
    // console.groupEnd()
    return response
  },
  async function (error: AxiosError) {
    console.group('>> [Axios Error]')
    console.log('>> error : ', error)
    console.log('>> error.config : ', error.config)
    console.log('>> error.response : ', error.response)
    console.log('>> error.response.status : ', error.response?.status)
    console.groupEnd()

    // timeout 에러 처리 추가
    if (error.code === 'ECONNABORTED') {
      openToast('원하는 결과를 얻지 못했습니다. 시간이 지난 뒤 다시 한번 시도해 보세요.', 'warning')
      return Promise.reject(error)
    }

    const statusCode = error.response?.status
    const response = error.response as AxiosResponse

    switch (statusCode) {
      case 400:
        openToast('잘못된 요청입니다.', 'error')
        break
      case 401:
        const { code } = response?.data as BaseResponseCommonObject
        console.log('>> code : ', code)
        if (code === '00005') {
          console.log('>> 액세스 토큰 재발급')
          // 액세스 토큰 재발급 요청
          const accessToken = await getRefreshToken()

          if (accessToken) {
            const requestConfig = {
              ...response.config,
              headers: { ...response.config.headers, Authorization: `Bearer ${accessToken}` },
            }

            return instance.request(requestConfig)
          } else {
            backToLogin()
          }
        } else {
          backToLogin()
        }
        break
      case 403:
        openToast('접근 권한이 없습니다.', 'error')
        break
      case 404:
        openToast('요청하신 리소스를 찾을 수 없습니다.', 'error')
        break
      case 415:
        openToast('지원하지 않는 미디어 타입입니다.', 'error')
        break
      case 422:
        openToast('데이터의 형식이 잘못되었습니다.', 'error')
        break
      case 500:
        openToast('서버에 오류가 발생했습니다.', 'error')
        break
      default:
        openToast(NetworkErrorMesage, 'error')
    }

    return Promise.reject(error)
  }
)

export default instance
