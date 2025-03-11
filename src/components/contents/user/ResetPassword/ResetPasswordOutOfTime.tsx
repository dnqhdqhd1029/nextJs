/**
 * @file ResetPasswordOutOfTime.tsx
 * @description 기간이 지나 비밀번호를 재설정
 */

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'

const ResetPasswordOutOfTime = () => {
  return (
    <>
      <div className="header-breadcrumb__section breadcrumb-title-type1 max-w960">
        <div className="header-breadcrumb__group">
          <h2 className="header-breadcrumb__title">비밀번호 재설정</h2>
        </div>
      </div>
      <div className="mb-container">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
              <ul className="interval-mt28">
                <li>
                  <h3 className="font-body__regular">
                    비밀번호 유효기간(6개월)이 지났습니다.
                    <br />
                    보안을 위해 새 비밀번호를 설정하세요.
                  </h3>
                </li>
                <li>
                  <ul className="interval-mt14 w480">
                    <li>
                      <div className="ipt-text__area">
                        <FormTitle title="이메일" />
                        <p className="ipt-text-readonly">gildong*****@gmail*****</p>
                      </div>
                      {/* 눈 표시는 상황에 따라 표기 */}
                      <FormInputText
                        title="새 비밀번호"
                        required={true}
                        inputType="password"
                      />
                      <FormInputText
                        title="비밀번호 확인"
                        inputType="password"
                      />
                    </li>
                    <li>
                      <Button
                        label={'확인'}
                        cate={'default'}
                        size={'m'}
                        color={'primary'}
                      />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordOutOfTime
