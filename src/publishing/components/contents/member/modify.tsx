/**
 * @file modify.tsx
 * @description 회원정보 수정 페이지
 */

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import EmailResetPopup from '~/publishing/components/contents/member/popup/EmailResetPopup'

const Sample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

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
                      <h2 className="common-title__title">회원 정보 수정</h2>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <h4 className="font-body__regular--medium mb-10">이메일(ID) 수정</h4>
                  <dl className="dl-table-type1__section mb-40">
                    <dt>
                      <FormTitle title={'이메일(ID'} />
                    </dt>
                    <dd>
                      <div className="flex-just-start ">
                        <p className="dl-table-type1__text mr-10">hgd123@gmail.com</p>
                        <Button
                          label={'에디터'}
                          cate={'ico-only'}
                          size={'es'}
                          color={'gray-500'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.pencilFill2}
                          icoSize={12}
                          onClick={() => setIsOpen(true)}
                        />
                      </div>
                    </dd>
                  </dl>
                  <h4 className="font-body__regular--medium mb-10">수신 동의</h4>
                  <dl className="dl-table-type1__section mb-20">
                    <dt>
                      <FormTitle title={'뉴스레터 수신동의'} />
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        <FormBasicRadio
                          label="수신"
                          value="ok"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <FormBasicRadio
                          label="수신 안함"
                          value="no"
                        />
                      </p>
                    </dd>
                  </dl>
                </div>

                <div className="flex-just-start mt-30">
                  <Button
                    label={'저장'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    className="mr-10"
                    onClick={() => router.push('/publishing/member/modify')}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-primary'}
                    className="mr-10"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
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
      <EmailResetPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} // 모달 닫기 함수 전달
      />
    </>
  )
}

export default Sample
