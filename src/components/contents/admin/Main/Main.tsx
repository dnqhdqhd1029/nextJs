import { Fragment } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import 'moment/locale/ko'

import Button from '~/components/common/ui/Button'
import { DefaultSettingLinks } from '~/components/contents/admin/defaultData'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useMyLicense } from '~/utils/hooks/contents/setting/useMyLicense'

const AdminMain = () => {
  const router = useRouter()
  const { licenseInfo, userInfo, isDemoLicense, openDetailPopupAction, openUserProfilePopupAction, openLicensePopup } =
    useMyLicense()
  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'관리자'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">관리 요약</h2>
                        <div className="common-title__buttons">
                          <Button
                            label={'서비스 구매'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            onClick={() =>
                              isDemoLicense
                                ? openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
                                : router.push('/payment/purchase-request')
                            }
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
                            <p className="dl-table-type1__text">
                              <Button
                                elem="a"
                                url="#!"
                                label={licenseInfo?.license ?? ''}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                onClick={() =>
                                  licenseInfo?.licenseId && openLicensePopup(Number(licenseInfo?.licenseId))
                                }
                              />
                            </p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">상품</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{licenseInfo?.mainProductName || '-'}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">사용기간</p>
                          </dt>
                          <dd>
                            {licenseInfo && (
                              <p className="dl-table-type1__text">
                                {licenseInfo?.startAt ? moment(licenseInfo.startAt).format('YYYY-MM-DD') : '-'} ~{' '}
                                {licenseInfo?.expireAt ? moment(licenseInfo.expireAt).format('YYYY-MM-DD') : '-'}
                                {moment().isAfter(moment(licenseInfo.expireAt)) ? (
                                  <span className="color-danger">유효기간이 만료되었습니다, 사용권을 갱신하세요.</span>
                                ) : (
                                  moment().isAfter(moment(licenseInfo.expireAt).add(-1, 'months')) && (
                                    <span className="color-danger">
                                      유효기간이{' '}
                                      {moment(licenseInfo?.expireAt).diff(moment(licenseInfo?.expireAt), 'days')} 일
                                      남았습니다. 사용권을 갱신하세요.
                                    </span>
                                  )
                                )}
                              </p>
                            )}
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">이메일 건수</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {licenseInfo?.emailLimit !== undefined && licenseInfo?.emailLimit > 0 && (
                                <>
                                  {getCurrencyFormat(licenseInfo?.emailLimit)}
                                  {/*{licenseInfo?.emailLimitDetail && licenseInfo?.emailLimitDetail.length > 1 && (*/}
                                  {/*  <Fragment>*/}
                                  {/*    (*/}
                                  {/*    <Fragment>*/}
                                  {/*      {licenseInfo?.emailLimitDetail.map((item, index) => {*/}
                                  {/*        return index > 0 ? (*/}
                                  {/*          <Fragment key={'storeUserLicenseInfo?.emailLimitDetail' + index.toString()}>*/}
                                  {/*            +{getCurrencyFormat(item)}*/}
                                  {/*          </Fragment>*/}
                                  {/*        ) : (*/}
                                  {/*          <Fragment key={'storeUserLicenseInfo?.emailLimitDetail' + index.toString()}>*/}
                                  {/*            {getCurrencyFormat(item)}*/}
                                  {/*          </Fragment>*/}
                                  {/*        )*/}
                                  {/*      })}*/}
                                  {/*    </Fragment>*/}
                                  {/*    )*/}
                                  {/*  </Fragment>*/}
                                  {/*)}*/}
                                  개(
                                  {getCurrencyFormat(Number(licenseInfo?.emailLimit) - Number(licenseInfo?.emailLeft))}
                                  개 사용)
                                  <br />
                                </>
                              )}
                              {/*{licenseInfo?.expireAt && moment(licenseInfo?.expireAt).format('YYYY년 M월 DD일')}*/}
                              {/*까지 {getCurrencyFormat(licenseInfo?.emailLeft)}건 발송 가능 메일은 연간 사용자수 X<br />*/}
                              메일은 사용자수 X 5만개가 기본 제공되며 추가 구매도 가능합니다.
                            </p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">뉴스와이어 배포</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {licenseInfo?.nwLimit && licenseInfo?.nwLimit > 0 ? (
                                <>
                                  {getCurrencyFormat(licenseInfo?.nwLimit)}개(
                                  {getCurrencyFormat(licenseInfo?.nwCount)}개 사용)
                                </>
                              ) : (
                                <>-</>
                              )}
                            </p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">그룹</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {licenseInfo?.groupLimit && licenseInfo?.groupLimit > 0 ? (
                                <>
                                  {getCurrencyFormat(licenseInfo?.groupLimit)}개(
                                  {getCurrencyFormat(licenseInfo?.groupCount)}개 사용)
                                </>
                              ) : (
                                <>-</>
                              )}
                            </p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">회사</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{licenseInfo?.company?.name || '-'}</p>
                          </dd>
                          {licenseInfo?.buyer && (
                            <Fragment>
                              <dt>
                                <p className="dl-table-type1__text">구매자</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={licenseInfo?.buyer.name || licenseInfo?.buyer.displayName || ''}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                    onClick={() =>
                                      licenseInfo?.buyer?.userId &&
                                      openUserProfilePopupAction(Number(licenseInfo?.buyer.userId))
                                    }
                                  />
                                </p>
                              </dd>
                            </Fragment>
                          )}
                        </dl>
                      </li>
                    </ul>
                  </div>

                  <div className="setting__header">
                    <div className="common-title__section">
                      {/* <div className="common-title__group"> */}
                      <h5 className="font-heading--h5 sp-pt-5 sp-pb-3">전담 도우미</h5>
                      {/* <h2 className="common-title__title">전담 도우미</h2> */}
                      {/* </div> */}
                    </div>
                  </div>

                  <div className="setting-contents__section">
                    <ul className="interval-mt42">
                      <li>
                        <dl className="dl-table-type1__section narrow-gap">
                          <dt>
                            <p className="dl-table-type1__text">{licenseInfo?.member?.name}</p>
                          </dt>
                          <dd />
                          <dt>
                            <p className="dl-table-type1__text">미디어비</p>
                          </dt>
                          <dd />
                          <dt>
                            <p className="dl-table-type1__text">
                              {licenseInfo?.member?.departmentName || '' + licenseInfo?.member?.position || ''}
                            </p>
                          </dt>
                          <dd />
                          <dt>
                            <p className="dl-table-type1__text">{licenseInfo?.member?.phone}</p>
                          </dt>
                          <dd />
                          <dd />
                        </dl>
                        <Button
                          elem="a"
                          url={`mailto:${licenseInfo?.member?.email}`}
                          label={licenseInfo.member?.email || ''}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default AdminMain
