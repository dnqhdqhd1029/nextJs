/**
 * @file join1.tsx
 * @description 회원가입- 프로필등록 step 2 페이지
 */

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { PASSWORD_PATTERN_FOR_JMEMBER } from '~/constants/common'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const RegisterPage = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [userNameErr, setUserNameErr] = useState('')
  const [userMedia, setUserMedia] = useState('')
  const [userMediaErr, setUserMediaErr] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordErr, setUserPasswordErr] = useState('')

  const { initCustomerCenter } = useCustomerCenter()
  useLayoutEffect(() => {
    initCustomerCenter()
  }, [])

  const handleSubmit = async () => {
    let isProcessing = true
    if (userName.length < 1) {
      setUserNameErr('이름을 입력하세요.')
      isProcessing = false
    }
    if (userMedia.length < 1) {
      setUserMediaErr('매체명을 입력하세요.')
      isProcessing = false
    }
    if (!PASSWORD_PATTERN_FOR_JMEMBER.test(userPassword)) {
      setUserPasswordErr('비밀번호는 8~16자이고 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.')
      isProcessing = false
    }
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/join/register-complete')
      // } else {
      //   setUserEmailErr(message?.message || '')
      //   // openToast(message?.message, 'error')
      // }
    }
  }
  return (
    <>
      <div className="mb-container bg-white">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="member-wrap">
              <div className="member-wrap__inner">
                <h2 className="member-wrap__inner__title ">프로필 등록</h2>

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
                        title="이름"
                        required={true}
                        onChange={e => {
                          setUserName(e.target.value)
                          setUserNameErr('')
                        }}
                        failed={userNameErr !== ''}
                        msg={userNameErr}
                        value={userName}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="매체명"
                        required={true}
                        onChange={e => {
                          setUserMedia(e.target.value)
                          setUserMediaErr('')
                        }}
                        failed={userMediaErr !== ''}
                        msg={userMediaErr}
                        value={userMedia}
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="비밀번호 설정"
                        required={true}
                        inputType="password"
                        onChange={e => {
                          setUserPassword(e.target.value)
                          setUserPasswordErr('')
                        }}
                        failed={userPasswordErr !== ''}
                        msg={userPasswordErr}
                        value={userPassword}
                      />
                    </li>
                  </ul>

                  <div className="mb-contents-pt14__group">
                    <Button
                      label={'확인'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                      onClick={handleSubmit}
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

export default RegisterPage
