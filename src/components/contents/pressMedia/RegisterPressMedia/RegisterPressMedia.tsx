import { Fragment, useEffect, useLayoutEffect } from 'react'
import cn from 'classnames'

import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import Information from '~/components/contents/pressMedia/RegisterPressMedia/Information/Information'
import MediaListPopup from '~/components/contents/pressMedia/RegisterPressMedia/Media/MediaListPopup/MediaListPopup'
import MediaStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/MediaStep'
import PressListPopup from '~/components/contents/pressMedia/RegisterPressMedia/Press/PressListPopup/PressListPopup'
import PressStep from '~/components/contents/pressMedia/RegisterPressMedia/Press/PressStep'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const RegisterPressMedia = () => {
  const {
    categoryData,
    addressPopup,
    pressPersonalParams,
    mediaPersonalParams,
    addressPopupHandle,
    pressPersonalAddressNmAction,
    init,
  } = useRegisterPressMedia()

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <Information />
          <PressStep />
          <MediaStep />
        </div>
      </div>
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => addressPopupHandle(false)}
        onSelectAddress={e => pressPersonalAddressNmAction(e, categoryData, pressPersonalParams, mediaPersonalParams)}
      />
      <PressListPopup />
      <MediaListPopup />
    </>
  )
}

export default RegisterPressMedia
