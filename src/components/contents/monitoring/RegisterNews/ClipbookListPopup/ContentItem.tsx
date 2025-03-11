import { useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const ContentItem = (item: clipbookContentListProps) => {
  const { clipbookListPage, clipbookListPageCheckStatusChange } = useRegisterNews()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (clipbookListPage.clipbookIdList && clipbookListPage.clipbookIdList.length > 0) {
      const find = clipbookListPage.clipbookIdList.find(e => Number(e.id) === item.clipBookId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [clipbookListPage.clipbookIdList])

  if (!item.isEdit && !checked) {
    return null
  }

  return (
    <li key={`clipbook-simple-item-${item.clipBookId}-${item.title}`}>
      <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
        {!item.isEdit ? (
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
                  checked={checked}
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

export default ContentItem
