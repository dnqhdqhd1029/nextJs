/**
 * @file USER20.tsx
 * @description USER20 페이지
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
            <div className="member__section">
              <div className="member-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">회원 가입</h2>
                  </div>
                </div>
              </div>

              <div className="mb-contents-pb28__group">
                <h3 className="font-body__regular">
                  서비스를 이용하려면 정보를 입력하고 이메일 인증을 해야 합니다.
                  <br />
                  구매자가 아닌 다른 이메일로도 회원 가입할 수 있습니다. 다만, 서비스 내에서 사용권 구매 내역은 확인할
                  수 없습니다.
                </h3>
              </div>

              <div className="w480">
                <ul>
                  <li>
                    <FormInputText
                      title="이메일"
                      required={true}
                    />
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
