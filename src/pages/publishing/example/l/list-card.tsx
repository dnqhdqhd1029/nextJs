/**
 * @file table.tsx
 * @description table 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">list card</h1>

        <h2 className="guide__title">list-card-type1</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-card-type1__section">
              <ul className="list-card-type1__list">
                <li>
                  {/* [D] search-card-type1__item 전체 영역 링크 */}
                  <div className="list-card-type1__item">
                    <ul className="interval-mt20">
                      <li>
                        <div className="list-card-type1-item__header">
                          <h5 className="header-title">
                            브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스 보도의 상호
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
                            <div className="select__section select-type1-small select-ico-only select-align-right is-show">
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
                            브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스 보도의 상호
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
                            브랜드별 휴일 매출과 미디어 뉴스 보도의 상호 브랜드별 휴일 매출과 미디어 뉴스 보도의 상호
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
                                              <span className="select-option__item-text">비공개</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">공개</span>
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
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
