/**
 * @file PurchaseRequest.tsx
 * @description 구매 신청
 */

import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import Apply from '~/components/contents/purchaseRequest/Apply/Apply'
import Complete from '~/components/contents/purchaseRequest/Complete/Complete'
import RequestPopup from '~/components/contents/purchaseRequest/Popup/RequestPopup'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const PurchaseRequest = () => {
  const { pageType, addressPopup, companyInfo, setAddressPopupAction, setCompanyInfoAddressAction } =
    usePurchaseRequest()

  return (
    <>
      {pageType === '0' && <Apply />}
      {pageType === '1' && <Complete />}
      <RequestPopup />
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => setAddressPopupAction(false)}
        onSelectAddress={e => setCompanyInfoAddressAction(e, companyInfo)}
      />
    </>
  )
}

export default PurchaseRequest
