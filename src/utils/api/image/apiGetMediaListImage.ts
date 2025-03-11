/**
 * @file apiGetMediaListImage.ts
 * @description 미디어자료실 이미지 조회
 */
import axios from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'

export interface apiGetMediaListImageParam {
  id: number
  groupId: number
}
const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/files/download`

/**
 * Axios API
 * @param params - 미디어자료실
 * @returns
 */
export const apiGetMediaListImage = async (params: apiGetMediaListImageParam) => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  // 이미지 데이터를 arraybuffer 형태로 받음
  try {
    const response = await axios.get(`${queryKey}/${params.id}?groupId=${params.groupId}`, {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
      responseType: 'arraybuffer',
      withCredentials: true,
    })

    // arraybuffer를 Base64로 변환
    const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))

    // Base64 인코딩된 데이터를 반환
    return base64 !== '' ? `data:image/jpeg;base64,${base64}` : ''
  } catch (e) {
    return ''
  }
}
