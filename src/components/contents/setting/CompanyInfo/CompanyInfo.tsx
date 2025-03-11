import Button from '~/components/common/ui/Button'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import CompanyInfoList from '~/components/contents/setting/CompanyInfo/CompanyInfoList'
import CompanyInfoLoading from '~/components/contents/setting/CompanyInfo/CompanyLoading'
import NavigationBar from '~/components/contents/setting/NavigationBar/NavigationBar'
import { useCompanyInfo } from '~/utils/hooks/contents/setting/useCompanyInfo'
const CompanyInfo = () => {
  const {
    companyInfoLoading,
    addressPopup,
    companyInfoData,
    setAddressPopupAction,
    setAddressAction,
    saveCompanyInfo,
  } = useCompanyInfo()

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">회사 정보</h2>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <div className="setting-contents-form__section">
                      {companyInfoLoading ? <CompanyInfoLoading /> : <CompanyInfoList />}
                      <div className="mb-contents-footer__section">
                        <div className="buttons__group button-min-w120">
                          <Button
                            label={'저장'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            onClick={() => saveCompanyInfo(companyInfoData)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => setAddressPopupAction(false)}
        onSelectAddress={e => setAddressAction(e, companyInfoData)}
      />
    </>
  )
}

export default CompanyInfo
