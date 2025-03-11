import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import CheckBoxItem from '~/components/contents/purchaseRequest/AgreeNotice/CheckBoxItem'
import { serviceNotice } from '~/components/contents/purchaseRequest/defaultData'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

const AgreeNotice = () => {
  const { totalNoticeChecked, totalAgreeNotice } = usePurchaseRequest()

  return (
    <li>
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular fw700">약관 등 동의</p>
      </div>
      <div className="agree__section">
        <div className="agree-notice__group">
          <p className="agree-notice__text">
            이 양식을 제출함으로써 귀하는 당사의{' '}
            <Button
              label={'약관'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={() => console.log()}
            />
            ,{' '}
            <Button
              label={'개인정보 보호정책'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={() => console.log()}
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
  )
}

export default AgreeNotice
