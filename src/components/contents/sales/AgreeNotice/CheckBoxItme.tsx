import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { useSales } from '~/utils/hooks/contents/sales/useSales'

interface Props {
  id: string
  name: string
}
const CheckBoxItem = (props: Props) => {
  const { setNoticeChecked, agreeNoticeInfo } = useSales()

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
      {props.id === 'thirdService' && (
        <Button
          elem="a"
          url={'#!'}
          target="_blank"
          label={'개인정보 제3자 제공/위탁'}
          cate={'link-text'}
          size={'m'}
          color={'body-link'}
          style={{ marginLeft: 12 }}
        />
      )}
    </li>
  )
}

export default CheckBoxItem
