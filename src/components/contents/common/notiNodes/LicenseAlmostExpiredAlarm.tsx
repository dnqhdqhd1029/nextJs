import { MouseEvent } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import { useAppSelector } from '~/utils/hooks/common/useRedux'

const LicenseAlmostExpiredAlarm = () => {
  const router = useRouter()
  const { licenseInfo } = useAppSelector(state => state.authSlice)

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await router.push('/payment/purchase-request')
  }
  return (
    <>
      <p>
        사용권이 {licenseInfo.expireAt && moment(licenseInfo.expireAt).format('YYYY년 MM월 DD일')} 만료됩니다. 계속
        사용하려면 서비스를 구매해야 합니다.
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

export default LicenseAlmostExpiredAlarm
