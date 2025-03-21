/**
 * @file notification.tsx
 * @description 페이지, 컨텐츠 알림 기능
 */

import Link from 'next/link'

import Button from '~/components/common/ui/Button'
import { useNotification } from '~/utils/hooks/common/useNotification'

const GlobalNode = () => {
  return (
    <div className="notification-header__section colors-blue-700 button-type1">
      <div className="notification-header__group">
        <div className="notification-header__contents ta-l">
          <p>
            미디어비가 알파 서비스를 시작했습니다.
            <br />
            사용 중 불편하거나 개선할 점이 있으면{' '}
            <Link
              href="#!"
              legacyBehavior
            >
              <a target="_self">고객센터</a>
            </Link>
            에 알려주세요. 내용을 검토 후 처리 결과를 알려드리겠습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

const NotiNode = () => {
  return (
    <>
      <div className="notification-header__section colors-alert-border button-type1">
        <div className="notification-header__group">
          <div className="notification-header__contents">
            <p>이름과 이메일이 동일한 시스템 제공 언론인이 있습니다. </p>

            <p>
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'장지승'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />{' '}
              <span className="color-secondary">서울경제신문 편집국 기자</span>
            </p>

            <p>아래 인물을 삭제하겠습니까?</p>
            <Button
              label={'삭제하기'}
              cate={'default'}
              size={'s'}
              color={'dark'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const NotificationPage = () => {
  const { setContentNotification, setGlobalNotification } = useNotification()

  const handleContentNotify = () => {
    setContentNotification({
      id: 'test1',
      isOpen: true,
      node: <NotiNode />,
    })
  }

  const handleGlobalNotify = () => {
    setGlobalNotification({
      id: 'test2',
      isOpen: true,
      noCloseButton: false,
      node: <GlobalNode />,
    })
  }

  return (
    <>
      <div style={{ margin: '200px 30px 30px' }}>
        <button
          type="button"
          onClick={handleGlobalNotify}
          style={{ border: '1px solid #333', padding: '10px' }}
        >
          글로벌 알림
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={handleContentNotify}
          style={{ border: '1px solid #333', padding: '10px' }}
        >
          컨텐츠 알림
        </button>
      </div>
    </>
  )
}

export default NotificationPage
NotificationPage.Layout = 'SSR'
