import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { excelListProps } from '~/stores/modules/contents/monitoring/registerNews'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const FileItems = (props: excelListProps) => {
  const { excelParams, filesCheckedExcelParamsOnChange } = useRegisterNews()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const find = excelParams.execelIdList.find(e => e === props.id)
    setIsSelected(() => !!find)
  }, [excelParams.execelIdList.length])
  return (
    <tr>
      <td>
        <FormBasicCheckbox
          label={props.title}
          name={'pressRelease-content-add-check' + props.id}
          id={'pressRelease-content-add-check' + props.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => filesCheckedExcelParamsOnChange(e, props.id, excelParams)}
          checked={isSelected}
        />
      </td>
      <td>{props.date}</td>
    </tr>
  )
}

export default FileItems
