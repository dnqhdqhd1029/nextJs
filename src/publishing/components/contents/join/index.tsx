/**
 * @file index.tsx
 * @description 회원가입- 프로필등록 step 1 페이지
 */

import { useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const Sample = () => {
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
            <div className="member-wrap bg-gray--150">
              <div className="member-wrap__inner">
                <h2 className="member-wrap__inner__title ">프로필 등록</h2>
                <h3 className="member-wrap__inner__txt">
                  미디어비는 미디어와 기업과의 연결을 제공합니다. <br />
                  프로필을 등록하고 언론인만을 위한 네트워크에 가입하세요.
                </h3>
                <ul className="txt">
                  <li>
                    <IcoSvg data={icoSvgData.checkThick} /> 업계 최신 동향 제공
                  </li>
                  <li>
                    <IcoSvg data={icoSvgData.checkThick} /> AI 도구로 기사 작성 및 수정
                  </li>
                  <li>
                    <IcoSvg data={icoSvgData.checkThick} /> 온라인 포트폴리오 구축
                  </li>
                  <li>
                    <IcoSvg data={icoSvgData.checkThick} /> 인증된 기업 홍보팀과의 소통 가능
                  </li>
                  <li>
                    <IcoSvg data={icoSvgData.checkThick} /> 인증된 기업 홍보팀과의 소통 가능
                  </li>
                  <li>
                    <Button
                      elem="a"
                      url={'https://www.naver.com/'}
                      label={'자세히 알아보기 '}
                      cate={'link-text-arrow'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronRight}
                    />
                  </li>
                </ul>

                <div className="form-group mt-20">
                  <ul>
                    <li>
                      <FormInputText
                        title="이메일"
                        required={true}
                      />
                    </li>
                    <li>
                      <FormInputBtn
                        type="checkbox"
                        name="agree-all"
                        id="agree-all"
                        label="아래의 내용에 모두 동의합니다."
                        // checked={allTermsApproved}
                        // onChange={e => {
                        //   setAllTermsApprovedAction(e.target.checked, settingPageData)
                        // }}
                      />
                      <ul className="mt-15">
                        <li>
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'이용 약관 '}
                            cate={'link-text'}
                            size={'m'}
                            color={'primary'}
                          />
                        </li>
                        <li>
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'개인정보 수집 및 이용'}
                            cate={'link-text'}
                            size={'m'}
                            color={'primary'}
                          />
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <div className="mb-contents-pt14__group flex-just-cen">
                    <Button
                      label={'가입신청'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-just-cen mt-20">
              계정이 있으신가요?
              <Link href={'/publishing/login'}>
                <a
                  style={{
                    color: '#0094a8',
                    marginLeft: '5px',
                    marginBottom: '15px',
                    display: 'inline-block',
                  }}
                >
                  로그인 화면으로 이동
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
