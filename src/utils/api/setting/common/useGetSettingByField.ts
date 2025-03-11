/**
 * @file useGetSettingByField.ts
 * @description 서비스 허용값 가져오기
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { createAxiosAPI, createMutationHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/settings/service`

export const apiGetSettingsByField = createAxiosAPI<string>(field_name => ({
  url: `${queryKey}/${field_name}`,
  method: 'get',
}))

export const useGetSettingByField = createMutationHook<string>(apiGetSettingsByField)
