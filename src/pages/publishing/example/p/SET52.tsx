/**
 * @file SET52.tsx
 * @description SET52 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
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
                      <h2 className="common-title__title">연관도 분석</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'수정하기'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <ul className="interval-mt16">
                    <li>
                      <div className="setting-contents-list__header">
                        <p className="font-body__regular">
                          연관도 분석은 모니터링에서 설정한 키워드가 뉴스 본문에서 얼마나 많이 나오는지 분석해
                          모니터링된 뉴스를 분석하는 기능입니다.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="setting-contents-list__section type-analyze">
                        <ul className="interval-mt14">
                          <li>
                            <ul className="setting-analyze__list form-pb0">
                              <li>
                                <p className="setting-analyze__text--bold">높음 :</p>
                              </li>
                              <li>
                                <p className="setting-analyze__text">한글 400 단어당</p>
                              </li>
                              <li>
                                <FormInputText
                                  inputType="number"
                                  placeholder="0"
                                  value="6"
                                  readonly={true}
                                />
                              </li>
                              <li>
                                <p className="setting-analyze__text">회 초과</p>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <ul className="setting-analyze__list form-pb0">
                              <li>
                                <p className="setting-analyze__text--bold">보통 :</p>
                              </li>
                              <li>
                                <p className="setting-analyze__text">한글 400 단어당</p>
                              </li>
                              <li>
                                <FormInputText
                                  inputType="number"
                                  placeholder="0"
                                  value="2"
                                  readonly={true}
                                />
                              </li>
                              <li>
                                <p className="setting-analyze__text">~</p>
                              </li>
                              <li>
                                <FormInputText
                                  inputType="number"
                                  placeholder="0"
                                  value="5"
                                  readonly={true}
                                />
                              </li>
                              <li>
                                <p className="setting-analyze__text">회</p>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <ul className="setting-analyze__list form-pb0">
                              <li>
                                <p className="setting-analyze__text--bold">낮음 :</p>
                              </li>
                              <li>
                                <p className="setting-analyze__text">한글 400 단어당</p>
                              </li>
                              <li>
                                <FormInputText
                                  inputType="number"
                                  placeholder="0"
                                  value="2"
                                  readonly={true}
                                />
                              </li>
                              <li>
                                <p className="setting-analyze__text">회 미만</p>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
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
