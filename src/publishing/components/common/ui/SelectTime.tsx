/**
 * @file SelectTime.tsx
 * @description 셀렉트박스 시간 선택
 */

import React, { useEffect, useRef, useState } from 'react'

import Button from './Button'
import { stringType } from './common-ui'

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const SelectTime = ({ placeholder }: stringType) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const btnHourRef = useRef<null[] | HTMLButtonElement[]>([])
  const btnMinuteRef = useRef<null[] | HTMLButtonElement[]>([])

  const [hourOption, setHourOption] = useState<(number | string)[]>()
  const [minuteOption, setMinuteOption] = useState<(number | string)[]>()

  const [focused, setFocused] = useState(false)
  const [selected, setSelected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [selectHourIdx, setSelectHourIdx] = useState<null | number>(null)
  const [selectMinuteIdx, setSelectMinuteIdx] = useState<null | number>(null)

  const [today, setToday] = useState('')
  const [targetHour, setTargetHour] = useState<HTMLButtonElement | null>(null)
  const [targetMinute, setTargetMinute] = useState<HTMLButtonElement | null>(null)

  const [selectLabel, setSelectLabel] = useState(placeholder || 'Select...')

  const clickLabel = () => {
    setFocused(prev => !prev)

    if (targetHour || targetMinute) scrollIntoLabel()
  }

  const scrollIntoLabel = () => {
    targetHour?.scrollIntoView()
    targetMinute?.scrollIntoView()
  }

  const initTimeOption = (num: number) => {
    const arr = [...Array(num)]
    return arr.map((n, i, a) => (i < 10 ? (a[i] = String(`0${i}`)) : (a[i] = String(i))))
  }

  const selectHour = (e: React.UIEvent<HTMLButtonElement>, i: number) => {
    setSelectHourIdx(i)
    setToday('')
    setTargetHour(e.currentTarget)
  }

  const selectMinute = (e: React.UIEvent<HTMLButtonElement>, i: number) => {
    setSelectMinuteIdx(i)
    setToday('')
    setTargetMinute(e.currentTarget)
  }

  const clickCheck = () => {
    const h = hourOption?.[Number(selectHourIdx)]
    const m = minuteOption?.[Number(selectMinuteIdx)]

    today ? setSelectLabel(today) : setSelectLabel(`${h}:${m}`)
    setSelected(true)
    setFocused(false)
  }

  const changeTypeDate = (t: number) => {
    return t < 10 ? String(`0${t}`) : String(t)
  }

  const clickDate = () => {
    const today = new Date()
    let hours: number | string = today.getHours()
    let minutes: number | string = today.getMinutes()

    if (minutes < 59) {
      minutes += 1
    } else {
      hours < 23 ? (hours += 1) : (hours = 0)
      minutes = 0
    }

    setSelectHourIdx(hours)
    setSelectMinuteIdx(minutes)

    const elemHour = btnHourRef.current[hours]
    const elemMinute = btnMinuteRef.current[minutes]

    elemHour?.scrollIntoView()
    elemMinute?.scrollIntoView()

    setTargetHour(btnHourRef.current[hours])
    setTargetMinute(btnMinuteRef.current[minutes])

    hours = changeTypeDate(hours)
    minutes = changeTypeDate(minutes)

    setToday(`${hours}:${minutes}`)
  }

  useEffect(() => {
    // eslint-disable-next-line
    const clickWrap = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setFocused(false)
      }
    }

    document.addEventListener('click', clickWrap)
    return () => {
      document.removeEventListener('click', clickWrap)
    }
  }, [])

  useEffect(() => {
    setHourOption(initTimeOption(24))
    setMinuteOption(initTimeOption(60))
  }, [])

  useEffect(() => {
    if (today) {
      setDisabled(false)
    } else {
      selectHourIdx !== null && selectMinuteIdx !== null ? setDisabled(false) : setDisabled(true)
    }
  }, [selectHourIdx, selectMinuteIdx, today])

  return (
    <>
      <div
        ref={selectRef}
        className={`select-time__group ${selected ? 'is-selected' : ''} ${focused ? 'is-focused' : ''}`}
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
                        className={`select-time-option__item ${selectHourIdx === i ? 'is-selected' : ''}`}
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
                        className={`select-time-option__item ${selectMinuteIdx === i ? 'is-selected' : ''}`}
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
              disabled={disabled}
              onClick={clickCheck}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectTime
