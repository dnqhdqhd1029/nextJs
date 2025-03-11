/**
 * @file Popup-type4.tsx
 * @description Popup-type4 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePickerContainer from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
import Tag from '~/publishing/components/common/ui/Tag'
import UploadFileByInput from '~/publishing/components/common/ui/UploadFileByInput'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup type5</h2>

        <code className="guide__code">
          - max-width: 300px, 500px, 800px, 1140px
          <br />- popup__section에 w500 형태로 클래스 추가.
          <br />- input value 있을 때 x 버튼 출력, 미노출일 때 개발 필요 (디자인 참고)
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 1</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">모니터링 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li className="is-active">
                        <p className="steps__text">검색조건</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">이메일</p>
                      </li>
                      <li>
                        <p className="steps__text">알림</p>
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
                <ul className="interval-mt14">
                  <li>
                    <FormInputText
                      title={'모니터링 이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'카테고리'}
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
                    <div className="mb-contents-pb16__group">
                      <FormTitle title={'아래의 검색 조건으로 모니터링이 저장됩니다.'} />
                      <div className="mb-contents-pb16__group">
                        <p className="font-body__small color-secondary">필터의 조건은 포함되지 않음</p>
                      </div>
                      <div className="keywords__section">
                        <div className="keywords__group">
                          <p className="keywords__item type-title">키워드 :</p>
                          <p className="keywords__item">
                            (삼성 <span className="type-operator">OR</span> 애플){' '}
                            <span className="type-operator">AND</span> (샤오미 <span className="type-operator">OR</span>{' '}
                            화웨이) <span className="type-operator">NOT</span> (엘지{' '}
                            <span className="type-operator">OR</span> 모토로라)
                          </p>
                        </div>

                        <div className="keywords__button">
                          <Button
                            label={'검색 조건 수정하기'}
                            cate={'link-text'}
                            size={'s'}
                            color={'body-link'}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <ul className="grid-col2">
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
                        <div className="select-form__section select-form-btn">
                          <FormTitle
                            title={'공유 대상'}
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
                    </ul>
                  </li>
                  <li>
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
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck1"
                            id="ck1"
                            label="뉴스 알리미 설정(이메일 알림 수신)"
                          />
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 2</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">모니터링 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">검색조건</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">이메일</p>
                      </li>
                      <li>
                        <p className="steps__text">알림</p>
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
                <ul>
                  <li>
                    <FormInputText
                      title={'제목'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="메세지" />
                      <div className="textarea__group">
                        <textarea
                          rows={6}
                          placeholder="이메일에 표시 할 내용 입력"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'받는 사람'}
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
                    <div className="ipt-text__section">
                      <FormInputText
                        title={'받는 메일 추가'}
                        addBtn={true}
                      />
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
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'뉴스 정렬'}
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 3</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">모니터링 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">검색조건</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">이메일</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">알림</p>
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
                <ul className="interval-mt14">
                  <li>
                    <div className="mb-contents-pb16__group">
                      <p className="font-body__regular">
                        모니터링은 중복되는 뉴스는 제외하고 신규 뉴스만 메일로 발송됩니다.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'이메일 수신 시간 선택'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-no3"
                            id="rdo-no3-0"
                            label="평일"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-no3"
                            id="rdo-no3-1"
                            label="주말"
                          />
                        </li>
                      </ul>
                      <ul className="ipt-btn__list--row type-align-cen">
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-0"
                            label="월"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-1"
                            label="화"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-2"
                            label="수"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-3"
                            label="목"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-4"
                            label="금"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-5"
                            label="토"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-6"
                            label="일"
                          />
                        </li>
                        <li>
                          <SelectTime placeholder={'시간 선택'} />
                        </li>
                        <li>
                          <Button
                            label={'버튼'}
                            cate={'default-ico-only'}
                            size={'m'}
                            color={'outline-form'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.plusLg}
                          />
                        </li>
                      </ul>
                      <p className="font-body__small color-secondary">
                        수신시간을 매시 정각인 00분으로 설정하면 수요가 몰려 발송이 늦어질 수 있습니다.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'선택한 수신 시간'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row type-align-cen">
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-10"
                            label="월"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-11"
                            label="화"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-12"
                            label="수"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-13"
                            label="목"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-14"
                            label="금"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-15"
                            label="토"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="checkbox"
                            name="ck-no3"
                            id="ck-no3-16"
                            label="일"
                          />
                        </li>
                        <li>
                          <SelectTime placeholder={'시간 선택'} />
                        </li>
                        <li>
                          <Button
                            label={'버튼'}
                            cate={'default-ico-only'}
                            size={'m'}
                            color={'outline-form'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.dashLg}
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'기간 선택'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-no3"
                            id="rdo-no3-10"
                            label="계속"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-no3"
                            id="rdo-no3-11"
                            label="종료일 설정"
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <FormTitle
                        title={'종료일'}
                        required={true}
                      />
                      <DatePickerContainer />
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
                      label={'저장'}
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
          <h2 className="guide__item--title">No. 4</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">보고서 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li className="is-active">
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
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
                <ul>
                  <li>
                    <FormInputText
                      title={'보고서 이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="template-ipt-btn__section type-paragraph">
                      <FormTitle
                        title={'템플릿'}
                        required={true}
                      />
                      <ul className="template-ipt-btn__list">
                        <li>
                          <div className="template-ipt-btn__item">
                            <input
                              type="radio"
                              name="rt0"
                              id="rt0-1"
                              checked
                            />
                            <label htmlFor="rt0-1">
                              <b className="item__thumb">
                                <span className="item-thumb__txt">보고서</span>
                                <span className="item-thumb__img"></span>
                              </b>
                              <span className="item__label">제목형 템플릿</span>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="template-ipt-btn__item">
                            <input
                              type="radio"
                              name="rt0"
                              id="rt0-2"
                            />
                            <label htmlFor="rt0-2">
                              <b className="item__thumb">
                                <span className="item-thumb__txt">보고서</span>
                                <span className="item-thumb__img"></span>
                              </b>
                              <span className="item__label">제목 본문형 템플릿</span>
                            </label>
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 5</h2>
          <div className="guide__group">
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 6</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">보고서 만들기</h2>
                <div className="popup-header__steps">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">뉴스 정렬</p>
                      </li>
                      <li className="is-active">
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
                <div className="tabs__section type1-medium">
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list">
                      <li className="is-active">
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">이메일 발송</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">다운로드</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tabs-panel__section">
                    <div className="tabs-panel__group">
                      <ul>
                        <li>
                          <div className="template-ipt-btn__section type-icon">
                            <FormTitle
                              title={'양식'}
                              required={true}
                            />
                            <div className="font-body__group">
                              <p className="font-body__regular">동시에 여러 개를 선택할 수 있습니다.</p>
                            </div>
                            <ul className="template-ipt-btn__list">
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="checkbox"
                                    name="rt1"
                                    id="rt1-1"
                                    defaultChecked
                                  />
                                  <label htmlFor="rt1-1">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <IcoSvg data={icoSvgData.envelopeFill} />
                                      </span>
                                    </b>
                                    <span className="item__label">이메일 본문</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="checkbox"
                                    name="rt1"
                                    id="rt1-2"
                                  />
                                  <label htmlFor="rt1-2">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <IcoSvg data={icoSvgData.wordFill} />
                                      </span>
                                    </b>
                                    <span className="item__label">워드 첨부</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="template-ipt-btn__item">
                                  <input
                                    type="checkbox"
                                    name="rt1"
                                    id="rt1-3"
                                  />
                                  <label htmlFor="rt1-3">
                                    <b className="item__thumb">
                                      <span className="item-thumb__img">
                                        <IcoSvg data={icoSvgData.pdfFill} />
                                      </span>
                                    </b>
                                    <span className="item__label">PDF 첨부</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <FormInputText
                            title={'메일 제목'}
                            required={true}
                          />
                        </li>
                        <li>
                          <div className="mb-contents-pb16__group">
                            <FormTitle title={'받는 사람'} />

                            <div className="select-form__section select-form-btn">
                              <div className="select-form__group">
                                <button className="select-form__label">
                                  <span className="select-form__label-text">선택</span>
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </button>

                                <div className="select-form-option__section">
                                  <div className="select-option-search__section">
                                    <FormInputSearch placeholder={'검색'} />
                                  </div>

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
                          <div className="ipt-text__section">
                            <FormInputText
                              title={'받는 메일 추가'}
                              addBtn={true}
                            />
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
                          <div className="textarea__area">
                            <FormTitle title="메세지" />
                            <div className="textarea__group">
                              <textarea rows={6} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                      label={'발송하기'}
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 7</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">미디어 자료실</h2>
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
                <div className="tabs__section type1-medium">
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list">
                      <li className="is-active">
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">이미지</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">파일</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tabs-panel__section type-pt14">
                    <div className="tabs-panel__group">
                      <ul className="interval-mt28">
                        <li>
                          <p className="font-body__regular">
                            Jpg, gif, png 파일 형식의 3MB 이하 파일을 업로드 할 수 있습니다. 아래에서 사진을 선택하거나,
                            새로운 사진을 추가하세요.
                          </p>
                        </li>
                        <li>
                          <div className="popup-file-list__group">
                            <div className="popup-file-list__upload">
                              <UploadFileByInput />
                            </div>

                            <div className="popup-file-list__pagination">
                              <Pagination cate={'n1'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'확인'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 8</h2>
          <div className="guide__group">
            <div className="popup__section w1140 fix-height">
              <div className="popup-header__section">
                <h2 className="popup-header__title">미디어 자료실</h2>
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
                <div className="tabs__section type1-medium">
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list">
                      <li>
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">이미지</span>
                        </button>
                      </li>
                      <li className="is-active">
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">파일</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tabs-panel__section type-pt14">
                    <div className="tabs-panel__group">
                      <div className="file-uploader-button__section">
                        <ul className="interval-mt28">
                          <li>
                            <div className="popup-file-list__header">
                              <p className="font-body__regular">
                                ppt, pdf, xls, zip, hwp, doc 파일 형식의 3MB 이하 파일을 업로드 할 수 있습니다.
                                <br />
                                아래에서 파일을 선택하거나, 새로운 파일을 추가하세요.
                              </p>

                              <div className="file-uploader-button__header">
                                <div className="file-uploader-button__group">
                                  {/* input 마우스오버, 클릭 기준 type-over / type-press 클래스 적용 */}
                                  <button
                                    type="button"
                                    className="file-uploader-button__upload"
                                  >
                                    <span className="file-uploader-button__text">파일 업로드</span>
                                  </button>
                                  <input
                                    type="file"
                                    className="file-uploader-button__input"
                                    multiple
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="popup-file-list__group">
                              <div className="file-uploader-button__list">
                                <ul className="file-uploader-button-list__group">
                                  <li>
                                    {/* 해당 영역 클릭했을 때 is-selected 클래스 추가 */}
                                    <div className="file-uploader-button-list__item is-selected">
                                      <p className="file-uploader-button-item__name">신제품 기획기사 미팅 어젠다.pdf</p>
                                      <p className="file-uploader-button-item__size">230 KB</p>
                                      <button
                                        type="button"
                                        className="file-uploader-button-item__delete"
                                      >
                                        <IcoSvg data={icoSvgData.trash} />
                                        <span className="text">Delete (삭제)</span>
                                      </button>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="file-uploader-button-list__item">
                                      <p className="file-uploader-button-item__name">
                                        삼성 멀티캠퍼스 신제품 기획기사 미팅 어젠다.pdf삼성 멀티캠퍼스 신제품 기획기사
                                        미팅 어젠다.pdf삼성 멀티캠퍼스 신제품 기획기사 미팅 어젠다.pdf
                                      </p>
                                      <p className="file-uploader-button-item__size">1,432 KB</p>
                                      <button
                                        type="button"
                                        className="file-uploader-button-item__delete"
                                      >
                                        <IcoSvg data={icoSvgData.trash} />
                                        <span className="text">Delete (삭제)</span>
                                      </button>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div className="popup-file-list__pagination">
                                <Pagination cate={'n1'} />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'확인'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. </h2>
          <div className="guide__group"></div>
        </div> */}
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
