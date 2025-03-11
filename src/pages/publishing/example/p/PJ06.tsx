/**
 * @file PJ06.tsx
 * @description PJ06 페이지
 */

import LnbCustomSearch3 from '~/publishing/components/common/layouts/LnbCustomSearch3'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="project-header__section">
        <ul className="interval-mt12">
          <li>
            <div className="project-header-control__group">
              <ul className="project-header-control__list">
                <li className="control-path">
                  <div className="control-path-arrow">
                    <Button
                      label={'arrowLeft'}
                      cate={'ico-only'}
                      size={'s'}
                      color={'body-text'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.arrowLeft}
                      icoSize={24}
                    />
                  </div>
                  <h4 className="control-path-name">갤럭시 Z 폴드3 프로모션</h4>
                </li>
                <li className="control-obj">
                  <div className="control-obj-select">
                    <div className="select__section select-type1-small select-line select-align-right">
                      <button className="select__label">
                        <span className="select__label-text">작업</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>

                      <div className="select-option__section">
                        <div className="select-option__area">
                          <ul className="select-option__group">
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">수정하기</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">삭제하기</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">공유하기</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="project-header-tabs__group">
              <div className="tabs__section type1-small">
                <div className="tabs-menu__group">
                  <ul className="tabs-menu__list">
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">개요</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">모니터링</span>
                        <span className="tabs-menu__number">2</span>
                      </button>
                    </li>
                    <li className="is-active">
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">클립북</span>
                        <span className="tabs-menu__number">3</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">목록</span>
                        <span className="tabs-menu__number">5</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">활동</span>
                        <span className="tabs-menu__number">24</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-container">
        <div className="mb-common-inner">
          <div className="mb-lnb__section type-w1 overflow-y">
            <LnbCustomSearch3 header={false} />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__header">
                <div className="search-result__header">
                  <ul className="interval-mt10">
                    <li>
                      <div className="search-result__header-sort type-pl-14">
                        <FormInputBtn
                          type="checkbox"
                          name="total1"
                          id="total1"
                          label="총 4개"
                        />
                        <div className="header-sort__action">
                          <Button
                            label={'보도자료 배포'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <Button
                            label={'이메일 보내기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <Button
                            label={'삭제하기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <Button
                            label={'공유 설정 수정'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                        </div>
                        <div className="header-sort__filter">
                          <ul className="s-header__control">
                            <li className="toggle">
                              <FormInputToggle
                                name="cT13"
                                id="cT13"
                                label="MY"
                                reverse={true}
                              />
                            </li>
                            <li className="select">
                              <div className="select__section select-type1-small">
                                <button className="select__label">
                                  <span className="select__label-text">구분</span>
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </button>

                                <div className="select-option__section">
                                  <div className="select-option__area">
                                    <ul className="select-option__group">
                                      <li>
                                        <button className="select-option__item is-selected">
                                          <span className="select-option__item-text">전체</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">비공개</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">공개</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">수정</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="filter">
                              <Button
                                label={'검색'}
                                cate={'ico-only'}
                                size={'s'}
                                color={'body-text'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.search}
                                icoSize={18}
                              />
                              <div className="select__section select-type1-small select-ico-only select-align-right">
                                <button className="select__label ico-size24">
                                  <span className="select__label-text">필터(내림차순)</span>
                                  <IcoSvg data={icoSvgData.sortDown} />
                                </button>

                                <div className="select-option__section">
                                  <div className="select-option__area">
                                    <h6 className="select-option__group-title">정렬</h6>
                                    <ul className="select-option__group">
                                      <li>
                                        <button className="select-option__item is-selected">
                                          <span className="select-option__item-text">미디어 가치</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">관련성</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">이름</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">미디어명</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                    <h6 className="select-option__group-title">순서</h6>
                                    <ul className="select-option__group">
                                      <li>
                                        <button className="select-option__item is-selected">
                                          <span className="select-option__item-text">내림차순</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">오름차순</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-contents-layout__contents">
                <div className="search-result__contents">
                  <ul className="interval-mt12">
                    {/* 검색창 */}
                    <li>
                      <div className="search-result__search">
                        <FormInputSearch placeholder={'검색'} />
                        <Button
                          label={'정렬'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'transparent'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                    </li>

                    {/* 검색 리스트 나열 */}
                    <li>
                      <div className="search-result__list">
                        <div className="list-type4__section">
                          <ul className="list-type4__group">
                            <li>
                              {/* 클릭 시 이동 */}
                              {/* 
                                  [D] 개발
                                    ㄴ 셀렉트박스, 버튼 등을 클릭했을 때
                                    ㄴ search-type4-item__section 영역에 is-not-active 클래스 추가.
                              */}
                              <div className="list-type4-item__section is-not-active">
                                <ul className="list-type4-item__list">
                                  <li className="list-type4-item__title type-flex-grow">
                                    <p className="list-type4-item__text">
                                      <span>list-type4 참고</span>
                                      {/* <IcoSvg data={icoSvgData.personLineBroken} />
                                      <IcoSvg data={icoSvgData.bell} /> */}
                                    </p>
                                  </li>
                                  <li className="list-type4-item__group">
                                    <p className="list-type4-item__text">전체 그룹</p>
                                  </li>
                                  <li className="list-type4-item__category">
                                    <p className="list-type4-item__text">캠페인</p>
                                  </li>
                                  <li className="list-type4-item__share-filter">
                                    <div className="select__section select-type1-small">
                                      <button className="select__label">
                                        <span className="select__label-text">구분</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">전체</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">비공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__share-group">
                                    <div className="select__section select-type2-pd">
                                      <button className="select__label">
                                        <span className="select__label-text">홍길동</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option-search__section">
                                          <FormInputSearch placeholder={'검색'} />
                                        </div>

                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">김세연</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이동욱</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">홍길동</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">최진욱</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__history">
                                    <div className="list-type4-item__history-user">
                                      <p className="list-type4-item__text">홍길동 수정</p>
                                    </div>
                                    <div className="list-type4-item__history-date">
                                      <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__more">
                                    <div className="select__section select-type1-small select-ico-only select-align-right">
                                      <button className="select__label ico-size16">
                                        <span className="select__label-text">설정</span>
                                        <IcoSvg data={icoSvgData.threeDotsVertical} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">공유하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이메일 발송 차단</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">삭제하기</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              {/* 클릭 시 이동 */}
                              <div className="list-type4-item__section">
                                <ul className="list-type4-item__list">
                                  <li className="list-type4-item__title type-flex-grow">
                                    <p className="list-type4-item__text">
                                      <span>삼성전자</span>
                                      <IcoSvg data={icoSvgData.personLineBroken} />
                                      <IcoSvg data={icoSvgData.bell} />
                                    </p>
                                  </li>
                                  <li className="list-type4-item__group">
                                    <p className="list-type4-item__text">전체 그룹</p>
                                  </li>
                                  <li className="list-type4-item__category">
                                    <p className="list-type4-item__text">캠페인</p>
                                  </li>
                                  <li className="list-type4-item__share-filter">
                                    <div className="select__section select-type1-small">
                                      <button className="select__label">
                                        <span className="select__label-text">구분</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">전체</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">비공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__share-group">
                                    <div className="select__section select-type2-pd">
                                      <button className="select__label">
                                        <span className="select__label-text">홍길동</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option-search__section">
                                          <FormInputSearch placeholder={'검색'} />
                                        </div>

                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">김세연</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이동욱</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">홍길동</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">최진욱</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__history">
                                    <div className="list-type4-item__history-user">
                                      <p className="list-type4-item__text">홍길동 수정</p>
                                    </div>
                                    <div className="list-type4-item__history-date">
                                      <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__more">
                                    <div className="select__section select-type1-small select-ico-only select-align-right">
                                      <button className="select__label ico-size16">
                                        <span className="select__label-text">설정</span>
                                        <IcoSvg data={icoSvgData.threeDotsVertical} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">공유하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이메일 발송 차단</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">삭제하기</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              {/* 클릭 시 이동 */}
                              <div className="list-type4-item__section">
                                <ul className="list-type4-item__list">
                                  <li className="list-type4-item__title type-flex-grow">
                                    <p className="list-type4-item__text">
                                      <span>삼성전자</span>
                                      {/* <IcoSvg data={icoSvgData.personLineBroken} /> */}
                                      <IcoSvg data={icoSvgData.bell} />
                                    </p>
                                  </li>
                                  <li className="list-type4-item__group">
                                    <p className="list-type4-item__text">전체 그룹</p>
                                  </li>
                                  <li className="list-type4-item__category">
                                    <p className="list-type4-item__text">캠페인</p>
                                  </li>
                                  <li className="list-type4-item__share-filter">
                                    <div className="select__section select-type1-small">
                                      <button className="select__label">
                                        <span className="select__label-text">구분</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">전체</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">비공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">공개</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정</span>
                                                <span className="select-option__item-ico">
                                                  <IcoSvg data={icoSvgData.checkThick} />
                                                </span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__share-group">
                                    <div className="select__section select-type2-pd">
                                      <button className="select__label">
                                        <span className="select__label-text">홍길동</span>
                                        <IcoSvg data={icoSvgData.chevronDown} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option-search__section">
                                          <FormInputSearch placeholder={'검색'} />
                                        </div>

                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">김세연</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이동욱</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">홍길동</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">최진욱</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__history">
                                    <div className="list-type4-item__history-user">
                                      <p className="list-type4-item__text">홍길동 수정</p>
                                    </div>
                                    <div className="list-type4-item__history-date">
                                      <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                                    </div>
                                  </li>
                                  <li className="list-type4-item__more">
                                    <div className="select__section select-type1-small select-ico-only select-align-right">
                                      <button className="select__label ico-size16">
                                        <span className="select__label-text">설정</span>
                                        <IcoSvg data={icoSvgData.threeDotsVertical} />
                                      </button>

                                      <div className="select-option__section">
                                        <div className="select-option__area">
                                          <ul className="select-option__group">
                                            <li>
                                              <button className="select-option__item is-selected">
                                                <span className="select-option__item-text">공유하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">이메일 발송 차단</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">수정하기</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button className="select-option__item">
                                                <span className="select-option__item-text">삭제하기</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-contents-layout__footer">
                <div className="search-result__footer">
                  <Pagination cate={'n3'} />
                  <Pagination cate={'n4'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT2'
