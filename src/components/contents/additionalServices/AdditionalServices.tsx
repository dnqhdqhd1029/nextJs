/**
 * @file AdditionalServices.tsx
 * @description 부가 서비스 페이지
 */

import { useLayoutEffect } from 'react'

import Select from '~/components/common/ui/Select'
import Skeleton from '~/components/common/ui/Skeleton'
import EmailService from '~/components/contents/additionalServices/EmailService/EmailService'
import NewsWireService from '~/components/contents/additionalServices/NewsWireService/NewsWireService'
import RequestPopup from '~/components/contents/additionalServices/Popup/RequestPopup'
import ServicePopup from '~/components/contents/additionalServices/Popup/ServicePopup'
import UserService from '~/components/contents/additionalServices/UserService/UserService'
import type { SelectListOptionItem } from '~/types/common'
import { useAdditionalServices } from '~/utils/hooks/contents/additionalServices/useAdditionalServices'

const AdditionalServices = () => {
  const { additionsProductLoading, selectedValue, setSelectedValueAction, selectedList } = useAdditionalServices()

  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">부가 서비스 구매</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">부가서비스</p>
                </div>
                <div className="service-addition__group">
                  <div className="service-addition__title">종류</div>
                  <div className="service-addition__select">
                    {additionsProductLoading ? (
                      <Skeleton
                        width={'960px'}
                        height={'35px'}
                      />
                    ) : (
                      <Select
                        options={selectedList}
                        onChange={(option: SelectListOptionItem) => setSelectedValueAction(option)}
                        value={selectedValue}
                      />
                    )}
                  </div>
                </div>
              </li>
              {!additionsProductLoading && (
                <>
                  <EmailService />
                  <NewsWireService />
                  <UserService />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <RequestPopup />
      <ServicePopup />
    </>
  )
}

export default AdditionalServices
