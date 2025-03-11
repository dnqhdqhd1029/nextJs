/**
 * @file J51.tsx
 * @description J51 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
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
                  <h2 className="common-title__title">언론인 추가</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <p className="font-body__regular">추가할 언론인 정보를 입력하세요.</p>
              </li>
              <li>
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title={'이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'미디어명'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText title={'부서'} />
                  </li>
                  <li>
                    <FormInputText title={'직책'} />
                  </li>
                  <li>
                    <FormInputText
                      title={'이메일'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'휴대전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'분야'}
                      placeholder="콤마로 구분"
                    />
                  </li>
                  <li>
                    <FormInputText title={'주소'} />
                  </li>
                  <li>
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
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="경력" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="19OO OO미디어 OO부 직함"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="학력" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="19OO OO대 OO과 졸업"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="저서" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="2000 책제목, 출판사"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="수상" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="2OOO OO상, 수여기관, OOOO 보도"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="form-social-media__section">
                  <h3 className="form-social-media__title">
                    <Button
                      label={'소셜미디어 추가'}
                      cate={'link-ico-text'}
                      size={''}
                      color={'body-link'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.plus}
                    />
                  </h3>
                  <div className="form-social-media__group">
                    <ul className="form-social-media__list">
                      <li>
                        <div className="form-social-media__item">
                          <div className="select">
                            <div className="select-form__section select-form-btn">
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
                          <div className="input">
                            <FormInputText placeholder="내용" />
                          </div>
                          <div className="button">
                            <Button
                              label={'삭제'}
                              cate={'default'}
                              size={'m'}
                              color={'link'}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-social-media__item">
                          <div className="select">
                            <div className="select-form__section select-form-btn">
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
                          <div className="input">
                            <FormInputText placeholder="내용" />
                          </div>
                          <div className="button">
                            <Button
                              label={'삭제'}
                              cate={'default'}
                              size={'m'}
                              color={'link'}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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
