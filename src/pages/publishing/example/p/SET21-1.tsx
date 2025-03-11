/**
 * @file SET21-2.tsx
 * @description SET21-2 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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
                      <div className="common-title__path">
                        <Button
                          label={'arrowLeft'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'body-text'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.arrowLeft}
                          icoSize={24}
                        />
                      </div>
                      <h2 className="common-title__title">내 구매</h2>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">상품</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">비즈니스 or 이메일 추가 50,000건 or 뉴스와이어 배포 30건</p>
                    </dd>
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
                      <p className="dl-table-type1__text">신청자</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">홍길동</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">결제자</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        김길동 (
                        <Button
                          elem="a"
                          url="mailto:adfagc@adfag.com"
                          label={'adfagc@adfag.com'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />{' '}
                        010-8888-8888)
                      </p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">결제방법</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">통장입금 (또는 카드결제)</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">결제상태</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">결제 완료 (또는 미결제)</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">결제금액</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">6,000,000 (또는 - )</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">견적금액</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">6,000,000</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">결제일</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">2022-09-15</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">증빙신청</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">영수세금계산서(또는 청구세금계산서, 현금영수증)</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">증빙발급</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">미발급(또는 영수발급, 청구발급, 영수증발급)</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">등록자</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">신동호</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">등록일</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">2022-09-15 </p>
                    </dd>
                  </dl>
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
