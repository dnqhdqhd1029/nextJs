/**
 * @file USER01.tsx
 * @description USER01 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
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
                    <h2 className="common-title__title">회원 정보</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt28">
                <li>
                  <h3 className="font-body__regular">이 회원 정보는 미디어비 모든 곳에 적용됩니다.</h3>
                </li>
                <li>
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">이름</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">홍길동</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">표시 이름</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">홍부장</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">이메일</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        <Button
                          elem="a"
                          url={'mailto:jeongmin.seo@joongang.co.kr'}
                          label={'jeongmin.seo@joongang.co.kr'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                      </p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">비밀번호</p>
                    </dt>
                    <dd>
                      <div className="dl-table-type1__flex">
                        <Button
                          label={'비밀번호 수정'}
                          cate={'default'}
                          size={'s'}
                          color={'outline-secondary'}
                        />
                        <p className="dl-table-type1__text">마지막 수정 2022년 6월 16일</p>
                      </div>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">전화</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">-</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">휴대전화</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">010-1234-5678</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">뉴스레터 수신</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">수신함</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <Button
                    label={'수정하기'}
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
