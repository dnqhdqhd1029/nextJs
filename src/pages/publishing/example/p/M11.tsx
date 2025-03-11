/**
 * @file M11.tsx
 * @description M11 페이지
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
                  <li>
                    <button
                      type="button"
                      className="tabs-menu__btn"
                    >
                      <span className="tabs-menu__name">언론인 검색</span>
                    </button>
                  </li>
                  <li className="is-active">
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
                              title={'미디어 그룹'}
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
                            <FormTitle title={'언론인 목록'} />

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
                            <FormTitle
                              title={'기자명 노출'}
                              tooltip={true}
                            >
                              <Tooltips
                                tooltipId={'tt10-4'}
                                tooltipPlace={'top'}
                                tooltipHtml={
                                  '미디어에서 보도한 뉴스에 기자명 <br />정보가 있는지 여부를 확인할 수 <br />있습니다.'
                                }
                                tooltipComponent={<IcoTooltip />}
                              />
                            </FormTitle>

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
                                          name="ck1"
                                          id="ck1"
                                          label="옵션 1"
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
