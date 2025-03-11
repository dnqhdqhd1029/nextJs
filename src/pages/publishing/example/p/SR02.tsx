/**
 * @file SR02.tsx
 * @description SR02 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="service__section">
              <div className="service-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <div className="common-title__ico type-check">
                      <IcoSvg data={icoSvgData.checkCircleFill} />
                    </div>

                    <h2 className="common-title__title">상담 신청 완료</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt28">
                <li>
                  <h4 className="font-body__semi--large">
                    구매 상담해 주셔서 감사합니다.
                    <br />곧 연락 드리겠습니다.
                  </h4>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <div className="mb-contents-pb8__group">
                      <p className="font-body__regular">답변을 기다리는 동안 도움말을 둘러보는 것도 좋은 방법입니다.</p>
                    </div>
                    <div className="mb-contents-pb8__group">
                      <Button
                        elem="a"
                        url="#!"
                        label={'도움말 바로가기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </div>

                  <div className="mb-contents-pb16__group">
                    <div className="mb-contents-pb8__group">
                      <p className="font-body__regular">미디어비 고객센터</p>
                    </div>
                    <div className="mb-contents-pb8__group">
                      <p className="font-body__regular">02-0000-0000</p>
                    </div>
                    <div className="mb-contents-pb8__group">
                      <Button
                        elem="a"
                        url={'https://www.naver.com/'}
                        label={'문의하기'}
                        cate={'link-text-arrow'}
                        size={'m'}
                        color={'body-text'}
                        icoRight={true}
                        icoRightData={icoSvgData.chevronRight}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
