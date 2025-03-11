/**
 * @file SET50-6.tsx
 * @description SET50-6 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
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
                        <p className="ipt-text-readonly">
                          <span className="fw400">abc@gmail.com</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <FormInputText
                        title="이름"
                        required={true}
                      />
                    </li>
                    <li>
                      <FormInputText title="표시 이름" />
                    </li>
                    <li>
                      {' '}
                      {/* 눈 표시는 상황에 따라 표기 */}
                      <FormInputText
                        title="비밀번호"
                        required={true}
                        inputType="password"
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="비밀번호 확인"
                        required={true}
                        inputType="password"
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="전화"
                        inputType="number"
                      />
                    </li>
                    <li>
                      <FormInputText
                        title="휴대전화"
                        inputType="number"
                      />
                    </li>
                    <li>
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
                    label={'확인'}
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

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
