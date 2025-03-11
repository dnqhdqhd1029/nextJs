/**
 * @file FormInputBtn.tsx
 * @description input 라디오, 체크박스 컴포넌트
 */

import { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'

import { IcoPersonLineBroken } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { InputBtnProps } from '~/types/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { getHighlightedText, getHightlightedText } from '~/utils/common/string'

const FormInputBtn = ({
  type = 'checkbox',
  name = '',
  id,
  label = '',
  labelClass,
  subLabel,
  count,
  checked = false,
  disabled = false,
  readOnly = false,
  isOwnerIcon = false,
  iptCheckboxIcoPerson = false,
  checkDataLimit,
  checkDataMinAmount,
  checkDataLength,
  desc,
  history,
  onChange,
  highlightedString,
  changeEventHook,
  checkDataLimitDisable,
  isLabelNode,
  onClickEvent,
}: InputBtnProps) => {
  const [subLabelText, setSubLabelText] = useState<string | number>('')
  const [inputChecked, setInputChecked] = useState<boolean>(checked)
  const [inputDisabled, setInputDisabled] = useState<boolean>(disabled)
  const [inputReadyOnly, setInputReadyOnly] = useState<boolean>(readOnly)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('checkDataMinAmount', checkDataMinAmount)
    console.log('checkDataLength', checkDataLength)
    if (!e.target.checked && checkDataMinAmount && checkDataLength) {
      if (checkDataMinAmount === checkDataLength) {
        console.log('1')
        return
      }
    }
    if (checkDataLimit && checkDataLength && checkDataLength > 0 && checkDataLimit > 0 && e.target.checked) {
      if (checkDataLimit === checkDataLength) {
        console.log('2')
        return
      }
    }
    if (changeEventHook) {
      const checked = e.target.checked
      const event: ChangeEvent<HTMLInputElement> = {
        ...e,
        target: {
          ...e.target,
          checked,
        },
      }
      const result = await changeEventHook(e)

      if (!result) {
        return
      }

      setInputChecked(event.target.checked)
      onChange && onChange(event)
    } else {
      setInputChecked(e.target.checked)
      onChange && onChange(e)
    }
  }

  useEffect(() => {
    setInputChecked(checked)
  }, [checked])

  useEffect(() => {
    setInputDisabled(disabled)
  }, [disabled])

  useEffect(() => {
    if (!checkDataLimitDisable) {
      if (disabled) {
        setInputDisabled(disabled)
      }
      return
    }
    if (checkDataLimitDisable === 'action') {
      if (!inputChecked) {
        setInputDisabled(checkDataLimitDisable === 'action')
      }
    } else {
      if (disabled) {
        setInputDisabled(disabled)
      } else {
        setInputDisabled(false)
      }
    }
  }, [checkDataLimitDisable, disabled])

  useEffect(() => {
    if (subLabel === undefined) {
      return
    }

    setSubLabelText(subLabel)
  }, [subLabel])

  useEffect(() => {
    setInputReadyOnly(readOnly)
  }, [readOnly])

  return (
    <>
      <div
        className={cn(`ipt-${type}__group`)}
        onClick={() => onClickEvent && onClickEvent()}
      >
        <input
          type={type}
          name={name}
          id={id}
          disabled={inputDisabled}
          readOnly={inputReadyOnly}
          checked={inputChecked}
          onChange={handleChange}
        />
        <label
          className={cn(`ipt-${type}__group`)}
          htmlFor={id}
          style={{ userSelect: 'none' }}
        >
          <span className="ico"></span>
          {label && (
            <>
              {highlightedString ? (
                <>
                  <div
                    className="label"
                    dangerouslySetInnerHTML={{
                      __html: `${getHighlightedText(label, highlightedString)} ${
                        subLabelText !== '' ? '<b class="label-sub">' + subLabelText + '</b>' : ''
                      }`,
                    }}
                    style={{
                      width: isLabelNode ? '100%' : 'auto',
                    }}
                  />
                </>
              ) : (
                <div
                  className={cn('label', { default: labelClass === 'default' })}
                  style={{
                    width: isLabelNode ? '100%' : 'auto',
                  }}
                >
                  {label} {subLabelText !== '' && <b className="label-sub">{subLabelText}</b>}
                </div>
              )}
            </>
          )}
          {count && <span className="count">{count}</span>}
          {desc && <span className="desc">{desc}</span>}
          {history && <span className="history">{history}</span>}
          {isOwnerIcon && (
            <span style={{ paddingLeft: 4 }}>
              <IcoPersonLineBroken />
            </span>
          )}
          {iptCheckboxIcoPerson && (
            <div className="ipt-checkbox-ico__person">
              <IcoSvg data={icoSvgData.personLineBroken} />
            </div>
          )}
        </label>
      </div>
    </>
  )
}

export default FormInputBtn
