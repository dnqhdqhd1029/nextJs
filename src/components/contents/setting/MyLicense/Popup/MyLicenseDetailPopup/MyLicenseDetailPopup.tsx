/**
 * @file MyLicensePopup.tsx
 * @description 사용권 정보
 */

import { Fragment, useMemo, useState } from 'react'
import moment from 'moment/moment'

import Popup from '~/components/common/ui/Popup'
import Flag from '~/publishing/components/common/ui/Flag'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMyLicense } from '~/utils/hooks/contents/setting/useMyLicense'

const MyLicenseDetailPopup = () => {
  const { licenseInfo, userPopup, setUserProfilePopupAction } = useMyLicense()

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'detail'}
      title={`사용권 정보`}
      onClose={() => setUserProfilePopupAction()}
      hasCloseButton
      showFooter={false}
      titleChildren={
        <>
          <h2 className="popup-header__title">사용권 정보</h2>
          <div className="popup-header__steps mr-30">
            <div className="steps__group"></div>
          </div>
        </>
      }
    >
      <div
        className="setting-contents__section"
        style={{ marginTop: '5%' }}
      >
        <dl className="dl-table-type1__section">
          <dt>
            <p className="dl-table-type1__text">사용권</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{licenseInfo?.license ?? ''}</p>
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
          {licenseInfo && (
            <dd>
              <p className="dl-table-type1__text">
                {licenseInfo?.startAt ? moment(licenseInfo.startAt).format('YYYY-MM-DD') : '-'} ~{' '}
                {licenseInfo?.expireAt ? moment(licenseInfo.expireAt).format('YYYY-MM-DD') : '-'}
              </p>
              {moment().isAfter(moment(licenseInfo.expireAt)) ? (
                <Flag
                  label={'만료'}
                  color={'gray-500'}
                  size={'es'}
                />
              ) : (
                moment().isAfter(moment(licenseInfo.expireAt).add(-1, 'months')) && (
                  <span className="color-danger">
                    유효기간이 {moment(licenseInfo?.expireAt).diff(moment(licenseInfo?.expireAt), 'days')} 일
                    남았습니다. 사용권을 갱신하세요.
                  </span>
                )
              )}
            </dd>
          )}
          <dt>
            <p className="dl-table-type1__text">회원 수</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licenseInfo?.userLimit}명({licenseInfo?.userCount}명 사용)
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">이메일 건수</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              메일은 연간 사용자수 X 5만개가 기본으로 제공되며 소진 시 추가 구매 가능합니다. <br />
              {licenseInfo?.emailLimit !== undefined && licenseInfo?.emailLimit > 0 && (
                <>
                  {getCurrencyFormat(licenseInfo?.emailLimit)}
                  {licenseInfo?.emailLimitDetail && licenseInfo?.emailLimitDetail.length > 1 && (
                    <Fragment>
                      (
                      <Fragment>
                        {licenseInfo?.emailLimitDetail.map((item, index) => {
                          return index > 0 ? (
                            <Fragment key={'storeUserLicenseInfo?.emailLimitDetail' + index.toString()}>
                              +{getCurrencyFormat(item)}
                            </Fragment>
                          ) : (
                            <Fragment key={'storeUserLicenseInfo?.emailLimitDetail' + index.toString()}>
                              {getCurrencyFormat(item)}
                            </Fragment>
                          )
                        })}
                      </Fragment>
                      )
                    </Fragment>
                  )}
                  개<br />
                </>
              )}
              {licenseInfo?.expireAt && moment(licenseInfo?.expireAt).format('YYYY년 M월 DD일')}
              까지 {getCurrencyFormat(licenseInfo?.emailLeft)}건 발송 가능
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">뉴스와이어 베포</p>
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
            <p className="dl-table-type1__text">{licenseInfo?.company?.name}</p>
          </dd>
          {licenseInfo?.buyer && (
            <>
              <dt>
                <p className="dl-table-type1__text">구매자</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">
                  {licenseInfo?.buyer.name || licenseInfo?.buyer.displayName || ''}
                </p>
              </dd>
            </>
          )}
        </dl>
      </div>
    </Popup>
  )
}

export default MyLicenseDetailPopup
