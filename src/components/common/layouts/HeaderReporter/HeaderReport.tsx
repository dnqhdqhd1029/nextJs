/**
 * @file Header.tsx
 * @description 헤더 공통
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import UserMenu from '~/components/common/layouts/Header/UserMenu/UserMenu'
import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { HeaderReportProps } from '~/publishing/components/common/ui/common-ui'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { useSignOut } from '~/utils/hooks/common/useSignOut'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const HeaderReport = ({ menuMain, menuReporter }: HeaderReportProps) => {
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
      <div className={`header-gnb__section ${menuBar ? 'is-opened' : ''}`}>
        {menuMain || menuReporter ? (
          <>
            <div className="header-gnb__group">
              <div className="header-gnb__hamburger">
                <div
                  className="hamburger-buttons"
                  onClick={() => setMenuBarActionAction(!menuBar)}
                >
                  <button
                    type="button"
                    className="header-gnb-hamburger__button"
                  >
                    <span className="hidden">메뉴</span>
                  </button>
                </div>
              </div>
              <div className="header-gnb-hamburger__menu hamburger-menu">
                <div className="header-gnb-hamburger__menu__header">
                  <span className="ico-svg">
                    <img
                      src="/assets/svg/my-header.svg"
                      alt=""
                    />
                  </span>
                  {menuMain ? (
                    <>
                      <span>로그인을 해주세요</span>
                      <div className="login_button">
                        <Button
                          label={accessToken !== '' ? '로그아웃' : '로그인'}
                          cate={'link-text-arrow'}
                          size={'m'}
                          color={'primary'}
                          icoRight={true}
                          icoRightData={icoSvgData.chevronThickRight}
                          className="login"
                          onClick={() => (userInfo.userId ? router.push('/member/login') : signOut())}
                        />
                      </div>
                    </>
                  ) : (
                    <span className="member-info__txt">
                      <div className="flex-just-start align-items__center">
                        <strong>홍길동 (중앙일보)</strong>
                        <Button
                          label={'인증회원'}
                          cate={'ico-only'}
                          size={'es'}
                          color={'blue-700'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.patchCheckFill}
                          icoSize={16}
                          //onClick={() => setIsOpen(true)}
                        />
                      </div>

                      <em>편집국 경제팀 증권 전문기자</em>
                    </span>
                  )}
                </div>

                {menuMain && (
                  <ul
                    className="header-gnb-hamburger__menu__list hamburger-menu-list"
                    style={{
                      marginTop: accessToken !== '' && licenseInfo && licenseInfo.isExpired ? 50 : 0,
                    }}
                  >
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        PR서비스
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        상품 안내
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button is-active"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        언론인
                        <span className="ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <ul className="header-hamburger-menu__depth2">
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">맞춤 검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">미디어 리스트</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">연락처 추가</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">맞춤 검색 관리</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">미디어 소식</span>
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/media')
                        }}
                      >
                        미디어 소식
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        고객 사례
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        회사소개
                      </button>
                    </li>
                  </ul>
                )}

                {menuReporter && (
                  <ul
                    className="header-gnb-hamburger__menu__list hamburger-menu-list"
                    style={{
                      marginTop: accessToken !== '' && licenseInfo && licenseInfo.isExpired ? 50 : 0,
                    }}
                  >
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        내 프로필
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/media')
                        }}
                      >
                        미디어 소식
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button is-active"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        AI도구
                        <span className="ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <ul className="header-hamburger-menu__depth2">
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">맞춤 검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">미디어 리스트</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">연락처 추가</span>
                          </button>
                        </li>
                        <li>
                          <button className="header-hamburger-menu__depth2-button">
                            <span className="label">맞춤 검색 관리</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="header-hamburger-menu__depth2-button"
                            onClick={() => {
                              router.push('/publishing/media')
                            }}
                          >
                            <span className="label">미디어 소식</span>
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        언론인 솔루션
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        className="header-gnb-hamburger__menu__list__button"
                        onClick={() => {
                          router.push('/publishing/reporter')
                        }}
                      >
                        회사소개
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {menuMain && (
                <>
                  <Link
                    href="/publishing/guide"
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
                      <li className="">
                        <div className="select__section select-type3-n1">
                          <button
                            className="select__label"
                            onClick={() => router.push('/publishing/reporter')}
                          >
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
                          <button
                            className="select__label"
                            onClick={() => {
                              router.push('/publishing/media')
                            }}
                          >
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
                </>
              )}

              {menuReporter && (
                <>
                  <Link
                    href="/publishing/guide"
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
                            <span className="select__label-text">내 프로필</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className="select__section select-type3-n1">
                          <button
                            className="select__label"
                            onClick={() => {
                              router.push('/publishing/media')
                            }}
                          >
                            <span className="select__label-text">미디어 소식 </span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>
                        </div>
                      </li>
                      <li className="">
                        {/*is-active*/}
                        <div className="select__section select-type3-n1">
                          <button className="select__label">
                            <span className="select__label-text">AI도구</span>
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
                            <span className="select__label-text">언론인 솔루션</span>
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
                            <span className="select__label-text">회사 소개</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>
            {menuReporter ? (
              <>
                {' '}
                <div className="header-gnb__group">
                  <UserMenu />
                </div>
              </>
            ) : (
              <>
                {' '}
                <div className="header-gnb__group">
                  <Button
                    elem="button"
                    label={'로그아웃'}
                    cate={'link-text'}
                    size={'s'}
                    color={'link-dark'}
                    className={'mr-15'}
                  />

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
              </>
            )}
          </>
        ) : (
          <>
            <div className="header-gnb__section-center">
              <div className="header-gnb-center__logo">
                <button
                  type="button"
                  onClick={() => router.push('/publishing/help')}
                >
                  <MediaBeeLogo />
                  <span className="font-body__lead--bold ml-3">언론인</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default HeaderReport
