import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

export const IconSuccess = (type: string) => {
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
