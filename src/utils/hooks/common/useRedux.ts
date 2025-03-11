/**
 * @file reduxHooks.ts
 * @description redux hooks. useDispatch, useSelector에서 type을 미리 설정하게 해줌
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '~/stores'

/**
 * AppDispatch를 반환하는 함수 타입
 */
type DispatchFunc = () => AppDispatch

/**
 * useDispatch type을 미리 설정해준 hook
 */
export const useAppDispatch: DispatchFunc = useDispatch

/**
 * useSelector type을 미리 설정해준 hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
