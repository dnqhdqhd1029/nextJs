/**
 * @file CustomerCenterHome.tsx
 * @description CustomerCenterHome 페이지
 */

import { useLayoutEffect } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const CustomerCenterHome = () => {
  const { initCustomerCenter } = useCustomerCenter()

  useLayoutEffect(() => {
    initCustomerCenter()
  }, [])

  return (
    <>
      <div className="mb-container responsive-type1 customer-type1">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-center__header">
                <div className="customer-center-header__group type-background">
                  <h2 className="customer-center__title">무엇을 도와드릴까요?</h2>
                  <div className="customer-center__search">
                    <FormInputSearch />
                  </div>
                </div>
              </div>
              <div className="customer-center__contents">
                <div className="customer-center__group">
                  <h3 className="customer-center__subtitle">도움말</h3>
                  <div className="customer-center__accordion">
                    <ul className="customer-center-accordion__list">
                      <li>
                        {/* 클릭 시, is-opened 추가 */}
                        <div className="customer-center-accordion__group is-opened">
                          <button className="customer-center-accordion__btn">
                            <span className="customer-center-accordion__btn-txt">언론인</span>
                            <span className="customer-center-accordion__btn-ico">
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </span>
                          </button>

                          <div className="customer-center-accordion-panel__group">
                            <ul className="customer-center-accordion-panel__list">
                              <li>
                                <div className="customer-center-accordion-panel__link">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 목록 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 맞춤 검색 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인에게 보도자료 보내기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-accordion__group">
                          <button className="customer-center-accordion__btn">
                            <span className="customer-center-accordion__btn-txt">미디어</span>
                            <span className="customer-center-accordion__btn-ico">
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </span>
                          </button>

                          <div className="customer-center-accordion-panel__group">
                            <ul className="customer-center-accordion-panel__list">
                              <li>
                                <div className="customer-center-accordion-panel__link">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 목록 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 맞춤 검색 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인에게 보도자료 보내기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-accordion__group">
                          <button className="customer-center-accordion__btn">
                            <span className="customer-center-accordion__btn-txt">모니터링</span>
                            <span className="customer-center-accordion__btn-ico">
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </span>
                          </button>

                          <div className="customer-center-accordion-panel__group">
                            <ul className="customer-center-accordion-panel__list">
                              <li>
                                <div className="customer-center-accordion-panel__link">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 목록 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 맞춤 검색 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인에게 보도자료 보내기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-accordion__group">
                          <button className="customer-center-accordion__btn">
                            <span className="customer-center-accordion__btn-txt">활동</span>
                            <span className="customer-center-accordion__btn-ico">
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </span>
                          </button>

                          <div className="customer-center-accordion-panel__group">
                            <ul className="customer-center-accordion-panel__list">
                              <li>
                                <div className="customer-center-accordion-panel__link">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 목록 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 맞춤 검색 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인에게 보도자료 보내기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-accordion__group">
                          <button className="customer-center-accordion__btn">
                            <span className="customer-center-accordion__btn-txt">배포</span>
                            <span className="customer-center-accordion__btn-ico">
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </span>
                          </button>

                          <div className="customer-center-accordion-panel__group">
                            <ul className="customer-center-accordion-panel__list">
                              <li>
                                <div className="customer-center-accordion-panel__link">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 목록 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인 맞춤 검색 만들기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="customer-center-accordion__item">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'언론인에게 보도자료 보내기'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <ul className="grid-col2 type-interval40">
                  <li>
                    <div className="customer-center__group">
                      <h3 className="customer-center__subtitle">좋아요 많은 도움말</h3>
                      <div className="customer-center__list">
                        <ul className="customer-center-list__group">
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'언론인 목록 만들기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'매체 목록 만들기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'뉴스 맞춤 검색 설정하기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'활동 삭제하기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'보도자료 배포 템플릿 복사하기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="customer-center__group">
                      <h3 className="customer-center__subtitle">많이 본 도움말</h3>
                      <div className="customer-center__list">
                        <ul className="customer-center-list__group">
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'분석 프로필 설정하기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'언론인 목록 만들기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'매체 목록 만들기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'뉴스 맞춤 검색 설정하기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="customer-center-list__item">
                              <Button
                                elem="a"
                                url="#!"
                                label={'언론인에게 보도자료 보내기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerCenterHome
