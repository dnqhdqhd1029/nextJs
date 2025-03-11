/**
 * @file N01.tsx
 * @description N01 페이지
 */

import LnbCustomSearch1 from '~/publishing/components/common/layouts/LnbCustomSearch1'
import Button from '~/publishing/components/common/ui/Button'
import DatePickerRange from '~/publishing/components/common/ui/DatePickerRange'
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
          <div className="header-breadcrumb__section breadcrumb-title-type2 type-sticky">
            <div className="header-breadcrumb__group">
              <h2 className="header-breadcrumb__title">뉴스 검색</h2>
            </div>
          </div>

          <div className="flexible__section type-n2">
            <div className="flexible__group">
              <div className="flexible-item__group">
                <div className="flexible-item__contents">
                  <ul className="interval-mt16">
                    <li>
                      <h4 className="font-heading--h5">키워드</h4>
                      <p className="font-body__small color-secondary">
                        여러 개 입력 시 쉼표나 공백으로 분리. 정확한 단어 또는 문구 검색은 &#8220; &#8221;를 사용
                      </p>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <div className="after-and">
                            <FormInputText title={'모두 포함'} />
                          </div>
                        </li>
                        <li>
                          <div className="after-or">
                            <FormInputText title={'하나라도 포함'} />
                          </div>
                        </li>
                        <li>
                          <div className="after-not">
                            <FormInputText title={'제외'} />
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
                            <FormTitle title={'기간'} />

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
                                        <span className="select-form-option__item-text">오늘</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item">
                                        <span className="select-form-option__item-text">지난 3일</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-form-option__item is-selected">
                                        <span className="select-form-option__item-text">직접 입력</span>
                                      </button>
                                      <div className="select-form-option__item-date">
                                        <DatePickerRange />
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
                                    label={'2022-02-08 ~ 2022-03-08'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
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
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'저자'} />
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
                          <div className="select-form__section select-form-btn">
                            <FormTitle
                              title="논조"
                              tooltip={true}
                            >
                              <Tooltips
                                tooltipId={'tt10-5'}
                                tooltipPlace={'top'}
                                tooltipHtml={
                                  '뉴스 내용을 감성 분석해 분위기나 <br />보도 태도를 알려줍니다. 긍정, 부정, <br />중립 3가지 범주가 있습니다.'
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
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck121"
                                          id="ck121"
                                          label="옵션 1"
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
                              <FormInputText title={'태그'} />
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
                          <div className="select-form__section select-form-btn">
                            <FormTitle
                              title="연관도"
                              tooltip={true}
                            >
                              <Tooltips
                                tooltipId={'tt10-6'}
                                tooltipPlace={'top'}
                                tooltipHtml={
                                  '뉴스의 단어 중에서 입력한 키워드의 <br />등장 빈도를 분석해 검색어와 연관성<br />이 얼마나 높은지 알려줍니다. 높음, 중<br />간, 낮음 3가지 범주가 있습니다.'
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
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck121"
                                          id="ck121"
                                          label="옵션 1"
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
                            <FormInputText title={'URL'} />
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'발행 주기'} />
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
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'미디어 목록'} />
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
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'클립북'} />

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
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'클립북'} />
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
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'커버리지'} />

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
