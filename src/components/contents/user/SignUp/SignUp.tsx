/**
 * @file SignUp.tsx
 * @description 회원 가입
 */

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'

const SignUp = () => {
  return (
    <>
      <div className="header-breadcrumb__section breadcrumb-title-type1 max-w960">
        <div className="header-breadcrumb__group">
          <h2 className="header-breadcrumb__title">회원 가입</h2>
        </div>
      </div>
      <div className="mb-container bg-white">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
              <ul className="interval-mt28">
                <li>
                  <h3 className="font-body__regular">
                    서비스를 이용하려면 정보를 입력하고 이메일 인증을 해야 합니다.
                    <br />
                    구매자가 아닌 다른 이메일로도 회원 가입할 수 있습니다. 다만, 서비스 내에서 사용권 구매 내역은 확인할
                    수 없습니다.
                  </h3>
                </li>
                <li>
                  <ul className="interval-mt14 w480">
                    <li>
                      <FormInputText
                        title="이메일"
                        required={true}
                      />
                      <FormInputText
                        title="이름"
                        required={true}
                      />
                      <FormInputText title="표시 이름" />
                      {/* 눈 표시는 상황에 따라 표기 */}
                      <FormInputText
                        title="비밀번호"
                        required={true}
                        inputType="password"
                      />
                      <FormInputText
                        title="비밀번호 확인"
                        inputType="password"
                      />
                      <FormInputText
                        title="전화"
                        inputType="number"
                      />
                      <FormInputText
                        title="휴대전화"
                        inputType="number"
                      />
                      <div className="ipt-btn__section">
                        <FormTitle
                          title={'뉴스레터'}
                          required={true}
                        />
                        <ul className="ipt-btn__list--row">
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-0"
                              id="rdo-0-0"
                              label="수신"
                            />
                          </li>
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-0"
                              id="rdo-0-1"
                              label="수신거부"
                              checked
                            />
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <Button
                    label={'가입하기'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
