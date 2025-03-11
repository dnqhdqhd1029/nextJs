import { ChangeEvent } from 'react'
import Cookie from 'js-cookie'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const TaxBill = () => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const {
    companyInfo,
    taxBillInfo,
    setTaxBillInfoCompanyNmAction,
    getTaxBillAction,
    setTaxBillInfoNmAction,
    setTaxBillInfobusinessNmAction,
    setTaxBillInfoEmailAction,
    setTaxBillInfoSubAddressAction,
    setTaxBillInfoAdminNmAction,
    setTaxBillInfoAdminPhoneAction,
    setAddressPopupAction,
  } = usePayments()

  return (
    <li>
      <div className="form-title-btn__group">
        <p
          className="font-body__regular fw700"
          style={{ marginRight: 12 }}
        >
          세금계산서 발행 정보
        </p>
        {accessToken !== '' && (
          <FormBasicCheckbox
            label={'정보 가져오기'}
            name={'taxBillInfo.getApplicatnInfo'}
            id={'taxBillInfo.getApplicatnInfo'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => getTaxBillAction(taxBillInfo.getApplicatnInfo, companyInfo)}
            checked={taxBillInfo.getApplicatnInfo}
          />
        )}
      </div>
      <ul className="grid-col2">
        <li>
          <FormInputText
            title={'상호'}
            required={true}
            onChange={e => setTaxBillInfoCompanyNmAction(e.target.value, taxBillInfo)}
            failed={taxBillInfo.companyNmErr !== ''}
            msg={taxBillInfo.companyNmErr}
            value={taxBillInfo.companyNm}
          />
        </li>
        <li>
          <FormInputText
            title={'대표자 이름'}
            required={true}
            onChange={e => setTaxBillInfoNmAction(e.target.value, taxBillInfo)}
            failed={taxBillInfo.nameErr !== ''}
            msg={taxBillInfo.nameErr}
            value={taxBillInfo.name}
          />
        </li>
        <li>
          <FormInputText
            title={'사업자등록번호'}
            required={true}
            extraInputType={'businessNm'}
            onChangeExtra={e => setTaxBillInfobusinessNmAction(e, taxBillInfo)}
            failed={taxBillInfo.businessNmErr !== ''}
            msg={taxBillInfo.businessNmErr}
            value={taxBillInfo.businessNm}
          />
        </li>
        <li>
          <FormInputText
            title={'계산서 수신 이메일'}
            required={true}
            onChange={e => setTaxBillInfoEmailAction(e.target.value, taxBillInfo)}
            failed={taxBillInfo.emailErr !== ''}
            msg={taxBillInfo.emailErr}
            value={taxBillInfo.email}
          />
        </li>
      </ul>

      <div className="form-address__section">
        <FormTitle
          title="주소"
          required={true}
        />
        <ul className="form-address__detail">
          <li className="search">
            <FormInputText
              failed={taxBillInfo.addressNmErr !== ''}
              msg={taxBillInfo.addressNmErr}
              value={taxBillInfo.addressNm}
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
              onChange={e => setTaxBillInfoSubAddressAction(e.target.value, taxBillInfo)}
              failed={taxBillInfo.addressNmErr !== ''}
              msg={taxBillInfo.addressNmErr}
              value={taxBillInfo.subAddressNm}
            />
          </li>
        </ul>
      </div>
      <ul className="grid-col2">
        <li>
          <FormInputText
            title={'계산서 담당자'}
            onChange={e => setTaxBillInfoAdminNmAction(e.target.value, taxBillInfo)}
            failed={false}
            msg={taxBillInfo.adminNmErr}
            value={taxBillInfo.adminNm}
          />
        </li>
        <li>
          <FormInputText
            title={'계산서 담당자 전화'}
            extraInputType={'phone'}
            onChangeExtra={e => setTaxBillInfoAdminPhoneAction(e, taxBillInfo)}
            failed={false}
            msg={taxBillInfo.adminPhoneErr}
            value={taxBillInfo.adminPhone}
          />
        </li>
      </ul>
    </li>
  )
}

export default TaxBill
