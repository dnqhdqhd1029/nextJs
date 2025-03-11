/**
 * @file PJ05-1.tsx
 * @description PJ05-1 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 type-project bg-white">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="project__section">
              <div className="project-header__section">
                <ul className="interval-mt12">
                  <li>
                    <div className="project-header-control__group">
                      <ul className="project-header-control__list">
                        <li className="control-path">
                          <div className="control-path-arrow">
                            <Button
                              label={'arrowLeft'}
                              cate={'ico-only'}
                              size={'s'}
                              color={'body-text'}
                              icoLeft={true}
                              icoLeftData={icoSvgData.arrowLeft}
                              icoSize={24}
                            />
                          </div>
                          <h4 className="control-path-name">갤럭시 Z 폴드3 프로모션</h4>
                        </li>
                        <li className="control-obj">
                          <div className="control-obj-select">
                            <div className="select__section select-type1-small select-line select-align-right">
                              <button className="select__label">
                                <span className="select__label-text">작업</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-option__section">
                                <div className="select-option__area">
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">수정하기</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">삭제하기</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">공유하기</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="project-header-tabs__group">
                      <div className="tabs__section type1-small">
                        <div className="tabs-menu__group">
                          <ul className="tabs-menu__list">
                            <li>
                              <button
                                type="button"
                                className="tabs-menu__btn"
                              >
                                <span className="tabs-menu__name">개요</span>
                              </button>
                            </li>
                            <li className="is-active">
                              <button
                                type="button"
                                className="tabs-menu__btn"
                              >
                                <span className="tabs-menu__name">모니터링</span>
                                <span className="tabs-menu__number">2</span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="tabs-menu__btn"
                              >
                                <span className="tabs-menu__name">클립북</span>
                                <span className="tabs-menu__number">3</span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="tabs-menu__btn"
                              >
                                <span className="tabs-menu__name">목록</span>
                                <span className="tabs-menu__number">5</span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="tabs-menu__btn"
                              >
                                <span className="tabs-menu__name">활동</span>
                                <span className="tabs-menu__number">24</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="project__group">
                <div className="flexible__section type-n2">
                  <div className="flexible__group">
                    <div className="flexible-item__group type-project">
                      <div className="flexible-item__contents">
                        <ul className="interval-mt16">
                          <li>
                            <h4 className="font-heading--h5">키워드 추가</h4>
                            <p className="font-body__regular">
                              프로젝트 관련 키워드를 입력하면 뉴스를 쉽게 검색할 수 있습니다. <br />
                              여러 개 입력 시 쉼표나 공백으로 분리. 정확한 단어 또는 문구 검색은 &#8220; &#8221;를
                              사용하세요.
                            </p>
                          </li>
                          <li>
                            <ul>
                              <li>
                                <div className="after-and">
                                  <FormInputText title={'모두 포함'} />
                                </div>
                              </li>
                              <li>
                                <div className="after-or">
                                  <FormInputText title={'하나라도 포함'} />
                                </div>
                              </li>
                              <li>
                                <div className="after-not">
                                  <FormInputText title={'제외'} />
                                </div>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div className="flexible-search__button">
                              <div className="flexible-search__button-reset">
                                <Button
                                  label={'초기화'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                />
                              </div>
                              <div className="flexible-search__button-search">
                                <Button
                                  label={'저장 후 검색'}
                                  cate={'default'}
                                  size={'m'}
                                  color={'primary'}
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
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
Sample.PublishingLayout = 'LAYOUT4'
