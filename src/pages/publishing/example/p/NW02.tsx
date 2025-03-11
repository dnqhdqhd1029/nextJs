/**
 * @file NW02.tsx
 * @description NW02 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp.jpg'
import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner distribute">
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="distribute-steps__header">
                <h2 className="distribute-steps-header__title">뉴스와이어 배포: 내용</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">기본</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">내용</p>
                      </li>
                      <li>
                        <p className="steps__text">설정</p>
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
                  <ul>
                    <li>
                      <div className="select-form__section select-form-btn">
                        <FormTitle
                          title={'언어'}
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
                        title={'제목'}
                        required={true}
                      />
                    </li>
                    <li>
                      <div className="textarea__area">
                        <FormTitle
                          title="내용"
                          required={true}
                        />
                        <div className="textarea__group">
                          <textarea rows={6} />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="textarea__area">
                        <FormTitle
                          title={'언론 연락처'}
                          tooltip={true}
                          required={true}
                        >
                          <Tooltips
                            tooltipId={'tt10-4'}
                            tooltipPlace={'top'}
                            tooltipHtml={
                              '뉴스와이어는 언론 연락처의 <br />이메일은 직접 노출하지 않고, <br />메시지 보내기 링크로 표시해 <br />스팸으로부터 보호를 <br />해드립니다.'
                            }
                            tooltipComponent={<IcoTooltip />}
                          />
                        </FormTitle>
                        <div className="textarea__group">
                          <textarea rows={6} />
                        </div>
                      </div>
                    </li>
                    <li>
                      <FormInputText
                        title={'웹사이트'}
                        placeholder="http://"
                      />
                    </li>
                    <li>
                      <div className="form-3vs7__section">
                        <FormTitle title="관련 링크" />
                        <ul className="interval-mt14">
                          <li>
                            <div className="form-3vs7__group">
                              <div className="elem-3">
                                <FormInputText placeholder="사이트명" />
                              </div>
                              <div className="elem-7">
                                <FormInputText
                                  placeholder="http://"
                                  addBtn={true}
                                />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-3vs7__group">
                              <div className="elem-3">
                                <FormInputText placeholder="사이트명" />
                              </div>
                              <div className="elem-7">
                                <FormInputText
                                  placeholder="http://"
                                  minusBtn={true}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <p className="font-body__regular">사진</p>

                        <div className="flex-align-cen">
                          <p className="font-body__regular pr8">
                            사진을{' '}
                            <Button
                              label={'직전 선택'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                            해 업로드하거나 미디어 자료실을 사용하세요.
                          </p>
                          <Button
                            label={'미디어 자료실'}
                            cate={'default'}
                            size={'s'}
                            color={'outline-secondary'}
                          />
                        </div>
                      </div>
                      <div className="mb-contents-pb16__group">
                        <ul className="distribute-media__list">
                          <li>
                            <div className="distribute-media__item">
                              <div className="distribute-media-item__thumb">
                                <Image
                                  src={tempImg}
                                  width={240}
                                  height={160}
                                  alt="temp 이미지"
                                />

                                <div className="thumb-delete">
                                  <button
                                    type="button"
                                    className="thumb-delete__button"
                                  >
                                    <span className="hidden">삭제</span>
                                  </button>
                                </div>
                              </div>
                              <div className="distribute-media-item__textarea">
                                <div className="textarea__group">
                                  <textarea
                                    rows={2}
                                    placeholder="사진 설명을 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <FormTitle title="유튜브 URL" />

                        <ul className="form-default__flex">
                          <li>
                            <FormInputText />
                          </li>
                          <li className="flex-shrink">
                            <Button
                              label={'입력'}
                              cate={'default'}
                              size={'m'}
                              color={'outline-secondary'}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="mb-contents-pb16__group">
                        <ul className="distribute-media__list">
                          <li>
                            <div className="distribute-media__item">
                              <div className="distribute-media-item__thumb">
                                <Image
                                  src={tempImg}
                                  width={240}
                                  height={160}
                                  alt="temp 이미지"
                                />

                                <div className="thumb-delete">
                                  <button
                                    type="button"
                                    className="thumb-delete__button"
                                  >
                                    <span className="hidden">삭제</span>
                                  </button>
                                </div>
                              </div>
                              <div className="distribute-media-item__textarea">
                                <div className="textarea__group">
                                  <textarea
                                    rows={2}
                                    placeholder="동영상 설명을 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group pt14">
                        <div className="bullet-list__group">
                          <h6 className="bullet-list__title fw700">주의 사항</h6>
                          <ul className="bullet-list">
                            <li>
                              <p className="bullet-list__text">사진은 jpg, gif, png 파일로 최대 3MB입니다.</p>
                            </li>
                            <li>
                              <p className="bullet-list__text">
                                사진과 동영상은 언론사가 뉴스 제작에 쓸 수 있도록 보도용으로 제작한 것이어야 합니다.
                              </p>
                            </li>
                            <li>
                              <p className="bullet-list__text">
                                광고, 광고성 배너, 광고성 동영상, 텍스트가 많이 포함된 사진과 동영상은 편집 가이드라인에
                                따라 삭제합니다.
                              </p>
                            </li>
                            <li>
                              <p className="bullet-list__text">
                                사진과 동영상은 등록 회사가 저작권을 가진 것이어야 합니다.
                              </p>
                            </li>
                            <li>
                              <p className="bullet-list__text">
                                사진DB에서 구매한 상업용 사진의 등록은 언론사에 불법 재배포를 하는 행위이므로 저작권법에
                                따라 처벌될 수 있습니다.
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
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
