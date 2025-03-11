/**
 * @file index.tsx
 * @description  회원정보 페이지
 */

import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import PasswordCheckPopup from '~/publishing/components/contents/member/popup/PasswordCheckPopup'
import PasswordResetPopup from '~/publishing/components/contents/member/popup/PasswordResetPopup'

const Sample = () => {
  const [isOpen, setIsOpen] = useState({
    PasswordReset: false,
    PasswordCheck: false,
  })
  const router = useRouter()

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  return (
    <>
      <div className="mb-container bg-white">
        <div className="mb-common-inner">
          <div className="mb-contents max-w960 ">
            <div className="member-section">
              <div className="member__section">
                <div className="member-header__section">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <h2 className="common-title__title">회원 정보</h2>
                    </div>
                  </div>
                </div>

                <ul className="interval-mt28">
                  <li>
                    <dl className="dl-table-type1__section">
                      <dt>
                        <p className="dl-table-type1__text">이름</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">홍길동</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">소속 매체</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">중앙일보</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">부서</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">편집국 경제팀</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">직책</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">증권 전문기자</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">이메일</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">
                          <Button
                            elem="a"
                            url={'mailto:jeongmin.seo@joongang.co.kr'}
                            label={'jeongmin.seo@joongang.co.kr'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">뉴스레터 수신 </p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">수신</p>
                      </dd>
                    </dl>
                  </li>
                  <li>
                    <div className="flex-just-start">
                      <Button
                        label={'회원정보 수정'}
                        cate={'default'}
                        size={'m'}
                        color={'primary'}
                        className="mr-10"
                        onClick={() => router.push('/publishing/member/modify')}
                      />
                      <Button
                        label={'비밀번호 변경'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-primary'}
                        className="mr-5"
                        onClick={() => togglePopup('PasswordReset', true)}
                      />
                      &nbsp;&nbsp;
                      <Button
                        label={'회원탈퇴'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                        onClick={() => togglePopup('PasswordCheck', true)}
                      />
                    </div>
                  </li>
                </ul>
              </div>

              <aside className="aside-wrap">
                <div className="aside-wrap-card">
                  <dl className="ta-c">
                    <dt className="font-body__lead--semi--medium">프로필완성도</dt>
                    <dd className="percent mb-20">30%</dd>
                    <dd>
                      <Button
                        label={'소개 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />{' '}
                      <br />
                      <Button
                        label={'경력 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />
                      <br />
                      <Button
                        label={'학교 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />
                    </dd>
                  </dl>
                </div>

                <div className="aside-wrap-card">
                  <dl className="ta-c">
                    <dt className="font-body__semi--large-medium">새로운 출발을 알리세요</dt>
                    <dd>새로운 직책이나 일을 맡게 되셨나요? 인터뷰를 통해 업계에 당신을 널리 알리세요.</dd>
                    <dd className="flex-just-cen mt-20">
                      <Button
                        label={'인터뷰 작성하기'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </dd>
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <PasswordResetPopup
        isOpen={isOpen.PasswordReset}
        onClose={() => togglePopup('PasswordReset', false)}
      />

      <PasswordCheckPopup
        isOpen={isOpen.PasswordCheck}
        onClose={() => togglePopup('PasswordCheck', false)}
      />
    </>
  )
}

export default Sample
