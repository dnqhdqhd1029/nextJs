/**
 * @file SettingPopup.tsx
 * @description 설정 팝업
 */

import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import EmailResetPopup from '~/publishing/components/contents/member/popup/EmailResetPopup'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void
}

const SettingPopup = ({ isOpen, onClose }: Props) => {
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
        title={'설정'}
        hasCloseButton
        width={600}
        //height={400}
        className="popup-none-scroll "
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
                <div className="flex-just-start align-items-center">
                  <FormTitle title={'프로필 노출'} />
                  &nbsp;&nbsp;
                  <Tooltips
                    tooltipId={'ipt-tt0'}
                    tooltipPlace={'top'}
                    tooltipHtml={'미디어비를 사용하는 기업 홍보 담당자에게 노출됩니다.'}
                    tooltipComponent={<IcoTooltip />}
                  />
                </div>
                <div>
                  <FormBasicCheckbox label={'노출 안함'} />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'휴대전화 정보'} />
                <div>
                  <FormBasicRadio
                    label="공개"
                    value="agree"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormBasicRadio
                    label="비공개"
                    value="agree"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <div className="flex-just-start align-items-center">
                  <FormTitle title={'소셜 정보 제공'} />
                  &nbsp;
                  <Tooltips
                    tooltipId={'ipt-tt0'}
                    tooltipPlace={'top'}
                    tooltipHtml={'동의 시 미디어비 운영자가 소셜 정보를 프로필 업데이트에 참고할 수 있습니다.\n'}
                    tooltipComponent={<IcoTooltip />}
                  />
                </div>
                <div>
                  <FormBasicRadio
                    label="동의"
                    value="agree"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormBasicRadio
                    label="동의안함"
                    value="agree"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Popup>
      <EmailResetPopup
        isOpen={isOpen1.EmailResetPopup}
        onClose={() => togglePopup('EmailResetPopup', false)}
      />
    </>
  )
}

export default SettingPopup
