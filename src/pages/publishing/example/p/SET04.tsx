/**
 * @file SET04.tsx
 * @description SET04 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
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
                      <h2 className="common-title__title">공유 설정 기본값</h2>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <div className="setting-contents__desc">
                    <p>
                      내가 콘텐츠를 만들 때 적용할 공유 설정 기본값을 설정합니다.
                      <br />
                      설정 기본값을 정해 놓으면 콘텐츠를 만들 때마다 일일이 공유 설정값을 입력하지 않아도 되므로
                      편리합니다.
                      <br />
                      콘텐츠를 만든 후에는 공유 설정을 개별적으로 수정할 수 있습니다.
                    </p>
                  </div>

                  <ul className="interval-mt16 w480">
                    <li>
                      <ul>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'언론인, 미디어 목록'} />
                              {/* <Button
                            label={'업그레이드'}
                            cate={'default'}
                            size={'es'}
                            color={'success'}
                          /> */}
                            </div>

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'언론인, 미디어 맞춤 검색'} />
                              {/* <Button
                            label={'업그레이드'}
                            cate={'default'}
                            size={'es'}
                            color={'success'}
                          /> */}
                            </div>

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'클립북'} />
                              <Button
                                label={'업그레이드'}
                                cate={'default'}
                                size={'es'}
                                color={'success'}
                              />
                            </div>

                            <div className="select-form__group">
                              <button
                                className="select-form__label"
                                disabled
                              >
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'모니터링'} />
                              <Button
                                label={'업그레이드'}
                                cate={'default'}
                                size={'es'}
                                color={'success'}
                              />
                            </div>

                            <div className="select-form__group">
                              <button
                                className="select-form__label"
                                disabled
                              >
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'프로젝트'} />
                              <Button
                                label={'업그레이드'}
                                cate={'default'}
                                size={'es'}
                                color={'success'}
                              />
                            </div>

                            <div className="select-form__group">
                              <button
                                className="select-form__label"
                                disabled
                              >
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'활동(노트, 약속, 전화, 문의)'} />
                              {/* <Button
                            label={'업그레이드'}
                            cate={'default'}
                            size={'es'}
                            color={'success'}
                          /> */}
                            </div>

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'이메일, 보도자료, 뉴스와이어 배포'} />
                              <Button
                                label={'업그레이드'}
                                cate={'default'}
                                size={'es'}
                                color={'success'}
                              />
                            </div>

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">
                                  공개 (동료가 볼 수 있으나 수정은 할 수 없음
                                </span>
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
                                      <button className="select-form-option__item is-selected">
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
                    </li>
                    <li>
                      <div className="setting-contents-list__button type-pl0">
                        <Button
                          label={'초기 상태로 변경'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
