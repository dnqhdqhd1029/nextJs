/**
 * @file FormInputBtn.tsx
 * @description input 라디오, 체크박스 컴포넌트
 */

import { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import type { InputBtnProps } from '~/types/common'
import { getHighlightedText, getHightlightedText } from '~/utils/common/string'

const FormInputSelectOption = ({
  type = 'checkbox',
  name = '',
  id,
  label = '',
  subLabel,
  count,
  checked = false,
  disabled = false,
  readOnly = false,
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
    if (!e.target.checked && checkDataMinAmount && checkDataLength) {
      if (checkDataMinAmount === checkDataLength) {
        return
      }
    }
    if (checkDataLimit && checkDataLength && checkDataLength > 0 && checkDataLimit > 0 && e.target.checked) {
      if (checkDataLimit === checkDataLength) {
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
        {/* <input
          type={type}
          name={name}
          id={id}
          disabled={inputDisabled}
          readOnly={inputReadyOnly}
          checked={inputChecked}
          onChange={handleChange}
        /> */}
        <label
          htmlFor={id}
          style={{ userSelect: 'none' }}
        >
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
                  className={cn('label')}
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
        </label>
      </div>
    </>
  )
}

export default FormInputSelectOption
