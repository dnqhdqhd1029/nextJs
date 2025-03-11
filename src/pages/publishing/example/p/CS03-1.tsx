/**
 * @file CS03-1.tsx
 * @description CS03-1 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 customer-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-center__contents max-w960">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">내 문의</h2>
                  </div>
                </div>

                <div className="customer-center__group">
                  <div className="customer-center-contents__log">
                    <p className="font-body__regular">로그인이 필요합니다.</p>
                    <p className="font-body__regular">
                      <Button
                        elem="a"
                        url="#!"
                        label={'로그인'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </p>
                  </div>
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
Sample.PublishingLayout = 'LAYOUT6'
