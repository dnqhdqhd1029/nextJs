/**
 * @file storage.ts
 * @description LocalStorage Redux 관련 함수
 */

import _ from 'lodash'

// LocalStorage에 저장할 Key
const KEY = btoa('__NEXT_REDUX_STORE__').toLowerCase()

/**
 * Localstorage에 저장한 State를 불러온다.
 * @returns
 */
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

/**
 * Localstorage에 State를 저장한다.
 * @param {object} state redux state
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveState(state: any) {
  try {
    const newState = _.cloneDeep(state)
    Object.keys(state).forEach(key => {
      const value = state[key]
      if (value.persist === undefined || value.persist === false) {
        delete newState[key]
      }
    })
    const serializedState = JSON.stringify(newState)
    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    console.log(e)
  }
}
