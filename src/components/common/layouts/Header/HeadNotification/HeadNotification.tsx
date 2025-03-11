import { Fragment } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Tooltips from '~/components/common/ui/Tooltips'
import ContentsAlarm from '~/components/contents/common/notiNodes/ContentsAlarm'
import ContentsUpdateAlarm from '~/components/contents/common/notiNodes/ContentsUpdateAlarm'
import LicenseAlmostExpiredAlarm from '~/components/contents/common/notiNodes/LicenseAlmostExpiredAlarm'
import LicenseExpiredAlarm from '~/components/contents/common/notiNodes/LicenseExpiredAlarm'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const HeadNotification = () => {
  const router = useRouter()
  const { isDemoLicense, licenseInfo, globalNoti, headNotificationAction } = useHeader()
  return (
    <Fragment>
      {isDemoLicense && (
        <div className="header-notification__group">
          <div
            className={cn('notification-header__section  button-type1', {
              'colors-info': 'info',
            })}
          >
            <div className="notification-header__group">
              <div className="notification-header__contents ta-l">
                <p>{licenseInfo?.company?.name || ''}</p>
                <Tooltips
                  tooltipId={'tt10-5'}
                  tooltipPlace={'bottom'}
                  tooltipHtml={
                    '데모 회사에 입력된 데이터는<br />이해를 돕기 위해 미디어비<br />작업자가 대신 입력한 가상의<br />정보입니다.'
                  }
                  tooltipComponent={<IcoTooltip />}
                />
                <p>{'  '}고객님은 지금 데모 체험 중입니다.</p>
              </div>
            </div>
            <div className="notification-header__btn">
              <Button
                label={'구매 신청'}
                size={'m'}
                icoSize={16}
                onClick={() => window.location.replace('https://www.naver.com/')}
              />
            </div>
          </div>
        </div>
      )}
      {globalNoti &&
        globalNoti.map((e, index) => {
          if (!e.isChecked) {
            return (
              <div
                className="header-notification__group"
                key={index.toString() + 'header-notification__group'}
              >
                <div
                  className={cn('notification-header__section  button-type1', {
                    'colors-blue-700': e.style === 'success',
                    'colors-error': e.style === 'error',
                    'colors-info': e.style === 'info',
                    'colors-warning': e.style === 'warning',
                  })}
                >
                  <div className="notification-header__group">
                    <div className="notification-header__contents ta-l">
                      {e.type === 'LICENSE_EXPIRED' && <LicenseExpiredAlarm />}
                      {e.type === 'LICENSE_ALMOST_EXPIRED' && <LicenseAlmostExpiredAlarm />}
                      {e.type === 'CONTENTS_UPDATE' && <ContentsUpdateAlarm />}
                      {e.type === 'NOTIFICATION' && e.title && e.content && e.key && (
                        <ContentsAlarm
                          idKey={e.key}
                          content={e.content}
                          title={e.title}
                        />
                      )}
                    </div>
                  </div>
                  {e.hasClose && (
                    <div className="notification-header__btn">
                      <Button
                        label={'삭제'}
                        cate={'ico-only'}
                        size={'s24'}
                        color={e.style === 'success' || e.style === 'error' ? 'alert' : undefined}
                        icoLeft={true}
                        icoLeftData={icoSvgData.iconCloseButton}
                        icoSize={16}
                        onClick={() => headNotificationAction(e, globalNoti)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          }
        })}
    </Fragment>
  )
}

export default HeadNotification
