/**
 * @file header1.tsx
 * @description header1 페이지
 */

// 적용된 Header 컴포넌트
// import Header from '~/publishing/components/common/layouts/Header'

import { useCallback, useEffect, useRef } from 'react'
import Cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import tempImg from '/public/assets/png/temp.jpg'
import UserMenu from '~/components/common/layouts/Header/UserMenu/UserMenu'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import MediaBeeLogo from '~/publishing/components/common/ui/MediaBeeLogo'
import { PageType } from '~/types/common'
import { useSignOut } from '~/utils/hooks/common/useSignOut'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const Sample: PageType = () => {
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
    <header className="header__section">
      <div className="header-gnb__section">
        <div className="header-gnb__group">
          <div className="header-gnb__hamburger">
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
          <div className="header-gnb-hamburger__menu hamburger-menu">
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
              <li>
                <button
                  type="button"
                  className="header-customer-hamburger-menu__button"
                  onClick={() => (userInfo.userId ? router.push('/member/login') : signOut())}
                >
                  {accessToken !== '' ? '로그아웃' : '로그인'}
                </button>
              </li>
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

          <Link
            href="/"
            legacyBehavior
          >
            <a className="header-logo">
              <MediaBeeLogo />
            </a>
          </Link>

          <nav className="header-gnb__menu">
            <ul className="header-gnb__menu-list">
              {/* 현재 페이지 - is-active 클래스 추가 */}
              <li className="">
                <div className="select__section select-type3-n1">
                  <button className="select__label">
                    <span className="select__label-text">PR서비스</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>
                </div>
              </li>
              <li>
                <div className="select__section select-type3-n1">
                  <button className="select__label">
                    <span className="select__label-text">상품 안내</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>
                </div>
              </li>
              <li className="is-active">
                <div className="select__section select-type3-n1">
                  <button className="select__label">
                    <span className="select__label-text">언론인</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론인 로그인</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">프로필 등록</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론 솔루션</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="select__section select-type3-n1">
                  <button className="select__label">
                    <span className="select__label-text">미디어 소식</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">뉴스와이어</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">배포 관리</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="">
                <div className="select__section select-type3-n2">
                  <button className="select__label">
                    <span className="select__label-text">고객 사례</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-gnb__group">
          <UserMenu />
          {/*<div className="header-my mr8">
              <div className="select__section select-type3-n3 is-show">
                <Button
                    elem="button"
                    url={"https://www.newswire.co.kr/"}
                    label={"로그인"}
                    cate={"link-text"}
                    color={"body-text"}
                    size={"m"}
                />

                <button className="select__label">
                  <span className="select__label-text">사용자</span>
                  <span className="ico-svg">
                  <img src="/assets/svg/my-header.svg" alt="" />
                </span>
                </button>

                <div className="select-option__section">
                  <div className="select-option__area">
                    <ul className="select-option__group">
                      <li>
                        <button className="select-option__item">
                        <span className="select-option__item-text">
                          회원 정보
                        </span>
                        </button>
                      </li>

                      <li>
                        <button className="select-option__item is-selected">
                        <span className="select-option__item-text">
                          비밀번호 변경
                        </span>
                        </button>
                      </li>
                      <li>
                        <button className="select-option__item">
                        <span className="select-option__item-text">
                          로그아웃
                        </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>*/}

          <div className="header-demo">
            <Button
              elem="button"
              label={'데모신청'}
              cate={'default'}
              size={'s'}
              color={'tertiary'}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
