/**
 * @file toast.tsx
 * @description toast 기능
 */

import NetworkErrorMessage from '~/components/common/ui/NetworkErrorMesage'
import { openToast } from '~/utils/common/toast'

const ToastPage = () => {
  const handleToast = () => {
    openToast(<p>헬로 월드 성공</p>, 'success')
    // openToast(<p>헬로 월드 에러</p>, 'error')
    // openToast(<p>헬로 월드 경고</p>, 'warning')
    // openToast(<p>헬로 월드 정보</p>, 'info')
  }

  const handleNetworkErrorToast = () => {
    openToast(NetworkErrorMessage, 'error')
  }

  return (
    <div style={{ margin: '30px' }}>
      <button
        type="button"
        onClick={handleToast}
        style={{ border: '1px solid #333', padding: '10px' }}
      >
        토스트
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={handleNetworkErrorToast}
        style={{ border: '1px solid #333', padding: '10px' }}
      >
        네트워크 에러 토스트
      </button>
    </div>
  )
}

export default ToastPage
ToastPage.Layout = 'SSR'
