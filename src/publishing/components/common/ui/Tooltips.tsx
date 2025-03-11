/**
 * @file Tooltips.tsx
 * @description 툴팁 모음
 */

import { Tooltip } from 'react-tooltip'

import { TooltipProps } from './common-ui'

const Tooltips = ({
  tooltipId,
  tooltipPlace,
  tooltipHtml,
  tooltipComponent,
  tooltipContents,
  url,
  target,
}: TooltipProps) => {
  const render = () => {
    if (url) {
      return (
        <a
          data-tooltip-id={tooltipId}
          data-tooltip-place={tooltipPlace}
          data-tooltip-html={tooltipHtml}
          data-tooltip-offset={7}
          href={url}
          target={target}
        >
          {tooltipComponent && tooltipComponent}
          {tooltipContents && tooltipContents}
        </a>
      )
    } else {
      return (
        <a
          data-tooltip-id={tooltipId}
          data-tooltip-place={tooltipPlace}
          data-tooltip-html={tooltipHtml}
          data-tooltip-offset={7}
        >
          {tooltipComponent && tooltipComponent}
          {tooltipContents && tooltipContents}
        </a>
      )
    }
  }
  return (
    <>
      <div className="tooltips__group">
        {render()}
        <Tooltip
          id={tooltipId}
          className="tooltips__item"
        />
      </div>
    </>
  )
}

Tooltips.defaultProps = {
  target: '_self',
}

export default Tooltips
