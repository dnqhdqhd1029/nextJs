/**
 * @file LnbFilter.tsx
 * @description LnbFilter
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePickerRange from '~/publishing/components/common/ui/DatePickerRange'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const LnbFilter = () => {
  return (
    <div className="lnb-filter__section">
      <div className="lnb-filter__header">
        <h2 className="lnb-filter__header-title">필터</h2>
        <div className="lnb-filter__header-buttons">
          <Button
            label={'초기화'}
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
          />
          <Button
            label={'정렬'}
            cate={'ico-only'}
            size={'s32'}
            color={'transparent'}
            icoLeft={true}
            icoLeftData={icoSvgData.iconCloseButton2}
            icoSize={16}
          />
        </div>
      </div>

      <div className="lnb-filter__menu">
        <ul className="lnb-filter__menu-list">
          <li>
            {/* 클릭 시, is-opened 추가 */}
            {/* X 버튼(lnb-filter__menu-ico type-close) 클릭 이벤트 요소. */}
            <button
              type="button"
              className="lnb-filter__menu-depth1 is-opened"
            >
              <span className="lnb-filter__menu-txt">분야</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>

            {/* 3차 메뉴까지 있으면 type-submenu 추가 */}
            <ul className="lnb-filter-depth2__list type-submenu">
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                >
                  <span className="lnb-filter__menu-txt">전분야</span>
                  <span className="lnb-filter__menu-txt type-submenu">200</span>
                  <span className="lnb-filter__menu-ico type-chevron">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>

                <ul className="lnb-filter-depth3__list">
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck10"
                        id="ck10"
                        label="트위터"
                        count={165}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck11"
                        id="ck11"
                        label="페이스북"
                        count={115}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck12"
                        id="ck12"
                        label="인스타그램"
                        count={40}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <Button
                        label={'전체 선택'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button is-opened"
                >
                  <span className="lnb-filter__menu-txt">IT/전자</span>
                  <span className="lnb-filter__menu-txt type-submenu">200</span>
                  <span className="lnb-filter__menu-ico type-chevron">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>

                <ul className="lnb-filter-depth3__list">
                  <li>
                    <div className="lnb-filter__search">
                      <FormInputSearch />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck50"
                        id="ck50"
                        label="트위터"
                        count={165}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck51"
                        id="ck51"
                        label="페이스북"
                        count={115}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck52"
                        id="ck52"
                        label="인스타그램"
                        count={40}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <Button
                        label={'전체 선택'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                >
                  <span className="lnb-filter__menu-txt">금융/증권</span>
                  <span className="lnb-filter__menu-txt type-submenu">200</span>
                  <span className="lnb-filter__menu-ico type-chevron">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>

                <ul className="lnb-filter-depth3__list">
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck60"
                        id="ck60"
                        label="트위터"
                        count={165}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck61"
                        id="ck61"
                        label="페이스북"
                        count={115}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck62"
                        id="ck62"
                        label="인스타그램"
                        count={40}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <Button
                        label={'전체 선택'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                >
                  <span className="lnb-filter__menu-txt">산업</span>
                  <span className="lnb-filter__menu-txt type-submenu">200</span>
                  <span className="lnb-filter__menu-ico type-chevron">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>

                <ul className="lnb-filter-depth3__list">
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck70"
                        id="ck70"
                        label="트위터"
                        count={165}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck71"
                        id="ck71"
                        label="페이스북"
                        count={115}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <FormInputBtn
                        type="checkbox"
                        name="ck72"
                        id="ck72"
                        label="인스타그램"
                        count={40}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="lnb-filter-depth3__checkbox">
                      <Button
                        label={'전체 선택'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">지역</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">직종</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">매체 유형</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1 is-opened"
            >
              <span className="lnb-filter__menu-txt">매체 지수</span>
              <span className="lnb-filter__menu-txt type-count">상위 30%</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <ul className="lnb-filter-depth2__list">
              <li>
                <button className="lnb-filter-depth2__option">
                  <span className="lnb-filter-depth2__option-text">상위 10%</span>
                </button>
              </li>
              <li>
                <button className="lnb-filter-depth2__option">
                  <span className="lnb-filter-depth2__option-text">상위 20%</span>
                </button>
              </li>
              <li>
                <button className="lnb-filter-depth2__option is-selected">
                  <span className="lnb-filter-depth2__option-text">상위 30%</span>
                </button>
              </li>
              <li>
                <button className="lnb-filter-depth2__option">
                  <span className="lnb-filter-depth2__option-text">상위 40%</span>
                </button>
              </li>
              <li>
                <button className="lnb-filter-depth2__option">
                  <span className="lnb-filter-depth2__option-text">상위 50%</span>
                </button>
              </li>
              <li>
                <button
                  className="lnb-filter-depth2__option"
                  disabled
                >
                  <span className="lnb-filter-depth2__option-text">상위 60%</span>
                </button>
              </li>
              <li>
                <button
                  className="lnb-filter-depth2__option"
                  disabled
                >
                  <span className="lnb-filter-depth2__option-text">상위 70%</span>
                </button>
              </li>
              <li>
                <button
                  className="lnb-filter-depth2__option"
                  disabled
                >
                  <span className="lnb-filter-depth2__option-text">상위 80%</span>
                </button>
              </li>
              <li>
                <button
                  className="lnb-filter-depth2__option"
                  disabled
                >
                  <span className="lnb-filter-depth2__option-text">상위 90%</span>
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">발행 주기</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">포털 제휴</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1 is-opened"
            >
              <span className="lnb-filter__menu-txt">소셜 미디어</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <ul className="lnb-filter-depth2__list">
              <li>
                <div className="lnb-filter__search">
                  <FormInputSearch />
                </div>
              </li>
              <li>
                <div className="lnb-filter-depth2__checkbox">
                  <FormInputBtn
                    type="checkbox"
                    name="ck100"
                    id="ck100"
                    label="트위터"
                    count={165}
                  />
                </div>
              </li>
              <li>
                <div className="lnb-filter-depth2__checkbox">
                  <FormInputBtn
                    type="checkbox"
                    name="ck110"
                    id="ck110"
                    label="페이스북"
                    count={115}
                  />
                </div>
              </li>
              <li>
                <div className="lnb-filter-depth2__checkbox">
                  <FormInputBtn
                    type="checkbox"
                    name="ck120"
                    id="ck120"
                    label="인스타그램"
                    count={40}
                  />
                </div>
              </li>
              <li>
                <div className="lnb-filter-depth2__checkbox">
                  <Button
                    label={'전체 선택'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </div>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">정보 유형</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1"
            >
              <span className="lnb-filter__menu-txt">프로젝트</span>
              <span className="lnb-filter__menu-txt type-count">4</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1 is-opened"
            >
              <span className="lnb-filter__menu-txt">기간</span>
              <span className="lnb-filter__menu-txt type-count">2023.07.01 ~ 2023.07.01</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>
            <ul className="lnb-filter-depth2__list">
              <li>
                <DatePickerRange />
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="lnb-filter__menu-depth1 is-opened"
            >
              <span className="lnb-filter__menu-txt">기간</span>
              <span className="lnb-filter__menu-txt type-count">오늘</span>
              <div className="lnb-filter__menu-ico type-close">
                <IcoSvg data={icoSvgData.iconCloseButton2} />
              </div>
              <span className="lnb-filter__menu-ico type-chevron">
                <IcoSvg data={icoSvgData.chevronDown} />
              </span>
            </button>

            <ul className="lnb-filter-depth2__list type-date">
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button is-selected"
                >
                  <span className="lnb-filter__menu-txt">오늘</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                >
                  <span className="lnb-filter__menu-txt">지난 3일</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                >
                  <span className="lnb-filter__menu-txt">지난 일주일</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                  disabled={true}
                >
                  <span className="lnb-filter__menu-txt">지난 한달</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                  disabled={true}
                >
                  <span className="lnb-filter__menu-txt">지난 3개월</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button"
                  disabled={true}
                >
                  <span className="lnb-filter__menu-txt">지난 1년</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="lnb-filter-depth2__button is-selected is-opened"
                >
                  <span className="lnb-filter__menu-txt">직접 입력</span>
                </button>

                <ul className="lnb-filter-depth3__list">
                  <li>
                    <DatePickerRange />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LnbFilter
