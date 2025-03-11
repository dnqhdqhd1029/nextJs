/**
 * @file MbColumnList.tsx
 * @description 컬럼 형식의 선택 리스트
 */

import FormInputBtn from '~/components/common/ui/FormInputBtn'

const MbColumnList = () => {
  return (
    <div className="tree-menu__section">
      <div className="tree-menu__area">
        <div className="tree-menu__group type1">
          <ul className="tree-menu__list">
            <li>
              <button className="tree-menu__button is-selected">
                <span className="tree-menu__button-text">신문</span>
              </button>
            </li>
            <li>
              <button className="tree-menu__button">
                <span className="tree-menu__button-text">잡지</span>
              </button>
            </li>
            <li>
              <button className="tree-menu__button">
                <span className="tree-menu__button-text">방송</span>
              </button>
            </li>
            <li>
              <button className="tree-menu__button">
                <span className="tree-menu__button-text">온라인</span>
              </button>
            </li>
            <li>
              <button className="tree-menu__button">
                <span className="tree-menu__button-text">해외</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="tree-menu__group type2">
          <ul className="tree-menu__list">
            <li>
              <div className="tree-menu__button-input">
                <FormInputBtn
                  type="checkbox"
                  name="ck10"
                  id="ck10"
                  label="종합일간신문"
                  count={1000}
                />
              </div>
            </li>
          </ul>
          <div className="tree-menu-footer__group">
            <button
              type="button"
              className="tree-menu-footer__button"
            >
              전체 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MbColumnList
