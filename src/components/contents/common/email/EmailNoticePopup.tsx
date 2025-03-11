import styled from 'styled-components'

import Popup from '~/components/common/ui/Popup'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const LiElementByReplaceUseInfomation = styled.li`
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 15px;
  margin-left: 20px;
  unicode-bidi: isolate;
  list-style: disc;
`

const EmailNoticePopup = () => {
  const { isNoticePopup, popupNoticeAction } = useEmail()

  return (
    <>
      <Popup
        isOpen={isNoticePopup}
        onClose={() => popupNoticeAction(false)}
        hasCloseButton
        width={800}
        title={'치환태그 사용법'}
        showFooter={false}
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            치환태그는 메일을 발송할 때 메일 제목 또는 내용에 수신 언론인의 특정 정보를 DB에서 불러와 삽입해 발송할 수
            있는 기능입니다.
          </p>
          <p className="font-body__regular">
            사용 가능한 치환 태그는 {'{'}이름{'}'} {'{'}소속{'}'} {'{'}직책{'}'} 3가지 입니다.
          </p>
          <br />
          <p className="font-body__regular">
            <strong>주의</strong>
          </p>
          <p className="font-body__regular">치환 태그는 받는 사람이 DB에 수록된 언론인이어야 작동합니다.</p>
          <p className="font-body__regular">
            <ul>
              <LiElementByReplaceUseInfomation>
                {`받는 사람에 개인 추가 언론인을 입력한 경우에는 {이름} {소속}만 적용되고 직책은 비우고 발송됩니다.`}
              </LiElementByReplaceUseInfomation>
              <LiElementByReplaceUseInfomation>
                {`받는 사람에 이메일만 입력한 경우에는 {이름}을 이메일로 치환하고 소속, 직책은 비우고 발송됩니다.`}
              </LiElementByReplaceUseInfomation>
              <LiElementByReplaceUseInfomation>
                {`받는 사람이 미디어비 DB에 없거나 미디어인 경우에는 치환태그가 적용되지 않으니, 주의해서 사용해야 합니다.`}
              </LiElementByReplaceUseInfomation>
            </ul>
          </p>
        </div>
      </Popup>
    </>
  )
}

export default EmailNoticePopup
