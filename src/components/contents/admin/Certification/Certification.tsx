import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import { useAdminCertification } from '~/utils/hooks/contents/admin/useAdminCertification'

const Certification = () => {
  const { isLoading, endTimeRef, certificationOtp, minute, second, setOtpNm, getOtpTime, otpAction } =
    useAdminCertification()
  return (
    <div className="log-type1__section position-blank-center">
      <div className="log-type1-header__section">
        <h2 className="log-type1-header__title">보안 인증이 필요합니다</h2>
      </div>
      <div className="log-type1-contents__section">
        <ul className="interval-mt16">
          <li>
            <p className="font-body__regular">보안을 위해 메일로 보낸 인증 코드를 5분 내에 입력하세요.</p>
          </li>
          <li>
            <div className="log-type1-code__group">
              <div className="log-type1-code__input">
                <FormInputText
                  title="인증코드"
                  maxLength={6}
                  onChange={e => setOtpNm(e.target.value, certificationOtp.otpNm)}
                  onKeyDown={e => e.key === 'Enter' && otpAction(certificationOtp.otpNm)}
                  failed={certificationOtp.otpErr !== ''}
                  msg={certificationOtp.otpErr}
                />
                {!isLoading && endTimeRef !== null && (
                  <div className={cn('log-type1-code__time', { 'is-failed': certificationOtp.otpErr !== '' })}>
                    <p className="log-type1-code__time-text">
                      {`0${minute}`}:{Number(second) < 10 ? `0${second}` : second}
                    </p>
                  </div>
                )}
              </div>

              <div className="log-type1-code__button">
                <Button
                  label={'코드 재발급'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                  isLoading={isLoading}
                  onClick={() => getOtpTime()}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="log-type1-footer__section">
        <Button
          label={'확인'}
          cate={'default'}
          size={'m'}
          color={'secondary'}
          onClick={() => otpAction(certificationOtp.otpNm)}
          disabled={certificationOtp.otpErr === '' && certificationOtp.otpNm !== '' ? isLoading : true}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
export default Certification
