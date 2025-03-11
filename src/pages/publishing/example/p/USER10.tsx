/**
 * @file USER10.tsx
 * @description USER10 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
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
            <h2 className="log-type1-header__title">로그인</h2>
          </div>
          <div className="log-type1-contents__section">
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
                />
              </li>
              <li>
                <div className="log-type1-keep__section">
                  <FormInputBtn
                    type="checkbox"
                    name="ck"
                    id="ck"
                    label="로그인 상태 유지"
                  />
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'비밀번호 찾기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </div>
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
      <div style={{ padding: '20px' }}>
        <div className="log-type1__section">
          <div className="log-type1-header__section">
            <div className="log-type1-header__logo">
              <MediaBeeLogo />
            </div>
            <h2 className="log-type1-header__title">비밀번호 찾기</h2>
          </div>
          <div className="log-type1-contents__section">
            <ul className="interval-mt16">
              <li>
                <p className="font-body__regular">비밀번호를 재설정 하려면 이메일을 입력하세요.</p>
              </li>
              <li>
                <FormInputText
                  title="이메일"
                  placeholder="이메일 입력"
                />
              </li>
            </ul>
          </div>
          <div className="log-type1-footer__section type-find-pw">
            <Button
              label={'비밀번호 재설정'}
              cate={'default'}
              size={'m'}
              color={'primary'}
            />
            <div className="footer-find-pw__group">
              <Button
                elem="a"
                url={'#!'}
                label={'미디어비 로그인'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="log-type1__section">
          <div className="log-type1-header__section">
            <div className="log-type1-header__logo">
              <MediaBeeLogo />
            </div>
          </div>
          <div className="log-type1-contents__section">
            <div className="log-type1-contents__title">비밀번호 재설정 링크를 보냈습니다.</div>
            <div className="log-type1-contents__text">
              재설정 링크를 누르고 새 비밀번호를 설정할 수 있습니다.
              <br />
              이메일이 도착하지 않았으면, 스팸메일함을 열어보세요.
              <br />
              그래도 메일이 오지 않으면 미디어비 작업자에게 문의하세요.
            </div>
          </div>
          <div className="log-type1-footer__section">
            <Button
              label={'재설정 이메일 다시 받기'}
              cate={'default'}
              size={'m'}
              color={'outline-secondary'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
