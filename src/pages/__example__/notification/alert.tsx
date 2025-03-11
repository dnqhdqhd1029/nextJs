/**
 * @file AlertConfirmPage.tsx
 * @description alert, confirm 기능
 */

import { useAlarm } from '~/utils/hooks/common/useAlarm'

const AlertConfirmPage = () => {
  const { setAlert, setConfirm } = useAlarm()

  const handleAlert = () => {
    setAlert({
      message: <p>헬로 월드</p>,
      open: true,
      callback: () => {
        alert('알림 확인')
      },
    })
  }

  const handleConfirm = () => {
    setConfirm({
      message: <p>헬로 컨펌</p>,
      open: true,
      onCancel: () => {
        alert('컨펌 취소')
      },
      onConfirm: () => {
        alert('컨펌 확인')
      },
    })
  }

  return (
    <div style={{ margin: '30px' }}>
      <button
        type="button"
        onClick={handleAlert}
        style={{ border: '1px solid #333', padding: '10px' }}
      >
        Alert
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={handleConfirm}
        style={{ border: '1px solid #333', padding: '10px' }}
      >
        Confirm
      </button>
    </div>
  )
}

export default AlertConfirmPage
AlertConfirmPage.Layout = 'SSR'
