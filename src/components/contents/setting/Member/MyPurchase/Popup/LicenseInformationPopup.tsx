import { Fragment } from 'react'
import moment from 'moment'

import Popup from '~/components/common/ui/Popup'
import { DefaultLicensePopup } from '~/components/contents/setting/Member/defaultData'
import Flag from '~/publishing/components/common/ui/Flag'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const LicenseInformationPopup = () => {
  const { licensePopup, setLicensePopupAction } = useMyPurchase()
  return (
    <Popup
      isOpen={licensePopup.isOpen}
      title={`사용권 정보`}
      onClose={() => setLicensePopupAction(DefaultLicensePopup)}
      width={'50vw'}
      hasCloseButton
      showFooter={false}
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
            <p className="dl-table-type1__text">{licensePopup?.license ?? ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">상품</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{licensePopup?.mainProductName || '-'}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">사용기간</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licensePopup?.startAt ? moment(licensePopup?.startAt).format('YYYY-mm-DD') : '-'} ~{' '}
              {licensePopup?.expireAt ? moment(licensePopup?.expireAt).format('YYYY-mm-DD') : '-'}
              {moment().isAfter(moment(licensePopup.expireAt)) ? (
                <Flag
                  label={'만료'}
                  color={'gray-500'}
                  size={'es'}
                />
              ) : (
                moment().isAfter(moment(licensePopup.expireAt).add(-1, 'months')) && (
                  <span className="color-danger">
                    유효기간이 {moment(licensePopup?.expireAt).diff(moment(licensePopup?.expireAt), 'days')} 일
                    남았습니다. 사용권을 갱신하세요.
                  </span>
                )
              )}
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">회원 수</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licensePopup?.userLimit}명({licensePopup?.userCount}명 사용)
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">이메일 건수</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              메일은 연간 사용자수 X 5만개가 기본으로 제공되며 소진 시 추가 구매 가능합니다. <br />
              {licensePopup?.emailLimit !== undefined && licensePopup?.emailLimit > 0 && (
                <>
                  {getCurrencyFormat(licensePopup?.emailLimit)}
                  {licensePopup?.emailLimitDetail && licensePopup?.emailLimitDetail.length > 1 && (
                    <Fragment>
                      (
                      <Fragment>
                        {licensePopup?.emailLimitDetail.map((item, index) => {
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
              {licensePopup?.expireAt && moment(licensePopup?.expireAt).format('YYYY년 M월 DD일')}
              까지 {getCurrencyFormat(licensePopup?.emailLeft)}건 발송 가능
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">뉴스와이어 베포</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licensePopup?.nwLimit && licensePopup?.nwLimit > 0 ? (
                <>
                  {getCurrencyFormat(licensePopup?.nwLimit)}개(
                  {getCurrencyFormat(licensePopup?.nwCount)}개 사용)
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
              {licensePopup?.groupLimit && licensePopup?.groupLimit > 0 ? (
                <>
                  {getCurrencyFormat(licensePopup?.groupLimit)}개(
                  {getCurrencyFormat(licensePopup?.groupCount)}개 사용)
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
            <p className="dl-table-type1__text">{licensePopup?.companyName}</p>
          </dd>
          {licensePopup?.buyerName !== '' && (
            <>
              <dt>
                <p className="dl-table-type1__text">구매자</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">{licensePopup?.buyerName}</p>
              </dd>
            </>
          )}
        </dl>
      </div>
    </Popup>
  )
}
export default LicenseInformationPopup
