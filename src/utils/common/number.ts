/**
 * 숫자를 받아 3자리마다 콤마를 찍어준다.
 * @param {number} num 숫자. 실수일 경우 소수점 이하 버림
 * @returns
 */
export const getCurrencyFormat = (num?: number | string | null) => {
  if (num === undefined || num === null || num === '') {
    return '0'
  }
  const intNum = typeof num === 'number' ? Math.floor(num) : isNaN(parseInt(num)) ? 0 : parseInt(num)
  return intNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isThisNumberType = (arg?: any) => {
  return arg !== undefined && arg !== null && !isNaN(Number(arg))
}

export const handleNonBreakSpace = (v: number) => {
  return '\u00A0'.repeat(v ? v : 2)
}
export const addNumberToArrayIfNotExists = (array: number[], numberToAdd: number) => {
  const newArray = array ? [...array] : []
  if (!newArray.includes(numberToAdd)) {
    newArray.push(numberToAdd)
  }
  return newArray
}

export const removeNumberFromArrayIfExists = (array: number[], numberToRemove: number) => {
  const newArray = array ? [...array] : []
  if (newArray.includes(numberToRemove)) {
    newArray.splice(array.indexOf(numberToRemove), 1)
  }
  return newArray
}

export const getTotalPageCount = (totalSize: number, pageItemSize: number) => {
  return Math.ceil(totalSize / pageItemSize)
}

export const compareStringWithNumber = (num1: number, str: string) => {
  const num2 = parseInt(str)
  if (isNaN(num2)) {
    return false
  }
  return num1 === num2
}

export const getDecimalPointCurrencyFormat = (value: number): string => {
  // 소수점 이하 절삭 및 천 단위 구분 기호 추가
  if (value === undefined || value === null) {
    return '0'
  }

  return Math.floor(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getDecimalPointPercentFormat = (value: number): string => {
  // 소수점 3째 자리 반올림 후 소수점 2째 자리까지 표시하고 "%" 추가
  if (value === undefined || value === null) {
    return '0'
  }
  return `${(Math.round(value * 100) / 100).toFixed(2)}%`
}
