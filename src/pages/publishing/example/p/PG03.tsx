/**
 * @file PG03.tsx
 * @description PG03 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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
                  <div className="common-title__ico type-check">
                    <IcoSvg data={icoSvgData.checkCircleFill} />
                  </div>
                  <h2 className="common-title__title">구매 신청 완료</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">입금 안내</p>
                </div>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">
                    구매 신청에 감사 드립니다.
                    <br />
                    입금을 하면 서비스를 이용할 수 있습니다.
                    <br />
                    입금되면 미디어비가 메일과 문자로 입금 확인 메시지를 보내 드립니다
                  </p>
                </div>

                <div className="mb-contents-pb16__group">
                  <div className="mb-contents-pb8__group">
                    <p className="font-body__regular">
                      <span className="pr16">계좌: 신한은행 140-006-781675</span>
                      예금주: 코리아뉴스와이어(주)
                    </p>
                  </div>
                  <div className="mb-contents-pb8__group">
                    <p className="font-body__regular">입금액: 7,370,000원(부가세 포함)</p>
                  </div>
                </div>

                <div className="mb-contents-pb16__group">
                  <div className="mb-contents-pb8__group">
                    <p className="font-body__regular">결제문의</p>
                  </div>
                  <div className="mb-contents-pb8__group">
                    <p className="font-body__regular">02-0000-0000</p>
                  </div>
                  <div className="mb-contents-pb8__group">
                    <Button
                      elem="a"
                      url={'https://www.naver.com/'}
                      label={'문의하기'}
                      cate={'link-text-arrow'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronRight}
                    />
                  </div>
                </div>
              </li>

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
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="결제상태" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">미입금</span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <div className="ipt-text__area">
                        <FormTitle title="신청일" />
                        <p className="ipt-text-readonly">
                          <span className="fw400">2023-07-10</span>
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
                  label={'구매 신청 취소'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
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
