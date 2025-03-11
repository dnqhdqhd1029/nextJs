import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Tooltips from '~/components/common/ui/Tooltips'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { useClipbookListPopup } from '~/utils/hooks/contents/monitoring/useClipbookListPopup'

const ClipbookContentItemTypeAny = (item: clipbookContentListProps) => {
  const { clipbookListPage, clipbookListPageCheckStatusChange } = useClipbookListPopup()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (clipbookListPage.clipbookIdList && clipbookListPage.clipbookIdList.length > 0) {
      const find = clipbookListPage.clipbookIdList.find(e => e === item.clipBookId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [clipbookListPage.clipbookIdList])

  return (
    <Fragment>
      {!item.isEdit && clipbookListPage.clipbookIdList.find(e => e === item.clipBookId) ? (
        <li key={`clipbook-simple-item-${item.clipBookId}-${item.title}`}>
          <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
            <Tooltips
              tooltipId={`clipbook-item-${item.clipBookId}-${item.title}`}
              tooltipPlace={'top'}
              tooltipHtml={'공개(타인이 보고 사용할 <br />수 있지만, 수정하거나 <br />추가를 할 수 없음)'}
              tooltipComponent={
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name={`clipbook-item-${item.clipBookId}-${item.title}`}
                    id={`clipbook-item-${item.clipBookId}-${item.title}`}
                    label={item.title}
                    labelClass="default"
                    checked={true}
                    iptCheckboxIcoPerson={item.isOwner}
                    disabled={true}
                  />
                </div>
              }
            />
          </div>
        </li>
      ) : (
        <Fragment>
          {item.isEdit && (
            <li key={`clipbook-simple-item-${item.clipBookId}-${item.title}`}>
              <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
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
              </div>
            </li>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ClipbookContentItemTypeAny
