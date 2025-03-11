import { Fragment, useEffect, useLayoutEffect } from 'react'

import RegisterNewsExcel from '~/components/contents/monitoring/RegisterNews/AddByExcel/AddByExcel'
import ClipbookListPopup from '~/components/contents/monitoring/RegisterNews/ClipbookListPopup/ClipbookListPopup'
import RegisterNewsInformation from '~/components/contents/monitoring/RegisterNews/Information/Information'
import LoadingPopup from '~/components/contents/monitoring/RegisterNews/LoadingPopup/LoadingPopup'
import RegisterNewsPersonal from '~/components/contents/monitoring/RegisterNews/Personal/Personal'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const RegisterNews = () => {
  const { init } = useRegisterNews()

  useEffect(() => {
    init()
  }, [])

  return (
    <Fragment>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <RegisterNewsInformation />
            <RegisterNewsPersonal />
            <RegisterNewsExcel />
          </div>
        </div>
      </div>
      <LoadingPopup />
      <ClipbookListPopup />
    </Fragment>
  )
}

export default RegisterNews
