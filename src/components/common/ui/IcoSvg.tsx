/**
 * @file IcoSvg.tsx
 * @description ico svg 컴포넌트
 */
import { CSSProperties } from 'react'

export interface Props {
  /** Icon SVG code */
  data: string[] | undefined

  style?: CSSProperties

  width?: number | string

  height?: number | string
}

const IcoSvg = ({ data, style, width, height }: Props) => {
  return (
    <span
      className="ico-svg"
      style={style}
    >
      <svg
        width={width ?? 16}
        height={height ?? 16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data?.map((d: string, i: number) => (
          <path
            d={d}
            fill="currentColor"
            key={i}
          />
        ))}
      </svg>
    </span>
  )
}

export default IcoSvg
