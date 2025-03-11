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

const AddRegisterUser = () => {
  const {
    passwordConfirmRef,
    passwordRef,
    registerUser,
    timeZoneList,
    getCommonCodeLoading,
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
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const { getInputRef } = useValidate()
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
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">회원 정보 입력</h2>
              </div>
            </div>
          </div>

          <div className="member__section">
            <ul className="interval-mt28">
              <li>
                <h3 className="font-body__regular">서비스를 이용하려면 회원 정보를 입력해야 합니다.</h3>
              </li>
              <li>
                <ul className="w480">
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
                      preventAutoComplete
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
                      preventAutoComplete
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
                    <FormInputText
                      title={'전화'}
                      extraInputType={'normalPhone'}
                      onChangeExtra={e => setPhoneAction(e, registerUser)}
                      value={registerUser.phone}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'휴대전화'}
                      extraInputType={'phone'}
                      onChangeExtra={e => setTelePhoneAction(e, registerUser)}
                      value={registerUser.telePhone}
                    />
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
              </li>
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
              <li>
                <Button
                  label={'가입하기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  disabled={isLoading}
                  isLoading={isLoading}
                  onClick={() => checkV3Recaptcha()}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRegisterUser
