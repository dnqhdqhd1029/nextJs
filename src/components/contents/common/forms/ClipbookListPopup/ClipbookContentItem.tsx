import { useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { useClipbookListPopup } from '~/utils/hooks/contents/monitoring/useClipbookListPopup'

const ClipbookContentItem = (item: clipbookContentListProps) => {
  const { clipbookListPage, clipbookListPageCheckStatusChange } = useClipbookListPopup()
  const [checked, setChecked] = useState(false)
  const [excepted, setExcepted] = useState(false)

  useEffect(() => {
    if (clipbookListPage.clipbookIdList && clipbookListPage.clipbookIdList.length > 0) {
      const find = clipbookListPage.clipbookIdList.find(e => e === item.clipBookId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [clipbookListPage.clipbookIdList])

  useEffect(() => {
    if (clipbookListPage.except && clipbookListPage.except.length > 0) {
      const find = clipbookListPage.except.find(e => e === item.clipBookId)
      setExcepted(() => !!find)
    } else {
      setExcepted(() => false)
    }
  }, [clipbookListPage.except])

  if (clipbookListPage.type !== 'any' && !item.isEdit) {
    return null
  }

  return (
    <li key={`clipbook-simple-item-${item.clipBookId}-${item.title}`}>
      <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
        {excepted ? (
          <Tooltips
            tooltipId={`clipbook-item-${item.clipBookId}-${item.title}`}
            tooltipPlace={'top'}
            tooltipHtml={'이미 추가되어있는 클립북'}
            tooltipComponent={
              <div className="ipt-checkbox-ico__group">
                <FormInputBtn
                  type="checkbox"
                  name={`clipbook-item-${item.clipBookId}-${item.title}`}
                  id={`clipbook-item-${item.clipBookId}-${item.title}`}
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
              name={`clipbook-simple-item-${item.clipBookId}-${item.title}`}
              id={`clipbook-simple-item-${item.clipBookId}-${item.title}`}
              label={item.title}
              checked={checked}
              iptCheckboxIcoPerson={item.isOwner}
              onChange={e => clipbookListPageCheckStatusChange(e.target.checked, item, clipbookListPage)}
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default ClipbookContentItem
