/**
 * @file IcoGroup.tsx
 * @description ico 모음
 */

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

export const IcoRequired = () => {
  return (
    <strong className="ico-required">
      <span className="hidden">필수</span>
    </strong>
  )
}

export const IcoTooltip = () => {
  return (
    <span className="ico-tooltip">
      <IcoSvg data={icoSvgData.infoCircle} />
      <span className="hidden">툴팁(부연설명)</span>
    </span>
  )
}

export const IcoQuestionTooltip = () => {
  return (
    <span className="ico-tooltip">
      <IcoSvg data={icoSvgData.infoCircleQuestion} />
      <span className="hidden">툴팁 물음표(부연설명)</span>
    </span>
  )
}

export const IcoChevronThickLeft = () => {
  return (
    <span className="ico-chevron-thick-left">
      <IcoSvg data={icoSvgData.chevronThickLeft} />
      <span className="hidden">이전</span>
    </span>
  )
}

export const IcoChevronThickRight = () => {
  return (
    <span className="ico-chevron-thick-right">
      <IcoSvg data={icoSvgData.chevronThickRight} />
      <span className="hidden">다음</span>
    </span>
  )
}

export const IcoClipboard2Data02 = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ico-svg-elem"
    >
      <rect
        x="5.5"
        y="7"
        width="7"
        height="7.5"
        rx="2"
        fill="#A5E1E8"
      />
      <path
        d="M9.5 0C9.77614 0 10 0.223858 10 0.5C10 0.776142 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2C11 2.27614 10.7761 2.5 10.5 2.5H5.5C5.22386 2.5 5 2.27614 5 2V1.5C5 1.22386 5.22386 1 5.5 1C5.77614 1 6 0.776142 6 0.5C6 0.223858 6.22386 0 6.5 0H9.5Z"
        fill="black"
      />
      <path
        d="M3 2.5C3 2.22386 3.22386 2 3.5 2H4C4.27614 2 4.5 1.77614 4.5 1.5C4.5 1.22386 4.27614 1 4 1H3.5C2.67157 1 2 1.67157 2 2.5V14.5C2 15.3284 2.67157 16 3.5 16H12.5C13.3284 16 14 15.3284 14 14.5V2.5C14 1.67157 13.3284 1 12.5 1H12C11.7239 1 11.5 1.22386 11.5 1.5C11.5 1.77614 11.7239 2 12 2H12.5C12.7761 2 13 2.22386 13 2.5V14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5V2.5Z"
        fill="black"
      />
      <path
        d="M10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V7Z"
        fill="black"
      />
      <path
        d="M4 11C4 10.4477 4.44772 10 5 10C5.55228 10 6 10.4477 6 11V12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12V11Z"
        fill="black"
      />
      <path
        d="M8 8C7.44772 8 7 8.44772 7 9V12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12V9C9 8.44772 8.55228 8 8 8Z"
        fill="black"
      />
    </svg>
  )
}

export const IcoFileEarmarkText02 = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ico-svg-elem"
    >
      <rect
        x="5.5"
        y="7"
        width="7"
        height="7.5"
        rx="2"
        fill="#A5E1E8"
      />
      <path
        d="M5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H5.5Z"
        fill="black"
      />
      <path
        d="M5 9.5C5 9.22386 5.22386 9 5.5 9H10.5C10.7761 9 11 9.22386 11 9.5C11 9.77614 10.7761 10 10.5 10H5.5C5.22386 10 5 9.77614 5 9.5Z"
        fill="black"
      />
      <path
        d="M5 11.5C5 11.2239 5.22386 11 5.5 11H7.5C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
        fill="black"
      />
      <path
        d="M9.5 0H4C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V4.5L9.5 0ZM9.5 1V3C9.5 3.82843 10.1716 4.5 11 4.5H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V2C3 1.44772 3.44772 1 4 1H9.5Z"
        fill="black"
      />
    </svg>
  )
}

export const IcoSendCheck02 = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ico-svg-elem"
    >
      <rect
        x="4.75"
        y="7.5"
        width="7"
        height="7.5"
        rx="3.5"
        fill="#A5E1E8"
      />
      <path
        d="M15.9645 0.68571C16.0388 0.500001 15.9952 0.287892 15.8538 0.146461C15.7124 0.00502989 15.5003 -0.0385071 15.3145 0.0357762L0.767436 5.85462C0.199981 6.0816 0.127708 6.8556 0.643323 7.18372L5.63806 10.3622L7.16932 12.7685C7.31757 13.0014 7.62662 13.0701 7.85959 12.9218C8.09256 12.7736 8.16123 12.4645 8.01298 12.2316L6.6374 10.07L14.1313 2.57605L12.236 7.31432C12.1334 7.57071 12.2582 7.8617 12.5145 7.96425C12.7709 8.06681 13.0619 7.9421 13.1645 7.68571L15.9645 0.68571ZM13.4242 1.86895L5.9303 9.36285L1.59172 6.60194L13.4242 1.86895Z"
        fill="black"
      />
      <path
        d="M16.0002 12.5C16.0002 14.433 14.4332 16 12.5002 16C10.5672 16 9.00024 14.433 9.00024 12.5C9.00024 10.567 10.5672 9 12.5002 9C14.4332 9 16.0002 10.567 16.0002 12.5ZM14.0075 10.8213C13.7707 10.6792 13.4636 10.756 13.3215 10.9928L12.151 12.9436L11.6038 12.3964C11.4085 12.2012 11.092 12.2012 10.8967 12.3964C10.7014 12.5917 10.7014 12.9083 10.8967 13.1036L11.6703 13.8771C12.0153 14.2222 12.5927 14.1511 12.8437 13.7327L14.179 11.5072C14.3211 11.2705 14.2443 10.9633 14.0075 10.8213Z"
        fill="black"
      />
    </svg>
  )
}

export const IcoPersonLineBroken = () => {
  return <IcoSvg data={icoSvgData.personLineBroken} />
}

export const IcoArrowMove = () => {
  return (
    <span className="ico-arrow-move">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="1">
          <path
            d="M8 0.847656L11.0311 4.07266H4.96891L8 0.847656Z"
            fill="currentColor"
          />
          <path
            d="M8 15.1484L11.0311 11.9234H4.96891L8 15.1484Z"
            fill="currentColor"
          />
          <line
            x1="8.0002"
            y1="4.05078"
            x2="8.00019"
            y2="12.0508"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M0.849609 7.99609L4.07461 4.965L4.07461 11.0272L0.849609 7.99609Z"
            fill="currentColor"
          />
          <path
            d="M15.1504 7.99609L11.9254 4.96501L11.9254 11.0272L15.1504 7.99609Z"
            fill="currentColor"
          />
          <line
            x1="4.05273"
            y1="7.99687"
            x2="12.0527"
            y2="7.99687"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </g>
      </svg>
    </span>
  )
}
