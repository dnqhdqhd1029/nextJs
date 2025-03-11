import { useMemo } from 'react'
import Cookie from 'js-cookie'

import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import Skeleton from '~/components/common/ui/Skeleton'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const PayInfomation = () => {
  const {
    paymentInfo,
    setPayByAction,
    setReceiptsByAction,
    isLoading,
    payMethodList,
    invoiceTypeList,
    payMethodType,
    invoiceType,
  } = usePayments()

  const sliceArray = useMemo(() => {
    let temp = ''
    if (paymentInfo.productNm) {
      for (const argument of paymentInfo.productNm) {
        temp = temp === '' ? argument : temp + ' or ' + argument
      }
    }
    return temp
  }, [paymentInfo.productNm])

  return (
    <li>
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular fw700">구매 정보</p>
      </div>
      <ul className="grid-col2">
        <li>
          <div className="mb-contents-pb16__group">
            <div className="ipt-text__area">
              <FormTitle title="상품" />
              {isLoading ? (
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              ) : (
                <p className="ipt-text-readonly">
                  <span className="fw400">{sliceArray}</span>
                </p>
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="mb-contents-pb16__group">
            <div className="ipt-text__area">
              <FormTitle title="결제금액" />
              {isLoading ? (
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              ) : (
                <p className="ipt-text-readonly">
                  <span className="fw400">{getCurrencyFormat(paymentInfo.payAmount)}원</span>
                </p>
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            <FormTitle
              title="결제 방법"
              required={true}
            />
            <ul className="ipt-btn__list--row">
              {payMethodList.map((e, i) => (
                <li key={'payMethodType' + i.toString()}>
                  <FormBasicRadio
                    label={e.name}
                    name={'payMethodType.payBy' + e.id.toString()}
                    id={'payMethodType.payBy' + e.id.toString()}
                    checked={payMethodType.id === e.id}
                    onChange={() => setPayByAction(e)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>
        {payMethodType.id !== 'CREDIT_CARD' && (
          <li>
            <div className="ipt-btn__section">
              <FormTitle
                title="계산서"
                required={true}
              />
              <ul className="ipt-btn__list--row">
                {invoiceTypeList.map((e, i) => (
                  <li key={'invoiceType' + i.toString()}>
                    <FormBasicRadio
                      label={e.name}
                      name={'invoiceType.receiptsBy' + e.id.toString()}
                      id={'invoiceType.receiptsBy' + e.id.toString()}
                      checked={invoiceType.id === e.id}
                      onChange={() => setReceiptsByAction(e)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )}
      </ul>
    </li>
  )
}

export default PayInfomation
