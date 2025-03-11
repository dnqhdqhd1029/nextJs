import { Fragment } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const Notice = () => {
  const { userInfo, mediaCheckDuplicateParam, mediaIdKeyParam, setNoticeClose, setDuplicationMediaPopupAction } =
    useMediaProfile()

  return (
    <>
      {mediaCheckDuplicateParam && (
        <div className="notification-header__section colors-alert-border button-type1">
          <div className="notification-header__group">
            <div className="notification-header__contents">
              <p style={{ color: '#000' }}>매체명이 동일한 시스템 제공 미디어가 있습니다. </p>
              <p>
                <a
                  href={`/media/record/${mediaCheckDuplicateParam.mediaId}`}
                  className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                >
                  <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                    {mediaCheckDuplicateParam?.name || ''}
                  </span>
                </a>{' '}
                <span className="color-secondary">{`${mediaCheckDuplicateParam.name} ${mediaCheckDuplicateParam.subcategory}`}</span>
              </p>
              {mediaIdKeyParam &&
                mediaIdKeyParam.owner &&
                mediaIdKeyParam.owner.uid &&
                userInfo.userId &&
                mediaIdKeyParam.owner.uid.toString() === userInfo.userId.toString() && (
                  <div className="flex-wrap">
                    <p style={{ color: '#000' }}>아래 미디어를 삭제하겠습니까?</p>
                    <Button
                      label={'삭제하기'}
                      cate={'default'}
                      size={'s'}
                      color={'dark'}
                      onClick={() =>
                        setDuplicationMediaPopupAction({
                          isOpen: true,
                          key: mediaIdKeyParam?.mid || 0,
                          targetName: mediaIdKeyParam?.name || '',
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
              onClick={() => mediaIdKeyParam?.mid && setNoticeClose(mediaIdKeyParam?.mid)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Notice
