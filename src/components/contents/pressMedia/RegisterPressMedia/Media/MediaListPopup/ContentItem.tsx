import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { mediaListContentListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const ContentItem = (item: mediaListContentListProps) => {
  const { mediaListPopupPage, mediaListPopupPageCheckStatusChange } = useRegisterPressMedia()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (mediaListPopupPage.mediaIdList && mediaListPopupPage.mediaIdList.length > 0) {
      const find = mediaListPopupPage.mediaIdList.find(e => e.id === item.mediaListId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [mediaListPopupPage.mediaIdList])

  return (
    <Fragment>
      {item.isEdit && (
        <li key={`mediaList-simple-item-${item.mediaListId}-${item.title}`}>
          <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
            <div className="ipt-checkbox-ico__group">
              <FormInputBtn
                type="checkbox"
                name={`mediaList-simple-item-${item.mediaListId}-${item.title}`}
                id={`mediaList-simple-item-${item.mediaListId}-${item.title}`}
                label={item.title}
                checked={checked}
                iptCheckboxIcoPerson={item.isOwner}
                onChange={e => mediaListPopupPageCheckStatusChange(e.target.checked, item, mediaListPopupPage)}
              />
            </div>
          </div>
        </li>
      )}
    </Fragment>
  )
}

export default ContentItem
