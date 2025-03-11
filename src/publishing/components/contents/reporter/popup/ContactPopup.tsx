/**
 * @file ContactPopup.tsx
 * @description 연락처 팝업
 */

import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
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

const ContactPopup = ({ isOpen, onClose }: Props) => {
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
        title={'연락처'}
        hasCloseButton
        width={600}
        //height={400}
        className="popup-none-scroll mobile-scroll"
        showFooter={true}
        buttons={
          <div className="popup-footer__section ">
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
        <div className="form-group column">
          {/**/}
          <ul>
            <li>
              <div className="flex-wrap align-items-center">
                <FormTitle title={'이메일(ID)'} />
                <div className="flex-wrap align-items-center">
                  <span>gildong*****@gmail*****</span>
                  <Button
                    label={'에디터'}
                    cate={'ico-only'}
                    size={'es'}
                    color={'gray-500'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.pencilFill2}
                    icoSize={12}
                    onClick={() => togglePopup('EmailResetPopup', true)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap align-items-center">
                <FormTitle title={'휴대전화'} />
                <FormInputText inputType={'text'} />
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'휴대전화 공개'} />
                <div>
                  <FormBasicRadio
                    label="동의"
                    value="agree"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormBasicRadio
                    label="동의 안함"
                    value="agree"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'전화번호'} />
                <div className="w40p">
                  <FormInputText inputType={'text'} />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'팩스'} />
                <div className="w40p">
                  <FormInputText inputType={'text'} />
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'메신저ID'} />
                <div className="flex-wrap-column  align-items-start">
                  <div className="flex-wrap  align-items-center addFile">
                    <Select
                      options={[
                        { id: '0', name: '선택' },
                        { id: '1', name: '네이트온' },
                        { id: '2', name: '스카이프' },
                        { id: '3', name: '카카오톡' },
                        { id: '4', name: '라인' },
                        { id: '5', name: '페이스북' },
                        { id: '6', name: '카카오톡채널' },
                        { id: '7', name: '틱톡' },
                        { id: '8', name: '네이버 톡톡' },
                      ]}
                    />
                    &nbsp;&nbsp;
                    <FormInputText inputType={'text'} />
                    &nbsp;&nbsp;
                    <Button
                      label={'버튼'}
                      cate={'default-ico-only'}
                      size={'s'}
                      color={'outline-form'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.plusLg}
                    />
                  </div>
                  <div className="flex-wrap  align-items-center addFile mt-5">
                    <Select
                      options={[
                        { id: '0', name: '선택' },
                        { id: '1', name: '네이트온' },
                        { id: '2', name: '스카이프' },
                        { id: '3', name: '카카오톡' },
                        { id: '4', name: '라인' },
                        { id: '5', name: '페이스북' },
                        { id: '6', name: '카카오톡채널' },
                        { id: '7', name: '틱톡' },
                        { id: '8', name: '네이버 톡톡' },
                      ]}
                    />
                    &nbsp;&nbsp;
                    <FormInputText inputType={'text'} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'연락방법'} />
                <Select
                  options={[
                    { id: '0', name: '선택' },
                    { id: '1', name: '이메일' },
                    { id: '2', name: '휴대전화' },
                    { id: '3', name: '전화' },
                    { id: '4', name: '휴대폰 문자' },
                    { id: '5', name: '메신저' },
                  ]}
                />
              </div>
            </li>
            <li>
              <div className="flex-wrap  align-items-center">
                <FormTitle title={'연락시간'} />
                <div className="flex-wrap align-items-center w40p">
                  <div className=" flex-1">
                    <Select
                      options={[
                        { id: '0', name: '선택' },
                        { id: '1', name: '0시' },
                        { id: '2', name: '1시' },
                        { id: '3', name: '2시' },
                        { id: '4', name: '3시' },
                        { id: '5', name: '4시' },
                        { id: '6', name: '5시' },
                        { id: '7', name: '6시' },
                        { id: '8', name: '7시' },
                        { id: '9', name: '8시' },
                        { id: '10', name: '9시' },
                        { id: '11', name: '10시' },
                        { id: '12', name: '11시' },
                        { id: '13', name: '12시' },
                      ]}
                    />
                  </div>{' '}
                  &nbsp;&nbsp;~&nbsp;&nbsp;
                  <div className="flex-1">
                    <Select
                      options={[
                        { id: '0', name: '선택' },
                        { id: '1', name: '0시' },
                        { id: '2', name: '1시' },
                        { id: '3', name: '2시' },
                        { id: '4', name: '3시' },
                        { id: '5', name: '4시' },
                        { id: '6', name: '5시' },
                        { id: '7', name: '6시' },
                        { id: '8', name: '7시' },
                        { id: '9', name: '8시' },
                        { id: '10', name: '9시' },
                        { id: '11', name: '10시' },
                        { id: '12', name: '11시' },
                        { id: '13', name: '12시' },
                      ]}
                    />
                  </div>
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

export default ContactPopup
