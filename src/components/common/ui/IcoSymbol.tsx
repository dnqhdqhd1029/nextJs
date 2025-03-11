/**
 * @file IcoSymbol.tsx
 * @description ico symbol 컴포넌트
 */

import type { IcoProps } from './IcoAvatar'
import IcoSvg from './IcoSvg'

export type Props = Pick<IcoProps, 'icoData' | 'label'>

const IcoSymbol = ({ label, icoData }: Props) => {
  return (
    <div className="ico-symbol__group">
      <IcoSvg data={icoData} />
      <span className="hidden">{label}</span>
    </div>
  )
}

export default IcoSymbol
