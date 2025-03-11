import { Fragment } from 'react'

import AddStep from '~/components/contents/monitoring/RegisterNews/Personal/AddStep/AddStep'
import Done from '~/components/contents/monitoring/RegisterNews/Personal/Done/Done'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const RegisterNewsPersonal = () => {
  const { step } = useRegisterNews()

  return (
    <Fragment>
      {step === 'personal' && (
        <Fragment>
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">뉴스 추가</h2>
              </div>
            </div>
          </div>
          <AddStep />
          <Done />
        </Fragment>
      )}
    </Fragment>
  )
}

export default RegisterNewsPersonal
