/**
 * @file FormInputBtn.tsx
 * @description input 라디오, 체크박스 컴포넌트
 */

import { ChangeEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { getHighlightedText, getHightlightedText } from '~/utils/common/string'

export interface InputBtnProps {
  /** Input name prop */
  name?: string

  /** Input id prop */
  id: string

  /** Input type prop */
  type?: 'radio' | 'checkbox'

  /** Input title prop */
  title?: string

  /** Input required prop */
  required?: boolean

  /** Input tooltip prop */
  tooltip?: boolean

  /** Input label prop */
  label?: string

  /** Input checked prop */
  checked?: boolean

  /** Input default check */
  defaultChecked?: boolean

  /** Input disabled prop */
  disabled?: boolean

  /** Count 표시 */
  count?: number | string

  /** Sub label 표시 */
  subLabel?: string | number

  /** Message */
  msg?: string

  /** Success status */
  succeeded?: boolean

  /** Failed */
  failed?: boolean

  /** Tooltip ReactNode */
  children?: ReactNode

  /** 설명 */
  desc?: string

  /** 기록 */
  history?: string

  /** reverse type */
  reverse?: boolean

  /** 강조할 문자 */
  highlightedString?: string

  /** Change event hook */
  changeEventHook?: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>

  /**
   * Onchange event
   * @param {ChangeEvent<HTMLInputElement>} e change event
   * @returns
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface InputBtnListProps extends Omit<InputBtnProps, 'id' | 'children'> {
  /** Group item children */
  children: ReactElement<InputBtnProps> | ReactElement<InputBtnProps>[]

  /** Tooltip용 children */
  tooltipChildren?: ReactNode
}

const FormInputBtn = ({
  type = 'checkbox',
  name = '',
  id,
  label = '',
  subLabel,
  count,
  checked = false,
  disabled = false,
  desc,
  history,
  onChange,
  highlightedString,
  changeEventHook,
}: InputBtnProps) => {
  const [subLabelText, setSubLabelText] = useState<string | number>('')
  const [inputChecked, setInputChecked] = useState<boolean>(checked)
  const [inputDisabled, setInputDisabled] = useState<boolean>(disabled)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

      // setInputChecked(event.target.checked)
      onChange && onChange(event)
    } else {
      // setInputChecked(e.target.checked)
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
    if (subLabel === undefined) {
      return
    }

    setSubLabelText(subLabel)
  }, [subLabel])

  return (
    <>
      <div className={cn(`ipt-${type}__group`)}>
        <input
          type={type}
          name={name}
          id={id}
          disabled={inputDisabled}
          checked={inputChecked}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          style={{ userSelect: 'none' }}
        >
          <span className="ico"></span>
          {label && (
            <>
              {highlightedString ? (
                <>
                  <span
                    className="label"
                    dangerouslySetInnerHTML={{
                      __html: `${getHighlightedText(label, highlightedString)} ${
                        subLabelText !== '' ? '<b class="label-sub">' + subLabelText + '</b>' : ''
                      }`,
                    }}
                  />
                </>
              ) : (
                <span className="label">
                  {label} {subLabelText !== '' && <b className="label-sub">{subLabelText}</b>}
                </span>
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

export default FormInputBtn
