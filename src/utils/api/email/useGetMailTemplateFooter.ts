/**
 * @file useGetMailTemplateFooter.ts
 * @description 템플릿 푸터 정보 가져오기
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { createAxiosAPI, createMutationHook, createQueryHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailtemplate/footer`

export const apiGetMailTemplateFooter = createAxiosAPI<string>(type => ({
  url: `${queryKey}/${type}`,
  method: 'get',
}))

export const useGetMailTemplateFooter = createQueryHook(type => [`${queryKey}/${type}`, type], apiGetMailTemplateFooter)
