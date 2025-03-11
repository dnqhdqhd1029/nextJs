/**
 * @file toast.tsx
 * @description 토스트 메시지 샘플 페이지
 */

import { useEffect } from 'react'
import { toast } from 'react-toastify'

// import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
// import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { PageType } from '~/types/common'

const IconSuccess = (type: string) => {
  switch (type) {
    case 'success':
      return <IcoSvg data={icoSvgData.checkCircleFill} />
    case 'error':
      return <IcoSvg data={icoSvgData.xCircleFill} />
    case 'warning':
      return <IcoSvg data={icoSvgData.exclamationTriangleFill} />
    case 'info':
      return <IcoSvg data={icoSvgData.infoCircleFill} />
    case 'none':
      return <IcoSvg data={icoSvgData.infoCircleFill} />
    default:
      break
  }
}

const MessageBox1 = () => {
  return (
    <>
      <div className="toast-body__group">
        <div className="toast-body__text">안녕하세요! Toast 메시지입니다.</div>
      </div>
    </>
  )
}

const MessageBox2 = () => {
  return (
    <>
      <div className="toast-body__group">
        <h2 className="toast-body__title">제목</h2>
        <div className="toast-body__text">
          네, Toast 메시지를 성공적으로 읽었습니다. 이 예제 텍스트는 이러한 종류의 콘텐츠에서 Toast 내의 간격이 어떻게
          작동하는지 확인할 수 있도록 조금 더 길게 작성했습니다.
          <div className="toast-box1">
            <p>어닝쇼크 관련 뉴스 분석</p>
          </div>
          <div className="toast-box1">
            <p>삼성 브랜드 기사 수집</p>
            <p>변경</p>
          </div>
        </div>
      </div>
    </>
  )
}

const Sample: PageType = () => {
  useEffect(() => {
    toast.success(<MessageBox1 />, {
      className: 'toast__section toast-success__section',
      closeButton: false,
      icon: '',
      hideProgressBar: true,
      autoClose: false,
    })

    toast.success(<MessageBox1 />, {
      className: 'toast__section toast-success__section',
      icon: IconSuccess('success'),
      hideProgressBar: true,
      autoClose: false,
    })

    toast.error(<MessageBox1 />, {
      className: 'toast__section toast-danger__section',
      icon: IconSuccess('error'),
      closeButton: false,
      hideProgressBar: true,
      autoClose: false,
    })

    toast.warning(<MessageBox1 />, {
      className: 'toast__section toast-warning__section',
      icon: IconSuccess('warning'),
      hideProgressBar: true,
      autoClose: false,
    })

    toast.warning(<MessageBox2 />, {
      className: 'toast__section toast-warning__section',
      icon: '',
      hideProgressBar: true,
      autoClose: false,
    })

    toast.info(<MessageBox2 />, {
      className: 'toast__section toast-info__section',
      icon: IconSuccess('info'),
      closeButton: false,
      hideProgressBar: true,
      autoClose: false,
    })

    toast.info(<MessageBox2 />, {
      className: 'toast__section toast-info__section',
      icon: IconSuccess('info'),
      hideProgressBar: true,
      autoClose: false,
    })
  }, [])

  return (
    <>
      <h1>Toast Message</h1>
      <p>
        <a
          href="https://fkhadra.github.io/react-toastify/introduction/"
          target="_blank"
        >
          https://fkhadra.github.io/react-toastify/introduction/
        </a>
      </p>
      <p>
        스타일:
        <a
          href="https://fkhadra.github.io/react-toastify/how-to-style"
          target="_blank"
        >
          https://fkhadra.github.io/react-toastify/how-to-style
        </a>
      </p>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
