/**
 * @file USER11.tsx
 * @description USER11 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
              <div className="member-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">비밀번호 재설정</h2>
                  </div>
                </div>
              </div>

              <div className="mb-contents-pb28__group">
                <h3 className="font-body__regular">
                  비밀번호 유효기간(6개월)이 지났습니다.
                  <br />
                  보안을 위해 새 비밀번호를 설정하세요.
                </h3>
              </div>

              <div className="w480">
                <ul>
                  <li>
                    <div className="ipt-text__area">
                      <FormTitle title="이메일" />
                      <p className="ipt-text-readonly">gildong*****@gmail*****</p>
                    </div>
                  </li>
                  <li>
                    {/* 눈 표시는 상황에 따라 표기 */}
                    <FormInputText
                      title="새 비밀번호"
                      required={true}
                      inputType="password"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title="비밀번호 확인"
                      inputType="password"
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
