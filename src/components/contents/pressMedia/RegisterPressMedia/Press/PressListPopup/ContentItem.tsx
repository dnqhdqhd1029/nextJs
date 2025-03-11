import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { pressListContentListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const ContentItem = (item: pressListContentListProps) => {
  const { pressListPopupPage, pressListPopupPageCheckStatusChange } = useRegisterPressMedia()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (pressListPopupPage.pressIdList && pressListPopupPage.pressIdList.length > 0) {
      const find = pressListPopupPage.pressIdList.find(e => e.id === item.jrnlstListId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [pressListPopupPage.pressIdList])

  return (
    <Fragment>
      {item.isEdit && (
        <li key={`pressList-simple-item-${item.jrnlstListId}-${item.title}`}>
          <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
            <div className="ipt-checkbox-ico__group">
              <FormInputBtn
                type="checkbox"
                name={`pressList-simple-item-${item.jrnlstListId}-${item.title}`}
                id={`pressList-simple-item-${item.jrnlstListId}-${item.title}`}
                label={item.title}
                checked={checked}
                iptCheckboxIcoPerson={item.isOwner}
                onChange={e => pressListPopupPageCheckStatusChange(e.target.checked, item, pressListPopupPage)}
              />
            </div>
          </div>
        </li>
      )}
    </Fragment>
  )
}

export default ContentItem
