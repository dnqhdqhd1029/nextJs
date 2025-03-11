import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { pressExcelListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const FileItems = (props: pressExcelListProps) => {
  const { pressExcelParams, pressFilesCheckedExcelParamsOnChange } = useRegisterPressMedia()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const find = pressExcelParams.execelIdList.find(e => e === props.id)
    setIsSelected(() => !!find)
  }, [pressExcelParams.execelIdList.length])
  return (
    <tr>
      <td>
        <FormBasicCheckbox
          label={props.name}
          name={'pressExcelParams.excelList-content-add-check' + props.id}
          id={'pressExcelParams.excelList-content-add-check' + props.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            pressFilesCheckedExcelParamsOnChange(e, props.id, pressExcelParams)
          }
          checked={isSelected}
        />
      </td>
      <td>{props.mediaName}</td>
      <td>{props.email}</td>
    </tr>
  )
}

export default FileItems
