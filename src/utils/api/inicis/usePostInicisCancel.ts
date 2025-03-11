/**
 * @file usePostInicisCancel.ts
 * @description 이니시스 망 취소
 */
import axios from 'axios'

export interface IInicisCancleParam {
  mid: string
  authToken: string
  timestamp: number
  signature: string
  verification: string
  charset: 'UTF-8' | 'EUC-KR'
  format: string
}

export interface IInicisCancle {
  cancel_url: string
  cancel_param: IInicisCancleParam
}

export const apiPostInicisCancel = async ({ cancel_url, cancel_param }: IInicisCancle) => {
  return await axios.post(cancel_url, cancel_param, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
