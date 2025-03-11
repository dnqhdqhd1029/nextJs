/**
 * @file LnbCustomSearch1.tsx
 * @description LnbCustomSearch1
 */

import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/publishing/components/common/ui/IcoSvgCircle'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'

const LnbCustomSearch1 = () => {
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">맞춤 검색</h3>
          <div className="aside-search-header__button-group">
            <button
              type="button"
              className="aside-search-header__button"
            >
              <IcoSvgCircle data={icoSvgDataCircle.adjust} />
            </button>
          </div>
        </div>
        <FormInputToggle
          name="cT13"
          id="cT13"
          label="MY"
          reverse={true}
        />
      </div>

      <div className="aside-search__contents">
        <div className="aside-search__search-select">
          <div className="search">
            <FormInputSearch placeholder={'검색'} />
          </div>
          <div className="select">
            <div className="select__section select-type1-small select-align-right is-selected">
              <button className="select__label">
                <span className="select__label-text">일주일</span>
                <IcoSvg data={icoSvgData.chevronDown} />
              </button>

              <div className="select-option__section">
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button className="select-option__item is-selected">
                        <span className="select-option__item-text">일주일</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">보도자료 배포</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aside-search__accordion">
          <div className="accordion-type1__group is-opened">
            <button className="accordion-type1__btn">
              <span className="accordion-type1__btn-txt">언론인</span>
              <span className="accordion-type1__btn-ico">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <div className="accordion-type1-panel__group">
              <div className="accordion-type1-panel__search">
                <FormInputSearch placeholder={'검색'} />
              </div>
              <ul className="accordion-type1-panel__option-list">
                {/* 선택 시, is-selected */}
                <li className="is-selected">
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>주요 일간지 정보보안 담당기자</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>국회 출입 기자</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>경제/경영 잡지 기자</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>영자지 기자</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>인터넷/소셜미디어/쇼핑/인플루언서/블록체인/암호화폐/인공지능 분야 전체</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>패션/뷰티/푸드 잡지 기자</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>주식/증권 전문 미디어</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>암호화폐 보도 전문</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>종합 일간지 주요 데스크</span>
                  </button>
                </li>
                <li>
                  <button
                    className="accordion-type1-panel__option-delete"
                    title="삭제"
                  >
                    <IcoSvg data={icoSvgData.trash} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>AI/딥러닝 전문 기자</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>더보기</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="aside-search__accordion">
          <div className="accordion-type1__group is-opened">
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
          <div className="accordion-type1__group is-opened">
            <button className="accordion-type1__btn">
              <span className="accordion-type1__btn-txt">상품</span>
              <span className="accordion-type1__btn-ico">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <div className="accordion-type1-panel__group">
              <ul className="accordion-type1-panel__option-list">
                {/* 선택 시, is-selected */}
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>갤럭시 Z 폴드</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-item">
                    <span>갤럭시 Z 플립</span>
                  </button>
                </li>
                <li className="is-selected">
                  <button className="accordion-type1-panel__option-alarm">
                    <IcoSvg data={icoSvgData.bell} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>갤럭시 S23 울트라</span>
                  </button>
                </li>
                <li>
                  <button className="accordion-type1-panel__option-alarm">
                    <IcoSvg data={icoSvgData.bell} />
                  </button>
                  <button className="accordion-type1-panel__option-item">
                    <span>갤럭시 S21</span>
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

export default LnbCustomSearch1
