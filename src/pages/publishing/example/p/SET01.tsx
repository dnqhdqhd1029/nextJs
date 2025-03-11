/**
 * @file SET01.tsx
 * @description SET01 페이지
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
                      <h2 className="common-title__title">회원 회사 정보</h2>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">회사</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">삼성전자</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">권한</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">관리자</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">그룹</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">-</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">그룹</p>
                    </dt>
                    <dd>
                      <ul className="d-link__list">
                        <li>
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'반도체팀(현재)'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </li>
                      </ul>
                      <ul className="d-link__list">
                        <li>
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'마케팅팀'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </li>
                      </ul>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">랜딩 페이지</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">홈</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">회원 등록</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">2021-10-09 09:09</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">최종 로그인</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">2021-09-09 09:09</p>
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
