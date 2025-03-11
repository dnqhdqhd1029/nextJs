import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressNotice = () => {
  const { userInfo, pressCheckDuplicateParam, journalIdKeyParam, setPressNoticeClose, setDuplicationPressPopupAction } =
    useSavedSearch()

  return (
    <>
      {pressCheckDuplicateParam && (
        <div className="aside-notification-alert__group">
          <div className="notification-alert__section">
            <div className="notification-alert__group">
              <h2 className="notification-alert__title">정보</h2>
              <div className="notification-alert__contents">
                <p>이름과 이메일이 동일한 시스템 제공 언론인이 있습니다. </p>
                <p>
                  <a
                    href={`/news/record/${pressCheckDuplicateParam.journalistId}`}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                      {pressCheckDuplicateParam?.name || ''}
                    </span>
                  </a>{' '}
                  <span className="color-secondary">{`${pressCheckDuplicateParam.mediaName} ${pressCheckDuplicateParam.department} ${pressCheckDuplicateParam.position}`}</span>
                </p>
                {journalIdKeyParam &&
                  journalIdKeyParam.owner &&
                  journalIdKeyParam.owner.uid &&
                  userInfo.userId &&
                  journalIdKeyParam.owner.uid.toString() === userInfo.userId.toString() && (
                    <div className="flex-wrap">
                      <p>아래 인물을 삭제하겠습니까?</p>
                      <Button
                        label={'삭제하기'}
                        cate={'default'}
                        size={'s'}
                        color={'dark'}
                        onClick={() =>
                          setDuplicationPressPopupAction({
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
            <div className="notification-alert__btn">
              <Button
                label={'삭제'}
                cate={'ico-only'}
                size={'s24'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.iconCloseButton}
                icoSize={16}
                onClick={() => journalIdKeyParam?.jrnlst_id && setPressNoticeClose(journalIdKeyParam?.jrnlst_id)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PressNotice
