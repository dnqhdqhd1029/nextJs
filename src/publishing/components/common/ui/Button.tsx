/**
 * @file Button.tsx
 * @description button  컴포넌트
 */

import Link from 'next/link'

import { ButtonsProps } from './common-ui'
import IcoSvg from './IcoSvg'

const Button = ({
  elem,
  url,
  target,
  label,
  size,
  cate,
  color,
  count,
  icoLeft,
  icoLeftData,
  icoRight,
  icoRightData,
  icoSize,
  disabled,
  onClick,
  title,
}: ButtonsProps) => {
  const renderButtonContents = () => {
    return (
      <>
        {icoLeft && (
          <span className={`button__ico-left button-${cate}__ico-left icoSize-${icoSize !== null && icoSize}`}>
            <IcoSvg data={icoLeftData} />
          </span>
        )}

        <span className={`button__label button-${cate}__label size-${size}`}>{label}</span>

        {icoRight && (
          <span className={`button__ico-right button-${cate}__ico-right icoSize-${icoSize !== null && icoSize}`}>
            <IcoSvg data={icoRightData} />
          </span>
        )}

        {count !== null && <span className={`button__count button-${cate}__count`}>{count}</span>}
      </>
    )
  }

  if (elem === 'a') {
    return (
      <Link
        href={url}
        legacyBehavior
      >
        <a
          target={target}
          className={`button-${cate} size-${size} colors-${color} ${disabled ? 'disabled' : ''}`}
          title={title}
        >
          {renderButtonContents()}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={`button-${cate} size-${size} colors-${color}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {renderButtonContents()}
    </button>
  )
}

Button.defaultProps = {
  elem: 'button',
  url: '',
  target: '_self',
  count: null,
  icoLeft: false,
  icoLeftData: undefined,
  icoRight: false,
  icoRightData: undefined,
  icoSize: null,
  disabled: false,
  title: '',
  onClick: () => console.log('클릭'),
}

export default Button
