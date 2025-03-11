import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Popup from '~/components/common/ui/Popup'
import Tooltips from '~/components/common/ui/Tooltips'
import { SelectListOptionItem } from '~/types/common'
import { useDashboardAction } from '~/utils/hooks/contents/dashboard/useDashboardAction'

const GadgetPopup = () => {
  const { gridState, gadgetPopup, keywordMonitoring, setGadgetPopupAction, handleGadgetAdd } = useDashboardAction()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async (item: SelectListOptionItem) => {
    setIsLoading(() => true)
    await handleGadgetAdd(item, gridState, keywordMonitoring)
    setIsLoading(() => false)
  }

  return (
    <Popup
      isOpen={gadgetPopup.isOpen}
      onClose={() =>
        setGadgetPopupAction({
          isOpen: false,
          selectList: [],
        })
      }
      hasCloseButton
      hasCloseButtonLoading={isLoading}
      title={'가젯 추가'}
      width={500}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'닫기'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={() =>
              setGadgetPopupAction({
                isOpen: false,
                selectList: [],
              })
            }
          />
        </div>
      }
    >
      <ul className="popup-gadget__list">
        {gadgetPopup.selectList.map(item => {
          let isVisible = false
          if (item.extra !== 'non') {
            if (item.id === 'keywordMonitoring' && keywordMonitoring < 4) {
              isVisible = true
            } else {
              isVisible = true
            }
          }
          if (isVisible) {
            return (
              <li key={item.id}>
                <div className="popup-gadget__group">
                  <p className="popup-gadget__text overflow-visible">
                    {item.name}
                    {item.id === 'keywordMonitoring' && (
                      <Tooltips
                        className="ml-4"
                        tooltipId={'tt10-5'}
                        tooltipPlace={'right'}
                        tooltipHtml={`미리 입력한 키워드로 검색된 뉴스를 볼 수 있는 <br/>기능으로, 키워드 모니터링 가젯은 최대 4개까지 <br/> 추가할 수 있습니다.`}
                        tooltipComponent={<IcoTooltip />}
                      />
                    )}
                  </p>
                  <div className="popup-gadget__button">
                    <Button
                      label={'추가하기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      onClick={() => actionButton(item)}
                      disabled={
                        isLoading
                          ? isLoading
                          : item.extra === 'non'
                          ? true
                          : item.id === 'keywordMonitoring'
                          ? keywordMonitoring > 3
                          : item.extra === 'non'
                      }
                    />
                  </div>
                </div>
              </li>
            )
          }
        })}
      </ul>
    </Popup>
  )
}

export default GadgetPopup
