import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import { mediaExcelListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const FileItems = (props: mediaExcelListProps) => {
  const { mediaExcelParams, mediaFilesCheckedExcelParamsOnChange } = useRegisterPressMedia()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const find = mediaExcelParams.execelIdList.find(e => e === props.id)
    setIsSelected(() => !!find)
  }, [mediaExcelParams.execelIdList.length])
  return (
    <tr>
      <td>
        <FormBasicCheckbox
          label={props.mediaName}
          name={'mediaExcelParams.excelList-content-add-check' + props.id}
          id={'mediaExcelParams.excelList-content-add-check' + props.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            mediaFilesCheckedExcelParamsOnChange(e, props.id, mediaExcelParams)
          }
          checked={isSelected}
        />
      </td>
      <td>{props.website}</td>
      <td>{props.email}</td>
    </tr>
  )
}

export default FileItems
