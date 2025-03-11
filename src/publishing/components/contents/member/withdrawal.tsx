/**
 * @file withdrawal.tsx
 * @description 회원탈퇴 페이지
 */

import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import TextAreaView from '~/components/common/ui/TextAreaView'
import { userCountList } from '~/components/contents/purchaseRequest/defaultData'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import PasswordCheckPopup from '~/publishing/components/contents/member/popup/PasswordCheckPopup'
import PasswordResetPopup from '~/publishing/components/contents/member/popup/PasswordResetPopup'
const Sample = () => {
  const [isOpen, setIsOpen] = useState({
    PasswordReset: false,
    PasswordCheck: false,
  })
  const router = useRouter()

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  return (
    <>
      <div className="mb-container bg-white">
        <div className="mb-common-inner">
          <div className="mb-contents max-w600 ">
            <div className="member__section">
              <div className="member-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">회원 탈퇴</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt28">
                <li style={{ lineHeight: '1.5' }}>
                  회원 탈퇴 시, 동일한 이메일로 30일간 재가입이 불가능하며, 탈퇴 후 프로필 정보는 삭제되어 복구할 수
                  없습니다.
                </li>
                <li>
                  <dl className="dl-table-type1__section">
                    <dt>
                      <FormTitle title={'이메일(ID'} />
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">hgd123@gmail.com</p>
                    </dd>
                    <dt>
                      <FormTitle
                        title={'탈퇴 이유'}
                        required={true}
                      />
                    </dt>
                    <dd>
                      <div className="select-form__section select-form-btn">
                        <Select
                          options={[
                            { id: '0', name: '선택' },
                            { id: '1', name: '개인정보 유출 우려' },
                            { id: '2', name: '잦은 메일 서비스' },
                            { id: '3', name: '사용하지 않음' },
                            { id: '4', name: '서비스 불만' },
                            { id: '4', name: '기타' },
                          ]}
                          failed={true}
                          msg={'탈퇴 이유를 선택해주세요.'}
                        />
                      </div>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">
                        <FormTitle title={'하고 싶은 말'} />
                      </p>
                    </dt>
                    <dd>
                      <div className="textarea__group">
                        <textarea
                          rows={6}
                          maxLength={5000}
                        />
                      </div>
                    </dd>
                  </dl>
                </li>
              </ul>
              <div className="flex-just-end mt-20">
                <Button
                  label={'탈퇴 신청'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  className="mr-10"
                />
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PasswordResetPopup
        isOpen={isOpen.PasswordReset}
        onClose={() => togglePopup('PasswordReset', false)}
      />

      <PasswordCheckPopup
        isOpen={isOpen.PasswordCheck}
        onClose={() => togglePopup('PasswordCheck', false)}
      />
    </>
  )
}

export default Sample
