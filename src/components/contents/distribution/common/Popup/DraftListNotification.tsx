import { MouseEvent } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

interface Props {
  draftList: {
    count: number
    isOpen: boolean
  }
  title: string
  initDraftListPopup: Function
}
const DraftListNotification = (props: Props) => {
  const router = useRouter()
  const { draftList, title, initDraftListPopup } = props

  return (
    <>
      {draftList.isOpen && (
        <div className="header-notification__group">
          <div className="notification-header__section colors-alert-border button-type1">
            <div className="notification-header__group">
              <div className="notification-header__contents">
                <p style={{ color: '#000' }}>{title}</p>{' '}
                <p>
                  <Button
                    elem="a"
                    label={'초안보기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => router.push('/draft')}
                  />
                </p>
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
                onClick={() => initDraftListPopup()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DraftListNotification
