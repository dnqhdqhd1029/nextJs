/**
 * @file ND02.tsx
 * @description ND02 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp_198x122.png'
import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner distribute">
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="distribute-steps__header">
                <h2 className="distribute-steps-header__title">보도자료 배포: 템플릿</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">설정</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">내용</p>
                      </li>
                      <li>
                        <p className="steps__text">확인</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__contents">
              <div className="distribute-steps__section">
                <div className="distribute-steps__group">
                  {/* 샘플 */}
                  <div className="tabs__section type1-medium">
                    <div className="tabs-menu__group">
                      <ul className="tabs-menu__list bb-0">
                        <li className="is-active">
                          <button
                            type="button"
                            className="tabs-menu__btn"
                          >
                            <span className="tabs-menu__name">샘플</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="tabs-menu__btn"
                          >
                            <span className="tabs-menu__name">저장</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="tabs-panel__section">
                      <div className="tabs-panel__group">
                        <div className="distribute-steps__ipt-btn">
                          <div className="template-ipt-btn__section type-layout">
                            <ul className="template-ipt-btn__list">
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt1"
                                    id="rt1-1"
                                    defaultChecked
                                  />
                                  <label htmlFor="rt1-1">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img"></span>
                                    </b>
                                    <span className="item__label">내용 없음</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt1"
                                    id="rt1-2"
                                  />
                                  <label htmlFor="rt1-2">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img"></span>
                                    </b>
                                    <span className="item__label">헤더와 본문</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt1"
                                    id="rt1-3"
                                  />
                                  <label htmlFor="rt1-3">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img"></span>
                                    </b>
                                    <span className="item__label">본문과 푸터</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt1"
                                    id="rt1-4"
                                  />
                                  <label htmlFor="rt1-4">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img"></span>
                                    </b>
                                    <span className="item__label">헤더, 본문과 푸터</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 저장 */}
                  <div className="tabs__section type1-medium">
                    <div className="tabs-menu__group">
                      <ul className="tabs-menu__list bb-0">
                        <li>
                          <button
                            type="button"
                            className="tabs-menu__btn"
                          >
                            <span className="tabs-menu__name">샘플</span>
                          </button>
                        </li>
                        <li className="is-active">
                          <button
                            type="button"
                            className="tabs-menu__btn"
                          >
                            <span className="tabs-menu__name">저장</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="tabs-panel__section">
                      <div className="tabs-panel__group">
                        <div className="distribute-steps__ipt-btn">
                          <div className="template-ipt-btn__section type-layout-thumb">
                            <ul className="template-ipt-btn__list">
                              <li>
                                {/* <div className="template-ipt-btn__item-delete">
                                <Button
                                  label={'삭제'}
                                  cate={'ico-only'}
                                  size={'s'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.trash}
                                  icoSize={16}
                                />
                              </div> */}

                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt10"
                                    id="rt10-1"
                                    defaultChecked
                                  />
                                  <label htmlFor="rt10-1">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <Image
                                          src={tempImg}
                                          width={198}
                                          height={122}
                                          alt="저장이미지"
                                        />
                                      </span>
                                    </b>
                                    <span className="item__label">기본 템플릿</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item-delete">
                                  <Button
                                    label={'삭제'}
                                    cate={'ico-only'}
                                    size={'s'}
                                    color={'secondary'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.trash}
                                    icoSize={16}
                                  />
                                </div>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt10"
                                    id="rt10-2"
                                  />
                                  <label htmlFor="rt10-2">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <Image
                                          src={tempImg}
                                          width={198}
                                          height={122}
                                          alt="저장이미지"
                                        />
                                      </span>
                                    </b>
                                    <span className="item__label">신상품 론칭</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item-delete">
                                  <Button
                                    label={'삭제'}
                                    cate={'ico-only'}
                                    size={'s'}
                                    color={'secondary'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.trash}
                                    icoSize={16}
                                  />
                                </div>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt10"
                                    id="rt10-3"
                                  />
                                  <label htmlFor="rt10-3">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <Image
                                          src={tempImg}
                                          width={198}
                                          height={122}
                                          alt="저장이미지"
                                        />
                                      </span>
                                    </b>
                                    <span className="item__label">분기별 IR</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item-delete">
                                  <Button
                                    label={'삭제'}
                                    cate={'ico-only'}
                                    size={'s'}
                                    color={'secondary'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.trash}
                                    icoSize={16}
                                  />
                                </div>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt10"
                                    id="rt10-4"
                                  />
                                  <label htmlFor="rt10-4">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <Image
                                          src={tempImg}
                                          width={198}
                                          height={122}
                                          alt="저장이미지"
                                        />
                                      </span>
                                    </b>
                                    <span className="item__label">신상품 론칭</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item-delete">
                                  <Button
                                    label={'삭제'}
                                    cate={'ico-only'}
                                    size={'s'}
                                    color={'secondary'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.trash}
                                    icoSize={16}
                                  />
                                </div>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="radio"
                                    name="rt10"
                                    id="rt10-5"
                                  />
                                  <label htmlFor="rt10-5">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <Image
                                          src={tempImg}
                                          width={198}
                                          height={122}
                                          alt="저장이미지"
                                        />
                                      </span>
                                    </b>
                                    <span className="item__label">분기별 IR</span>
                                  </label>
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
            <div className="mb-contents-layout__footer">
              <div className="distribute-steps__footer">
                <FooterButton left={true} />
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
