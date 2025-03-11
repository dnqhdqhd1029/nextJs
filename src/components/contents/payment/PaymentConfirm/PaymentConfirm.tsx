/**
 * @file Payment.tsx
 * @description 결제 견적 페이지
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import SHA256 from 'js-sha256'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import { apiPayRequestAdditionalServiceDetail, apiPayServiceNonUserDetail } from '~/utils/api/payment/usePayment'
import { loadJavascript } from '~/utils/common/helper'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import useEffectOnce from '~/utils/common/useEffectOnce'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

interface IInitTimer {
  elapsedTime: number
  intervalId: NodeJS.Timeout | string | number | undefined
  start: number
}

const initTimer: IInitTimer = {
  elapsedTime: 0,
  intervalId: undefined,
  start: 0,
}

const PaymentConfirm = () => {
  const apiUrl = process.env.NEXT_PUBLIC_URL_INICIS_API
  const { applicantInfo, requestInfo, paymentInfo, paymentsId, paymentTypeKey, paymentCancel, initDataAction } =
    usePayments()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const [oid, setOid] = useState(uuid())
  const [timestamp, setTimetamp] = useState(new Date().getTime())
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(1004)
  const [payViewAt, setPayViewAt] = useState<string>('')
  const timer = useRef(initTimer)
  const cu = timer.current

  const handleCheckPaymentInfo = async () => {
    const response =
      paymentTypeKey === 'non_user'
        ? await apiPayServiceNonUserDetail(paymentsId)
        : await apiPayRequestAdditionalServiceDetail(paymentsId)
    const { status, data, message } = response as BaseResponseCommonObject
    if (status === 'S') {
      handlePay()
    } else {
      openToast(message?.message ?? '결제 정보를 찾을 수 없습니다.', 'error')
    }
  }

  const handlePay = async () => {
    if (isLoader) {
      const ksPayWebForm = document.getElementById('SendPayForm_id')
      ;(window as any).INIStdPay.pay(ksPayWebForm)
    }
  }

  const checkForLoader = useCallback(() => {
    cu.intervalId = setInterval(() => {
      const isLoaderResult = (window as any).$jINILoader.$jINILoadChecker()
      if (isLoaderResult) {
        setIsLoader(isLoaderResult)
      }
    }, 1000)
  }, [])

  const init = async () => {
    await (window as any).$jINILoader.load()
  }

  const payInit = async () => {
    await (window as any).INIStdPay.init()
  }

  useEffectOnce(() => {
    loadJavascript(`${apiUrl}/stdjs/INIStdPay.js`, init)
  })

  useEffect(() => {
    if (isLoader) {
      if (cu.intervalId) {
        clearInterval(cu.intervalId)
        cu.intervalId = undefined
      }

      payInit()
    }
  }, [isLoader])

  useEffect(() => {
    checkForLoader()
  }, [])

  const isRecaptchaValidated = async () => {
    const v3Result = await textRecaptchaV3()
    if (!v3Result) {
      setIsV3Failed(true)
    } else {
      const response =
        paymentTypeKey === 'non_user'
          ? await apiPayServiceNonUserDetail(paymentsId)
          : await apiPayRequestAdditionalServiceDetail(paymentsId)
      const { status, data, message } = response as BaseResponseCommonObject
      if (status === 'S') {
        handlePay()
      } else {
        openToast(message?.message ?? '결제 정보를 찾을 수 없습니다.', 'error')
      }
    }
  }

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) {
      // 성공
      console.log()
    }
  }

  useEffect(() => {
    if (v2Token) checkV2Recaptcha(v2Token)
  }, [v2Token])

  useLayoutEffect(() => {
    initDataAction()
  }, [])

  useEffect(() => {
    if (paymentInfo) {
      // console.log(paymentInfo.payAmount)
      // setPrice(paymentInfo.payAmount)
    }
    setPayViewAt(moment().format('YYYYMMDDHHmmss'))
  }, [paymentInfo])

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
                          <span className="fw400">카드결제</span>
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
                          <span className="fw400">미결제</span>
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
              {isV3Failed && (
                <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
                  <ReCAPTCHA
                    size="normal"
                    sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                    onChange={token => setV2Token(token)}
                  />
                </div>
              )}
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'취소하기'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  onClick={() => paymentCancel()}
                />
                <Button
                  label={'카드결제'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  onClick={() => isRecaptchaValidated()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        name=""
        id="SendPayForm_id"
        method="POST"
        style={{
          display: 'none',
        }}
      >
        <div className="row g-3 justify-content-between">
          <input
            type="hidden"
            name="version"
            value="1.0"
          />

          <label className="col-10 col-sm-2 input param">gopaymethod</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="gopaymethod"
              value="Card"
            />
          </label>

          <label className="col-10 col-sm-2 input param">mid</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="mid"
              value="INIpayTest"
            />
          </label>

          <label className="col-10 col-sm-2 input param">oid</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="oid"
              value={oid}
            />
          </label>

          <label className="col-10 col-sm-2 input param">price</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="price"
              value="1004"
            />
          </label>

          <label className="col-10 col-sm-2 input param">timestamp</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="timestamp"
              value={timestamp}
            />
          </label>

          <label className="col-10 col-sm-2 input param">use_chkfake</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="use_chkfake"
              value="Y"
            />
          </label>

          <input
            type="hidden"
            name="currency"
            value="WON"
          />
          <input
            type="hidden"
            name="charset"
            value="UTF-8"
          />

          <label className="col-10 col-sm-2 input param">signature</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="signature"
              value={SHA256.sha256(`oid=${oid}&price=${price}&timestamp=${timestamp}`).toString()}
            />
          </label>

          <label className="col-10 col-sm-2 input param">verification</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="verification"
              value={SHA256.sha256(
                `oid=${oid}&price=${price}&signKey=SU5JTElURV9UUklQTEVERVNfS0VZU1RS&timestamp=${timestamp}`
              ).toString()}
            />
          </label>

          <label className="col-10 col-sm-2 input param">mKey</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="mKey"
              value={SHA256.sha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS').toString()}
            />
          </label>

          <label className="col-10 col-sm-2 input param">goodname</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="goodname"
              value={paymentInfo.productNm?.toString() || ''}
            />
          </label>

          <label className="col-10 col-sm-2 input param">buyername</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="buyername"
              value={applicantInfo.name}
            />
          </label>

          <label className="col-10 col-sm-2 input param">buyertel</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="buyertel"
              value={applicantInfo.phone || applicantInfo.phoneCallNm}
            />
          </label>

          <label className="col-10 col-sm-2 input param">buyeremail</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="buyeremail"
              value={applicantInfo.email}
            />
          </label>

          <input
            type="hidden"
            name="returnUrl"
            // value="https://local.svc.d.mediabee.kr:4189/api/post/payment"
            value="https://svc.d.mediabee.kr/api/post/payment"
          />

          <input
            type="hidden"
            name="closeUrl"
            // value="https://local.svc.d.mediabee.kr:4189/payment/inicis-close"
            value="https://svc.d.mediabee.kr/payment/inicis-close"
          />

          <input
            type="text"
            name="merchantData"
            value={JSON.stringify({
              payRequestId: paymentsId,
              resultUrl: '/payment/inicis-result',
              returnUrl: `/dashboard`,
              payViewAt,
              companyName: window.btoa(unescape(encodeURIComponent(applicantInfo.companyNm))),
            })}
          />

          <label className="col-10 col-sm-2 input param">acceptmethod</label>
          <label className="col-10 col-sm-9 input">
            <input
              type="text"
              name="acceptmethod"
              value="HPP(1):below1000:va_receipt:centerCd(Y)"
              // value="HPP(1):below1000:va_receipt:centerCd(Y)"
            />
          </label>
        </div>
      </form>
    </>
  )
}

export default PaymentConfirm
