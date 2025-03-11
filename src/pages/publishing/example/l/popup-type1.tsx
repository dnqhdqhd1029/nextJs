/**
 * @file Popup-type1.tsx
 * @description Popup-type1 페이지
 */

import ApexChartsColumn from '~/publishing/components/common/ui/ApexChartsColumn'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FileUploader2 from '~/publishing/components/common/ui/FileUploader2'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import {
  columnOptions,
  columnSeries,
  lineOptions,
  lineSeries,
  pieOptions1,
  pieOptions2,
  pieSeries1,
  pieSeries2,
} from '~/publishing/components/common/ui/json/chartsData'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
import Tag from '~/publishing/components/common/ui/Tag'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup type1</h2>

        <code className="guide__code">
          - max-width: 300px, 500px, 800px, 1140px
          <br />- popup__section에 w500 형태로 클래스 추가.
          <br />- input value 있을 때 x 버튼 출력, 미노출일 때 개발 필요 (디자인 참고)
          <br />- popup-footer__section은 popup-bottom 참고하여 적용
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 1</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">내 비밀번호 수정</h2>
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
                      title={'현재 비밀번호'}
                      inputType={'password'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'신규 비밀번호'}
                      inputType={'password'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'신규 비밀번호 확인'}
                      inputType={'password'}
                      required={true}
                    />
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
          <h2 className="guide__item--title">No. 2</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회원 정보 수정</h2>
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
                      value="홍길동"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'표시 이름'}
                      value="홍차장"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType={'number'}
                      value="024491234"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'휴대전화'}
                      inputType={'number'}
                      value="01012345678"
                    />
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn is-selected">
                      <FormTitle
                        title={'랜딩 페이지'}
                        required={true}
                      />

                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">홈</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <button className="select-form-option__item is-selected">
                                  <span className="select-form-option__item-text">홈</span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">옵션2</span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">옵션3</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'뉴스레터'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-0"
                            label="수신"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-1"
                            label="수신거부"
                            checked
                          />
                        </li>
                      </ul>
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
          <h2 className="guide__item--title">No. 3</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">미디어비 수신 거부 해제 요청</h2>
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
                      <FormTitle
                        title="내용"
                        required={true}
                      />
                      <div className="textarea__group">
                        <textarea rows={6} />
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
                  label={'보내기'}
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
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">언론인 맞춤 검색 수정</h2>
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
                    <FormInputText title={'맞춤 검색명'} />
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'공유 설정'} />

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
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'공유 대상'} />

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
                  label={'수정'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 5</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">언론인 목록 만들기</h2>
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
                      title={'목록명'}
                      value="주요 일간지 정보보안 담당 기자"
                    />
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
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">공유 설정 수정</h2>
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
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'공유 설정'} />

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
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'수정'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 7</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">4개 활동의 프로젝트 수정</h2>
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
                    <div className="ipt-btn__section">
                      <FormTitle title={'프로젝트'} />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-0"
                            label="추가"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-1"
                            label="제외"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-2"
                            label="대체(모두 제외 후 추가)"
                            checked
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="select-form__section select-form-btn">
                      <div className="select-form__group">
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
          <h2 className="guide__item--title">No. 8</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">전체 태그</h2>
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
                <div className="tree-menu__section type-w-full">
                  <div className="tree-menu__area">
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
          <h2 className="guide__item--title">No. 9</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">활동 만들기</h2>
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
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'유형'}
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
                                  <span className="select-form-option__item-text">홈</span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">옵션2</span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">옵션3</span>
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
                    <FormTitle
                      title={'날짜'}
                      tooltip={true}
                      required={true}
                    >
                      <Tooltips
                        tooltipId={'tt10-4'}
                        tooltipPlace={'top'}
                        tooltipHtml={
                          '활동이 있었거나 발생할 시간을 <br />지정합니다. 시간이 현재 시간보다 <br />과거이면 활동의 상태는 완료로 <br />표시되고, 미래이면 활동의 상태는 <br />진행 중으로 표시됩니다.'
                        }
                        tooltipComponent={<IcoTooltip />}
                      />
                    </FormTitle>
                    <div className="datepicker-time__section">
                      <div className="datepicker-time__group">
                        <DatePicker />
                        <SelectTime placeholder={'시간 선택'} />
                      </div>
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
                  <li>
                    <div className="textarea__area">
                      <FormTitle title="본문" />
                      <div className="textarea__group">
                        <textarea rows={2} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="form-3vs7__section">
                      <FormTitle title="관련 언론인과 매체" />
                      <div className="form-3vs7__group">
                        <div className="elem-3">
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
                        <div className="elem-7">
                          {/* input 형태 */}
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormInputText />
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
                          </div>

                          {/* 셀렉트 형태 */}
                          {/* <div className="select-form__section select-form-btn">
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
                      </div> */}
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
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'프로젝트명'} />

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
                  <li>
                    <div className="mb-contents-pb16__group">
                      <FileUploader2 />
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

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 10</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">4개 활동의 프로젝트 수정</h2>
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
                    <div className="ipt-btn__section">
                      <FormTitle title={'태그'} />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-0"
                            label="추가"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-1"
                            label="제외"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-0"
                            id="rdo-0-2"
                            label="대체(모두 제외 후 추가)"
                            checked
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText placeholder="검색 또는 새 태그 만들기" />
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
          <h2 className="guide__item--title">No. 11</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">모니터링 분석 공유하기</h2>
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
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'받는 사람'} />

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
                    <div className="ipt-text__area">
                      <FormTitle title="첨부파일" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">삼성전자 모니터링 분석.pdf</span>
                      </p>
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
                  label={'발송하기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 12</h2>
          <div className="guide__group">
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
          <h2 className="guide__item--title">No. 13</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회원 정보 수정</h2>
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
                    <FormInputText title={'표시 이름'} />
                  </li>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="이메일" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">gildong.hong@gmail.com</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'권한'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-13"
                            id="rdo-13-0"
                            label="관리자"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-13"
                            id="rdo-13-1"
                            label="사용자"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText
                          title={'그룹'}
                          required={true}
                        />
                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck100"
                                    id="ck100"
                                    label="옵션 20"
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck101"
                                    id="ck101"
                                    label="옵션 21"
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="select-form-option__item-input">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck102"
                                    id="ck102"
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
                      </div>
                    </div>
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
          <h2 className="guide__item--title">No. 14</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회원 상태 변경</h2>
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
                      <FormTitle title="이름" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">홍길동</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="이메일" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">gildong.hong@gmail.com</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title="상태"
                        required={true}
                      />
                      <div className="ipt-text__area type-pb6">
                        <p className="font-body__regular">
                          회원 상태 변경 후 1개월 이내에는 다시 상태를 바꿀 수 없습니다.
                        </p>
                      </div>
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-14"
                            id="rdo-14-0"
                            label="활성"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-14"
                            id="rdo-14-1"
                            label="비활성"
                            checked
                          />
                        </li>
                      </ul>
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
          <h2 className="guide__item--title">No. 15</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">가젯 추가</h2>
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
                <ul className="popup-gadget__list">
                  <li>
                    <div className="popup-gadget__group">
                      <p className="popup-gadget__text">활동</p>
                      <div className="popup-gadget__button">
                        <Button
                          label={'추가하기'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="popup-gadget__group">
                      <p className="popup-gadget__text">보도자료 배포</p>
                      <div className="popup-gadget__button">
                        <Button
                          label={'추가하기'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="popup-gadget__group">
                      <p className="popup-gadget__text">언론인 목록</p>
                      <div className="popup-gadget__button">
                        <Button
                          label={'추가하기'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="popup-gadget__group">
                      <p className="popup-gadget__text">매체 맞춤 검색</p>
                      <div className="popup-gadget__button">
                        <Button
                          label={'추가하기'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                        />
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
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 16</h2>
          <div className="guide__group">
            <div className="popup__section w1140">
              <div className="popup-header__section">
                <h2 className="popup-header__title">삼성전자 모니터링 분석</h2>
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
                    <div className="buttons__group type-right">
                      <Button
                        label={'다운로드'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                      <Button
                        label={'공유하기'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </div>
                  </li>
                  <li>
                    <ul className="graph__list">
                      <li>
                        <div className="graph__group">
                          <h3 className="graph__title">날짜별 뉴스 건수</h3>
                          <ApexChartsLine
                            options={lineOptions}
                            series={lineSeries}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="graph__group">
                          <h3 className="graph__title">논조 분석</h3>
                          <ApexChartsPie
                            options={pieOptions1}
                            series={pieSeries1}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="graph__group">
                          <h3 className="graph__title">상위 미디어별 뉴스 건수</h3>
                          <ApexChartsColumn
                            options={columnOptions}
                            series={columnSeries}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="graph__group">
                          <h3 className="graph__title">미디어 유형</h3>
                          <ApexChartsPie
                            options={pieOptions2}
                            series={pieSeries2}
                          />
                        </div>
                      </li>
                    </ul>
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
