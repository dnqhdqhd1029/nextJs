import { useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Select from '~/components/common/ui/Select'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import CheckBoxItem from '~/components/contents/sales/AgreeNotice/CheckBoxItme'
import { serviceNotice } from '~/components/contents/sales/defaultData'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useSales } from '~/utils/hooks/contents/sales/useSales'

const ApplyPage = () => {
  const {
    isActionButton,
    applicantInfo,
    companyInfo,
    companyTypeList,
    agreeNoticeInfo,
    regionList,
    userCountList,
    msgToNwire,
    addressPopup,
    totalAgreeNotice,

    totalNoticeChecked,
    salesConsult,
    setDepartmentAction,
    setPositionAction,
    setPhoneCallNmAction,
    setApplicantNameAction,
    setApplicantTelePhoneAction,
    setApplicantEmailAction,
    setNameAction,
    setCompanyInfoTypeAction,
    setCompanyInfoUserCountAction,
    setCompanyInfoWebsiteAction,
    setCompanyInfoRegionAction,
    setCompanyInfoAddressNmAction,
    setCompanyInfoSubAddressNmAction,
    setMsgToNwireAction,
    setAddressPopupAction,
    setAddressAction,
    init,
  } = useSales()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await applyRequest()
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await applyRequest()
  }

  const applyRequest = async () => {
    const params = {
      applicantInfo,
      companyInfo,
      agreeNoticeInfo,
      msgToNwire,
    }
    await salesConsult(params)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="service__section">
              <div className="service-visual__section">
                <h2 className="service-visual__title">
                  미디어비는 클라우드 기반의 지능형 회사 홍보 플랫폼입니다.
                  <br />
                  미디어비는 PR 캠페인을 효과적으로 실행하고 모니터링할 수 있는 수단을 제공합니다.
                </h2>
              </div>

              <div className="service-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">구매 상담</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt14">
                <li>
                  <div className="mb-contents-pb14__group">
                    <p className="font-body__regular fw700">신청인</p>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <FormInputText
                        title="이름"
                        required={true}
                        onChange={e => setApplicantNameAction(e.target.value, applicantInfo)}
                        failed={applicantInfo.nameErr !== ''}
                        msg={applicantInfo.nameErr}
                        value={applicantInfo.name}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="이메일"
                        required={true}
                        placeholder="업무용 이메일"
                        onChange={e => setApplicantEmailAction(e.target.value, applicantInfo)}
                        failed={applicantInfo.emailErr !== ''}
                        msg={applicantInfo.emailErr}
                        value={applicantInfo.email}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="전화"
                        required={true}
                        extraInputType={'normalPhone'}
                        onChangeExtra={e => setPhoneCallNmAction(e, applicantInfo)}
                        failed={applicantInfo.phoneNmErr !== ''}
                        msg={applicantInfo.phoneNmErr}
                        value={applicantInfo.phoneNm}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title={'휴대전화'}
                        extraInputType={'phone'}
                        onChangeExtra={e => setApplicantTelePhoneAction(e, applicantInfo)}
                        failed={applicantInfo.telephoneErr !== ''}
                        msg={applicantInfo.telephoneErr}
                        value={applicantInfo.telephone}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title={'부서'}
                        required={true}
                        onChange={e => setDepartmentAction(e.target.value, applicantInfo)}
                        failed={applicantInfo.departmentErr !== ''}
                        msg={applicantInfo.departmentErr}
                        value={applicantInfo.department}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="직책"
                        required={true}
                        onChange={e => setPositionAction(e.target.value, applicantInfo)}
                        failed={applicantInfo.positionErr !== ''}
                        msg={applicantInfo.positionErr}
                        value={applicantInfo.position}
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="mb-contents-pb14__group">
                    <p className="font-body__regular fw700">회사</p>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <FormInputText
                        title="회사명"
                        required={true}
                        placeholder="회사명에서 (주), 주식회사는 제외"
                        onChange={e => setNameAction(e.target.value, companyInfo)}
                        failed={companyInfo.nameErr !== ''}
                        msg={companyInfo.nameErr}
                        value={companyInfo.name}
                      />
                    </li>
                    <li>
                      <FormTitle
                        title={'회사 분류'}
                        required={true}
                      />
                      <Select
                        options={companyTypeList}
                        value={companyInfo.type}
                        onChange={e => setCompanyInfoTypeAction(e, companyInfo)}
                      />
                    </li>
                    <li>
                      <FormTitle
                        title={'사원수'}
                        required={true}
                      />
                      <Select
                        options={userCountList}
                        value={companyInfo.userCount}
                        onChange={e => setCompanyInfoUserCountAction(e, companyInfo)}
                      />
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
                <li>
                  <div className="form-address__section">
                    <FormTitle
                      title="주소"
                      required={true}
                    />
                    <ul className="form-address__country">
                      <li className="select">
                        <Select
                          listDirection={'down'}
                          options={regionList && [{ id: '', name: '선택' }, ...regionList]}
                          value={companyInfo?.region}
                          onChange={e => setCompanyInfoRegionAction(e, companyInfo)}
                          failed={companyInfo.regionErr !== ''}
                          msg={companyInfo.regionErr}
                        />
                      </li>
                    </ul>
                    <ul className="form-address__detail">
                      <li className="search">
                        <FormInputText
                          onChange={e => setCompanyInfoAddressNmAction(e.target.value, companyInfo)}
                          failed={companyInfo.addressNmErr !== ''}
                          msg={companyInfo.addressNmErr}
                          value={companyInfo.addressNm}
                        />
                        {companyInfo?.region?.id === 'KOR' && (
                          <Button
                            label={'주소 검색'}
                            cate={'default'}
                            size={'m'}
                            color={'outline-secondary'}
                            onClick={() => setAddressPopupAction(true)}
                          />
                        )}
                      </li>
                      <li>
                        <FormInputText
                          onChange={e => setCompanyInfoSubAddressNmAction(e.target.value, companyInfo)}
                          value={companyInfo.subAddressNm}
                        />
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb14__group">
                    <p className="font-body__regular fw700">요청사항</p>
                  </div>
                  <div className="textarea__area">
                    <div className="textarea__group">
                      <textarea
                        rows={6}
                        value={msgToNwire}
                        onChange={e => setMsgToNwireAction(e.target.value)}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="agree__section">
                    <div className="agree-notice__group">
                      <p className="agree-notice__text">
                        이 양식을 제출함으로써 귀하는 당사의{' '}
                        <Button
                          label={'이용약관'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => window.open('https://www.newswire.co.kr/?xd=37', '_blank')}
                        />{' '}
                        및{' '}
                        <Button
                          label={'개인정보 취급방침'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => window.open('https://www.newswire.co.kr/?xd=35', '_blank')}
                        />
                        을 읽고 동의함을 확인하게 됩니다.
                      </p>
                    </div>

                    <ul className="agree-checkbox__list">
                      {serviceNotice.map((e, i) => (
                        <CheckBoxItem
                          key={'agreeNoticeInfo' + i.toString()}
                          id={e.id}
                          name={e.name}
                        />
                      ))}
                    </ul>
                    <div className="agree-checkbox__total">
                      <FormBasicCheckbox
                        label={'모두 동의'}
                        name={'totalAgreeNotice'}
                        id={'totalAgreeNotice'}
                        onChange={() => totalNoticeChecked(totalAgreeNotice)}
                        checked={totalAgreeNotice}
                      />
                    </div>
                  </div>
                </li>
              </ul>
              {isV3Failed && (
                <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
                  <ReCAPTCHA
                    size="normal"
                    sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                    onChange={token => checkV2Recaptcha(token)}
                  />
                </div>
              )}
              <div className="mb-contents-footer__section">
                <div className="buttons__group button-min-w120">
                  <Button
                    label={'구매 상담 신청'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    disabled={!isActionButton}
                    onClick={checkV3Recaptcha}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => setAddressPopupAction(false)}
        onSelectAddress={e => setAddressAction(e, companyInfo)}
      />
    </>
  )
}

export default ApplyPage
