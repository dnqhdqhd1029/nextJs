/**
 * @file PJ02.tsx
 * @description PJ02 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">프로젝트</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt28">
              <li>
                <p className="font-body__regular ta-c">
                  프로젝트를 만들 준비가 되었나요? <br />
                  프로젝트 별로 언론인, 미디어, 뉴스, 활동 등 데이터를 손쉽게 관리하고 지능적으로 분석할 수 있습니다.{' '}
                  <br />첫 번째 프로젝트를 만들어보세요.
                </p>
              </li>
              <li>
                <div className="buttons__group">
                  <Button
                    elem="a"
                    url="#!"
                    label={'새 프로젝트 만들기'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
