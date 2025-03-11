/**
 * @file profileComplete.tsx
 * @description 회원가입- 프로필 등록 완료 페이지
 */

import { useLayoutEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const RegisterCompletePage = () => {
  const { initCustomerCenter } = useCustomerCenter()
  const router = useRouter()
  useLayoutEffect(() => {
    initCustomerCenter()
  }, [])

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

                      <h2 className="common-title__title">프로필 등록 완료</h2>
                    </div>
                  </div>
                </div>

                <ul className="interval-mt28">
                  <li>
                    <h4 className="font-body__large--medium">{'OOO'} 님, 미디어비 가입에 진심으로 환영합니다.</h4>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="mb-contents-pb8__group">
                        <p className="font-body__regular">
                          지금 바로 상세 정보를 입력하고 온라인 프로필을 구축하여 원하는 분야뿐만 아니라 다양한 분야의
                          보도자료를 받아보세요. <br />
                          구축한 포트폴리오를 바탕으로 국내 최고의 홍보 마케팅팀과 소통할 수 있습니다.
                        </p>
                      </div>
                      <div className="mb-contents-pt14__group ">
                        <Button
                          elem="a"
                          url="/journalist"
                          label={'내 프로필 편집하기'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
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

export default RegisterCompletePage
