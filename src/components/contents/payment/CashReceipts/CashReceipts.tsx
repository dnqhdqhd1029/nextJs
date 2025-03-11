import { ChangeEvent } from 'react'
import Cookie from 'js-cookie'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputText from '~/components/common/ui/FormInputText'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const CashReceipts = () => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const {
    companyInfo,
    cashReceiptsInfo,
    getCashReceiptsAction,
    setCashReceiptsNmAction,
    setCashReceiptsPhoneCallNmAction,
  } = usePayments()

  return (
    <li>
      <div className="form-title-btn__group">
        <p
          className="font-body__regular fw700"
          style={{ marginRight: 12 }}
        >
          현금영수증 발행 정보
        </p>
        {accessToken !== '' && (
          <FormBasicCheckbox
            label={'정보 가져오기'}
            name={'cashReceiptsInfo.getApplicatnInfo'}
            id={'cashReceiptsInfo.getApplicatnInfo'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              getCashReceiptsAction(cashReceiptsInfo.getApplicatnInfo, companyInfo)
            }
            checked={cashReceiptsInfo.getApplicatnInfo}
          />
        )}
      </div>
      <ul className="grid-col2">
        <li>
          <FormInputText
            title={'이름'}
            required={true}
            onChange={e => setCashReceiptsNmAction(e.target.value, cashReceiptsInfo)}
            failed={cashReceiptsInfo.nameErr !== ''}
            msg={cashReceiptsInfo.nameErr}
            value={cashReceiptsInfo.name}
          />
        </li>
        <li>
          <FormInputText
            title={'휴대전화'}
            required={true}
            extraInputType={'phone'}
            onChangeExtra={e => setCashReceiptsPhoneCallNmAction(e, cashReceiptsInfo)}
            failed={cashReceiptsInfo.phoneNmErr !== ''}
            msg={cashReceiptsInfo.phoneNmErr}
            value={cashReceiptsInfo.phoneNm}
          />
        </li>
      </ul>
    </li>
  )
}

export default CashReceipts
