import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const Notice = () => {
  const { userInfo, journalCheckDuplicateParam, journalIdKeyParam, setNoticeClose, setDuplicationJournalPopupAction } =
    usePressProfile()

  return (
    <>
      {journalCheckDuplicateParam && (
        <div className="notification-header__section colors-alert-border button-type1">
          <div className="notification-header__group">
            <div className="notification-header__contents">
              <p style={{ color: '#000' }}>이름과 이메일이 동일한 시스템 제공 언론인이 있습니다. </p>
              <p>
                <a
                  href={`/contacts/record/${journalCheckDuplicateParam.journalistId}`}
                  className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                >
                  <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                    {journalCheckDuplicateParam?.name || ''}
                  </span>
                </a>{' '}
                <span className="color-secondary">{`${journalCheckDuplicateParam.mediaName} ${journalCheckDuplicateParam.department} ${journalCheckDuplicateParam.position}`}</span>
              </p>
              {journalIdKeyParam &&
                journalIdKeyParam.owner &&
                journalIdKeyParam.owner.uid &&
                userInfo.userId &&
                journalIdKeyParam.owner.uid.toString() === userInfo.userId.toString() && (
                  <div className="flex-wrap">
                    <p style={{ color: '#000' }}>아래 인물을 삭제하겠습니까?</p>
                    <Button
                      label={'삭제하기'}
                      cate={'default'}
                      size={'s'}
                      color={'dark'}
                      onClick={() =>
                        setDuplicationJournalPopupAction({
                          isOpen: true,
                          key: journalIdKeyParam?.jrnlst_id || 0,
                          targetName: journalIdKeyParam?.name || '',
                        })
                      }
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="notification-header__btn">
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s24'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton}
              icoSize={16}
              onClick={() => journalIdKeyParam?.jrnlst_id && setNoticeClose(journalIdKeyParam?.jrnlst_id)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Notice
