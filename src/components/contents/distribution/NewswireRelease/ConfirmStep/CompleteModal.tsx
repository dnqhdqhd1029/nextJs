import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface Props {
  onOpenPopup?: () => void
}

const ConfirmModal = ({ onOpenPopup }: Props) => {
  const router = useRouter()
  const { releasePopup, closeReleasePopup } = useNewswireRelease()
  return (
    <>
      <Popup
        isOpen={releasePopup}
        onClose={() => {
          closeReleasePopup()
          router.push('/activity/search')
        }}
        hasCloseButtonLoading={false}
        hasCloseButton
        width={700}
        title={'뉴스와이어 배포'}
        buttons={<></>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="mb-contents-pb16__group">
            <h2 className="distribute-steps-header__title">&#10004; 뉴스와이어 배포 제출 완료</h2>
            <br />
            <p className="font-body__regular">회원님이 등록한 보도자료가 정상적으로 접수되었습니다.</p>
            <p className="font-body__regular">
              뉴스와이어는 보도자료를 검토해 처리 결과를 이메일과 SMS로 알려드립니다.
            </p>
            <p className="font-body__regular">
              뉴스와이어에 제출한 보도자료는 제출한 회원만 수정 및 취소 요청할 수 있습니다.
            </p>
          </div>
          <div className="mb-contents-pb16__group">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => {
                closeReleasePopup()
                router.push('/activity/search')
              }}
            />
          </div>
          <div>
            <Button
              elem="a"
              label={'뉴스와이어 배포 절차'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={onOpenPopup}
            />
            <br />
            <Button
              elem="a"
              label={'뉴스와이어 편집 가이드라인'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={() => window.open('https://www.newswire.co.kr/?ed=8', '_blank')}
            />
          </div>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmModal
