import { Fragment, useEffect } from 'react'
import moment from 'moment'

import Popup from '~/components/common/ui/Popup'
import Flag from '~/publishing/components/common/ui/Flag'
import {
  initialState as userSliceInit,
  initLicenseInformationPopupAction,
  licenseInformationPopupAction,
  licenseInformationPopupProps,
} from '~/stores/modules/contents/user/user'
import { LicenseDto, UserDto } from '~/types/api/service'
import { apiGetLicenseInfoById } from '~/utils/api/license/useGetLicenseInfo'
import { getCurrencyFormat } from '~/utils/common/number'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const LicenseInformationPopup = () => {
  const dispatch = useAppDispatch()
  const { licenseInformationPopup } = useAppSelector(state => state.userSlice)

  const getOwnerInformation = async (e: number) => {
    let res: licenseInformationPopupProps = userSliceInit.licenseInformationPopup
    const { status, data, message } = await apiGetLicenseInfoById(e)
    if (status === 'S') {
      const userData = data as LicenseDto
      res = {
        isOpen: true,
        idKey: e,
        license: userData,
      }
    }
    dispatch(licenseInformationPopupAction(res))
  }

  const closePopup = () => {
    dispatch(initLicenseInformationPopupAction())
  }

  useEffect(() => {
    if (licenseInformationPopup.isOpen && licenseInformationPopup.idKey) {
      getOwnerInformation(licenseInformationPopup.idKey)
    }
  }, [licenseInformationPopup.isOpen])

  return (
    <Popup
      isOpen={licenseInformationPopup.isOpen}
      title={`사용권 정보`}
      onClose={() => closePopup()}
      width={'50vw'}
      hasCloseButton
      showFooter={false}
    >
      <div className="setting-contents__section">
        <dl className="dl-table-type1__section">
          <dt>
            <p className="dl-table-type1__text">사용권</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{licenseInformationPopup?.license?.license ?? ''}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">상품</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">{licenseInformationPopup?.license?.mainProductName || '-'}</p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">사용기간</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licenseInformationPopup?.license?.startAt
                ? moment(licenseInformationPopup?.license?.startAt).format('YYYY-mm-DD')
                : '-'}{' '}
              ~{' '}
              {licenseInformationPopup?.license?.expireAt
                ? moment(licenseInformationPopup?.license?.expireAt).format('YYYY-mm-DD')
                : '-'}
              {moment().isAfter(moment(licenseInformationPopup?.license?.expireAt)) ? (
                <Flag
                  label={'만료'}
                  color={'gray-500'}
                  size={'es'}
                />
              ) : (
                moment().isAfter(moment(licenseInformationPopup?.license?.expireAt).add(-1, 'months')) && (
                  <span className="color-danger">
                    유효기간이{' '}
                    {moment(licenseInformationPopup?.license?.expireAt).diff(
                      moment(licenseInformationPopup?.license?.expireAt),
                      'days'
                    )}{' '}
                    일 남았습니다. 사용권을 갱신하세요.
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
              {licenseInformationPopup?.license?.userLimit}명({licenseInformationPopup?.license?.userCount}명 사용)
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">이메일 건수</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              메일은 연간 사용자수 X 5만개가 기본으로 제공되며 소진 시 추가 구매 가능합니다. <br />
              {licenseInformationPopup?.license?.emailLimit !== undefined &&
                licenseInformationPopup?.license?.emailLimit > 0 && (
                  <>
                    {getCurrencyFormat(licenseInformationPopup?.license?.emailLimit)}
                    {licenseInformationPopup?.license?.emailLimitDetail &&
                      licenseInformationPopup?.license?.emailLimitDetail.length > 1 && (
                        <Fragment>
                          (
                          <Fragment>
                            {licenseInformationPopup?.license?.emailLimitDetail.map((item, index) => {
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
              {licenseInformationPopup?.license?.expireAt &&
                moment(licenseInformationPopup?.license?.expireAt).format('YYYY년 M월 DD일')}
              까지 {getCurrencyFormat(licenseInformationPopup?.license?.emailLeft)}건 발송 가능
            </p>
          </dd>
          <dt>
            <p className="dl-table-type1__text">뉴스와이어 베포</p>
          </dt>
          <dd>
            <p className="dl-table-type1__text">
              {licenseInformationPopup?.license?.nwLimit && licenseInformationPopup?.license?.nwLimit > 0 ? (
                <>
                  {getCurrencyFormat(licenseInformationPopup?.license?.nwLimit)}개(
                  {getCurrencyFormat(licenseInformationPopup?.license?.nwCount)}개 사용)
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
              {licenseInformationPopup?.license?.groupLimit && licenseInformationPopup?.license?.groupLimit > 0 ? (
                <>
                  {getCurrencyFormat(licenseInformationPopup?.license?.groupLimit)}개(
                  {getCurrencyFormat(licenseInformationPopup?.license?.groupCount)}개 사용)
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
            <p className="dl-table-type1__text">{licenseInformationPopup?.license?.company?.name}</p>
          </dd>
          {licenseInformationPopup?.license?.buyer?.name !== '' && (
            <>
              <dt>
                <p className="dl-table-type1__text">구매자</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">
                  {licenseInformationPopup?.license?.buyer?.name ||
                    licenseInformationPopup?.license?.buyer?.displayName ||
                    ''}
                </p>
              </dd>
            </>
          )}
        </dl>
      </div>
    </Popup>
  )
}
export default LicenseInformationPopup
