import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { range } from 'lodash'

import { IRenderCustomerHeaderProps } from './common-ui'

import { IcoChevronThickLeft, IcoChevronThickRight } from '~/publishing/components/common/ui/IcoGroup'
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerTime = () => {
  const [startDate, setStartDate] = useState<null | Date>(null)

  return (
    <div className="datepicker__group type-time">
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  )
}

export default DatePickerTime
