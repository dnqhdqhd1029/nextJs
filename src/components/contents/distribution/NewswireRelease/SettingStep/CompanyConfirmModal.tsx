import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Popup from '~/components/common/ui/Popup'
import { openToast } from '~/utils/common/toast'

interface Props {
  onClose: () => void
  onConfirm: () => void
}

const CompanyConfirmModal = ({ onClose, onConfirm }: Props) => {
  const [termsApproved, setTermsApproved] = useState(false)
  const [termsApproved2, setTermsApproved2] = useState(false)

  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButtonLoading={false}
        hasCloseButton
        width={700}
        title={'발표 책임에 대한 동의'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => {
                if (termsApproved && termsApproved2) {
                  onConfirm()
                } else {
                  openToast('이용 약관에 동의를 해주세요.', 'warning')
                }
              }}
            />
            <Button
              label={'거절'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={onClose}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            다른 회사의 보도자료를 발표하려면 아래 내용에 동의해야 합니다.
            <br />
            <br />
            <FormInputBtn
              type="checkbox"
              name="agree-pr-ck1"
              id="agree-pr-ck1"
              label="발표 회사의 승인을 받고 배포하는 보도자료이다."
              checked={termsApproved}
              onChange={e => {
                setTermsApproved(e.target.checked)
              }}
            />
            <FormInputBtn
              type="checkbox"
              name="agree-pr-ck2"
              id="agree-pr-ck2"
              label="보도자료 배포에 대한 책임은 전적으로 나에게 있다."
              checked={termsApproved2}
              onChange={e => {
                setTermsApproved2(e.target.checked)
              }}
            />
          </p>
        </div>
      </Popup>
    </>
  )
}

export default CompanyConfirmModal
