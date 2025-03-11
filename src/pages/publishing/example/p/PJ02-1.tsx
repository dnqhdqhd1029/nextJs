/**
 * @file PJ02-1.tsx
 * @description PJ02-1 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
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
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">프로젝트 추가</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt28">
              <li>
                <p className="font-body__regular">추가할 언론인 정보를 입력하세요.</p>
              </li>
              <li>
                <ul>
                  <li>
                    <FormInputText
                      title={'프로젝트명'}
                      required={true}
                    />
                  </li>
                </ul>
                <ul className="grid-col2">
                  <li>
                    <div className="select-form__section select-form-btn is-selected ">
                      <FormTitle
                        title={'카테고리'}
                        required={true}
                      />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <button className="select-form-option__item is-selected">
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
                                    수정 (동료가 볼 수 있고 추가, 수정, 삭제 가능)
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
                    <div className="select-form__section select-form-btn is-selected ">
                      <FormTitle title={'공유 설정'} />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <button className="select-form-option__item is-selected">
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
                                    수정 (동료가 볼 수 있고 추가, 수정, 삭제 가능)
                                  </span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-pb0">
                      <div className="ipt-btn__section">
                        <FormTitle title={'변경한 공유설정을 프로젝트 만들기에 기본값으로 사용하겠습니까?'} />
                        <ul className="ipt-btn__list--row">
                          <li>
                            <FormInputBtn
                              type="checkbox"
                              name="ck1"
                              id="ck1"
                              label="기본값으로 사용"
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
                  label={'확인'}
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
