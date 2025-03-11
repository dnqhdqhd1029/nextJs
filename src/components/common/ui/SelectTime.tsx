/**
 * @file SelectTime.tsx
 * @description 셀렉트박스 시간 선택
 */

import React, { MouseEvent, UIEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from './Button'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'

interface Props {
  /** Select input의 레이블 */
  placeholder?: string

  changeWidth?: string
  /** 시간 값 */
  value?: {
    hours: number
    minutes: number
  }

  /**
   * 시간 선택된 후 콜백
   * @param {number} hour
   * @param {number} minute
   * @returns
   */
  onSelect?: (hour: number, minute: number) => void
  validateFunc?: (hour: number, minute: number) => boolean
  minuteInterval?: number
  disabled?: boolean
}

const initTimeOption = (num: number, interval: number = 1) => {
  const arr = [...Array(Math.ceil(num / interval))]
  return arr.map((n, i) => (i * interval < 10 ? `0${i * interval}` : `${i * interval}`))
}

const SelectTime = ({
  placeholder = 'Select...',
  value,
  onSelect,
  changeWidth,
  validateFunc,
  minuteInterval = 1,
  disabled,
}: Props) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const btnHourRef = useRef<null[] | HTMLButtonElement[]>([])
  const btnMinuteRef = useRef<null[] | HTMLButtonElement[]>([])

  const [hourOption, setHourOption] = useState<(number | string)[]>(initTimeOption(24))
  const [minuteOption, setMinuteOption] = useState<(number | string)[]>(initTimeOption(60, minuteInterval))
  const [focused, setFocused] = useState(false)
  const [selected, setSelected] = useState(false)
  const [disabledConfirm, setDisabledConfirm] = useState(false)

  const [selectHourIdx, setSelectHourIdx] = useState<null | number>(null)
  const [selectMinuteIdx, setSelectMinuteIdx] = useState<null | number>(null)

  const [today, setToday] = useState('')
  const [targetHour, setTargetHour] = useState<HTMLButtonElement | null>(null)
  const [targetMinute, setTargetMinute] = useState<HTMLButtonElement | null>(null)

  const [selectLabel, setSelectLabel] = useState(placeholder)

  const clickLabel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setFocused(prev => !prev)

    // if (targetHour || targetMinute) scrollIntoLabel()
  }

  const scrollIntoLabel = () => {
    targetHour?.scrollIntoView()
    targetMinute?.scrollIntoView()
  }

  const selectHour = (e: UIEvent<HTMLButtonElement>, i: number) => {
    setSelectHourIdx(i)
    setToday('')
    // setTargetHour(e.currentTarget)
  }

  const selectMinute = (e: UIEvent<HTMLButtonElement>, i: number) => {
    setSelectMinuteIdx(i)
    setToday('')
    // setTargetMinute(e.currentTarget)
  }

  const clickCheck = () => {
    const h = hourOption?.[Number(selectHourIdx)]
    const m = minuteOption?.[Number(selectMinuteIdx)]
    if (validateFunc && !validateFunc(Number(h), Number(m))) {
      return
    }
    today ? setSelectLabel(today) : setSelectLabel(`${h}:${m}`)
    setSelected(true)
    setFocused(false)

    onSelect && onSelect(Number(h), Number(m))
  }

  const changeTypeDate = (t: number) => {
    return t < 10 ? String(`0${t}`) : String(t)
  }

  const clickDate = () => {
    const today = new Date()
    let hours: number | string = today.getHours()
    let minutes: number | string = today.getMinutes()

    if (minuteInterval > 1) {
      minutes = Math.ceil(minutes / minuteInterval) * minuteInterval
      if (minutes >= 60) {
        minutes = 0
        hours = (hours + 1) % 24
      }
    } else if (minutes < 59) {
      minutes += 1
    } else {
      hours = (hours + 1) % 24
      minutes = 0
    }

    setSelectHourIdx(hours)
    setSelectMinuteIdx(minutes)

    const elemHour = btnHourRef.current[hours]
    const elemMinute = btnMinuteRef.current[minutes / minuteInterval]

    elemHour?.scrollIntoView()
    elemMinute?.scrollIntoView()

    setTargetHour(btnHourRef.current[hours])
    setTargetMinute(btnMinuteRef.current[minutes / minuteInterval])

    hours = changeTypeDate(hours)
    minutes = changeTypeDate(minutes)

    setToday(`${hours}:${minutes}`)
  }

  useEffect(() => {
    if (today) {
      setDisabledConfirm(false)
    } else {
      selectHourIdx !== null && selectMinuteIdx !== null ? setDisabledConfirm(false) : setDisabledConfirm(true)
    }
  }, [selectHourIdx, selectMinuteIdx, today])

  useEffect(() => {
    if (value === undefined) {
      return
    }

    setSelectHourIdx(value.hours ?? 0)
    setSelectMinuteIdx(value.minutes / minuteInterval || 0)

    const h = hourOption?.find((n, i) => i === value.hours) ?? '00'
    const m = minuteOption?.find((n, i) => i === value.minutes / minuteInterval) ?? '00'
    setSelectLabel(`${h}:${m}`)
    setSelected(true)
  }, [value, minuteInterval])

  useEffect(() => {
    // eslint-disable-next-line
    const clickWrap = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setFocused(false)
      }
    }

    document.addEventListener('click', clickWrap)

    setHourOption(initTimeOption(24))
    setMinuteOption(initTimeOption(60, minuteInterval))

    return () => {
      document.removeEventListener('click', clickWrap)
    }
  }, [minuteInterval])

  return (
    <div
      ref={selectRef}
      className={cn('select-time__group', {
        'is-selected': selected,
        'is-focused': focused,
        'is-disabled': disabled,
      })}
      style={{ width: changeWidth ? changeWidth : 'min(50%, 250px)' }}
    >
      <button
        className="select-time__label"
        onClick={clickLabel}
      >
        <span className="select-time__label-text">{selectLabel}</span>
        <span className="select-time__label-ico">
          <IcoSvg data={icoSvgData.clock} />
        </span>
      </button>

      <div className="select-time-option__section">
        <div className="select-time-option__group">
          <div className="select-time-option__list">
            <ul>
              {hourOption?.map((h, i) => {
                return (
                  <li key={h}>
                    <button
                      ref={element => {
                        btnHourRef.current[i] = element
                      }}
                      className={cn('select-time-option__item', { 'is-selected': selectHourIdx === i })}
                      onClick={e => selectHour(e, i)}
                      onScroll={e => selectHour(e, i)}
                    >
                      {h}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="select-time-option__list">
            <ul>
              {minuteOption?.map((m, i) => {
                return (
                  <li key={m}>
                    <button
                      ref={element => {
                        btnMinuteRef.current[i] = element
                      }}
                      className={cn('select-time-option__item', { 'is-selected': selectMinuteIdx === i })}
                      onClick={e => selectMinute(e, i)}
                      onScroll={e => selectMinute(e, i)}
                    >
                      {m}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="select-time-control__group">
          <button
            className="select-time-control__btn-date"
            onClick={clickDate}
          >
            지금
          </button>
          <Button
            label={'확인'}
            cate={'default'}
            size={'s'}
            color={'primary'}
            disabled={disabledConfirm}
            onClick={clickCheck}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectTime
