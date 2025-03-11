/**
 * @file LnbCustomSearch3.tsx
 * @description LnbCustomSearch3
 */

interface LnbCustomSearch3Props {
  header?: boolean
}

import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'

const LnbCustomSearch3 = ({ header }: LnbCustomSearch3Props) => {
  return (
    <div className="lnb-search__section">
      {header ? (
        <div className="lnb-search-result__header">
          <h2 className="lnb-search-result__title">맞춤 검색 관리</h2>
          <FormInputToggle
            name="cT13"
            id="cT13"
            label="MY"
            reverse={true}
          />
        </div>
      ) : (
        <h2 className="hidden">메뉴명 숨김처리</h2>
      )}

      <ul className="lnb-search-result__list">
        <li>
          <button
            type="button"
            className="lnb-search-result__menu is-selected"
          >
            <span className="lnb-search-result__menu-text">언론인</span>
            <span className="lnb-search-result__menu-text">16</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="lnb-search-result__menu"
          >
            <span className="lnb-search-result__menu-text">미디어</span>
            <span className="lnb-search-result__menu-text">4</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

LnbCustomSearch3.defaultProps = {
  header: true,
}

export default LnbCustomSearch3
