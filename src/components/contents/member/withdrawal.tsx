/**
 * @file withdrawal.tsx
 * @description 회원탈퇴 페이지
 */

import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { defaultWithdrawalReasons } from '~/components/contents/member/defaultData'
import PasswordCheckPopup from '~/components/contents/member/popup/PasswordCheckPopup'
import PasswordResetPopup from '~/components/contents/member/popup/PasswordResetPopup'
import { SelectListOptionItem } from '~/types/common'

const MemberWithdrawalPage = () => {
  const [withdrawalReasons, setWithdrawalReasons] = useState<SelectListOptionItem>({ id: '', name: '선택' })
  const [withdrawalReasonsErr, setWithdrawalReasonsErr] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [userMessageErr, setUserMessageErr] = useState('')
  const [isOpen, setIsOpen] = useState({
    PasswordReset: false,
    PasswordCheck: false,
  })
  const router = useRouter()

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  const handleSubmit = async () => {
    let isProcessing = true
    if (withdrawalReasons.id === '') {
      setWithdrawalReasonsErr('탈퇴 이유를 선택해 주세요.')
      isProcessing = false
    }
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/join/register-complete')
      // } else {
      //   setUserEmailErr(message?.message || '')
      //   // openToast(message?.message, 'error')
      // }
    }
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
                      <FormTitle title={'이메일(ID)'} />
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
                          options={defaultWithdrawalReasons}
                          onChange={(option: SelectListOptionItem) => {
                            setWithdrawalReasons(option)
                          }}
                          value={withdrawalReasons}
                          failed={withdrawalReasonsErr !== ''}
                          msg={withdrawalReasonsErr}
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
                  onClick={handleSubmit}
                />
                <Button
                  elem="a"
                  url="/member"
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

export default MemberWithdrawalPage
