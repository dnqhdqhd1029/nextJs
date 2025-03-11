/**
 * @file PG02.tsx
 * @description PG02 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
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
                  <h2 className="common-title__title">결제하기</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">구매 정보</p>
                </div>
                <ul className="grid-col2">
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="상품" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">비즈니스, 이메일 추가 50,000개</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="결제금액" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">7,370,000원</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="결제방법" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">통장입금</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="주문번호" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">20230705178</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">요청사항</p>
                </div>
                <div className="mb-contents-pb16__group">
                  <div className="ipt-text__area">
                    <p className="ipt-text-readonly">
                      <span className="fw400">-</span>
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">신청인</p>
                </div>
                <ul className="grid-col2">
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="회사 이메일" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">gildong.hong@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="회사" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">ABC전자</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="이름" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">홍길동</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="전화" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">02-1234-5678</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="휴대전화" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">-</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="부서" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">커뮤니케이션팀</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="직책" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">-</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'취소하기'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
                <Button
                  label={'카드결제'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT5'
