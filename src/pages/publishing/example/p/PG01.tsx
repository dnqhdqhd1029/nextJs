/**
 * @file PG01.tsx
 * @description PG01 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">결제하기</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">구매 정보</p>
                </div>
                <ul className="grid-col2">
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="상품" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">비즈니스, 이메일 추가 50,000개</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="결제금액" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">7,370,000원</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'결제 방법'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-pg0"
                            id="rdo-pg0-0"
                            label="카드결제"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-pg0"
                            id="rdo-pg0-1"
                            label="통장 입금"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'계산서'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-pg1"
                            id="rdo-pg1-0"
                            label="영수계산서"
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-pg1"
                            id="rdo-pg1-1"
                            label="청구계산서"
                            checked
                          />
                        </li>
                        <li>
                          <FormInputBtn
                            type="radio"
                            name="rdo-pg1"
                            id="rdo-pg1-2"
                            label="현금영수증"
                            checked
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div className="form-title-btn__group">
                  <p className="font-body__regular fw700">세금계산서 발행 정보</p>
                  <FormInputBtn
                    type="checkbox"
                    name="ck-pg1"
                    id="ck-pg1-2"
                    label="정보 가져오기"
                    checked
                  />
                </div>
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title="상호"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="대표자 이름"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="사업자등록번호"
                      inputType="number"
                      placeholder="102-86-07713"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="계산서 수신 이메일"
                      value="gildong.hong@abc.com"
                      required={true}
                    />
                  </li>
                </ul>
                <div className="form-address__section">
                  <FormTitle
                    title="주소"
                    required={true}
                  />
                  <ul className="form-address__detail">
                    <li className="search">
                      <FormInputText value="서울특별시 중구 서소문로11길 19" />
                      <Button
                        label={'주소 검색'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </li>
                    <li>
                      <FormInputText value="배재정동빌딩 A동 6층" />
                    </li>
                  </ul>
                </div>
                <ul className="grid-col2">
                  <li>
                    <FormInputText title="계산서 담당자" />
                  </li>
                  <li>
                    <FormInputText
                      title="계산서 담당자 전화"
                      inputType="number"
                    />
                  </li>
                </ul>
              </li>
              <li>
                <div className="form-title-btn__group">
                  <p className="font-body__regular fw700">현금영수증 발행 정보</p>
                  <FormInputBtn
                    type="checkbox"
                    name="ck-pg2"
                    id="ck-pg2-2"
                    label="정보 가져오기"
                    checked
                  />
                </div>
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title="이름"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="휴대번호"
                      inputType="number"
                      required={true}
                      placeholder="010-0000-0000"
                    />
                  </li>
                </ul>
              </li>
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">신청인</p>
                </div>
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title="회사 이메일"
                      value="gildong.hong@abc.com"
                      readonly={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="회사"
                      value="ABCw전자"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="이름"
                      value="홍길동"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="전화"
                      inputType="number"
                      placeholder="02-1234-5678"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="휴대전화"
                      inputType="number"
                      placeholder="010-1234-5678"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="부서"
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="직책"
                      required={true}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">요청사항</p>
                </div>
                <div>
                  <div className="textarea__area">
                    <div className="textarea__group">
                      <textarea rows={2} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">약관 등 동의</p>
                </div>
                <div className="agree__section">
                  <div className="agree-notice__group">
                    <p className="agree-notice__text">
                      이 양식을 제출함으로써 귀하는 당사의{' '}
                      <Button
                        elem="a"
                        url={'#!'}
                        target="_blank"
                        label={'약관'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                      ,{' '}
                      <Button
                        elem="a"
                        url={'#!'}
                        target="_blank"
                        label={'개인정보 보호정책'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                      을 읽고 동의함을 확인하게 됩니다.
                    </p>
                  </div>

                  <ul className="agree-checkbox__list">
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck1"
                        id="agree-ck1"
                        label="(필수) 이용 약관에 동의"
                      />
                    </li>
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck2"
                        id="agree-ck2"
                        label="(필수) 개인정보 수집 및 이용에 동의"
                      />
                    </li>
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck1"
                        id="agree-ck1"
                        label="(필수) 개인정보 제3자 제공/위탁 동의"
                      />
                      <Button
                        elem="a"
                        url={'#!'}
                        target="_blank"
                        label={'개인정보 제3자 제공/위탁'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </li>
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-ck2"
                        id="agree-ck2"
                        label="[선택] 입력한 정보를 회원 정보에 업데이트하는데 동의"
                      />
                    </li>
                  </ul>
                  <div className="agree-checkbox__total">
                    <FormInputBtn
                      type="checkbox"
                      name="agree-ck1"
                      id="agree-ck1"
                      label="모두 동의"
                    />
                  </div>
                </div>
              </li>
            </ul>

            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'구매하기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT5'
