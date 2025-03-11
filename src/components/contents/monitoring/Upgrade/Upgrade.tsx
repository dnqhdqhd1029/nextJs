/**
 * @file Upgrade.tsx
 * @description 모니터링 업그레이드
 */

import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'

const Upgrade = () => {
  const router = useRouter()
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">모니터링</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt28">
              <li>
                <p className="font-body__regular">
                  현재 사용 중인 상품은 모니터링 기능이 없어 업그레이드가 필요합니다. <br />
                  모니터링으로 5천개가 넘는 미디어의 뉴스를 실시간으로 검색하고 회사, 경쟁사, 브랜드, 업계 관련 뉴스를
                  알림 설정을 할 수 있습니다. <br />
                  뉴스를 언론인과 연동할 수 있고 뉴스 내용을 긍정, 부정, 중립 등 감성 분석을 할 수 있습니다. <br />
                  또한 뉴스 클립북과 보고서도 만들어 공유할 수 있습니다.
                </p>
              </li>
              <li>
                <div className="buttons__group type-left">
                  <Button
                    elem="a"
                    url="#!"
                    label={'업그레이드 신청'}
                    cate={'default'}
                    size={'m'}
                    color={'success'}
                    onClick={() => router.push('/payment/purchase-request')}
                  />
                </div>
              </li>
              <li>
                <div className="monitoring-sample__group">
                  <Image
                    src="/assets/png/temp_960x630.png"
                    width={960}
                    height={630}
                    alt="Picture of the author"
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

export default Upgrade
