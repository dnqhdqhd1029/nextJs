/**
 * @file select.tsx
 * @description select 페이지
 */

import Link from 'next/link'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormMsg from '~/publishing/components/common/ui/FormMsg'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section
        className="guide__section"
        style={{ paddingBottom: '400px' }}
      >
        <h1 className="guide__title">셀렉트박스</h1>

        <code className="guide__code">
          1. select__section 펼친 : is-show
          <br />
          2. select__section 선택된 입력값 : is-selected
          <br />
          3. select__section 성공 : is-success / 실패 : is-danger
          <br />
          4. select-option__item 선택 : is-selected
          <br />
          5. select-option__item 서브메뉴 있을 때 : is-submenu
          <br />
          6. select-option__item 에서 검색 키워드 있을 때 해당 단어 print <br />
          &lt;span className="select-form-option__item-text"&gt; <br />
          &lt;b className="print"&gt;중앙&lt;/b&gt; 일보 <br />
          &lt;/span&gt;
        </code>

        <h2 className="guide__title">type1</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">small</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-small">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-line">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-line is-show">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">medium</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-medium">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-medium select-line">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-medium select-line is-show">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">small 선택표시</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-small">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">전체</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">비공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">수정</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small is-show">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">전체</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">비공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">수정</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">medium 선택표시</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-medium">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">
                              공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                            </span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">
                              수정 ( 동료가 볼수 있고 추가, 수정, 삭제 가능)
                            </span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-medium is-show">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">
                              공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                            </span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">
                              수정 ( 동료가 볼수 있고 추가, 수정, 삭제 가능)
                            </span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '120px' }}
            >
              <p className="guide__item--title">padding None (select-type1-small)</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-small select-type1-pd">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">전체</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">비공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">수정</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-type1-pd is-show">
                  <button className="select__label">
                    <span className="select__label-text">구분</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">전체</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">비공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">공개</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">수정</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '130px' }}
            >
              <p className="guide__item--title">small && select-type1-tertiary</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-small select-type1-tertiary">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-type1-tertiary is-show">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '130px' }}
            >
              <p className="guide__item--title">small && select-type1-button</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-small select-type1-button">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-type1-button is-show">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '130px' }}
            >
              <p className="guide__item--title">medium && select-type1-button</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type1-medium select-type1-button">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-medium select-type1-button is-show">
                  <button className="select__label">
                    <span className="select__label-text">활동 추가</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이메일 보내기</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">보도자료 배포</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">threeDotsVertical</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="select__section select-type1-small select-ico-only select-align-right">
                  <button className="select__label ico-size16">
                    <span className="select__label-text">설정</span>
                    <IcoSvg data={icoSvgData.threeDotsVertical} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
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
                <div className="select__section select-type1-small select-ico-only select-align-right is-show">
                  <button className="select__label ico-size16">
                    <span className="select__label-text">설정</span>
                    <IcoSvg data={icoSvgData.threeDotsVertical} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
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
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">sortDown</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="select__section select-type1-small select-ico-only select-align-right">
                  <button className="select__label ico-size24">
                    <span className="select__label-text">필터(내림차순)</span>
                    <IcoSvg data={icoSvgData.sortDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <h6 className="select-option__group-title">정렬</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">매체 가치</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">관련성</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이름</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">매체명</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                      <h6 className="select-option__group-title">순서</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">내림차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">오름차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-ico-only select-align-right is-show">
                  <button className="select__label ico-size24">
                    <span className="select__label-text">필터(내림차순)</span>
                    <IcoSvg data={icoSvgData.sortDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <h6 className="select-option__group-title">정렬</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">매체 가치</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">관련성</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이름</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">매체명</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                      <h6 className="select-option__group-title">순서</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">내림차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">오름차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '250px' }}
            >
              <p className="guide__item--title">sortUp</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="select__section select-type1-small select-ico-only select-align-right">
                  <button className="select__label ico-size24">
                    <span className="select__label-text">필터(오름차순)</span>
                    <IcoSvg data={icoSvgData.sortUp} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <h6 className="select-option__group-title">정렬</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">매체 가치</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">관련성</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이름</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">매체명</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                      <h6 className="select-option__group-title">순서</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">내림차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">오름차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type1-small select-ico-only select-align-right is-show">
                  <button className="select__label ico-size24">
                    <span className="select__label-text">필터(오름차순)</span>
                    <IcoSvg data={icoSvgData.sortUp} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <h6 className="select-option__group-title">정렬</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">매체 가치</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">관련성</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이름</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">매체명</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                      </ul>
                      <h6 className="select-option__group-title">순서</h6>
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">내림차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
                            </span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">오름차순</span>
                            <span className="select-option__item-ico">
                              <IcoSvg data={icoSvgData.checkThick} />
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
        </div>

        <h2 className="guide__title">type2 (사람 이름)</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">select-type2-pd</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type2-pd">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type2-pd is-show">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type2-pd is-show"
                  style={{ marginLeft: '200px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option-search__section">
                      <FormInputSearch placeholder={'검색'} />
                    </div>

                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type2-pd is-show"
                  style={{ marginLeft: '240px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option-search__section">
                      <FormInputSearch placeholder={'검색'} />
                    </div>

                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연 - seyeon.kim1234@hotmail.com</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱 - lee.dongwook@yahoo.com.jp</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">조서연 - seoyoon.jo@gmail.com</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱 - cjw06345@gmail.com</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">select-type2-primary</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type2-primary">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type2-primary is-show">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type2-primary is-show"
                  style={{ marginLeft: '150px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option-search__section">
                      <FormInputSearch placeholder={'검색'} />
                    </div>

                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">select-type2-secondary</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type2-secondary">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type2-secondary is-show">
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type2-secondary is-show"
                  style={{ marginLeft: '150px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍길동</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option-search__section">
                      <FormInputSearch placeholder={'검색'} />
                    </div>

                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">김세연</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">이동욱</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">홍길동</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">최진욱</span>
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

        <h2
          className="guide__title"
          style={{ marginTop: '100px' }}
        >
          type3
        </h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">n1</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type3-n1">
                  <button className="select__label">
                    <span className="select__label-text">언론</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">맞춤 검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">언론 목록</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론 추가</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론 브리핑</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">맞춤 검색 관리</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type3-n1 is-show">
                  <button className="select__label">
                    <span className="select__label-text">언론</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">맞춤 검색</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">언론 목록</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론 추가</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">언론 브리핑</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">맞춤 검색 관리</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '200px' }}
            >
              <p className="guide__item--title">n2</p>
              <div className="guide__box g--type2">
                <div className="select__section select-type3-n2">
                  <button className="select__label">
                    <span className="select__label-text">모니터링</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <p className="select-option__notice-text">
                        현재 사용 중인 상품은 모니터링 기능이 없어 업그레이드가 필요합니다.
                      </p>
                      <Button
                        label={'업그레이드'}
                        cate={'default'}
                        size={'s'}
                        color={'success'}
                      />
                    </div>
                  </div>
                </div>
                <div className="select__section select-type3-n2 is-show">
                  <button className="select__label">
                    <span className="select__label-text">모니터링</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <p className="select-option__notice-text">
                        현재 사용 중인 상품은 모니터링 기능이 없어 업그레이드가 필요합니다.
                      </p>
                      <Button
                        label={'업그레이드'}
                        cate={'default'}
                        size={'s'}
                        color={'success'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '200px' }}
            >
              <p className="guide__item--title">n3</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="select__section select-type3-n3">
                  <button className="select__label">
                    <span className="select__label-text">사용자</span>
                    <span className="ico-svg">
                      <img
                        src="/assets/svg/my-header.svg"
                        alt=""
                      />
                    </span>
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">회원 정보</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">설정</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">관리자</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">로그아웃</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="select__section select-type3-n3 is-show">
                  <button className="select__label">
                    <span className="select__label-text">사용자</span>
                    <span className="ico-svg">
                      <img
                        src="/assets/svg/my-header.svg"
                        alt=""
                      />
                    </span>
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">회원 정보</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">설정</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">관리자</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">로그아웃</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type3-n3 is-show"
                  style={{ marginLeft: '100px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">사용자</span>
                    <span className="ico-svg">
                      <img
                        src="/assets/svg/my-header.svg"
                        alt=""
                      />
                    </span>
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">회원 정보</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">설정</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-selected">
                            <span className="select-option__item-text">관리자</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">로그아웃</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item is-submenu">
                            <span className="select-option__item-text">뉴스와이어</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '200px' }}
            >
              <p className="guide__item--title">n4</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="select__section select-type3-n4">
                  <button className="select__label">
                    <span className="select__label-text">홍보팀</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      {/* 화살표 없을 때 */}
                      <p className="select-option__group-title type-text">삼성전자</p>

                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">마케팅팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">신제품 개발</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">전략기획팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">반도체팀</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type3-n4 is-show"
                  style={{ marginLeft: '150px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍보팀</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      {/* 화살표 없을 때 */}
                      <p className="select-option__group-title type-text">삼성전자</p>

                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">마케팅팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">신제품 개발</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">전략기획팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">반도체팀</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="select__section select-type3-n4 is-show"
                  style={{ marginLeft: '150px' }}
                >
                  <button className="select__label">
                    <span className="select__label-text">홍보팀</span>
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </button>

                  <div className="select-option__section">
                    <div className="select-option__area">
                      {/* 화살표 있을 때 */}
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a
                          href=""
                          className="select-option__group-title is-submenu"
                        >
                          삼성전자
                        </a>
                      </Link>

                      <ul className="select-option__group">
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">마케팅팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">신제품 개발</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">전략기획팀</span>
                          </button>
                        </li>
                        <li>
                          <button className="select-option__item">
                            <span className="select-option__item-text">반도체팀</span>
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

        <h2
          className="guide__title"
          style={{ marginTop: '100px' }}
        >
          select-form
        </h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">옵션없이 Label</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn">
                  <FormTitle
                    title={'제목'}
                    required={true}
                  />

                  <div className="select-form__group">
                    <button
                      className="select-form__label"
                      disabled
                    >
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                  </div>

                  <FormMsg msg={'폼 텍스트 샘플입니다.'} />
                </div>
                <div
                  className="select-form__section select-form-btn"
                  style={{ marginTop: '30px' }}
                >
                  <FormTitle
                    title={'제목'}
                    tooltip={true}
                  >
                    <Tooltips
                      tooltipId={'tt10-4'}
                      tooltipPlace={'top'}
                      tooltipHtml={'툴팁입니다.'}
                      tooltipComponent={<IcoTooltip />}
                    />
                  </FormTitle>

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                  </div>
                </div>
                <div
                  className="select-form__section select-form-btn"
                  style={{ marginTop: '30px' }}
                >
                  <FormTitle title={'제목'} />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                  </div>
                </div>
                <div
                  className="select-form__section select-form-btn is-success"
                  style={{ marginTop: '30px' }}
                >
                  <FormTitle title={'제목'} />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                  </div>

                  <FormMsg msg={'폼 텍스트 샘플입니다.'} />
                </div>
                <div
                  className="select-form__section select-form-btn is-danger"
                  style={{ marginTop: '30px' }}
                >
                  <FormTitle title={'제목'} />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                  </div>

                  <FormMsg msg={'폼 텍스트 샘플입니다.'} />
                </div>
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">select-form-btn 옵션</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn is-show">
                  <FormTitle
                    title={'제목'}
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
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '100px' }}
            >
              <p className="guide__item--title">select-form-btn 옵션 + 검색창</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn is-show">
                  <FormTitle
                    title={'제목'}
                    required={true}
                  />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>

                    <div className="select-form-option__section">
                      <FormInputSearch placeholder={'검색'} />
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
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '150px' }}
            >
              <p className="guide__item--title">체크박스 옵션 + 검색창</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn is-show">
                  <FormTitle
                    title={'제목'}
                    required={true}
                  />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">선택</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>

                    <div className="select-form-option__section">
                      <FormInputSearch placeholder={'검색'} />
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck1"
                                id="ck1"
                                label="옵션 1"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck2"
                                id="ck2"
                                label="옵션 2"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck3"
                                id="ck3"
                                label="옵션 3"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck4"
                                id="ck4"
                                label="옵션 4"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck5"
                                id="ck5"
                                label="옵션 5"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck6"
                                id="ck6"
                                label="옵션 6"
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '250px' }}
            >
              <p className="guide__item--title">select-form-btn 그룹형</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn is-show is-selected">
                  <FormTitle
                    title={'제목'}
                    required={true}
                  />

                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">
                        주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                      </span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>

                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <h6 className="select-form-option__group-title">언론인</h6>
                        <ul className="select-form-option__group">
                          <li>
                            <button className="select-form-option__item is-selected">
                              <span className="select-form-option__item-text">
                                주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">국회 출입 기자자</span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                            </button>
                          </li>
                        </ul>
                        <h6 className="select-form-option__group-title">매체</h6>
                        <ul className="select-form-option__group">
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">
                                주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">국회 출입 기자자</span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '250px' }}
            >
              <p className="guide__item--title">select-form-btn 그룹형 - 제목 없음</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-btn is-show is-selected">
                  <div className="select-form__group">
                    <button className="select-form__label">
                      <span className="select-form__label-text">
                        주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                      </span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>

                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <h6 className="select-form-option__group-title">언론인</h6>
                        <ul className="select-form-option__group">
                          <li>
                            <button className="select-form-option__item is-selected">
                              <span className="select-form-option__item-text">
                                주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">국회 출입 기자자</span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                            </button>
                          </li>
                        </ul>
                        <h6 className="select-form-option__group-title">미디어</h6>
                        <ul className="select-form-option__group">
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">
                                주요 일간지 정보보안 담당기자 목록 주요 일간지 정보보안 담당기자 목록
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">국회 출입 기자자</span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">경제 / 경영 잡지 기자자</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '250px' }}
            >
              <p className="guide__item--title">select-form-input 옵션</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-input is-show">
                  <div className="select-form__group">
                    <FormInputText
                      title={'제목'}
                      value={'검색'}
                    />

                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">
                                <b className="print">중앙</b>일보
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item is-selected">
                              <span className="select-form-option__item-text">
                                <b className="print">중앙</b>SUNDAY
                              </span>
                            </button>
                          </li>
                          <li>
                            <button className="select-form-option__item">
                              <span className="select-form-option__item-text">
                                <b className="print">중앙</b>매일
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '100px' }}
            >
              <p className="guide__item--title">select-form-input 검색결과없음</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-input is-show">
                  <div className="select-form__group">
                    <FormInputText
                      title={'제목'}
                      value={'검색'}
                    />

                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <div className="select-form-option__none">검색결과가 없습니다.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '100px' }}
            >
              <p className="guide__item--title">select-form-input 체크박스 옵션</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-input is-show">
                  <div className="select-form__group">
                    <FormInputText
                      title={'제목'}
                      value={'검색'}
                    />
                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck10"
                                id="ck10"
                                label="옵션 10"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck11"
                                id="ck11"
                                label="옵션 11"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck12"
                                id="ck12"
                                label="옵션 12"
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '130px' }}
            >
              <p className="guide__item--title">select-form-input 체크박스 옵션 + 분야그룹별 선택</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-input is-show">
                  <div className="select-form__group">
                    <FormInputText
                      title={'제목'}
                      value={'검색'}
                    />
                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck20"
                                id="ck20"
                                label="옵션 20"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck21"
                                id="ck21"
                                label="옵션 21"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck22"
                                id="ck22"
                                label="옵션 22"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="select-form-footer__group">
                          <button
                            type="button"
                            className="select-form-footer__button"
                          >
                            분야 그룹별 선택하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '170px' }}
            >
              <p className="guide__item--title">select-form-input 체크박스 옵션 + 태그</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-input is-show">
                  <div className="select-form__group">
                    <FormInputText
                      title={'제목'}
                      value={'검색'}
                    />
                    <div className="select-form-option__section">
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck30"
                                id="ck30"
                                label="옵션 30"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck31"
                                id="ck31"
                                label="옵션 31"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck32"
                                id="ck32"
                                label="옵션 32"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="select-form-footer__group">
                          <button
                            type="button"
                            className="select-form-footer__button button-tag"
                          >
                            "갤럭시" 새 태그 만들기
                          </button>
                          <button
                            type="button"
                            className="select-form-footer__button"
                          >
                            전체 태그 보기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="guide__item"
              style={{ marginTop: '200px' }}
            >
              <p className="guide__item--title">select-editor (pencilFill2)</p>
              <div className="guide__box g--type2">
                <div className="select-form__section select-form-editor is-show">
                  <div className="select-form__group">
                    <button className="select__label">
                      <span className="hidden">편집</span>
                      <b className="ico">
                        <IcoSvg data={icoSvgData.pencilFill2} />
                      </b>
                      <b className="arrow">
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </b>
                    </button>

                    <div className="select-form-option__section">
                      <FormInputSearch placeholder={'검색'} />
                      <div className="select-form-option__area">
                        <ul className="select-form-option__group">
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck30"
                                id="ck30"
                                label="옵션 30"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck31"
                                id="ck31"
                                label="옵션 31"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="select-form-option__item-input">
                              <FormInputBtn
                                type="checkbox"
                                name="ck32"
                                id="ck32"
                                label="옵션 32"
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="select-form-footer__group">
                          <button
                            type="button"
                            className="select-form-footer__button button-tag"
                          >
                            "갤럭시" 새 태그 만들기
                          </button>
                          <button
                            type="button"
                            className="select-form-footer__button"
                          >
                            전체 태그 보기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 태그 적용하는 곳 tags__section */}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
