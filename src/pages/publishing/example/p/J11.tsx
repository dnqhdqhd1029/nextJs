/**
 * @file J11.tsx
 * @description J11 페이지
 */

import LnbCustomSearch1 from '~/publishing/components/common/layouts/LnbCustomSearch1'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-contents overflow-y">
          <div className="header-breadcrumb__section type-sticky">
            <div className="tabs__section type1-medium">
              <div className="tabs-menu__group">
                <ul className="tabs-menu__list">
                  <li className="is-active">
                    <button
                      type="button"
                      className="tabs-menu__btn"
                    >
                      <span className="tabs-menu__name">언론인 검색</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="tabs-menu__btn"
                    >
                      <span className="tabs-menu__name">미디어 검색</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flexible__section type-n2">
            <div className="flexible__group">
              <div className="flexible-item__group">
                <div className="flexible-item__contents">
                  <ul className="interval-mt16">
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'이름'} />
                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck100"
                                          id="ck100"
                                          label="옵션 20"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck101"
                                          id="ck101"
                                          label="옵션 21"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck102"
                                          id="ck102"
                                          label="옵션 22"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <FormInputText
                            title={'뉴스'}
                            tooltip={true}
                          >
                            <Tooltips
                              tooltipId={'tt10-4'}
                              tooltipPlace={'top'}
                              tooltipHtml={
                                '최근 3개월 이내 뉴스에서 특정 단어를 <br />언급한 언론인을 검색합니다. 단어 사이에 <br />and, or, not 등 불리언 연산자를 사용하고, <br />여러 단어로 된 문장은 따옴표("")로 <br />묶어서 검색할 수 있습니다.'
                              }
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormInputText>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'미디어 분야'} />
                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck120"
                                          id="ck120"
                                          label="옵션 120"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck121"
                                          id="ck121"
                                          label="옵션 121"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck121"
                                          id="ck122"
                                          label="옵션 122"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  <div className="select-form-footer__group">
                                    <button
                                      type="button"
                                      className="select-form-footer__button"
                                    >
                                      분야 그룹별 선택하기
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="button-select-style__section">
                            <div className="button-select-style__group">
                              <FormTitle title={'지역'} />
                              <button
                                type="button"
                                className="button-select-style__button"
                              >
                                <span className="button-select-style__button-txt">선택</span>
                                <span className="button-select-style__button-ico">
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </span>
                              </button>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'미디어명'} />
                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck110"
                                          id="ck110"
                                          label="옵션 20"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck111"
                                          id="ck111"
                                          label="옵션 21"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck112"
                                          id="ck112"
                                          label="옵션 22"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="button-select-style__section">
                            <div className="button-select-style__group">
                              <FormTitle title={'미디어 유형'} />
                              <button
                                type="button"
                                className="button-select-style__button"
                              >
                                <span className="button-select-style__button-txt">선택</span>
                                <span className="button-select-style__button-ico">
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </span>
                              </button>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'직종'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck121"
                                          id="ck121"
                                          label="옵션 1"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck122"
                                          id="ck122"
                                          label="옵션 2"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck123"
                                          id="ck123"
                                          label="옵션 3"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck124"
                                          id="ck124"
                                          label="옵션 4"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck125"
                                          id="ck125"
                                          label="옵션 5"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck126"
                                          id="ck126"
                                          label="옵션 6"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="ipt-text__section">
                            <FormInputText
                              title={'직책'}
                              addBtn={true}
                            />
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="ipt-text__section">
                            <FormInputText
                              title={'키워드'}
                              addBtn={true}
                            />
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="ipt-text__section">
                            <FormInputText
                              title={'부서'}
                              addBtn={true}
                            />
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'미디어 가치'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          비공개 (소유자만 보고 수정할 수 있음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">
                                          수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'발행 주기'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck131"
                                          id="ck131"
                                          label="옵션 1"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck132"
                                          id="ck132"
                                          label="옵션 2"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck133"
                                          id="ck133"
                                          label="옵션 3"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck134"
                                          id="ck134"
                                          label="옵션 4"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck135"
                                          id="ck135"
                                          label="옵션 5"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck136"
                                          id="ck136"
                                          label="옵션 6"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="flexible-search__button">
                        <div className="flexible-search__button-reset">
                          <Button
                            label={'초기화'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </div>
                        <div className="flexible-search__button-search">
                          <Button
                            label={'검색'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            disabled={true}
                          />
                        </div>
                        <div className="flexible-search__button-save">
                          {/* 버튼 검색 저장일 때 */}
                          <Button
                            label={'검색저장'}
                            cate={'default'}
                            size={'m'}
                            color={'outline-secondary'}
                            disabled={true}
                          />

                          {/* 드롭다운 형태 검색 저장일 때 */}
                          {/* <div className="select__section select-type1-medium select-line select-align-right">
                            <button className="select__label">
                              <span className="select__label-text">검색저장</span>
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </button>

                            <div className="select-option__section">
                              <div className="select-option__area">
                                <ul className="select-option__group">
                                  <li>
                                    <button className="select-option__item">
                                      <span className="select-option__item-text">이메일 보내기</span>
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
                          </div> */}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flexible__group">
              <div className="flexible-item__group type-pb1">
                <ul className="interval-mt16">
                  <li>
                    <h4 className="font-heading--h5">추가 검색 조건</h4>
                  </li>
                  <li>
                    <div className="flexible-item__contents">
                      <ul>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'미디어 목록'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck1"
                                          id="ck1"
                                          label="옵션 1"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck2"
                                          id="ck2"
                                          label="옵션 2"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck3"
                                          id="ck3"
                                          label="옵션 3"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck4"
                                          id="ck4"
                                          label="옵션 4"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck5"
                                          id="ck5"
                                          label="옵션 5"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck6"
                                          id="ck6"
                                          label="옵션 6"
                                          count={10}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'미디어 분야'} />
                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck20"
                                          id="ck20"
                                          label="옵션 20"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck21"
                                          id="ck21"
                                          label="옵션 21"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck22"
                                          id="ck22"
                                          label="옵션 22"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  <div className="select-form-footer__group">
                                    <button
                                      type="button"
                                      className="select-form-footer__button"
                                    >
                                      분야 그룹별 선택하기
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="button-select-style__section">
                            <div className="button-select-style__group">
                              <FormTitle title={'미디어 지역'} />
                              <button
                                type="button"
                                className="button-select-style__button"
                              >
                                <span className="button-select-style__button-txt">선택</span>
                                <span className="button-select-style__button-ico">
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </span>
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'미디어 그룹'} />
                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck30"
                                          id="ck30"
                                          label="옵션 20"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck31"
                                          id="ck31"
                                          label="옵션 21"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck32"
                                          id="ck32"
                                          label="옵션 22"
                                          count={100}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'포털 제휴'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck41"
                                          id="ck41"
                                          label="옵션 1"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck42"
                                          id="ck42"
                                          label="옵션 2"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck43"
                                          id="ck43"
                                          label="옵션 3"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck44"
                                          id="ck44"
                                          label="옵션 4"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck45"
                                          id="ck45"
                                          label="옵션 5"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck46"
                                          id="ck46"
                                          label="옵션 6"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'프로젝트명'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck51"
                                          id="ck51"
                                          label="옵션 1"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck52"
                                          id="ck52"
                                          label="옵션 2"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck53"
                                          id="ck53"
                                          label="옵션 3"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck54"
                                          id="ck54"
                                          label="옵션 4"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck55"
                                          id="ck55"
                                          label="옵션 5"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck56"
                                          id="ck56"
                                          label="옵션 6"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'소셜미디어'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck61"
                                          id="ck61"
                                          label="옵션 1"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck62"
                                          id="ck62"
                                          label="옵션 2"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck63"
                                          id="ck63"
                                          label="옵션 3"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck64"
                                          id="ck64"
                                          label="옵션 4"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck65"
                                          id="ck65"
                                          label="옵션 5"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck66"
                                          id="ck66"
                                          label="옵션 6"
                                          count={17}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                              <div className="tags__delete">
                                <Button
                                  label={'모두 제거'}
                                  cate={'link-text'}
                                  size={'s'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'언어'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          비공개 (소유자만 보고 수정할 수 있음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">
                                          수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'소속 매체수'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          비공개 (소유자만 보고 수정할 수 있음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">
                                          공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">
                                          수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'정보 유형'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">옵션1</span>
                                        <span className="select-form-option__item-count">100</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">옵션2</span>
                                        <span className="select-form-option__item-count">100</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">옵션3</span>
                                        <span className="select-form-option__item-count">100</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'차단 여부'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">옵션1</span>
                                        <span className="select-form-option__item-count">100</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">옵션2</span>
                                        <span className="select-form-option__item-count">100</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">옵션3</span>
                                        <span className="select-form-option__item-count">100</span>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-aside__section type-w1">
          <LnbCustomSearch1 />
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
