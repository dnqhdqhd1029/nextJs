/**
 * @file SET20.tsx
 * @description SET20 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner setting">
        <div className="mb-lnb__section type-w2">
          <LnbSetting />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__contents">
              <div className="setting__contents">
                <div className="setting__header">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <h2 className="common-title__title">사용권 정보</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'서비스 구매'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <ul className="interval-mt42">
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">사용권</p>
                        </dt>
                        <dd>
                          <Button
                            label={'L210926BS234'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">상품</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">비즈니스</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">사용기간</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            2021-09-26 ~ 2022-09-25
                            <span className="color-danger">유효기간이 30일 남았습니다. 사용권을 갱신하세요.</span>
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">회원 수</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">5명(3명 사용)</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">이메일 건수</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            메일은 연간 사용자수 X 5만개가 기본으로 제공되며 소진 시 추가 구매 가능합니다. <br />
                            2022년 09월25일까지 24,500건 발송 가능
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">뉴스와이어 배포</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">60개(24개 사용)</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">그룹</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">5개(3개 사용)</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">회사</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">ABC전자</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">구매자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            <Button
                              elem="a"
                              url="#!"
                              label={'홍길동'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                        </dd>
                      </dl>
                    </li>
                    <li>
                      <div className="setting-contents__sub">
                        <h4 className="setting-contents__sub-title">부가 서비스</h4>
                        <p className="setting-contents__sub-desc">
                          회원 수, 메일 건수, 뉴스와이어 배포 건수를 추가하려면 신청을 하세요.
                        </p>
                        <Button
                          label={'부가 서비스 구매'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                        />
                      </div>
                    </li>
                  </ul>
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
Sample.PublishingLayout = 'LAYOUT1'
