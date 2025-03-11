/**
 * @file Popup-type4.tsx
 * @description Popup-type4 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section pd-0">
        <h2
          className="guide__title"
          style={{ padding: '10px' }}
        >
          팝업 반응형 처리
        </h2>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">w500</h2>
          <div className="guide-popup__section type-w500">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">클립북 만들기</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <ul>
                  <li>
                    <FormInputText
                      title={'이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormInputBtn
                        type="checkbox"
                        name="ck-no12"
                        id="ck-no12"
                        label="커버리지 설정"
                      />
                      <p className="ipt-btn__desc">
                        커버리지 클립북으로 설정해 일반 클립북과 다른 유형으로 관리할 수 있습니다. 또한 관련 보도자료를
                        연결할 수 있습니다.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'관련 보도자료'} />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">선택</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <FormInputSearch placeholder="검색" />
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
                    <div className="select-form__section select-form-btn is-selected ">
                      <FormTitle title={'공유 설정'} />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">비공개 (소유자만 보고 수정할 수 있음)</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <button className="select-form-option__item is-selected">
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
                                    수정 (동료가 볼 수 있고 추가, 수정, 삭제 가능)
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
                    <div>
                      <div className="ipt-btn__section">
                        <FormTitle title={'변경한 공유 설정을 목록 만들기에 기본값으로 사용하겠습니까?'} />
                        <ul className="ipt-btn__list--row">
                          <li>
                            <FormInputBtn
                              type="checkbox"
                              name="ck1"
                              id="ck1"
                              label="기본값으로 사용"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'소유자'} />

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
                </ul>
              </div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'저장'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">w800 (기준 960px)</h2>
          <div className="guide-popup__section type-w800">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">이메일 수정</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <ul>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="상태" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">초안</span>
                      </p>
                    </div>
                  </li>
                </ul>
                <ul className="grid-col2">
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'발송 시간'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-0"
                            label="즉시"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-1"
                            label="예약"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <FormTitle
                      title={'예약시간 선택'}
                      required={true}
                    />
                    <div className="datepicker-time__section">
                      <div className="datepicker-time__group">
                        <DatePicker />
                        <SelectTime placeholder={'시간 선택'} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'템플릿'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-1"
                            id="rdo-1-0"
                            label="사용 안함"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-1"
                            id="rdo-1-1"
                            label="사용"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'템플릿 선택'}
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
                </ul>
                <ul>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="보낸 사람" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">홍길동</span>
                      </p>
                    </div>
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
                              name="rdo-10"
                              id="rdo-10-0"
                              label="언론인"
                              checked
                            />
                          </li>
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-10"
                              id="rdo-10-1"
                              label="매체"
                            />
                          </li>
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-10"
                              id="rdo-10-2"
                              label="언론인 목록"
                            />
                          </li>
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-10"
                              id="rdo-10-3"
                              label="매체 목록"
                            />
                          </li>
                        </ul>
                      </div>

                      <div className="select-form__section select-form-input">
                        <div className="select-form__group">
                          <FormInputText />
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
                                      subLabel="머니투데이, the300"
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
                                      subLabel="소비자평가신문"
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
                                      subLabel="비즈니스리포트"
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
                    <FormInputText
                      title={'제목'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <FormTitle
                        title="내용"
                        required={true}
                      />
                      <div className="editor__section">에디터영역</div>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'공유 설정'}
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
                </ul>
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
              </div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
                    <Button
                      label={'취소'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                    <Button
                      label={'저장'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </li>
                  <li>
                    <Button
                      label={'보내기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">w1140 (기준 1200px)</h2>
          <div className="guide-popup__section type-w1140">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">보고서 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">뉴스 정렬</p>
                      </li>
                      <li>
                        <p className="steps__text">발송 및 다운로드</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <ul className="interval-mt28">
                  <li>
                    <ul className="grid-col2">
                      <li>
                        <div className="template-news__section">
                          <ul className="interval-mt8">
                            <li>
                              <div className="template-news__header">
                                <p className="template-news__title">뉴스 정렬</p>
                              </div>
                            </li>
                            <li>
                              <p className="font-body__regular">
                                보고서의 뉴스 순서 정렬. 뉴스가 정렬된 후 언제든지 다시 뉴스 정렬 순서를 변경할 수
                                있습니다.
                              </p>
                            </li>
                            <li>
                              <div className="template-news__select">
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
                                              <span className="select-form-option__item-text">오늘</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-form-option__item">
                                              <span className="select-form-option__item-text">지난 3일</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="template-news__section">
                          <ul className="interval-mt8">
                            <li>
                              <div className="template-news__header">
                                <FormInputToggle
                                  label="뉴스 자동 그룹핑"
                                  name="cT1"
                                  id="cT1"
                                  reverse={true}
                                />
                              </div>
                            </li>
                            <li>
                              <p className="font-body__regular">
                                미디어 유형, 미디어 가치, 논조, 태그에 따라 뉴스를 자동으로 그룹화합니다.
                              </p>
                            </li>
                            <li>
                              <div className="template-news__select">
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
                                              <span className="select-form-option__item-text">오늘</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-form-option__item">
                                              <span className="select-form-option__item-text">지난 3일</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {/* 서브 타이틀 없을 때 */}
                    <div className="list-type9__section">
                      <div className="list-type9__header">
                        <ul className="interval-mt12">
                          <li>
                            <div className="list-type9-header__title">뉴스24개</div>
                          </li>
                        </ul>
                      </div>

                      <ul className="list-type9__group">
                        <li>
                          <div className="list-type9-item__section is-dragged">
                            <ul className="list-type9-item__list">
                              <li className="button drag">
                                <IcoSvg data={icoSvgData.gripVertical} />
                              </li>
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section">
                            <ul className="list-type9-item__list">
                              <li className="button drag">
                                <IcoSvg data={icoSvgData.gripVertical} />
                              </li>
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section">
                            <ul className="list-type9-item__list">
                              <li className="button drag">
                                <IcoSvg data={icoSvgData.gripVertical} />
                              </li>
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    {/* 메인 타이틀 & 서브 타이틀 ~ 서브타이틀 */}
                    <div className="list-type9__section">
                      <div className="list-type9__header">
                        <ul className="interval-mt12">
                          <li>
                            <div className="list-type9-header__title">뉴스24개</div>
                          </li>
                          <li>
                            <div className="list-type9-header__sub-title">
                              <div className="list-type9-header__title">
                                종합일간 신문 <span className="count">3</span>
                              </div>

                              <div className="list-type9-header__buttons">
                                <Button
                                  label={'위'}
                                  cate={'ico-only'}
                                  size={'s'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.chevronThickLeft}
                                  icoSize={16}
                                  disabled={true}
                                />
                                <Button
                                  label={'아래'}
                                  cate={'ico-only'}
                                  size={'s'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.chevronThickLeft}
                                  icoSize={16}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <ul className="list-type9__group">
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>

                      <div className="list-type9__header">
                        <ul className="interval-mt12">
                          <li>
                            <div className="list-type9-header__sub-title">
                              <div className="list-type9-header__title">
                                종합일간 신문 <span className="count">3</span>
                              </div>

                              <div className="list-type9-header__buttons">
                                <Button
                                  label={'위'}
                                  cate={'ico-only'}
                                  size={'s'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.chevronThickLeft}
                                  icoSize={16}
                                />
                                <Button
                                  label={'아래'}
                                  cate={'ico-only'}
                                  size={'s'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.chevronThickLeft}
                                  icoSize={16}
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <ul className="list-type9__group">
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="list-type9-item__section is-not-dragged">
                            <ul className="list-type9-item__list">
                              <li>
                                <p className="list-type9-item__title">
                                  <Button
                                    elem="a"
                                    url={'#!'}
                                    label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                  />
                                </p>
                                <p className="list-type9-item__info">
                                  <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                                </p>
                              </li>
                              <li className="button close">
                                <Button
                                  label={'닫기'}
                                  cate={'ico-only'}
                                  size={'s24'}
                                  color={'secondary'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.iconCloseButton2}
                                  icoSize={16}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
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
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronThickRight}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
