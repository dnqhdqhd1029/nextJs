/**
 * @file form-application.tsx
 * @description form-application 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePickerRange from '~/publishing/components/common/ui/DatePickerRange'
import FileUploader2 from '~/publishing/components/common/ui/FileUploader2'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
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
      <section className="guide__section">
        <h2 className="guide__title">Form 검색</h2>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">첨부</h2>
          <div className="guide__group">
            <FileUploader2 />
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">셀렉트</h2>
          <div className="guide__group">
            <div className="select-form__section select-form-btn is-selected is-show">
              <FormTitle title={'회원'} />

              <div className="select-form__group">
                <button className="select-form__label">
                  <span className="select-form__label-text">선택 (현재 1명)</span>
                  <IcoSvg data={icoSvgData.chevronDown} />
                </button>

                <div className="select-form-option__section">
                  <div className="select-form-option__area">
                    <ul className="select-form-option__group">
                      <li>
                        <div className="select-form-option__item-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck5100"
                            id="ck5100"
                            label="옵션 1"
                            checked={true}
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
            </div>
          </div>
        </div>
        <div style={{ marginTop: '200px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">input 추가버튼</h2>
          <div className="guide__group">
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
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">셀렉트형태의 버튼</h2>
          <div className="guide__group">
            <div className="button-select-style__section">
              <div className="button-select-style__group">
                <FormTitle title={'매체 유형'} />
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
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">버튼 + tags</h2>
          <div className="guide__group">
            <div className="button-select-style__section">
              <div className="button-select-style__group">
                <FormTitle title="언론인 목록" />
                <Button
                  label={'목록 선택'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
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
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">타이틀 툴팁</h2>
          <div className="guide__group">
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
          </div>
          <div className="guide__group">
            <div className="select-form__section select-form-btn">
              <FormTitle
                title="타이틀 툴팁"
                tooltip={true}
              >
                <Tooltips
                  tooltipId={'tt10-5'}
                  tooltipPlace={'top'}
                  tooltipHtml={'셀렉트박스와 툴팁'}
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
          </div>
          <div className="guide__group">
            <div className="select-form__section select-form-btn">
              <FormTitle
                title="타이틀 툴팁 + 체크박스옵션"
                tooltip={true}
              >
                <Tooltips
                  tooltipId={'tt10-5'}
                  tooltipPlace={'top'}
                  tooltipHtml={'셀렉트박스와 툴팁'}
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
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">tags 적용 시 접힌 형태</h2>
          <div className="guide__group">
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
              {/* tags 태그 */}
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
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '30px' }}
          >
            <div className="mb-contents-pb16__group">
              <div className="ipt-btn__section add-pb10">
                <FormTitle
                  title={'받는 사람'}
                  required={true}
                />
                <ul className="ipt-btn__list--row">
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-0"
                      label="언론인"
                      checked
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-1"
                      label="매체"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-2"
                      label="언론인 목록"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-3"
                      label="매체 목록"
                    />
                  </li>
                </ul>
              </div>

              <div className="select-form__section select-form-input">
                <div className="select-form__group">
                  <FormInputText />
                  <div className="select-form-option__section">
                    <FormInputSearch placeholder={'검색'} />
                    <div className="select-form-option__area">
                      <ul className="select-form-option__group">
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck30"
                              id="ck30"
                              label="옵션 30"
                              subLabel="머니투데이, the300"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck31"
                              id="ck31"
                              label="옵션 31"
                              subLabel="소비자평가신문"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck32"
                              id="ck32"
                              label="옵션 32"
                              subLabel="비즈니스리포트"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tags__section">
                <ul className="tags__list">
                  <li>
                    <Tag
                      label={'박가연'}
                      subLabel="중알일보"
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                  <li>
                    <Tag
                      label={'중앙일보'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30px', maxWidth: '600px' }}>
          <h2 className="guide__item--title">input + 셀렉트 + tags</h2>
          <div className="guide__group">
            <div className="select-form__section select-form-input is-show">
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
                    <div className="select-form-footer__group">
                      <button
                        type="button"
                        className="select-form-footer__button button-tag"
                      >
                        "갤럭시" 새 태그 만들기
                      </button>
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
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '150px' }}
          >
            <div className="select-form__section select-form-btn is-show">
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
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '120px' }}
          >
            <div className="select-form__section select-form-btn is-show">
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
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '120px' }}
          >
            <div className="select-form__section select-form-btn is-show">
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
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '150px' }}
          >
            <div className="form-3vs7__section">
              <FormTitle title="관련 언론인과 매체" />
              <div className="form-3vs7__group">
                <div className="elem-3">
                  <div className="select-form__section select-form-btn is-show">
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
                </div>
                <div className="elem-7">
                  {/* input 형태 */}
                  {/* <div className="select-form__section select-form-input is-show">
                    <div className="select-form__group">
                      <FormInputText />
                      <div className="select-form-option__section">
                        <div className="select-form-option__area">
                          <ul className="select-form-option__group">
                            <li>
                              <div className="select-form-option__item-input">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck30"
                                  id="ck30"
                                  label="옵션 30"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="select-form-option__item-input">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck31"
                                  id="ck31"
                                  label="옵션 31"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="select-form-option__item-input">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck32"
                                  id="ck32"
                                  label="옵션 32"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* 셀렉트 형태 */}
                  <div className="select-form__section select-form-btn is-show">
                    <div className="select-form__group">
                      <button className="select-form__label">
                        <span className="select-form__label-text">선택</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>

                      <div className="select-form-option__section">
                        <div className="select-option-search__section">
                          <FormInputSearch placeholder={'검색'} />
                        </div>

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
                  </div>
                </div>
              </div>
              <div className="tags__section">
                <ul className="tags__list">
                  <li>
                    <Tag
                      label={'박가연'}
                      subLabel="중알일보"
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                  <li>
                    <Tag
                      label={'중앙일보'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '200px' }}
          >
            <div className="mb-contents-pb16__group">
              <div className="ipt-btn__section add-pb10">
                <FormTitle
                  title={'받는 사람'}
                  required={true}
                />
                <ul className="ipt-btn__list--row">
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-0"
                      label="언론인"
                      checked
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-1"
                      label="매체"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-2"
                      label="언론인 목록"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-10"
                      id="rdo-10-3"
                      label="매체 목록"
                    />
                  </li>
                </ul>
              </div>

              <div className="select-form__section select-form-input is-show">
                <div className="select-form__group">
                  <FormInputText />
                  <div className="select-form-option__section">
                    <div className="select-form-option__area">
                      <ul className="select-form-option__group">
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck30"
                              id="ck30"
                              label="옵션 30"
                              subLabel="머니투데이, the300"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck31"
                              id="ck31"
                              label="옵션 31"
                              subLabel="소비자평가신문"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck32"
                              id="ck32"
                              label="옵션 32"
                              subLabel="비즈니스리포트"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tags__section">
                <ul className="tags__list">
                  <li>
                    <Tag
                      label={'박가연'}
                      subLabel="중알일보"
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                  <li>
                    <Tag
                      label={'중앙일보'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '150px' }}
          >
            <div className="mb-contents-pb16__group">
              <div className="ipt-btn__section add-pb10">
                <FormTitle
                  title={'받는 사람'}
                  required={true}
                />
                <ul className="ipt-btn__list--row">
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-100"
                      id="rdo-100-0"
                      label="언론인 목록"
                      checked
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-100"
                      id="rdo-100-1"
                      label="매체 목록"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-100"
                      id="rdo-100-2"
                      label="언론인"
                    />
                  </li>
                  <li>
                    <FormInputBtn
                      type="radio"
                      name="rdo-100"
                      id="rdo-100-3"
                      label="매체"
                    />
                  </li>
                </ul>
              </div>

              <div className="select-form__section select-form-btn is-show">
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
                              name="ck1000"
                              id="ck1000"
                              label="정보보안 전문 미디어"
                              desc="40개(이메일 12개)"
                              history="2022-10-24 홍길동 최종 수정"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck1001"
                              id="ck1001"
                              label="소프트웨어 전문 기자"
                              desc="40개(이메일 12개)"
                              history="2022-10-24 홍길동 최종 수정"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tags__section">
                <ul className="tags__list">
                  <li>
                    <Tag
                      label={'박가연'}
                      subLabel="중알일보"
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                  <li>
                    <Tag
                      label={'중앙일보'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '70px' }}
          >
            <div className="title-select__section">
              <div className="title-select__header">
                <p className="aside-monitoring-table__title">태그</p>
                <div className="select-form__section select-form-editor">
                  <div className="select-form__group">
                    <button className="select__label">
                      <span className="hidden">편집</span>
                      <b className="ico">
                        <IcoSvg data={icoSvgData.pencilFill2} />
                      </b>
                      <b className="arrow">
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </b>
                    </button>

                    <div className="select-form-option__section">
                      <FormInputSearch placeholder={'검색'} />
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck30"
                                id="ck30"
                                label="옵션 30"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck31"
                                id="ck31"
                                label="옵션 31"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck32"
                                id="ck32"
                                label="옵션 32"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="select-form-footer__group">
                          <button
                            type="button"
                            className="select-form-footer__button button-tag"
                          >
                            "갤럭시" 새 태그 만들기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-select__tags">
                <div className="tags__section">
                  <ul className="tags__list">
                    <li>
                      <Tag
                        label={'태그1'}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                      />
                    </li>
                    <li>
                      <Tag
                        label={'태그2'}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="guide__group"
            style={{ marginTop: '20px' }}
          >
            <div className="title-select__section">
              <div className="title-select__header">
                <p className="aside-monitoring-table__title">태그</p>
                <div className="select-form__section select-form-editor is-show">
                  <div className="select-form__group">
                    <button className="select__label">
                      <span className="hidden">편집</span>
                      <b className="ico">
                        <IcoSvg data={icoSvgData.pencilFill2} />
                      </b>
                      <b className="arrow">
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </b>
                    </button>

                    <div className="select-form-option__section">
                      <FormInputSearch placeholder={'검색'} />
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck30"
                                id="ck30"
                                label="옵션 30"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck31"
                                id="ck31"
                                label="옵션 31"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck32"
                                id="ck32"
                                label="옵션 32"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="select-form-footer__group">
                          <button
                            type="button"
                            className="select-form-footer__button button-tag"
                          >
                            "갤럭시" 새 태그 만들기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-select__tags">
                <div className="tags__section">
                  <ul className="tags__list">
                    <li>
                      <Tag
                        label={'태그1'}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                      />
                    </li>
                    <li>
                      <Tag
                        label={'태그2'}
                        cate={'n2'}
                        shape={'round'}
                        close={true}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '200px', maxWidth: '960px' }}>
          <h2 className="guide__item--title">주소</h2>
          <div className="guide__group">
            <div className="form-address__section">
              <FormTitle
                title="주소"
                required={true}
              />
              <ul className="form-address__country">
                <li className="select">
                  <div className="select-form__section select-form-btn is-selected">
                    <div className="select-form__group">
                      <button
                        className="select-form__label"
                        disabled
                      >
                        <span className="select-form__label-text">한국</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>

                      <div className="select-form-option__section">
                        <div className="select-form-option__area">
                          <ul className="select-form-option__group">
                            <li>
                              <button className="select-form-option__item is-selected">
                                <span className="select-form-option__item-text">한국</span>
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
                <li className="checkbox">
                  <FormInputBtn
                    type="checkbox"
                    name="ck-add"
                    id="ck-add"
                    label="해외 주소 입력"
                  />
                </li>
              </ul>
              <ul className="form-address__detail">
                <li className="search">
                  <FormInputText value="서울특별시 중구 서소문로11길 19" />
                  <Button
                    label={'주소 검색'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-secondary'}
                  />
                </li>
                <li>
                  <FormInputText value="배재정동빌딩 A동 6층" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. </h2>
          <div className="guide__group"></div>
        </div> */}
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
