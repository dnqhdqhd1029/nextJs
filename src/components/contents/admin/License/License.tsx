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

const AdminLicense = () => {
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
                        <h2 className="common-title__title">사용권</h2>
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
                            <p className="dl-table-type1__text">회사</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{licenseInfo?.company?.name || '-'}</p>
                          </dd>
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
                              </p>
                            )}
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">이메일 발송</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {licenseInfo?.emailLimit !== undefined && licenseInfo?.emailLimit > 0 && (
                                <>{getCurrencyFormat(Number(licenseInfo?.emailLeft))}개 가능</>
                              )}
                              <br />
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
                                  {getCurrencyFormat(Number(licenseInfo?.nwLimit) - Number(licenseInfo?.nwCount))}개
                                  가능
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
                                  {getCurrencyFormat(Number(licenseInfo?.groupLimit) - Number(licenseInfo?.groupCount))}
                                  개 가능
                                </>
                              ) : (
                                <>-</>
                              )}
                            </p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default AdminLicense
