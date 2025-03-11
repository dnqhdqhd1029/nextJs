/**
 * @file J23.tsx
 * @description J23 페이지
 */

import LnbCustomSearch3 from '~/publishing/components/common/layouts/LnbCustomSearch3'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1 overflow-y">
          <LnbCustomSearch3 />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="search-result__header">
                <div className="search-result-type2__header">
                  <h2 className="s-header__title">언론인</h2>
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
                    <li className="button">
                      <Button
                        elem="a"
                        url="#!"
                        label={'언론인 검색'}
                        cate={'default'}
                        size={'m'}
                        color={'primary'}
                      />
                    </li>
                  </ul>
                </div>
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
                            <div className="list-type4-item__section">
                              <ul className="list-type4-item__list">
                                <li className="list-type4-item__title type-flex-grow">
                                  <p className="list-type4-item__text">
                                    <span>삼성전자</span>
                                    <IcoSvg data={icoSvgData.personLineBroken} />
                                  </p>
                                </li>
                                <li className="list-type4-item__group">
                                  <p className="list-type4-item__text">전체 그룹</p>
                                </li>
                                <li className="list-type4-item__share-filter">
                                  <div className="select__section select-type1-small">
                                    <button
                                      className="select__label"
                                      style={{
                                        position: 'relative',
                                        zIndex: 1,
                                      }}
                                      onClick={e => {
                                        e.stopPropagation()
                                      }}
                                    >
                                      <span className="select__label-text">구분1</span>
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
                                  </p>
                                </li>
                                <li className="list-type4-item__group">
                                  <p className="list-type4-item__text">전체 그룹</p>
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
                                  </p>
                                </li>
                                <li className="list-type4-item__group">
                                  <p className="list-type4-item__text">전체 그룹</p>
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
