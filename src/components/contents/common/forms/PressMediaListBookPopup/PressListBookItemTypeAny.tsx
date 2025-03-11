import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import { mediaContentListProps } from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import { usePressMediaListBook } from '~/utils/hooks/contents/pressMedia/usePressMediaListBook'

const PressListBookItemTypeAny = (item: mediaContentListProps) => {
  const { searchRegisterListPopup, pressSearchRegisterListCheckStatusChange } = usePressMediaListBook()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (searchRegisterListPopup.searchRegistIdList && searchRegisterListPopup.searchRegistIdList.length > 0) {
      const find = searchRegisterListPopup.searchRegistIdList.find(e => e === item.jrnlstListId)
      setChecked(() => !!find)
    } else {
      setChecked(() => false)
    }
  }, [searchRegisterListPopup.searchRegistIdList])

  return (
    <Fragment>
      {!item.isEdit && searchRegisterListPopup.searchRegistIdList.find(e => e === item.jrnlstListId) ? (
        <li key={`pressSearchRegisterItem-${item.mediaListId}-${item.jrnlstListId}`}>
          <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
            <Tooltips
              tooltipId={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
              tooltipPlace={'top'}
              tooltipHtml={'공개(타인이 보고 사용할 <br />수 있지만, 수정하거나 <br />추가를 할 수 없음)'}
              tooltipComponent={
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
                    id={`clipbook-item-${item.mediaListId}-${item.jrnlstListId}`}
                    label={item.title}
                    labelClass="default"
                    checked={true}
                    disabled={true}
                    iptCheckboxIcoPerson={item.isOwner}
                  />
                </div>
              }
            />
          </div>
        </li>
      ) : (
        <Fragment>
          {item.isEdit && (
            <li key={`pressSearchRegisterItem-${item.mediaListId}-${item.jrnlstListId}`}>
              <div className={cn('Popup-type-list__checkbox-item', { 'type-ico': item.isOwner })}>
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name={`clipbook-simple-item-${item.mediaListId}-${item.jrnlstListId}`}
                    id={`clipbook-simple-item-${item.mediaListId}-${item.jrnlstListId}`}
                    label={item.title}
                    checked={checked}
                    iptCheckboxIcoPerson={item.isOwner}
                    onChange={e =>
                      pressSearchRegisterListCheckStatusChange(e.target.checked, item, searchRegisterListPopup)
                    }
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

export default PressListBookItemTypeAny
