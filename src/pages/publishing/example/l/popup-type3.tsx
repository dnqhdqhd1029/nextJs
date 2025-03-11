/**
 * @file Popup-type3.tsx
 * @description Popup-type3 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup type3</h2>

        <code className="guide__code">
          - max-width: 300px, 500px, 800px, 1140px
          <br />- popup__section에 w500 형태로 클래스 추가.
          <br />- input value 있을 때 x 버튼 출력, 미노출일 때 개발 필요 (디자인 참고)
          <br />- popup-footer__section은 popup-bottom 참고하여 적용
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 1</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">개인 추가 언론인 수정</h2>
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
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">이름, 매체명, 이메일은 필수 입력항목입니다.</p>
                </div>

                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title={'이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'매체명'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText title={'부서'} />
                  </li>
                  <li>
                    <FormInputText title={'직책'} />
                  </li>
                  <li>
                    <FormInputText
                      title={'이메일'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'휴대전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText title={'담당 분야'} />
                  </li>
                </ul>

                <ul>
                  <li>
                    <FormInputText title={'주소'} />
                  </li>
                </ul>

                <ul className="grid-col2">
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="경력" />
                      <div className="textarea__group">
                        <textarea rows={2} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="학력" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="19OO OO대 OO과 졸업"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="저서" />
                      <div className="textarea__group">
                        <textarea
                          placeholder="2000 책제목, 출판사"
                          rows={2}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="경력" />
                      <div className="textarea__group">
                        <textarea rows={2} />
                      </div>
                    </div>
                  </li>
                </ul>

                <ul>
                  <li>
                    <div className="form-social-media__section">
                      <h3 className="form-social-media__title">
                        <Button
                          label={'소셜미디어 추가'}
                          cate={'link-ico-text'}
                          size={''}
                          color={'body-link'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.plus}
                        />
                      </h3>
                      <div className="form-social-media__group">
                        <ul className="form-social-media__list">
                          <li>
                            <div className="form-social-media__item">
                              <div className="select">
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
                              <div className="input">
                                <FormInputText placeholder="내용" />
                              </div>
                              <div className="button">
                                <Button
                                  label={'삭제'}
                                  cate={'default'}
                                  size={'m'}
                                  color={'link'}
                                />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="form-social-media__item">
                              <div className="select">
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
                              <div className="input">
                                <FormInputText placeholder="내용" />
                              </div>
                              <div className="button">
                                <Button
                                  label={'삭제'}
                                  cate={'default'}
                                  size={'m'}
                                  color={'link'}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
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
                  label={'삭제'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 2</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">매체 유형</h2>
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
                <div className="tree-menu__section">
                  <div className="tree-menu__area">
                    <div className="tree-menu__group type1">
                      <ul className="tree-menu__list">
                        <li>
                          <button className="tree-menu__button is-selected">
                            <span className="tree-menu__button-text">신문</span>
                          </button>
                        </li>
                        <li>
                          <button className="tree-menu__button">
                            <span className="tree-menu__button-text">잡지</span>
                          </button>
                        </li>
                        <li>
                          <button className="tree-menu__button">
                            <span className="tree-menu__button-text">방송</span>
                          </button>
                        </li>
                        <li>
                          <button className="tree-menu__button">
                            <span className="tree-menu__button-text">온라인</span>
                          </button>
                        </li>
                        <li>
                          <button className="tree-menu__button">
                            <span className="tree-menu__button-text">해외</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="tree-menu__group type2">
                      <ul className="tree-menu__list">
                        <li>
                          <div className="tree-menu__button-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck10"
                              id="ck10"
                              label="종합일간신문"
                              count={1000}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="tree-menu__button-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck11"
                              id="ck11"
                              label="종합일간신문"
                              count={1000}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="tree-menu__button-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck12"
                              id="ck12"
                              label="항목"
                              count={1000}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="tree-menu__button-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck13"
                              id="ck13"
                              label="항목"
                              count={1000}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="tree-menu__button-input">
                            <FormInputBtn
                              type="checkbox"
                              name="ck14"
                              id="ck14"
                              label="항목"
                              count={1000}
                            />
                          </div>
                        </li>
                      </ul>
                      <div className="tree-menu-footer__group">
                        <button
                          type="button"
                          className="tree-menu-footer__button"
                        >
                          전체 선택
                        </button>
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
          <h2 className="guide__item--title">No. 3</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">개인 추가 매체 수정</h2>
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
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">매체명은 필수 입력항목입니다.</p>
                </div>

                <ul className="grid-col2">
                  <li>
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText title={'매체명'} />
                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck110"
                                    id="ck110"
                                    label="옵션 20"
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck111"
                                    id="ck111"
                                    label="옵션 21"
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck112"
                                    id="ck112"
                                    label="옵션 22"
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
                        <div className="tags__delete">
                          <Button
                            label={'모두 제거'}
                            cate={'link-text'}
                            size={'s'}
                            color={'body-link'}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <FormInputText title={'웹사이트'} />
                  </li>
                  <li>
                    <FormInputText title={'이메일'} />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'팩스'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText title={'분야'} />
                  </li>
                </ul>

                <ul>
                  <li>
                    <FormInputText title={'주소'} />
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
          <h2 className="guide__item--title">No. 4</h2>
          <div className="guide__group">
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
                              label="미디어"
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
                              label="미디어 목록"
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
          <h2 className="guide__item--title">No. 5</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">개인 추가 뉴스 수정</h2>
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
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">날짜, 제목은 필수 입력항목입니다.</p>
                </div>
                <ul>
                  <li>
                    <div className="form-social-media__section">
                      <FormTitle title="링크" />
                      <div className="form-social-media__group">
                        <ul className="form-social-media__list">
                          <li>
                            <div className="form-social-media__item">
                              <div className="input">
                                <FormInputText placeholder="내용" />
                              </div>
                              <div className="button">
                                <Button
                                  label={'삭제'}
                                  cate={'default'}
                                  size={'m'}
                                  color={'link'}
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="form-2vs8__section">
                      <FormTitle title="링크" />
                      <div className="form-2vs8__group">
                        <div className="elem-8">
                          <FormInputText placeholder="https://" />
                        </div>
                        <div className="elem-2">
                          <Button
                            label={'정보 가져오기'}
                            cate={'default'}
                            size={'m'}
                            color={'outline-secondary'}
                          />
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
                    <FormTitle
                      title={'날짜'}
                      required={true}
                    />
                    <div className="datepicker-time__section">
                      <div className="datepicker-time__group">
                        <DatePicker />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="본문" />
                      <div className="textarea__group">
                        <textarea rows={6} />
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="grid-col2">
                  <li>
                    <div className="ipt-text__section">
                      <FormInputText
                        title={'미디어'}
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
                    <div className="ipt-text__section">
                      <FormInputText
                        title={'저자'}
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
                    {/* 텍스트 타입 */}
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'클립북'} />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">클립북 선택</span>
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

                    {/* 체크박스 타입 */}
                    {/* <div className="select-form__section select-form-input is-show">
                      <div className="select-form__group">
                        <FormInputText
                          title={'클립북'}
                          placeholder="검색 또는 새 태그 만들기
"
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
                    </div> */}
                  </li>
                  <li>
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText
                          title={'태그'}
                          placeholder="검색 또는 새 태그 만들기
"
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
          <h2 className="guide__item--title">No. 6</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">문의하기</h2>
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
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title={'이름'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'이메일'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'휴대전화'}
                      inputType="number"
                    />
                  </li>
                </ul>
                <ul>
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
                    <div className="mb-contents-pb16__group">
                      <div className="file-uploader-button__section type-only">
                        <FormTitle title="첨부" />
                        <div className="file-uploader-button__header">
                          <div className="file-uploader-button__group">
                            {/* input 마우스오버, 클릭 기준 type-over / type-press 클래스 적용 */}
                            <button
                              type="button"
                              className="file-uploader-button__upload"
                            >
                              <span className="file-uploader-button__text">파일 찾기</span>
                            </button>
                            <input
                              type="file"
                              className="file-uploader-button__input"
                              multiple
                            />
                          </div>
                          <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
                        </div>

                        <div className="file-uploader-button__list">
                          <ul className="file-uploader-button-list__group">
                            <li>
                              <div className="file-uploader-button-list__item">
                                <p className="file-uploader-button-item__name">신제품 기획기사 미팅 어젠다.pdf</p>
                                <button
                                  type="button"
                                  className="file-uploader-button-item__delete"
                                >
                                  <IcoSvg data={icoSvgData.trash} />
                                  <span className="text">파일 삭제</span>
                                </button>
                              </div>
                            </li>
                          </ul>
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
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
