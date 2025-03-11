/**
 * @file NW03.tsx
 * @description NW03 페이지
 */

import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
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
                      <li>
                        <p className="steps__text">기본</p>
                      </li>
                      <li>
                        <p className="steps__text">내용</p>
                      </li>
                      <li className="is-active">
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
                      <FormInputText
                        title={'뉴스 발표'}
                        required={true}
                      />
                    </li>
                    <li>
                      <ul className="grid-col2">
                        <li>
                          <div className="ipt-btn__section">
                            <FormTitle
                              title={'발송 시간'}
                              required={true}
                              tooltip={true}
                            >
                              <Tooltips
                                tooltipId={'tt10-4'}
                                tooltipPlace={'top'}
                                tooltipHtml={
                                  '예약 시 배포 예약시간은 2시간 <br />이후부터 설정할 수 있지만, 배포 하루 <br />전에 미리 보도자료를 등록하면 더 나은 <br />서비스를 제공해 드릴 수 있습니다.'
                                }
                                tooltipComponent={<IcoTooltip />}
                              />
                            </FormTitle>

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
                      </ul>
                    </li>
                    <li>
                      <div className="ipt-btn__section">
                        <FormTitle
                          title="산업분야 선택"
                          required={true}
                        />
                        <ul className="ipt-btn-cate__group">
                          <li>
                            <p className="ipt-btn-cate__title">IT</p>
                            <ul className="ipt-btn__list--row">
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck01"
                                  id="ck01"
                                  label="소프트웨어"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck02"
                                  id="ck02"
                                  label="모바일"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck03"
                                  id="ck03"
                                  label="반도체/부품"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck04"
                                  id="ck04"
                                  label="통신"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck05"
                                  id="ck05"
                                  label="가전"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck06"
                                  id="ck06"
                                  label="인터넷"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck07"
                                  id="ck07"
                                  label="보안"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck08"
                                  id="ck08"
                                  label="네트워킹"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck09"
                                  id="ck09"
                                  label="컴퓨터"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck10"
                                  id="ck10"
                                  label="주변기기"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck11"
                                  id="ck11"
                                  label="전자"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck12"
                                  id="ck12"
                                  label="과학"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck13"
                                  id="ck13"
                                  label="나노기술"
                                />
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p className="ipt-btn-cate__title">건강</p>
                            <ul className="ipt-btn__list--row">
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck100"
                                  id="ck100"
                                  label="건강식품"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck101"
                                  id="ck101"
                                  label="대체의학"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck102"
                                  id="ck102"
                                  label="바이오테크"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck103"
                                  id="ck103"
                                  label="병원/의료"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck104"
                                  id="ck104"
                                  label="의학"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck105"
                                  id="ck105"
                                  label="제약"
                                />
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="ipt-btn__section">
                        <FormTitle
                          title="주제 선택"
                          required={true}
                        />
                        <ul className="ipt-btn-cate__group">
                          <li>
                            <ul className="ipt-btn__list--row">
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo01"
                                  id="rdo01"
                                  label="개발"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo02"
                                  id="rdo02"
                                  label="공모/모집"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo03"
                                  id="rdo03"
                                  label="회사문화"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo04"
                                  id="rdo04"
                                  label="기타"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo05"
                                  id="rdo05"
                                  label="분양"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo06"
                                  id="rdo06"
                                  label="사업계획"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo07"
                                  id="rdo07"
                                  label="사회공헌"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo08"
                                  id="rdo08"
                                  label="선언/의견"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo09"
                                  id="rdo09"
                                  label="설립"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo10"
                                  id="rdo10"
                                  label="소송"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo11"
                                  id="rdo11"
                                  label="수상/선정"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo12"
                                  id="rdo12"
                                  label="수주"
                                />
                              </li>
                              <li>
                                <FormInputBtn
                                  type="radio"
                                  name="rdo13"
                                  id="rdo13"
                                  label="신상품"
                                />
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <h6 className="font-heading--h6 pb6">게재 알림 메일 받기</h6>

                        <p className="font-body__regular">
                          뉴스와이어에 보도자료가 게재되면 알림이 나(
                          <Button
                            elem="a"
                            url={'mailto:gildong.hong@naver.com'}
                            label={'gildong.hong@naver.com'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                          )에게 발송됩니다. <br />
                          추가로 알림을 받아야 할 사람이 있다면 이메일 주소를 입력하세요.
                        </p>
                      </div>
                    </li>
                    <li>
                      <FormInputText title={'이메일'} />
                    </li>
                    <li>
                      <div className="textarea__area">
                        <FormTitle title="요청사항" />
                        <div className="textarea__group">
                          <textarea
                            placeholder="뉴스와이어 편집자에게 요청할 것이 있으면 적으세요. 생략해도 무방합니다."
                            rows={2}
                          />
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
