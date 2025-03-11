/**
 * @file PJ03.tsx
 * @description PJ03 페이지
 */

import IcoSvg from '~/components/common/ui/IcoSvg'
import LnbCustomSearch3 from '~/publishing/components/common/layouts/LnbCustomSearch6'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
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
                  <h2 className="s-header__title">전체 프로젝트</h2>
                  <ul className="s-header__control">
                    <li className="select">
                      <div className="select__section select-type1-small">
                        <button className="select__label">
                          <span className="select__label-text">소유자</span>
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
                                  <span className="select-option__item-text">수정</span>
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
                                  <span className="select-option__item-text">비공개</span>
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
                                  <span className="select-option__item-text">수정</span>
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
                                  <span className="select-option__item-text">비공개</span>
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
                                  <span className="select-option__item-text">매체 지수</span>
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
                                  <span className="select-option__item-text">매체명</span>
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
                        label={'프로젝트 만들기'}
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
                      <div className="list-card-type1__section">
                        <ul className="list-card-type1__list">
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">
                                      브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스
                                      보도의 상호
                                    </h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            <IcoSvg data={icoSvgData.personLineBroken} />
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">갤럭시 Z 폴드3 프로모션</h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            <IcoSvg data={icoSvgData.personLineBroken} />
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">
                                      브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스
                                      보도의 상호
                                    </h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            <IcoSvg data={icoSvgData.personLineBroken} />
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">갤럭시 Z 폴드3 프로모션</h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            {/* <IcoSvg data={icoSvgData.personLineBroken} /> */}
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">
                                      브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스
                                      보도의 상호
                                    </h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            <IcoSvg data={icoSvgData.personLineBroken} />
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            {/* [D] search-card-type1__item 전체 영역 링크 */}
                            <div className="list-card-type1__item">
                              <ul className="interval-mt20">
                                <li>
                                  <div className="list-card-type1-item__header">
                                    <h5 className="header-title">갤럭시 Z 폴드3 프로모션</h5>
                                    <div className="header-more">
                                      <div className="select__section select-type1-small select-ico-only select-align-right">
                                        <button className="select__label ico-size16">
                                          <span className="select__label-text">더보기</span>
                                          <IcoSvg data={icoSvgData.threeDotsVertical} />
                                        </button>

                                        <div className="select-option__section">
                                          <div className="select-option__area">
                                            <ul className="select-option__group">
                                              <li>
                                                <button className="select-option__item is-selected">
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
                                  </div>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'모니터링'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">2</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'클립북'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'보도자료'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'활동'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <Button
                                            elem="a"
                                            url={'#!'}
                                            label={'목록'}
                                            cate={'link-text-arrow'}
                                            size={'m'}
                                            color={'body-text'}
                                            icoRight={true}
                                            icoRightData={icoSvgData.chevronRight}
                                          />
                                        </li>
                                        <li>
                                          <p className="font-body__regular color-primary">3</p>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <ul className="interval-mt5">
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">수정자</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">홍길동</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">최종 수정</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2022-05-18</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">소유자</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
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
                                            {/* <IcoSvg data={icoSvgData.personLineBroken} /> */}
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">생성일</p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">2021-12-26</p>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <ul className="grid-col2 type-interval8">
                                        <li>
                                          <p className="font-body__regular">구분</p>
                                        </li>
                                        <li>
                                          <div className="project-item__select">
                                            <div className="select__section select-type2-pd">
                                              <button className="select__label">
                                                <span className="select__label-text">비공개</span>
                                                <IcoSvg data={icoSvgData.chevronDown} />
                                              </button>

                                              <div className="select-option__section">
                                                <div className="select-option__area">
                                                  <ul className="select-option__group">
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">공개</span>
                                                      </button>
                                                    </li>
                                                    <li>
                                                      <button className="select-option__item">
                                                        <span className="select-option__item-text">비공개</span>
                                                      </button>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
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
