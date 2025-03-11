/**
 * @file NavigationForMobile.tsx
 * @description 모바일용 네비게이션
 */

import { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import tempImg from '/public/assets/png/temp.jpg'
import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

const NavigationForMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="header-hamburger">
      {/* 클릭 시, is-opened 클래스 추가 */}
      <button
        type="button"
        className={cn('header-hamburger__button', { 'is-opened': isOpen })}
        onClick={handleMenuOpen}
      >
        <span className="hidden">메뉴</span>
      </button>

      {/* header-hamburger__menu => 상단 알림박스 위치에 따라 top값 변동 */}
      <div className="header-hamburger__menu">
        <div className="header-hamburger-menu__search">
          <FormInputSearch placeholder="이름, 매체, 이메일" />
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
                      <button className="select-form-option__item is-selected">
                        <span className="select-form-option__item-text">
                          수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                        </span>
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
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">비공개 (소유자만 보고 수정할 수 있음)</span>
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
                    <span className="label">미디어 소식</span>
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
                    <span className="label">미디어 소식</span>
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
                    <span className="label">미디어 소식</span>
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
                    <span className="label">미디어 소식</span>
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
  )
}

export default NavigationForMobile
