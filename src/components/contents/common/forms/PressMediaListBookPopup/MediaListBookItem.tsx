import { useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Tooltips from '~/components/common/ui/Tooltips'
import { mediaContentListProps } from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import { usePressMediaListBook } from '~/utils/hooks/contents/pressMedia/usePressMediaListBook'

const MediaListBookItem = (item: mediaContentListProps) => {
  const { searchRegisterListPopup, mediaSearchRegisterListCheckStatusChange } = usePressMediaListBook()
  const [checked, setChecked] = useState(false)
  const [excepted, setExcepted] = useState(false)

  useEffect(() => {
    if (searchRegisterListPopup.searchRegistIdList && searchRegisterListPopup.searchRegistIdList.length > 0) {
      const find = searchRegisterListPopup.searchRegistIdList.find(e => e === item.mediaListId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [searchRegisterListPopup.searchRegistIdList])

  useEffect(() => {
    if (searchRegisterListPopup.except && searchRegisterListPopup.except.length > 0) {
      const find = searchRegisterListPopup.except.find(e => e === item.mediaListId)
      setExcepted(() => !!find)
    } else {
      setExcepted(() => false)
    }
    console.log('clipbookListPage.except', searchRegisterListPopup.except)
  }, [searchRegisterListPopup.except])

  if (searchRegisterListPopup.type !== 'any' && !item.isEdit) {
    return null
  }

  return (
    <li key={`MediaSearchRegisterItem-${item.mediaListId}-${item.jrnlstListId}`}>
      <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
        {excepted ? (
          <Tooltips
            tooltipId={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
            tooltipPlace={'top'}
            tooltipHtml={'이미 추가되어있는 리스트'}
            tooltipComponent={
              <div className="ipt-checkbox-ico__group">
                <FormInputBtn
                  type="checkbox"
                  name={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
                  id={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
                  label={item.title}
                  checked={true}
                  iptCheckboxIcoPerson={item.isOwner}
                  disabled={true}
                />
              </div>
            }
          />
        ) : (
          <div className="ipt-checkbox-ico__group">
            <FormInputBtn
              type="checkbox"
              name={`clipbook-simple-item-${item.mediaListId}-${item.jrnlstListId}`}
              id={`clipbook-simple-item-${item.mediaListId}-${item.jrnlstListId}`}
              label={item.title}
              checked={checked}
              iptCheckboxIcoPerson={item.isOwner}
              onChange={e => mediaSearchRegisterListCheckStatusChange(e.target.checked, item, searchRegisterListPopup)}
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default MediaListBookItem
