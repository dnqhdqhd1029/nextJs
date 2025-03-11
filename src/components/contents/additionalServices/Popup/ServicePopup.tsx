/**
 * @file ServicePopup.tsx
 * @description 이용약관 팝업
 */

import Popup from '~/components/common/ui/Popup'
import { useAdditionalServices } from '~/utils/hooks/contents/additionalServices/useAdditionalServices'

const ServicePopup = () => {
  const { servicePopup, setServicePopupAction } = useAdditionalServices()
  return (
    <>
      <Popup
        isOpen={servicePopup}
        onClose={() => setServicePopupAction(false)}
        hasCloseButton
        title={'이용약관'}
        width={800}
        showFooter={false}
      ></Popup>
    </>
  )
}

export default ServicePopup
