/**
 * @file PJ10.tsx
 * @description PJ10 페이지
 */

import LnbPopupList from '~/publishing/components/common/layouts/LnbPopupList'
import Button from '~/publishing/components/common/ui/Button'
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
            <h2 className="popup-header__title">
              목록 수정 <span className="popup-header__title-count">4</span>
            </h2>
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
            <div className="popup-contents-tabs__section">
              <div className="tabs__section type1-small">
                <div className="tabs-menu__group">
                  <ul className="tabs-menu__list">
                    <li className="is-active">
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">언론인</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">미디어</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 언론인 */}
              <div className="tabs-panel__section">
                <div className="tabs-panel__group">
                  <LnbPopupList />
                </div>
              </div>
            </div>
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
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
