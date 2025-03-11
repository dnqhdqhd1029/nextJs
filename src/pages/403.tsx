/**
 * @file 403.tsx
 * @description 403 페이지
 */

import Image from 'next/image'
import Link from 'next/link'

// import { useRouter } from 'next/router'
import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'

const Custom403 = () => {
  //   const router = useRouter()
  return (
    <div className="mb-wrap layout3">
      <header className="header__section">
        <div className="header-gnb__section">
          <div
            className="header-gnb__group"
            style={{ height: '52px' }}
          >
            <Link href="/dashboard">
              <MediaBeeLogo />
            </Link>
          </div>
        </div>
      </header>
      <div className="mb-container responsive-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="error__section">
              <div className="error__group">
                {/* <h2 className="error__title">404</h2> */}
                <p className="error__desc">접근 권한이 없습니다.</p>
                <div className="error__image">
                  <div className="error__image-number">403</div>
                </div>
                <Button
                  elem="a"
                  label={'홈으로 가기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                  url={'/dashboard'}
                  //   onClick={() => router.push('/dashboard')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom403
Custom403.Layout = 'SSR'
