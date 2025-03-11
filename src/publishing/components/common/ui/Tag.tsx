/**
 * @file Tag.tsx
 * @description Tag 컴포넌트
 */

import { useState } from 'react'

import { TagsProps } from './common-ui'
import IcoSvg from './IcoSvg'

import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const Tag = ({ label, subLabel, cate, shape, close }: TagsProps) => {
  const [isClosed, setIsClosed] = useState(false)

  const clickClosed = () => {
    setIsClosed(true)
  }

  return (
    <div className={`tag__group cate-${cate} shape-${shape} ${isClosed ? 'is-closed' : ''}`}>
      <span className="tag__label">
        {label} {subLabel && <b className="tag__label-sub">{subLabel}</b>}
      </span>
      {close && (
        <button
          type="button"
          className="tag__button-close"
          onClick={clickClosed}
        >
          <IcoSvg data={icoSvgData.iconCloseButton2} />
          <span className="hidden">삭제</span>
        </button>
      )}
    </div>
  )
}

Tag.defaultProps = {
  label: '태그명을 적어주세요',
  close: false,
}

export default Tag
