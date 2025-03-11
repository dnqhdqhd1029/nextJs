/**
 * @file ND01.tsx
 * @description ND01 페이지
 */

import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
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
                <h2 className="distribute-steps-header__title">보도자료 배포: 설정</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li className="is-active">
                        <p className="steps__text">설정</p>
                      </li>
                      <li>
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
                  <ul>
                    <li>
                      <FormTitle
                        title="배포명"
                        required={true}
                      />
                      <FormTitle title="보도자료를 관리하기 위한 제목으로, 수신자에게는 보이지 않습니다." />
                      <FormInputText />
                    </li>
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <FormInputText
                            title={'보내는 사람'}
                            tooltip={true}
                            value="홍길동"
                            readonly={true}
                          >
                            <Tooltips
                              tooltipId={'tt10-4'}
                              tooltipPlace={'top'}
                              tooltipHtml={
                                '최근 3개월 이내 뉴스에서 특정 단어를<br />언급한 언론인을 검색합니다. 단어 사이에<br />and, or, not 등 불리언 연산자를 사용하고,<br />여러 단어로 된 문장은 따옴표("")로 묶어서<br />검색할 수 있습니다.'
                              }
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormInputText>
                        </li>
                        <li>
                          <FormInputText
                            title={'회신 메일'}
                            tooltip={true}
                            value="gildong.hong@google.com"
                            readonly={true}
                          >
                            <Tooltips
                              tooltipId={'tt10-4'}
                              tooltipPlace={'top'}
                              tooltipHtml={
                                '최근 3개월 이내 뉴스에서 특정 단어를<br />언급한 언론인을 검색합니다. 단어 사이에<br />and, or, not 등 불리언 연산자를 사용하고,<br />여러 단어로 된 문장은 따옴표("")로 묶어서<br />검색할 수 있습니다.'
                              }
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormInputText>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <div className="ipt-btn__section add-pb10">
                          <FormTitle
                            title={'받는 사람'}
                            required={true}
                          />
                          <ul className="ipt-btn__list--row">
                            <li>
                              <FormInputBtn
                                type="radio"
                                name="rdo-100"
                                id="rdo-100-0"
                                label="언론인 목록"
                                checked
                              />
                            </li>
                            <li>
                              <FormInputBtn
                                type="radio"
                                name="rdo-100"
                                id="rdo-100-1"
                                label="미디어 목록"
                              />
                            </li>
                            <li>
                              <FormInputBtn
                                type="radio"
                                name="rdo-100"
                                id="rdo-100-2"
                                label="언론인"
                              />
                            </li>
                            <li>
                              <FormInputBtn
                                type="radio"
                                name="rdo-100"
                                id="rdo-100-3"
                                label="미디어"
                              />
                            </li>
                          </ul>
                        </div>

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
                                    <div className="select-form-option__item-input">
                                      <FormInputBtn
                                        type="checkbox"
                                        name="ck1000"
                                        id="ck1000"
                                        label="정보보안 전문 미디어"
                                        desc="40개(이메일 12개)"
                                        history="2022-10-24 홍길동 최종 수정"
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="select-form-option__item-input">
                                      <FormInputBtn
                                        type="checkbox"
                                        name="ck1001"
                                        id="ck1001"
                                        label="소프트웨어 전문 기자"
                                        desc="40개(이메일 12개)"
                                        history="2022-10-24 홍길동 최종 수정"
                                      />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tags__section">
                          <ul className="tags__list">
                            <li>
                              <Tag
                                label={'박가연'}
                                subLabel="중알일보"
                                cate={'n3'}
                                shape={'round'}
                                close={true}
                              />
                            </li>
                            <li>
                              <Tag
                                label={'중앙일보'}
                                cate={'n3'}
                                shape={'round'}
                                close={true}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <FormInputText title="메일 추가" />
                        </li>
                        <li>
                          <FormTitle title="나에게도 보내기" />
                          <FormInputToggle
                            id="tg1"
                            name="tg1"
                          />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="ipt-text__area">
                        <FormTitle title="총 수신자" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">총 120명 (중복 3명, 수신거부 2명, 발송차단 3명 제외)</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle title={'프로젝트'} />

                            <div className="select-form__group">
                              <button className="select-form__label">
                                <span className="select-form__label-text">선택</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-form-option__section">
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck51"
                                          id="ck51"
                                          label="옵션 1"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck52"
                                          id="ck52"
                                          label="옵션 2"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck53"
                                          id="ck53"
                                          label="옵션 3"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck54"
                                          id="ck54"
                                          label="옵션 4"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck55"
                                          id="ck55"
                                          label="옵션 5"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck56"
                                          id="ck56"
                                          label="옵션 6"
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
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText title={'태그'} />
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
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tags__section">
                              <ul className="tags__list">
                                <li>
                                  <Tag
                                    label={'태그1'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                                <li>
                                  <Tag
                                    label={'태그2'}
                                    cate={'n3'}
                                    shape={'round'}
                                    close={true}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__footer">
              <div className="distribute-steps__footer">
                <FooterButton />
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
