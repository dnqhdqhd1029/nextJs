/**
 * @file Payment.tsx
 * @description 결제 페이지
 */
import { useEffect, useLayoutEffect } from 'react'

import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import DoneDeal from '~/components/contents/payment/DoneDeal/DoneDeal'
import RequestNonUserPopup from '~/components/contents/payment/Popup/RequestNonUserPopup'
import RequestPopup from '~/components/contents/payment/Popup/RequestPopup'
import RequestPay from '~/components/contents/payment/RequestPay/RequestPay'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const Payment = () => {
  const {
    paymentsStep,
    addressPopup,
    setAddressPopupAction,
    setTaxBillInfoAddressAction,
    taxBillInfo,
    initDataAction,
  } = usePayments()

  useLayoutEffect(() => {
    initDataAction()
  }, [])

  return (
    <>
      {paymentsStep === '0' && <RequestPay />}
      {paymentsStep === '1' && <DoneDeal />}
      <RequestPopup />
      <RequestNonUserPopup />
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => setAddressPopupAction(false)}
        onSelectAddress={e => setTaxBillInfoAddressAction(e, taxBillInfo)}
      />
    </>
  )
}

export default Payment
