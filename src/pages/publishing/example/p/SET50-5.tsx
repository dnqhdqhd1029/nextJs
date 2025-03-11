/**
 * @file SET50-5.tsx
 * @description SET50-5 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section type-sticky">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">회원 추가</h2>
                  <div className="common-title__buttons">
                    <div className="steps__group">
                      <ul className="steps__list">
                        <li>
                          <p className="steps__text">이메일</p>
                        </li>
                        <li className="is-active">
                          <p className="steps__text">권한</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-member__section">
              <ul className="interval-line-list28">
                <li>
                  <div className="mb-contents-pb16__group">
                    <h3 className="setting__headings6">회원에게 부여할 권한을 선택하세요.</h3>
                  </div>
                  <div className="form-pb0">
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'권한'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-13"
                            id="rdo-13-0"
                            label="관리자"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-13"
                            id="rdo-13-1"
                            label="사용자"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <h3 className="setting__headings6">회원이 사용할 그룹을 선택하세요.</h3>
                  </div>
                  <div className="form-pb0 w480">
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText
                          title={'그룹'}
                          required={true}
                        />
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
                              label={'마케팅팀'}
                              cate={'n3'}
                              shape={'round'}
                              close={true}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mb-contents-footer__section">
              <div className="buttons__group type-between">
                <div className="buttons__group type-left">
                  <Button
                    label={'이전'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-secondary'}
                  />
                </div>
                <Button
                  label={'다음'}
                  cate={'default-ico-text'}
                  size={'m'}
                  color={'primary'}
                  icoRight={true}
                  icoRightData={icoSvgData.chevronThickRight}
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
