import Cookie, { CookieAttributes } from 'js-cookie'
import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRED_DAYS, ACCESS_TOKEN_NAME, IS_STAY_LOGGIN } from '~/constants/common'
import { store } from '~/stores'
import { TokenInfo } from '~/types/common'

export const getTokenInfo = (token: string): TokenInfo => {
  return jwt.decode(token) as TokenInfo
}

export const checkAccessTokenValidated = () => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME)

  if (accessToken === '' || accessToken === undefined || accessToken === null) {
    location.replace('/member/login')
  }

  if (accessToken) {
    const tokenInfo = getTokenInfo(accessToken)
    if (tokenInfo === null) {
      location.replace('/member/login')
    }
  }
}

export const setAccessTokenToCookie = async (token: string, stayLoggedIn?: string) => {
  let isStay = false
  if (stayLoggedIn && stayLoggedIn !== '') {
    isStay = !!(stayLoggedIn && stayLoggedIn === 'true')
  } else {
    const codeLoggedIn = Cookie.get(IS_STAY_LOGGIN)
    if (codeLoggedIn) {
      isStay = codeLoggedIn === 'true'
    }
  }
  Cookie.remove(ACCESS_TOKEN_NAME)
  Cookie.remove(IS_STAY_LOGGIN)
  if (isStay) {
    Cookie.set(IS_STAY_LOGGIN, 'true', {
      sameSite: 'strict',
      secure: true,
      expires: 90,
    })
    Cookie.set(ACCESS_TOKEN_NAME, token, {
      sameSite: 'strict',
      secure: true,
      expires: 90,
    })
    console.log('stayLoggedIn === true stayLoggedIn ACCESS_TOKEN_NAME', ACCESS_TOKEN_NAME, {
      sameSite: 'strict',
      secure: true,
      expires: 90,
    })
    console.log('stayLoggedIn === true stayLoggedIn IS_STAY_LOGGIN', IS_STAY_LOGGIN, {
      sameSite: 'strict',
      secure: true,
      expires: 90,
    })
  } else {
    Cookie.set(IS_STAY_LOGGIN, 'false')
    Cookie.set(ACCESS_TOKEN_NAME, token)
    console.log('stayLoggedIn === false ACCESS_TOKEN_NAME')
  }

  return true
}
