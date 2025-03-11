/**
 * @file SR10.tsx
 * @description SR10 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="service__section">
              <div className="service-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">구매 상담</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt14">
                <li>
                  <div className="mb-contents-pb16__group">
                    <p className="font-body__regular fw700">신청인</p>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <div className="mb-contents-pb16__group">
                        <div className="ipt-text__area">
                          <FormTitle title="이름" />
                          <p className="ipt-text-readonly">
                            <span className="fw400">홍길동</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <div className="ipt-text__area">
                          <FormTitle title="이메일" />
                          <p className="ipt-text-readonly">
                            <span className="fw400">gildong.hong@gmail.com</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <FormInputText
                        inputType="number"
                        title="전화"
                        required={true}
                      />
                    </li>
                    <li>
                      <FormInputText
                        inputType="number"
                        title="휴대전화"
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="부서"
                        required={true}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="직책"
                        required={true}
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <p className="font-body__regular fw700">회사</p>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <FormInputText
                        title="회사명"
                        required={true}
                        value="삼성전자"
                        readonly={true}
                      />
                    </li>
                    <li>
                      <div className="select-form__section select-form-btn">
                        <FormTitle
                          title={'회사 분류'}
                          required={true}
                        />

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
                                  <button className="select-form-option__item">
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
                          title={'사원수'}
                          required={true}
                        />

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
                                  <button className="select-form-option__item">
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
                      <FormInputText
                        title={'웹사이트'}
                        placeholder="http://"
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <p className="font-body__regular fw700">상품</p>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <div className="select-form__section select-form-btn">
                        <FormTitle
                          title={'상품 종류'}
                          required={true}
                        />

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
                                  <button className="select-form-option__item">
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
                          title={'사용자 숫자'}
                          required={true}
                        />

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
                                  <button className="select-form-option__item">
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
                  </ul>
                  <div className="form-pb0">
                    <FormTitle title="요청사항" />

                    <div className="textarea__area">
                      <div className="textarea__group">
                        <textarea rows={6} />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mb-contents-footer__section">
                <div className="buttons__group button-min-w120">
                  <Button
                    label={'서비스 구매 신청'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                  />
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
Sample.PublishingLayout = 'LAYOUT4'
