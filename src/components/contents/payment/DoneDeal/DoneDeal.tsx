/**
 * @file Payment.tsx
 * @description 결제 견적 페이지
 */
import moment from 'moment/moment'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { getCurrencyFormat } from '~/utils/common/number'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const DoneDeal = () => {
  const { applicantInfo, requestInfo, paymentInfo, openRequestPopup, requestPopupTypes, paymentsId, paymentCancel } =
    usePayments()

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <div className="common-title__ico type-check">
                  <IcoSvg data={icoSvgData.checkCircleFill} />
                </div>
                <h2 className="common-title__title">구매 신청 완료</h2>
              </div>
            </div>
          </div>

          <ul className="interval-mt14">
            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular fw700">입금 안내</p>
              </div>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular">
                  구매 신청에 감사 드립니다.
                  <br />
                  입금을 하면 서비스를 이용할 수 있습니다.
                  <br />
                  입금되면 미디어비가 메일과 문자로 입금 확인 메시지를 보내 드립니다
                </p>
              </div>

              <div className="mb-contents-pb16__group">
                <div className="mb-contents-pb8__group">
                  <p className="font-body__regular">
                    <span className="pr16">계좌: 신한은행 140-014-342089</span>예금주: 코리아뉴스와이어(주)
                  </p>
                </div>
                <div className="mb-contents-pb8__group">
                  <p className="font-body__regular">
                    입금액: {getCurrencyFormat(paymentInfo.payAmount)}원(부가세 포함)
                  </p>
                </div>
              </div>

              <div className="mb-contents-pb16__group">
                <div className="mb-contents-pb8__group">
                  <p className="font-body__regular">결제문의</p>
                </div>
                <div className="mb-contents-pb8__group">
                  <p className="font-body__regular">02-0000-0000</p>
                </div>
                <div className="mb-contents-pb8__group">
                  <Button
                    label={'문의하기'}
                    cate={'link-text-arrow'}
                    size={'m'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                    onClick={() => openRequestPopup(requestPopupTypes)}
                  />
                </div>
              </div>
            </li>

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
                        <span className="fw400">{paymentInfo.productNm?.toString() || ''}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="결제금액" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{getCurrencyFormat(paymentInfo.payAmount)}원</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="결제방법" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">통장입금</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="주문번호" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{paymentsId}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="결제상태" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">미입금</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="신청일" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{moment().format('YYYY-MM-DD')}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular fw700">요청사항</p>
              </div>
              <div className="mb-contents-pb16__group">
                <div className="ipt-text__area">
                  <p className="ipt-text-readonly">
                    <span className="fw400">{requestInfo}</span>
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular fw700">신청인</p>
              </div>
              <ul className="grid-col2">
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="회사 이메일" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.email}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="회사" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.companyNm}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="이름" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.name}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="전화" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.phone}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="휴대전화" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.phoneCallNm}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="부서" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.department}</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="ipt-text__area">
                      <FormTitle title="직책" />
                      <p className="ipt-text-readonly">
                        <span className="fw400">{applicantInfo.position}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div className="mb-contents-footer__section">
            <div className="buttons__group button-min-w120">
              <Button
                label={'구매 신청 취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => paymentCancel()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoneDeal
