/**
 * @file usePutActionShareCodeOwner.ts
 * @description 배포관리(이메일, 보도자료, 뉴스와이어) 공유설정/소유자 수정
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { ModifyShareCodeOwnerDto } from '~/types/api/service'
import { createAxiosAPI, createMutationHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/action/share`

export interface IUpdateShareCodeOwner {
  id: number
  modify_share_code_owner_dto: ModifyShareCodeOwnerDto
}

export const apiPutActionShareCodeOwner = createAxiosAPI<IUpdateShareCodeOwner>(
  ({ id, modify_share_code_owner_dto }) => ({
    url: `${queryKey}/${id}`,
    data: modify_share_code_owner_dto,
    method: 'put',
  })
)

export const usePutActionShareCodeOwner = createMutationHook<IUpdateShareCodeOwner>(apiPutActionShareCodeOwner)
