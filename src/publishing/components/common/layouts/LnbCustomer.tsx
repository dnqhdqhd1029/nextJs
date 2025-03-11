/**
 * @file LnbCustomSearch1.tsx
 * @description LnbCustomSearch1
 */

import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/publishing/components/common/ui/IcoSvgCircle'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'

const LnbCustomer = () => {
  const router = useRouter()
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">도움말</h3>

          <span className="accordion-type1__btn-ico">
            <Button
              label={'검색'}
              cate={'ico-only'}
              size={'s'}
              color={'body-text'}
              icoLeft={true}
              icoLeftData={icoSvgData.search}
              icoSize={16}
              onClick={() => router.push('/publishing/help/help')}
            />
          </span>
        </div>
      </div>

      <div className="aside-search__contents">
        <div className="aside-search__accordion">
          {/*오픈시 is-opened*/}
          <div className="accordion-type1__group is-opened">
            <button className="accordion-type1__btn">
              <span className="accordion-type1__btn-txt">언론인</span>
              <span className="accordion-type1__btn-ico">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <div className="accordion-type1-panel__group">
              <ul className="accordion-type1-panel__option-list">
                {/* 선택 시, is-selected */}
                <li className="is-selected">
                  <button className="accordion-type1-panel__option-item">
                    <span>언론인 목록</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>언론인 목록 관리</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>언론인 맞춤 검색</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>언론인 프로필 페이지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>언론인 추가하기</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="aside-search__accordion">
          <div className="accordion-type1__group ">
            <button className="accordion-type1__btn">
              <span className="accordion-type1__btn-txt">미디어</span>
              <span className="accordion-type1__btn-ico">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <div className="accordion-type1-panel__group">
              <ul className="accordion-type1-panel__option-list">
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>인공지능/자율주행 관련 미디어</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>경제/경영 잡지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>글로벌 기업 분석</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>영자지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>삼성그룹 전문 보도 매체</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>주식/증권 전문 미디어</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>패션/뷰티/푸드 전문지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>기업 신용평가 전문</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="aside-search__accordion">
          <div className="accordion-type1__group ">
            <button className="accordion-type1__btn">
              <span className="accordion-type1__btn-txt">모니터링</span>
              <span className="accordion-type1__btn-ico">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <div className="accordion-type1-panel__group">
              <ul className="accordion-type1-panel__option-list">
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>인공지능/자율주행 관련 미디어</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>경제/경영 잡지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>글로벌 기업 분석</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>영자지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>삼성그룹 전문 보도 매체</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>주식/증권 전문 미디어</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>패션/뷰티/푸드 전문지</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>기업 신용평가 전문</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LnbCustomer
