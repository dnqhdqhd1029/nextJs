/**
 * @file SET30.tsx
 * @description SET30 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
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
      <div className="mb-common-inner setting">
        <div className="mb-lnb__section type-w2">
          <LnbSetting />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__contents">
              <div className="setting__contents">
                <div className="setting__header">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <h2 className="common-title__title">회사 정보</h2>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <div className="setting-contents-form__section">
                    <ul className="interval-mt42">
                      <li>
                        <ul>
                          <li>
                            <ul className="grid-col2">
                              <li>
                                <FormInputText
                                  title={'회사명'}
                                  value="삼성전자"
                                  required={true}
                                  readonly={true}
                                />
                              </li>
                              <li>
                                <FormInputText
                                  title={'대표자명'}
                                  value="홍길동"
                                  required={true}
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
                                <FormInputText
                                  title={'사업자등록번호'}
                                  inputType="number"
                                  required={true}
                                />
                              </li>
                              <li>
                                <FormInputText
                                  title={'웹사이트'}
                                  required={true}
                                  placeholder="http://"
                                />
                              </li>
                            </ul>
                          </li>
                          <li>
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
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="file-uploader-button__section type-only">
                          <FormTitle title="사업자등록증" />
                          <div className="file-uploader-button__header">
                            <div className="file-uploader-button__group">
                              {/* input 마우스오버, 클릭 기준 type-over / type-press 클래스 적용 */}
                              <button
                                type="button"
                                className="file-uploader-button__upload"
                              >
                                <span className="file-uploader-button__text">파일 찾기</span>
                              </button>
                              <input
                                type="file"
                                className="file-uploader-button__input"
                                multiple
                              />
                            </div>
                            <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
                          </div>

                          <div className="file-uploader-button__list">
                            <ul className="file-uploader-button-list__group">
                              <li>
                                <div className="file-uploader-button-list__item">
                                  <p className="file-uploader-button-item__name">사업자등록증 사본.jpg</p>
                                  <button
                                    type="button"
                                    className="file-uploader-button-item__delete"
                                  >
                                    <IcoSvg data={icoSvgData.trash} />
                                    <span className="text">파일 삭제</span>
                                  </button>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div className="mb-contents-footer__section">
                      <div className="buttons__group button-min-w120">
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
