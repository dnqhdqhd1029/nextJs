import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

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
