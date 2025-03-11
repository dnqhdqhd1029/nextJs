/**
 * @file LnbSetting.tsx
 * @description LnbSetting
 */

import Button from '~/publishing/components/common/ui/Button'

const LnbSetting = () => {
  return (
    <div className="lnb-search-setting__section">
      <h2 className="lnb-search-setting__title">설정</h2>

      <div className="lnb-search-setting__menu">
        <h3 className="lnb-search-setting__sub-title">회원</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            {/* 선택 시, is-selected 추가 */}
            <button
              type="button"
              className="lnb-search-setting-menu__text is-selected"
            >
              시스템 알림
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              뉴스 알리미
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              공유 설정 기본값
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              분석 대시보드(2차)
            </button>
          </li>
        </ul>

        <h3 className="lnb-search-setting__sub-title">사용권</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              사용권 정보
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              내 구매
            </button>
          </li>
        </ul>

        <h3 className="lnb-search-setting__sub-title">회사</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              회사 정보
            </button>
          </li>
        </ul>
      </div>

      <div className="lnb-search-setting__cs">
        <h3 className="lnb-search-setting__sub-title">전담 도우미</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            <p className="lnb-search-setting-menu__text">홍길동</p>
          </li>
          <li>
            <p className="lnb-search-setting-menu__text">미디어비</p>
          </li>
          <li>
            <p className="lnb-search-setting-menu__text">운영팀 과장</p>
          </li>
          <li>
            <p className="lnb-search-setting-menu__text">02-0000-0000</p>
          </li>
          <li>
            <p className="lnb-search-setting-menu__text">
              <Button
                elem="a"
                url={'mailto:hong.gildong@meadiabee.com'}
                label={'hong.gildong@meadiabee.com'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
            </p>
          </li>
        </ul>
        <h3 className="lnb-search-setting__sub-title">고객센터</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            {/* 선택 시, is-selected 추가 */}
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              1:1 문의
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-search-setting-menu__text"
            >
              070-0000-0000
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LnbSetting
