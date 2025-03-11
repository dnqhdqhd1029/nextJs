/**
 * @file apiGetFileDownload.ts
 * @description 파일 다운로드
 */
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/files/download`

/**
 * Axios API
 * @params {number} id 파일 ID
 * @params {number} groupId 그룹 ID
 * @returns {Promise<Blob>}
 */
export const apiGetFileDownload = async (id: number, groupId: number): Promise<Blob> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    params: { groupId },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
    responseType: 'blob',
  })
  return data
}
