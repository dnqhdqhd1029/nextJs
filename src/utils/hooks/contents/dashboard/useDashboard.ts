import { useEffect, useState } from 'react'
import moment from 'moment'

import { commonCodeCategoryAction } from '~/stores/modules/contents/activity/searchActivity'
import { setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import {
  ActionDtoForList,
  BaseResponseCommonObject,
  ClipBookDto,
  ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  GroupDto,
  JournalistSrchDto,
  JrnlstListDto,
  MediaListDto,
  MediaSrchDto,
  NewsDocumentDto,
  NewsSrchDto,
  PageActionDtoForList,
  PageClipBookDto,
  PageGroupDto,
  PageJournalistSrchDto,
  PageJrnlstListDto,
  PageMediaListDto,
  PageMediaSrchDto,
  PageNewsSrchDto,
} from '~/types/api/service'
import { apiGetActionList, useGetActionList } from '~/utils/api/action/useGetActionList'
import { apiGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetJournalistCustomSearchList } from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { apiGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { apiGetGroupSearch } from '~/utils/api/group/useGetGroupSearch'
import { apiGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { apiGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { apiGetMonitoringSearch } from '~/utils/api/monitoring/useGetMonitoringSearch'
import { apiPostGetMonitoringByCategory } from '~/utils/api/monitoring/usePostGetMonitoringByCategory'
import { apiPostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

export type dashboardContentType = Array<
  | ActionDtoForList
  | GroupDto
  | JrnlstListDto
  | MediaListDto
  | JournalistSrchDto
  | MediaSrchDto
  | ClipBookDto
  | NewsSrchDto
  | NewsDocumentDto
>

export interface IReturnList {
  content: dashboardContentType
  totalElements: number
}

export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const { licenseInfo, userInfo, userSelectGroup } = useAppSelector(state => state.authSlice)
  const { commonCodeCategory } = useAppSelector(state => state.searchActivitySlice)
  const { conditionConvert } = useMonitoringSearch()
  const updateUserSelectGroup = usePutUserSelectGroup()

  const getGroupList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<GroupDto> = []
    let rtnTotalElements = 0

    const response = await apiGetGroupSearch({
      page,
      size,
      sort: ['regisAt!desc'],
      userId: userInfo.userId,
    })
    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageGroupDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '그룹 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getActionList = async (page: number = 1, size: number = 10, categoryList?: string) => {
    let rtnContent: Array<ActionDtoForList> = []
    let rtnTotalElements = 0

    const response = await apiGetActionList({
      page,
      size,
      sort: ['update!desc'],
      groupId: userSelectGroup,
      categoryList: !!categoryList ? [categoryList] : [],
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageActionDtoForList
      let newContent: Array<ActionDtoForList> = []
      let newCommonCodeCategory = commonCodeCategory

      if (!!!newCommonCodeCategory.length) {
        const {
          status: codeStatus,
          data: codeData,
          message: codeMessage,
        } = await apiGetCommonCode({ parentCode: 'ACTION_CATEGORY_ALL' })

        newCommonCodeCategory = codeData as CommonCode[]
      }

      content?.forEach(item => {
        const code = newCommonCodeCategory.filter(code => code.code === item.category) ?? []
        const categoryName = !!code.length ? code[0].name : ''
        newContent.push({
          ...item,
          category: categoryName,
        })
      })

      rtnContent = newContent ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getPressList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<JrnlstListDto> = []
    let rtnTotalElements = 0

    const response = await apiGetJournalistGroup({
      page,
      size,
      sort: ['update!desc'],
      groupId: userSelectGroup,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageJrnlstListDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getMediaList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<MediaListDto> = []
    let rtnTotalElements = 0

    const response = await apiGetMediaGroup({
      page,
      size,
      sort: ['update!desc'],
      groupId: userSelectGroup,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageMediaListDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getCustomPressList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<JournalistSrchDto> = []
    let rtnTotalElements = 0

    const response = await apiGetJournalistCustomSearchList({
      page,
      size,
      sort: ['update!desc'],
      groupId: userSelectGroup,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageJournalistSrchDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getCustomMediaList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<MediaSrchDto> = []
    let rtnTotalElements = 0

    const response = await apiGetMediaCustomSearchList({
      page,
      size,
      sort: ['update!desc'],
      groupId: userSelectGroup,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageMediaSrchDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getClipBookList = async (page: number = 1, size: number = 10, type: string = 'NORMAL') => {
    let rtnContent: Array<ClipBookDto> = []
    let rtnTotalElements = 0

    const response = await apiGetClipbooks({
      page,
      size,
      sort: 'updateAt!desc',
      groupId: userSelectGroup,
      type,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageClipBookDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getMonitoringList = async (page: number = 1, size: number = 10) => {
    let rtnContent: Array<NewsSrchDto> = []
    let rtnTotalElements = 0

    const response = await apiGetMonitoringSearch({
      page,
      size,
      sort: 'updateAt!desc',
      groupId: userSelectGroup,
    })

    const { code, data, message, status } = response as BaseResponseCommonObject

    if (status === 'S') {
      const { content, totalElements } = data as PageNewsSrchDto

      rtnContent = content ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const getMonitoringCategory = async (categoryList: Array<{ id: string; name: string }>) => {
    const response = await apiPostGetMonitoringByCategory({
      groupId: userSelectGroup,
      sort: ['updateAt!desc'],
      requestList: categoryList.map(category => {
        return {
          category: category.id,
          size: 9999,
        }
      }),
    })

    const { status, code, data, message } = response

    if (status === 'S') {
      return data
    } else {
      return []
    }
  }

  const getConvertCondition = async (page: number, size: number, condition: string, type: string) => {
    const endDate = moment()
    const startDate = type === 'table' ? endDate.subtract(2, 'years') : endDate.subtract(7, 'days')

    const responseCondition = await conditionConvert(condition)
    let newApiParams = {
      ...responseCondition?.apiParams,
      periodStartYear: startDate.year().toString(),
      periodStartMonth: (startDate.month() + 1).toString().padStart(2, '0'),
      periodStartDay: startDate.date().toString().padStart(2, '0'),
      size,
    }

    return newApiParams
  }

  const getNewsList = async (page: number = 1, size: number = 10, condition: string, type: string) => {
    let rtnContent: Array<NewsDocumentDto> = []
    let rtnTotalElements = 0
    const newApiParams = await getConvertCondition(page, size, condition, type)
    const response = await apiPostNewsSearch(newApiParams as ESearchNewsCondDto)
    const { status, code, data, message } = response

    if (status === 'S') {
      const { name, filterDate, totalElements } = data as ElasticSearchReturnDtoNewsDocumentDto

      rtnContent = type === 'table' ? name ?? [] : filterDate ?? []
      rtnTotalElements = totalElements ?? 0
    } else {
      openToast(message?.message ?? '활동 목록 리스트 불러오기에 실패했습니다.', 'error')
    }

    return {
      content: rtnContent,
      totalElements: rtnTotalElements,
    }
  }

  const updateUserGroup = async (groupId: number, group: GroupDto) => {
    if (!!groupId && userSelectGroup !== groupId) {
      const { status, message } = await updateUserSelectGroup.mutateAsync({ id: groupId })
      if (status === 'S') {
        dispatch(setUserSelectGroupAction(groupId))
        openToast(message?.message, 'success')
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(selectDefaultUserGroupAction({ currentGroup: group, groupBar: status !== 'S', isLoading: false }))
    }
  }

  return {
    getActionList,
    getGroupList,
    getPressList,
    getMediaList,
    getCustomPressList,
    getCustomMediaList,
    getClipBookList,
    getMonitoringList,
    getMonitoringCategory,
    getNewsList,
    updateUserGroup,
    getConvertCondition,
  }
}
