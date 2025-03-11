import { MouseEvent } from 'react'
import { useRouter } from 'next/router'

import { getYearMonthDay } from '~/utils/common/date'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const LicenseExpiredAlarm = () => {
  const router = useRouter()
  const { licenseInfo, timeZone } = useAppSelector(state => state.authSlice)

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await router.push('/payment/purchase-request')
  }
  return (
    <>
      <p>
        사용권이 만료되었습니다. 유효기간 {licenseInfo.startAt && getYearMonthDay(timeZone, licenseInfo.startAt)} ~{' '}
        {licenseInfo.expireAt && getYearMonthDay(timeZone, licenseInfo.expireAt)}
        <a
          target="_self"
          onClick={e => handleClick(e)}
          className="ml-12"
        >
          서비스 구매하기
        </a>
      </p>
    </>
  )
}

export default LicenseExpiredAlarm
