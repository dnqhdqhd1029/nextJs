/**
 * @file USER13.tsx
 * @description USER13 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
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
                      <h2 className="font-heading--h5">자동 로그아웃</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        세션 유효 시간이 초과해 회원 정보 보호를 위해 자동으로 로그아웃 했습니다.
                      </p>
                    </li>
                  </ul>
                  <div className="log-type2__btn">
                    <Button
                      label={'로그인'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
                </div>
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">데모 체험 종료</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        데모 체험 시간이 경과해 자동으로 서비스에서 로그아웃 했습니다.
                        <br />
                        체험이 더 필요하다면 다시 한번 데모 체험을 신청하세요.
                      </p>
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
