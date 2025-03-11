/**
 * @file 404.tsx
 * @description 404 페이지
 */

import Image from 'next/image'
import Link from 'next/link'

import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import MediaBeeSymbol from '~/components/common/ui/MediaBeeSymbol'

const Custom500 = () => {
  return (
    <div className="mb-wrap layout3">
      {/* <header className="header__section">
        <div className="header-gnb__section">
          <div
            className="header-gnb__group"
            style={{ height: '52px' }}
          >
            <Link href="/">
              <MediaBeeLogo />
            </Link>
          </div>
        </div>
      </header> */}
      <div className="mb-container responsive-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="error__section">
              <div className="error__group">
                <div className="log-type1-header__section">
                  <div className="log-type1-header__symbol">
                    <MediaBeeSymbol />
                  </div>
                  <div className="log-type1-header__logo">
                    <MediaBeeLogo />
                  </div>
                </div>
                <p className="error__desc2">
                  서버 장애로 서비스 이용이 일시적으로 중단되었습니다.
                  <br />
                  빠른 시간 내 해결할 수 있도록 최선을 다하겠습니다.
                  <br />
                  고객님의 양해를 부탁드립니다.
                </p>
                {/* <p className="error__desc2">
                  유지 보수를 위해 일시적으로 서비스를 중단했습니다.
                  <br />
                  고객님의 양해를 부탁드립니다.
                  <br />
                  <br />
                  점검 시간: 2025년 5월6일 00시00분 ~ 00시00분
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom500
Custom500.Layout = 'SSR'
