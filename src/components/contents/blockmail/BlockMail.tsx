import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import tempImg from '/public/assets/png/temp_error.png'
import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Loader from '~/components/common/ui/Loader'
import { useBlockmail } from '~/utils/hooks/contents/blockmail/useBlockmail'

const BlockMail = () => {
  const router = useRouter()
  const { blockLoading, isErrPage, blockUser, isCompletePage, blockAction } = useBlockmail()

  if (blockLoading)
    return (
      <div>
        <Loader
          screen={'absolute'}
          size={'s48'}
        />
      </div>
    )

  if (isErrPage || blockUser === null)
    return (
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
                    alt="404에러"
                  />
                </div>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <Link href="/dashboard">&gt; 홈으로 가기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  if (isCompletePage)
    return (
      <div className="mb-container bg-body responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section flex-just-cen">
              <div className="log-type2__section">
                <div className="log-type2__group">
                  <ul className="log-type2__bullet">
                    <li>
                      <p className="log-type2__bullet-ico">
                        <IcoSvg data={icoSvgData.checkLg} />
                      </p>
                      <p className="font-body__regular">이메일 수신 거부했습니다.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="mb-container bg-body responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="member__section flex-just-cen">
            <div className="log-type2__section">
              <div className="log-type2__group">
                <ul className="interval-mt14">
                  <li>
                    <h2 className="font-heading--h5">이메일 수신 거부</h2>
                  </li>
                  <li>
                    <p className="font-body__regular">
                      이메일을 수신거부 하시겠습니까?
                      <br />
                      수신을 원치 않으면 예를 선택해 주세요
                    </p>
                  </li>
                </ul>
                <div className="log-type2__btn">
                  <Button
                    label={'예'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    onClick={() => blockAction(blockUser)}
                  />
                  <Button
                    label={'아니오'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    onClick={() => router.replace('/dashboard')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockMail
