/**
 * @file J15.tsx
 * @description J15 페이지
 */

import LnbPopupList from '~/publishing/components/common/layouts/LnbPopupList'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div className="popup__section type-list">
          <div className="popup-header__section">
            <h2 className="popup-header__title">목록에 저장</h2>
            <div className="popup-header__close">
              <Button
                label={'닫기'}
                cate={'ico-only'}
                size={'s32'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.iconCloseButton}
                icoSize={16}
              />
            </div>
          </div>
          <div className="popup-contents__section">
            <LnbPopupList data={false} />
          </div>
          <div className="popup-footer__section">
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
            />
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
