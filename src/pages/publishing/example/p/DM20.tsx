/**
 * @file DM20.tsx
 * @description DM20 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import MediaBeeLogo from '~/publishing/components/common/ui/MediaBeeLogo'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div style={{ padding: '20px' }}>
        <div className="log-type1__section">
          <div className="log-type1-header__section">
            <div className="log-type1-header__logo">
              <MediaBeeLogo />
            </div>
            <h2 className="log-type1-header__title">데모 체험 로그인</h2>
          </div>
          <div className="log-type1-contents__section">
            <ul className="interval-mt16">
              <li>
                <p className="font-body__regular">
                  미디어비 데모 체험을 하려면 비밀번호를 설정하세요.
                  <br />
                  데모는 로그인 후 1시간 동안 사용 가능합니다.
                </p>
              </li>
              <li>
                <ul>
                  <li>
                    <FormInputText
                      title="이메일"
                      placeholder="이메일 입력"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="비밀번호"
                      placeholder="비밀번호"
                      inputType="password"
                      msg="비밀번호는 8~16자이고 영문 대문자, 소문자, 숫자, 특수문자 4종 중 3종 이상을 포함해야 합니다."
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="비밀번호 확인"
                      placeholder="비밀번호 확인"
                      inputType="password"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="log-type1-footer__section">
            <Button
              label={'로그인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
