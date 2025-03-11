/**
 * @file complete.tsx
 * @description 회원가입-가입신청 완료 페이지
 */

import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const ApplyCompletePage = () => {
  const router = useRouter()

  const { invitationLifeSpan } = useAppSelector(state => state.userRegisterSlice)

  return (
    <>
      <div className="mb-container bg-white">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="member-wrap ">
              <div className="service__section">
                <div className="service-header__section">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <div className="common-title__ico type-check">
                        <IcoSvg data={icoSvgData.checkCircleFill} />
                      </div>

                      <h2 className="common-title__title">가입 신청 완료</h2>
                    </div>
                  </div>
                </div>

                <ul className="interval-mt28">
                  <li>
                    <p className="font-body__regular">
                      입력한 이메일로 회원 가입 인증 메일이 발송되었습니다.
                      <br /> 메일 내 인증 링크를 클릭해야 회원 가입이 최종 완료됩니다. <br />
                      인증 링크는 {invitationLifeSpan}시간만 유효합니다.
                    </p>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="mb-contents-pb8__group">
                        <p className="font-body__regular">
                          미디어비 언론인 회원은 최신 보도자료 열람, 맞춤 뉴스레터 수신, AI 도구 등 다양한 기능을 이용할
                          수 있습니다.
                        </p>
                      </div>
                      <div className="mb-contents-pt14__group ">
                        <Button
                          elem="a"
                          // TODO: 언론인 솔루션 화면으로 이동
                          // url="/temp"
                          label={'자세히 알아보기'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-primary'}
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
      </div>
    </>
  )
}

export default ApplyCompletePage
