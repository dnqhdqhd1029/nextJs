import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { useTagSearchForm } from '~/utils/hooks/contents/common/useTagSearchForm'

interface Props {
  tagData: MbTagSearchTagItem
  tagList: MbTagSearchTagItem[]
  onChangeTagList: (i: MbTagSearchTagItem[]) => void
}

const TagTotalList = (props: Props) => {
  const { onChangeCheckedSearchData } = useTagSearchForm({
    isOpen: false,
    category: 'NEWS',
  })
  const [isSelected, setIsSelected] = useState(false)

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.tagList)
    props.onChangeTagList(res)
  }

  useEffect(() => {
    if (props.tagList.length > 0) {
      const find = props.tagList.find(e => e.id.toString() === props.tagData.id.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [props.tagList])

  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.tagData.id}
          id={'menu__button_MediaTypePopup' + props.tagData.id}
          checkDataLimit={30}
          checkDataLimitDisable={30 === props.tagList.length ? 'action' : 'non'}
          onClickEvent={() =>
            30 &&
            30 === props.tagList.length &&
            openToast(`${30}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`, 'warning')
          }
          checkDataLength={props.tagList?.length}
          label={props.tagData.label}
          subLabel={props.tagData.subData}
          onChange={() => onChangeChecked(isSelected, props.tagData)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default TagTotalList
