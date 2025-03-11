/**
 * @file Popup-type2.tsx
 * @description Popup-type2 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup type2</h2>

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
                <h2 className="popup-header__title">비밀번호 확인</h2>
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
                  <p className="font-body__regular">회원 정보를 수정하려면 회원님의 비밀번호를 입력하세요.</p>
                </div>
                <ul>
                  <li>
                    <FormInputText
                      title={'비밀번호'}
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
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">정보 업데이트 요청</h2>
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
                  <p className="font-body__regular">
                    잘못 표기된 내용이나 추가할 정보를 알려주시면 확인 후 수정하겠습니다.
                    <br />
                    회원님의 기여에 감사드립니다.
                  </p>
                </div>

                <ul>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="대상" />
                      <p className="ipt-text-readonly">
                        서정민 <span className="fw400">중앙일보 문화부 기자</span>
                      </p>
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
                        <textarea />
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
          <h2 className="guide__item--title">No. 3</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">개인적 연락처 추가</h2>
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
                  <p className="font-body__regular">
                    개인적으로 사용하는 연락처가 있으면 입력하세요. 제공되는 메일과 다른 이메일을 여기에 추가하면 제공
                    메일이 아닌 추가한 이메일을 통해 메일을 발송하게 됩니다.
                  </p>
                </div>
                <ul>
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
                      title={'휴대전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText title={'주소'} />
                  </li>
                </ul>
              </div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
                    <Button
                      label={'삭제'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 4</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회원 탈퇴</h2>
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
                  <p className="font-body__regular">
                    회원 탈퇴하려면 다른 회원을 관리자 등급 회원으로 지정해야 합니다.
                    <br />
                    회원 탈퇴해도 회원이 생성한 데이터는 삭제되지 않습니다.
                  </p>
                </div>
                <ul>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle title={'관리자'} />

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
                    <div className="mb-contents-pb16__group">
                      <p className="font-body__regular">회원 정보를 수정하려면 회원님의 비밀번호를 입력하세요.</p>
                    </div>
                    <FormInputText
                      title={'비밀번호'}
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
          <h2 className="guide__item--title">No. 5</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">그룹 추가</h2>
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
                  <p className="font-body__regular">
                    그룹 기능을 이용하면 사내에서 부서별 작업공간을 만들거나, 대행사의 경우 고객사 용도로 사용할 수
                    있습니다.
                    <br />
                    그룹은 X개까지 만들 수 있습니다. 그 이상 추가하려면{' '}
                    <Button
                      elem="a"
                      url={'https://www.naver.com/'}
                      label={'고객센터'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                    로 문의하세요.
                  </p>
                </div>

                <ul>
                  <li>
                    <FormInputText
                      title={'그룹명'}
                      required={true}
                    />
                  </li>
                  <li>
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <FormInputText
                          title={'회원'}
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
                        <div className="tags__delete">
                          <Button
                            label={'모든 회원 제거'}
                            cate={'link-text'}
                            size={'s'}
                            color={'body-link'}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <FormInputText
                      title={'비밀번호 확인'}
                      inputType="password"
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
          <h2 className="guide__item--title">No. 6</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">연관도 분석 수정</h2>
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
                  <p className="font-body__regular">
                    높음과 낮음 영역의 숫자를 수정하면 보통 영역의 숫자는 자동으로 바뀝니다.
                  </p>
                </div>
                <ul>
                  <li>
                    <div className="popup-setting-analyze__list">
                      <ul className="interval-mt14">
                        <li>
                          <ul className="setting-analyze__list form-pb0">
                            <li>
                              <p className="setting-analyze__text--bold">높음 :</p>
                            </li>
                            <li>
                              <p className="setting-analyze__text">한글 400 단어당</p>
                            </li>
                            <li>
                              <FormInputText
                                inputType="number"
                                placeholder="0"
                              />
                            </li>
                            <li>
                              <p className="setting-analyze__text">회 초과</p>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="setting-analyze__list form-pb0">
                            <li>
                              <p className="setting-analyze__text--bold">보통 :</p>
                            </li>
                            <li>
                              <p className="setting-analyze__text">한글 400 단어당</p>
                            </li>
                            <li>
                              <FormInputText
                                inputType="number"
                                placeholder="0"
                                value="2"
                                readonly={true}
                              />
                            </li>
                            <li>
                              <p className="setting-analyze__text">~</p>
                            </li>
                            <li>
                              <FormInputText
                                inputType="number"
                                placeholder="0"
                                value="6"
                                readonly={true}
                              />
                            </li>
                            <li>
                              <p className="setting-analyze__text">회</p>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="setting-analyze__list form-pb0">
                            <li>
                              <p className="setting-analyze__text--bold">낮음 :</p>
                            </li>
                            <li>
                              <p className="setting-analyze__text">한글 400 단어당</p>
                            </li>
                            <li>
                              <FormInputText
                                inputType="number"
                                placeholder="0"
                              />
                            </li>
                            <li>
                              <p className="setting-analyze__text">회 미만</p>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Button
                            label={'초기화'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
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
