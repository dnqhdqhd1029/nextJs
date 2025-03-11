/**
 * @file Button.tsx
 * @description button  컴포넌트
 */
import { ChangeEvent, CSSProperties, Fragment, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import IcoSvg from './IcoSvg'

import Loader from '~/components/common/ui/Loader'
import type { Cate, Color, Size } from '~/types/common'
import useDebounce from '~/utils/hooks/common/useDebounce'

export interface ButtonsProps {
  /** elem 타입 */
  elem?: 'button' | 'a'

  /** a 태그의 경우 url */
  url?: any

  /** a 태그의 경우 target */
  target?: string

  /** label(버튼 텍스트) */
  label: string

  /** size */
  size?: Size | ''

  /** 타입 */
  cate?: Cate

  /** 색상 */
  color?: Color

  /** 카운트 */
  count?: number | null

  /** 왼쪽 아이콘 여부 */
  icoLeft?: boolean

  /** 왼쪽 아이콘 데이터(icoSvg) */
  icoLeftData?: string[] | undefined

  /** 오른쪽 아이콘 여부 */
  icoRight?: boolean

  /** 오른쪽 아이콘 데이터(icoSvg) */
  icoRightData?: string[] | undefined

  /** 아이콘 사이즈 */
  icoSize?: number | null

  /** disabled */
  disabled?: boolean

  /** title */
  title?: string

  /**
   * onClick event
   * @returns
   */
  onClick?: (e: any) => void

  /**
   * onFocus event
   */
  onFocus?: (e: any) => void

  download?: boolean

  style?: CSSProperties

  className?: string

  isLoading?: boolean

  countIdKey?: string

  countIsShow?: boolean

  isCountAnimation?: boolean
}

const Button = ({
  elem = 'button',
  url = '',
  target = '_self',
  label,
  size = 'm',
  cate = 'default',
  color = 'primary',
  countIdKey = '',
  isCountAnimation = false,
  count = 0,
  countIsShow = false,
  icoLeft,
  icoLeftData,
  icoRight,
  icoRightData,
  icoSize,
  disabled,
  onClick,
  onFocus,
  title,
  download,
  style,
  className,
  isLoading,
}: ButtonsProps) => {
  const debouncedUpdateState = useDebounce(count, 500)
  const [countId, setCountId] = useState<string>('') // count 상태 추가
  const [opacity, setOpacity] = useState(1) // opacity 상태 추가
  const renderButtonContents = () => {
    return (
      <>
        {icoLeft && (
          <span className={cn(`button__ico-left button-${cate}__ico-left`, { [`icoSize-${icoSize}`]: icoSize })}>
            <IcoSvg data={icoLeftData} />
          </span>
        )}

        <span className={cn(`button__label button-${cate}__label`, `size-${size}`)}>{label}</span>

        {icoRight && (
          <span className={cn(`button__ico-right button-${cate}__ico-right`, { [`ico-size${icoSize}`]: icoSize })}>
            <IcoSvg data={icoRightData} />
          </span>
        )}
        {count !== null && count !== undefined && countIsShow && (
          <Fragment>
            {isCountAnimation ? (
              <span
                className={cn(`button__count button-check-number__count`)}
                style={{
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: opacity,
                }}
              >
                {count}
              </span>
            ) : (
              <span className={cn(`button__count button-check-number__count`)}>{count}</span>
            )}
          </Fragment>
        )}
      </>
    )
  }

  useEffect(() => {
    setCountId(() => countIdKey)
    setOpacity(1)
  }, [countIdKey])

  useEffect(() => {
    setOpacity(1)
  }, [debouncedUpdateState])

  useEffect(() => {
    if (countIdKey === countId) {
      setOpacity(0)
    }
  }, [count])

  if (elem === 'a') {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick && onClick(e)
    }

    const handleFocus = (e: ChangeEvent<HTMLAnchorElement>) => {
      onFocus && onFocus(e)
    }
    return (
      <Link
        href={url}
        legacyBehavior
      >
        <a
          target={target}
          className={cn(`button-${cate}`, `size-${size}`, `colors-${color}`, className)}
          title={title ?? ''}
          onClick={handleClick}
          onFocus={handleFocus}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          download={download}
          style={style}
        >
          {renderButtonContents()}
        </a>
      </Link>
    )
  } else {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e)
    }

    const handleFocus = (e: ChangeEvent<HTMLButtonElement>) => {
      onFocus && onFocus(e)
    }

    return (
      <button
        className={cn(`button-${cate}`, `size-${size}`, `colors-${color}`, 'position-relative', className)}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onFocus={handleFocus}
        title={title ?? ''}
        style={style}
      >
        {renderButtonContents()}
        {isLoading && <Loader screen={'absolute'} />}
      </button>
    )
  }
}

export default Button
