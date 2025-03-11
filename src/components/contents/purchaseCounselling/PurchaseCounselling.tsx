import FormTitle from '~/components/common/ui/FormTitle'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const PurchaseCounselling = () => {
  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="service__section">
            <div className="service-visual__section">
              <h2 className="service-visual__title">
                미디어비는 클라우드 기반의 지능형 회사 홍보 플랫폼입니다.
                <br />
                미디어비는 PR 캠페인을 효과적으로 실행하고 모니터링할 수 있는 수단을 제공합니다.
              </h2>
            </div>

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
                    <FormInputText
                      title="이름"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="이메일"
                      required={true}
                      placeholder="업무용 이메일"
                    />
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
                      placeholder="회사명에서 (주), 주식회사는 제외"
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
                                    수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
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
                                    비공개 (소유자만 보고 수정할 수 있음)
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
                                    수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
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
                                    비공개 (소유자만 보고 수정할 수 있음)
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
                  <p className="font-body__regular fw700">요청사항</p>
                </div>
                <div className="textarea__area">
                  <div className="textarea__group">
                    <textarea rows={6} />
                  </div>
                </div>
              </li>
              <li>
                <div className="agree__section">
                  <div className="agree-notice__group">
                    <p className="agree-notice__text">
                      이 양식을 제출함으로써 귀하는 당사의{' '}
                      <Button
                        elem="a"
                        url={'#!'}
                        target="_blank"
                        label={'약관'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />{' '}
                      및{' '}
                      <Button
                        elem="a"
                        url={'#!'}
                        target="_blank"
                        label={'개인정보 보호정책'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                      을 읽고 동의함을 확인하게 됩니다.
                    </p>
                  </div>

                  <ul className="agree-checkbox__list">
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck1"
                        id="agree-ck1"
                        label="이용 약관에 동의"
                      />
                    </li>
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck2"
                        id="agree-ck2"
                        label="개인정보 수집 및 이용에 동의"
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'구매 상담 신청'}
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
  )
}

export default PurchaseCounselling
