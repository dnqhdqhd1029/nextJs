/**
 * @file FieldPopup.tsx
 * @description 담당분야 팝업
 */

import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import Tag from '~/components/common/ui/Tag'
import Tooltips from '~/components/common/ui/Tooltips'
import EmailResetPopup from '~/components/contents/member/popup/EmailResetPopup'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void
}

const FieldPopup = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }
  const [isOpen1, setIsOpen] = useState({
    EmailResetPopup: false,
  })
  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  return (
    <>
      <Popup
        isOpen={isOpen}
        onClose={handleClose}
        title={'담당 분야 (분야/지역 선택하여 최대 10개까지 선택 가능)'}
        hasCloseButton
        width={600}
        height={780}
        className="popup-none-scroll"
        showFooter={true}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              //onClick={onConfirm ?? handleClose}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={handleClose}
            />
          </div>
        }
      >
        <div className="form-group">
          {/**/}
          <ul>
            <li>
              <div className="flex-wrap  align-items-center">
                <div>
                  <FormBasicRadio
                    label="분야"
                    value="agree"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormBasicRadio
                    label="지역"
                    value="agree"
                  />
                </div>
              </div>
            </li>
            <li>
              <div
                className="tree-menu__section"
                style={{ marginBottom: 20 }}
              >
                <div className="tree-menu__area">
                  <div className="tree-menu__group type1">
                    <ul className="tree-menu__list">
                      <li>
                        <button className="tree-menu__button is-selected">
                          <span className="tree-menu__button-text">전분야</span>
                        </button>
                      </li>
                      <li>
                        <button className="tree-menu__button">
                          <span className="tree-menu__button-text">IT/전자</span>
                        </button>
                      </li>
                      <li>
                        <button className="tree-menu__button">
                          <span className="tree-menu__button-text">건강</span>
                        </button>
                      </li>
                      <li>
                        <button className="tree-menu__button">
                          <span className="tree-menu__button-text">경제</span>
                        </button>
                      </li>
                      <li>
                        <button className="tree-menu__button">
                          <span className="tree-menu__button-text">문화</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tree-menu__group type2">
                    <ul className="tree-menu__list">
                      <li>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck10"
                            id="ck10"
                            label="선택0"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck11"
                            id="ck11"
                            label="선택1"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck12"
                            id="ck12"
                            label="선택2"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck13"
                            id="ck13"
                            label="선택3"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck14"
                            id="ck14"
                            label="선택4"
                          />
                        </div>
                      </li>
                    </ul>
                    <div className="tree-menu-footer__group">
                      <button
                        type="button"
                        className="tree-menu-footer__button"
                      >
                        전체 선택
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tags__section">
                <ul className="tags__list">
                  <li>
                    <Tag
                      label={'태그1'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                  <li>
                    <Tag
                      label={'태그2'}
                      cate={'n3'}
                      shape={'round'}
                      close={true}
                    />
                  </li>
                </ul>
                <div className="tags__delete">
                  <Button
                    label={'전체 삭제'}
                    cate={'link-text'}
                    size={'s'}
                    color={'body-link'}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="popup-contents__section"></div>
      </Popup>
      <EmailResetPopup
        isOpen={isOpen1.EmailResetPopup}
        onClose={() => togglePopup('EmailResetPopup', false)}
      />
    </>
  )
}

export default FieldPopup
