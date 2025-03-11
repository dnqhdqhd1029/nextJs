/**
 * @file Popup-bottom.tsx
 * @description Popup-bottom 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup Bottom</h2>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">기본 (오른쪽 정렬)</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">타이틀</h2>
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
              <div className="popup-contents__section">팝업 컨텐츠</div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'저장안함'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
                <Button
                  label={'저장'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">type1 : 가운데 정렬</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">타이틀</h2>
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
              <div className="popup-contents__section">팝업 컨텐츠</div>
              <div className="popup-footer__section type1">
                <Button
                  label={'확인'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">type2, No. 1 : between 정렬 (버튼 2개)</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">타이틀</h2>
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
              <div className="popup-contents__section">팝업 컨텐츠</div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
                    <Button
                      label={'취소'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronThickRight}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">type2, No. 2 : between 정렬 (버튼 3개)</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">타이틀</h2>
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
              <div className="popup-contents__section">팝업 컨텐츠</div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
                    <Button
                      label={'이전'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'outline-secondary'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.chevronThickLeft}
                    />
                    <Button
                      label={'취소'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </li>
                  <li>
                    <Button
                      label={'보내기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">type2, No. 3 : between 정렬 (버튼 3개)</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">타이틀</h2>
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
              <div className="popup-contents__section">팝업 컨텐츠</div>
              <div className="popup-footer__section type2">
                <ul className="buttons">
                  <li className="outline">
                    <Button
                      label={'삭제'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
