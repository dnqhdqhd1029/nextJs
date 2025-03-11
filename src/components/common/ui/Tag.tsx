/**
 * @file Tag.tsx
 * @description Tag 컴포넌트
 */

import { FocusEvent } from 'react'
import cn from 'classnames'

import IcoSvg from './IcoSvg'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

interface Props {
  /** 태그명 */
  label?: string

  /** 서브 태그명 */
  subLabel?: string

  /** 태그 카테고리 */
  cate?: string

  /** 태그 모양 */
  shape?: string

  /** 태그 닫기 버튼 */
  close?: boolean

  /** className */
  className?: string

  /** 태그 닫힘 이벤트 */
  onClose?: () => void

  /**
   * onFocus event
   */
  onFocus?: (e: FocusEvent<HTMLButtonElement>) => void
}

const Tag = ({
  label = '태그명을 적어주세요',
  subLabel,
  cate,
  shape,
  close = false,
  onClose,
  className,
  onFocus,
}: Props) => {
  const clickClosed = () => {
    onClose && onClose()
  }

  return (
    <div
      className={cn('tag__group', className, {
        [`cate-${cate}`]: cate,
        [`shape-${shape}`]: shape,
      })}
    >
      <span className="tag__label">
        {label} {subLabel && <b className="tag__label-sub">{subLabel}</b>}
      </span>
      {close && (
        <button
          type="button"
          className="tag__button-close"
          onClick={clickClosed}
          onFocus={onFocus}
        >
          <IcoSvg data={icoSvgData.iconCloseButton2} />
          <span className="hidden">삭제</span>
        </button>
      )}
    </div>
  )
}

export default Tag
