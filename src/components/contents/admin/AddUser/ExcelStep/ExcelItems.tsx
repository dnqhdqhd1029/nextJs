import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { excelListProps } from '~/stores/modules/contents/admin/addUser'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const ExcelItems = (props: excelListProps) => {
  const { emailData, emailCheckedExcelOnChange } = useAddUser()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const find = emailData.execelIdList.find(e => e === props.id)
    setIsSelected(() => !!find)
  }, [emailData.execelIdList.length])
  return (
    <tr>
      <td>
        <FormBasicCheckbox
          label={props.email}
          name={'pressRelease-content-add-check' + props.id}
          id={'pressRelease-content-add-check' + props.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => emailCheckedExcelOnChange(e, props.id, emailData)}
          checked={isSelected}
        />
      </td>
    </tr>
  )
}

export default ExcelItems
