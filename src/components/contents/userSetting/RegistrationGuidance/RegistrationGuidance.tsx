import { useLayoutEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import Skeleton from '~/components/common/ui/Skeleton'
import { newsLetterList } from '~/components/contents/userSetting/AddRegisterUser/defaultData'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useRegisterUser } from '~/utils/hooks/contents/register/useRegisterUser'

const ReisterGuidance = () => {
  const {
    passwordConfirmRef,
    passwordRef,
    registerUser,
    timeZoneList,
    getCommonCodeLoading,
    setNickNameAction,
    setNameAction,
    setNewsLetterAction,
    setTelePhoneAction,
    setPhoneAction,
    setTimeZoneAction,
    setPasswordConfirmAction,
    setPasswordAction,
    registerUserAction,
    initDataAction,
  } = useRegisterUser()
  const { getInputRef } = useValidate()

  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })
  const [isLoading, setIsLoading] = useState(false)
  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    setIsLoading(() => true)
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await registerUserAction(registerUser)
    setIsLoading(() => false)
  }

  const checkV3Recaptcha = async () => {
    setIsLoading(() => true)
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await registerUserAction(registerUser)
    setIsLoading(() => false)
  }

  useLayoutEffect(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0]
    if (badge && badge instanceof HTMLElement) {
      badge.style.visibility = 'visible'
    }
    initDataAction()
  }, [])

  return (
    <div className="mb-container responsive-type1">
      <div className="mb-common-inner max-w960">
        <div className="mb-contents">
          <div className="member__section">
            <div className="member-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">회원 가입</h2>
                </div>
              </div>
            </div>
            {registerUser.isDone ? (
              <div className="mb-contents-pb28__group">
                <h3 className="font-body__regular">
                  입력한 이메일로 회원 가입 인증 메일이 발송되었습니다
                  <br />
                  메일 내 인증 링크를 클릭해야 회원 가입이 최종 완료됩니다
                  <br />
                  인증링크는 72시간만 유효합니다
                </h3>
              </div>
            ) : (
              <div className="mb-contents-pb28__group">
                <h3 className="font-body__regular">미디어비에 오신 것을 환영합니다. 회원 정보를 입력하세요.</h3>
              </div>
            )}
            {!registerUser.isDone && (
              <div className="w480">
                <ul>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="회사" />
                      <p className="ipt-text-readonly">{registerUser.company}</p>
                    </div>
                  </li>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="이메일" />
                      <p className="ipt-text-readonly">{registerUser.email}</p>
                    </div>
                  </li>
                  <li>
                    <FormInputText
                      title={'이름'}
                      required={true}
                      onChange={e => setNameAction(e.target.value, registerUser)}
                      failed={registerUser.nameErr !== ''}
                      msg={registerUser.nameErr}
                      value={registerUser.name}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'비밀번호'}
                      id="user-passwd"
                      name="user-passwd"
                      inputType="password"
                      required={true}
                      getInputRef={ref => getInputRef(ref, passwordRef)}
                      onChange={e => setPasswordAction(e.target.value, registerUser)}
                      failed={registerUser.passwordErr !== ''}
                      msg={registerUser.passwordErr}
                      value={registerUser.password}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'비밀번호 확인'}
                      id="user-passwd-confirm"
                      name="user-passwd-confirm"
                      inputType="password"
                      required={true}
                      getInputRef={ref => getInputRef(ref, passwordConfirmRef)}
                      onChange={e => setPasswordConfirmAction(e.target.value, registerUser)}
                      failed={registerUser.passwordConfirmErr !== ''}
                      msg={registerUser.passwordConfirmErr}
                      value={registerUser.passwordConfirm}
                    />
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'표준시간대'}
                        required={true}
                      />
                      {getCommonCodeLoading ? (
                        <Skeleton
                          width={'480px'}
                          height={'35px'}
                        />
                      ) : (
                        <Select
                          options={timeZoneList}
                          value={registerUser.timeZone}
                          onChange={e => setTimeZoneAction(e, registerUser)}
                        />
                      )}
                    </div>
                  </li>
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title="뉴스레터"
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        {newsLetterList.map((e, i) => (
                          <li key={'registerUser_newsLetterList' + i.toString()}>
                            <FormBasicRadio
                              label={e.name}
                              name={'registerUser.newsLetterList' + e.id.toString()}
                              id={'registerUser.newsLetterList' + e.id.toString()}
                              checked={registerUser.isNewsLetter === e.id}
                              onChange={() => setNewsLetterAction(e.id, registerUser)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
                {isV3Failed && (
                  <li>
                    <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
                      <ReCAPTCHA
                        size="normal"
                        sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                        onChange={token => checkV2Recaptcha(token)}
                      />
                    </div>
                  </li>
                )}
                <div className="mb-contents-pt14__group">
                  <Button
                    label={'가입하기'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={() => checkV3Recaptcha()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReisterGuidance
