import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { useDemo } from '~/utils/hooks/contents/demo/useDemo'

const Company = () => {
  const {
    companyInfo,
    setNameAction,
    setCompanyInfoTypeAction,
    setCompanyInfoUserCountAction,
    setCompanyInfoWebsiteAction,
    companyTypeList,
    userCountList,
  } = useDemo()

  return (
    <li>
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular fw700">회사</p>
      </div>
      <ul className="grid-col2">
        <li>
          <FormInputText
            title={'회사명'}
            required={true}
            onChange={e => setNameAction(e.target.value, companyInfo)}
            failed={companyInfo.nameErr !== ''}
            msg={companyInfo.nameErr}
            value={companyInfo.name}
          />
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
  )
}

export default Company
