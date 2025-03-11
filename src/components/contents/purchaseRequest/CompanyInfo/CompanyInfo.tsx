import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import Skeleton from '~/components/common/ui/Skeleton'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const CompanyInfo = () => {
  const {
    isCompanyLoading,
    userCountList,
    regionList,
    companyTypeList,
    companyInfo,
    setCompanyInfoSubAddressAction,
    setAddressPopupAction,
    setCompanyInfoWebsiteAction,
    setCompanyInfoTypeAction,
    setCompanyInfoUserCountAction,
    setCompanyInfoRegionAction,
  } = usePurchaseRequest()

  return (
    <>
      <li>
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular fw700">회사</p>
        </div>
        <ul className="grid-col2">
          <li>
            {isCompanyLoading ? (
              <>
                <FormTitle title="회사명" />
                <Skeleton
                  width={'960px'}
                  height={'35px'}
                />
              </>
            ) : (
              <FormInputText
                title={'회사명'}
                disabled={true}
                value={companyInfo.name}
              />
            )}
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'회사 분류'}
                required={true}
              />
              <Select
                options={companyTypeList}
                value={companyInfo.type}
                onChange={e => setCompanyInfoTypeAction(e, companyInfo)}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'사원수'}
                required={true}
              />
              <Select
                options={userCountList}
                value={companyInfo.userCount}
                onChange={e => setCompanyInfoUserCountAction(e, companyInfo)}
              />
            </div>
          </li>
          <li>
            <FormInputText
              title={'웹사이트'}
              required={false}
              onChange={e => setCompanyInfoWebsiteAction(e.target.value, companyInfo)}
              value={companyInfo.website}
            />
          </li>
        </ul>
      </li>
      <div className="form-address__section">
        <FormTitle
          title="주소"
          required={true}
        />
        <ul className="form-address__detail">
          <ul className="form-address__country">
            <li className="select">
              <div className="select-form__section select-form-btn">
                <Select
                  options={regionList}
                  value={companyInfo.region}
                  onChange={e => setCompanyInfoRegionAction(e, companyInfo)}
                />
              </div>
            </li>
          </ul>
          <li className="search">
            <FormInputText
              failed={companyInfo.addressNmErr !== ''}
              msg={companyInfo.addressNmErr}
              value={companyInfo.addressNm}
            />
            <Button
              label={'주소 검색'}
              cate={'default'}
              size={'m'}
              color={'tertiary'}
              onClick={() => setAddressPopupAction(true)}
            />
          </li>
          <li>
            <FormInputText
              onChange={e => setCompanyInfoSubAddressAction(e.target.value, companyInfo)}
              value={companyInfo.subAddressNm}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default CompanyInfo
