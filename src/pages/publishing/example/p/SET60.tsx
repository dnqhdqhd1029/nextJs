/**
 * @file USER10.tsx
 * @description USER10 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div style={{ padding: '20px' }}>
        <div className="log-type1__section">
          <div className="log-type1-header__section">
            <h2 className="log-type1-header__title body-text">보안 인증이 필요합니다</h2>
          </div>
          <div className="log-type1-contents__section">
            <ul className="interval-mt16">
              <li>
                <p className="font-body__regular">보안을 위해 메일로 보낸 인증 코드를 5분 내에 입력하세요.</p>
              </li>
              <li>
                <div className="log-type1-code__group">
                  <div className="log-type1-code__input">
                    <FormInputText title="인증코드" />

                    {/* 시간 종료 시, 화면 미노출 */}
                    <div className="log-type1-code__time">
                      <p className="log-type1-code__time-text">03:23</p>
                    </div>
                  </div>

                  <div className="log-type1-code__button">
                    <Button
                      label={'코드 재발급'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
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
