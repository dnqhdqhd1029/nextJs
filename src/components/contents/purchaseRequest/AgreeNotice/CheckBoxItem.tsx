import { useEffect, useState } from 'react'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { usePurchaseRequest } from '~/utils/hooks/contents/purchaseRequest/usePurchaseRequest'

interface Props {
  id: string
  name: string
}
const CheckBoxItem = (props: Props) => {
  const { agreeNoticeInfo, setNoticeChecked } = usePurchaseRequest()
  const [checked, setChecked] = useState(false)
  const calculate = async () => {
    const find = agreeNoticeInfo.find(e => e === props.id)
    setChecked(() => !!find)
  }

  useEffect(() => {
    calculate()
  }, [props])

  return (
    <li style={{ marginTop: 6, height: 24 }}>
      <FormBasicCheckbox
        label={props.name}
        name={'agreeNoticeInfo' + props.id.toString()}
        id={'agreeNoticeInfo' + props.id.toString()}
        onChange={() => setNoticeChecked(checked, props.id, agreeNoticeInfo)}
        checked={checked}
      />
    </li>
  )
}

export default CheckBoxItem
