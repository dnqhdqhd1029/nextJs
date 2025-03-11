export interface moveItemToSpecificIndexParams {
  arr: any[]
  key: string
  value: string | number
  index: number
}

/**
 * 특정 key와 value를 받아서 key값이 value인 객체를 배열의 index 순서로 이동시킨다.
 * @param {any} arr 배열
 * @param {moveItemToSpecificIndexParams} { arr, key, value, index } - 배열, key, value, index
 * @returns {any[]} - 이동된 배열
 */
export const moveItemToSpecificIndex = ({ arr, key, value, index }: moveItemToSpecificIndexParams): any[] => {
  const findIndex = arr.findIndex((obj: any) => obj[key] === value)

  if (findIndex > -1) {
    const item = arr.splice(findIndex, 1)[0]

    arr.splice(index, 0, item)
  }

  return arr
}

/**
 * 배열의 요소를 교환한다.
 * @param {any[]} arr 배열
 * @param {number} index1 변경할 요소 1의 index
 * @param {number} index2 변경할 요소 2의 index
 * @returns {any[]} - 요소가 교환된 배열
 */
export const swapArrayElements = (arr: any[], index1: number, index2: number): any[] => {
  // 배열 복사본 생성
  const result = [...arr]

  // 요소 교환
  ;[result[index1], result[index2]] = [result[index2], result[index1]]

  return result
}
