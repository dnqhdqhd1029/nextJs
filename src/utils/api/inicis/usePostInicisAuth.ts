/**
 * @file usePostInicisAuth.ts
 * @description 이니시스 승인 요청
 */
import axios from 'axios'

export interface IInicisParam {
  mid: string
  authToken: string
  timestamp: number
  signature: string
  verification: string
  charset: 'UTF-8' | 'EUC-KR'
  format: string
}

export interface IInicisCancle {
  auth_url: string
  auth_param: IInicisParam
}

export const apiPostInicisAuth = async ({ auth_url, auth_param }: IInicisCancle) => {
  return await axios.post(auth_url, auth_param, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
