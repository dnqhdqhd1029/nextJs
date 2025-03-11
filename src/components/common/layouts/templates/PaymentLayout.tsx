import { ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import { apiPaymentBillExcel } from '~/utils/api/payment/usePayment'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  children: ReactNode
  downloadButton?: boolean
}

const PaymentLayout = ({ children, downloadButton }: Props) => {
  const router = useRouter()
  const { paymentsId } = useAppSelector(state => state.paymentSlice)
  const [isDownloadLoading, setIsDownloadLoading] = useState(false)

  const handleDownloadEstimate = async () => {
    if (paymentsId && paymentsId > 0) {
      setIsDownloadLoading(() => true)
      const res = await apiPaymentBillExcel(paymentsId)
      if (res) {
        const excel = res as Blob
        const blob = new Blob([excel], { type: 'application/pdf;charset=utf-8' })

        const downloadUrl = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = downloadUrl
        // @ts-ignore
        link.download = '미디어비 견적서.pdf'
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(link)
      } else {
        openToast('견적서 다운로드를 실패하였습니다', 'error')
      }
      setIsDownloadLoading(() => false)
    }
  }

  useEffect(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0]
    if (badge && badge instanceof HTMLElement) {
      badge.style.visibility = 'visible'
    }
  }, [router.pathname])

  return (
    <div className="mb-wrap layout3">
      <header className="header__section">
        <div className="header-gnb__section">
          <div
            className="header-gnb__group"
            style={{ height: '52px' }}
          >
            <MediaBeeLogo goToMain={true} />
          </div>
          {downloadButton && (
            <div className="header-gnb__group">
              <div className="header-pay">
                <Button
                  label={'견적서 다운로드'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  isLoading={isDownloadLoading}
                  onClick={handleDownloadEstimate}
                />
              </div>
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  )
}

export default PaymentLayout
