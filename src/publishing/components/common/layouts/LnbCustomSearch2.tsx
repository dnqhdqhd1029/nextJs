/**
 * @file LnbCustomSearch2.tsx
 * @description LnbCustomSearch2
 */

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const LnbCustomSearch2 = () => {
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">맞춤 검색 관리</h3>
        </div>
      </div>

      <div className="aside-search__contents">
        <div className="aside-search__accordion">
          <div className="accordion-type1__group type-open">
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
      </div>
    </div>
  )
}

export default LnbCustomSearch2
