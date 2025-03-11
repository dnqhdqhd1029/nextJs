/**
 * @file DB01.tsx
 * @description DB01 페이지
 */

import Link from 'next/link'

import ApexChartsColumn from '~/publishing/components/common/ui/ApexChartsColumn'
import Button from '~/publishing/components/common/ui/Button'
import { IcoRequired } from '~/publishing/components/common/ui/IcoGroup'
import { IcoArrowMove } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import { columnOptions, columnSeries } from '~/publishing/components/common/ui/json/chartsData'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 type-drag-drop">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="drag-drop__section">
              <div className="drag-drop__header">
                <Button
                  label={'가젯 추가'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
              </div>
              <div className="drag-drop__area">
                <div className="drag-drop__group">
                  <div className="draggable__container">
                    <div className="draggable__header">
                      <h2 className="draggable-header__title">언론 브리핑</h2>
                      <div className="draggable-header__buttons">
                        <IcoArrowMove />
                        <div className="select__section select-type1-small select-ico-only select-align-right">
                          <button className="select__label ico-size16">
                            <span className="select__label-text">설정</span>
                            <IcoSvg data={icoSvgData.threeDotsVertical} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공유하기</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">이메일 발송 차단</span>
                                  </button>
                                </li>
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="draggable__contents">
                      <div className="draggable-table__section">
                        <div className="table-type5__section">
                          <table>
                            <caption>caption</caption>

                            <colgroup>
                              <col width="20%" />
                              <col width="*" />
                              <col width="20%" />
                            </colgroup>

                            <tbody>
                              <tr>
                                <th scope="row">
                                  <p className="table-type5__text">중앙일보</p>
                                </th>
                                <td>
                                  <div className="table-type5__flex">
                                    <Link
                                      href="#!"
                                      legacyBehavior
                                    >
                                      <a className="table-type5__text color-primary">편집국장단 인사</a>
                                    </Link>
                                    <p className="table-type5__text color-secondary">100</p>
                                  </div>
                                </td>
                                <td>
                                  <p className="table-type5__text color-secondary">05-24</p>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <p className="table-type5__text">한국일보</p>
                                </th>
                                <td>
                                  <div className="table-type5__flex">
                                    <Link
                                      href="#!"
                                      legacyBehavior
                                    >
                                      <a className="table-type5__text color-primary">이훈성 한국일보 편집국장 임명 </a>
                                    </Link>
                                    <p className="table-type5__text color-secondary">40</p>
                                  </div>
                                </td>
                                <td>
                                  <p className="table-type5__text color-secondary">04-20</p>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <p className="table-type5__text">동아일보</p>
                                </th>
                                <td>
                                  <div className="table-type5__flex">
                                    <Link
                                      href="#!"
                                      legacyBehavior
                                    >
                                      <a className="table-type5__text color-primary">김예윤 동아일보 산업부장 임명</a>
                                    </Link>
                                    <p className="table-type5__text color-secondary">240</p>
                                  </div>
                                </td>
                                <td>
                                  <p className="table-type5__text color-secondary">03-09</p>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                {/* tbody cols에 맞춰 숫자 변동 */}
                                <td colSpan={3}>
                                  <div className="table-type5__tfoot">
                                    <div className="tfoot-center">
                                      <Button
                                        label={'더보기'}
                                        cate={'default'}
                                        size={'m'}
                                        color={'link-dark'}
                                      />
                                    </div>
                                    <div className="tfoot-right">
                                      <Button
                                        label={'전체'}
                                        cate={'default'}
                                        size={'m'}
                                        color={'link-dark'}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="drop-zone__container">
                    <p className="drop-zone__text">가젯을 이곳에 끌어놓거나 새 가젯을 추가하세요.</p>
                  </div>

                  <div className="draggable__container">
                    <div className="draggable__header">
                      <h2 className="draggable-header__title">설정하기</h2>
                      <div className="draggable-header__buttons">
                        <IcoArrowMove />
                        <div className="select__section select-type1-small select-ico-only select-align-right">
                          <button className="select__label ico-size16">
                            <span className="select__label-text">설정</span>
                            <IcoSvg data={icoSvgData.threeDotsVertical} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공유하기</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">이메일 발송 차단</span>
                                  </button>
                                </li>
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="draggable__contents">
                      <div className="draggable-select__section">
                        <ul>
                          <li>
                            <div className="draggable-select__group">
                              <div className="draggable-select__title">노출 건수 선택</div>
                              <div className="draggable-select__select">
                                <div className="select-form__section select-form-btn">
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
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="draggable-select__group">
                              <div className="draggable-select__title">유형</div>
                              <div className="draggable-select__select">
                                <div className="select-form__section select-form-btn">
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
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="draggable-select__group">
                              <div className="draggable-select__title">
                                종류 <IcoRequired />
                              </div>
                              <div className="draggable-select__select">
                                <div className="select-form__section select-form-btn">
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
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="draggable-select__save">
                              <Button
                                label={'저장'}
                                cate={'default'}
                                size={'m'}
                                color={'outline-secondary'}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="draggable__container">
                    <div className="draggable__header">
                      <h2 className="draggable-header__title">그래프</h2>
                      <div className="draggable-header__buttons">
                        <IcoArrowMove />
                        <div className="select__section select-type1-small select-ico-only select-align-right">
                          <button className="select__label ico-size16">
                            <span className="select__label-text">설정</span>
                            <IcoSvg data={icoSvgData.threeDotsVertical} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공유하기</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">이메일 발송 차단</span>
                                  </button>
                                </li>
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="draggable__contents">
                      <div className="draggable-graph__section">
                        <div className="draggable-graph__area">
                          <div className="draggable-graph__group">
                            <ApexChartsColumn
                              options={columnOptions}
                              series={columnSeries}
                            />
                          </div>
                        </div>
                        <div className="draggable-graph__footer">
                          <Button
                            label={'전체'}
                            cate={'default'}
                            size={'m'}
                            color={'link-dark'}
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
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
