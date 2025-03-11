/**
 * @file Tooltips.tsx
 * @description 툴팁 모음
 */

import { MouseEvent, ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'
import cn from 'classnames'

export type PlacesType = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** 툴팁 id */
  tooltipId: string

  /** 툴팁 위치(top, right, bottom, left) */
  tooltipPlace?: PlacesType

  /** 툴팁 안의 내용(html) */
  tooltipHtml?: string | undefined

  /** 툴팁을 띄울 내용(ReactNode) */
  tooltipComponent?: undefined | ReactNode

  /** 툴팁을 띄울 내용(string) */
  tooltipContents?: string

  /** 링크 */
  url?: string

  /** 링크의 target */
  target?: string

  /** tooltip class */
  className?: string

  /** a tag className */
  aTagClassName?: string

  /** noHover */
  isCusorDefault?: boolean

  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const Tooltips = ({
  tooltipId,
  tooltipPlace,
  tooltipHtml,
  tooltipComponent,
  tooltipContents,
  url,
  target,
  className,
  aTagClassName,
  isCusorDefault,
  onClick,
}: TooltipProps) => {
  return (
    <div className={cn('tooltips__group', className)}>
      <a
        data-tooltip-id={tooltipId ?? undefined}
        data-tooltip-place={tooltipPlace}
        data-tooltip-html={tooltipHtml}
        data-tooltip-offset={7}
        href={url ?? undefined}
        target={target ?? '_self'}
        className={aTagClassName}
        style={{
          cursor: isCusorDefault ? 'default' : 'pointer',
        }}
        onClick={onClick}
      >
        {tooltipComponent && tooltipComponent}
        {tooltipContents && tooltipContents}
      </a>
      <Tooltip
        id={tooltipId ?? undefined}
        className="tooltips__item"
      />
    </div>
  )
}

export default Tooltips
