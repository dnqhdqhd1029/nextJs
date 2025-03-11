/**
 * @file LnbSearchFilter.tsx
 * @description LnbSearchFilter
 */

import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/publishing/components/common/ui/IcoSvgCircle'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'

const LnbSearchFilter = () => {
  return (
    <div className="lnb-search__section">
      <div className="aside-search__section type-sticky">
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
          <div className="select-form__section select-form-btn is-selected">
            <div className="select-form__group">
              <button className="select-form__label">
                <span className="select-form__label-text">
                  주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                </span>
                <IcoSvg data={icoSvgData.chevronDown} />
              </button>

              <div className="select-form-option__section">
                <div className="select-form-option__area">
                  <h6 className="select-form-option__group-title">언론인</h6>
                  <ul className="select-form-option__group">
                    <li>
                      <button className="select-form-option__item is-selected">
                        <span className="select-form-option__item-text">
                          주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">국회 출입 기자자</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                      </button>
                    </li>
                  </ul>
                  <h6 className="select-form-option__group-title">미디어</h6>
                  <ul className="select-form-option__group">
                    <li>
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">
                          주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">국회 출입 기자자</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-form-option__item">
                        <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LnbFilter />
    </div>
  )
}

export default LnbSearchFilter
