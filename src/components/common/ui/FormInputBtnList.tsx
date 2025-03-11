import React, { Children, cloneElement, isValidElement, ReactElement } from 'react'
import cn from 'classnames'

import FormMsg from './FormMsg'
import FormTitle from './FormTitle'

import { InputBtnListProps, InputBtnProps } from '~/types/common'

const FormInputBtnList = ({
  type,
  name,
  title,
  required,
  tooltip,
  msg,
  succeeded,
  failed,
  children,
  tooltipChildren,
}: InputBtnListProps) => {
  const isTooltipUsing = tooltip && tooltipChildren && isValidElement(tooltipChildren)

  return (
    <div
      className={cn(`ipt-btn__section`, {
        'is-succeeded': succeeded,
        'is-failed': failed,
      })}
    >
      {title && (
        <FormTitle
          title={title}
          required={required}
          tooltip={tooltip}
        >
          {isTooltipUsing ? tooltipChildren : undefined}
        </FormTitle>
      )}
      <ul className="ipt-btn__list--row">
        {Children.map(children, (child: ReactElement<InputBtnProps>, index: number) => (
          <li key={index}>{cloneElement(child, { type, name })}</li>
        ))}
      </ul>
      {msg && <FormMsg msg={msg} />}
    </div>
  )
}

export default FormInputBtnList
