/**
 * @file N61.tsx
 * @description N61 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">뉴스 추가</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <p className="font-body__regular">추가할 뉴스 정보를 입력하세요.</p>
              </li>
              <li>
                <ul>
                  <li>
                    <div className="form-2vs8__section">
                      <FormTitle title="링크" />
                      <div className="form-2vs8__group">
                        <div className="elem-8">
                          <FormInputText placeholder="https://" />
                        </div>
                        <div className="elem-2">
                          <Button
                            label={'정보 가져오기'}
                            cate={'default'}
                            size={'m'}
                            color={'outline-secondary'}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <FormInputText
                      title={'제목'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormTitle
                      title={'날짜'}
                      required={true}
                    />
                    <div className="datepicker-time__section">
                      <div className="datepicker-time__group">
                        <DatePicker />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="본문" />
                      <div className="textarea__group">
                        <textarea rows={6} />
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="grid-col2">
                  <li>
                    <div className="ipt-text__section">
                      <FormInputText
                        title={'미디어'}
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
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-text__section">
                      <FormInputText
                        title={'저자'}
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
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* 텍스트 타입 */}
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'클립북'} />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">클립북 선택</span>
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
                      </div>
                    </div>

                    {/* 체크박스 타입 */}
                    {/* <div className="select-form__section select-form-input is-show">
                      <div className="select-form__group">
                        <FormInputText
                          title={'클립북'}
                          placeholder="검색 또는 새 태그 만들기
"
                        />
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
                      </div>
                    </div> */}
                  </li>
                  <li>
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText
                          title={'태그'}
                          placeholder="검색 또는 새 태그 만들기
"
                        />
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
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
                <Button
                  label={'저장'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
