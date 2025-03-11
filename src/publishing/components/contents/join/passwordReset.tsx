/**
 * @file passwordReset.tsx
 * @description 회원가입- 비밀번호 재설정 페이지
 */

import { useLayoutEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
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
            <div className="member-wrap">
              <div className="member-wrap__inner">
                <h2 className="member-wrap__inner__title ">비밀번호 재설정</h2>

                <div className="form-group mt-20">
                  <ul>
                    <li>
                      <div className="ipt-text__area">
                        <FormTitle title="이메일" />
                        <p className="ipt-text-readonly">gildong*****@gmail*****</p>
                      </div>
                    </li>

                    <li>
                      <FormInputText
                        title="새 비밀번호"
                        required={true}
                        inputType="password"
                        failed={true}
                        msg={
                          '비밀번호는 8~16자이고 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다. 직전에 사용한 비밀번호를 사용할 수 없습니다. 다시 입력해 주세요\n'
                        }
                      />
                    </li>
                  </ul>

                  <div className="mb-contents-pt14__group">
                    <Button
                      label={'확인'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
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
