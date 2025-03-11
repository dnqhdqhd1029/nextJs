/**
 * @file ER404.tsx
 * @description ER404 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp_error.png'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="error__section">
              <div className="error__group">
                <h2 className="error__title">404</h2>
                <p className="error__desc">요청한 페이지를 찾을 수 없습니다.</p>
                <div className="error__image">
                  <Image
                    src={tempImg}
                    width={153}
                    height={124}
                    alt="sample"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
