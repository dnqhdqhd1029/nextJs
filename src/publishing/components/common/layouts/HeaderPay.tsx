/**
 * @file Header.tsx
 * @description 헤더 공통
 */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import tempImg from '/public/assets/png/temp.jpg'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import MediaBeeLogo from '~/publishing/components/common/ui/MediaBeeLogo'

{
  /* 헤더 셀렉트박스 형태 3종류 - select__section select-type3- */
}

const HeaderPay = () => {
  const [hamburger, setHamburger] = useState(false)

  return (
    <header className="header__section">
      {/* 알림박스 상단 */}
      {/* <div className="header-notification__group">
        <div className="notification-header__section colors-blue-700 button-type1">
          <div className="notification-header__group">
            <div className="notification-header__contents ta-l">
              <p>
                미디어비가 알파 서비스를 시작했습니다.
                <br />
                사용 중 불편하거나 개선할 점이 있으면{' '}
                <Link
                  href="#!"
                  legacyBehavior
                >
                  <a target="_self">고객센터</a>
                </Link>
                에 알려주세요. 내용을 검토 후 처리 결과를 알려드리겠습니다.
              </p>
            </div>
          </div>
          <div className="notification-header__btn">
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s24'}
              color={'alert'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton}
              icoSize={16}
            />
          </div>
        </div>
      </div> */}

      <div className="header-gnb__section">
        <div className="header-hamburger">
          {/* 클릭 시, is-active 클래스 추가 */}
          <button
            type="button"
            className="header-hamburger__button"
          >
            <span className="hidden">메뉴</span>
          </button>

          {/* header-hamburger__menu => 상단 알림박스 위치에 따라 top값 변동 */}
          <div className="header-hamburger__menu">
            <div className="header-hamburger-menu__search">
              <FormInputSearch placeholder="이름, 매체, 이메일" />

              {/* is-show 클래스 추가 */}
              <div className="header-search-result__section">
                <div className="header-search-result__area">
                  <div className="header-search-result__group">
                    <h6 className="header-search-result__title">언론인</h6>
                    <ul className="header-search-result__list">
                      <li>
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="header-search-result__item">
                            {/* 프로필 이미지 있을 때 */}
                            <div className="header-search-result__item-img">
                              <Image
                                src={tempImg}
                                width={500}
                                height={500}
                                alt="temp 프로필 이미지"
                              />
                            </div>

                            <div className="header-search-result__item-txt">
                              <p className="name">서정민</p>
                              <p className="corp">중앙일보 문화부 기자</p>
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="header-search-result__item">
                            {/* 프로필 이미지 없을 때 */}
                            <IcoAvatar
                              label={'아이콘이름'}
                              icoData={icoSvgData.personFill}
                            />

                            <div className="header-search-result__item-txt">
                              <p className="name">이훈성</p>
                              <p className="corp">한국일보 편집국 산업부 차장</p>
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="header-search-result__item">
                            <div className="header-search-result__item-img">
                              <Image
                                src={tempImg}
                                width={500}
                                height={500}
                                alt="temp 프로필 이미지"
                              />
                            </div>
                            <div className="header-search-result__item-txt">
                              <p className="name">서정민</p>
                              <p className="corp">중앙일보 문화부 기자</p>
                            </div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <div className="header-search-result__btn">
                      <Button
                        label={'전체 언론인 검색'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </div>
                  </div>
                  <div className="header-search-result__group">
                    <h6 className="header-search-result__title">미디어</h6>
                    <ul className="header-search-result__list">
                      <li>
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="header-search-result__item">
                            <div className="header-search-result__item-img">
                              <Image
                                src={tempImg}
                                width={500}
                                height={500}
                                alt="temp 프로필 이미지"
                              />
                            </div>
                            <div className="header-search-result__item-txt">
                              <p className="name">서정민</p>
                              <p className="corp">
                                중앙일보 문화부 기자중앙일보 문화부 기자중앙일보 문화부 기자중앙일보 문화부 기자중앙일보
                                문화부 기자중앙일보 문화부 기자
                              </p>
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="header-search-result__item">
                            {/* 로고 이미지 없을 때, 아이콘 데이터값은 변경 예정 */}
                            <IcoAvatar
                              label={'아이콘이름'}
                              icoData={icoSvgData.lockFill}
                            />
                            <div className="header-search-result__item-txt">
                              <p className="name">중앙일보</p>
                              <p className="corp">종합일간신문</p>
                            </div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <div className="header-search-result__btn">
                      <Button
                        label={'전체 미디어 검색'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-hamburger-menu__select">
              <div className="select-form__section select-form-btn">
                <div className="select-form__group">
                  <button className="select-form__label">
                    <span className="select-form__label-text">선택</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-form-option__section">
                    <div className="select-form-option__area">
                      <ul className="select-form-option__group">
                        <li>
                          <button className="select-form-option__item">
                            <span className="select-form-option__item-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-form-option__item">
                            <span className="select-form-option__item-text">
                              공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-form-option__item is-selected">
                            <span className="select-form-option__item-text">
                              수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-hamburger-menu__list">
              <ul className="header-hamburger-menu__depth1">
                <li>
                  <button className="header-hamburger-menu__depth1-button is-active">
                    <span className="label">언론</span>
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
                        <span className="label">미디어 브리핑</span>
                      </button>
                    </li>
                    <li>
                      <button className="header-hamburger-menu__depth2-button">
                        <span className="label">맞춤 검색 관리</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button className="header-hamburger-menu__depth1-button is-active">
                    <span className="label">모니터링</span>
                    <span className="ico">
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </span>
                  </button>
                  <ul className="header-hamburger-menu__depth2">
                    <li>
                      <div className="header-hamburger-menu__depth2-button">
                        <p className="header-hamburger-menu__depth2-text">
                          현재 사용 중인 상품은 모니터링 기능이 없어 업그레이드가 필요합니다.
                        </p>
                        <Button
                          label={'업그레이드'}
                          cate={'default'}
                          size={'s'}
                          color={'success'}
                        />
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <button className="header-hamburger-menu__depth1-button">
                    <span className="label">활동</span>
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
                        <span className="label">미디어 브리핑</span>
                      </button>
                    </li>
                    <li>
                      <button className="header-hamburger-menu__depth2-button">
                        <span className="label">맞춤 검색 관리</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button className="header-hamburger-menu__depth1-button">
                    <span className="label">배포</span>
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
                        <span className="label">미디어 브리핑</span>
                      </button>
                    </li>
                    <li>
                      <button className="header-hamburger-menu__depth2-button">
                        <span className="label">맞춤 검색 관리</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button className="header-hamburger-menu__depth1-button">
                    <span className="label">프로젝트</span>
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
                        <span className="label">미디어 브리핑</span>
                      </button>
                    </li>
                    <li>
                      <button className="header-hamburger-menu__depth2-button">
                        <span className="label">맞춤 검색 관리</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button className="header-hamburger-menu__depth1-button">
                    <span className="label">고객센터</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-gnb__group">
          <Link
            href="/"
            legacyBehavior
          >
            <a className="header-logo">
              <MediaBeeLogo />
            </a>
          </Link>
        </div>
        <div className="header-gnb__group">
          <div className="header-pay">
            <Button
              label={'견적서 다운로드'}
              cate={'default'}
              size={'m'}
              color={'outline-secondary'}
            />
          </div>
        </div>
      </div>

      {/* 알림박스 히단 */}
      {/* <div className="header-notification__group">
        <div className="notification-header__section colors-alert-border button-type1">
          <div className="notification-header__group">
            <div className="notification-header__contents">
              <p>배포하지 않은 보도자료 초안이 2개 있습니다.</p>

              <p>
                <Button
                  elem="a"
                  url={'https://www.naver.com/'}
                  label={'초안보기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                />
              </p>
            </div>
          </div>
          <div className="notification-header__btn">
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s24'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton}
              icoSize={16}
            />
          </div>
        </div>
      </div> */}
    </header>
  )
}

export default HeaderPay
