/**
 * @file Header.tsx
 * @description 헤더 공통
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import moment from 'moment'
import { useRouter } from 'next/router'

import UserMenu from '~/components/common/layouts/Header/UserMenu/UserMenu'
import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { useSignOut } from '~/utils/hooks/common/useSignOut'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'
const HeaderCs = () => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const router = useRouter()

  const { signOut } = useSignOut()
  const { menuBar, licenseInfo, openRequestPopup, requestPopupTypes, userInfo, setMenuBarActionAction } =
    useCustomerCenter()
  const { menuLinks } = useHeader()

  const modalRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setMenuBarActionAction(false)
    },
    [menuBar]
  )

  useEffect(() => {
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header
      className="header__section"
      ref={modalRef}
    >
      {accessToken !== '' && licenseInfo && licenseInfo.isExpired && (
        <div className="header-notification__group">
          <div className="notification-header__section colors-blue-700 button-type1">
            <div className="notification-header__group">
              <div className="notification-header__contents ta-l">
                <p>
                  사용권이 만료됐습니다. 유효기간 {moment(licenseInfo.startAt).format('YYYY-MM-DD')} ~
                  {moment(licenseInfo.expireAt).format('YYYY-MM-DD')}
                </p>
              </div>
            </div>
            <div className="notification-header__btn">
              <Button
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                label={'서비스 구매'}
                onClick={() => router.push('/payment/purchase-request')}
              />
            </div>
          </div>
        </div>
      )}
      <div className={`header-customer__section ${menuBar ? 'is-opened' : ''}`}>
        <div className="header-customer__group">
          <div className="header-customer__hamburger">
            <div
              className="hamburger-buttons"
              onClick={() => setMenuBarActionAction(!menuBar)}
            >
              <button
                type="button"
                className="header-customer-hamburger__button"
              >
                <span className="hidden">메뉴</span>
              </button>
            </div>
          </div>
          <div className="header-customer-hamburger__menu hamburger-menu">
            <div className="header-customer__hamburger">
              <div
                className="hamburger-buttons"
                onClick={() => setMenuBarActionAction(!menuBar)}
              >
                <button
                  type="button"
                  className="header-customer-hamburger__button"
                >
                  <span className="hidden">메뉴</span>
                </button>
              </div>
            </div>
            <ul
              className="header-customer-hamburger-menu__list hamburger-menu-list"
              style={{
                marginTop: accessToken !== '' && licenseInfo && licenseInfo.isExpired ? 50 : 0,
              }}
            >
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  미디어비 홈
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => {
                    router.push('/publishing/help/help')
                  }}
                >
                  도움말
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => {
                    router.push('/publishing/help/notice')
                  }}
                >
                  소식
                </button>
              </li>
              {accessToken !== '' && (
                <li>
                  <button
                    type="button"
                    className="header-customer-hamburger-menu__button"
                    onClick={() => {
                      router.push('/publishing/help/my-inquiry')
                    }}
                  >
                    내 문의
                  </button>
                </li>
              )}
              {/*<li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => (userInfo.userId ? router.push('/member/login') : signOut())}
                >
                  {accessToken !== '' ? '로그아웃' : '로그인'}
                </button>
              </li>*/}
            </ul>
            <ul className="header-customer-hamburger-menu__list hamburger-menu-list">
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                >
                  개인정보 취급 방침
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                >
                  이용 약관
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => openRequestPopup(requestPopupTypes)}
                >
                  문의하기
                </button>
              </li>
            </ul>
          </div>
          <div className="header-customer-home__logo">
            <button
              type="button"
              onClick={() => router.push('/publishing/help')}
            >
              <MediaBeeLogo />
              <span className="font-body__lead--bold ml-3">고객센터</span>
            </button>
          </div>
          <div className="header-customer__inquiry">
            <Button
              label={'문의하기'}
              cate={'default'}
              size={'s'}
              color={'tertiary'}
              onClick={() => openRequestPopup(requestPopupTypes)}
            />
          </div>
          <div className="header-customer__my">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderCs
