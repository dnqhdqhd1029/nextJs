import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaNotice = () => {
  const { userInfo, mediaCheckDuplicateParam, mediaIdKeyParam, setMediaNoticeClose, setDuplicationMediaPopupAction } =
    useSavedSearch()

  return (
    <>
      {mediaCheckDuplicateParam && (
        <div className="aside-notification-alert__group">
          <div className="notification-alert__section">
            <div className="notification-alert__group">
              <h2 className="notification-alert__title">정보</h2>
              <div className="notification-alert__contents">
                <p>매체명이 동일한 시스템 제공 미디어가 있습니다. </p>
                <p>
                  <a
                    href={`/news/record/${mediaCheckDuplicateParam.mediaId}`}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                      {mediaCheckDuplicateParam?.name || ''}
                    </span>
                  </a>{' '}
                  <span className="color-secondary">
                    {`${mediaCheckDuplicateParam.name} ${mediaCheckDuplicateParam.subcategory}`}
                  </span>
                </p>
                {mediaIdKeyParam &&
                  mediaIdKeyParam.owner &&
                  mediaIdKeyParam.owner.uid &&
                  userInfo.userId &&
                  mediaIdKeyParam.owner.uid.toString() === userInfo.userId.toString() && (
                    <div className="flex-wrap">
                      <p>아래 미디어를 삭제하겠습니까?</p>
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
            <div className="notification-alert__btn">
              <Button
                label={'삭제'}
                cate={'ico-only'}
                size={'s24'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.iconCloseButton}
                icoSize={16}
                onClick={() => mediaIdKeyParam?.mid && setMediaNoticeClose(mediaIdKeyParam?.mid)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MediaNotice
