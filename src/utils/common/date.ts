import moment, { Moment } from 'moment-timezone'

export interface DateRange {
  startDate: Date
  endDate: Date
}

export const getYearMonthDay = (timezone: string, date: Date | string): string => {
  return moment(date).tz(timezone).format('YYYY-MM-DD')
}

export const getFullDateFormat = (timezone: string, date: Date | string): string => {
  return moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss')
}

export const getYearToMinuteFormat = (timezone: string, date: Date | string): string => {
  return moment(date).tz(timezone).format('YYYY-MM-DD HH:mm')
}

export const transformTimezoneText = (inputText: string) => {
  const match = inputText.match(/\(UTC\s*[-+]\d{2}:\d{2}\)/)
  return match ? match[0].replace(/[()]/g, '') : '' // Remove parentheses
}

export const getCurrentDateAfterMinutes = (min: number) => {
  const currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes() + min)
  return currentDate
}

export const getStartEndDate = (dates: string[]): DateRange => {
  const dateObjects = dates.map(date => moment(date))

  dateObjects.sort((a, b) => {
    if (a.isBefore(b)) return -1
    if (a.isAfter(b)) return 1
    return 0
  })

  const startDate = dateObjects[0].toDate()
  const endDate = dateObjects[dateObjects.length - 1].toDate()

  return {
    startDate,
    endDate,
  }
}

export const getDateTimeFormat = (timezone: string, date: string, isTime: boolean = false) => {
  if (!!date) {
    let strDate = ''
    const m_date: Moment = moment(new Date(date).getTime()).tz(timezone)
    const format_date: string = m_date.format('YYYY-MM-DD')
    const format_year: string = m_date.format('YYYY')
    const now_date: string = moment().tz(timezone).format('YYYY-MM-DD')
    const now_year: string = moment().tz(timezone).format('YYYY')

    if (format_date === now_date) {
      // 같은 날
      strDate = m_date.format('HH:mm')
    } else if (format_year === now_year) {
      // 같은 년도
      strDate = m_date.format(`MM-DD${isTime ? ' HH:mm' : ''}`)
    } else {
      // 이전 년도
      strDate = m_date.format(`YYYY-MM-DD${isTime ? ' HH:mm' : ''}`)
    }
    return strDate
  } else {
    return '-'
  }
}

export const getDateFormat = (timezone: string, date: string, isTime: boolean = false, noFunction?: boolean) => {
  if (!!date) {
    let strDate = ''
    const m_date: Moment = moment.tz(new Date(date).getTime(), timezone)
    const format_year: string = m_date.format('YYYY')
    const now_year: string = moment.tz(timezone).format('YYYY')

    if (noFunction) {
      strDate = m_date.format(`YYYY-MM-DD${isTime ? ' HH:mm' : ''}`)
    } else {
      if (format_year === now_year) {
        // 같은 년도
        strDate = m_date.format(`MM-DD${isTime ? ' HH:mm' : ''}`)
      } else {
        // 이전 년도
        strDate = m_date.format(`YYYY-MM-DD${isTime ? ' HH:mm' : ''}`)
      }
    }

    return strDate
  } else {
    return '-'
  }
}

export const getNewsDateFormat = (timezone: string, date: string, isTime: boolean = false) => {
  if (!!date) {
    let strDate = ''
    const m_date: Moment = moment.tz(new Date(date).getTime(), timezone)
    const format_year: string = m_date.format('YYYY')
    const now_year: string = moment.tz(timezone).format('YYYY')

    if (m_date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      // 같은 일자
      strDate = m_date.format(`HH:mm`)
    } else if (format_year === now_year) {
      // 같은 년도
      strDate = m_date.format(`MM-DD${isTime ? ' HH:mm' : ''}`)
    } else {
      // 이전 년도
      strDate = m_date.format(`YYYY-MM-DD${isTime ? ' HH:mm' : ''}`)
    }

    return strDate
  } else {
    return '-'
  }
}
