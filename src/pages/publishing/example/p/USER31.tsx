/**
 * @file USER31.tsx
 * @description USER31 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container bg-body responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section flex-just-cen">
              <div className="log-type2__section">
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">뉴스레터 수신 거부</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        <Button
                          elem="a"
                          url={'mailto:000@000..com'}
                          label={'000@000..com'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        으로 뉴스레터 수신을 원치 않으면 예를 선택해 주세요.
                      </p>
                    </li>
                  </ul>
                  <div className="log-type2__btn">
                    <Button
                      label={'예'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                    <Button
                      label={'아니오'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </div>
                </div>
                <div className="log-type2__group">
                  <ul className="log-type2__bullet">
                    <li>
                      <p className="log-type2__bullet-ico">
                        <IcoSvg data={icoSvgData.checkLg} />
                      </p>
                      <p className="font-body__regular">뉴스레터를 수신 거부했습니다.</p>
                    </li>
                  </ul>
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
